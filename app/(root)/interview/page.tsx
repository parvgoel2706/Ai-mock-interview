import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    // If for some reason user is not available, redirect to sign-in
    redirect("/sign-in");
  }

  return (
    <>
      <h3 className="interview-heading">Interview generation</h3>

      <Agent userName={user!.name} userId={user!.id} type="generate" />
    </>
  );
};

export default Page;
