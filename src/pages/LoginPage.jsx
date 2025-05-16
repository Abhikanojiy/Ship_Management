import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/Authentication/LoginForm';

const LoginPage = () => {
  const { user, loading } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
        <div className="w-12 h-12 border-t-4 border-b-4 border-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-100 to-blue-200 px-6 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side Welcome */}
        <div className="bg-gradient-to-b from-teal-400 to-teal-600 text-white p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-black mb-4 leading-tight">Welcome Back</h1>
          <p className="text-lg font-medium mb-6">
            Sign in to manage your fleet with the ENTNT Ship Maintenance System.
          </p>
          <div className="text-sm">
            <h3 className="font-semibold mb-2">Demo Access:</h3>
            <div className="grid gap-2">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded text-sm">
                <span className="inline-block font-semibold mr-2 bg-white/30 px-2 py-1 rounded-full text-white">Admin</span>
                admin@entnt.com / Admin@2024
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded text-sm">
                <span className="inline-block font-semibold mr-2 bg-white/30 px-2 py-1 rounded-full text-white">Inspector</span>
                inspector@entnt.com / Inspect@2024
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded text-sm">
                <span className="inline-block font-semibold mr-2 bg-white/30 px-2 py-1 rounded-full text-white">Engineer</span>
                engineer@entnt.com / Engineer@2024
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Login */}
        <div className="p-10 flex flex-col justify-center bg-white">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Login to ENTNT</h2>
            <p className="text-sm text-gray-600">Enter your credentials to access your dashboard</p>
          </div>

          <LoginForm />

          <footer className="mt-8 text-xs text-center text-gray-400">
            © 2025 ENTNT Inc. — Ship Maintenance Platform
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
