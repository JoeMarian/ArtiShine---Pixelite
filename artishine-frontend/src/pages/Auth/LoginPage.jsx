import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginEmail, registerEmail, loginGoogle, loading, currentUser, role, setRole } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, selectRole] = useState(role || 'buyer');

  useEffect(() => {
    if (role && currentUser) {
      navigate(role === 'artisan' ? '/upload' : '/explore');
    }
  }, [currentUser, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRole(selectedRole);
    if (isRegister) {
      await registerEmail(email, password);
    } else {
      await loginEmail(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Welcome to ARTISHINE</h1>
          <p className="text-muted-foreground">Login or Register to continue</p>
        </div>
        <div className="card-warm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium">I am a</label>
                <select
                  className="px-3 py-2 rounded-lg border border-border "
                  value={selectedRole}
                  onChange={(e) => selectRole(e.target.value)}
                >
                  <option value="buyer">Buyer</option>
                  <option value="artisan">Artisan</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setIsRegister((s) => !s)}
                className="text-sm text-primary hover:underline"
              >
                {isRegister ? 'Have an account? Sign In' : 'New here? Create Account'}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>
            <PrimaryButton type="submit" disabled={loading} size="lg" className="w-full">
              {loading ? (isRegister ? 'Creating...' : 'Signing In...') : isRegister ? 'Create Account' : 'Sign In'}
            </PrimaryButton>
          </form>
          <div className="mt-6 space-y-3">
            <button
              onClick={async () => {
                setRole(selectedRole);
                await loginGoogle();
              }}
              className="w-full px-4 py-3 rounded-xl border border-border  hover:bg-muted transition-colors"
            >
              Continue with Google
            </button>
            <div id="recaptcha-container" />
            <p className="text-xs text-muted-foreground text-center">By continuing you agree to our Terms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;