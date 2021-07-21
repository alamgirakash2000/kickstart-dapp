import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "./../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

export default function NewCamp() {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const accounts = await web3.eth.getAccounts();

    try {
      console.log(accounts);
      await factory.methods.createCampaign(value).send({
        from: accounts[0],
      });
      setValue("");
      setErrorMessage("");
      router.push("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form className='ml-4' onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label='wei'
            placeholder='e.g. : 100000'
            labelPosition='right'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>

        <Message error header='Oops!' content={errorMessage} />

        <Button loading={isLoading} primary type='submit'>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}
