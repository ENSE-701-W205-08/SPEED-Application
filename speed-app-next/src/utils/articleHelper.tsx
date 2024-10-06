// Import the BibTeX parser
import { BibtexParser } from 'bibtex-js-parser';

// Define the Article class for OOP-style querying
export class Article {
  _id?: string;
  title: string;
  author: string;
  year: number;
  journal: string;
  volume: string;
  number: string;
  doi: string;
  url: string;
  issn: string;
  copyright: string;
  description: string;
  isApproved: boolean;
  dateOfSubmission: string;

  constructor(
    title: string,
    author: string,
    year: number,
    journal: string,
    volume: string,
    number: string,
    doi: string,
    url: string,
    issn: string,
    copyright: string,
    description: string,
    isApproved: boolean,
    dateOfSubmission: string
  ) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.journal = journal;
    this.volume = volume;
    this.number = number;
    this.doi = doi;
    this.url = url;
    this.issn = issn;
    this.copyright = copyright;
    this.description = description;
    this.isApproved = isApproved;
    this.dateOfSubmission = dateOfSubmission;
  }

  // Static method to create an Article object from form-based data
  static fromFormData(
    title: string,
    author: string,
    year: string,
    journal: string,
    volume: string,
    number: string,
    doi: string,
    url: string,
    issn: string,
    copyright: string,
    description: string,
    isApproved: boolean,
    dateOfSubmission: string
  ): Article {
    return new Article(
      title,
      author,
      parseInt(year, 10),
      journal,
      volume,
      number,
      doi,
      url,
      issn,
      copyright,
      description,
      isApproved,
      dateOfSubmission
    );
  }

  // Static method to create an Article object from BibTeX data
  static fromBibtexData(bibtex: string, description: string, isApproved: boolean, dateOfSubmission: string): Article {
    const parser = BibtexParser;
    const parsed = parser.parseToJSON(bibtex)[0]; // Parse the BibTeX string

    return new Article(
      parsed.title || '',
      parsed.author || '',
      parseInt(parsed.year?.toString() || '', 10) || new Date().getFullYear(),
      parsed.journal || '',
      parsed.volume || '',
      (parsed.number?.toString() || ''),
      parsed.doi || '',
      parsed.url || '',
      parsed.issn || '',
      parsed.copyright || '',
      description,
      isApproved,
      dateOfSubmission
    );
  }
}

// Helper function to construct an Article object (from either form data or BibTeX)
export function constructArticle(
  isBibtexMode: boolean,
  bibtex: string,
  title: string,
  author: string,
  year: string,
  journal: string,
  volume: string,
  number: string,
  doi: string,
  url: string,
  issn: string,
  copyright: string,
  description: string,
  isApproved: boolean,
  dateOfSubmission: string
): Article {
  if (isBibtexMode) {
    return Article.fromBibtexData(bibtex, description, isApproved, dateOfSubmission); // Parse BibTeX and create Article object
  } else {
    return Article.fromFormData(
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
      description,
      isApproved,
      dateOfSubmission
    ); // Use form data to create Article object
  }
}
