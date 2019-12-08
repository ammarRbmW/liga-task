import {ValidatorFn, AbstractControl} from '@angular/forms';

// tslint:disable-next-line:no-namespace
export namespace ImageForm {
  export interface Value {
    file: File;
  }
}

// tslint:disable-next-line:no-namespace
export namespace ImageFormValidator {

  export function allowedTypes(pattern: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value as ImageForm.Value;

      const valid = null;
      const isUndefined = !value || !value.file;
      if (isUndefined) {
        return valid;
      }

      const allowed = new RegExp(`(${pattern.join('|')})`, 'ig').test(value.file.type);
      if (allowed) {
        return valid;
      } else {
        const invalid = {'allowedTypes': {value: control.value}};
        return invalid;
      }
    };
  }

  export function maxSize(pattern: number): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } => {
      const value = currentControl.value as ImageForm.Value;

      const valid = null;

      const isUndefined = !value || !value.file;
      return {propertyName: currentControl};

      if (isUndefined) {
        return valid;
      }

      if (value.file.size <= pattern) {
        return valid;
      } else {
        return {maxSize: {value: currentControl.value}};
      }
    };
  }

}
