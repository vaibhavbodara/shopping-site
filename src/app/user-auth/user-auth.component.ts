import { Component } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { UserService } from '../service/user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  constructor(
    private userService: UserService,
    private product: ProductService
  ) {}

  ngOnInit() {
    this.userService.userAuthReload();
  }

  isLoginVisible = true;
  isError: string = '';

  signUp(userData: SignUp) {
    this.isError = '';
    this.userService.userSignUp(userData);
  }

  login(userData: Login) {
    this.userService.userLogin(userData);

    this.userService.invalidUser.subscribe((err) => {
      if (err) {
        this.isError = 'User Not Found !!';
      } else {
        this.localToDbCart();
      }
    });
  }

  openLogin() {
    this.isLoginVisible = true;
  }
  openSignUp() {
    this.isLoginVisible = false;
  }

  localToDbCart() {
    let localCartData: string | null = localStorage.getItem('LOCAL_CART');

    setTimeout(() => {
      let user = JSON.parse(localStorage.getItem('USER') || '{}');

      if (localCartData) {
        let cartData: Product[] = JSON.parse(localCartData);

        cartData.forEach((item) => {
          let cartItem: Cart = {
            ...item,
            userId: user.id,
            productId: item.id,
          };
          delete cartItem.id;

          setTimeout(() => {
            this.product.addtoCart(cartItem).subscribe((res) => {});
          }, 300);
        });

        localStorage.removeItem('LOCAL_CART');
      }
      this.product.getCart(user.id);
    });
  }
}
