"use client"

import type React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#e3f2fd",
      100: "#bbdefb",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
    dashboard: {
      background: "#0a1929",
      header: "#0f2132",
      border: "#1e3a5f",
    },
  },
  styles: {
    global: {
      // We'll let Tailwind handle these base styles
      body: {
        // These styles will be overridden by Tailwind
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
