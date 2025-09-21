"use client";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

// Data for your three cards. You can easily change the title, description, and image here.
const cardData = [
  {
    title: "Project Alpha",
    description: "An interactive canvas showcasing generative art with a swirl distortion effect.",
    imageSrc: "https://assets.aceternity.com/manu-red.png",
  },
  {
    title: "Project Beta",
    description: "Explore pixelated transformations with dynamic jitter and tint effects.",
    imageSrc: "https://assets.aceternity.com/manu-purple.png",
  },
  {
    title: "Project Gamma",
    description: "A unique visual experience that reacts to your cursor movement in real-time.",
    imageSrc: "https://assets.aceternity.com/manu-green.png",
  },
];

export default function CardsPage() {
  return (
    <main className="bg-black text-white w-full min-h-screen p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Our Projects
        </h1>
        <p className="text-neutral-400 text-center mb-12">
          Interact with the canvases below to see the effect.
        </p>

        {/* This div arranges the cards. It's a column on mobile and a row on larger screens. */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 lg:gap-12">
          {/* We map over the cardData array to create each card */}
          {cardData.map((card, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-4">
              <PixelatedCanvas
                src={card.imageSrc}
                width={300} // Slightly smaller for a card layout
                height={400}
                cellSize={3}
                dotScale={0.9}
                shape="square"
                backgroundColor="#000000"
                dropoutStrength={0.4}
                interactive
                distortionStrength={3}
                distortionRadius={80}
                distortionMode="swirl"
                followSpeed={0.2}
                jitterStrength={4}
                jitterSpeed={4}
                sampleAverage
                tintColor="#FFFFFF"
                tintStrength={0.2}
                className="rounded-xl border border-neutral-800 shadow-lg"
              />
              <h3 className="text-2xl font-semibold mt-2">{card.title}</h3>
              <p className="max-w-xs text-neutral-400">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}