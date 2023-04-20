import { Inter } from 'next/font/google'
import Layout from "@/layout/Layout";
import {ReactElement} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return "Hello world"
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
