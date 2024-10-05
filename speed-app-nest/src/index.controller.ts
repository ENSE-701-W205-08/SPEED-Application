import { Controller, Get, Redirect } from '@nestjs/common';
import { IndexService } from './index.service';

@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  // Redirect to the Next.js app
  @Get()
  @Redirect('https://speed-app-next.vercel.app')
  redirectOut() {
    return { url: 'https://speed-app-next.vercel.app' };
  }
}
