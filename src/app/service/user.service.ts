import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  invalidUser = new EventEmitter<boolean>(false);

  userSignUp(userData: SignUp) {
    this.http
      .post('http://localhost:3000/users', userData, { observe: 'response' })
      .subscribe((res) => {
        localStorage.setItem('USER', JSON.stringify(res.body));
        this.router.navigate(['/']);
      });
  }

  userAuthReload() {
    if (localStorage.getItem('USER')) {
      this.router.navigate(['/']);
    }
  }

  userLogin(data: Login) {
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length > 0) {
          this.invalidUser.emit(false);
          localStorage.setItem('USER', JSON.stringify(res.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invalidUser.emit(true);
        }
      });
  }
}
