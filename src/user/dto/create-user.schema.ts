import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string({
            error: 'Name is required',
        })
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be at most 100 characters'),
    email: z.email('Invalid email address'),
    password: z
        .string({
            error: 'Password is required',
        })
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must be at most 50 characters'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
