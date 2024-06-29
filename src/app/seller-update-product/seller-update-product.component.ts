import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent {
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  item: undefined | Product;
  updateMessage: string = '';

  ngOnInit() {
    let productId: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');
    this.product.getProduct(productId).subscribe((res) => {
      this.item = res;
    });
  }

  updateProduct(data: Product) {
    this.product.updateProductApi(this.item?.id, data).subscribe((res) => {
      if (res.status === 200) {
        this.updateMessage = 'Product details are updated successfully';
        setTimeout(() => this.route.navigate(['seller-home']), 1000);
      } else {
        this.updateMessage = 'Error occured while updating product';
      }
    });
  }
}
