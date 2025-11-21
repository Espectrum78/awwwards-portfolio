import { Canvas } from "@react-three/fiber";
import RingModel from "../components/RingModel";
import { Environment, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  const text = `Diseñador Digital y Desarrollador de videojuegos
  especializado en programacion y concept art.`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Portafolio"}
        title={"Tomás Acuña Garzón"}
        text={text}
        textColor={"text-[#1A1E26]"}
      />

      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* TU CANVAS REAL — limpio, sin texto basura */}
        <Canvas
          shadows
          gl={{ antialias: true }}
          camera={{ position: [0, 0, -10], fov: 17.5 }}
        >
          {/* Luz para sombras fuertes */}
          <directionalLight
            castShadow
            position={[5, 10, 5]}
            intensity={1.2}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          <ambientLight intensity={0.5} />

          {/* Tu anillo 3D */}
          <RingModel scale={0.1} innerImage="/images/inner.png" />
          position={[2, 0, 0]}   

          {/* Ambiente HDRI */}
          <Environment preset="sunset" background={false} />
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
