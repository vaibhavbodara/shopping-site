import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Cart, Product, SignUp } from '../data-type';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  item: Product | undefined;
  isItemAvailableInCart: boolean = false;
  localCartData: string | null = '';
  productQuantity: number = 1;
  cartData: Product | undefined;

  ngOnInit() {
    let productId: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');

    this.product.getProduct(productId).subscribe((res) => {
      this.item = res;
    });

    this.localCartData = localStorage.getItem('LOCAL_CART');

    if (this.localCartData) {
      let products: Product[] = JSON.parse(this.localCartData);

      let items = products.filter((p) => p.id.toString() == productId);

      if (items.length > 0) {
        this.isItemAvailableInCart = true;
      } else {
        this.isItemAvailableInCart = false;
      }
    }

    let userData: string | null = localStorage.getItem('USER');

    if (userData) {
      let user = JSON.parse(userData);
      let userId = user.id;

      this.product.getCart(userId);

      this.product.productData.subscribe((res) => {
        if (res) {
          let item = res.filter(
            (p: Product) => p.productId?.toString() === productId
          );

          if (item.length > 0) {
            this.cartData = item[0];
            this.isItemAvailableInCart = true;
          }
        }
      });
    }
  }

  decreaseQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
  }

  increaseQuantity() {
    if (this.productQuantity < 10) {
      this.productQuantity += 1;
    }
  }

  addToCart() {
    if (this.item) {
      this.item.quantity = this.productQuantity;
      let userData: string | null = localStorage.getItem('USER');

      if (!userData) {
        this.product.localAddToCart(this.item);
        this.isItemAvailableInCart = true;
      } else {
        let user = JSON.parse(userData);
        let cartData: Cart = {
          userId: user.id,
          ...this.item,
          productId: this.item.id,
        };
        delete cartData.id;
        this.product.addtoCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCart(user.id);
            this.isItemAvailableInCart = true;
          }
        });
      }
    }
  }

  removeFromCart() {
    if (!localStorage.getItem('USER')) {
      this.product.localRemoveFromCart(Number(this.item?.id));
      this.isItemAvailableInCart = false;
    } else {
      let userData: string | null = localStorage.getItem('USER');

      if (userData && this.cartData) {
        let user = JSON.parse(userData);

        this.product.removeFromCart(this.cartData?.id).subscribe((res) => {
          if (res) {
            this.product.getCart(user.id);
          }
        });

        this.isItemAvailableInCart = false;
      }
    }
  }
}
