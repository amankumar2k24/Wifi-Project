'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { fetchPayments, updatePaymentStatus } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';

export default function Payments() {
    const [search, setSearch] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const { toast } = useToast();

    const { data: payments, isLoading } = useQuery({
        queryKey: ['payments', search],
        queryFn: () => fetchPayments({ search }),
    });

    const updateStatusMutation = useMutation({
        mutationFn: updatePaymentStatus,
        onSuccess: () => {
            toast({ title: 'Success', description: 'Payment status updated' });
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Payments</h1>
            <Input
                placeholder="Search by username or payment status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-md"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Screenshot</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments?.map((payment: any) => (
                        <TableRow key={payment.id}>
                            <TableCell>{payment.userName}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>{payment.paymentMethod}</TableCell>
                            <TableCell>
                                {payment.screenshot && (
                                    <Image
                                        src={payment.screenshot}
                                        alt="Payment screenshot"
                                        width={50}
                                        height={50}
                                        className="cursor-pointer"
                                        onClick={() => setSelectedImage(payment.screenshot)}
                                    />
                                )}
                            </TableCell>
                            <TableCell>{payment.status}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={payment.status === 'PENDING' ? 'default' : 'destructive'}>
                                            {payment.status === 'PENDING' ? 'Approve' : 'Reject'}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Confirm Action</DialogTitle>
                                        </DialogHeader>
                                        <p>
                                            Are you sure you want to {payment.status === 'PENDING' ? 'approve' : 'reject'} this payment?
                                        </p>
                                        <Button
                                            onClick={() =>
                                                updateStatusMutation.mutate({
                                                    id: payment.id,
                                                    status: payment.status === 'PENDING' ? 'APPROVED' : 'REJECTED',
                                                })
                                            }
                                        >
                                            Confirm
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedImage && (
                <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Payment Screenshot</DialogTitle>
                        </DialogHeader>
                        <Image src={selectedImage} alt="Payment screenshot" width={400} height={400} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}