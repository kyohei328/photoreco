import {
  Group,
  Button,
  // UnstyledButton,
  // Text,
  // ThemeIcon,
  Box,
  // Burger,
  // rem,
  // useMantineTheme,
} from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import {
//   IconNotification,
//   IconCode,
//   IconBook,
//   IconChartPie3,
//   IconFingerprint,
//   IconCoin,
// } from '@tabler/icons-react';
import classes from '../assets/HeaderMegaMenu.module.css';
import { css } from '@emotion/react';
import { LoginIcon } from '../icons/LoginIcon';
import { Link } from 'react-router-dom';


const Styles = {
  LogoStyle: css ({
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: 'Bodoni',
    fontStyle: 'oblique 15deg',
  }),
  HeaderStyle: css ({
    backgroundColor: '#F1F3F5',
  })
}

// const mockdata = [
//   {
//     icon: IconCode,
//     title: 'Open source',
//     description: 'This Pokémon’s cry is very loud and distracting',
//   },
//   {
//     icon: IconCoin,
//     title: 'Free for everyone',
//     description: 'The fluid of Smeargle’s tail secretions changes',
//   },
//   {
//     icon: IconBook,
//     title: 'Documentation',
//     description: 'Yanma is capable of seeing 360 degrees without',
//   },
//   {
//     icon: IconFingerprint,
//     title: 'Security',
//     description: 'The shell’s rounded shape and the grooves on its.',
//   },
//   {
//     icon: IconChartPie3,
//     title: 'Analytics',
//     description: 'This Pokémon uses its flying ability to quickly chase',
//   },
//   {
//     icon: IconNotification,
//     title: 'Notifications',
//     description: 'Combusken battles with the intensely hot flames it spews',
//   },
// ];

export function Header() {
  // const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  // const theme = useMantineTheme();

  // const links = mockdata.map((item) => (
  //   <UnstyledButton className={classes.subLink} key={item.title}>
  //     <Group wrap="nowrap" align="flex-start">
  //       <ThemeIcon size={34} variant="default" radius="md">
  //         <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
  //       </ThemeIcon>
  //       <div>
  //         <Text size="sm" fw={500}>
  //           {item.title}
  //         </Text>
  //         <Text size="xs" c="dimmed">
  //           {item.description}
  //         </Text>
  //       </div>
  //     </Group>
  //   </UnstyledButton>
  // ));

  return (
    // <Box pb={120}>
    <Box pb={30}>
      <header className={classes.header} css={Styles.HeaderStyle}>
        <Group justify="space-between" h="100%">
          <Group>
            <a css={Styles.LogoStyle} href='/'>
              Photo Space
            </a>
            <a href="#" className={classes.link}>
              写真一覧
            </a>
            <a href="#" className={classes.link}>
              コンテスト
            </a>
          </Group>

          <Group visibleFrom="sm" justify="flex-end" >
            <Link to="/">
              <Button
                rightSection={<LoginIcon size={18} />}
                variant="outline"
                color="rgba(59, 59, 59, 1)"
              >
                ログイン
              </Button>
            </Link>
            {/* <Button variant="outline">サインアップ</Button> */}
          </Group>

          {/* <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" /> */}
        </Group>
      </header>
    </Box>
  );
}