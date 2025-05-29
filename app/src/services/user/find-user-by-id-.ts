import axios from 'axios';
import type { UserFindByIdResponse } from '../../types/responses/user';

export default async function findUserById(
  id: number
): Promise<UserFindByIdResponse[]> {
  const response = await axios.get(`http://localhost:3000/user/${id}`);
  return response.data;
}
