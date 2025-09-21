import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginEmail, loginGoogle, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState('buyer');
  const navigate = useNavigate();

  useEffect(() => {
    // Add class to body for consistent background
    document.body.classList.add('bg-amber-50');
    
    return () => {
      document.body.classList.remove('bg-amber-50');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await loginEmail(email, password, selectedRole);
      // Navigation after successful login will be handled by the AuthContext
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginGoogle(selectedRole);
      // Navigation after successful login will be handled by the AuthContext
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google.');
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.h1 
                className="text-4xl font-serif font-bold text-amber-900 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Welcome Back
              </motion.h1>
              <motion.p 
                className="text-amber-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sign in to your account
              </motion.p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm text-amber-900 placeholder-amber-400"
                  placeholder="your@email.com"
                  required
                  data-cursor="text"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm text-amber-900 placeholder-amber-400"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  data-cursor="text"
                />
              </div>

              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-amber-800">I am a</label>
                <select
                  className="px-3 py-2 rounded-lg border border-amber-200 bg-white/50 backdrop-blur-sm text-amber-900 cursor-none"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  data-cursor="pointer"
                >
                  <option value="buyer">Buyer</option>
                  <option value="artisan">Artisan</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-none ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  data-cursor="pointer"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-amber-700">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-amber-200 rounded-lg shadow-sm bg-white text-sm font-medium text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-none"
                  data-cursor="pointer"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="mt-6 text-center text-sm">
                <span className="text-amber-700">Don't have an account? </span>
                <button
                  onClick={() => navigate('/register')}
                  className="font-medium text-amber-800 hover:text-amber-900 cursor-none"
                  data-cursor="pointer"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;