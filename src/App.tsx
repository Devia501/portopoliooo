import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties, MouseEvent } from "react";
import {
  ArrowUpRight,
  Bone,
  Box,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Code2,
  Copy,
  Gamepad2,
  FolderOpen,
  Folder,
  MousePointerClick,
  Palette,
  PenTool,
  Smartphone,
  Webhook,
  Workflow,
  X,
} from "lucide-react";
import {
  SiBlender,
  SiGithub,
  SiGmail,
  SiGoogledrive,
  SiCss,
  SiExpo,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiUnrealengine,
  SiVite,
} from "react-icons/si";
import "./App.css";
import ForestWelcome from "./components/ForestWelcome";

// Isi dengan data kontakmu. LinkedIn kosong = tautannya disembunyikan.
const EMAIL = "your-email@example.com";
const GITHUB = "https://github.com/Devia501";
const LINKEDIN = "";

type Mode = "code" | "art";
const modes: Record<Mode, { label: string; line: string }> = {
  code: {
    label: "Code",
    line: "React, React Native, and TypeScript. I build responsive web and mobile interfaces and connect them to real APIs.",
  },
  art: {
    label: "3D",
    line: "Blender and Unreal Engine. I model, rig, and animate characters, and prototype small game worlds.",
  },
};

const roles: { text: string; mode: Mode }[] = [
  { text: "Frontend Developer", mode: "code" },
  { text: "3D Artist", mode: "art" },
];

const filters = ["All", "Web", "Mobile", "3D", "Game"] as const;
type Filter = (typeof filters)[number];

// Foto dokumentasi project. Taruh file di public/images/projects/ lalu sesuaikan nama file & caption.
// kind: "UI" = tampilan hasil, "Code" = potongan kodingan, "3D" = render/screenshot 3D.
type ShotKind = "UI" | "Code" | "3D";
type Shot = { src: string; caption: string; kind: ShotKind };
const shot = (file: string, caption: string, kind: ShotKind = "UI"): Shot => ({
  src: `/images/projects/${file}`,
  caption,
  kind,
});

const projects: {
  title: string;
  tag: Exclude<Filter, "All">;
  description: string;
  tech: string[];
  shots: Shot[];
  cover: string;
  github?: string;
  drive?: string;
}[] = [
  {
    title: "SIMATKUL",
    cover: "/images/projects/simatkul-bg-v2.png",
    github: "https://github.com/azizahhazii/FE-SIMATKUL.git", // Tempel link repository GitHub di sini.
    tag: "Web",
    description:
      "A management system for academic practical courses. I worked on the frontend, interface development, and API integration.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    shots: [
      shot("simatkul-1.png", "Master Data"),
      shot("simatkul-2.png", "Practical Scheduling"),
      shot("simatkul-4.png", "Scheduling Results"),
      shot("simatkul-5.png", "Excel Export"),
      shot("simatkul-code.png", "API Integration", "Code"),
    ],
  },
  {
    title: "SIA Akademik",
    cover: "/images/projects/sia-11.png",
    github: "https://github.com/Devia501/SIA_FE.git", // Tempel link repository GitHub di sini.
    tag: "Mobile",
    description:
      "A mobile academic information system. I built interface screens and integrated the API.",
    tech: ["React Native", "TypeScript", "REST API"],
    shots: [
      shot("sia-1.png", "Home Screen"),
      shot("sia-2.png", "Student Portal", "Dashboard & Registration"),
      shot("sia-3.png", "Manager"),
      shot("sia-4.png", "Admin"),
      shot("sia-5.png", "Frontend Implementation", "Code"),
    ],
  },
  {
    title: "Tentang Dental",
    cover: "/images/projects/tentangdental-bg.png",
    github: "https://github.com/Devia501/dental_mobile.git", // Tempel link repository GitHub di sini.
    tag: "Mobile",
    description:
      "A dental clinic app with an admin interface for managing clinic information, connected to the application API.",
    tech: ["Expo", "React Native", "TypeScript"],
    shots: [
      shot("dental-1.png", "App Overview"),
      shot("dental-2.png", "Platform Features"),
      shot("dental-3.png", "System Workflow"),
      shot("dental-4.png", "Examination Interface"),
      shot("dental-5.png", "API Integration", "Code"),
    ],
  },
  {
    title: "Animasi Pecinta Alam",
    cover: "/images/projects/pecinta-alam-1.png",
    tag: "3D",
    drive:
      "https://drive.google.com/file/d/1UnczsPA5b6mkpLTtD-e0snTYN8NUaF5G/view?usp=sharing",
    description:
      "A 3D animation about a hiker climbing a mountain. I handled story, assets, character creation, rigging, and animation.",
    tech: ["Blender", "3D Modeling", "Rigging", "Animation"],
    shots: [
      shot("pecinta-alam-1.png", "3D Object Modeling", "3D"),
      shot("pecinta-alam-2.png", "Character Modeling", "3D"),
      shot("pecinta-alam-3.png", "Character Rigging & Animation", "3D"),
      shot("pecinta-alam-4.jpg", "Material & Texture Design", "3D"),
      shot("pecinta-alam-5.jpg", "Environment & Scene Setup", "3D"),
    ],
  },
  {
    title: "Connection Lost",
    cover: "/images/projects/late-11.png",
    tag: "3D",
    drive:
      "https://drive.google.com/file/d/1o0Hq_7dv8BM3lHjzxG9c4En9RIPYMYt0/view?usp=sharing",
    description:
      "A short 3D animation about a girl who arrives late to an event. I handled story, assets, character modeling, rigging, and animation.",
    tech: ["Blender", "3D Modeling", "Rigging", "Animation"],
    shots: [
      shot("late-1.png", "Character Modeling", "3D"),
      shot("late-2.1.png", "UV Mapping & Texturing", "3D"),
      shot("late-2.2.png", "Character Rigging", "3D"),
      shot("late-3.png", "Procedural Material Design", "3D"),
      shot("late-4.png", "Robot Modeling", "3D"),
      shot("late-5.png", "Scene Composition & Animation", "3D"),
      shot("late-6.png", "Scene Composition & Animation", "3D"),
      shot("late-7.jpeg", "Scene Composition & Animation", "3D"),
    ],
  },
  {
    title: "Locked In",
    cover: "/images/projects/locked-in-1.png",
    tag: "Game",
    github: "https://github.com/adell10/LockedIn.git",
    description:
      "A first-person puzzle escape room with psychological horror, still in development. I work on gameplay mechanics, Blueprint interactions, and asset integration.",
    tech: ["Unreal Engine 5", "Blueprint", "3D Assets"],
    shots: [
      shot("locked-in-1.png", "Room", "3D"),
      shot("locked-in-2.png", "Puzzle", "3D"),
      shot("locked-in-blueprint.png", "Blueprint", "Code"),
    ],
  },
  {
    title: "Anti Pinjol",
    cover: "/images/projects/anti-pinjol-1.png",
    tag: "Web",
    description:
      "An informational website that presents educational content about the risks of illegal online lending and helps visitors understand the issue.",
    tech: ["Website"],
    shots: [
      shot("anti-pinjol-1.png", "Landing Page", "UI"),
      shot("anti-pinjol-2.png", "Illegal Loan Education", "UI"),
      shot("anti-pinjol-3.png", "Loan Interest Calculator", "UI"),
      shot("anti-pinjol-4.png", "Loan Legality Checker", "UI"),
      shot("anti-pinjol-5.png", "Victim Stories", "UI"),
      shot("anti-pinjol-6.png", "Illegal Loan Reporting", "UI"),
    ],
  },
  {
    title: "SiKontra",
    cover: "/images/projects/manajemen-kontrakan-1.png",
    tag: "Web",
    description:
      "An earlier website project for managing rental-property information. Included here as an archive of my previous work.",
    tech: ["Website"],
    shots: [
      shot("manajemen-kontrakan-2.png", "User Management", "UI"),
      shot("manajemen-kontrakan-3.png", "Unit Management Dashboard", "UI"),
      shot("manajemen-kontrakan-4.png", "Tenant Management", "UI"),
      shot("manajemen-kontrakan-5.png", "Transaction History", "UI"),
    ],
  },
];

// Ikon tech stack. Default pakai react-icons / lucide.
// Mau pakai gambar sendiri (PNG tanpa background)? Taruh di public/icons/ lalu isi `img`, contoh:
//   { name: "React", icon: SiReact, color: "#61DAFB", img: "/icons/react.png" }
// Kalau `img` diisi, gambar itu yang tampil; kalau filenya belum ada, otomatis balik ke `icon`.
type Tech = {
  name: string;
  icon: ComponentType<{ size?: number | string }>;
  color: string;
  img?: string;
};

const T = {
  html: { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  css: { name: "CSS", icon: SiCss, color: "#1E90FF" },
  js: { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  ts: { name: "TypeScript", icon: SiTypescript, color: "#3B82F6" },
  react: { name: "React", icon: SiReact, color: "#61DAFB" },
  vite: { name: "Vite", icon: SiVite, color: "#A78BFA" },
  tailwind: { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  rn: { name: "React Native", icon: SiReact, color: "#61DAFB" },
  expo: { name: "Expo", icon: SiExpo, color: "#E8EEFC" },
  rest: { name: "REST API", icon: Webhook, color: "var(--accent)" },
  figma: { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  wire: { name: "Wireframing", icon: PenTool, color: "#A259FF" },
  proto: { name: "Prototyping", icon: MousePointerClick, color: "#0ACF83" },
  blender: { name: "Blender", icon: SiBlender, color: "#F5792A" },
  model: { name: "3D Modeling", icon: Box, color: "#FF9D4D" },
  rig: { name: "Rigging", icon: Bone, color: "#FFC46B" },
  anim: { name: "Animation", icon: Clapperboard, color: "#FF7A59" },
  unreal: { name: "Unreal Engine 5", icon: SiUnrealengine, color: "#E8EEFC" },
  bp: { name: "Blueprint", icon: Workflow, color: "var(--accent)" },
} satisfies Record<string, Tech>;

const skillGroups: {
  icon: ComponentType<{ size?: number | string }>;
  title: string;
  description: string;
  skills: Tech[];
}[] = [
  {
    icon: Code2,
    title: "Web",
    description: "Responsive, interactive web interfaces.",
    skills: [T.html, T.css, T.js, T.ts, T.react, T.vite],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    description: "Mobile app interfaces connected to REST APIs.",
    skills: [T.rn, T.expo, T.ts, T.rest],
  },
  {
    icon: Palette,
    title: "UI/UX",
    description: "Wireframes and prototypes that become real screens.",
    skills: [T.figma, T.wire, T.proto],
  },
  {
    icon: Box,
    title: "3D art and animation",
    description: "Models, characters, rigs, and short animations.",
    skills: [T.blender, T.model, T.rig, T.anim],
  },
  {
    icon: Gamepad2,
    title: "Game development",
    description: "Gameplay mechanics and interactions in Unreal Engine.",
    skills: [T.unreal, T.bp],
  },
];

const gallery = [
  {
    src: "/images/gallery-1.png",
    title: "Character and environment",
    alt: "3D character in an environment, made in Blender",
  },
  {
    src: "/images/gallery-2.png",
    title: "Character creation",
    alt: "A modeled and rigged 3D character",
  },
  {
    src: "/images/gallery-3.png",
    title: "Visual experiments",
    alt: "3D animation experiment",
  },
];

const navItems = ["about", "journey", "skills", "projects", "gallery"];

const tilts = [-4, 3, -2, 4, -3];

function TechTile({
  t,
  i,
  onMove,
  onLeave,
}: {
  t: Tech;
  i: number;
  onMove: (e: MouseEvent<HTMLElement>) => void;
  onLeave: (e: MouseEvent<HTMLElement>) => void;
}) {
  const [broken, setBroken] = useState(false);
  const Ico = t.icon;
  return (
    <div
      className="tech"
      style={{ "--c": t.color, "--i": i } as CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="tech-icon">
        {t.img && !broken ? (
          <img src={t.img} alt="" onError={() => setBroken(true)} />
        ) : (
          <Ico size={44} />
        )}
      </div>
      <span>{t.name}</span>
    </div>
  );
}

function ProjectFolder({
  title,
  shots,
  onOpen,
}: {
  title: string;
  shots: Shot[];
  onOpen: (index: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`project-folder ${hovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className="folder-trigger"
        onClick={() => onOpen(0)}
        aria-label={`Open ${title} project gallery`}
      >
        <span className="folder-preview-stack" aria-hidden="true">
          {shots.slice(0, 3).map((item, index) => (
            <span
              className={`folder-preview preview-${index + 1}`}
              key={item.src}
            >
              <img src={item.src} alt="" loading="lazy" />
            </span>
          ))}
        </span>
        <span className="folder-art">
          <Folder size={76} strokeWidth={1.15} />
          <span className="folder-tab" />
        </span>
        <span className="folder-label">
          <FolderOpen size={15} />
          <span>View project files</span>
          <span className="folder-count">{shots.length}</span>
        </span>
      </button>
      <span className="folder-hint">Hover to preview · Click to explore</span>
    </div>
  );
}

type LightboxItem = { src: string; title: string; alt: string };

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const mode = roles[roleIndex].mode;
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState("SIMATKUL");
  const [skill, setSkill] = useState(0);
  const [lightbox, setLightbox] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tone, setTone] = useState<"purple" | "blue">("purple");

  // Role dan aksen warna berubah dari satu sumber waktu yang sama: video robot.
  // Saat mata robot berubah biru, teks berpindah ke 3D Artist; saat loop kembali,
  // keduanya kembali ke Frontend Developer dan ungu.
  useEffect(() => {
    const v = videoRef.current;
    const hero = heroRef.current;
    if (!v || !hero) return;
    // Bagi durasi video menjadi dua fase yang sama panjang.
    // Ini menjaga pergantian role tetap seimbang meski durasi video berubah.
    const getMidpoint = () =>
      Number.isFinite(v.duration) && v.duration > 0 ? v.duration / 2 : 7.3;
    let raf = 0;
    let running = false;
    let previousMode: Mode | null = null;
    const tick = () => {
      const nextMode: Mode = v.currentTime >= getMidpoint() ? "art" : "code";
      setTone(nextMode === "art" ? "blue" : "purple");
      if (nextMode !== previousMode) {
        previousMode = nextMode;
        setRoleIndex(roles.findIndex((role) => role.mode === nextMode));
        setTyped("");
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (running) return;
        running = true;
        v.play().catch(() => {});
        tick();
      } else {
        running = false;
        cancelAnimationFrame(raf);
        v.pause();
      }
    });
    io.observe(hero);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll antar bagian: semua tautan "#..." (navbar, tombol, footer) memakai
  // animasi yang sama, easing in-out dengan durasi menyesuaikan jarak.
  useEffect(() => {
    const NAV_OFFSET = 72; // tinggi navbar sticky
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const cancel = () => cancelAnimationFrame(raf);
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const scrollToY = (target: number) => {
      cancel();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const to = Math.max(0, Math.min(target, max));
      const from = window.scrollY;
      const dist = to - from;
      if (Math.abs(dist) < 2) return;
      if (reduce.matches) {
        window.scrollTo({ top: to, behavior: "instant" });
        return;
      }
      const dur = Math.min(1500, 650 + Math.abs(dist) * 0.22);
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        window.scrollTo({ top: from + dist * ease(p), behavior: "instant" });
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const onClick = (e: globalThis.MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a[href^="#"]');
      if (!a) return;
      const id = (a.getAttribute("href") ?? "").slice(1);
      const el = id ? document.getElementById(id) : null;
      if (id && !el) return;
      e.preventDefault();
      const y =
        !el || id === "home"
          ? 0
          : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      scrollToY(y);
      history.replaceState(null, "", id ? `#${id}` : window.location.pathname);
    };

    document.addEventListener("click", onClick);
    // kalau pengunjung scroll sendiri di tengah animasi, animasi berhenti
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      cancel();
    };
  }, []);

  useEffect(() => {
    const full = roles[roleIndex].text;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(full);
      return;
    }
    if (typed.length >= full.length) return;
    const t = window.setTimeout(
      () => setTyped(full.slice(0, typed.length + 1)),
      55,
    );
    return () => window.clearTimeout(t);
  }, [typed, roleIndex]);

  const pickMode = (m: Mode) => {
    setRoleIndex(roles.findIndex((r) => r.mode === m));
    setTyped("");
    // Tombol mode juga mengarahkan video ke fase warna yang sesuai.
    if (videoRef.current) {
      const v = videoRef.current;
      v.currentTime =
        m === "art" && Number.isFinite(v.duration) && v.duration > 0
          ? v.duration / 2
          : m === "art"
            ? 7.3
            : 0;
    }
    setTone(m === "art" ? "blue" : "purple");
  };

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--progress",
        String(max > 0 ? window.scrollY / max : 0),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const stepLightbox = (d: number) =>
    setLightbox((l) =>
      l ? { ...l, index: (l.index + d + l.items.length) % l.items.length } : l,
    );

  const lightboxOpen = lightbox !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  // Highlight the card currently under the pointer, independently per column.
  const onJourneyCardEnter = (e: MouseEvent<HTMLElement>) => {
    const timeline = e.currentTarget.closest(".journey-timeline");
    timeline?.querySelectorAll(".journey-card").forEach((card) => {
      card.classList.toggle("is-active", card === e.currentTarget);
    });
  };

  const onHeroMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--pointer-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--pointer-y", `${e.clientY - r.top}px`);
  };

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${(y / r.height - 0.5) * -8}deg`);
    el.style.setProperty("--ry", `${(x / r.width - 0.5) * 10}deg`);
  };

  const onTechLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--mx", "50%");
    e.currentTarget.style.setProperty("--my", "50%");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* clipboard blocked */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const visible = projects.filter((p) => filter === "All" || p.tag === filter);
  const group = skillGroups[skill];
  const Icon = group.icon;
  const isArt = (tag: string) => tag === "3D" || tag === "Game";

  return (
    <div className="app" data-mode={mode}>
      <div className="progress" aria-hidden="true" />

      <header className="navbar">
        <a href="#home" className="logo">
          Devia<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {navItems.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "is-active" : ""}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-contact">
          Let's talk
        </a>
      </header>

      <main>
        <section
          className="hero"
          id="home"
          ref={heroRef}
          data-tone={tone}
          onMouseMove={onHeroMove}
        >
          <div className="robot-atmosphere" aria-hidden="true">
            <span className="robot-orbit robot-orbit-one" />
            <span className="robot-orbit robot-orbit-two" />
            <span className="robot-orbit robot-orbit-three" />
            <span className="robot-node robot-node-one" />
            <span className="robot-node robot-node-two" />
          </div>
          <div className="grid-dim" aria-hidden="true" />
          <div className="grid-lit" aria-hidden="true" />

          <div className="hero-content">
            <p className="status">
              <span className="dot" />
              Available for an internship from January 2027
            </p>
            <h1>Hi, I'm Devia.</h1>
            <h2
              className="role-heading"
              aria-label="I'm a Frontend Developer and 3D Artist"
            >
              I'm a <span>{typed}</span>
              <i className="caret" aria-hidden="true" />
            </h2>

            <div
              className="mode-switch"
              role="group"
              aria-label="Choose what to show"
            >
              <span>Show me</span>
              {(Object.keys(modes) as Mode[]).map((m) => (
                <button
                  key={m}
                  className={mode === m ? "on" : ""}
                  aria-pressed={mode === m}
                  onClick={() => pickMode(m)}
                >
                  {modes[m].label}
                </button>
              ))}
            </div>
            <p className="hero-line" key={mode}>
              {modes[mode].line}
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn primary">
                View my work
              </a>
              <a href="#contact" className="btn ghost">
                Get in touch
              </a>
            </div>
            <div className="social-links">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <SiGithub size={20} />
              </a>
              {LINKEDIN && (
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM3.555 9h3.564v11.452H3.555V9zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email">
                <SiGmail size={20} />
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="stage">
              <div className="stage-plate" aria-hidden="true">
                <div className="stage-clip">
                  <video
                    ref={videoRef}
                    className="robot-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/videos/robot-hero.webm" type="video/webm" />
                    <source src="/videos/robot-hero.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ForestWelcome />

        <section className="section about" id="about">
          <div
            className="about-photo"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--reveal-x", `${x}px`);
              e.currentTarget.style.setProperty("--reveal-y", `${y}px`);
              e.currentTarget.classList.add("is-revealing");
            }}
            onMouseLeave={(e) =>
              e.currentTarget.classList.remove("is-revealing")
            }
          >
            <img
              className="profile-base"
              src="/images/profile.png"
              alt="Devia Artika Maharani"
            />
            <img
              className="profile-reveal"
              src="/images/profile2.png"
              alt=""
              aria-hidden="true"
            />
            <span className="profile-pixels" aria-hidden="true" />
            <span className="profile-cursor" aria-hidden="true">
              <i />
            </span>
          </div>
          <div className="about-text">
            <h2>Hi, I'm Devia.</h2>
            <p className="lead">
              I'm a Software Engineering student at Universitas Gadjah Mada, now
              in my fifth semester.
            </p>
            <p>
              I like turning UI/UX designs into working products: interfaces
              that are responsive, clear, and pleasant to use.
            </p>
            <p>
              Outside of code, I model, rig, and animate characters in Blender.
            </p>
            <p>
              Through coursework and team projects I've built web and mobile
              apps, made short 3D animations, and started an escape-room game in
              Unreal Engine.
            </p>
            <p>
              I'm looking for an internship in my sixth semester, where I can
              keep growing as a developer.
            </p>
          </div>
        </section>

        <section className="section journey-section" id="journey">
          <div className="journey-heading">
            <span className="journey-kicker">THE PATH SO FAR</span>
            <h2 className="section-title">
              Education <span>&</span> Experience
            </h2>
            <p className="section-sub">
              A little timeline of where I learned, worked, and found my place
              to grow.
            </p>
          </div>

          <div className="journey-columns">
            <div className="journey-column">
              <div className="journey-column-title">
                <span className="journey-symbol">01</span>
                <h3>Education</h3>
              </div>
              <div className="journey-timeline">
                <article
                  className="journey-card current is-active"
                  onMouseEnter={onJourneyCardEnter}
                >
                  <span className="journey-marker">01</span>
                  <div className="journey-card-top">
                    <div className="journey-org">
                      <span className="journey-org-icon">UGM</span>
                      <div>
                        <h4>Universitas Gadjah Mada</h4>
                        <span>Yogyakarta, Indonesia</span>
                      </div>
                    </div>
                    <span className="journey-date">PRESENT</span>
                  </div>
                  <h3>Software Engineering</h3>
                  <p>Teknologi Rekayasa Perangkat Lunak · Sekolah Vokasi</p>
                  <div className="journey-tags">
                    <span>Semester 5</span>
                    <span>Current GPA 3.64</span>
                  </div>
                </article>

                <article
                  className="journey-card"
                  onMouseEnter={onJourneyCardEnter}
                >
                  <span className="journey-marker">02</span>
                  <div className="journey-card-top">
                    <div className="journey-org">
                      <span className="journey-org-icon school">SMK</span>
                      <div>
                        <h4>SMK Negeri 1 Sedayu</h4>
                        <span>Sedayu, Indonesia</span>
                      </div>
                    </div>
                    <span className="journey-date">COMPLETED</span>
                  </div>
                  <h3>Teknik Komputer dan Jaringan</h3>
                  <p>Computer and Network Engineering · TKJ</p>
                  <div className="journey-tags">
                    <span>Computer Networking</span>
                    <span>IT Fundamentals</span>
                  </div>
                </article>
              </div>
            </div>

            <div className="journey-column">
              <div className="journey-column-title">
                <span className="journey-symbol">02</span>
                <h3>Experience</h3>
              </div>
              <div className="journey-timeline experience-timeline">
                <article
                  className="journey-card current is-active"
                  onMouseEnter={onJourneyCardEnter}
                >
                  <span className="journey-marker">01</span>
                  <div className="journey-card-top">
                    <div className="journey-org">
                      <span className="journey-org-icon org">K</span>
                      <div>
                        <h4>KOMATIK</h4>
                        <span>Student Organization · UGM</span>
                      </div>
                    </div>
                    <span className="journey-date">2026 – PRESENT</span>
                  </div>
                  <h3>Vice Head · Animation Division</h3>
                  <p>
                    Serving as Vice Head of the Animation Division, supporting
                    team coordination and the division's creative activities.
                  </p>
                  <div className="journey-tags">
                    <span>Leadership</span>
                    <span>Animation</span>
                    <span>Team Coordination</span>
                  </div>
                </article>

                <article
                  className="journey-card"
                  onMouseEnter={onJourneyCardEnter}
                >
                  <span className="journey-marker">02</span>
                  <div className="journey-card-top">
                    <div className="journey-org">
                      <span className="journey-org-icon org">K</span>
                      <div>
                        <h4>KOMATIK</h4>
                        <span>Student Organization · UGM</span>
                      </div>
                    </div>
                    <span className="journey-date">EARLY 2025</span>
                  </div>
                  <h3>Member · Animation Division</h3>
                  <p>
                    Joined the Animation Division and participated in its
                    creative and collaborative activities.
                  </p>
                  <div className="journey-tags">
                    <span>Animation</span>
                    <span>Teamwork</span>
                  </div>
                </article>

                <article
                  className="journey-card"
                  onMouseEnter={onJourneyCardEnter}
                >
                  <span className="journey-marker">03</span>
                  <div className="journey-card-top">
                    <div className="journey-org">
                      <span className="journey-org-icon org">A</span>
                      <div>
                        <h4>ASSETS</h4>
                        <span>Student Organization · UGM</span>
                      </div>
                    </div>
                    <span className="journey-date">EARLY 2025</span>
                  </div>
                  <h3>Member · KASTRAT</h3>
                  <p>
                    Kajian dan Aksi Strategis (KASTRAT) — contributed to
                    strategic studies, discussions, and organizational
                    initiatives within ASSETS.
                  </p>
                  <div className="journey-tags">
                    <span>Organization</span>
                    <span>Collaboration</span>
                  </div>
                </article>

                <article
                  className="journey-card"
                  onMouseEnter={onJourneyCardEnter}
                >
                  <span className="journey-marker">04</span>
                  <div className="journey-card-top">
                    <div className="journey-org">
                      <span className="journey-org-icon work">RL</span>
                      <div>
                        <h4>Royale Laptop</h4>
                        <span>Paid Internship · E-commerce</span>
                      </div>
                    </div>
                    <span className="journey-date">2023 · ~9 MONTHS</span>
                  </div>
                  <h3>E-commerce Administrator</h3>
                  <p>
                    Managed product uploads across Tokopedia, Shopee, Lazada,
                    and other marketplaces; photographed products, recorded
                    stock, and maintained online product listings.
                  </p>
                  <div className="journey-tags">
                    <span>Product Listing</span>
                    <span>Stock Management</span>
                    <span>Product Photography</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <h2 className="section-title">What I work with</h2>
          <p className="section-sub">Pick an area to see the tools I use.</p>
          <div className="skills">
            <div className="skill-tabs" role="tablist">
              {skillGroups.map((g, i) => (
                <button
                  key={g.title}
                  role="tab"
                  aria-selected={skill === i}
                  className={skill === i ? "on" : ""}
                  onClick={() => setSkill(i)}
                >
                  {g.title}
                </button>
              ))}
            </div>
            <div className="skill-panel" key={group.title} role="tabpanel">
              <div className="skill-info">
                <Icon size={32} />
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <div className="tech-grid">
                {group.skills.map((t, i) => (
                  <TechTile
                    key={t.name}
                    t={t}
                    i={i}
                    onMove={onMove}
                    onLeave={onTechLeave}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="projects">
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">
            Work from coursework and team collaborations.
          </p>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                className={filter === f ? "on" : ""}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="projects">
            {visible.map((p) => {
              const isOpen = open === p.title;
              const projectLink = p.tag === "3D" ? p.drive : p.github;
              const projectLinkType =
                p.tag === "3D" ? "Google Drive" : "GitHub";
              return (
                <article
                  key={p.title}
                  className={`project ${isOpen ? "open" : ""} ${isArt(p.tag) ? "art" : "code"}`}
                >
                  <button
                    className="project-head"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(5, 12, 20, .88), rgba(5, 12, 20, .62) 58%, rgba(5, 12, 20, .48)), url("${p.cover}")`,
                    }}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? "" : p.title)}
                  >
                    <h3>{p.title}</h3>
                    <span className="tag">{p.tag}</span>
                    <ArrowUpRight size={22} className="arrow" />
                  </button>
                  <div className="project-body">
                    <div className="project-detail-layout">
                      <div className="project-copy">
                        <p>{p.description}</p>
                        <div className="project-actions">
                          <a
                            className={`project-github ${
                              projectLink ? "available" : "placeholder"
                            }`}
                            href={projectLink || undefined}
                            target={projectLink ? "_blank" : undefined}
                            rel={projectLink ? "noreferrer" : undefined}
                            aria-label={
                              projectLink
                                ? `Open ${p.title} ${projectLinkType}`
                                : `${projectLinkType} link for ${p.title} — add link in App.tsx`
                            }
                            title={
                              projectLink
                                ? `View ${projectLinkType}`
                                : `Tambahkan link ${projectLinkType} di App.tsx`
                            }
                            aria-disabled={!projectLink}
                            onClick={(event) => {
                              if (!projectLink) event.preventDefault();
                            }}
                          >
                            {p.tag === "3D" ? (
                              <SiGoogledrive size={19} />
                            ) : (
                              <SiGithub size={19} />
                            )}

                            <span>
                              {p.tag === "3D" ? "Google Drive" : "GitHub"}
                            </span>
                          </a>
                        </div>
                        <div className="chips">
                          {p.tech.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <ProjectFolder
                        title={p.title}
                        shots={p.shots}
                        onOpen={(index) =>
                          setLightbox({
                            items: p.shots.map((x) => ({
                              src: x.src,
                              title: `${p.title} · ${x.caption}`,
                              alt: x.caption,
                            })),
                            index,
                          })
                        }
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" id="gallery">
          <h2 className="section-title">Gallery</h2>
          <p className="section-sub">
            3D artwork and experiments. Click an image to enlarge it.
          </p>
          <div className="gallery">
            {gallery.map((g, i) => (
              <button
                key={g.src}
                className={`shot ${i === 0 ? "big" : ""}`}
                onClick={() => setLightbox({ items: gallery, index: i })}
              >
                <img src={g.src} alt={g.alt} loading="lazy" />
                <span>{g.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <h2>Let's build something together.</h2>
          <p>
            I'm available for an internship from January to June or August 2027,
            and open to collaborations. Email is the fastest way to reach me.
          </p>
          <div className="hero-actions center">
            <a href={`mailto:${EMAIL}`} className="btn primary">
              Send an email
            </a>
            <button className="btn ghost" onClick={copyEmail}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy address"}
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          Devia<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Devia Artika Maharani</p>
        <a href="#home">Back to top</a>
      </footer>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.items[lightbox.index].title}
          onClick={() => setLightbox(null)}
        >
          <button
            className="close"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          {lightbox.items.length > 1 && (
            <button
              className="nav prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(-1);
              }}
            >
              <ChevronLeft size={28} />
            </button>
          )}
          <figure onClick={(e) => e.stopPropagation()}>
            <img
              key={lightbox.items[lightbox.index].src}
              src={lightbox.items[lightbox.index].src}
              alt={lightbox.items[lightbox.index].alt}
            />
            <figcaption>{lightbox.items[lightbox.index].title}</figcaption>
          </figure>
          {lightbox.items.length > 1 && (
            <button
              className="nav next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(1);
              }}
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
