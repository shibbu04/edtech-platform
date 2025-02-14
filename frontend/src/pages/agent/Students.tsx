import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { studentService } from '../../services/api';
import { User } from '../../types/auth';
import { UserCircle, GraduationCap, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export function Students() {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await studentService.getMyStudents();
        setStudents(data);
      } catch (error) {
        toast.error('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          My Students
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <UserCircle className="h-12 w-12 text-gray-400" />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {student.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {student.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">
                      5 Active Applications
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">
                      2 Pending Reviews
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    View Profile
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}