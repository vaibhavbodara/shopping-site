import { Component } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  constructor(private seller: SellerService) {}

  isLoginVisible = true;
  isError: string = '';

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(userInfo: SignUp): void {
    this.isError = '';
    this.seller.userSignUp(userInfo);
  }

  login(userInfo: Login): void {
    this.seller.userLogin(userInfo);

    this.seller.isLoginError.subscribe((err) => {
      if (err) {
        this.isError = 'Email or Password is incorrect';
      }
    });
  }

  openLogin() {
    this.isLoginVisible = true;
  }
  openSignUp() {
    this.isLoginVisible = false;
  }
}
