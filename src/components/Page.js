import {
  AppShell,
  Box,
  Drawer,
  Group,
  Header,
  useMantineColorScheme,
} from "@mantine/core";
import Navbar from "components/Navbar";
import ActionIcon from "components/ActionIcon";
import dims from "data/dims";
import colorSchemes from "data/colorSchemes";
import project from "data/project";
import { useMediaQuery } from "@mantine/hooks";
import useBoolean from "hooks/useBoolean";
import { IconMenu } from "@tabler/icons-react";

export default function Page({ sideNav, topNav, logo, children }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [drawerOpen, { on: openDrawer, off: closeDrawer }] = useBoolean(false);
  const hideNavbar = useMediaQuery(
    `(max-width: ${Math.floor(dims.navbarWidth * 2.5)}px)`
  );

  return (
    <AppShell
      padding={dims.appPadding}
      navbar={!hideNavbar && <Navbar>{sideNav}</Navbar>}
      header={
        <Header height={dims.headerHeight}>
          <Group
            sx={{ height: "100%" }}
            px={dims.headerPadding}
            position="apart"
          >
            <Group>
              {hideNavbar && (
                <ActionIcon icon={IconMenu} onClick={openDrawer} />
              )}
              <span>{logo}</span>
              <span>{project.name}</span>
            </Group>
            <Group>
              {topNav}
              <ActionIcon
                onClick={() => toggleColorScheme()}
                icon={
                  colorScheme === colorSchemes.dark.name
                    ? colorSchemes.light.icon
                    : colorSchemes.dark.icon
                }
              />
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === colorSchemes.dark.name
              ? colorSchemes.dark.backgroundColor(theme)
              : colorSchemes.light.backgroundColor(theme),
          paddingLeft: hideNavbar ? "1em" : undefined,
        },
      })}
    >
      <Box pr={dims.appPaddingInner}>{children}</Box>
      {hideNavbar && (
        <Drawer
          opened={drawerOpen}
          onClose={closeDrawer}
          size={dims.navbarWidth}
          title={
            <Group>
              <span>{logo}</span>
              <span>{project.name}</span>
            </Group>
          }
        >
          <Navbar>{sideNav}</Navbar>
        </Drawer>
      )}
    </AppShell>
  );
}
