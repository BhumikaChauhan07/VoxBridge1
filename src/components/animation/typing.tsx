import { TypeAnimation } from "react-type-animation";

export default function Typing() {
  return (
    <TypeAnimation
      cursor={true}
      sequence={["VoxBridge", 3000, "वॉक्सब्रिज", 3000, "ボクスブリッジ", 3000]}
      wrapper="h2"
      className="gradient-text text-3xl font-semibold sm:text-3xl lg:text-3xl xl:text-5xl 2xl:text-6xl"
      repeat={Infinity}
    />
  );
}
