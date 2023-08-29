import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from 'src/app/devices';

@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.css'],
})
export class SelectDeviceComponent {
  @Input() device: Device | undefined;
  @Output() updateStatus = new EventEmitter<boolean>();

  changeStatus(selected: boolean): void {
    this.updateStatus.emit(selected);
  }
}
