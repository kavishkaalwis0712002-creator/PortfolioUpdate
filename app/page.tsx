import fs from "fs";
import path from "path";
import Link from "next/link";
import { 
  Cpu, 
  Layers, 
  Activity, 
  Radio, 
  ExternalLink, 
  Mail, 
  Phone 
} from "lucide-react";

function getProjects() {
  const dataFilePath = path.join(process.cwd(), "data", "projects.json");
  if (!fs.existsSync(dataFilePath)) return [];
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

export default function HomePage() {
  const projects = getProjects();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-black scroll-smooth">
      {/* Background Subtle Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.12),rgba(255,255,255,0))] pointer-events-none" />

      {/* Sticky Navigation Bar (Height: 4rem / h-16) */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#about" className="font-bold text-white tracking-tight text-sm hover:text-sky-400 transition">
            KA<span className="text-sky-400">.</span>
          </a>

          <nav className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
            <a href="#about" className="text-slate-400 hover:text-sky-400 transition">About</a>
            <a href="#highlights" className="text-slate-400 hover:text-sky-400 transition">Focus</a>
            <a href="#projects" className="text-slate-400 hover:text-sky-400 transition">Projects ({projects.length})</a>
            <a href="#contact" className="text-slate-400 hover:text-sky-400 transition">Contact</a>
            <Link 
              href="/admin" 
              className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sky-400 hover:border-sky-500/50 transition flex items-center gap-1"
            >
              CMS <ExternalLink size={11} />
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-6">
        {/* 1. About / Hero Section */}
        <section 
          id="about" 
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-20 py-12 border-b border-slate-900"
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to Engineering Opportunities
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text text-transparent">
            Kavishka Alwis
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
            Electronics & IoT Undergraduate specializing in Parametric 3D CAD modeling, 
            Edge AI (TinyML), and Long-Range Telemetry Systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="#projects"
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition"
            >
              Explore Case Studies
            </a>
            <a 
              href="#contact"
              className="px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-medium transition"
            >
              Get in Touch
            </a>
          </div>
        </section>

        {/* 2. Technical Highlights / Focus Section */}
        <section 
          id="highlights" 
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-20 py-16 border-b border-slate-900"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">Core Engineering Domains</h2>
            <p className="text-sm text-slate-400 mt-1">Specialized workflows across hardware, firmware, and mechanical design.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/30 transition">
              <Cpu className="text-sky-400 mb-3" size={28} />
              <h4 className="text-base font-semibold text-white">Embedded Systems & Firmware</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Firmware development for ESP32, ESP32-C3, and STM architectures using C/C++, FreeRTOS multitasking, and sensor drivers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 transition">
              <Layers className="text-indigo-400 mb-3" size={28} />
              <h4 className="text-base font-semibold text-white">Parametric CAD & Prototyping</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Autodesk Fusion 360 parametric modeling, 0.25mm snap-fit tolerance design, and DFM optimization for FDM 3D printing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition">
              <Activity className="text-emerald-400 mb-3" size={28} />
              <h4 className="text-base font-semibold text-white">Edge AI & TinyML</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                On-device anomaly detection and classification pipelines with Edge Impulse, vibration DSP, and spectral analysis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition">
              <Radio className="text-purple-400 mb-3" size={28} />
              <h4 className="text-base font-semibold text-white">Long-Range Telemetry & IoT</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Off-grid communication via SX1278 LoRa 433 MHz nodes, MQTT brokers, and responsive full-stack telemetry dashboards.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Engineering Projects Section */}
        <section 
          id="projects" 
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-20 py-16 border-b border-slate-900"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Engineering Case Studies</h2>
              <p className="text-sm text-slate-400 mt-1">Data-driven prototypes managed dynamically through the CMS</p>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
              {projects.length} Published
            </span>
          </div>

          <div className="space-y-12">
            {projects.map((project: any) => (
              <div 
                key={project.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
                  <span className="px-3 py-1 rounded text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {project.category}
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {project.challenge && (
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <span className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                        Challenge
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                        Solution & Architecture
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300">{project.solution}</p>
                    </div>
                  )}
                </div>

                {/* Gallery Images */}
                {project.images && project.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {project.images.map((imgUrl: string, idx: number) => (
                      <div 
                        key={idx} 
                        className="rounded-xl overflow-hidden border border-slate-800 bg-black/40 aspect-[4/3] flex items-center justify-center group relative"
                      >
                        <img 
                          src={imgUrl} 
                          alt={`${project.title} visual ${idx + 1}`}
                          className="w-full h-full object-contain group-hover:scale-105 transition duration-300" 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. Contact Section */}
        <section 
          id="contact" 
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-20 py-16"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Get in Touch</h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Have an embedded hardware prototype, IoT architecture, or CAD design challenge? Feel free to reach out.
            </p>

            <div className="mt-8 space-y-4 font-mono text-sm">
              <a 
                href="mailto:kavishkaalwis0712002@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition"
              >
                <Mail size={18} className="text-sky-400" />
                <span>kavishkaalwis0712002@gmail.com</span>
              </a>

              <a 
                href="tel:+94711635458"
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition"
              >
                <Phone size={18} className="text-emerald-400" />
                <span>+94 71 163 5458</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/kavishka-alwis" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition"
              >
                <svg className="w-4 h-4 fill-sky-400" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>linkedin.com/in/kavishka-alwis</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-slate-800/80 text-center text-xs font-mono text-slate-500">
          <p>© 2026 Kavishka Alwis • Full-Stack Portfolio & CMS</p>
        </footer>
      </main>
    </div>
  );
}