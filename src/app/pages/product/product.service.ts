import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';


  async getProduct() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json(); 
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }


  async getProductById(id: string) {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`); 
      const data = await response.json(); 
      return data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }
}