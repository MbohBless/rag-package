// creating a custom error class
export interface CustomErrorInterface extends Error {
    get statusCode(): number;
    status: (this: CustomErrorInterface, code?: number) => CustomErrorInterface;
}

export default function CustomError(message: string) {
    let _status = 500;
    const error = new Error(message) as CustomErrorInterface;
  error.status = function(this: CustomErrorInterface, code?: number) {
    _status = Number(code) || 500;
    return this;
}
    Object.defineProperty(error, 'statusCode', { get: () => _status });
    return error;
}
