import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Author is required' })
  author: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Year is required' })
  year: number;

  @IsString()
  @IsOptional() // Journal is optional
  journal?: string;

  @IsString()
  @IsOptional() // Volume is optional
  volume?: string;

  @IsString()
  @IsOptional() // Number is optional
  number?: string;

  @IsString()
  @IsNotEmpty({ message: 'DOI is required' })
  doi: string;

  @IsUrl({}, { message: 'Invalid URL format' })
  @IsOptional() // URL is optional
  url?: string;

  @IsString()
  @IsOptional() // ISSN is optional
  issn?: string;

  @IsString()
  @IsOptional() // Copyright is optional
  copyright?: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsOptional()
  isApproved?: boolean; // Optional, defaults to false in the service

  @IsString()
  @IsNotEmpty({ message: 'Date of submission is required' })
  dateOfSubmission: string;
}
