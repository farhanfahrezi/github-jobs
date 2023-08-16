"use client";

import { GithubIcon, GoogleLogoIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <>
      <div className="flex flex-col max-w-lg text-center justify-center items-center">
        <GithubIcon size={128} />
        <br />
        <h1 className={title({ color: "violet" })}>
          GitHub <span className="font-normal">Jobs</span>
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Empowering Your Tech Journey: Navigating Limitless Horizons and
          Unveiling New Avenues for Career Advancement with Our Platform
        </h2>
        <br />
      </div>

      <div className="flex justify-center items-center gap-3">
        <Button
          size="lg"
          className="font-normal text-default-600 bg-default-100"
          startContent={<GoogleLogoIcon height={24} className="text-danger" />}
          variant="faded"
          onPress={() => signIn("google")}
        >
          Sign In
        </Button>
      </div>
    </>
  );
}
