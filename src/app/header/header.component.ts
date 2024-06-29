import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router, private product: ProductService) {}

  menuType: string = 'default';
  sellerData: any;
  userData: any;
  searchQuery: string = '';
  searchProducts: Product[] = [];
  cartItems: number = 0;

  ngOnInit() {
    this.route.events.subscribe((path: any) => {
      if (path.url) {
        if (localStorage.getItem('SELLER') && path.url.includes('seller')) {
          this.menuType = 'seller';
          let sellerDataFromStorage = localStorage.getItem('SELLER');
          sellerDataFromStorage =
            sellerDataFromStorage && JSON.parse(sellerDataFromStorage);
          this.sellerData = sellerDataFromStorage;
        } else if (localStorage.getItem('USER')) {
          this.menuType = 'user';
          let userDataFromStorage = localStorage.getItem('USER');
          userDataFromStorage =
            userDataFromStorage && JSON.parse(userDataFromStorage);
          this.userData = userDataFromStorage;
          this.product.getCart(this.userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('LOCAL_CART');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.productData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  findProducts(e: KeyboardEvent) {
    let ele = e.target as HTMLInputElement;
    if (ele.value) {
      this.searchQuery = ele.value;
      this.product.searchProductApi(this.searchQuery).subscribe((res) => {
        if (res.length > 5) res.length = 5;
        this.searchProducts = res;
      });
    }
  }

  searchNavigate() {
    this.route.navigate([`search`, this.searchQuery]);
  }

  logoutSeller() {
    if (localStorage.getItem('SELLER')) {
      localStorage.removeItem('SELLER');
      this.route.navigate(['/']);
    }
  }

  logOutUser() {
    if (localStorage.getItem('USER')) {
      localStorage.removeItem('USER');
      this.route.navigate(['user-auth']);
      this.product.productData.emit([]);
    }
  }

  navigateToProduct(id: number) {
    this.route.navigate(['product', id]);
  }
}
