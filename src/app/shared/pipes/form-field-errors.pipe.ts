import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Pipe({
  name: 'formFieldErrors',
  standalone: true
})
export class FormFieldErrorsPipe implements PipeTransform {

  transform(errorKeys: ValidationErrors | null | undefined): string {
    if (errorKeys !== null && errorKeys !== undefined) {
      if (errorKeys['email']) return 'Correo inválido';
    }

    return 'Campo requerido';
  }

}
