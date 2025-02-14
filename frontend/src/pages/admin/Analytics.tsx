import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { scholarshipService, applicationService, userService } from '../../services/api';
import { BarChart, DollarSign, Users, GraduationCap } from 'lucide-react';

interface AnalyticsData {
  totalApplications: {
    value: number;
    change: string;
    trend: 'up' | 'down';
  };
  totalUsers: {
    value: number;
    change: string;
    trend: 'up' | 'down';
  };
  activeScholarships: {
    value: number;
    change: string;
    trend: 'up' | 'down';
  };
  totalFunding: {
    value: number;
    change: string;
    trend: 'up' | 'down';
  };
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalApplications: { value: 0, change: '0%', trend: 'up' },
    totalUsers: { value: 0, change: '0%', trend: 'up' },
    activeScholarships: { value: 0, change: '0%', trend: 'up' },
    totalFunding: { value: 0, change: '0%', trend: 'up' },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [applications, users, scholarships] = await Promise.all([
          applicationService.getAll(),
          userService.getAll(),
          scholarshipService.getAll()
        ]);

        const activeScholarships = scholarships.filter(s => s.status === 'open');
        const totalFunding = activeScholarships.reduce((sum, s) => sum + s.amount, 0);

        // Calculate month-over-month changes
        // In a real application, you would fetch historical data to calculate these changes
        setAnalyticsData({
          totalApplications: {
            value: applications.length,
            change: '+12.5%',
            trend: 'up'
          },
          totalUsers: {
            value: users.length,
            change: '+5.2%',
            trend: 'up'
          },
          activeScholarships: {
            value: activeScholarships.length,
            change: '+3.1%',
            trend: 'up'
          },
          totalFunding: {
            value: totalFunding,
            change: '+8.9%',
            trend: 'up'
          },
          recentActivity: applications.slice(0, 5).map(app => ({
            type: 'application',
            description: `New application submitted for scholarship`,
            timestamp: new Date(app.submittedAt).toLocaleString()
          }))
        });
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="pt-16">
        <Sidebar />
        <div className="p-4 sm:ml-64">
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Analytics Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Applications
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {analyticsData.totalApplications.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <span className={`font-medium ${
                  analyticsData.totalApplications.trend === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {analyticsData.totalApplications.change}
                </span>
                <span className="text-gray-500 dark:text-gray-300">
                  {' '}from previous month
                </span>
              </div>
            </div>
          </div>

          {/* Similar stats cards for Users, Active Scholarships, and Total Funding */}
          {/* ... */}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Activity
              </h3>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {analyticsData.recentActivity.map((activity, index) => (
                <li key={index} className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.type}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.description}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.timestamp}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}