'use client';

import React, { useState, useEffect } from "react";
import { fetchApprovedArticles } from "@/utils/article-api"; // Use fetch for approved articles
import { Article } from "@/utils/articleHelper";
import { useRouter } from "next/navigation";

const SearchPage = () => {
  const [approvedArticles, setApprovedArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]); // For filtering articles
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Sorting state
  const [sortField, setSortField] = useState<string>("title"); // Default sorting by title
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // Store the selected article
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
  const router = useRouter();

  // Fetch approved articles from the backend
  const getApprovedArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchApprovedArticles(); // Fetch approved articles
      setApprovedArticles(data);
      setFilteredArticles(data); // Initially show all articles
    } catch (error) {
      console.error("Failed to fetch approved articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch approved articles when the component mounts
  useEffect(() => {
    getApprovedArticles();
  }, [router]);

  useEffect(() => {
    handleSort('title');
  }, [approvedArticles]);

  // Sort articles based on the field (title, author, journal, etc.)
  const handleSort = (field: string) => {
    const currentSortOrder = field === sortField ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    const sortedArticles = [...filteredArticles].sort((a, b) => {
      const fieldA = (a[field as keyof Article] || '').toString().toLowerCase();
      const fieldB = (b[field as keyof Article] || '').toString().toLowerCase();
      return currentSortOrder === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    });
    setFilteredArticles(sortedArticles);
    setSortField(field); // Update the sorting field
    setSortOrder(currentSortOrder); // Toggle sort order
  };

  // Handle search input change and filter the articles
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the approved articles based on the search query (by title, author, journal, doi, url)
    const filtered = approvedArticles.filter((article) =>
      article.title?.toLowerCase().includes(query) ||
      article.author?.toLowerCase().includes(query) ||
      article.journal?.toLowerCase().includes(query) ||
      article.doi?.toLowerCase().includes(query) ||
      article.url?.toLowerCase().includes(query)
    );

    setFilteredArticles(filtered); // Update filtered articles state
  };

  // Handle opening the modal with article details
  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true); // Show the modal when an article is clicked
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null); // Clear selected article when closing modal
  };

  return (
    <div className="container mt-4">
      <h1>Search Articles</h1>

      {/* Search Input Field */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, author, journal, DOI, or URL"
          value={searchQuery}
          onChange={handleSearchChange} // Update search query as user types
        />
      </div>

      {loading ? (
        <p>Loading approved articles...</p>
      ) : (
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th onClick={() => handleSort('title')} style={{ cursor: "pointer" }}>
                Title {sortField === "title" && (sortOrder === "desc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort('author')} style={{ cursor: "pointer" }}>
                Author {sortField === "author" && (sortOrder === "desc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort('journal')} style={{ cursor: "pointer" }}>
                Journal {sortField === "journal" && (sortOrder === "desc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort('doi')} style={{ cursor: "pointer" }}>
                DOI {sortField === "doi" && (sortOrder === "desc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort('url')} style={{ cursor: "pointer" }}>
                URL {sortField === "url" && (sortOrder === "desc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort('year')} style={{ cursor: "pointer" }}>
                Year {sortField === "year" && (sortOrder === "desc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article._id} onClick={() => handleArticleClick(article)} style={{ cursor: "pointer" }}>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{article.journal}</td>
                <td>{article.doi}</td>
                <td>{article.url}</td>
                <td>{article.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for displaying article details */}
      {selectedArticle && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Article Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Title:</strong> {selectedArticle.title}</p>
                <p><strong>Author:</strong> {selectedArticle.author}</p>
                <p><strong>Year:</strong> {selectedArticle.year}</p>
                <p><strong>Journal:</strong> {selectedArticle.journal || "N/A"}</p>
                <p><strong>Volume:</strong> {selectedArticle.volume || "N/A"}</p>
                <p><strong>Number:</strong> {selectedArticle.number || "N/A"}</p>
                <p><strong>DOI:</strong> {selectedArticle.doi || "N/A"}</p>
                <p><strong>URL:</strong> {selectedArticle.url || "N/A"}</p>
                <p><strong>ISSN:</strong> {selectedArticle.issn || "N/A"}</p>
                <p><strong>Copyright:</strong> {selectedArticle.copyright || "N/A"}</p>
                <p><strong>Description:</strong> {selectedArticle.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>
      )}
    </div>
  );
};

export default SearchPage;
