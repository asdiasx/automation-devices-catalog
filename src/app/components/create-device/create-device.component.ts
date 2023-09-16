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
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z0-9_-]*$'),
      ]),
      type: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9_. -]*$'),
      ]),
      localization: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl(null, [Validators.maxLength(150)]),
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
    name: `O nome deve possuir entre 5 e 15 caracteres. Pode conter letras, números, sublinhados e hífens.`,
    type: `O tipo deve possuir entre 4 e 10 caracteres. Pode conter letras, números, pontos, espaços, sublinhados e hífens.`,
    localization: `A localização deve possuir entre 3 e 20 caracteres.`,
    description: `A descrição não é obrigatória mas deve possuir no máximo 150 caracteres.`,
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
