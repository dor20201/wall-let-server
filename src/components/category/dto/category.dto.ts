export class CategoryDto {
  category: string;
  importance: number;
  subCategory: [{ name: string, importance: number }];
}
