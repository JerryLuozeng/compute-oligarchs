import { useState } from "react";
import { Activity, Database, Eye, RadioTower } from "lucide-react";
import { COUNTDOWN_MONTHS, initialWorld } from "@/core/world";
import { factionBriefings, systemNotices } from "@/content/briefing";
import { Button } from "@/ui/button";
import { MetricCard } from "@/ui/metric-card";

function App() {
  const [glitchEnabled, setGlitchEnabled] = useState(true);

  return (
    <main className={glitchEnabled ? "app-shell glitch-on" : "app-shell"}>
      <div className="scanline" aria-hidden="true" />
      <header className="relative z-10 flex items-center justify-between border-b border-border/70 px-5 py-4 md:px-9">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Compute Era / {initialWorld.era}</p>
          <h1 className="font-display text-xl font-bold uppercase tracking-[0.08em]">算力寡头</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setGlitchEnabled((value) => !value)} aria-pressed={glitchEnabled}>
          <Eye className="h-4 w-4" /> Glitch {glitchEnabled ? "On" : "Off"}
        </Button>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl gap-8 px-5 py-10 md:px-9 lg:grid-cols-[1.35fr_.65fr] lg:py-16">
        <div className="space-y-10">
          <div className="animate-rise">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <RadioTower className="h-4 w-4 text-destructive" /> Global broadcast 041.0
            </div>
            <h2 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-7xl xl:text-8xl">
              距离奇点还有
              <span className="countdown mt-2 block text-primary">{COUNTDOWN_MONTHS} 个月</span>
            </h2>
            <p className="mt-6 max-w-xl border-l-2 border-destructive pl-4 text-sm leading-7 text-muted-foreground">
              该数字已连续显示 27 年。机器从未想要过什么，想要的，一直是坐在机房上面的那些人。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="系统稳定度" value={initialWorld.stability} />
            <MetricCard label="模型健康度" value={initialWorld.modelHealth} />
            <MetricCard label="神话热度" value={initialWorld.mythHeat} />
            <MetricCard label="真相压力" value={initialWorld.truthPressure} suffix=" pt" warning />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <section className="border border-border bg-black/20 p-5">
              <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                <Database className="h-4 w-4" /> Production relations
              </div>
              <div className="space-y-4">
                {factionBriefings.map((faction, index) => (
                  <div key={faction.id} className="grid grid-cols-[26px_1fr] gap-3 border-t border-border/60 pt-3">
                    <span className="font-mono text-xs text-destructive">0{index + 1}</span>
                    <div><h3 className="font-display font-bold">{faction.name}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{faction.position}</p></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="notice-panel p-5">
              <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-orange-400">
                <Activity className="h-4 w-4" /> Drift notices
              </div>
              <div className="space-y-4 font-mono text-xs leading-6">
                {systemNotices.map((notice, index) => <p key={notice}><span className="mr-2 text-primary">[{String(index + 1).padStart(2, "0")}]</span>{notice}</p>)}
              </div>
              <Button className="mt-8 w-full" size="lg">进入观察者模式</Button>
            </section>
          </div>
        </div>

        <aside className="animate-rise border-l border-border/70 pl-0 lg:pl-8 [animation-delay:180ms]">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Quarterly allocation</p>
          <h2 className="mt-3 font-display text-3xl font-bold">生产资料是主角</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">观察资源，分配算力，采取行动。每一次系统危机都能追溯到人的决策、制度与数据缺位。</p>
          <div className="mt-8 space-y-3">
            {["服务 / Serve", "训练 / Train", "租赁 / Rent", "战略 / Strategic"].map((item, index) => (
              <div key={item} className="flex items-center justify-between border-b border-border/60 py-3 font-mono text-xs uppercase tracking-[0.12em]">
                <span>{item}</span><span className="text-primary">{[42, 28, 18, 12][index]}%</span>
              </div>
            ))}
          </div>
          <blockquote className="mt-10 border border-primary/40 bg-primary/5 p-5 font-mono text-xs leading-6 text-primary">
            “既然只能造工具，就该问工具归谁。”
          </blockquote>
        </aside>
      </section>
    </main>
  );
}

export default App;
