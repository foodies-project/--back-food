export class ApiResponse<T> {
  public data: T | {};
  public message: string;

  constructor(message?: string, data?: T | {}) {
    this.message = message || '';
    this.data = data || {};
  }
}
