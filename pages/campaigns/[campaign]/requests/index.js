import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "./../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "./../../../../components/RequestRow";

export default function RequestsList({
  requests,
  approversCount,
  requestCount,
}) {
  const router = useRouter();

  const { Header, Row, HeaderCell, Body } = Table;

  const renderRow = () => {
    return requests?.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={router.query.campaign}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <div className='mt-5 d-flex justify-content-between'>
        <h3>Requests</h3>
        <Button
          onClick={() =>
            router.push(`/campaigns/${router.query.campaign}/requests/new`)
          }>
          Add Request
        </Button>
      </div>

      <div className='row mt-5'>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>ApprovalCount</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{renderRow()}</Body>
        </Table>
      </div>

      <p>Found {requestCount || 0} requests.</p>
    </Layout>
  );
}

RequestsList.getInitialProps = async (router) => {
  const campaign = Campaign(router.query.campaign);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  let requests = [];

  if (requestCount != 0) {
    requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
  }

  return { requests, requestCount, approversCount };
};
