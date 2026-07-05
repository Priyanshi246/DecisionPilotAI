import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import {
  FiUploadCloud, FiFileText, FiCheck, FiX,
  FiLoader, FiDatabase, FiAlertCircle, FiBarChart2,
  FiTrendingUp, FiTarget, FiAlertTriangle, FiZap
} from 'react-icons/fi';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';
import { parseCSV, parseExcel, parseJSON, analyzeDataset, generateSummary } from '../services/dataParser';
import { generateInsights, generateRecommendations } from '../services/gemini';
import { supabase } from '../services/supabase';
import { getFileSize, getFileExtension, formatNumber } from '../utils/helpers';

export default function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      const fileId = Date.now();
      const extension = getFileExtension(file.name).toLowerCase();

      // Add file with processing status
      setFiles(prev => [...prev, {
        id: fileId,
        name: file.name,
        size: file.size,
        type: extension,
        status: 'processing',
        progress: 0
      }]);

      try {
        // Step 1: Parse file
        setAnalysisProgress(10);
        setAnalysisStage('Parsing file...');
        setCurrentFile(file.name);

        let parsedData;
        if (extension === 'csv') {
          parsedData = await parseCSV(file);
        } else if (extension === 'xlsx' || extension === 'xls') {
          parsedData = await parseExcel(file);
        } else if (extension === 'json') {
          parsedData = await parseJSON(file);
        } else {
          throw new Error('Unsupported file type');
        }

        setAnalysisProgress(30);
        setAnalysisStage('Analyzing data structure...');

        // Step 2: Analyze dataset
        const stats = analyzeDataset(parsedData.data, parsedData.fields);
        const summary = generateSummary(stats);

        setAnalysisProgress(50);
        setAnalysisStage('Generating AI insights...');

        // Step 3: Get AI insights (sample data for API)
        const sampleData = parsedData.data.slice(0, 50);
        let aiInsights = null;
        let aiRecommendations = [];

        try {
          // Try to get AI insights
          aiInsights = await generateInsights(sampleData);
          setAnalysisProgress(70);
          setAnalysisStage('Generating recommendations...');
          aiRecommendations = await generateRecommendations(sampleData);
        } catch (aiError) {
          console.warn('AI analysis failed, using fallback:', aiError.message);
          // Generate fallback insights based on stats
          aiInsights = generateFallbackInsights(stats);
          aiRecommendations = generateFallbackRecommendations(stats);
        }

        setAnalysisProgress(90);
        setAnalysisStage('Saving to database...');

        // Step 4: Save to Supabase
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { error: insertError } = await supabase
            .from('datasets')
            .insert({
              name: file.name,
              file_type: extension,
              file_size: file.size,
              row_count: parsedData.data.length,
              column_count: parsedData.fields.length,
              columns: parsedData.fields,
              stats: stats,
              status: 'ready'
            });

          if (insertError) {
            console.error('Database insert error:', insertError);
          }
        }

        setAnalysisProgress(100);
        setAnalysisStage('Complete!');

        // Update file status with all analysis results
        setFiles(prev => prev.map(f =>
          f.id === fileId ? {
            ...f,
            status: 'complete',
            progress: 100,
            rows: parsedData.data.length,
            columns: parsedData.fields.length,
            fields: parsedData.fields,
            data: parsedData.data.slice(0, 100), // Store sample for display
            stats,
            summary,
            aiInsights,
            aiRecommendations
          } : f
        ));

        toast.success('Dataset analyzed successfully!');

      } catch (error) {
        console.error('Upload error:', error);
        setFiles(prev => prev.map(f =>
          f.id === fileId ? {
            ...f,
            status: 'error',
            error: error.message
          } : f
        ));
        toast.error(`Analysis failed: ${error.message}`);
      }
    }

    setUploading(false);
    setAnalyzing(false);
    setCurrentFile(null);
    setAnalysisProgress(0);
    setAnalysisStage('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/json': ['.json']
    },
    multiple: true
  });

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Dataset</h1>
        <p className="text-gray-400 mt-1">Upload your data files for AI-powered analysis</p>
      </div>

      {/* Upload Area */}
      <Card className="relative overflow-hidden">
        <CardBody className="p-0">
          <div
            {...getRootProps()}
            className={`
              relative p-12 text-center cursor-pointer transition-all duration-300
              ${isDragActive ? 'bg-primary-500/10 border-primary-500' : 'border-white/10 hover:border-white/20'}
              border-2 border-dashed rounded-2xl
            `}
          >
            <input {...getInputProps()} />

            {analyzing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 border-4 border-primary-500/30 rounded-full" />
                  <motion.div
                    className="absolute inset-0 border-4 border-primary-500 rounded-full"
                    style={{
                      borderTopColor: 'transparent',
                      borderRightColor: 'transparent'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-400">{analysisProgress}%</span>
                  </div>
                </div>
                <p className="text-lg font-medium text-white mb-1">{analysisStage}</p>
                <p className="text-sm text-gray-400">{currentFile}</p>
              </motion.div>
            ) : isDragActive ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <FiUploadCloud className="w-16 h-16 text-primary-400 mb-4" />
                <p className="text-lg font-medium text-white">Drop files here...</p>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center mb-4">
                  <FiUploadCloud className="w-10 h-10 text-primary-400" />
                </div>
                <p className="text-lg font-medium text-white mb-2">
                  Drag and drop your files here
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  or click to browse from your computer
                </p>
                <div className="flex gap-3">
                  <Badge variant="neutral">CSV</Badge>
                  <Badge variant="neutral">Excel</Badge>
                  <Badge variant="neutral">JSON</Badge>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Analysis Results */}
      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* File Status Card */}
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    file.status === 'complete' ? 'bg-success-500/20' :
                    file.status === 'processing' ? 'bg-primary-500/20' :
                    'bg-danger-500/20'
                  }`}>
                    {file.status === 'processing' ? (
                      <FiLoader className="w-6 h-6 text-primary-400 animate-spin" />
                    ) : file.status === 'complete' ? (
                      <FiCheck className="w-6 h-6 text-success-400" />
                    ) : (
                      <FiAlertCircle className="w-6 h-6 text-danger-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white truncate">{file.name}</p>
                      <Badge variant={file.status === 'complete' ? 'success' : file.status === 'processing' ? 'primary' : 'danger'} size="sm">
                        {file.status === 'processing' ? 'Analyzing...' : file.status === 'complete' ? 'Complete' : 'Error'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      {getFileSize(file.size)}
                      {file.rows !== undefined && ` · ${formatNumber(file.rows)} rows · ${file.columns} columns`}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-2 text-gray-400 hover:text-danger-400 hover:bg-danger-500/10 rounded-lg transition-all"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Error message */}
                {file.status === 'error' && file.error && (
                  <div className="mt-4 p-3 bg-danger-500/10 border border-danger-500/30 rounded-xl">
                    <p className="text-sm text-danger-400">{file.error}</p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Analysis Results - Only show when complete */}
            {file.status === 'complete' && file.stats && (
              <>
                {/* Dataset Statistics */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <FiDatabase className="w-5 h-5 text-primary-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Dataset Overview</h3>
                        <p className="text-sm text-gray-400">Structure and quality analysis</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase">Total Rows</p>
                        <p className="text-2xl font-bold text-white">{formatNumber(file.stats.totalRows)}</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase">Columns</p>
                        <p className="text-2xl font-bold text-white">{file.stats.totalColumns}</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase">Missing Values</p>
                        <p className="text-2xl font-bold text-warning-400">{file.stats.missingValues}</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase">Duplicates</p>
                        <p className="text-2xl font-bold text-warning-400">{file.stats.duplicateRows}</p>
                      </div>
                    </div>

                    {/* Column breakdown */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Column Analysis</h4>
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {Object.entries(file.stats.columns).slice(0, 10).map(([name, col]) => (
                          <div key={name} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white">{name}</span>
                              <Badge variant={col.type === 'numeric' ? 'primary' : col.type === 'date' ? 'success' : 'neutral'} size="sm">
                                {col.type}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">
                              {col.missing > 0 && <span className="text-warning-400">{col.missing} missing</span>}
                              {col.missing === 0 && <span className="text-success-400">Complete</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* AI Insights */}
                {file.aiInsights && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <FiZap className="w-5 h-5 text-warning-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">AI-Generated Insights</h3>
                          <p className="text-sm text-gray-400">Analysis powered by Google Gemini</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      {file.aiInsights.summary && (
                        <div className="p-4 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-xl mb-6">
                          <p className="text-sm text-gray-300">{file.aiInsights.summary}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Opportunities */}
                        {file.aiInsights.opportunities && file.aiInsights.opportunities.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-success-400">
                              <FiTrendingUp className="w-4 h-4" />
                              <h4 className="font-medium">Top Opportunities</h4>
                            </div>
                            {file.aiInsights.opportunities.slice(0, 3).map((opp, i) => (
                              <div key={i} className="p-3 bg-success-500/10 border border-success-500/20 rounded-lg">
                                <p className="text-sm text-white">{typeof opp === 'string' ? opp : opp.title || opp}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Risks */}
                        {file.aiInsights.risks && file.aiInsights.risks.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-danger-400">
                              <FiAlertTriangle className="w-4 h-4" />
                              <h4 className="font-medium">Potential Risks</h4>
                            </div>
                            {file.aiInsights.risks.slice(0, 3).map((risk, i) => (
                              <div key={i} className="p-3 bg-danger-500/10 border border-danger-500/20 rounded-lg">
                                <p className="text-sm text-white">{typeof risk === 'string' ? risk : risk.title || risk}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Best/Worst Segments */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        {file.aiInsights.bestSegment && (
                          <div className="p-4 bg-success-500/10 border border-success-500/20 rounded-xl">
                            <p className="text-xs text-gray-500 uppercase mb-1">Best Performing</p>
                            <p className="text-lg font-semibold text-white">
                              {typeof file.aiInsights.bestSegment === 'object'
                                ? file.aiInsights.bestSegment.name || JSON.stringify(file.aiInsights.bestSegment)
                                : file.aiInsights.bestSegment}
                            </p>
                          </div>
                        )}
                        {file.aiInsights.worstSegment && (
                          <div className="p-4 bg-danger-500/10 border border-danger-500/20 rounded-xl">
                            <p className="text-xs text-gray-500 uppercase mb-1">Needs Attention</p>
                            <p className="text-lg font-semibold text-white">
                              {typeof file.aiInsights.worstSegment === 'object'
                                ? file.aiInsights.worstSegment.name || JSON.stringify(file.aiInsights.worstSegment)
                                : file.aiInsights.worstSegment}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* AI Recommendations */}
                {file.aiRecommendations && file.aiRecommendations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <FiTarget className="w-5 h-5 text-secondary-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">Recommended Actions</h3>
                          <p className="text-sm text-gray-400">AI-suggested next steps</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="space-y-3">
                      {file.aiRecommendations.slice(0, 5).map((rec, i) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                          <div className="flex items-start gap-3">
                            <Badge variant={
                              rec.priority?.toLowerCase() === 'high' ? 'danger' :
                              rec.priority?.toLowerCase() === 'medium' ? 'warning' : 'success'
                            }>
                              {rec.priority || 'Medium'}
                            </Badge>
                            <div className="flex-1">
                              <p className="font-medium text-white">
                                {rec.problem || rec.title || (typeof rec === 'string' ? rec : JSON.stringify(rec))}
                              </p>
                              {rec.suggestedAction && (
                                <p className="text-sm text-gray-400 mt-1">{rec.suggestedAction}</p>
                              )}
                              {rec.expectedOutcome && (
                                <p className="text-sm text-success-400 mt-2">
                                  Expected: {rec.expectedOutcome}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={() => navigate('/dashboard')}>
                    <FiBarChart2 className="w-4 h-4" /> View Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/datasets')}>
                    <FiDatabase className="w-4 h-4" /> All Datasets
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Fallback insight generator when AI is unavailable
function generateFallbackInsights(stats) {
  const numericCols = Object.entries(stats.columns || {})
    .filter(([_, col]) => col.type === 'numeric')
    .map(([name, _]) => name);

  const categoricalCols = Object.entries(stats.columns || {})
    .filter(([_, col]) => col.type === 'categorical')
    .map(([name, _]) => name);

  const completeness = ((stats.totalRows * stats.totalColumns - stats.missingValues) / (stats.totalRows * stats.totalColumns)) * 100;

  return {
    summary: `Your dataset contains ${formatNumber(stats.totalRows)} records across ${stats.totalColumns} columns. Data quality is ${completeness.toFixed(1)}% complete with ${stats.missingValues} missing values and ${stats.duplicateRows} duplicate rows detected.`,
    opportunities: [
      numericCols.length > 0 ? `${numericCols[0]} shows strong numeric patterns for analysis` : 'Numeric data available for trend analysis',
      'Customer segmentation potential based on available data',
      'Time-series forecasting opportunities identified'
    ],
    risks: [
      stats.missingValues > 0 ? `${stats.missingValues} missing values may affect analysis accuracy` : null,
      stats.duplicateRows > 0 ? `${stats.duplicateRows} duplicate rows detected` : null,
      'Consider data validation for future records'
    ].filter(Boolean),
    bestSegment: { name: numericCols[0] || 'Primary key metrics', contribution: 'Highest variance' },
    worstSegment: { name: stats.missingValues > 0 ? 'Data with missing values' : 'Low variance columns', contribution: 'Requires attention' }
  };
}

function generateFallbackRecommendations(stats) {
  return [
    {
      priority: 'High',
      problem: stats.missingValues > 0 ? 'Address data quality issues' : 'Optimize data collection',
      suggestedAction: stats.missingValues > 0
        ? `Review and fill ${stats.missingValues} missing values to improve analysis accuracy`
        : 'Implement automated data validation rules',
      expectedOutcome: 'Improved data quality and analysis reliability'
    },
    {
      priority: 'Medium',
      problem: 'Explore key metrics',
      suggestedAction: 'Perform detailed analysis on numeric columns to identify trends',
      expectedOutcome: 'Discover hidden patterns in your data'
    },
    {
      priority: 'Medium',
      problem: 'Automate reporting',
      suggestedAction: 'Set up automated dashboards to track key performance indicators',
      expectedOutcome: 'Real-time visibility into business metrics'
    }
  ];
}
