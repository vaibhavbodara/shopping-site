import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private product: ProductService, private route: Router) {}
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];

  ngOnInit() {
    this.product.popularProductApi().subscribe((res) => {
      this.popularProducts = res;
    });

    this.product.trendyProductsApi().subscribe((res) => {
      this.trendyProducts = res;
    });
  }

  navigateToProduct(id: number) {
    this.route.navigate(['product', id]);
  }
}
