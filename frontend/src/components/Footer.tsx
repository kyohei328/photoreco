import { Container, Group, Anchor } from '@mantine/core';
import classes from '../assets/FooterSimple.module.css';
import { css } from '@emotion/react';

const Styles = {
  LogoStyle: css ({
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Bodoni',
    fontStyle: 'oblique 15deg',
  }),
  FooterStyle: css ({
    backgroundColor: '#F1F3F5',
  })
}

const links = [
  { link: '#', label: 'お問い合わせ' },
  { link: '#', label: 'プライバシーポリシー' },
  { link: '#', label: '利用規約' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div css={Styles.FooterStyle} className={classes.footer}>
      <Container className={classes.inner}>
        <a css={Styles.LogoStyle} href='/'>
          Photo Space
        </a>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}