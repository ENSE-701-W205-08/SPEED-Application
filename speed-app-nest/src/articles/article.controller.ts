import {
  Controller,
  Post,
  Body,
  Get,
  Redirect,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
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

  // Endpoint to get stats for articles
  @Get('stats')
  async getArticleStats(@Query('filter') filter: string) {
    if (!filter) {
      filter = 'all-time'; // Default filter is all-time
    }

    return this.articleService.getStats(filter);
  }

  // Endpoint to get all unapproved articles
  @Get('unapproved')
  async getUnapprovedArticles() {
    return this.articleService.getUnapprovedArticles();
  }

  @Get('approved')
  async getApprovedArticles() {
    return this.articleService.getApprovedArticles();
  }

  // Endpoint to approve an article
  @Patch(':id/approve')
  async approveArticle(@Param('id') id: string) {
    return this.articleService.updateApprovalStatus(id, true);
  }

  // Endpoint to reject an article
  @Patch(':id/reject')
  async rejectArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(id);
  }
}
