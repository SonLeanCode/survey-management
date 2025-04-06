import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import SurveyList from './pages/SurveyList';
import SurveyCreate from './pages/SurveyCreate';
import SurveyEdit from './pages/SurveyEdit';
import SurveyView from './pages/SurveyView';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import AuthSuccess from './pages/auth/AuthSuccess';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Layout>
          <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<Login />} />
                <Route path="/auth/success" element={<AuthSuccess />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/surveys"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/surveys/create"
                  element={
                    <PrivateRoute>
                      <SurveyCreate />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/surveys/:id/edit"
                  element={
                    <PrivateRoute>
                      <SurveyEdit />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/surveys/:id"
                  element={
                    <PrivateRoute>
                      <SurveyView />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
