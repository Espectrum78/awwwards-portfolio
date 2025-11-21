import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactSummary = () => {
  const containerRef = useRef(null);

  const items = [
    "Innovation",
    "Creativity",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "Create",
    "Work",
    "Elaborate",
    "Together",
  ];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >
      <Marquee items={items} className="text-[#1A1E26]" />

      <div className="flex items-center justify-center py-10 text-[#1A1E26]">
        <p className="font-light text-center leading-relaxed contact-text-responsive">
          La vida es muy complicada <br />
          como para no <span className="font-normal"></span>
          <br />
          <span className="text-gold font-normal text-x6 block mt-2">
            sonreír
          </span>
        </p>
      </div>

      <Marquee
        items={items2}
        reverse={true}
        className="text-[#1A1E26] bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
