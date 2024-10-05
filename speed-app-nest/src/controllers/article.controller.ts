import { Controller, Post, Body } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { Article } from '../schemas/article.schema';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('submit')
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }
}
