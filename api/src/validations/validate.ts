import { AnySchema, ValidationError } from 'yup';

interface ValidationFieldError {
  field: string | undefined;
  message: string;
}

export interface ValidationException {
  name: 'ValidationError';
  errors: ValidationFieldError[];
}

export async function validateSchema<T>(schema: AnySchema, data: T) {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    if (err instanceof ValidationError) {
      const validationErrors: ValidationFieldError[] = err.inner.map(e => ({
        field: e.path,
        message: e.message,
      }));

      const exception: ValidationException = {
        name: 'ValidationError',
        errors: validationErrors,
      };

      throw exception;
    }
    throw err;
  }
}
