import React from "react";
import cookies from "next-cookies";
import Layout from "../components/Layouts";

function Home() {
  return (
    <Layout>
      <h1>This is Homepage</h1>
    </Layout>
  );
}

Home.getInitialProps = async (ctx) => {
  let dataCookie;
  const { attributes } = cookies(ctx);
  if (attributes) {
    dataCookie = attributes;
  } else {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }
  }

  return { dataCookie };
}

export default Home;