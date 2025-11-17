import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  const testimonials = [
    { 
      text: "This platform helped me land my dream job. The AI feedback was incredibly detailed and helped me identify gaps I didn't even know I had.", 
      name: "Asha Kumar", 
      role: "Frontend Engineer",
      company: "Google"
    },
    { 
      text: "The mock interviews are realistic and the suggestions are actionable. I went from nervous to confident in just 2 weeks of practice.", 
      name: "Rohan Sharma", 
      role: "Backend Developer",
      company: "Amazon"
    },
    { 
      text: "I improved my communication and system design thinking within weeks. The instant feedback loop is a game-changer for interview prep.", 
      name: "Priya Patel", 
      role: "Full-Stack Developer",
      company: "Microsoft"
    },
    { 
      text: "Great for practicing under pressure and getting honest feedback. The AI asks follow-up questions just like a real interviewer would.", 
      name: "Omar Hassan", 
      role: "SDE II",
      company: "Meta"
    },
  ];

  return (
    <>
    <div className="max-w-7xl mx-auto px-6 space-y-16 py-20">
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg justify-center">
          <h2 className="sm:text-left text-center mb-2 text-4xl font-extrabold leading-tight">Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg text-light-200 sm:text-left text-center mb-4">
            Practice real interview questions & get instant feedback
          </p>

          <div className="sm:flex sm:justify-start flex justify-center">
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">Start an Interview</Link>
            </Button>
          </div>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* `Your Interviews` moved to a separate page at /my-interviews */}

      <section className="flex flex-col gap-6 ">
        <h2 className="text-center mb-6 text-5xl mt-50">How It Works</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Choose role & stack",
              desc: "Select your target role and tech stack to tailor questions to real-world expectations.",
              color: "bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30"
            },
            {
              title: "Receive curated questions",
              desc: "Get a curated sequence of conceptual, practical and system-design prompts.",
              color: "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30"
            },
            {
              title: "Answer in real time",
              desc: "Respond live — AI evaluates clarity, structure, and correctness.",
              color: "bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30"
            },
            {
              title: "Get instant feedback",
              desc: "Receive structured suggestions, follow-ups and improvement pointers.",
              color: "bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30"
            },
            {
              title: "Iterate & improve",
              desc: "Review session history to identify gaps and track progress.",
              color: "bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-500/30"
            },
          ].map((step, i) => (
            <Card key={i} className={`group ${step.color} hover:scale-105 transition-transform duration-200`}>
              <div className="flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-200 text-dark-100 font-bold text-lg shrink-0">{i + 1}</div>
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription className="text-sm">{step.desc}</CardDescription>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-center mb-6 text-5xl mt-10">Take Interviews</h2>

        <div className="w-full">
          {hasUpcomingInterviews ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
              {allInterview?.map((interview) => (
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
            <p>There are no interviews available</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-center mb-6 text-5xl mt-10">What Our Users Say</h2>

        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-100 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-100 to-transparent z-10" />
          
          <div
            className="flex items-stretch gap-6"
            style={{ width: 'max-content', animation: 'scroll 40s linear infinite' }}
          >
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="testimonial-card flex flex-col justify-between min-w-[350px] max-w-[380px] rounded-xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm p-6 shadow-lg hover:shadow-xl hover:border-primary-200/50 transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <svg className="absolute -top-2 -left-2 w-8 h-8 text-primary-200/30" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.157-.672 4.243-1.757L12 20.485c-2.21 0-4-1.79-4-4s1.79-4 4-4c.71 0 1.369.186 1.944.51L16 9.757C14.761 8.648 12.479 8 10 8zm12 0c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.157-.672 4.243-1.757L24 20.485c-2.21 0-4-1.79-4-4s1.79-4 4-4c.71 0 1.369.186 1.944.51L28 9.757C26.761 8.648 24.479 8 22 8z" />
                    </svg>
                    <p className="text-sm leading-relaxed text-light-200 pl-6 whitespace-normal">{t.text}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-200 to-primary-100 text-dark-100 font-bold text-sm shrink-0">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-light-100">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.role} at {t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .testimonial-card { flex: 0 0 auto; }
          `}</style>
        </div>
      </section>
    </div>

    <footer className="mt-16 border-t border-white/10 bg-dark-200/50 relative left-1/2 -translate-x-1/2 w-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-primary-200 mb-4">Mock2Hire</h3>
            <p className="text-sm text-light-200 leading-relaxed max-w-md">
              AI-powered mock interview platform designed to help you build confidence and ace your technical interviews with instant, actionable feedback.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-light-100 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/interview" className="text-muted-foreground hover:text-primary-200 transition-colors">
                  Start Interview
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-muted-foreground hover:text-primary-200 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-light-100 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary-200 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mock2Hire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary-200 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary-200 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary-200 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Home;
