import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ConfigurationService} from "../../shared/services/configuration.service";
import {FormFieldErrorsPipe} from "../../shared/pipes/form-field-errors.pipe";

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormFieldErrorsPipe
  ],
  providers:[
    ConfigurationService
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RegisterDialogComponent>);
  readonly service = inject(ConfigurationService);

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  onSubmit(): void {
    this.service.register(this.form.value).subscribe({
      next: result => {console.log(result)},
      error: result => {console.log(result)}
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
