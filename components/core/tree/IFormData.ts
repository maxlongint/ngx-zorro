import { FormGroup } from '@angular/forms';

export type IFormDataFn = (formGroup: FormGroup) => void;
export type IFormData = Record<string, any> | IFormDataFn | undefined;
