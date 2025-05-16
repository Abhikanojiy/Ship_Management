import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './components/Ships/ShipDetail';
import ShipForm from './components/Ships/ShipForm';
import ProtectedRoute from './components/ProtectedRoute';

import { ShipsProvider } from './contexts/ShipsContext';
import { AuthProvider } from './contexts/AuthContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import ComponentsPage from './pages/ComponentsPage';
import ComponentForm from './components/Components/ComponentForm';
import { JobsProvider } from './contexts/JobsContext';
import JobCalendarPage from './pages/JobCalendarPage';
import JobForm from './components/jobs/JobForm';
import JobsPage from './pages/JobsPage';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { initializeData } from './utils/localStorageUtils';
import { useEffect } from 'react';
import DashboardPage from './pages/DashboardPage';
function App() {

   useEffect(() => {
    initializeData();
  }, []);
  return (
    <Router>
      <AuthProvider>
        <ShipsProvider>
          <ComponentsProvider>
            <JobsProvider>
                 <NotificationsProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
        
              {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

                 <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/ships" element={<ShipsPage />} />
              <Route path="/ships/new" element={<ShipForm />} />
              <Route path="/ships/edit/:id" element={<ShipForm isEditing />} />
              <Route path="/ships/:id" element={<ShipDetailPage />} />

                
                    {/* Components routes */}
                    <Route path="/components" element={<ComponentsPage />} />
                    <Route path="/components/new" element={<ComponentForm />} />
                    <Route path="/components/new/:shipId" element={<ComponentForm />} />
                    <Route path="/components/edit/:id" element={<ComponentForm isEditing />} />
                    <Route path="/components/:id" element={<ShipDetailPage />} /> {/* We'll use ship detail page */}

                      <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/jobs/new" element={<JobForm />} />
                    <Route path="/jobs/new/:shipId" element={<JobForm />} />
                    <Route path="/jobs/new/:shipId/:componentId" element={<JobForm />} />
                    <Route path="/jobs/edit/:id" element={<JobForm isEditing />} />
                    <Route path="/jobs/:id" element={<JobForm isEditing />} />
                    <Route path="/calendar" element={<JobCalendarPage />} />

                    <Route path="/unauthorized" element={
                      <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                          <div className="text-center">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Unauthorized</h2>
                            <p className="mt-2 text-sm text-gray-600">
                              You don't have permission to access this page
                            </p>
                          </div>
                        </div>
                      </div>
                    } />
                  </Route>
                  
                  {/* Redirect to login by default */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                    
       
          </Routes>
             </NotificationsProvider>
          </JobsProvider>
          </ComponentsProvider>
        </ShipsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
