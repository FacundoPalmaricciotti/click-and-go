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

   isLoading = true; 
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.animateBenefits();
    this.loadProducts();
  }
  animateBenefits() {
    const listItems = document.querySelectorAll('.benefits li');

    listItems.forEach((item, index) => {
      const liElement = item as HTMLElement; 
      setTimeout(() => {
        liElement.style.opacity = '1';
        liElement.style.transform = 'translateY(0)';
      }, 700 * index); 
    });
  }
  

  async loadProducts() {
    const cachedProducts = localStorage.getItem('products');
    if (cachedProducts) {
      this.products = JSON.parse(cachedProducts);
      this.isLoading = false;
    } else {
      try {
        this.products = await this.productService.getProduct();
        localStorage.setItem('products', JSON.stringify(this.products));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
  }
}