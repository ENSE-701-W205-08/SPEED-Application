'use client';

import React, { useState, useEffect } from "react";
import leven from 'leven'; // Levenshtein distance library
import {
  approveArticle,
  fetchUnapprovedArticles,
  rejectArticle,
} from "@/utils/article-api"; // Import the API function
import { findDuplicates } from "@/utils/duplicateHelper";
import { Article } from "@/utils/articleHelper";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";

const ReviewUnapprovedArticles = () => {
  const [unapprovedArticles, setUnapprovedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sorting state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // Store the selected article
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
  const [selectedDuplicate, setSelectedDuplicate] = useState<Article | null>(null); // Store the selected duplicate for comparison

  const { isLoggedIn } = useAuth(); // Access global login state and login action
  const router = useRouter();

  // Fetch unapproved articles from the backend
  const getUnapprovedArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchUnapprovedArticles(); // Use the extracted API function
      setUnapprovedArticles(data);
    } catch (error) {
      console.error("Failed to fetch unapproved articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unapproved articles when the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      getUnapprovedArticles();
    }
  }, [router, isLoggedIn]);

  // Highlight differences based on Levenshtein distance
  const highlightDifferences = (original: string, duplicate: string) => {
    const distance = leven(original, duplicate);

    if (distance === 0) {
      return 'bg-danger text-white'; // Identical fields (Red)
    } else if (distance === 1) {
      return 'bg-orange text-dark'; // One transformation (Orange)
    } else if (distance === 2) {
      return 'bg-warning text-dark'; // Two transformations (Yellow)
    } else {
      return ''; // No highlighting if the strings are sufficiently different
    }
  };

  // Sort articles by submission date
  const handleSort = () => {
    const sortedArticles = [...unapprovedArticles].sort((a, b) => {
      const dateA = new Date(a.dateOfSubmission).getTime();
      const dateB = new Date(b.dateOfSubmission).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setUnapprovedArticles(sortedArticles);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  const handleApprove = async (id: string | undefined) => {
    if (!id) {
      return;
    }
    try {
      await approveArticle(id); // Call API to approve the article
      setUnapprovedArticles(
        unapprovedArticles.filter((article) => article._id !== id)
      ); // Remove article from the list
    } catch (error) {
      console.error("Error approving article:", error);
    }
    handleCloseModal(); // Close the modal after approving the article
  };

  // Handle reject action
  const handleReject = async (id: string | undefined) => {
    if (!id) {
      return;
    }

    try {
      await rejectArticle(id); // Call API to reject the article
      setUnapprovedArticles(
        unapprovedArticles.filter((article) => article._id !== id)
      ); // Remove article from the list
    } catch (error) {
      console.error("Error rejecting article:", error);
    }
    handleCloseModal(); // Close the modal after rejecting the article
  };

  // Handle opening the modal with article details
  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true); // Show the modal when an article is clicked
    setSelectedDuplicate(null); // Reset the selected duplicate when opening a new article
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null); // Clear selected article when closing modal
    setSelectedDuplicate(null); // Reset selected duplicate
  };

  if (!isLoggedIn) {
    return (
      <div className="container mt-4">
        <p>Please login to view this page</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Unapproved Articles</h1>
      {loading ? (
        <p>Loading unapproved articles...</p>
      ) : (
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th style={{ cursor: "pointer" }} onClick={handleSort}>
                Submission Date {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {unapprovedArticles.map((article) => {
              const potentialDuplicates = findDuplicates(article, unapprovedArticles); // Check for potential duplicates
              return (
                <tr
                  key={article._id}
                  onClick={() => handleArticleClick(article)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {article.title}{" "}
                    {potentialDuplicates.length > 0 && (
                      <span className="text-warning">(Potential Duplicate)</span> // Show potential duplicate in the table
                    )}
                  </td>
                  <td>{article.description}</td>
                  <td>
                    {new Date(article.dateOfSubmission).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(article._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(article._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal for displaying article details */}
      {selectedArticle && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Article Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-wrap justify-content-between">
                  {/* Main Info Card */}
                  <div className="card mb-3 flex-fill" style={{ minWidth: "45%" }}>
                    <div className="card-body">
                      <h5 className="card-title">Main Information</h5>
                      <p><strong>Title:</strong> {selectedArticle.title}</p>
                      <p><strong>Author:</strong> {selectedArticle.author}</p>
                      <p><strong>Year:</strong> {selectedArticle.year}</p>
                      <p><strong>Journal:</strong> {selectedArticle.journal || "N/A"}</p>
                      <p><strong>Volume:</strong> {selectedArticle.volume || "N/A"}</p>
                      <p><strong>Number:</strong> {selectedArticle.number || "N/A"}</p>
                      <p><strong>DOI:</strong> {selectedArticle.doi || "N/A"}</p>
                      <p><strong>URL:</strong> {selectedArticle.url || "N/A"}</p>
                      <p><strong>ISSN:</strong> {selectedArticle.issn || "N/A"}</p>
                      <p><strong>Description:</strong> {selectedArticle.description}</p>
                    </div>
                  </div>

                  {/* Comparison Card */}
                  {selectedDuplicate && (
                    <div className="card mb-3 flex-fill" style={{ minWidth: "45%" }}>
                      <div className="card-body">
                        <h5 className="card-title">Comparison</h5>
                        <p className={highlightDifferences(selectedArticle.title, selectedDuplicate.title)}>
                          <strong>Title:</strong> {selectedDuplicate.title}
                        </p>
                        <p className={highlightDifferences(selectedArticle.author, selectedDuplicate.author)}>
                          <strong>Author:</strong> {selectedDuplicate.author}
                        </p>
                        <p className={highlightDifferences(selectedArticle.year.toString(), selectedDuplicate.year.toString())}>
                          <strong>Year:</strong> {selectedDuplicate.year}
                        </p>
                        <p className={highlightDifferences(selectedArticle.journal || "", selectedDuplicate.journal || "")}>
                          <strong>Journal:</strong> {selectedDuplicate.journal || "N/A"}
                        </p>
                        <p className={highlightDifferences(selectedArticle.volume || "", selectedDuplicate.volume || "")}>
                          <strong>Volume:</strong> {selectedDuplicate.volume || "N/A"}
                        </p>
                        <p className={highlightDifferences(selectedArticle.number || "", selectedDuplicate.number || "")}>
                          <strong>Number:</strong> {selectedDuplicate.number || "N/A"}
                        </p>
                        <p className={highlightDifferences(selectedArticle.doi || "", selectedDuplicate.doi || "")}>
                          <strong>DOI:</strong> {selectedDuplicate.doi || "N/A"}
                        </p>
                        <p className={highlightDifferences(selectedArticle.url || "", selectedDuplicate.url || "")}>
                          <strong>URL:</strong> {selectedDuplicate.url || "N/A"}
                        </p>
                        <p className={highlightDifferences(selectedArticle.issn || "", selectedDuplicate.issn || "")}>
                          <strong>ISSN:</strong> {selectedDuplicate.issn || "N/A"}
                        </p>
                        <p className={highlightDifferences(selectedArticle.description || "", selectedDuplicate.description || "")}>
                          <strong>Description:</strong> {selectedDuplicate.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Duplicates Card */}
                {findDuplicates(selectedArticle, unapprovedArticles).length > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Potential Duplicates</h5>
                      <ul>
                        {findDuplicates(selectedArticle, unapprovedArticles).map((duplicate) => (
                          <li
                            key={duplicate._id}
                            onClick={() => setSelectedDuplicate(duplicate)}
                            style={{ cursor: "pointer", color: 'blue' }}
                          >
                            {duplicate.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Key for Highlighting */}
                    <div className="alert alert-info">
                      <strong>Highlight Key:</strong>
                      <ul>
                        <li><span className="bg-danger text-white px-2">Red</span> - Identical fields (Levenshtein distance = 0)</li>
                        <li><span className="bg-orange text-dark px-2">Orange</span> - One transformation required (Levenshtein distance = 1)</li>
                        <li><span className="bg-warning text-dark px-2">Yellow</span> - Two transformations required (Levenshtein distance = 2)</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the row click when clicking the button
                    handleApprove(selectedArticle._id);
                  }}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the row click when clicking the button
                    handleReject(selectedArticle._id);
                  }}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={handleCloseModal}
        ></div>
      )}
    </div>
  );
};

export default ReviewUnapprovedArticles;
