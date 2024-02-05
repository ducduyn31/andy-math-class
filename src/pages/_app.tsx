import "@/styles/globals.css";

import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { SupabaseProvider } from "@/hooks/use-supabase-context";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { ModalProvider } from "@/hooks/use-modal";
import { prepareCache } from "@/helpers/gql_cache";
import { Loading } from "@/components/loading";
import { useDebounce } from "react-use";
import { hotjar } from "react-hotjar";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const WrappedClientProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const apolloClient = useMemo(() => {
    setLoading(true);
    let client: ApolloClient<any>;
    if (session.data?.supabaseAccessToken) {
      client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
        cache: prepareCache(),
        connectToDevTools: true,
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          Authorization: `Bearer ${session.data?.supabaseAccessToken}`,
        },
      });
    } else {
      client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
        cache: prepareCache(),
        connectToDevTools: false,
        headers: {
          apiKey: `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      });
    }
    return client;
  }, [session.data?.supabaseAccessToken]);

  useDebounce(
    () => {
      apolloClient.clearStore().finally(() => {
        setLoading(false);
      });
    },
    200,
    [apolloClient]
  );

  if (loading) {
    return <Loading type="page" />;
  }
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    if (
      !hotjar.initialized() &&
      process.env.NEXT_PUBLIC_HOTJAR_ID &&
      process.env.NEXT_PUBLIC_HOTJAR_SV
    ) {
      hotjar.initialize(
        +process.env.NEXT_PUBLIC_HOTJAR_ID,
        +process.env.NEXT_PUBLIC_HOTJAR_SV
      );
    }
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <SupabaseProvider>
        <WrappedClientProvider>
          <ModalProvider>
            {getLayout(<Component {...pageProps} />)}
          </ModalProvider>
        </WrappedClientProvider>
      </SupabaseProvider>
    </SessionProvider>
  );
}
