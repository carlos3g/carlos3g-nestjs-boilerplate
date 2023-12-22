import { isValid as isCpfValid } from '@fnando/cpf';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CpfValidator', async: true })
@Injectable()
export class CpfValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return isCpfValid(value);
  }

  defaultMessage() {
    return 'CPF inválido';
  }
}
