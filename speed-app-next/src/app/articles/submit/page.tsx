'use client';

import React, { useState } from 'react';
import { constructArticle, Article } from '@/utils/articleHelper'; // Import helper functions
import { postData, destinationUrl } from '@/utils/api'; // Import the reusable postData function

export default function SubmissionPage() {
  // State for form input fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [journal, setJournal] = useState('');
  const [volume, setVolume] = useState('');
  const [number, setNumber] = useState('');
  const [url, setUrl] = useState('');
  const [issn, setIssn] = useState('');
  const [copyright, setCopyright] = useState('');
  
  // BibTeX mode
  const [bibtex, setBibtex] = useState('');

  // Common fields
  const [doi, setDoi] = useState('');
  const [description, setDescription] = useState('');
  
  // Toggle state
  const [isBibtexMode, setIsBibtexMode] = useState(false);

  // Output message
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [articleData, setArticleData] = useState<object | null>(null); // Store article object

  // Handle submission (either form or BibTeX)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the Article object (either from form or BibTeX data)
    const article = constructArticle(
      isBibtexMode,
      bibtex,
      title,
      author,
      year,
      journal,
      volume,
      number,
      doi,
      url,
      issn,
      copyright,
      description
    );

    // Log the Article object for demonstration
    console.log('Article Object:', article);
    
    // Send the article object to the backend using postData
    const message = await postData(destinationUrl, article);
    setResponseMessage(message);

    // Store the article data for later use (if needed)
    setArticleData(article);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Submit a New Article</h1>

      {/* Toggle button to switch between form and BibTeX mode */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => setIsBibtexMode(!isBibtexMode)}
      >
        {isBibtexMode ? 'Switch to Form Input' : 'Switch to BibTeX Input'}
      </button>

      <form onSubmit={handleSubmit}>
        {isBibtexMode ? (
          <>
            {/* BibTeX input */}
            <div className="mb-3">
              <label htmlFor="bibtex" className="form-label">
                BibTeX Data <span className="text-danger">*</span>
              </label>
              <textarea
                id="bibtex"
                className="form-control"
                rows={5}
                value={bibtex}
                onChange={(e) => setBibtex(e.target.value)}
                placeholder="Paste BibTeX data here"
                required
              ></textarea>
            </div>
          </>
        ) : (
          <>
            {/* Form input fields */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the article title"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="author"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter the author's name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="year" className="form-label">
                Year <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="year"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter the year of publication"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="journal" className="form-label">
                Journal <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="journal"
                className="form-control"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                placeholder="Enter the journal name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="volume" className="form-label">
                Volume <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="volume"
                className="form-control"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="Enter the volume"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter the issue number"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="url" className="form-label">
                URL <span className="text-danger">*</span>
              </label>
              <input
                type="url"
                id="url"
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter the URL"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="issn" className="form-label">
                ISSN <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="issn"
                className="form-control"
                value={issn}
                onChange={(e) => setIssn(e.target.value)}
                placeholder="Enter the ISSN"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="copyright" className="form-label">
                Copyright <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="copyright"
                className="form-control"
                value={copyright}
                onChange={(e) => setCopyright(e.target.value)}
                placeholder="Enter the copyright information"
              />
            </div>
          </>
        )}

        {/* DOI input */}
        <div className="mb-3">
          <label htmlFor="doi" className="form-label">
            DOI <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="doi"
            className="form-control"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            placeholder="Enter the DOI"
            required
          />
        </div>

        {/* Description input */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Brief Description <span className="text-danger">*</span>
          </label>
          <textarea
            id="description"
            className="form-control"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description of the article"
            required
          ></textarea>
        </div>

        <div className="text-muted mb-3">
          <span className="text-danger">*</span> Required fields
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Display server response */}
      {responseMessage && (
        <div className="mt-4 alert alert-info">
          {responseMessage}
        </div>
      )}
    </div>
  );
}
