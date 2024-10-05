import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsOptional()
  journal?: string;

  @IsString()
  @IsOptional()
  volume?: string;

  @IsString()
  @IsOptional()
  number?: string;

  @IsString()
  doi: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  issn?: string;

  @IsString()
  @IsOptional()
  copyright?: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isApproved?: boolean;

  @IsString()
  dateOfSubmission: string;
}
