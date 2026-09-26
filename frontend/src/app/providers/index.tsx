"use client";

import { MUIProvider } from "./mui-provider";
import { ReduxProvider } from "./redux-provider";
import SnackbarProviderWrapper from "./snackbar";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MUIProvider>
      <SnackbarProviderWrapper>
        <ReduxProvider>{children}</ReduxProvider>
      </SnackbarProviderWrapper>
    </MUIProvider>
  );
}
