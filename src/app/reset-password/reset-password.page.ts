import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    if (this.username && this.newPassword) {
      const success = this.authService.updatePassword(this.username, this.newPassword);
      if (success) {
        this.message = 'Contraseña actualizada exitosamente.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      } else {
        this.message = 'Usuario no encontrado.';
      }
    } else {
      this.message = 'Por favor, completa todos los campos.';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
