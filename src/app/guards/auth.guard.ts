import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Comprobación de autenticación
    if (!this.authService.isAuthenticated()) {
      alert('Debe iniciar sesión para acceder a esta vista');
      this.router.navigate(['/login']);
      return false; // Bloqueo inmediato
    }

    const userRole = this.authService.getUserRole();

    // Verificación específica para el rol "docente" en la ruta 'qr'
    if (route.routeConfig?.path === 'qr' && userRole !== 'docente') {
      alert('Acceso restringido a docentes');
      this.router.navigate(['/login']); // Redirigir al login u otra vista adecuada
      return false; // Bloqueo inmediato
    }

    // Verificación específica para el rol "alumno" en la ruta 'scan-qr'
    if (route.routeConfig?.path === 'scan-qr' && userRole !== 'alumno') {
      alert('Acceso restringido a alumnos');
      this.router.navigate(['/login']); // Redirigir al login u otra vista adecuada
      return false; // Bloqueo inmediato
    }

    // Si las comprobaciones se pasan, permite el acceso
    return true;
  }
}
