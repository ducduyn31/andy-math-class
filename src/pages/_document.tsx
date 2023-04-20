import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <footer className="footer mt-5 footer-center p-4 bg-base-300 text-base-content">
            <div>
                <p>Footer</p>
            </div>
        </footer>
      </body>
    </Html>
  )
}
