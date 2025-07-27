'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { forgotPassword } from '@/lib/api';
import Link from 'next/link';
import { FiMail } from 'react-icons/fi';

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

                <div className="w-full  px-5 md:px-5">
                    <div className="text-center mb-10">
                        <h1 className="font-titleFont decoration-[1px] font-semibold text-4xl mb-4">Forget Password</h1>
                        <p>Enter your email to get reset link</p>
                    </div>

                    <div className=" w-full">
                        {/* Email  */}
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label htmlFor="" className="font-titleFont text-base font-semibold text-gray-600">Email</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <FiMail />
                                    </div>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        className='rounded-xl'
                                    />
                                </div>
                                {formik.errors.email && <p className="text-red-600 text-sm">{formik.errors.email}</p>}
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <Button
                                    className="bg-primeColor rounded-xl hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 duration-300"
                                    type="submit"
                                    disabled={formik.isSubmitting}>
                                    Send Reset Link
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