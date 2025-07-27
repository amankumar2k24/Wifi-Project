'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { resetPassword } from '@/lib/api';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function ResetPassword() {
  const router = useRouter();
  const [hide, setHide] = useState(true)
  const [confirmHide, setConfirmHide] = useState(true)
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
        <div className="w-full  px-5 md:px-5">
          <div className="text-center mb-10">
            <h1 className="font-titleFont decoration-[1px] font-semibold text-4xl mb-4">Forget Password</h1>
            <p>Enter your email to get reset link</p>
          </div>

          <div className=" w-full">
            {/* Password  */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-6">
                <label htmlFor="" className="font-titleFont text-base font-semibold text-gray-600">Password</label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <RiLockPasswordFill />
                  </div>
                  <Input
                    name="password"
                    type={`${hide ? "password" : "text"}`}
                    placeholder="New Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className='rounded-l-xl'
                  />
                  <div onClick={() => setHide(!hide)} className='w-10 h-11 rounded-r-xl  flex justify-center items-center bg-gray-400 rounded-e-lg'>
                    {hide ?
                      <AiFillEyeInvisible className='text-black ' size={20} />
                      :
                      <AiFillEye className='text-black ' size={20} />
                    }
                  </div>
                </div>
                {formik.errors.password && <p className="text-red-600 text-sm">{formik.errors.password}</p>}
              </div>
            </div>

            {/* // Confirm Password  */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-12">
                <label htmlFor="" className="font-titleFont text-base font-semibold text-gray-600">Confirm Password</label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <RiLockPasswordFill />
                  </div>
                  <Input
                    name="confirmPassword"
                    type={`${confirmHide ? "password" : "text"}`}
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    className='rounded-l-xl'
                  />
                  <div onClick={() => setConfirmHide(!confirmHide)} className='w-10 h-11 rounded-r-xl  flex justify-center items-center bg-gray-400 rounded-e-lg'>
                    {confirmHide ?
                      <AiFillEyeInvisible className='text-black ' size={20} />
                      :
                      <AiFillEye className='text-black ' size={20} />
                    }
                  </div>
                </div>
                {formik.errors.confirmPassword && <p className="text-red-600 text-sm">{formik.errors.confirmPassword}</p>}
              </div>
            </div>


            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <Button
                  className="bg-primeColor rounded-xl hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 duration-300"
                  type="submit"
                  disabled={formik.isSubmitting}>
                  Reset Password
                </Button>
              </div>
            </div>
            <div className="text-black text-center">Remember Credentials?
              <Link href="/auth/login" className=' ml-1 hover:text-black/70 duration-300 text-sm'>Sign in</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}