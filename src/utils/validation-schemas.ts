import { ZodError, z } from 'zod';

import { isAtleast18YearsOld } from './utilities';

interface profileData {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | undefined;
    photo: string;
}

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

export const validateProfileData = (data: profileData) => {
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
