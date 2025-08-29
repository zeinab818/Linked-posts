import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import AuthContextProvider from './Context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastProvider } from "@heroui/toast"
export const queryClient=new QueryClient();
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HeroUIProvider>
            {/* <ToastProvider placement="top-center"> */}
                <AuthContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <App/>
                        <ReactQueryDevtools/>
                    </QueryClientProvider>
                </AuthContextProvider>
            {/* </ToastProvider> */}
        </HeroUIProvider>
    </StrictMode>
)
