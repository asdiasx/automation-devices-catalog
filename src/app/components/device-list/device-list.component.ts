import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
// import { devices } from '../../devices';
import { DeviceRequisitionService } from 'src/app/services/device-requisition.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  // devices: Device[] = [...devices];
  devices?: Device[];

  constructor(private deviceRequisitionService: DeviceRequisitionService) {}

  onSelect(selectedDevice: Device, selected: boolean) {
    window.alert(
      `O dispositivo ${selectedDevice.name} foi ${
        selected ? 'selecionado' : 'desselecionado'
      }`
    );
  }

  ngOnInit(): void {
    this.deviceRequisitionService
      .getDevices()
      .then((devices) => {
        this.devices = devices;
      })
      .catch((error) => {
        console.error('Erro carregando dados ', error);
      });
  }
}
