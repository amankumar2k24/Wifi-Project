'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { resetPassword } from '@/lib/api';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // Type guard to ensure token is a string
  if (!token) {
    throw new Error('Token is missing from the URL');
  }

  const { toast } = useToast();

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      try {
        await resetPassword({ token, password: values.password });
        toast({ title: 'Success', description: 'Password reset successful' });
        router.push('/auth/login');
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to reset password', variant: 'destructive' });
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <div>
          <Input
            name="password"
            type="password"
            placeholder="New Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
        </div>
        <div>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && <p className="text-red-500">{formik.errors.confirmPassword}</p>}
        </div>
        <Button type="submit" disabled={formik.isSubmitting}>Reset Password</Button>
      </form>
    </div>
  );
}