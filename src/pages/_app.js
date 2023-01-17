import '@/styles/globals.css';
import Layout from "../layout/Layout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {ThemeProvider} from "next-themes"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
    <Layout>
      <ToastContainer limit={1}/>
      <Component {...pageProps} />
    </Layout>
    </ThemeProvider>
  )
}
