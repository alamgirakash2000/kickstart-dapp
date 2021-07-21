import React from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ href }) {
  const router = useRouter();

  return (
    <Menu size='tiny' className='mt-4'>
      <Button
        onClick={() => router.back()}
        content='Back'
        icon='left arrow'
        color='teal'
      />
      <Link href='/'>
        <a className='item'>CrowdCoin</a>
      </Link>

      <Menu.Menu position='right'>
        <Link href='/'>
          <a className='item'>Campaigns</a>
        </Link>

        <Button
          color='green'
          onClick={() => router.push("/campaigns/new")}
          icon>
          <Icon name='plus' />
        </Button>
      </Menu.Menu>
    </Menu>
  );
}
