import { Button } from '@mui/material';
import { Form } from 'react-final-form';
import FieldInput from '../../../components/FieldInput/FieldInput';

import { useNavigate } from 'react-router';
import { userSchema } from '../../../schemas/user/userSchema';
import { yupResolver } from '../../../schemas/yupResolver';
import createUser from '../../../services/user/create-user';
import type { User } from '../../../types/user';
import styles from './styles.module.css';
import { useCallback } from 'react';
export default function CreateUser() {
  const navigate = useNavigate();

const onSubmit = useCallback(async (user: User) => {
  try {
    const response = await createUser({ user });
    window.alert('Usuário criado id: ' + response.userId);
    navigate(`/usuario/${response.userId}`);
  } catch (e) {
    window.alert('Não foi possível criar o usuário. Tente Novamente');
    console.error(e);
  }
}, [navigate]);

  return (
    <Form
      onSubmit={onSubmit}
      validate={yupResolver(userSchema)}
      render={({ handleSubmit, valid }) => (
        <form onSubmit={handleSubmit} className={styles['formContainer']}>
          <FieldInput label='Nome' name='name' />
          <FieldInput label='Senha' name='password' type='password' />
          <FieldInput label='Data de Nascimento' name='birthDate' type='date' />
          <FieldInput label='Nome da mãe' name='mothersName' />

          <Button type='submit' variant='contained' disabled={!valid}>
            Enviar
          </Button>
        </form>
      )}
    />
  );
}
