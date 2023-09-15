import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../models/device';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceRequisitionService {
  URL = 'http://localhost:3000/devices';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.URL);
  }

  getDeviceById(id: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.URL}?id=${id}`);
  }

  getDeviceByName(name: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.URL}?name=${name}`);
  }

  saveDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.URL, device, this.httpOptions);
  }

  updateDevice(device: Device): Observable<Device> {
    return this.http.put<Device>(
      `${this.URL}/${device.id}`,
      device,
      this.httpOptions
    );
  }

  deleteDevice(device: Device): Observable<Device> {
    return this.http.delete<Device>(
      `${this.URL}/${device.id}`,
      this.httpOptions
    );
  }
}
