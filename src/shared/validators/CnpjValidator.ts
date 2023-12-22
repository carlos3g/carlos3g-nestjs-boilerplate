import { isValid as isCnpjValid } from '@fnando/cnpj';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CnpjValidator', async: true })
@Injectable()
export class CnpjValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return isCnpjValid(value);
  }

  defaultMessage() {
    return 'CNPJ inválido';
  }
}
