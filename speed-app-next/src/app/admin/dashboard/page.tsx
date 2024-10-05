'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the token exists
    const token = localStorage.getItem('token');

    // If no token, redirect to login page
    if (!token) {
      router.push('/login');
    }

  }, [router]);

  return (
    <div className="container py-5">
      <h1>Welcome to the Admin Dashboard</h1>
      {/* Admin dashboard content goes here */}
    </div>
  );
};

export default AdminDashboard;
