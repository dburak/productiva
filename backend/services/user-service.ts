import bcrypt from 'bcrypt';
import User, { UserDocument } from '../models/user';

const createUser = async (email: string, name: string, password: string) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    email,
    name,
    passwordHash,
  });

  try {
    const savedUser: UserDocument = await newUser.save();
    return savedUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export default { createUser };
