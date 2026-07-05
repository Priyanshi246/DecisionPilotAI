import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  FiUploadCloud, FiFile, FiFileText, FiCheck, FiX,
  FiLoader, FiDatabase, FiAlertCircle
} from 'react-icons/fi';
import { Card, CardBody, CardHeader, Button, Badge } from '../components/ui';
import { parseCSV, parseExcel, parseJSON, analyzeDataset } from '../services/dataParser';
import { getFileSize, getFileExtension } from '../utils/helpers';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    setUploadProgress(0);

    for (const file of acceptedFiles) {
      try {
        let parsedData;
        const extension = getFileExtension(file.name).toLowerCase();

        setUploadProgress(25);

        if (extension === 'csv') {
          parsedData = await parseCSV(file);
        } else if (extension === 'xlsx' || extension === 'xls') {
          parsedData = await parseExcel(file);
        } else if (extension === 'json') {
          parsedData = await parseJSON(file);
        } else {
          throw new Error('Unsupported file type');
        }

        setUploadProgress(75);

        const stats = analyzeDataset(parsedData.data, parsedData.fields);

        setFiles(prev => [...prev, {
          id: Date.now(),
          name: file.name,
          size: file.size,
          type: extension,
          status: 'complete',
          rows: parsedData.data.length,
          columns: parsedData.fields.length,
          data: parsedData.data,
          fields: parsedData.fields,
          stats
        }]);

        setUploadProgress(100);
      } catch (error) {
        setFiles(prev => [...prev, {
          id: Date.now(),
          name: file.name,
          size: file.size,
          status: 'error',
          error: error.message
        }]);
      }
    }

    setUploading(false);
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Dataset</h1>
        <p className="text-gray-400 mt-1">Upload your data files for AI-powered analysis</p>
      </div>

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

            {isDragActive ? (
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

            {uploading && (
              <div className="absolute inset-0 bg-dark-bg/90 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                <div className="text-center">
                  <FiLoader className="w-12 h-12 text-primary-400 animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">Processing file...</p>
                  <div className="w-48 h-2 bg-dark-card rounded-full mt-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-white">Uploaded Files</h2>

            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="overflow-hidden">
                  <CardBody className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        ${file.status === 'complete' ? 'bg-success-500/20' : 'bg-danger-500/20'}
                      `}>
                        {file.status === 'complete' ? (
                          <FiCheck className="w-6 h-6 text-success-400" />
                        ) : (
                          <FiAlertCircle className="w-6 h-6 text-danger-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white truncate">{file.name}</p>
                          <Badge variant={file.status === 'complete' ? 'success' : 'danger'} size="sm">
                            {file.status === 'complete' ? 'Ready' : 'Error'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          {getFileSize(file.size)}
                          {file.status === 'complete' && ` · ${file.rows?.toLocaleString()} rows · ${file.columns} columns`}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 text-gray-400 hover:text-danger-400 hover:bg-danger-500/10 rounded-lg transition-all"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>

                    {file.status === 'complete' && file.stats && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Total Rows</p>
                            <p className="text-lg font-semibold text-white">{file.stats.totalRows?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Columns</p>
                            <p className="text-lg font-semibold text-white">{file.stats.totalColumns}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Missing Values</p>
                            <p className="text-lg font-semibold text-warning-400">{file.stats.missingValues}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Duplicates</p>
                            <p className="text-lg font-semibold text-warning-400">{file.stats.duplicateRows}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
