import ReactDOMServer from "react-dom/server";
import { createServerContext } from "use-sse";

export const { ServerDataContext, resolveData } = createServerContext();

function getOrCreate() {
  if (process.browser) {
    window._initialDataContext = window.__NEXT_DATA__.props;
    return require("use-sse").createBroswerContext();
  }
  return ServerDataContext;
}

export const Context = getOrCreate();

export async function initialRender(appContext, pageProps) {
  const WithAppContext = appContext.AppTree;

  ReactDOMServer.renderToString( 
    <Context>
      <WithAppContext {...pageProps } />
    </Context>
  );

  const sse = await resolveData();

  return sse;
}
