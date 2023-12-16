export interface CustomErrorInterface extends Error {
    get statusCode(): number;
    status: (this: CustomErrorInterface, code?: number) => CustomErrorInterface;
}
export default function CustomError(message: string): CustomErrorInterface;
//# sourceMappingURL=custom-error.d.ts.map