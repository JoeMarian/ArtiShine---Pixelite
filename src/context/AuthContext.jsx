import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const AuthContext = createContext({
  currentUser: null,
  role: null,
  loginEmail: async () => {},
  registerEmail: async () => {},
  loginGoogle: async () => {},
  logout: () => {},
  setRole: () => {},
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) localStorage.setItem('userId', user.uid);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (role) localStorage.setItem('role', role);
  }, [role]);

  const loginEmail = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const registerEmail = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ currentUser, role, setRole, loginEmail, registerEmail, loginGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};


