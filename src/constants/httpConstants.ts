interface HttpsInterface {
    OK: number,
    CREATED: number,
    BAD_REQUEST: number,
    NOT_FOUND: number,
    INTERNAL_SERVER_ERROR: number
}

export const HTTP_STATUS: HttpsInterface = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;