import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  productData = new EventEmitter<Product[] | []>();

  addProductApi(data: Product) {
    return this.http.post('http://localhost:3000/products', data, {
      observe: 'response',
    });
  }

  getAllProductsApi() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  removeProductApi(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`, {
      observe: 'response',
    });
  }

  getProduct(id: string | null) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProductApi(id: number | undefined, data: Product) {
    return this.http.put(`http://localhost:3000/products/${id}`, data, {
      observe: 'response',
    });
  }

  popularProductApi() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=3`);
  }

  trendyProductsApi() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=8`);
  }

  searchProductApi(value: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products?q=${value}`
    );
  }

  localAddToCart(productData: Product) {
    let cartData = [];
    let localCartData: string | null = localStorage.getItem('LOCAL_CART');

    if (localCartData) {
      cartData = JSON.parse(localCartData);
      cartData.push(productData);
      localStorage.setItem('LOCAL_CART', JSON.stringify(cartData));
    } else {
      cartData.push(productData);
      localStorage.setItem('LOCAL_CART', JSON.stringify(cartData));
    }

    this.productData.emit(cartData);
  }

  localRemoveFromCart(productId: number) {
    let localCartData: string | null = localStorage.getItem('LOCAL_CART');

    if (localCartData) {
      let products: Product[] = JSON.parse(localCartData);
      let newCartData: Product[] = products.filter((p) => p.id !== productId);
      localStorage.setItem('LOCAL_CART', JSON.stringify(newCartData));
      this.productData.emit(newCartData);
    }
  }

  addtoCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCart(userId: number) {
    this.http
      .get<Product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((res) => {
        if (res && res.body) {
          this.productData.emit(res.body);
        }
      });
  }

  removeFromCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }

  getCurrentCart() {
    let userDataFromStorage = localStorage.getItem('USER');
    let userData = userDataFromStorage && JSON.parse(userDataFromStorage);
    let userId = userData?.id;

    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=${userId}`);
  }
}
