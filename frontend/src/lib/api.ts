import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const register = async (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data).then((res) => res.data);

export const forgotPassword = async (email: string) =>
    api.post('/auth/forgot-password', { email }).then((res) => res.data);

export const resetPassword = async ({ token, password }: { token: string; password: string }) =>
    api.post('/auth/reset-password', { token, password }).then((res) => res.data);

export const fetchAdminDashboardData = async () =>
    api.get('/dashboard/admin').then((res) => res.data);

export const fetchUserDashboardData = async () =>
    api.get('/dashboard/user').then((res) => res.data);

export const fetchUsers = async ({ search }: { search: string }) =>
    api.get('/users', { params: { search } }).then((res) => res.data);

export const deactivateUser = async (id: number) =>
    api.patch(`/users/${id}/deactivate`).then((res) => res.data);

export const updateUserPaymentStatus = async ({
    userId,
    status,
    planMonths,
}: {
    userId: number;
    status: string;
    planMonths: number;
}) =>
    api.patch(`/users/${userId}/payment-status`, { status, planMonths }).then((res) => res.data);

export const fetchPayments = async ({ search }: { search: string }) =>
    api.get('/payments', { params: { search } }).then((res) => res.data);

export const updatePaymentStatus = async ({ id, status }: { id: number; status: string }) =>
    api.patch(`/payments/${id}/status`, { status }).then((res) => res.data);

export const fetchAdminProfile = async () => api.get('/profile/admin').then((res) => res.data);

export const updateAdminProfile = async (data: { name: string; qrCode: string; upiNumber: string }) =>
    api.patch('/profile/admin', data).then((res) => res.data);

export const fetchUserProfile = async () => api.get('/profile/user').then((res) => res.data);

export const updateUserProfile = async (data: { name: string; address: string }) =>
    api.patch('/profile/user', data).then((res) => res.data);

export const fetchPaymentHistory = async () => api.get('/payments/history').then((res) => res.data);

export const fetchNextPayments = async () => api.get('/payments/next').then((res) => res.data);

export const submitPayment = async ({ planMonths, screenshot }: { planMonths: number; screenshot: File }) => {
    const formData = new FormData();
    formData.append('planMonths', planMonths.toString());
    formData.append('screenshot', screenshot);
    return api.post('/payments', formData).then((res) => res.data);
};

export const fetchNotifications = async () => api.get('/notifications').then((res) => res.data);