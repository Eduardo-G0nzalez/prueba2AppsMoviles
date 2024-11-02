import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {
  scanActive: boolean = false;
  imageUrl: string | null = null;

  constructor(
    private platform: Platform,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.prepareScanner();
  }

  async prepareScanner() {
    if (this.platform.is('capacitor')) {
      await BarcodeScanner.prepare();
    }
  }

  async startScan() {
    if (this.platform.is('capacitor')) {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        BarcodeScanner.hideBackground();
        this.scanActive = true;
        document.body.classList.add('scanner-active');
        
        const image = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 90,
        });
        
        this.imageUrl = image.webPath || null;

        const result = await BarcodeScanner.startScan();
        if (result.hasContent) {
          this.scanActive = false;
          document.body.classList.remove('scanner-active');
          const scannedData = result.content;
          this.processScannedData(scannedData);
        } else {
          this.scanActive = false;
          document.body.classList.remove('scanner-active');
        }
      } else {
        alert('Permiso de cámara denegado');
      }
    }
  }

  stopScan() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
    document.body.classList.remove('scanner-active');
  }

  processScannedData(data: string) {
    if (data.startsWith('http://localhost:8100/attendance/')) {
      const classId = data.split('/').pop();
      this.router.navigate([`/attendance/${classId}`]);
    } else {
      this.showAlert('Código no válido', 'Código QR no válido para asistencia');
    }
  }

  ionViewWillLeave() {
    this.stopScan();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
