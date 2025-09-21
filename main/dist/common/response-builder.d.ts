export interface ResponseBody {
    status: ResponseStatusCode;
    data: any;
    msg?: string;
}
export declare enum ResponseStatusCode {
    OK = 200,
    BAD = 500,
    TOEKN_NO_FOUND = 50001,
    TOKEN_INVALID = 50002,
    PARAM_REQUIRED = 50003,
    INTERNAL_ERROR = 59999,
    NO_LOGIN = 60000,
    NO_ACCESS = 60001,
    DEFINED_PERMISSION = 60002,
    LOGIN_ERROR = 60003,
    LOGIN_ALREADY = 60004,
    VALIDATION_ERROR = 60005
}
export declare function responseBuilder(status: ResponseStatusCode, data?: any, msg?: any): ResponseBody;
