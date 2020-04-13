import { AbstractControl } from '@angular/forms';

export class ValidateEmail {

  static validateDuplicate(abstractControl: AbstractControl) {
    const email = abstractControl.get('email').value;
    if (!email) {
      abstractControl.get('confirmPassword').setErrors({
        MatchPassword: true
      });
    } else {
      return null;
    }
  }

}