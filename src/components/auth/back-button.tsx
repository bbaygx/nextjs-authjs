import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant="link" size="sm" asChild className="w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
