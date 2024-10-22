import { findDuplicates } from '@/utils/duplicateHelper';
import { Article } from '@/utils/articleHelper';

describe('findDuplicates', () => {
  const articleA: Article = {
      _id: '1',
      title: 'Original Article',
      author: 'Author A',
      doi: '10.1001/doi1',
      year: 2021,
      journal: 'Journal A',
      description: 'An original article.',
      isApproved: false,
      dateOfSubmission: '2024-10-11',
      volume: '',
      number: '',
      url: '',
      issn: '',
      copyright: ''
  };

  const articleB: Article = {
      _id: '2',
      title: 'Original Artcle', // One typo in the title
      author: 'Author A',
      doi: '10.1001/doi1',
      year: 2021,
      journal: 'Journal A',
      description: 'Another article.',
      isApproved: false,
      dateOfSubmission: '2024-10-12',
      volume: '',
      number: '',
      url: '',
      issn: '',
      copyright: ''
  };

  const articles: Article[] = [articleA, articleB];

  test('should return the correct duplicate for an article based on title', () => {
    const duplicates = findDuplicates(articleA, articles);
    expect(duplicates.length).toBe(1);
    expect(duplicates[0]._id).toBe('2'); // Article B is the duplicate
  });
});
