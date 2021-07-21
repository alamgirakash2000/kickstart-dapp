import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "./../components/Layout";

const Index = ({ campaigns }) => {
  const [campaignItems, setCampaignItems] = useState([]);

  useEffect(() => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign </a>
          </Link>
        ),
        fluid: true,
      };
    });
    setCampaignItems(items);
  }, []);

  return (
    <Layout>
      <div>
        <div className='row'>
          <div className='col-md-8'>
            <h3>Open Campaigns</h3>
            <Card.Group items={campaignItems} />
          </div>
          <div className='col-md-4 mt-3 text-center'>
            <Link href='/campaigns/new'>
              <a>
                <Button content='Create Campaign' icon='add circle' primary />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns };
};

export default Index;
