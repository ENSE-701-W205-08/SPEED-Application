import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article, ArticleDocument } from './article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  // Create a new article
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  // Get all articles (optional, for future use)
  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  // Get a single article by ID
  async findById(id: string): Promise<Article> {
    return this.articleModel.findById(id).exec();
  }

  // Get articles by date range
  async findByDateRange(startDate: Date, endDate: Date): Promise<Article[]> {
    console.log(startDate, endDate);
    const articles = await this.findAll();

    const filteredArticles = articles.filter((article) => {
      const articleDate = new Date(article.dateOfSubmission);
      return articleDate >= startDate && articleDate <= endDate;
    });

    return filteredArticles;
  }

  async getStats(filter: string): Promise<any> {
    const stats = {
      totalArticles: 0,
      approvedArticles: 0,
      unapprovedArticles: 0,
    };

    const today = new Date(Date.now());
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const oneWeekAgo = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (filter == 'all-time') {
      const articles = await this.findAll();

      console.log(articles);

      stats.totalArticles = await this.getArticleCount(articles);
      stats.approvedArticles = await this.getApprovedArticlesCount(articles);
      stats.unapprovedArticles =
        await this.getUnapprovedArticlesCount(articles);
    } else if (filter == 'one-week') {
      const articles = await this.findByDateRange(oneWeekAgo, today);

      console.log(articles);

      stats.totalArticles = await this.getArticleCount(articles);
      stats.approvedArticles = await this.getApprovedArticlesCount(articles);
      stats.unapprovedArticles =
        await this.getUnapprovedArticlesCount(articles);
    } else if (filter == 'today') {
      const articles = await this.findByDateRange(todayStart, today);

      console.log(articles);

      stats.totalArticles = await this.getArticleCount(articles);
      stats.approvedArticles = await this.getApprovedArticlesCount(articles);
      stats.unapprovedArticles =
        await this.getUnapprovedArticlesCount(articles);
    } else {
      return { error: 'Invalid filter' };
    }

    return stats;
  }

  // Get total number of articles
  async getTotalArticles(): Promise<number> {
    return this.articleModel.countDocuments().exec();
  }

  // Get total number of articles by author
  async getArticleCount(articles: Article[]): Promise<number> {
    return articles.length;
  }

  // Fetch all unapproved articles (isApproved = false)
  async getUnapprovedArticles(): Promise<ArticleDocument[]> {
    return this.articleModel.find({ isApproved: false }).exec();
  }

  // Fetch all approved articles (isApproved = true)
  async getApprovedArticles(): Promise<ArticleDocument[]> {
    return this.articleModel.find({ isApproved: true }).exec();
  }

  // Fetch all approved articles (isApproved = true)
  async getApprovedArticlesCount(articles: Article[]): Promise<number> {
    let count = 0;
    articles.forEach((article) => {
      if (article.isApproved) {
        count++;
      }
    });

    return count;
  }

  async getUnapprovedArticlesCount(articles: Article[]): Promise<number> {
    let count = 0;
    articles.forEach((article) => {
      if (!article.isApproved) {
        count++;
      }
    });

    return count;
  }

  // Update the approval status of the article
  async updateApprovalStatus(
    id: string,
    isApproved: boolean,
  ): Promise<ArticleDocument> {
    return this.articleModel.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true },
    );
  }
}
