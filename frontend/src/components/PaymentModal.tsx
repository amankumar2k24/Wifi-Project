'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function PaymentModal({ user, onClose }: { user: any; onClose: () => void }) {
    return (
        <Dialog open={!!user} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Payment History for {user.name}</DialogTitle>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Amount</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {user.payments?.map((payment: any) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.amount}</TableCell>
                                <TableCell>{payment.paymentMethod}</TableCell>
                                <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{payment.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
}