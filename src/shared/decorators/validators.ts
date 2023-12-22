import { CnpjValidator, CpfValidator, TimeValidator } from '@app/shared/validators';
import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsCnpj(validationOptions?: ValidationOptions) {
  return () => (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CnpjValidator,
    });
  };
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return () => (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsCpf',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CpfValidator,
    });
  };
}

export function IsTime(validationOptions?: ValidationOptions) {
  return () => (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsTime',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: TimeValidator,
    });
  };
}
