import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceRequisitionService } from 'src/app/services/device-requisition.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css'],
})
export class DeviceDetailsComponent implements OnInit {
  device?: Device;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceRequisitionService: DeviceRequisitionService
  ) {}
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const deviceIdFromRoute = routeParams.get('deviceId') || '';
    this.deviceRequisitionService.getDeviceById(deviceIdFromRoute).subscribe({
      next: (devices) => (this.device = devices.at(0)),
      error: (error) => console.log('Erro ao buscar dados ', error),
    });
  }

  onBackToList() {
    this.router.navigate(['/']);
  }
}
