import { ZodError, ZodIssue, z } from 'zod';

import { isAtleast18YearsOld } from './utilities';

export const profileValidationSchema = z.object({
    firstName: z.string().min(1, { message: 'First Name required' }).max(255),
    lastName: z.string().min(1, { message: 'Last Name required' }).max(255),
    dateOfBirth: z
        .date({
            required_error: 'Birthdate required',
        })
        .refine(date => isAtleast18YearsOld(date), {
            message: 'You must be at least 18 years old',
        }),
    photo: z.string().min(1, { message: 'Please choose a photo' }),
});

export const validateProfileData = (data: any) => {
    try {
        profileValidationSchema.parse(data);
        return null;
    } catch (err) {
        if (err instanceof ZodError) {
            return err.errors;
        }
        throw err;
    }
};
