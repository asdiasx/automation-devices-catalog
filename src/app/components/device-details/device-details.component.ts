import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceRequisitionService } from 'src/app/services/device-requisition.service';
// import { Device, devices } from 'src/app/devices';

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
    const deviceNameFromRoute = routeParams.get('deviceName') || '';
    // this.device = devices.find((product) => product.id === deviceIdFromRoute);
    this.deviceRequisitionService
      .getDeviceByName(deviceNameFromRoute)
      .then((deviceFromAPI) => {
        this.device = deviceFromAPI.at(0);
      })
      .catch((error) => {
        console.error('Erro carregando dados ', error);
      });
  }

  onBackToList() {
    this.router.navigate(['/']);
  }
}
