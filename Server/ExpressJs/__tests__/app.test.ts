import request from 'supertest';
import app from '../app';
import { ApiResponse } from '../types';

describe('GET /products', () => {
  it('should return status 200 and valid data for a valid request', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const firstProduct: ApiResponse = response.body[0];
      expect(firstProduct).toHaveProperty('title');
      expect(firstProduct).toHaveProperty('description');
      expect(firstProduct).toHaveProperty('final_price');
      
    }
  });
});
