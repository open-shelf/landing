"use client";

import Image from "next/image";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";

// SVG icons for social media
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="fill-foreground"
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
    className="fill-foreground"
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
    className="fill-foreground"
  >
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
  </svg>
);

// Add this new component after the existing icon components
const ScrollIndicator = ({ onClick }) => (
  <div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
    onClick={onClick}
  >
    <ChevronDownIcon className="h-8 w-8 text-foreground" />
  </div>
);

// Replace the empty trustedBy component with this implementation
const TrustedBy = () => (
  <div className="bg-card py-10 mt-4 rounded-lg shadow-sm max-w-2xl mx-auto">
    <h2 className="text-center text-lg font-semibold leading-8 text-foreground mb-2">
      Trusted By
    </h2>
    <div className="px-6 lg:px-8">
      <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 items-center gap-x-12 gap-y-10">
        {/* Solana Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/vectors/solana.png"
            alt="Solana"
            width={160}
            height={32}
            className="object-contain h-10 mb-3"
          />
          <span className="text-base text-muted-foreground font-medium">
            Solana
          </span>
        </div>
        {/* Aachen Blockchain Club Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/vectors/ABC.black.png"
            alt="Aachen Blockchain Club"
            width={160}
            height={32}
            className="object-contain h-10 mb-3 invert"
          />
          <span className="text-base text-muted-foreground font-medium">
            Aachen Blockchain Club
          </span>
        </div>
        {/* Superteam DE Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/vectors/superteam-de.jpg"
            alt="Superteam DE"
            width={160}
            height={32}
            className="object-contain h-10 mb-3"
          />
          <span className="text-base text-muted-foreground font-medium">
            Superteam DE
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [userType, setUserType] = useState("creator");
  const observerRefs = useRef([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

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

    // Add this new effect for hiding the scroll indicator
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToNextSection = (currentIndex) => {
    const nextSection = observerRefs.current[currentIndex + 1];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const HeroSection = () => (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
          OpenShelf
        </h1>
        <h2 className="text-3xl font-semibold tracking-tight text-muted-foreground sm:text-4xl">
          Pay for What You Use, Stake and Earn on What You Love
        </h2>
        <p className="mt-6 text-lg leading-8 text-foreground">
          Revolutionize your content experience. Support creators directly. Make
          money doing so.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScAQVUuILaZmuXOx4nQ0v58Y9am9f2gkkiLtMcZ34OIwGsN8g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="golden-button rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm"
          >
            Join OpenShelf
          </a>
        </div>
        <ContactSection />
        <TrustedBy />
      </div>
    </div>
  );

  const FeaturesSection = () => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-card px-6 py-12 shadow-2xl sm:rounded-3xl sm:px-16 md:py-16 lg:px-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Smart Consumption
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Discover, Consume, Invest:
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A New Media Paradigm
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {[
              {
                name: "Precision Pricing",
                description:
                  "Pay per chapter for books, per minute for music, videos, and games. Only pay for what you truly enjoy.",
                icon: "/vectors/price.png",
              },
              {
                name: "Stake on Potential",
                description:
                  "Invest in content you believe in. Reap rewards as it gains popularity across all media types.",
                icon: "/vectors/stake.png",
              },
              {
                name: "Empower Creators",
                description:
                  "Directly support emerging talent. Help your favorite authors, musicians, filmmakers, and game developers thrive.",
                icon: "/vectors/popular.png",
              },
              {
                name: "Earn Through Engagement",
                description:
                  "Transform your media instincts into tangible rewards. Profit from discovering the next big hit.",
                icon: "/vectors/engagement.png",
              },
            ].map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[#1D3557]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E63946]">
                    <Image
                      src={feature.icon}
                      alt={feature.name}
                      width={24}
                      height={24}
                      className="filter brightness-0 invert" // This will make the icon white
                      style={{ transform: "scale(1.2)" }}
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

  const UserJourneySection = () => {
    const [userType, setUserType] = useState("creator");
    const [action, setAction] = useState({
      main: "write a book",
      sub: "earn as it sells",
    });
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
      const actions =
        userType === "creator"
          ? [
              { main: "write a book", sub: "earn per sale" },
              { main: "compose music", sub: "profit per stream" },
              { main: "develop a game", sub: "gain per play" },
              { main: "create a video", sub: "monetize views" },
            ]
          : [
              { main: "read books", sub: "stake on potential" },
              { main: "listen to music", sub: "earn from hits" },
              { main: "play games", sub: "profit from trends" },
              { main: "watch videos", sub: "gain from virals" },
            ];

      let index = 0;

      const intervalId = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          index = (index + 1) % actions.length;
          setAction(actions[index]);
          setIsTransitioning(false);
        }, 500); // Half of the interval for smooth transition
      }, 2500);

      return () => clearInterval(intervalId);
    }, [userType]);

    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-card px-6 py-12 shadow-2xl sm:rounded-3xl sm:px-16 md:py-16 lg:px-24">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Your Journey with OpenShelf
          </h2>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  userType === "creator"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
                onClick={() => setUserType("creator")}
              >
                I am a Creator
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  userType === "consumer"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
                onClick={() => setUserType("consumer")}
              >
                I am a Consumer
              </button>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-center mb-6 text-[#1D3557] min-h-16 flex items-center justify-center flex-wrap">
            <span className="mr-2">You</span>
            <div
              className="relative inline-block"
              style={{ width: "200px", height: "1.5em", overflow: "visible" }}
            >
              <span
                className={`absolute left-0 w-full text-center transition-all duration-500 ease-in-out ${
                  isTransitioning
                    ? "opacity-0 transform -translate-y-2"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                <span className="text-primary whitespace-nowrap">
                  {action.main}
                </span>
              </span>
            </div>
            <span className="mx-2">and</span>
            <div
              className="relative inline-block"
              style={{
                width: "200px",
                minHeight: "1.5em",
                overflow: "visible",
              }}
            >
              <span
                className={`absolute left-0 w-full text-center transition-all duration-500 ease-in-out ${
                  isTransitioning
                    ? "opacity-0 transform translate-y-2"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                <span className="text-muted-foreground inline-block">
                  {action.sub}
                </span>
              </span>
            </div>
          </h3>

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
                    <ChevronRightIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Instant Payments: Receive earnings immediately after each
                      sale or engagement.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRightIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Fair Compensation: Benefit from our transparent revenue
                      sharing model.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRightIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Community Building: Engage with supporters invested in
                      your success.
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start">
                    <ChevronRightIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Pay-Per-Use: Only pay for the content you actually
                      consume.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRightIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Stake & Earn: Support promising content and profit from
                      its success.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRightIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Flexible Consumption: Enjoy content by chapter, track, or
                      playtime.
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const CTASection = () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-card px-4 py-8 shadow-2xl sm:rounded-3xl sm:px-16 md:py-16 lg:flex lg:gap-x-20 lg:px-24 lg:py-0">
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Be a Pioneer.
            <br />
            Join OpenShelf today.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Experience the future of content consumption. Support creators, earn
            rewards, and enjoy media on your terms.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6 lg:justify-start">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScAQVUuILaZmuXOx4nQ0v58Y9am9f2gkkiLtMcZ34OIwGsN8g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full sm:w-auto"
            >
              Join the Waitlist
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-foreground hover:text-accent"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactSection = () => (
    <div className="py-6">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-center gap-8">
          <a
            href="https://x.com/openshelf_xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/open-shelf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
          >
            <GithubIcon />
          </a>
          <a
            href="mailto:contact@openshelf.xyz"
            className="text-foreground hover:text-accent transition-colors"
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
    <div className="bg-transparent">
      <AnimatedBackground />
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
        <section
          ref={(el) => (observerRefs.current[0] = el)}
          className="relative"
        >
          <HeroSection />
          {showScrollIndicator && (
            <ScrollIndicator onClick={() => scrollToNextSection(0)} />
          )}
        </section>
        <section
          ref={(el) => (observerRefs.current[1] = el)}
          className="relative"
        >
          <FeaturesSection />
          {showScrollIndicator && (
            <ScrollIndicator onClick={() => scrollToNextSection(1)} />
          )}
        </section>
        <section
          ref={(el) => (observerRefs.current[2] = el)}
          className="relative"
        >
          <UserJourneySection />
          {showScrollIndicator && (
            <ScrollIndicator onClick={() => scrollToNextSection(2)} />
          )}
        </section>
        <section ref={(el) => (observerRefs.current[3] = el)}>
          <CTASection />
        </section>
      </div>
    </div>
  );
}
