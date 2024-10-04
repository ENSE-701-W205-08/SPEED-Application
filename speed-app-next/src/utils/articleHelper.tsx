import { BibtexParser } from 'bibtex-js-parser'; // Import the BibTeX parser

// Define the Article class for OOP-style querying
export class Article {
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
    description: string
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
  }

  // Static method to create an Article object from form-based data
  static fromFormData(
    title: string,
    author: string,
    year: Date,
    journal: string,
    volume: string,
    number: string,
    doi: string,
    url: string,
    issn: string,
    copyright: string,
    description: string
  ): Article {
    return new Article(
      title,
      author,
      parseInt(year.getFullYear().toString(), 10),
      journal,
      volume,
      number,
      doi,
      url,
      issn,
      copyright,
      description
    );
  }

  // Static method to create an Article object from BibTeX data
  static fromBibtexData(bibtex: string, description: string): Article {
    const parser = BibtexParser;
    const parsed = parser.parseToJSON(bibtex)[0]; // Parse the BibTeX string

    return new Article(
      parsed.title || '',
      parsed.author || '',
      Date.parse(parsed.year?.toString() || '') || new Date().getFullYear(),
      parsed.journal || '',
      parsed.volume || '',
      parsed.number?.toString()|| '',
      parsed.doi || '',
      parsed.url || '',
      parsed.issn || '',
      parsed.copyright || '',
      description
    );
  }
}

// Example usage of the Article class (either from form data or BibTeX)
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
  description: string
): Article {
  if (isBibtexMode) {
    return Article.fromBibtexData(bibtex, description); // Parse BibTeX and create Article object
  } else {
    return Article.fromFormData(
      title,
      author,
      new Date(year),
      journal,
      volume,
      number,
      doi,
      url,
      issn,
      copyright,
      description
    ); // Use form data to create Article object
  }
}
