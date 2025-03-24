export class ApiResponse<T> {
  public status: "success" | "fail";
  public data: T;
  public message: string;

  constructor(status: "success" | "fail", data: T, message: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
