import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent {
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  productList: Product[] = [];

  ngOnInit() {
    let query: string | null =
      this.activatedRoute.snapshot.paramMap.get('query');

    if (query) {
      this.product.searchProductApi(query).subscribe((res) => {
        this.productList = res;
      });
    }
  }

  navigateToProduct(id: number) {
    this.route.navigate(['product', id]);
  }
}
