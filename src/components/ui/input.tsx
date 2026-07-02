import { clsx } from 'clsx';
import type { PropsWithChildren, ReactNode } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Alert } from './alert';

export type InputProps = PropsWithChildren<{
  id: string;
  type: 'text' | 'email' | 'textarea' | 'number' | 'tel' | 'password' | 'date';
  label?: string;
  error?: FieldError | undefined;
  disabled?: boolean;
  required?: boolean;
  register?: UseFormRegisterReturn;
  tabIndex?: number;
  helperText?: string;
  placeholder?: string;
  autoComplete?: string;
  overrideError?: boolean;
  inputClassName?: string;
  additionalLabel?: ReactNode;
  containerClassName?: string;
}>;

export function Input({
  id,
  type,
  label,
  error,
  disabled,
  tabIndex,
  children,
  register,
  required,
  helperText,
  placeholder,
  autoComplete,
  overrideError,
  inputClassName,
  additionalLabel,
  containerClassName
}: InputProps): React.JSX.Element {
  const inputErrorStyle =
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (overrideError || error) && 'border-alert-error focus:border-alert-error';

  return (
    <div
      className={clsx(
        'grid gap-2',
        containerClassName,
        children && 'grid-cols-[1fr,auto] items-center gap-4'
      )}
    >
      {label && (
        <div className='flex justify-between gap-4'>
          <label htmlFor={id}>{label}</label>
          {additionalLabel}
        </div>
      )}
      {type === 'textarea' ? (
        <textarea
          className={clsx('custom-input', inputErrorStyle, inputClassName)}
          id={id}
          rows={8}
          tabIndex={tabIndex}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register}
        />
      ) : (
        <input
          className={clsx('custom-input', inputErrorStyle, inputClassName)}
          id={id}
          type={type}
          tabIndex={tabIndex}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register}
        />
      )}
      {children}
      {error && (
        <Alert
          className='mt-1'
          variant='error'
          message={error?.message as string}
        />
      )}
      {helperText && <p className='text-sm text-primary/70'>{helperText}</p>}
    </div>
  );
}
