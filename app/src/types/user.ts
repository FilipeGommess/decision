export type User = {
  name: string;
  password: string;
  birthDate: string;
  mothersName: string;
};

export type UserEdit = Omit<User, 'password' | 'mothersName'>;
