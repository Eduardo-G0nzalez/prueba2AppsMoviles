import { Component, OnInit } from '@angular/core';
import { QrService } from '../services/qr.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  qrCodeUrl: string | null = null;

  constructor(private qrService: QrService, private alertController: AlertController, private router: Router) {}

  ngOnInit(): void {
    this.generateQr();
  }

  generateQr(): void {
    const attendanceId = this.getAttendanceId();
    this.qrService.generateQrCode(attendanceId).subscribe({
      next: (blob) => {
        const urlCreator = window.URL || window.webkitURL;
        this.qrCodeUrl = urlCreator.createObjectURL(blob);
      },
      error: async () => {
        await this.showAlert('Error', 'No se pudo generar el código QR. Intente de nuevo más tarde.');
      }
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  getAttendanceId(): string {
    return new Date().getTime().toString();
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
