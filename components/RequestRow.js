import React, { useState } from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { useRouter } from "next/router";

export default function RequestRow({ id, request, approversCount, address }) {
  const { Row, Cell } = Table;
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const readyToFinalize = request.approvalCount > request.approversCount / 2;
  const router = useRouter();

  const approve = async (id) => {
    setIsLoading(true);
    setErrorMessage("");

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
      router.reload();
    } catch (err) {
      setErrorMessage(err.message);
      console.log(errorMessage);
    }
    setIsLoading(false);
  };

  const finalize = async (id) => {
    setIsLoad(true);
    setErrorMessage("");

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
      router.reload();
    } catch (err) {
      setErrorMessage(err.message);
      console.log(errorMessage);
    }
    setIsLoad(false);
  };

  return (
    <Row
      disabled={request.complete}
      className={readyToFinalize && "text-success"}>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount} / {approversCount || 0}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button
            loading={isLoading}
            basic
            color='green'
            onClick={() => approve(id)}
            content='Approve'
          />
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button
            loading={isLoad}
            basic
            color='teal'
            onClick={() => finalize(id)}
            content='Finalize'
          />
        )}
      </Cell>
    </Row>
  );
}
