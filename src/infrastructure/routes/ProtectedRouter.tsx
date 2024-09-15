import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../infrastructure/authContext';


export function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // console.log('🚀 ~ ProtectedRoute ~ allowedRoles.includes(user.dataUser?.rol):', allowedRoles.includes(user.dataUser?.rol))
  if (allowedRoles && !allowedRoles.includes(user.dataUser?.rol || '')) {
    window.history.back()
    return;
  }

  return children;
}