import { AppProps } from 'next/app';
import { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from 'react-query';
import AppLayout from '../components/common/AppLayout';
import { GlobalStyle } from '../styles/GlobalStyle';
import ErrorBoundary from '../components/common/error/ErrorBoundary';

// using function here because dehydratedState is not inferred when const ??
function App({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <AppLayout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </AppLayout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
