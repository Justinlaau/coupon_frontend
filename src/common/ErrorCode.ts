export type ErrorCodeType = {
  code: number,
  message: string
}

export class ErrorCode {
  static readonly NO_ERROR: ErrorCodeType = {"code": 0, "message": "No error"}
  static readonly INVALID_REQUEST: ErrorCode = {"code": 1, "message": "Invalid request"}
  
  static readonly INVALID_USER: ErrorCode = {"code": 20000, "message": "Invalid user"}
}
