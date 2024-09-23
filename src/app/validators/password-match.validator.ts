import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordMatchValidator(passwordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.getRawValue() !== passwordControl.getRawValue() ? {passwordMatch: false} : null;
  }
}
