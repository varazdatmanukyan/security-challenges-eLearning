export enum AlertType {
  error,
  success
}

export interface Alert {
  type: AlertType;
  message: string;
}
