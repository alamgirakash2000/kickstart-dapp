import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";

export default function Layout(props) {
  return (
    <Container>
      <Head>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
          crossorigin='anonymous'
        />
      </Head>

      <Header />
      {props.children}
    </Container>
  );
}
