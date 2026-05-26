import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import CountdownSection from "@/components/sections/CountdownSection";
import DailyWhisperSection from "@/components/sections/DailyWhisperSection";
import HeroSection from "@/components/sections/HeroSection";
import LetterSection from "@/components/sections/LetterSection";
import ReasonsSection from "@/components/sections/ReasonsSection";
import StorySection from "@/components/sections/StorySection";

export default function Home() {
  return (
    <div className="page-shell flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <HeroSection />
        <CountdownSection />
        <StorySection />
        <ReasonsSection />
        <LetterSection />
        <DailyWhisperSection />
      </main>
      <Footer />
    </div>
  );
}
