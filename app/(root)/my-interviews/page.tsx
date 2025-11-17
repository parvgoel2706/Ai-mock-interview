import Link from "next/link";

import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";

export const metadata = {
  title: "My Interviews | Mock2Hire",
};

export default async function MyInterviewsPage() {
  const user = await getCurrentUser();
  const userInterviews = await getInterviewsByUserId(user?.id!);

  const hasPastInterviews = userInterviews?.length! > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8">My Interviews</h1>

      <div className="w-full">
        {hasPastInterviews ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {userInterviews?.map((interview) => (
              <div key={interview.id} className="h-full">
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full min-h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <p className="text-lg text-muted-foreground">You haven't taken any interviews yet.</p>
                  <Button asChild>
                    <Link href="/interview">Start an Interview</Link>
                  </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
