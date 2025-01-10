export interface EnableOTPRequest {
  userId: string;
}

export interface EnableOTPResponse {
  secret: string;
  qrCode: string;
}

export interface VerifyOTPRequest {
  userId: string;
  token: string;
}

export interface DisableOTPRequest {
  userId: string;
  token: string;
}

export interface ValidateOTPRequest {
  userId: string;
  token: string;
}
