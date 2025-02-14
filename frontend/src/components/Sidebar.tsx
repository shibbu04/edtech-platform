import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  Briefcase,
  GraduationCap,
  Settings,
  Users,
  FileText,
  PieChart,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Sidebar() {
  const { user } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: UserCircle, label: 'Profile', path: '/profile' },
    ];

    const roleSpecificItems = {
      student: [
        { icon: GraduationCap, label: 'Scholarships', path: '/scholarships' },
        { icon: Briefcase, label: 'My Applications', path: '/applications' },
      ],
      agent: [
        { icon: Users, label: 'Students', path: '/students' },
        { icon: FileText, label: 'Applications', path: '/applications' },
      ],
      admin: [
        { icon: GraduationCap, label: 'Manage Scholarships', path: '/manage-scholarships' },
        { icon: Users, label: 'Users', path: '/users' },
        { icon: PieChart, label: 'Analytics', path: '/analytics' },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[user?.role || 'student'] || [])];
  };

  return (
    <aside className="fixed left-0 top-16 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="mb-4 p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Welcome, {user?.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {user?.role}
          </p>
        </div>
        <ul className="space-y-2 font-medium">
          {getMenuItems().map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}