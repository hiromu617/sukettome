import type { AppProps } from 'next/app';
import { AppProvider } from '../src/providers/app';
import { Layout } from '../src/components/Layout/Layout';
import NextProgress from 'next-progress';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <NextProgress delay={300} options={{ showSpinner: false }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
export default MyApp;
