"use client";

import { Navbar } from "@/components/navbar";
import { useAppDispatch, useAppSelector } from "@/store";
import { CircularProgress, Link } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { authActions } from "@/store/slice/auth";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: session } = useSession();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [pathname]);

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/signin") {
      router.replace("/signin");
    } else if (isAuthenticated && pathname === "/signin") {
      router.replace("/");
    }
  }, [isAuthenticated, pathname]);

  useEffect(() => {
    if (session) {
      dispatch(authActions.setCredential(session.user));
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="relative flex flex-col h-screen items-center justify-center">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  } else {
    return (
      <div className="relative flex flex-col">
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
          {children}
        </main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://farhanfahrezi.com"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Made by</span>
            <p className="text-primary">Farhan Fahrezi</p>
          </Link>
        </footer>
      </div>
    );
  }
};
