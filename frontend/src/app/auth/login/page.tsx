'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
});

export default function Login() {
    const router = useRouter();
    const { toast } = useToast();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                toast({ title: 'Error', description: result.error, variant: 'destructive' });
            } else {
                router.push('/dashboard');
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold">Login</h1>
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
                <div>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
                </div>
                <Button type="submit" disabled={formik.isSubmitting}>Login</Button>
            </form>
        </div>
    );
}