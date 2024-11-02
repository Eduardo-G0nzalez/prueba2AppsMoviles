import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'qr', loadChildren: () => import('./qr/qr.module').then(m => m.QrPageModule), canActivate: [AuthGuard] },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'scan-qr', loadChildren: () => import('./scan-qr/scan-qr.module').then(m => m.ScanQrPageModule), canActivate: [AuthGuard] },
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
