"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/actions/auth.action";

const Navbar = ({ user }: { user?: User | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/my-interviews", label: "My Interviews" },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (e) {
      // noop
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#171532]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Mock2Hire Logo" width={38} height={32} />
          <h2 className="text-primary-100 font-semibold">Mock2Hire</h2>
        </Link>

        {/* Right side: nav links, profile + mobile menu */}
        <div className="flex items-center gap-6">
          {/* Desktop links moved to the right */}
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button
                  key={link.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "transition-all",
                    isActive
                      ? "bg-primary-200 text-dark-100 hover:bg-primary-200/80"
                      : "text-light-100 hover:text-primary-100 hover:bg-dark-200/50"
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-light-100 hover:bg-dark-200/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Profile Avatar (when logged in) */}
          {user && (
            <div className="relative">
              <button
                aria-label="User menu"
                onClick={() => setProfileOpen((v) => !v)}
                className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/10 hover:ring-primary-200/60 focus:outline-none"
              >
                <Image
                  src="/user.png"
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-cover"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md border border-white/10 bg-[#1d1a3f] shadow-lg">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-primary-100 truncate">{user.name}</p>
                  </div>
                  <div className="p-2">
                    <Button
                      onClick={handleLogout}
                      className="w-full justify-start bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="sm:hidden px-4 pb-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2 rounded-md text-light-100",
                    isActive ? "bg-primary-200 text-dark-100" : "hover:bg-dark-200/30"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
