import { z } from 'zod';

export const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  final_price: z.number(),
});

export type ApiResponse = {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
};

export type EndProduct = z.infer<typeof productSchema>;
