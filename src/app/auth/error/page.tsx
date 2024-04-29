import Link from "next/link";
import React from "react";

export default function Error() {
  return (
    <div className="flex flex-col justify-center">
      <h3>Something When Wrong!</h3>
      <Link href="/auth/login">Back to Sign ib</Link>
    </div>
  );
}
