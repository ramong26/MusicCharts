"use client";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  const [devtools, setDevtools] = useState<React.ReactNode>(null);

  // 토큰 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  // Devtools는 개발환경에서만 import
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@tanstack/react-query-devtools").then((mod) => {
        setDevtools(<mod.ReactQueryDevtools initialIsOpen={false} />);
      });
    }
  }, []);

  return (
    <QueryClientProvider client={client}>
      {children}
      {devtools}
    </QueryClientProvider>
  );
}
