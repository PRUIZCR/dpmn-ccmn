import { ResponseErrorManager } from 'src/app/model/responseerrormanager';

export class ResponseManager {
  msg!: string;
  cod!: string;
  errors: ResponseErrorManager[] | undefined
  constructor() { }
}
