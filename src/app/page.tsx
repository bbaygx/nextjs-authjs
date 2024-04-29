import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <h3 className="text-3xl font-semibold">Auth JS</h3>
      <div className="flex gap-4">
        <LoginButton>
          <Button>Sign in</Button>
        </LoginButton>
      </div>
      <p>Auth JS with prisma database</p>
    </main>
  );
}
