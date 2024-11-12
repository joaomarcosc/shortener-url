import { HTTP_STATUS_CODE } from "@/utils/status-codes";

export class ShortWrongUrlError extends Error {
  public statusCode: number;

  constructor() {
    super("This URL is not valid");
    this.name = this.constructor.name;
    this.statusCode = HTTP_STATUS_CODE.BadRequest;
  }
}
