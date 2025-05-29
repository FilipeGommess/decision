import { setIn } from 'final-form';
import type { AnySchema } from 'yup';
import { ValidationError } from 'yup';

export function yupResolver(schema: AnySchema) {
  return async (value: object) => {
    try {
      await schema.validate(value, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        return error.inner.reduce((errors, error: ValidationError) => {
          const path = error.path ?? 'global';
          return setIn(errors, path, error.message);
        }, {});
      }

      throw error;
    }
  };
}
