"use client";

import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

// SVG icons for social media
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#1D3557"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#1D3557"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#1D3557"
  >
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
  </svg>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [userType, setUserType] = useState("creator");
  const observerRefs = useRef([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const HeroSection = () => (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#1D3557] sm:text-6xl mb-4">
          OpenShelf
        </h1>
        <h2 className="text-3xl font-semibold tracking-tight text-[#457B9D] sm:text-4xl">
          Pay for What You Use, Stake and Earn on What You Love
        </h2>
        <p className="mt-6 text-lg leading-8 text-[#1D3557]">
          Revolutionize your content experience. Support creators directly.
          Maximize your earnings.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-[#E63946] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c81d2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
          >
            Join OpenShelf
          </a>
          {/* <a
            href="#"
            className="text-sm font-semibold leading-6 text-[#457B9D] hover:text-[#1D3557]"
          >
            Learn more <span aria-hidden="true">→</span>
          </a> */}
        </div>
        <ContactSection />
      </div>
    </div>
  );

  const FeaturesSection = () => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-[#A8DADC] px-6 py-12 shadow-2xl sm:rounded-3xl sm:px-16 md:py-16 lg:px-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#E63946]">
            Smart Consumption
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#1D3557] sm:text-4xl">
            Tailored Content, Fair Pricing, Real Earnings
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {[
              {
                name: "Precision Pricing",
                description:
                  "Pay per chapter for books, per minute for music, videos, and games. Only pay for what you truly enjoy.",
              },
              {
                name: "Stake on Potential",
                description:
                  "Invest in content you believe in. Reap rewards as it gains popularity across all media types.",
              },
              {
                name: "Empower Creators",
                description:
                  "Directly support emerging talent. Help your favorite authors, musicians, filmmakers, and game developers thrive.",
              },
              {
                name: "Earn Through Engagement",
                description:
                  "Transform your media instincts into tangible rewards. Profit from discovering the next big hit.",
              },
            ].map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[#1D3557]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E63946]">
                    <ChevronRightIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-[#457B9D]">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );

  const UserJourneySection = () => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-[#A8DADC] px-6 py-12 shadow-2xl sm:rounded-3xl sm:px-16 md:py-16 lg:px-24">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1D3557]">
          Your Journey with OpenShelf
        </h2>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                userType === "creator"
                  ? "bg-[#E63946] text-white"
                  : "bg-white text-[#1D3557] hover:bg-gray-100"
              }`}
              onClick={() => setUserType("creator")}
            >
              I&apos;m a Creator
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                userType === "consumer"
                  ? "bg-[#E63946] text-white"
                  : "bg-white text-[#1D3557] hover:bg-gray-100"
              }`}
              onClick={() => setUserType("consumer")}
            >
              I&apos;m a Consumer
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#1D3557]">
            {userType === "creator"
              ? "Creator's Journey"
              : "Consumer's Journey"}
          </h3>
          <ul className="space-y-4">
            {userType === "creator" ? (
              <>
                <li className="flex items-start">
                  <ChevronRightIcon className="h-6 w-6 text-[#E63946] mr-2 flex-shrink-0" />
                  <span className="text-[#457B9D]">
                    Instant Payments: Receive earnings directly in seconds after
                    each sale.
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="h-6 w-6 text-[#E63946] mr-2 flex-shrink-0" />
                  <span className="text-[#457B9D]">
                    Honest Reviews: Staking system ensures genuine feedback from
                    invested consumers.
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="h-6 w-6 text-[#E63946] mr-2 flex-shrink-0" />
                  <span className="text-[#457B9D]">
                    Fair Compensation: Earn more with our transparent revenue
                    sharing model.
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="h-6 w-6 text-[#E63946] mr-2 flex-shrink-0" />
                  <span className="text-[#457B9D]">
                    Engage Directly: Build a community of supporters who are
                    invested in your success.
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start">
                  <ChevronRightIcon className="h-6 w-6 text-[#E63946] mr-2 flex-shrink-0" />
                  <span className="text-[#457B9D]">
                    Pay-Per-Use: Only pay for the content you actually consume,
                    saving costs.
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="h-6 w-6 text-[#E63946] mr-2 flex-shrink-0" />
                  <span className="text-[#457B9D]">
                    Passive Income: Earn rewards by staking on content you
                    believe will be successful.
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="h-6 w-6 text-[#E63946] mr-2 flex-shrink-0" />
                  <span className="text-[#457B9D]">
                    Discover Gems: Support emerging creators and benefit from
                    their success.
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="h-6 w-6 text-[#E63946] mr-2 flex-shrink-0" />
                  <span className="text-[#457B9D]">
                    Flexible Consumption: Enjoy books by chapter, music by
                    track, videos and games by playtime.
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );

  const CTASection = () => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-[#A8DADC] px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-[#1D3557] sm:text-4xl">
            Be a Pioneer.
            <br />
            Join OpenShelf today.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#457B9D]">
            Experience the future of content consumption. Support creators, earn
            rewards, and enjoy media on your terms.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a
              href="#"
              className="rounded-md bg-[#E63946] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c81d2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
            >
              Join the Waitlist
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#1D3557] hover:text-[#457B9D]"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8">
          {/* <Image
            className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            src="/hero-image.jpg"
            alt="OpenShelf preview"
            width={1824}
            height={1080}
          /> */}
        </div>
      </div>
    </div>
  );

  const ContactSection = () => (
    <div className="bg-[#F1FAEE] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          <a
            href="https://x.com/openshelf_xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1D3557] hover:text-[#457B9D]"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/open-shelf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1D3557] hover:text-[#457B9D]"
          >
            <GithubIcon />
          </a>
          <a
            href="mailto:contact@openshelf.xyz"
            className="text-[#1D3557] hover:text-[#457B9D]"
          >
            <EmailIcon />
          </a>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: "hero", content: <HeroSection /> },
    { id: "features", content: <FeaturesSection /> },
    { id: "user-journey", content: <UserJourneySection /> },
    { id: "cta", content: <CTASection /> },
  ];

  return (
    <div className="bg-[#F1FAEE]">
      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-snap {
            scroll-snap-type: y mandatory;
            overflow-y: auto;
            height: 100vh;
          }
          .desktop-snap > section {
            scroll-snap-align: start;
            min-height: 100vh;
            display: flex;
            align-items: center;
          }
        }
        @media (max-width: 767px) {
          .desktop-snap {
            overflow-y: auto;
          }
          .desktop-snap > section {
            min-height: auto;
            padding: 2rem 0;
          }
        }
      `}</style>
      <div className="desktop-snap">
        <section>
          <HeroSection />
        </section>
        <section>
          <FeaturesSection />
        </section>
        <section>
          <UserJourneySection />
        </section>
        <section>
          <CTASection />
        </section>
      </div>
    </div>
  );
}
