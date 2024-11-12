import { HTTP_STATUS_CODE } from "@/utils/status-codes";

export class InvalidCredentialsError extends Error {
  public statusCode: number;

  constructor() {
    super("Invalid credentials error");
    this.name = this.constructor.name;
    this.statusCode = HTTP_STATUS_CODE.Unauthorized;
  }
}
