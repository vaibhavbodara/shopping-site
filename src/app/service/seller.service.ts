import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient, private router: Router) {}

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('SELLER', JSON.stringify(res.body));
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('SELLER')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length > 0) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('SELLER', JSON.stringify(res.body[0]));
          this.router.navigate(['seller-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
