import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { scholarshipService } from '../services/api';
import { Scholarship } from '../types/api';
import { GraduationCap, Calendar, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

export function Scholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const data = await scholarshipService.getAll();
        setScholarships(data);
      } catch (error) {
        toast.error('Failed to load scholarships');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const handleApply = async (scholarshipId: string) => {
    try {
      await scholarshipService.apply(scholarshipId, []);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application');
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  <h3 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {scholarship.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {scholarship.description}
                </p>
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    ${scholarship.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => handleApply(scholarship.id)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  disabled={scholarship.status === 'closed'}
                >
                  {scholarship.status === 'closed' ? 'Closed' : 'Apply Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}