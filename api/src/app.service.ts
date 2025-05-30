import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStandardRoute(): Record<string, string> {
    return {"type": "success", "message": "The API was accessed succesfully!"};
  }
}
