import User, { UserDocument } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

interface UserForToken {
  email: string;
  id: string;
}

interface LoginResponse extends UserForToken {
  token: string;
  name: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const user: UserDocument | null = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    throw new Error('Invalid email or password');
  }

  const userForToken: UserForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '2d' });

  return {
    token,
    email: user.email,
    name: user.name,
    id: user._id,
  };
};
