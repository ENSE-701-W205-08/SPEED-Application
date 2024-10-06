'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/AuthContext';

const AdminDashboard = () => {
    const { isLoggedIn } = useAuth(); // Access the login state
    const router = useRouter();
  
    // Automatically redirect to login if not logged in
    useEffect(() => {
      if (!isLoggedIn) {
        router.push('/login'); // Redirect to login if the user is logged out
      }
    }, [isLoggedIn, router]);
  
  return (
    <div className="container py-5">
      <h1>Welcome to the Admin Dashboard</h1>
      {/* Admin dashboard content goes here */}
    </div>
  );
};

export default AdminDashboard;
