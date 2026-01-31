import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: 'var(--surface)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '600',
                },
                success: {
                    iconTheme: {
                        primary: 'var(--success)',
                        secondary: 'white',
                    },
                },
                error: {
                    iconTheme: {
                        primary: 'var(--danger)',
                        secondary: 'white',
                    },
                },
            }}
        />
    )
}
