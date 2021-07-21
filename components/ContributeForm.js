import React, { useEffect, useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

export default function ContributeForm({
  renderCards,
  address,
  minimumContribution,
}) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    renderCards();
  }, [isLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      router.reload();
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Form className='ml-4' onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Contribute to this campaign</label>
          <Input
            label='ether'
            placeholder={`min: ${web3.utils.fromWei(
              minimumContribution,
              "ether"
            )}`}
            labelPosition='right'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>

        <Message error header='Oops!' content={errorMessage} />

        <Button loading={isLoading} primary type='submit'>
          Contribute!
        </Button>
      </Form>
    </div>
  );
}
