import "@/styles/globals.css";

import type { ReactElement, ReactNode } from "react";
import { useMemo } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
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

const WrappedClientProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const apolloClient = useMemo(() => {
    let client: ApolloClient<any>;
    if (session.data?.supabaseAccessToken) {
      client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${session.data?.supabaseAccessToken}`,
        },
      });
    } else {
      client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
        cache: new InMemoryCache(),
        connectToDevTools: false,
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      });
    }
    client.resetStore();
    return client;
  }, [session.data?.supabaseAccessToken]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const queryClient = useMemo(() => new QueryClient({}), []);

  return (
    <SessionProvider session={pageProps.session}>
      <SupabaseProvider>
        <QueryClientProvider client={queryClient}>
          <WrappedClientProvider>
            <ModalProvider>
              {getLayout(<Component {...pageProps} />)}
              <ReactQueryDevtools initialIsOpen={false} />
            </ModalProvider>
          </WrappedClientProvider>
        </QueryClientProvider>
      </SupabaseProvider>
    </SessionProvider>
  );
}
