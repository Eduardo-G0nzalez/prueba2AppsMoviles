import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  role: 'docente' | 'alumno' = 'alumno';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.username || !this.password || !this.role) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    const success = this.authService.register(this.username, this.password, this.role);
    if (success) {
      alert('Registro exitoso');
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'El usuario ya existe';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
