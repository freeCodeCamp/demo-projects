import './form.css';
import { useId, useState, type InputHTMLAttributes } from 'react';

type TextFieldProps = {
  label: string;
  error?: string;
  hint?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>;

export function TextField({
  label,
  error,
  hint,
  required,
  disabled,
  type,
  ...inputProps
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === 'password';

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className='form-field'>
      <label className='form-label' htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden='true' className='form-required-mark'>
            {' '}
            *
          </span>
        )}
      </label>
      <div className={isPassword ? 'form-input-group' : undefined}>
        <input
          {...inputProps}
          id={id}
          type={isPassword && passwordVisible ? 'text' : type}
          className='form-input'
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          aria-disabled={disabled || undefined}
          required={required}
          readOnly={disabled || inputProps.readOnly}
        />
        {isPassword && (
          <button
            type='button'
            className='form-input-toggle'
            aria-pressed={passwordVisible}
            disabled={disabled}
            onClick={() => setPasswordVisible(visible => !visible)}
          >
            {passwordVisible ? 'Hide' : 'Show'}
            <span className='sr-only'> password</span>
          </button>
        )}
      </div>
      {hint && !error && (
        <span id={hintId} className='form-hint'>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className='form-error' role='alert'>
          {error}
        </span>
      )}
    </div>
  );
}
