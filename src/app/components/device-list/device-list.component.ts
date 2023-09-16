import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { Device } from 'src/app/models/device';
import { DeviceRequisitionService } from 'src/app/services/device-requisition.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  @ViewChild(DeleteConfirmationComponent)
  deleteConfirmationComponent!: DeleteConfirmationComponent;
  deleteConfirmed: boolean = false;
  currentDevice!: Device;

  confirmation($event: boolean) {
    this.deleteConfirmed = $event;
    if (this.deleteConfirmed) {
      this.deviceRequisitionService
        .deleteDevice(this.currentDevice)
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
  }

  public onDelete(device: Device): void {
    this.currentDevice = device;
    this.deleteConfirmationComponent.toggle();
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
