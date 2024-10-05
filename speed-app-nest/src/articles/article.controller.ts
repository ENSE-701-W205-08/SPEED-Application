import { Controller, Post, Body, Get, Redirect } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.schema';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('submit')
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  // Redirect to the Next.js app
  @Get('submit')
  @Redirect('https://speed-app-next.vercel.app')
  redirectOut() {
    return { url: 'https://speed-app-next.vercel.app' };
  }
}
