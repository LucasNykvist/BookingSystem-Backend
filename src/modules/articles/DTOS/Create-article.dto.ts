export class CreateArticleDTO {
  title: string;
  content: string;
  content1?: string;
  content2?: string;
  author: string;
  date: Date;
  image?: string;
  category: string;
}
