import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  public match(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  public create(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
