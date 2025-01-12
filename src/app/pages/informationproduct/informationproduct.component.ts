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
  isLoading: boolean = true; // Estado de carga

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  async ngOnInit(): Promise<void> {
    const productId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la URL

    if (productId) {
      // Comprobar si el producto ya está en el almacenamiento local
      const cachedProduct = localStorage.getItem(`product_${productId}`);
      if (cachedProduct) {
        this.product = JSON.parse(cachedProduct);
        this.isLoading = false; // Ya tenemos el producto, ocultamos el spinner
      } else {
        try {
          this.isLoading = true; // Comienza a cargar el producto
          this.product = await this.productService.getProductById(productId);
          
          // Guardar el producto en el localStorage para futuras visitas
          localStorage.setItem(`product_${productId}`, JSON.stringify(this.product));
        } catch (err) {
          console.error('Error loading product details:', err);
          this.error = 'Error al cargar el producto.';
        } finally {
          this.isLoading = false; // Termina la carga del producto
        }
      }
    } else {
      this.error = 'ID de producto no válido.';
      this.isLoading = false; // Termina la carga, aunque no se encontró el producto
    }
  }
}
