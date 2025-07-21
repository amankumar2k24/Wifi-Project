import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';
import React from 'react';

type ToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

interface ToastAction {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ToastProps {
    title?: string;
    description?: string;
    variant?: ToastVariant;
    action?: ToastAction; // not React.ReactNode anymore
}

export function useToast() {
    const toast = useCallback(
        ({ title, description, variant = 'default', action }: ToastProps) => {
            const message = title || description || '';

            // Determine toast function for known types
            const toastFn =
                variant === 'destructive'
                    ? sonnerToast.error
                    : variant === 'success'
                        ? sonnerToast.success
                        : sonnerToast; // for 'default', 'info', and 'warning'

            // Add custom class based on variant
            const className =
                variant === 'destructive'
                    ? 'bg-destructive text-destructive-foreground'
                    : variant === 'info'
                        ? 'bg-blue-500 text-white'
                        : variant === 'warning'
                            ? 'bg-yellow-400 text-black'
                            : undefined;

            toastFn(message, {
                description: title && description ? description : undefined,
                action,
                className,
            });
        },
        []
    );

    return { toast };
}