// login.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.username && this.password) {
      const success = this.authService.login(this.username, this.password);
      if (success) {
        const role = this.authService.getUserRole();
        if (role === 'docente') {
          this.router.navigate(['/qr']);
        } else if (role === 'alumno') {
          this.router.navigate(['/scan-qr']);
        }
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    }
  }
  irResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  irRegistro() {
    this.router.navigate(['/register']);
  }
}
