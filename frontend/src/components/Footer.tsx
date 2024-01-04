import { Container, Group, Anchor } from '@mantine/core';
import classes from '../assets/FooterSimple.module.css';
import { css } from '@emotion/react';

const Styles = {
  FooterStyle: css ({
    backgroundColor: '#F1F3F5',
  })
}

const links = [
  { link: 'https://forms.gle/xSBjAgnyJAceHbt26', label: 'お問い合わせ' },
  { link: "/privacy-policy", label: 'プライバシーポリシー' },
  { link: '/terms-of-use', label: '利用規約' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      key={link.label}
      href={link.link}
      size="sm"
      className='py-1.5 px-4 text-gray-500 hover:text-black relative after:absolute after:bottom-0 after:left-10 after:w-4/5 after:h-0.5 after:bg-black after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100'
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div css={Styles.FooterStyle} className={classes.footer}>
      <Container className={classes.inner}>
        <div className='h-10 hover:opacity-75 transition-all duration-300'>
          <a href='/'>
            <img src="../../public/Top.png" alt="" className='object-cover h-full'/>
          </a>
        </div>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}