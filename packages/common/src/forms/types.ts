export type FormErrorMap<T> = { [P in keyof T]?: string };

// TEMP: Until react-final-forms has a defined named type for it.
export type FieldMeta = Partial<{
  active: boolean;
  data: object;
  dirty: boolean;
  dirtySinceLastSubmit: boolean;
  error: any;
  initial: any;
  invalid: boolean;
  pristine: boolean;
  submitError: any;
  submitFailed: boolean;
  submitSucceeded: boolean;
  touched: boolean;
  valid: boolean;
  visited: boolean;
}>;
