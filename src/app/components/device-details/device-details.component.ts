import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device, devices } from 'src/app/devices';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css'],
})
export class DeviceDetailsComponent implements OnInit {
  device: Device | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const deviceIdFromRoute = Number(routeParams.get('deviceId'));

    this.device = devices.find((product) => product.id === deviceIdFromRoute);
  }

  onBackToList() {
    this.router.navigate(['/']);
  }
}
