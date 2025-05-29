import * as Yup from 'yup';

export const userSchema = Yup.object({
  name: Yup
    .string()
    .required('O nome é obrigatório')
    .min(10, 'O nome deve ter no mínimo 10 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  password: Yup
    .string()
    .required('A senha é obrigatória')
    .min(10, 'A senha deve ter no mínimo 10 caracteres')
    .max(30, 'A senha deve ter no máximo 30 caracteres'),

  birthDate: Yup
    .date()
    .required('A data de nascimento é obrigatória')
    .max(new Date(), 'A data de nascimento não pode ser no futuro'),

  mothersName: Yup
    .string()
    .required('O nome da mãe é obrigatório')
    .min(10, 'O nome da mãe deve ter no mínimo 10 caracteres')
    .max(100, 'O nome da mãe deve ter no máximo 100 caracteres'),
});
