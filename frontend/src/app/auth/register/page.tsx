'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { register } from '@/lib/api';

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
    name: Yup.string().required('Required'),
});

export default function Register() {
    const router = useRouter();
    const { toast } = useToast();

    const formik = useFormik({
        initialValues: { email: '', password: '', name: '' },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            try {
                await register(values);
                toast({ title: 'Success', description: 'Registration successful' });
                router.push('/auth/login');
            } catch (error) {
                toast({ title: 'Error', description: 'Registration failed', variant: 'destructive' });
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold">Register</h1>
                <div>
                    <Input
                        name="name"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
                </div>
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
                <Button type="submit" disabled={formik.isSubmitting}>Register</Button>
            </form>
        </div>
    );
}