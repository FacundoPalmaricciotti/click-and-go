import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-informationproduct',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informationproduct.component.html',
  styleUrls: ['./informationproduct.component.css'],
})
export class InformationProductComponent implements OnInit {
  product: any = null;
  error: string | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  async ngOnInit(): Promise<void> {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      const cachedProduct = localStorage.getItem(`product_${productId}`);
      if (cachedProduct) {
        this.product = JSON.parse(cachedProduct);
        this.isLoading = false; 
      } else {
        try {
          this.isLoading = true; 
          this.product = await this.productService.getProductById(productId);
          
          localStorage.setItem(`product_${productId}`, JSON.stringify(this.product));
        } catch (err) {
          console.error('Error loading product details:', err);
          this.error = 'Error al cargar el producto.';
        } finally {
          this.isLoading = false;
        }
      }
    } else {
      this.error = 'ID de producto no válido.';
      this.isLoading = false;
    }
  }
}
