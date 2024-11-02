// qr.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  constructor(private http: HttpClient) {}

  generateQrCode(attendanceId: string): Observable<Blob> {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${attendanceId}&size=150x150`;
    return this.http.get(apiUrl, { responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('Error generating QR code:', error);
        return throwError(() => new Error('Error generating QR code'));
      })
    );
  }
}
