import axios from 'axios';
import type { UserEdit } from '../../types/user';

interface IEditUserProps {
  id: number;
  user: UserEdit;
}

export default async function editUser({ id, user }: IEditUserProps) {
  const response = await axios.put(`http://localhost:3000/user/${id}`, user);
  return response.data;
}
