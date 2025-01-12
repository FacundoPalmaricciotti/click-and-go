import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule, TruncatePipe, RouterOutlet],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: any[] = [];

   isLoading = true; // Inicializamos el estado de carga como verdadero
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.animateBenefits();
    this.loadProducts();
  }
  animateBenefits() {
    const listItems = document.querySelectorAll('.benefits li');

    // Convertir cada item a HTMLElement
    listItems.forEach((item, index) => {
      const liElement = item as HTMLElement; // Casting a HTMLElement
      setTimeout(() => {
        liElement.style.opacity = '1';
        liElement.style.transform = 'translateY(0)';
      }, 700 * index); // Animar cada item con un retraso más controlado
    });
  }
  
  // Cargar productos desde el localStorage si están almacenados
  async loadProducts() {
    // Revisamos si los productos ya están en el localStorage
    const cachedProducts = localStorage.getItem('products');
    if (cachedProducts) {
      this.products = JSON.parse(cachedProducts);
      this.isLoading = false; // Ya tenemos los productos, ocultamos el spinner
    } else {
      try {
        // Si no están en el localStorage, los obtenemos de la API
        this.products = await this.productService.getProduct();
        // Guardamos los productos en el localStorage
        localStorage.setItem('products', JSON.stringify(this.products));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        this.isLoading = false; // Aseguramos que se oculte el spinner cuando terminamos
      }
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
  }
}