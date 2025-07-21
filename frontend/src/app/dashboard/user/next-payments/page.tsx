'use client';

import { useState } from 'react';
import { useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fetchNextPayments, submitPayment } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

export default function NextPayments() {
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [selectedPlanMonths, setSelectedPlanMonths] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { toast } = useToast();

    const { data: payments, isLoading } = useQuery({
        queryKey: ['next-payments'],
        queryFn: fetchNextPayments,
    });

    const mutation = useMutation({
        mutationFn: submitPayment,
        onSuccess: () => {
            toast({ title: 'Success', description: 'Payment submitted successfully' });
            setShowPaymentDialog(false);
        },
    }) as UseMutationResult<any, Error, { planMonths: number; screenshot: File; }, unknown> & { isLoading: boolean };


    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Next Payments</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Plan</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments?.slice(0, 2).map((payment: any) => (
                        <TableRow
                            key={payment.id}
                            className={payment.status === 'ACTIVE' ? 'bg-green-100' : 'bg-red-100'}
                        >
                            <TableCell>{payment.months} Month(s)</TableCell>
                            <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>{payment.status}</TableCell>
                            <TableCell>
                                {payment.status !== 'ACTIVE' && (
                                    <Button onClick={() => setShowPaymentDialog(true)}>Make Payment</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit Payment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <img src="/qr-code-placeholder.png" alt="QR Code" className="w-32 h-32 mx-auto" />
                        <Input type="file" accept="image/*" onChange={handleFileChange} />
                        <select
                            onChange={(e) => {
                                const planMonths = parseInt(e.target.value);
                                if (selectedFile) {
                                    mutation.mutate({ planMonths, screenshot: selectedFile });
                                } else {
                                    toast({ title: 'Error', description: 'Please select a file before submitting payment' });
                                }
                            }}
                        >
                            <option value="">Select Plan</option>
                            <option value="1">1 Month</option>
                            <option value="2">2 Months</option>
                            <option value="3">3 Months</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                        </select>
                        <Button
                            onClick={() => {
                                if (selectedFile && selectedPlanMonths) {
                                    mutation.mutate({ planMonths: selectedPlanMonths, screenshot: selectedFile });
                                } else {
                                    toast({ title: 'Error', description: 'Please select a file and a plan before submitting payment' });
                                }
                            }}
                            disabled={!selectedFile || !selectedPlanMonths || mutation.isLoading}
                        >
                            Submit Payment
                        </Button>


                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}