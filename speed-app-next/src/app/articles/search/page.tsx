'use client'; // Mark this as a client-side component

import React, { useState } from 'react';

// Mock data for articles
const articles = [
  { id: 1, title: 'Understanding React Hooks', content: 'Learn about useState, useEffect, and more.' },
  { id: 2, title: 'Building with Next.js', content: 'A guide to building modern applications with Next.js.' },
  { id: 3, title: 'JavaScript ES6 Features', content: 'Learn about arrow functions, destructuring, and more.' },
  { id: 4, title: 'CSS Grid vs Flexbox', content: 'Which layout system should you use?' },
  { id: 5, title: 'Getting Started with MongoDB', content: 'An introduction to NoSQL databases and MongoDB.' },
];

export default function SearchPage() {
  const [query, setQuery] = useState(''); // Search query state
  const [filteredArticles, setFilteredArticles] = useState(articles); // Articles to display

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    // Filter articles based on the search query
    const filtered = articles.filter(
      article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm)
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Search Articles</h1>

      {/* Search Input */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search for articles..."
        value={query}
        onChange={handleSearch}
      />

      {/* Articles List */}
      <div>
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div key={article.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}
