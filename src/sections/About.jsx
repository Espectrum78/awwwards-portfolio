import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = ``;

  const aboutText = `Diseñador digital enfocado en el desarrollo de Videojuegos, la programación, concept art e ilustraciones. 
  Me destaco por mi capacidad de adaptación, organización y habilidades en relaciones públicas.

  Tengo un enfoque estratégico sobre explorar nuevas formas creativas 
  que conecten con los usuarios y generen impacto a través de experiencias digitales.`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-[#1A1E26] rounded-b-4xl pb-24">
      
      {/* HEADER */}
      <AnimatedHeaderSection
        subTitle={"Conoce más sobre mí"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {/* CONTENIDO */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 px-10 lg:px-24">

        {/* IMAGEN */}
        <img
          ref={imgRef}
          src="/images/TomásFoto.jpeg"
          alt="profile"
          className="w-[320px] lg:w-[420px] rounded-3xl object-cover shadow-lg"
        />

        {/* TEXTO */}
        <div className="max-w-2xl text-white/70 leading-relaxed tracking-wide text-lg md:text-xl lg:text-2xl">
          <AnimatedTextLines text={aboutText} />
        </div>

      </div>
    </section>
  );
};

export default About;
