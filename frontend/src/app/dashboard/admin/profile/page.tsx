'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchAdminProfile, updateAdminProfile } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    qrCode: Yup.string().url('Invalid URL').required('Required'),
    upiNumber: Yup.string().required('Required'),
});

export default function AdminProfile() {
    const { toast } = useToast();
    const { data: profile, isLoading } = useQuery({
        queryKey: ['admin-profile'],
        queryFn: fetchAdminProfile,
    });

    const mutation = useMutation({
        mutationFn: updateAdminProfile,
        onSuccess: () => {
            toast({ title: 'Success', description: 'Profile updated successfully' });
        },
    });

    const formik = useFormik({
        initialValues: {
            name: profile?.name || '',
            qrCode: profile?.qrCode || '',
            upiNumber: profile?.upiNumber || '',
        },
        validationSchema: ProfileSchema,
        enableReinitialize: true,
        onSubmit: (values) => mutation.mutate(values),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Profile</h1>
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-4">
                <div>
                    <Input
                        name="name"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {typeof formik.errors.name === 'string' && <p className="text-red-500">{formik.errors.name}</p>}
                </div>
                <div>
                    <Input
                        name="qrCode"
                        placeholder="QR Code URL"
                        onChange={formik.handleChange}
                        value={formik.values.qrCode}
                    />
                    {typeof formik.errors.qrCode === 'string' && <p className="text-red-500">{formik.errors.qrCode}</p>}
                </div>
                <div>
                    <Input
                        name="upiNumber"
                        placeholder="UPI Number"
                        onChange={formik.handleChange}
                        value={formik.values.upiNumber}
                    />
                    {typeof formik.errors.upiNumber === "string" && <p className="text-red-500">{formik.errors.upiNumber}</p>}
                </div>
                <Button type="submit" disabled={formik.isSubmitting}>Update Profile</Button>
            </form>
        </div>
    );
}