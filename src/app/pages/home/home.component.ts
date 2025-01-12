import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = []; // Aquí vamos a almacenar los productos obtenidos de la API
  categories = [
    { name: 'Electrónica', image: '/assets/electronics.jpg' },
    { name: 'Moda', image: '/assets/fashion.jpg' },
    { name: 'Hogar', image: '/assets/home.jpg' },
  ];
  isLoading = true; // Inicializamos el estado de carga como verdadero

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Llamar a la animación de carga cuando el componente se inicie
    this.animateBenefits();
    
    // Obtener los tres primeros productos desde la API
    this.getFeaturedProducts();
  }

  // Función para animar los elementos
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

  // Método para obtener los tres primeros productos desde la API
  async getFeaturedProducts() {
    // Revisamos si los productos ya están en el localStorage
    const cachedProducts = localStorage.getItem('products');
    if (cachedProducts) {
      this.featuredProducts = JSON.parse(cachedProducts).slice(0, 3); // Solo obtener los tres primeros productos
      this.isLoading = false; // Ya tenemos los productos, ocultamos el spinner
    } else {
      try {
        const products = await this.productService.getProduct();
        this.featuredProducts = products.slice(0, 3); // Obtener solo los tres primeros productos
        // Guardamos los productos en localStorage para futuras visitas
        localStorage.setItem('products', JSON.stringify(products));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        this.isLoading = false; // Cambiar el estado de carga a falso cuando los productos se hayan cargado
      }
    }
  }

  // Método para navegar a la página de detalles del producto
  goToProductDetails(id: number) {
    this.router.navigate(['/information', id]);  
  }
}
