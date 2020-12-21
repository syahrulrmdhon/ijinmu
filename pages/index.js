import React from "react";
import cookies from "next-cookies";
import Layout from "../components/Layouts";
import LayoutsApp from "../components/LayoutsApp";

function Home() {
  return (
    <Layout>
      <LayoutsApp>
        <h1>This is Dashboard</h1>
      </LayoutsApp>
    </Layout>
  );
}

Home.getInitialProps = async (ctx) => {
  let dataCookie;
  const { loginData } = cookies(ctx);
  if (loginData) {
    dataCookie = loginData;
  } else {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    }
  }

  return { dataCookie };
};

export default Home;
