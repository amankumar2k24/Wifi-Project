'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
});

export default function UserProfile() {
    const { toast } = useToast();
    const { data: profile, isLoading } = useQuery({
        queryKey: ['user-profile'],
        queryFn: fetchUserProfile,
    });

    const mutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            toast({ title: 'Success', description: 'Profile updated successfully' });
        },
    });

    const formik = useFormik({
        initialValues: {
            name: profile?.name || '',
            address: profile?.address || '',
        },
        validationSchema: ProfileSchema,
        enableReinitialize: true,
        onSubmit: (values: any) => mutation.mutate(values),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">User Profile</h1>
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md space-y-4">
                <div>
                    <Input
                        name="name"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {typeof formik.errors.name === "string" && <p className="text-red-500">{formik.errors.name}</p>}
                </div>
                <div>
                    <Input
                        name="address"
                        placeholder="Address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                    {typeof formik.errors.address === "string" && <p className="text-red-500">{formik.errors.address}</p>}
                </div>
                <Button type="submit" disabled={formik.isSubmitting}>Update Profile</Button>
            </form>
        </div>
    );
}