import { z } from 'zod';

export const signInSchema = z.object({
    email: z.email('Invalid email address'),
    password: z
        .string({
            error: 'Password is required',
        })
        .min(1, 'Password cannot be empty'),
});

export type SignInDto = z.infer<typeof signInSchema>;
