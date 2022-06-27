import App from "next/app";
import { Context, initialRender } from '../context/sse.context';


export default function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const data = await App.getInitialProps(appContext);

  const sse = await initialRender(appContext, data);

  const pageProps = {
    ...data.pageProps,
    ...sse,
  };

  return pageProps;
}