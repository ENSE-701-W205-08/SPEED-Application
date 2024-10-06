import { useRouter } from "next/router";

const env = process.env.NODE_ENV;
export const vercelUrl = "https://speed-app-nest.vercel.app/";
export const destinationUrl =
  env === "development" ? "http://localhost:4000/" : vercelUrl;

export async function postDataArticle(
  url: string,
  data: object
): Promise<string> {
  try {
    const response = await fetch(url + "articles/submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      return "Article submitted successfully!";
    } else {
      return `Error: ${responseData.message}`;
    }
  } catch (error) {
    console.error("Error submitting article:", error);
    return "Failed to submit the article. Please try again later.";
  }
}

export async function loginAdmin(email: string, password: string) {
  try {
    const response = await fetch(destinationUrl+'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid login credentials');
    }

    const data = await response.json();
    return data; // Return the token or any other relevant data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An error occurred during login.');
    } else {
      throw new Error('An error occurred during login.');
    }
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetch(destinationUrl+'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error registering user');
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message || 'Error during registration');
  }
};

export const logoutUser = () => {
  // Clear the token from localStorage
  localStorage.removeItem('token');
  return true;
};

// Fetch article stats based on the provided filter (all-time, this-week, today)
export const fetchArticleStats = async (filter: string) => {
  try {
    const response = await fetch(destinationUrl+`articles/stats?filter=${filter}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching article stats:', error);
    throw error;
  }
};

// Fetch unapproved articles
export const fetchUnapprovedArticles = async () => {
  try {
    const response = await fetch(destinationUrl+'articles/unapproved');
    if (!response.ok) {
      throw new Error(`Failed to fetch unapproved articles: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching unapproved articles:', error);
    throw error;
  }
};
