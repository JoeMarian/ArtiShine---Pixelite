import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import BackgroundScribbles from './components/BackgroundScribbles';
import BackgroundLottie from './components/BackgroundLottie';
import { useAuth } from './context/AuthContext';
import EpicGradientBackground from './components/EpicGradientBackground';
import CustomCursor from './components/CustomCursor';

// Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/HomePage';
import UploadProductPage from './pages/artisan/UploadProductPage';
import ManageProductsPage from './pages/artisan/ManageProductsPage';
import OrdersDashboardPage from '/Users/joemarian/Desktop/Artishine-frontend/src/pages/artisan/OrdersDashboardPage.jsx';
import AnalyticsDashboardPage from './pages/artisan/AnalyticsDashboardPage';
import MapPage from './pages/buyer/MapPage';
import ExplorePage from './pages/buyer/ExplorePage';
import CartPage from './pages/buyer/CartPage';
import ProfilePageBuyer from './pages/buyer/ProfilePageBuyer';
import ProfilePageArtisan from './pages/artisan/ProfilePageArtisan';

const AppShell = () => {
  const { currentUser, role } = useAuth();
  
  // Only redirect if explicitly logged in
  const shouldRedirect = (path) => {
    if (path === '/login' || path === '/register') {
      return currentUser ? <Navigate to={role === 'artisan' ? '/upload' : '/explore'} /> : null;
    }
    return null;
  };

  return (
    <>
      <CustomCursor />
      {currentUser ? <EpicGradientBackground /> : <BackgroundScribbles />}
      
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Login and Register routes without automatic redirects */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Artisan Routes */}
          <Route
            path="/upload"
            element={
              <ProtectedRoute requiredRole="artisan">
                <UploadProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-products"
            element={
              <ProtectedRoute requiredRole="artisan">
                <ManageProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requiredRole="artisan">
                <OrdersDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredRole="artisan">
                <AnalyticsDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Buyer Routes */}
          <Route
            path="/map"
            element={
              <ProtectedRoute requiredRole="buyer">
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute requiredRole="buyer">
                <ExplorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole="buyer">
                <CartPage />
              </ProtectedRoute>
            }
          />

          {/* Profile Routes - Role-based */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePageBuyer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artisan/profile"
            element={
              <ProtectedRoute requiredRole="artisan">
                <ProfilePageArtisan />
              </ProtectedRoute>
            }
          />

          {/* Catch all other routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
};

export default App;