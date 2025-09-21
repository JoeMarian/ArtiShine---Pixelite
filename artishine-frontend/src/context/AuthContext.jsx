import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, googleProvider } from '../lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  const [loading, setLoading] = useState(true);
  // CHANGED: Added state for the ID token, initialized from localStorage
  const [idToken, setIdToken] = useState(() => localStorage.getItem('idToken'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // CHANGED: Get token, set it in state, and save to localStorage
        const token = await user.getIdToken();
        setIdToken(token);
        localStorage.setItem('idToken', token);
        localStorage.setItem('userId', user.uid);
      } else {
        // CHANGED: Clear token from state and localStorage on logout
        setIdToken(null);
        localStorage.removeItem('idToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('role'); // Also clear role on logout
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    }
  }, [role]);

  const loginEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    // CHANGED: Set token in state and localStorage after login
    setIdToken(token);
    localStorage.setItem('idToken', token);
    console.log("Firebase ID Token for testing:", token);
  };

  const registerEmail = async (email, password) => {
    // Note: You still need to call your backend here to create the user in Firestore
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
     // CHANGED: Set token in state and localStorage after registration
    setIdToken(token);
    localStorage.setItem('idToken', token);
  };

  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    // CHANGED: Set token in state and localStorage after Google login
    setIdToken(token);
    localStorage.setItem('idToken', token);
    console.log("Firebase ID Token for testing:", token);
  };

  const logout = async () => {
    await signOut(auth);
    // Note: The onAuthStateChanged listener will handle clearing state and localStorage
  };

  const value = {
    currentUser,
    idToken, // CHANGED: Expose the token through the context
    role,
    setRole,
    loginEmail,
    registerEmail,
    loginGoogle,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};