import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      alert('Debe iniciar sesión para acceder a esta vista');
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRole();

    if (route.routeConfig?.path === 'qr' && userRole !== 'docente') {
      alert('Acceso restringido a docentes');
      this.router.navigate(['/login']);
      return false;
    }

    if (route.routeConfig?.path === 'scan-qr' && userRole !== 'alumno') {
      alert('Acceso restringido a alumnos');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
