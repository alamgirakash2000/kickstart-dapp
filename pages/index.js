import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";

const Index = ({ campaigns }) => {
  useEffect(() => {
    console.log(campaigns[0]);
  }, []);

  return (
    <div>
      <h1>This is new campaign page</h1>
    </div>
  );
};

Index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns };
};

export default Index;
