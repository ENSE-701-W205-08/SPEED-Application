import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from '../dto/create-article.dto';
import { Article, ArticleDocument } from '../schemas/article.schema';

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

  // Get a single article by ID (optional, for future use)
  async findById(id: string): Promise<Article> {
    return this.articleModel.findById(id).exec();
  }
}
