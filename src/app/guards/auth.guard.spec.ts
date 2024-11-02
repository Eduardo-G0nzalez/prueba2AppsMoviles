import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'getUserRole']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if the user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.getUserRole.and.returnValue('docente');

    expect(guard.canActivate({ routeConfig: { path: 'qr' } } as any)).toBeTrue();
  });

  it('should deny activation and navigate to login if the user is not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    expect(guard.canActivate({ routeConfig: { path: 'qr' } } as any)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should deny access to scan-qr route for non-alumno roles', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.getUserRole.and.returnValue('docente');

    expect(guard.canActivate({ routeConfig: { path: 'scan-qr' } } as any)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
