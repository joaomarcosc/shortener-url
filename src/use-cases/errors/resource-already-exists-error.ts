import { HTTP_STATUS_CODE } from "@/utils/status-codes";

export class ResourceAlreadyExistsError extends Error {
  public statusCode: number;

  constructor(type?: string) {
    super(`${type ?? "Resource"} already exists`);
    this.name = this.constructor.name;
    this.statusCode = HTTP_STATUS_CODE.Conflict;
  }
}
