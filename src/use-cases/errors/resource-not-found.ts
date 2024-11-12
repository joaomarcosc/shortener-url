import { HTTP_STATUS_CODE } from "@/utils/status-codes";

export class ResourceNotFoundError extends Error {
  public statusCode: number;

  constructor(type?: string) {
    super(`${type ?? "Resource"} not found`);
    this.name = this.constructor.name;
    this.statusCode = HTTP_STATUS_CODE.NotFound;
  }
}
