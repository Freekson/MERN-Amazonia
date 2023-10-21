import React from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";

const MapPage: React.FC = () => {
  return (
    <Layout isFullScreen={true}>
      <Helmet>
        <title>Map</title>
      </Helmet>
      <h1>jhh</h1>
    </Layout>
  );
};

export default MapPage;
