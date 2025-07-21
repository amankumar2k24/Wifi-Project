'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { fetchUsers, deactivateUser, updateUserPaymentStatus } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { PaymentModal } from '@/components/PaymentModal';

export default function AllUsers() {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const { toast } = useToast();

    const { data: users, isLoading } = useQuery({
        queryKey: ['users', search],
        queryFn: () => fetchUsers({ search }),
    });

    const deactivateMutation = useMutation({
        mutationFn: deactivateUser,
        onSuccess: () => {
            toast({ title: 'Success', description: 'User deactivated successfully' });
        },
    });

    const updatePaymentStatusMutation = useMutation({
        mutationFn: updateUserPaymentStatus,
        onSuccess: () => {
            toast({ title: 'Success', description: 'Payment status updated' });
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">All Users</h1>
            <Input
                placeholder="Search by name or payment status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-md"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment History</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>
                                <Button variant="link" onClick={() => setSelectedUser(user)}>
                                    View History
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">Deactivate</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Confirm Deactivation</DialogTitle>
                                        </DialogHeader>
                                        <p>Are you sure you want to deactivate {user.name}?</p>
                                        <Button
                                            onClick={() => deactivateMutation.mutate(user.id)}
                                            variant="destructive"
                                        >
                                            Confirm
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                                <select
                                    onChange={(e) =>
                                        updatePaymentStatusMutation.mutate({
                                            userId: user.id,
                                            status: e.target.value,
                                            planMonths: parseInt(e.target.value),
                                        })
                                    }
                                >
                                    <option value="">Select Plan</option>
                                    <option value="1">1 Month</option>
                                    <option value="2">2 Months</option>
                                    <option value="3">3 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="12">12 Months</option>
                                </select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedUser && (
                <PaymentModal user={selectedUser} onClose={() => setSelectedUser(null)} />
            )}
        </div>
    );
}