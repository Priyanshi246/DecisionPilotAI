import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiDatabase, FiSearch, FiFilter, FiDownload, FiTrash2, FiEye,
  FiClock, FiFileText, FiMoreVertical
} from 'react-icons/fi';
import { Card, CardBody, CardHeader, Button, Badge, EmptyState } from '../components/ui';
import { Table, SearchInput } from '../components/ui/Table';
import { formatDateTime, getFileSize } from '../utils/helpers';

const mockDatasets = [
  { id: 1, name: 'Sales_Q4_2024.csv', rows: 12547, columns: 12, size: 2048000, uploadedAt: new Date('2024-01-15'), status: 'ready' },
  { id: 2, name: 'Customer_Data.xlsx', rows: 8423, columns: 18, size: 5120000, uploadedAt: new Date('2024-01-14'), status: 'processing' },
  { id: 3, name: 'Products_Inventory.json', rows: 2341, columns: 8, size: 1024000, uploadedAt: new Date('2024-01-13'), status: 'ready' },
  { id: 4, name: 'Marketing_Campaign.csv', rows: 45678, columns: 15, size: 8192000, uploadedAt: new Date('2024-01-12'), status: 'ready' },
];

export default function Datasets() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [datasets] = useState(mockDatasets);

  const filteredDatasets = datasets.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
            <FiFileText className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <p className="font-medium text-white">{value}</p>
            <p className="text-xs text-gray-500">{formatDateTime(row.uploadedAt)}</p>
          </div>
        </div>
      )
    },
    {
      key: 'rows',
      label: 'Rows',
      sortable: true,
      render: (value) => <span className="text-gray-300">{value.toLocaleString()}</span>
    },
    {
      key: 'columns',
      label: 'Columns',
      sortable: true,
      render: (value) => <span className="text-gray-300">{value}</span>
    },
    {
      key: 'size',
      label: 'Size',
      sortable: true,
      render: (value) => <span className="text-gray-300">{getFileSize(value)}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value === 'ready' ? 'success' : 'warning'} dot>
          {value === 'ready' ? 'Ready' : 'Processing'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/datasets/${row.id}`)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <FiDownload className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-danger-400 hover:bg-danger-500/10 rounded-lg transition-all">
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Datasets</h1>
          <p className="text-gray-400 mt-1">Manage and explore your uploaded data</p>
        </div>
        <Button onClick={() => navigate('/upload')}>
          Upload New
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-card/50 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="neutral">{filteredDatasets.length} datasets</Badge>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <Table columns={columns} data={filteredDatasets} />
        </CardBody>
      </Card>
    </div>
  );
}
