import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../models/device';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceRequisitionService {
  URL = 'http://localhost:3000/devices';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getDevices(): Promise<Device[]> {
    const devicesFound = this.http.get<Device[]>(this.URL);
    return lastValueFrom(devicesFound);
  }

  getDeviceByName(name: string): Promise<Device> {
    const deviceFound = this.http.get<Device>(`${this.URL}?name=${name}`);
    return lastValueFrom(deviceFound);
  }

  saveDevice(device: any): Promise<Device> {
    const deviceSaved = this.http.post<Device>(
      this.URL,
      device,
      this.httpOptions
    );
    return lastValueFrom(deviceSaved);
  }

  updateDevice(device: any): Promise<Device> {
    const deviceUpdated = this.http.put<Device>(
      `${this.URL}/${device.id}`,
      device,
      this.httpOptions
    );
    return lastValueFrom(deviceUpdated);
  }

  deleteDevice(device: any): Promise<Device> {
    const deviceDeleted = this.http.delete<Device>(
      `${this.URL}/${device.id}`,
      this.httpOptions
    );
    return lastValueFrom(deviceDeleted);
  }
}
