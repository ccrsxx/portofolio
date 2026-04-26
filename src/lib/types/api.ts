import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { z } from 'zod';

export const BackendSuccessSchema = z.object({
  data: z.any() // We don't validate the inside, we'll assert it as T later
});

export type BackendSuccessApiResponse<T> = {
  data: T;
};

export const BackendSuccessApiResponseSchema = z.object({
  data: z.any()
});

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
