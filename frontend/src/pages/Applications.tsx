import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { applicationService } from '../services/api';
import { Application } from '../types/api';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getMyApplications();
        setApplications(data);
      } catch (error) {
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="pt-16">
        <Sidebar />
        <div className="p-4 sm:ml-64">
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 gap-6">
          {applications.map((application) => (
            <div
              key={application.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    <h3 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                      Application #{application.id}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(application.status)}
                    <span className="ml-2 capitalize text-gray-600 dark:text-gray-300">
                      {application.status}
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  <p>Submitted: {new Date(application.submittedAt).toLocaleDateString()}</p>
                  <p className="mt-2">Documents: {application.documents.length}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}