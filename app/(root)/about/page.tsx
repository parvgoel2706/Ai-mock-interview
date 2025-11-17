import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About | Mock2Hire",
  description: "Learn what Mock2Hire does and how it helps you prepare for technical interviews using AI-driven practice and feedback.",
};

// Server component: static informational page
export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10 mt-10 max-w-6xl mx-auto">
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-xl">
          <h2>About Mock2Hire</h2>
          <p className="text-lg leading-relaxed text-light-200">
            Mock2Hire is an AI-powered mock interview platform designed to help you build confidence and improve faster. We simulate real-world interview scenarios across roles, experience levels, and tech stacks—then instantly analyze your responses to deliver structured, actionable feedback.
          </p>
          {/* <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start Practicing</Link>
          </Button> */}
        </div>
        <Image
          src="/robot.png"
          alt="AI assistant"
          width={380}
          height={380}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-100">What You Can Do Here</h3>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li className="rounded-xl border border-white/10 bg-[#171520] p-6 text-base leading-relaxed transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:border-primary-200/40 flex flex-col h-full min-h-[140px]">
            <span className="font-semibold text-primary-200 mb-2">Role-Focused Sessions:</span>
            <p className="text-sm text-light-200">Generate interviews tailored to specific roles (e.g. Frontend, Backend, Full Stack).</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-[#171520] p-6 text-base leading-relaxed transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:border-primary-200/40 flex flex-col h-full min-h-[140px]">
            <span className="font-semibold text-primary-200 mb-2">Adaptive Questioning:</span>
            <p className="text-sm text-light-200">Difficulty and topics adjust based on your previous answers.</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-[#171520] p-6 text-base leading-relaxed transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:border-primary-200/40 flex flex-col h-full min-h-[140px]">
            <span className="font-semibold text-primary-200 mb-2">Instant Feedback:</span>
            <p className="text-sm text-light-200">Get clarity, completeness and improvement suggestions right after answering.</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-[#171520] p-6 text-base leading-relaxed transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:border-primary-200/40 flex flex-col h-full min-h-[140px]">
            <span className="font-semibold text-primary-200 mb-2">Track Progress:</span>
            <p className="text-sm text-light-200">Review past interviews to spot patterns and close skill gaps.</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-[#171520] p-6 text-base leading-relaxed transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:border-primary-200/40 flex flex-col h-full min-h-[140px]">
            <span className="font-semibold text-primary-200 mb-2">Tech Stack Coverage:</span>
            <p className="text-sm text-light-200">Practice across frameworks, languages and system design topics.</p>
          </li>
          <li className="rounded-xl border border-white/10 bg-[#171520] p-6 text-base leading-relaxed transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:border-primary-200/40 flex flex-col h-full min-h-[140px]">
            <span className="font-semibold text-primary-200 mb-2">Confidence Building:</span>
            <p className="text-sm text-light-200">Reduce interview anxiety through structured rehearsal.</p>
          </li>
        </ul>
      </section>

      {/* <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-100">Why It Matters</h3>
        <p className="text-sm leading-relaxed text-light-200 max-w-3xl">
          Interview success depends on repetition, structured feedback and targeted refinement—not just memorizing answers. Mock2Hire accelerates preparation by surfacing what&apos;s missing in your reasoning, helping you communicate more clearly and demonstrate problem-solving patterns hiring teams look for.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-primary-100">Your Data & Privacy</h3>
        <p className="text-sm leading-relaxed text-light-200 max-w-3xl">
          Interview sessions are stored so you can revisit feedback. We don&apos;t sell or share your practice data. Future updates will introduce granular deletion and anonymization controls.
        </p>
      </section> */}

      <section className="flex flex-col gap-4 mb-8 items-center text-center">
        <h3 className="text-2xl font-semibold text-primary-100">Ready to Improve?</h3>
        <p className="text-sm leading-relaxed text-light-200 max-w-2xl">
          Jump into a session now and start turning interview prep into a measurable, confidence-building routine.
        </p>
        <Button asChild className="btn-primary w-fit">
          <Link href="/interview">Start an Interview</Link>
        </Button>
      </section>
    </div>
  );
}
