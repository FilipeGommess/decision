import axios from 'axios';
import type { User } from '../../types/user';

interface ICreateUserProps {
  user: User;
}

export default async function createUser({ user }: ICreateUserProps) {
  const response =  await axios.post('http://localhost:3000/user', user);
  return response.data
}
