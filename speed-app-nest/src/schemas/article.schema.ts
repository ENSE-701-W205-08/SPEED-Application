import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  year: number;

  @Prop()
  journal: string;

  @Prop()
  volume: string;

  @Prop()
  number: string;

  @Prop()
  doi: string;

  @Prop()
  url: string;

  @Prop()
  issn: string;

  @Prop()
  copyright: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  isApproved: boolean;

  @Prop({ required: true })
  dateOfSubmission: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
