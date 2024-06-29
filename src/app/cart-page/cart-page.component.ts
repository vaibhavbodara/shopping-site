import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Cart, PriceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  constructor(private product: ProductService, private router: Router) {}

  cartData: Cart[] | [] = [];
  priceSummary: PriceSummary = {
    amount: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  ngOnInit() {
    this.product.getCurrentCart().subscribe((res) => {
      this.cartData = res;

      let price: number = 0;

      res.forEach((item) => {
        if (item.quantity) price = price + +item.price * item.quantity;
      });

      this.priceSummary.amount = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = Number((price / 18).toFixed(2));
      this.priceSummary.delivery = 50;
      this.priceSummary.total = Number(
        (
          this.priceSummary.amount +
          this.priceSummary.delivery +
          this.priceSummary.tax -
          this.priceSummary.discount
        ).toFixed(2)
      );
    });
  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }
}
