import "@/styles/globals.css";

import type { ReactElement, ReactNode } from "react";
import { useMemo } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SupabaseProvider } from "@/hooks/use-supabase-context";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "@/hooks/use-modal";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        cache: new InMemoryCache(),
        headers: {
          Authorization: `Bearer ${pageProps.session?.supabaseAccessToken}`,
        },
      }),
    [pageProps.session]
  );

  const queryClient = useMemo(() => new QueryClient({}), []);

  return (
    <SessionProvider session={pageProps.session}>
      <SupabaseProvider>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <ModalProvider>
              {getLayout(<Component {...pageProps} />)}
              <ReactQueryDevtools initialIsOpen={false} />
            </ModalProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </SupabaseProvider>
    </SessionProvider>
  );
}
