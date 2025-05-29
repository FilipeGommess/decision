import db from '../db';

export async function createUsersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      birth_date DATE NOT NULL,
      mothers_name VARCHAR(100) NOT NULL
    );
  `;

  const connection = await db.getConnection();
  try {
    await connection.query(sql);
    console.log('Users table checked or created!');
  } catch (error) {
    console.error('Error creating users table:', error);
  } finally {
    connection.release();
  }
}
