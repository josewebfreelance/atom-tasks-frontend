import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Pipe({
  name: 'formFieldErrors',
  standalone: true
})
export class FormFieldErrorsPipe implements PipeTransform {

  transform(errorKeys: ValidationErrors | null | undefined): string {
    console.log(errorKeys);
    if (errorKeys !== null && errorKeys !== undefined) {
      if (errorKeys['email']) return 'Correo inválido';
      if (errorKeys['minlength']) return `Error, la longitud mínima es ${errorKeys['minlength']['requiredLength']}`;
      if (errorKeys['maxlength']) return `Error, la longitud máxima es ${errorKeys['maxlength']['requiredLength']}`;
    }

    return 'Campo requerido';
  }

}
