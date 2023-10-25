import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from "../assets/Header.module.css";
import { css } from "@emotion/react"

const style = {
  logostyle: css ({
    fontSize: '28px',
    fontWeight: 'bold',
  })
}

const links = [
  { link: '/about', label: '写真一覧' },
  { link: '/pricing', label: 'コンテスト' },
];


export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <a href='/' css={style.logostyle}>Photo Space </a>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}