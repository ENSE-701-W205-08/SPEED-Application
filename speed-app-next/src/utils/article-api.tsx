import { destinationUrl } from "./api";
import { Article } from "./articleHelper";

// Approve an article
export const approveArticle = async (id: string) => {
  try {
    const response = await fetch(destinationUrl + `articles/${id}/approve`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Failed to approve article");
    }
  } catch (error) {
    console.error("Error approving article:", error);
    throw error;
  }
};

// Reject an article
export const rejectArticle = async (id: string) => {
  try {
    const response = await fetch(destinationUrl + `articles/${id}/reject`, { method: "PATCH" });
    if (!response.ok) {
      throw new Error("Failed to reject article");
    }
  } catch (error) {
    console.error("Error rejecting article:", error);
    throw error;
  }
};

// Fetch article stats based on the provided filter (all-time, this-week, today)
export const fetchArticleStats = async (filter: string) => {
  try {
    const response = await fetch(
      destinationUrl + `articles/stats?filter=${filter}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching article stats:", error);
    throw error;
  }
};

// Fetch unapproved articles
export const fetchUnapprovedArticles = async () => {
  try {
    const response = await fetch(destinationUrl + "articles/unapproved");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch unapproved articles: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching unapproved articles:", error);
    throw error;
  }
};

export const fetchApprovedArticles = async () => {
  try {
    const response = await fetch(destinationUrl + "articles/approved");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch approved articles: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching approved articles:", error);
    throw error;
  }
}