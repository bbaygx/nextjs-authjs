"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface Provider {
  provider: string;
}

interface SocialProviderTypes extends Provider {
  icon: JSX.Element;
}

const SocialProvider: SocialProviderTypes[] = [
  {
    provider: "google",
    icon: <FcGoogle className="h-5 w-5" />,
  },
  {
    provider: "github",
    icon: <FaGithub className="h-5 w-5" />,
  },
];

export const Social = () => {
  const onClick = (provider: Provider["provider"]) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex space-x-4 p-3 items-center">
      {SocialProvider.map((social, i) => (
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          key={i}
          onClick={() => onClick(social.provider)}
        >
          {social.icon}
        </Button>
      ))}
    </div>
  );
};
