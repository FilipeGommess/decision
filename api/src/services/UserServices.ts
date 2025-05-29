import { CreateUserDTO, EditUserDTO } from '../dtos/user/';
import UserRepository from '../repositories/UserRepository';
import { userSchema } from '../validations/user/userValidation';
import { validateSchema } from '../validations/validate';

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async create(user: CreateUserDTO) {
    await validateSchema<CreateUserDTO>(userSchema, user);
    return this.userRepository.create(user);
  }

  public async findById(id: number) {
    return this.userRepository.findById(id)
  }

  public async edit(user: EditUserDTO, id : number) {
    await validateSchema<EditUserDTO>(userSchema.omit(['password', 'mothersName']), user);
    return this.userRepository.edit(user, id);
  }

  public async delete(id: number) {
    return this.userRepository.delete(id)
  }
}

export default UserService;
