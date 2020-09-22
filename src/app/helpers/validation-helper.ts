import * as _ from 'lodash';

export interface Validators {
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const checkValidators = (value: any, validators: Validators) => {
  let valid = true;
  if (validators.isRequired) {
    valid = valid && !_.isEmpty(value);
  }

  if (validators.minLength) {
    valid = valid && value?.length >= validators.minLength;
  }

  if (validators.maxLength) {
    valid = valid && value?.length <= validators.maxLength;
  }
  return valid;
};
