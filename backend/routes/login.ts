import { Router } from 'express';
import { login } from '../services/login-service';
import { loginUserSchema } from '../zod/userSchema';

const router = Router();

router.post('/', async (request, response, next) => {
  try {
    const { email, password } = loginUserSchema.parse(request.body);

    const user = await login(email, password);
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
