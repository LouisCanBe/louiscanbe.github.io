import './styles.css'; // 引入全局 CSS 文件

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp; 