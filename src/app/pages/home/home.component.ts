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
  featuredProducts: any[] = [];
  categories = [
    { name: 'Electrónica', image: '/assets/electronics.jpg' },
    { name: 'Moda', image: '/assets/fashion.jpg' },
    { name: 'Hogar', image: '/assets/home.jpg' },
  ];
  isLoading = true; 

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {

    this.animateBenefits();
    

    this.getFeaturedProducts();
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


  async getFeaturedProducts() {

    const cachedProducts = localStorage.getItem('products');
    if (cachedProducts) {
      this.featuredProducts = JSON.parse(cachedProducts).slice(0, 3);
      this.isLoading = false; 
    } else {
      try {
        const products = await this.productService.getProduct();
        this.featuredProducts = products.slice(0, 3); 
        localStorage.setItem('products', JSON.stringify(products));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  goToProductDetails(id: number) {
    this.router.navigate(['/information', id]);  
  }
}
