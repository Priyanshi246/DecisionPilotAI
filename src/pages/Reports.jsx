import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiFileText, FiDownload, FiCopy, FiPrinter,
  FiCheck, FiClock, FiFilter
} from 'react-icons/fi';
import { Card, CardBody, CardHeader, Badge, Button } from '../components/ui';
import { useTheme } from '../context/ThemeContext';

const reportTemplates = [
  { id: 1, name: 'Executive Summary', description: 'High-level business overview', icon: FiFileText },
  { id: 2, name: 'Financial Report', description: 'Revenue, costs, and profit analysis', icon: FiFileText },
  { id: 3, name: 'Sales Analysis', description: 'Detailed sales performance metrics', icon: FiFileText },
  { id: 4, name: 'Customer Insights', description: 'Customer behavior and segmentation', icon: FiFileText },
  { id: 5, name: 'Forecast Report', description: 'Predictions and trend analysis', icon: FiFileText },
  { id: 6, name: 'Risk Assessment', description: 'Potential risks and mitigations', icon: FiFileText }
];

const recentReports = [
  { id: 1, name: 'Q4 2024 Financial Report', type: 'PDF', size: '2.4 MB', createdAt: new Date('2024-01-15'), status: 'ready' },
  { id: 2, name: 'Customer Analysis Jan 2024', type: 'PDF', size: '1.8 MB', createdAt: new Date('2024-01-14'), status: 'ready' },
  { id: 3, name: 'Revenue Forecast Q1 2024', type: 'CSV', size: '245 KB', createdAt: new Date('2024-01-13'), status: 'processing' }
];

export default function Reports() {
  const { darkMode } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedReport({
      title: selectedTemplate.name,
      content: `# ${selectedTemplate.name}\n\nGenerated on ${new Date().toLocaleDateString()}\n\n## Executive Summary\n\nThis report provides a comprehensive analysis of your business data...\n\n## Key Findings\n\n- Revenue increased by 23% compared to previous quarter\n- Customer acquisition cost decreased by 15%\n- Top performing segment: Premium Customers\n\n## Recommendations\n\n1. Increase marketing budget for high-performing channels\n2. Implement loyalty program for customer retention\n3. Expand product line in growing categories`,
      format: 'pdf'
    });
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Report Generator</h1>
          <p className="mt-1" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Create professional reports from your data analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Report Templates</h3>
              <p className="text-sm" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Select a template to generate</p>
            </CardHeader>
            <CardBody className="space-y-2">
              {reportTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className="w-full p-4 rounded-xl text-left transition-all border-2"
                  style={{
                    backgroundColor: selectedTemplate?.id === template.id ? 'rgba(59, 130, 246, 0.2)' : (darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)'),
                    borderColor: selectedTemplate?.id === template.id ? 'rgb(59, 130, 246)' : 'transparent',
                    borderWidth: selectedTemplate?.id === template.id ? '2px' : '2px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <template.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>{template.name}</p>
                      <p className="text-xs" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
              <Button
                onClick={handleGenerate}
                loading={generating}
                disabled={!selectedTemplate}
                className="w-full mt-4"
              >
                Generate Report
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {generatedReport ? (
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5 text-success-400" />
                  <div>
                    <h3 className="font-semibold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>{generatedReport.title}</h3>
                    <p className="text-sm" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Generated successfully</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <FiCopy className="w-4 h-4" /> Copy
                  </Button>
                  <Button size="sm">
                    <FiDownload className="w-4 h-4" /> Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="max-w-none">
                  <pre className="whitespace-pre-wrap p-6 rounded-xl text-sm font-sans" style={{
                    backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)',
                    color: darkMode ? '#d1d5db' : '#6b7280'
                  }}>
                    {generatedReport.content}
                  </pre>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className="min-h-[400px] flex items-center justify-center">
              <CardBody className="text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)'
                }}>
                  <FiFileText className="w-10 h-10" style={{ color: darkMode ? '#4b5563' : '#d1d5db' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>No Report Generated</h3>
                <p className="text-sm" style={{ color: darkMode ? '#64748b' : '#9ca3af' }}>Select a template and generate a report to see it here</p>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>Recent Reports</h3>
            </CardHeader>
            <CardBody className="p-0">
              <div style={{ borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.08)' }}>
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 transition-colors" style={{
                    backgroundColor: 'transparent',
                    borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.08)'
                  }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <FiFileText className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: darkMode ? '#ffffff' : '#0f172a' }}>{report.name}</p>
                        <p className="text-xs" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{report.type} · {report.size} · {report.createdAt.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={report.status === 'ready' ? 'success' : 'warning'}>
                        {report.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <FiDownload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
