import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import BackgroundScribbles from './components/BackgroundScribbles';
import BackgroundLottie from './components/BackgroundLottie';
import { useAuth } from './context/AuthContext';
import EpicGradientBackground from './components/EpicGradientBackground';

// Pages
import LoginPage from './pages/Auth/LoginPage';
import UploadProductPage from './pages/artisan/UploadProductPage';
import ManageProductsPage from './pages/artisan/ManageProductsPage';
import OrdersDashboardPage from './pages/buyer/OrdersDashboardPage';
import AnalyticsDashboardPage from './pages/artisan/AnalyticsDashboardPage';
import MapPage from './pages/buyer/MapPage';
import ExplorePage from './pages/buyer/ExplorePage';
import CartPage from './pages/buyer/CartPage';
import ProfilePageBuyer from './pages/buyer/ProfilePageBuyer';
import ProfilePageArtisan from './pages/artisan/ProfilePageArtisan';

const AppShell = () => {
  const { currentUser } = useAuth();
  return (
    <>
  {/* Show epic gradient background for logged-in users */}
  {currentUser ? <EpicGradientBackground /> : null}
  {/* Optionally layer scribbles for unauthenticated users */}
  {!currentUser ? <BackgroundScribbles /> : null}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/explore" />} />

          {/* Artisan Routes */}
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-products"
            element={
              <ProtectedRoute>
                <ManageProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Buyer Routes */}
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
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
            path="/profile-artisan"
            element={
              <ProtectedRoute>
                <ProfilePageArtisan />
              </ProtectedRoute>
            }
          />
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