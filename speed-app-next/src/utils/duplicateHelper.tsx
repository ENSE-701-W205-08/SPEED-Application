import leven from 'leven';
import { Article } from '@/utils/articleHelper';

// Define the function to identify potential duplicates based on Levenshtein distance
export const findDuplicates = (article: Article, allArticles: Article[]) => {
  const threshold = 5; // Maximum Levenshtein distance for a string to be considered similar

  return allArticles.filter((otherArticle) => {
    if (otherArticle._id === article._id) {
      return false; // Exclude the current article from comparison
    }

    // Calculate Levenshtein distance for title, DOI, and author fields
    const titleDistance = leven(otherArticle.title.toLowerCase(), article.title.toLowerCase());
    const doiDistance = otherArticle.doi && article.doi ? leven(otherArticle.doi.toLowerCase(), article.doi.toLowerCase()) : Infinity;
    const authorDistance = leven(otherArticle.author.toLowerCase(), article.author.toLowerCase());

    // Check if any of these fields are similar enough based on the threshold
    return titleDistance <= threshold || doiDistance <= threshold || authorDistance <= threshold;
  });
};