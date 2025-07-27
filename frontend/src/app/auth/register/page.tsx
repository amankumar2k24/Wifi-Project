'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { register } from '@/lib/api';
import { HiOutlineUser } from "react-icons/hi"
import { FiMail } from "react-icons/fi"
import { RiLockPasswordFill } from "react-icons/ri"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import Link from 'next/link';
import { useState } from 'react';

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
    name: Yup.string().required('Name is required'),
});

export default function Register() {
    const router = useRouter();
    const [hide, setHide] = useState(true)
    const { toast } = useToast();

    const formik = useFormik({
        initialValues: { email: '', password: '', name: '' },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            try {
                const result = await register(values);
                console.log("result", result)
                toast(result.message);
                router.push('/auth/login');
            } catch (error) {
                console.log("error", error)
                toast({ title: 'Error', description: 'Registration failed', variant: 'destructive' });
            }
        },
    });
    // console.log("values==>", formik.values)

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-lg space-y-4">


                <div className="w-full px-5 md:px-10 ">
                    <div className="text-center mb-10">
                        <h1 className="font-titleFont decoration-[1px] font-semibold text-4xl mb-4">Sign up</h1>
                        <p>Enter your information to register</p>
                    </div>
                    <div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label htmlFor="" className="font-titleFont text-base font-semibold text-gray-600">Name</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <HiOutlineUser />
                                    </div>
                                    <Input
                                        name="name"
                                        placeholder="Name"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        className='rounded-xl'
                                    />
                                </div>
                                {formik.errors.name && <p className="text-red-600 text-sm">{formik.errors.name}</p>}
                            </div>
                        </div>

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

                                    <div onClick={() => setHide(!hide)} className='w-10 h-11 rounded-r-xl flex justify-center items-center bg-gray-400 rounded-e-lg'>
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

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <Button
                                    className="bg-primeColor rounded-xl hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 duration-300"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </div>
                        <div className="text-black text-center">Already have an account? <br />
                            <Link href="/auth/login" className='hover:text-black/70 duration-300 text-sm' >Sign in</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}