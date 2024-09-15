import { createTheme } from "@mui/material/styles";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Router, Navigation, Session } from "@toolpad/core";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../infrastructure/authContext";
import React, { useMemo, useState } from "react";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    pattern: "",
    title: "Servicios",
    icon: <RoomServiceIcon />,
  },
  {
    segment: "dashboard/reservas",
    pattern: "/dashboard/reservas",
    title: "Reservas",
    icon: <MenuBookIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface DemoProps {
  window?: () => Window;
  children?: React.ReactNode;
}

export default function DashboardLayoutBasic(props: DemoProps) {

  const { user, logout } = useAuth();
  const { dataUser } = user;
  const { window, children } = props;
  const [session, setSession] = useState<Session | null>({
    user: {
      name: dataUser.nombre,
      email: dataUser.email,
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const [pathname, setPathname] = useState(document.location.pathname);

  const navigations = useNavigate()
  const router = useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        
        setPathname(String(`${path}`));
        return navigations(String(`${path}`));
      },
    };
  }, [pathname]);

  const authentication = useMemo(() => {
    return {
      signOut: () =>{
        navigations('/')
        logout()
      },
    };
  }, []);

  const demoWindow = window !== undefined ? window() : undefined;
  return (
    <AppProvider
      navigation={NAVIGATION}
      session={session}
      authentication={authentication}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: "",
        title: "DashBoard Aministrador",
      }}
    >
      <DashboardLayout>
        <Box sx={{ p: 3 }}>{children}</Box>
      </DashboardLayout>
    </AppProvider>
  );
}
