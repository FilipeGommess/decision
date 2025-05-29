import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import db from '../db';
import { CreateUserDTO, EditUserDTO } from '../dtos/user';

class UserRepository {
  public async create(user: CreateUserDTO) {
    return await db.query('INSERT INTO users SET ?', {
      name: user.name,
      password: await bcrypt.hash(user.password, 10),
      birth_date: new Date(user.birthDate),
      mothers_name: user.mothersName,
    });
  }

  public async findById(id: number) {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT name, birth_date FROM users WHERE id = ?',
      [id]
    );
    return rows;
  }

  public edit(user: EditUserDTO, id: number) {
    return db.query('UPDATE users SET name = ?, birth_date = ? WHERE id = ?', [
      user.name,
      user.birthDate,
      id,
    ]);
  }

  public delete(id: number) {
    return db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

export default UserRepository;
