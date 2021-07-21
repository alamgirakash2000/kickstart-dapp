import React, { useState } from "react";
import Layout from "./../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { useRouter } from "next/router";
import { Button, Form, Input, Message } from "semantic-ui-react";

export default function NewRequest() {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [receiver, setReceiver] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!description || !value || !receiver) {
      setErrorMessage("Please fill every input correctly.");
      setIsLoading(false);
      return;
    }

    const campaign = Campaign(router.query.campaign);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), receiver)
        .send({
          from: accounts[0],
        });
      router.push(`/campaigns/${router.query.campaign}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <h3>Create a new request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='why you want money?'
          />
        </Form.Field>
        <Form.Field>
          <label>Amount</label>
          <Input
            label='Ether'
            placeholder='e.g. : 0.001'
            labelPosition='right'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Receiver's Address</label>
          <input
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder='e.g.: 0xf02xxxxxxxxxxx'
          />
        </Form.Field>
        <Message error header='Oops!' content={errorMessage} />
        <Button primary loading={isLoading} type='submit'>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}
