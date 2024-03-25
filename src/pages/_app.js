import "@/styles/globals.css";
import { Wrapper } from "context/AppContext";
import "react-alice-carousel/lib/alice-carousel.css";
import Layout from "../components/Layout";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";

const progress = new ProgressBar({
  size: 4,
  color: "#94a3b8",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      {" "}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Wrapper>
  );
}
