import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  constructor(private product: ProductService, private route: Router) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.product.getAllProductsApi().subscribe((res) => (this.products = res));
  }

  removeProduct(id: number) {
    this.product.removeProductApi(id).subscribe((res) => {
      if (res.status === 200) {
        this.products = this.products.filter((p) => p.id !== id);
      }
    });
  }

  navigateToUpdateProduct(id: number) {
    this.route.navigate(['seller-update-product', id]);
  }
}
