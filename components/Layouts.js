import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Ijinmu.com</title>
        <link rel="icon" href="/favicon3.ico" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
