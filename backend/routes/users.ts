import express from 'express';
import userService from '../services/user-service';
import { createUserSchema } from '../zod/userSchema';

const router = express.Router();

router.post('/', async (request, response, next) => {
  try {
    const { email, name, password } = createUserSchema.parse(
      request.body
    );

    const savedUser = await userService.createUser(
      email,
      name,
      password
    );
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
