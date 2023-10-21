export interface NewsModel {
  id: string;
  title: string;
  text: string;
  published: string;
  slug: string;
  newsCategory: {
    name: string
  }
  author: {
    firstName: string;
    lastName: string;
  }
  imageUrl: string;
  readTime: number;


  shorttext: string;
  authorTemp: string;
  newsCategoryTemp: string;
}

export interface PageInfo {
  page: number;
  pageSize: number;
}

export interface NewsCategory {
  id: string;
  name: string;
}