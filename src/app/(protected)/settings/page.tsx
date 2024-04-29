import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Setting() {
  const session = await auth();
  return (
    <div>
      Setting: {JSON.stringify(session)}
      <form
        className="py-12"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}
