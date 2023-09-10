import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceRequisitionService } from 'src/app/services/device-requisition.service';
import { DeviceService } from 'src/app/services/device.service';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css'],
})
export class CreateDeviceComponent implements OnInit {
  public id?: string;
  public title = 'Dispositivo';

  public errorMessage?: string;

  public deviceForm!: FormGroup;

  public savedDevice?: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private deviceRequisitionService: DeviceRequisitionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.deviceForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[\\w\\p{L}.]{5,15}'),
      ]),
      type: new FormControl(null, [
        Validators.required,
        Validators.pattern('[\\w\\p{L}.]{4,10}'),
      ]),
      localization: new FormControl(null, [
        Validators.required,
        Validators.pattern('[\\w\\p{L}.]{4,20}'),
      ]),
      description: new FormControl(null, [
        Validators.pattern('[\\s\\S]{0,100}'),
      ]),
    });
  }

  public errorMessages: { [key: string]: string } = {
    name: `O nome deve possuir entre 5 e 15 caracteres. Pode conter letras maiúsculas e minúsculas, números, sublinhados e pontos.`,
    type: `O tipo deve possuir entre 4 e 10 caracteres. Pode conter letras maiúsculas e minúsculas, números, sublinhados e pontos.`,
    location: `A localização deve possuir entre 4 e 20 caracteres.Pode conter letras maiúsculas e minúsculas, números, sublinhados e pontos.`,
    description: `A descrição não é obrigatória mas deve possuir no máximo 100 caracteres. Pode conter qualqer tipo de caractere.`,
  };

  public getErrorMessage(field: string): string {
    return (
      this.errorMessages[field] || 'Ocorreu um erro ao processar a solicitação.'
    );
  }

  onSubmit() {
    this.deviceService.create(this.deviceForm.getRawValue());
    this.deviceRequisitionService.saveDevice(this.deviceForm.getRawValue());
    this.savedDevice = this.deviceService.getDevice(Constants.DEVICE_KEY);
    this.deviceForm.reset();
  }
  onCancel(): void {
    this.router.navigate(['/']);
  }
}
