import { Component } from '@angular/core';
import { Device, devices } from '../../devices';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent {
  onSelect(selectedDevice: Device, selected: boolean) {
    window.alert(
      `O dispositivo ${selectedDevice.name} foi ${
        selected ? 'selecionado' : 'desselecionado'
      }`
    );
  }
  devices: Device[] = [...devices];
}
