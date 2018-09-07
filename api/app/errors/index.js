import {
  UNAUTHORIZED_CODE,
  BAD_REQUEST_CODE,
  FORBIDDEN_CODE,
} from '../../configs/status-codes';


import {
  SOMETHING_WENT_WRONG,
  NOT_AUTHORIZED,
  PERMISSION_DENIED,
} from '../../configs/messages';


export class BadRequest extends Error {
  constructor(message, status) {
    super();
    this.status = status || BAD_REQUEST_CODE;
    this.message = message;
    Error.captureStackTrace(this, BadRequest);
  }
}

export class Unauthorized extends Error {
  constructor(message, status) {
    super();
    this.status = status || UNAUTHORIZED_CODE;
    this.message = message || NOT_AUTHORIZED;
    Error.captureStackTrace(this, Unauthorized);
  }
}

export class Forbidden extends Error {
  constructor(message, status) {
    super();
    this.status = status || FORBIDDEN_CODE;
    this.message = message || PERMISSION_DENIED;
    Error.captureStackTrace(this, Unauthorized);
  }
}

export class ServiceUnavailable extends Error {
  constructor(message, status) {
    super();
    this.status = status || BAD_REQUEST_CODE;
    this.message = message || SOMETHING_WENT_WRONG;
    Error.captureStackTrace(this, ServiceUnavailable);
  }
}
