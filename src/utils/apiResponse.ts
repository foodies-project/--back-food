export class ApiResponse<T> {
  public status: "success" | "fail";
  public data: T | {};
  public message: string;

  constructor(status: "success" | "fail", message?: string, data?: T | {}) {
    this.status = status;
    this.message = message || "";
    this.data = data || {};
  }
}
