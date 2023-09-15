import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, first } from 'rxjs';
import { Device } from 'src/app/models/device';
import { DeviceRequisitionService } from 'src/app/services/device-requisition.service';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css'],
})
export class CreateDeviceComponent implements OnInit {
  public id?: string;
  public title = 'Cadastrar Dispositivo';

  public errorMessage?: string;

  public deviceForm!: FormGroup;

  public savedDevice?: Device | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceRequisitionService: DeviceRequisitionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.id = this.route.snapshot.params['deviceId'];
    if (this.id) {
      this.title = 'Editar Dispositivo';
      this.updateForm();
    }
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

  private updateForm(): void {
    this.deviceRequisitionService
      .getDeviceById(this.id!)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.deviceForm.patchValue(response.at(0) as Device);
        },
        error: (err) => {
          console.log(err);
        },
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

  onSubmit(): void {
    if (this.id) {
      this.deviceRequisitionService
        .updateDevice(this.deviceForm.getRawValue())
        .pipe(
          first(),
          distinctUntilChanged(
            (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
          )
        )
        .subscribe({
          error: (err) => {
            this.errorMessage = err.error;
          },
          complete: () => {
            this.router.navigate(['/devices']);
          },
        });
    } else {
      this.deviceRequisitionService
        .saveDevice(this.deviceForm.getRawValue())
        .subscribe({
          next: (device) => (this.savedDevice = device),
          error: (error) => console.log('Erro ao salvar dados ', error),
        });
      this.deviceForm.reset();
    }
  }
  onCancel(): void {
    this.router.navigate(['/']);
  }
}
