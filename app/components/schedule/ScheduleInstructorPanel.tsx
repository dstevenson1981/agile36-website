"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { ScheduleInstructorProfile } from "@/app/lib/schedule-instructors";

type Props = {
  profile: ScheduleInstructorProfile;
};

type PanelTab = "profile" | "testimonials";

/** Expanded trainer panel with tabs (profile + testimonials) for schedule Learn More. */
export default function ScheduleInstructorPanel({ profile }: Props) {
  const [activeTab, setActiveTab] = useState<PanelTab>("profile");

  return (
    <div className="border-t border-gray-200 bg-[#fafbfc] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
      {/* Tabs — mockup-style pills, Agile36 navy active state */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Instructor details">
        <TabButton
          id="instructor-tab-profile"
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
          controls="instructor-panel-profile"
        >
          Trainer profile
        </TabButton>
        <TabButton
          id="instructor-tab-testimonials"
          active={activeTab === "testimonials"}
          onClick={() => setActiveTab("testimonials")}
          controls="instructor-panel-testimonials"
        >
          Testimonials
        </TabButton>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-7">
        {activeTab === "profile" ? (
          <div
            id="instructor-panel-profile"
            role="tabpanel"
            aria-labelledby="instructor-tab-profile"
            className="flex flex-col gap-6 sm:flex-row sm:gap-8 lg:gap-10"
          >
            {/* Left — photo, name, title */}
            <div className="flex shrink-0 flex-col items-center text-center sm:w-[180px] lg:w-[200px]">
              <Image
                src={profile.image}
                alt={profile.name}
                width={160}
                height={160}
                className="h-[120px] w-[120px] rounded-full border border-gray-200 object-cover object-top shadow-sm sm:h-[140px] sm:w-[140px] lg:h-[160px] lg:w-[160px]"
              />
              <h4 className="mt-4 text-base font-bold leading-snug text-[#01203d] sm:text-lg">
                {profile.name}
              </h4>
              <p className="mt-1.5 text-sm leading-snug text-gray-500">{profile.title}</p>
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a66c2] transition-colors hover:text-[#004182] hover:underline"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>

            {/* Right — bio + clients */}
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Trainer Bio
              </p>
              <div className="mt-2.5 space-y-3">
                {profile.bio.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>

              {profile.clients.length > 0 && (
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Clients Worked With
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2.5 sm:gap-3">
                    {profile.clients.map((client) => (
                      <li
                        key={client.name}
                        className="flex h-12 w-[calc(50%-5px)] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:h-14 sm:w-[110px] lg:w-[120px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-h-7 w-auto max-w-full object-contain sm:max-h-8"
                          loading="lazy"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            id="instructor-panel-testimonials"
            role="tabpanel"
            aria-labelledby="instructor-tab-testimonials"
            className="space-y-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Student Reviews
            </p>
            <ul className="grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
              {profile.testimonials.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-col rounded-xl border border-gray-200 bg-[#fafbfc] p-4 sm:p-5"
                >
                  <div className="mb-3 flex items-center gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-gray-600">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-gray-200 pt-3">
                    <p className="text-sm font-semibold text-[#01203d]">{item.name}</p>
                    {item.role && <p className="mt-0.5 text-xs text-gray-500">{item.role}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  id,
  active,
  onClick,
  controls,
  children,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  controls: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      id={id}
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      className={
        active
          ? "rounded-lg bg-[#01203d] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors"
          : "rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
      }
    >
      {children}
    </button>
  );
}
