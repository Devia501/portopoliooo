import { useEffect, useRef } from "react";
import background from "../assets/forest-background.png";
import foreground from "../assets/forest-foreground.png";
import hiker from "../assets/forest-hiker.png";
import "../styles/ForestWelcome.css";

export default function ForestWelcome() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        section.style.setProperty("--scene-progress", progress.toFixed(4));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="forest-welcome"
      aria-label="Welcome to my portfolio"
    >
      <div className="forest-sticky">
        <div className="forest-background" aria-hidden="true">
          <img src={background} alt="" />
        </div>

        <div className="forest-atmosphere" aria-hidden="true" />

        <div className="forest-welcome-copy" aria-hidden="true">
          <span>THE JOURNEY BEGINS</span>
          <h2>
            Welcome to
            <br />
            my portofolio
          </h2>
        </div>

        <div className="forest-hiker" aria-hidden="true">
          <img src={hiker} alt="" />
        </div>

        <div className="forest-foreground" aria-hidden="true">
          <img src={foreground} alt="" />
        </div>

        <div className="forest-scroll-hint">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </div>
    </section>
  );
}
