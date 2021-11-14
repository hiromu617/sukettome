import type { AppProps } from 'next/app';
import { AppProvider } from '../src/providers/app';
import { Layout } from '../src/components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
export default MyApp;
