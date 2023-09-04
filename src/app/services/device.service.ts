import { Injectable } from '@angular/core';
import { Device } from '../models/device';
import { WebStorageUtil } from '../utils/web-storage-util';
import { Constants } from '../utils/constants';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  devices!: Device[];

  constructor() {
    this.devices = WebStorageUtil.get(Constants.DEVICES_KEY);
  }

  create(device: Device) {
    device.id = uuid.v4();
    WebStorageUtil.set(Constants.DEVICE_KEY, device);
  }

  getDevice(name: string): string | undefined {
    return JSON.stringify(WebStorageUtil.get(Constants.DEVICE_KEY));
  }

  save(device: Device) {
    this.devices = WebStorageUtil.get(Constants.DEVICES_KEY);
    this.devices.push(device);
    WebStorageUtil.set(Constants.DEVICES_KEY, this.devices);
  }

  update(device: Device) {
    this.devices = WebStorageUtil.get(Constants.DEVICES_KEY);
    this.delete(device.name);
    this.save(device);
  }

  delete(name: string): boolean {
    this.devices = WebStorageUtil.get(Constants.DEVICES_KEY);
    this.devices = this.devices.filter((d) => {
      return d.name?.valueOf() != name?.valueOf();
    });

    WebStorageUtil.set(Constants.DEVICES_KEY, this.devices);
    return true;
  }

  isPresent(value: string): boolean {
    this.devices = WebStorageUtil.get(Constants.DEVICES_KEY);
    for (let d of this.devices) {
      if (d.name?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getDevices(): Device[] {
    this.devices = WebStorageUtil.get(Constants.DEVICES_KEY);
    return this.devices;
  }
}
