import { CreateUserDTO } from './CreateUserDTO'

export type EditUserDTO = Omit<CreateUserDTO, 'password' | 'mothersName'>; 
