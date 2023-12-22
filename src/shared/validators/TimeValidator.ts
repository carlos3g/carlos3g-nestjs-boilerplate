import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'TimeValidator', async: true })
@Injectable()
export class TimeValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value) return false;

    if (value.length !== 5) return false;

    const matches = value.match(/(\d{2}):(\d{2})/);

    if (!matches) return false;

    return Number(matches[1]) < 24 && Number(matches[2]) < 60;
  }

  defaultMessage(validationArguments: ValidationArguments) {
    return `${validationArguments.property} is invalid`;
  }
}
