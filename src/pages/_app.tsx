import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient()) // React Query는 QueryClient가 있어야 동작

  // QueryClientProvider: 하위 모든 컴포넌트에서 React Query를 사용할 수 있게 해줍니다.
  // Component: 현재 요청된 페이지 컴포넌트입니다.
  // ReactQueryDevtools: 상태, 캐시, 에러 등을 시각적으로 볼 수 있는 도구입니다.

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
