/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { PrismaTransactionScope } from '@app/prisma/transaction-scope';
import { Inject } from '@nestjs/common';

interface ThisType {
  transactionScope: PrismaTransactionScope;
}

interface OriginalMethod {
  (): Promise<unknown>;
}

export function Transaction(): MethodDecorator {
  const injectService = Inject(PrismaTransactionScope);

  return (target: object, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor) => {
    injectService(target, 'transactionScope');

    const originalMethod: OriginalMethod = propertyDescriptor.value as OriginalMethod;

    propertyDescriptor.value = async function (this: ThisType) {
      const { transactionScope } = this;

      return transactionScope.run(originalMethod.bind(this) as OriginalMethod);
    };

    return propertyDescriptor;
  };
}
