import React, { useEffect, useState } from "react";
import Layout from "./../../../components/Layout";
import { useRouter } from "next/router";
import Campaign from "../../../ethereum/campaign";
import { Button, Card } from "semantic-ui-react";
import Web3 from "web3";
import ContributeForm from "../../../components/ContributeForm";
import Link from "next/link";

export default function CampaignDetails(props) {
  const [campaignDetails, setCampaignDetails] = useState([]);
  const router = useRouter();

  useEffect(() => {
    renderCards();
  }, []);

  const renderCards = () => {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approvalCount,
      manager,
    } = props;

    const items = [
      {
        header: manager,
        description:
          "The manager has created this campaign and he only he can create request to withdraw the money",
        meta: "Address of Manager",
      },

      {
        header: minimumContribution,
        description:
          "You must contribute at least this much wei to become a contributor of this campaign.",
        meta: "Minimum Contribution (wei)",
      },
      {
        header: requestsCount,
        description:
          "A request tries to withdraw money from this contract. Requests must be approved by the contributors.",
        meta: "Number of Requests",
      },
      {
        header: approvalCount,
        description:
          "Number of people who have already contributed to this campaign.",
        meta: "Number of Contributors",
      },
      {
        header: Web3.utils.fromWei(balance, "ether"),
        description: "This is the remaining balance of this campaign.",
        meta: "Campaign Balance (Ether)",
      },
    ];
    setCampaignDetails(items);
  };

  return (
    <Layout>
      <h3>Campaign Details</h3>
      <div className='row'>
        <div className='col-md-8'>
          <div className='row'>
            <Card.Group items={campaignDetails} />
          </div>
          <div className='row mt-4 text-center'>
            <Link href={`/campaigns/${router.query.campaign}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </div>
        </div>
        <div className='col-md-4'>
          <ContributeForm
            minimumContribution={props.minimumContribution}
            address={router.query.campaign}
            renderCards={renderCards}
          />
        </div>
      </div>
    </Layout>
  );
}

CampaignDetails.getInitialProps = async (router) => {
  const campaign = Campaign(router.query.campaign);
  const summary = await campaign.methods.getSummary().call();

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approvalCount: summary[3],
    manager: summary[4],
  };
};
