import axios from 'axios';

export default async function deleteUser(id: number) {
  const response = await axios.delete(`http://localhost:3000/user/${id}`);
  return response.data;
}
