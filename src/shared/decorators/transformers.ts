import { Transform } from 'class-transformer';

export function TransformBoolean() {
  return Transform(({ value }: { value: string | number }) => {
    return ['1', true, 'true', 1].indexOf(value) > -1;
  });
}
