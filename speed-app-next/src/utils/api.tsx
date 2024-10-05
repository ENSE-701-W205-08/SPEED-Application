// Reusable function to send a POST request to the backend
const env = process.env.NODE_ENV
export const vercelUrl = 'https://speed-app-nest.vercel.app/';
export const destinationUrl = env === 'development' ? 'http://localhost:4000/' : vercelUrl;

export async function postDataArticle(url: string, data: object): Promise<string> {
    try {
      const response = await fetch(url+"articles/submit/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        return 'Article submitted successfully!';
      } else {
        return `Error: ${responseData.message}`;
      }
    } catch (error) {
      console.error('Error submitting article:', error);
      return 'Failed to submit the article. Please try again later.';
    }
  }
   