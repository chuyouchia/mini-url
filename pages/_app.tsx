import { AppProps } from "next/app";
import 'antd/dist/antd.dark.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
