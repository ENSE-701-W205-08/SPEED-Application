'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchArticleStats } from '@/utils/article-api';  // Import the API function

const AdminStatsCard = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    approvedArticles: 0,
    unapprovedArticles: 0,
  });
  const [filter, setFilter] = useState('all-time'); // Filter state (all-time, this-week, today)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch the stats from the API
  const getStats = async (filter: string) => {
    setLoading(true);
    try {
      const data = await fetchArticleStats(filter); // Use the extracted API function
      setStats({
        totalArticles: data.totalArticles,
        approvedArticles: data.approvedArticles,
        unapprovedArticles: data.unapprovedArticles,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats when the filter changes
  useEffect(() => {
    getStats(filter);
  }, [filter]);

  // Handle the filter change (all time, this week, today)
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Navigate to the page for reviewing unapproved articles
  const navigateToReview = () => {
    router.push('/articles/review'); // Replace with the correct route
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Article Statistics</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>Total Articles: {stats.totalArticles}</p>
            <p>Approved Articles: {stats.approvedArticles}</p>
            <p>Unapproved Articles: {stats.unapprovedArticles}</p>
          </div>
        )}
        <div className="filter-buttons">
          <button
            className={filter === 'all-time' ? 'active' : ''}
            onClick={() => handleFilterChange('all-time')}
          >
            All Time
          </button>
          <button
            className={filter === 'one-week' ? 'active' : ''}
            onClick={() => handleFilterChange('one-week')}
          >
            One Week
          </button>
          <button
            className={filter === 'today' ? 'active' : ''}
            onClick={() => handleFilterChange('today')}
          >
            Today
          </button>
        </div>
        <button className="review-button" onClick={navigateToReview}>
          Review Unapproved Articles
        </button>
      </div>
    </div>
  );
};

export default AdminStatsCard;
