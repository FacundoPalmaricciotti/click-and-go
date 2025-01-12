import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Hace que el servicio sea accesible globalmente
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products'; // URL base de la API

  // Método para obtener todos los productos
  async getProduct() {
    try {
      const response = await fetch(this.apiUrl); // Solicitar todos los productos
      const data = await response.json(); // Parsear la respuesta
      return data; // Devolver el arreglo de productos
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Propagar el error
    }
  }

  // Método para obtener un producto por su ID
  async getProductById(id: string) {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`); // Verifica que la URL esté bien formada
      const data = await response.json(); // Parsear la respuesta como JSON
      return data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }
}