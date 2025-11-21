import React from 'react'
import MuiProviders from './components/muiProvider'
import TanQueryProvider from './components/tanQueryProvider'
import ToastProvider from './components/toastProvider'

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <MuiProviders>
            <TanQueryProvider>
                <ToastProvider />
                {children}
            </TanQueryProvider>
        </MuiProviders>
    )
}
