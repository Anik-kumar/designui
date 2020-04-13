import { AbstractControl } from '@angular/forms';

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password').value;
    const confirmPassword = abstractControl.get('confirmPassword').value;
    if (password != confirmPassword) {
      abstractControl.get('confirmPassword').setErrors({
        MatchPassword: true
      });
    } else {
      return null;
    }
  }

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
