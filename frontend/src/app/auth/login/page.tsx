'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { RiLockPasswordFill } from "react-icons/ri"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { FiMail } from "react-icons/fi"
import { useState } from 'react';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
});

export default function Login() {
    const router = useRouter();
    const [hide, setHide] = useState(true)
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
            // console.log("result 1", result)
            if (result?.error) {
                if (result.error === 'CredentialsSignin') {
                    toast({ title: 'Error', description: 'Invalid email or password', variant: 'destructive' });
                } else {
                    toast({ title: 'Error', description: result.error, variant: 'destructive' });
                }
            } else {
                const res = await fetch('/api/auth/session');
                const session = await res.json();
                // console.log("session==>", session)
                if (session?.user?.role) {
                    localStorage.setItem('role', session.user.role);
                }
                if (session.user.role === "ADMIN") {
                    router.push(`/dashboard/admin`);
                } else if (session.user.role === "USER") {
                    router.push(`/dashboard/user`)
                }
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-4">

                <div className="w-full  px-5 md:px-5">
                    <div className="text-center mb-10">
                        <h1 className="font-titleFont decoration-[1px] font-semibold text-4xl mb-4">Sign in</h1>
                        <p>Enter your information to sign in</p>
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

                        {/* Password */}
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-12">
                                <label htmlFor="" className="font-titleFont text-base font-semibold text-gray-600">Password</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <RiLockPasswordFill />
                                    </div>
                                    <Input
                                        name="password"
                                        type={`${hide ? "password" : "text"}`}
                                        placeholder="Password"
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
                                <Link href="/auth/forgot-password" className='font-titleFont font-semibold text-gray-600 text-sm hover:text-black'>Forget Password</Link>
                            </div>
                        </div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <Button
                                    className="bg-primeColor rounded-xl hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 duration-300"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    Sign in
                                </Button>
                            </div>
                        </div>
                        <div className="text-black text-center">Don't have an account? <br />
                            <Link href="/auth/register" className='  hover:text-black/70 duration-300 text-sm'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}