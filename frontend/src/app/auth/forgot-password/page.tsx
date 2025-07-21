'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { forgotPassword } from '@/lib/api';

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

export default function ForgotPassword() {
    const { toast } = useToast();

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: ForgotPasswordSchema,
        onSubmit: async (values) => {
            try {
                await forgotPassword(values.email);
                toast({ title: 'Success', description: 'Reset link sent to your email' });
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to send reset link', variant: 'destructive' });
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <div>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
                </div>
                <Button type="submit" disabled={formik.isSubmitting}>Send Reset Link</Button>
            </form>
        </div>
    );
}