import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Device } from 'src/app/models/device';
import { DeviceRequisitionService } from 'src/app/services/device-requisition.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  public onDelete(device: Device): void {
    this.deviceRequisitionService
      .deleteDevice(device)
      .pipe(first())
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.getDevices();
        },
      });
  }

  devices?: Device[];

  constructor(private deviceRequisitionService: DeviceRequisitionService) {}

  getDevices() {
    this.deviceRequisitionService.getDevices().subscribe({
      next: (devices) => (this.devices = devices),
      error: (error) => console.log('Erro ao buscar dados ', error),
    });
  }

  ngOnInit(): void {
    this.getDevices();
  }
}
