import { z } from 'zod';
import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query';

export type BackendSuccessApiResponse<T> = {
  data: T | null;
};

export const BackendErrorSchema = z.object({
  error: z.object({
    id: z.string(),
    message: z.string(),
    details: z.array(z.string())
  })
});

export type BackendErrorApiResponse = z.infer<typeof BackendErrorSchema>;

export class ApplicationError extends Error {
  constructor(
    public message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export type AppQueryResult<TData> = UseQueryResult<TData, ApplicationError>;

export type AppMutationResult<TData, TVariables = void> = UseMutationResult<
  TData,
  ApplicationError,
  TVariables
>;
