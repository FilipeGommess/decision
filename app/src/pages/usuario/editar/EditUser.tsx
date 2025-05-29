import { Box, Button, Skeleton } from '@mui/material';
import { Form } from 'react-final-form';
import FieldInput from '../../../components/FieldInput/FieldInput';

import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { userSchema } from '../../../schemas/user/userSchema';
import { yupResolver } from '../../../schemas/yupResolver';
import deleteUser from '../../../services/user/delete-user';
import editUser from '../../../services/user/edit.user';
import findUserById from '../../../services/user/find-user-by-id-';
import type { UserEdit } from '../../../types/user';
import styles from './styles.module.css';
export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserEdit>({
    name: '',
    birthDate: '',
  });

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const value = await findUserById(Number(id));
      setUserData({
        ...value[0],
        birthDate: format(value[0].birth_date, 'yyyy-MM-dd'),
      });
    } catch (e) {
      console.error('Erro ao buscar usuário', e);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [id, fetchUser]);

  const onSubmit = async (user: UserEdit) => {
    try {
      setIsLoading(true);
      await editUser({ id: Number(id), user });
      await fetchUser();
      window.alert('Usuário editado');
    } catch (e) {
      window.alert('Não foi possível editar o usuário. Tente Novamente');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteUser(id);

      window.alert('Usuário Excluido');
      redirect('/usuario/criar');
    } catch (e) {
      window.alert('Não foi possível excluir o usuário. Tente Novamente');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Skeleton height={170} width={400} />;

  return (
    <Form
      onSubmit={onSubmit}
      validate={yupResolver(userSchema.omit(['password', 'mothersName']))}
      initialValues={userData}
      render={({ handleSubmit, valid }) => (
        <form onSubmit={handleSubmit} className={styles['formContainer']}>
          <FieldInput label='Nome' name='name' />
          <FieldInput label='Data de Nascimento' name='birthDate' type='date' />

          <Box gap='10px' display='flex' sx={{ placeSelf: 'flex-end' }}>
            <Button
              variant='contained'
              color='error'
              onClick={() => onDelete(Number(id))}
            >
              Excluir
            </Button>
            <Button type='submit' variant='contained' disabled={!valid}>
              Enviar
            </Button>
          </Box>
        </form>
      )}
    />
  );
}
