// types/api.ts

export type ApiSuccess<T> = {
    success: true;
    data: T;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
};

export type ApiError = {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
