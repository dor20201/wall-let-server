export class CategoriesDto {
  category: string;
  importance: number;
  subCategory: [{ name: string, importance: number }];
}
