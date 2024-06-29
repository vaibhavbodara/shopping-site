import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  constructor(private product: ProductService, private route: Router) {}

  successMsg: string = '';

  addProduct(data: Product) {
    this.product.addProductApi(data).subscribe((res) => {
      this.successMsg = 'Product Added Successfully';
    });

    setTimeout(() => {
      this.successMsg = '';
      this.route.navigate(['/seller-home']);
    }, 1000);
  }
}
