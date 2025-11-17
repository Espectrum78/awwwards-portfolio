import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 10,
      scrollTrigger: {
        target: "#title-service-1",
        scrub: true,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        target: "#title-service-2",
        scrub: true,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 50,
      scrollTrigger: {
        target: "#title-service-3",
        scrub: true,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -40,
      scrollTrigger: {
        target: "#title-service-4",
        scrub: true,
      },
    });
  });

  return (
    <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">

      {/* 1 */}
      <div id="title-service-1" className="flex items-center justify-center gap-3">
        <img src="images\ClipStudioPaint.webp" className="w-70 h-70 object-contain" />
        <p></p>
      </div>

      {/* 2 */}
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3 translate-x-16"
      >
        <div className="flex items-center gap-3">
          <img src="images\Autodesk_Maya_logo.svg.png" className="w-70 h-70 object-contain" />
          <p className="font-normal"></p>
        </div>

        <div className="w-10 h-1 md:w-32 bg-gold" />

        <div className="flex items-center gap-3">
          <img src="images\Logo_Blender.svg.png" className="w-70 h-70 object-contain" />
          <p></p>
        </div>
      </div>

      {/* 3 */}
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3 -translate-x-48"
      >
        <div className="flex items-center gap-3">
          <img src="images\Premiere-pro-logo-1.png" className="w-60 h-60 object-contain" />
          <p></p>
        </div>

        <div className="w-10 h-1 md:w-32 bg-gold" />

        <div className="flex items-center gap-3">
          <img src="\images\Licencia-Adobe-Ilustrator-por-1-ano.webp" className="w-60 h-60 object-contain" />
          <p className="italic"></p>
        </div>

        <div className="w-50 h-1 md:w-32 bg-gold" />

        <div className="flex items-center gap-3">
          <img src="\images\Adobe-Photoshop-logo.webp" className="w-70 h-70 object-contain" />
          <p></p>
        </div>
      </div>

      {/* 4 */}
      <div id="title-service-4" className="flex items-center justify-center gap-3 translate-x-48">
        <img src="images\2bec7ed63e91fe174ca668e92b8d46f0.png" className="w-70 h-70 object-contain" />
        <p></p>
      </div>

    </section>
  );
};

export default ServiceSummary;
