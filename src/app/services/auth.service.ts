import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { username: string; password: string; role: 'docente' | 'alumno' }[] = [];
  private isAuthenticatedUser = false;
  private currentUserRole: 'docente' | 'alumno' | null = null;

  constructor() {
    this.loadUsersFromStorage();
    this.loadAuthState();
  }

  register(username: string, password: string, role: 'docente' | 'alumno'): boolean {
    if (role !== 'docente' && role !== 'alumno') {
      throw new Error("El rol debe ser 'docente' o 'alumno'");
    }

    const userExists = this.users.find(user => user.username === username);
    if (userExists) {
      return false;
    }

    this.users.push({ username, password, role });
    this.saveUsersToStorage();
    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      this.isAuthenticatedUser = true;
      this.currentUserRole = user.role;

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUserRole', user.role);

      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedUser;
  }

  getUserRole(): 'docente' | 'alumno' | null {
    return this.currentUserRole;
  }

  logout(): void {
    this.isAuthenticatedUser = false;
    this.currentUserRole = null;

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUserRole');
  }

  updatePassword(username: string, newPassword: string): boolean {
    const user = this.users.find(user => user.username === username);
    if (user) {
      user.password = newPassword;
      this.saveUsersToStorage();
      return true;
    }
    return false;
  }

  private saveUsersToStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private loadUsersFromStorage(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  private loadAuthState(): void {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('currentUserRole') as 'docente' | 'alumno' | null;

    this.isAuthenticatedUser = isAuthenticated;
    this.currentUserRole = userRole;
  }
}
