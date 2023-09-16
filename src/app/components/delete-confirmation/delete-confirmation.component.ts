import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
})
export class DeleteConfirmationComponent {
  showEnabled: boolean = false;

  @Input() device!: Device;
  @Output() confirmEvent = new EventEmitter<boolean>();

  toggle(): void {
    this.showEnabled = !this.showEnabled;
  }

  onCancel(): void {
    this.toggle();
  }

  onConfirm(): void {
    this.confirmEvent.emit(true);
    this.toggle();
  }
}
