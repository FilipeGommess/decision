import * as Yup from 'yup';

export const userSchema = Yup.object({
  name: Yup
    .string()
    .required('Name is required')
    .min(10, 'Name must be at least 10 characters')
    .max(100, 'Name must be at most 100 characters'),

  password: Yup
    .string()
    .required('Password is required')
    .min(10, 'Password must be at least 10 characters')
    .max(30, 'Password must be at most 30 characters'),

  birthDate: Yup
    .date()
    .required('Birth Date is required')
    .max(new Date(), 'Birth Date cannot be in the future'),

  mothersName: Yup
    .string()
    .required("Mother's name is required")
    .min(10, "Mother's name must be at least 10 characters")
    .max(100, "Mother's name must be at most 100 characters"),
});
