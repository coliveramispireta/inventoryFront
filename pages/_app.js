import '@/styles/globals.css'
import { Montserrat } from "next/font/google";
import { UsuarioProvider } from '@/context/usuarioProvider'

const inter = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps, BASE_URL }) {

  return (
    <div className={inter.className}>
      <UsuarioProvider>
        <Component {...pageProps} />
      </UsuarioProvider>
    </div>
  )
}