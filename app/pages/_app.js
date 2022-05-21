import '../styles/globals.css'
import { PharmaProvider } from '../context/PharmaContext'

function MyApp({ Component, pageProps }) {
  return <PharmaProvider><Component {...pageProps} /></PharmaProvider>
}

export default MyApp
