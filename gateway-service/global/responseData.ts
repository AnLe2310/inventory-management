export enum Status  {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}

export enum Message{
    SUCCESS = "Server response success",
    CREATED = "Server response created",
    BAD_REQUEST = "Server response bad request",
    UNAUTHORIZED = "Server response unauthorized",
    FORBIDDEN = "Server response forbidden",
    NOT_FOUND = "Server response not found",
    SERVER_ERROR = "Server response server error"
}

export class ResponseData<D> {
    statusCode: number;
    message: string;
    data: D | D[];

    constructor(statusCode: number, message: string, data: D | D[]) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}