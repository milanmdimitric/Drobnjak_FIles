'use client';

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import { Search, User, LogOut, TrendingUp, Newspaper, BarChart3, Wand2, ChevronRight, ArrowRightLeft } from "lucide-react";

// ------------------------------------------------------
// Mock Data (extend/replace with your real NCAA dataset)
// ------------------------------------------------------
const players = [
  {
    id: "p1",
    name: "Hunter Dickinson",
    college: "Kansas",
    position: "C",
    height: 216,
    weight: 116,
    classYear: "Senior",
    stats: { ppg: 19.2, rpg: 10.8, apg: 2.1, pir: 26.4, blk: 1.5, stl: 0.6, fg3: 0.345 },
    attributes: { shooting: 78, rebounding: 92, playmaking: 62, defense: 74, mobility: 67, bballIQ: 86 },
    strengths: ["Post scoring", "Defensive rebounding", "Screen setting", "High feel"],
    weaknesses: ["Lateral quickness", "Switch defense vs guards"],
    improvement: ["Extend consistent pick-and-pop 3", "Conditioning for pace"],
    injuryHistory: "Minor ankle sprains; no major surgeries reported.",
    estimatedContract: "Late 1st–early 2nd round rookie scale / two-way floor",
    suitableTeams: ["UTA", "SAS", "CHA"],
    videoUrl: "https://www.youtube.com/watch?v=b4pGkP5ZQHc"
  },
  {
    id: "p2",
    name: "Tyler Kolek",
    college: "Marquette",
    position: "PG",
    height: 190,
    weight: 88,
    classYear: "Senior",
    stats: { ppg: 15.3, rpg: 4.7, apg: 7.6, pir: 21.2, blk: 0.1, stl: 1.6, fg3: 0.395 },
    attributes: { shooting: 80, rebounding: 54, playmaking: 92, defense: 72, mobility: 80, bballIQ: 90 },
    strengths: ["Pick-and-roll passing", "Catch-and-shoot 3", "Poise"],
    weaknesses: ["Vertical pop at rim", "Size vs switch"],
    improvement: ["Add deeper range off-dribble", "Strength for contact finishes"],
    injuryHistory: "No serious injuries reported.",
    estimatedContract: "Mid 1st round rookie scale",
    suitableTeams: ["ORL", "UTA", "MIA"],
    videoUrl: "https://www.youtube.com/watch?v=cR0xXJw7tJA"
  },
  {
    id: "p3",
    name: "Norchad Omier",
    college: "Miami (FL)",
    position: "PF/C",
    height: 201,
    weight: 106,
    classYear: "Senior",
    stats: { ppg: 17.0, rpg: 10.1, apg: 1.2, pir: 23.0, blk: 1.0, stl: 1.2, fg3: 0.325 },
    attributes: { shooting: 68, rebounding: 90, playmaking: 48, defense: 76, mobility: 82, bballIQ: 78 },
    strengths: ["Motor on glass", "Vertical finisher", "Short-roll defense"],
    weaknesses: ["Undersized at 5/4 tweener", "Shooting consistency"],
    improvement: ["Corner 3 volume", "Hand-off reads"],
    injuryHistory: "Clean sheet; standard bumps.",
    estimatedContract: "Early 2nd round / two-way",
    suitableTeams: ["OKC", "NYK", "TOR"],
    videoUrl: "https://www.youtube.com/watch?v=2b8Cs1P7X6M"
  },
  {
    id: "p4",
    name: "Tristen Newton",
    college: "UConn",
    position: "G",
    height: 196,
    weight: 90,
    classYear: "Senior",
    stats: { ppg: 14.5, rpg: 7.2, apg: 6.1, pir: 20.4, blk: 0.4, stl: 1.1, fg3: 0.365 },
    attributes: { shooting: 77, rebounding: 70, playmaking: 88, defense: 76, mobility: 78, bballIQ: 88 },
    strengths: ["Big guard playmaking", "Rebounding for position"],
    weaknesses: ["Burst vs elite athletes"],
    improvement: ["Pull-up 3 off PnR"],
    injuryHistory: "No significant injuries.",
    estimatedContract: "Late 1st–early 2nd round",
    suitableTeams: ["LAL", "SAS", "NOP"],
    videoUrl: "https://www.youtube.com/watch?v=0G2g2oXQ1Mw"
  },
  {
    id: "p5",
    name: "Zach Edey",
    college: "Purdue",
    position: "C",
    height: 224,
    weight: 132,
    classYear: "Senior",
    stats: { ppg: 24.0, rpg: 12.2, apg: 2.0, pir: 30.1, blk: 2.2, stl: 0.3, fg3: 0.0 },
    attributes: { shooting: 70, rebounding: 95, playmaking: 60, defense: 80, mobility: 58, bballIQ: 85 },
    strengths: ["Post dominance", "Rim deterrence", "Offensive rebounding"],
    weaknesses: ["Foot speed in space"],
    improvement: ["Short-roll touch shots", "Conditioning"],
    injuryHistory: "Knee management; generally healthy.",
    estimatedContract: "Lottery–mid 1st round",
    suitableTeams: ["MEM", "CHI", "OKC"],
    videoUrl: "https://www.youtube.com/watch?v=2n3Gv8j2wZk"
  },
  {
    id: "p6",
    name: "Kyle Filipowski",
    college: "Duke",
    position: "PF/C",
    height: 211,
    weight: 104,
    classYear: "Sophomore",
    stats: { ppg: 16.4, rpg: 8.8, apg: 2.6, pir: 22.1, blk: 1.1, stl: 1.0, fg3: 0.345 },
    attributes: { shooting: 79, rebounding: 84, playmaking: 70, defense: 74, mobility: 76, bballIQ: 84 },
    strengths: ["Stretch big", "Ball skills for size"],
    weaknesses: ["Strength vs pro 5s"],
    improvement: ["Team defense rotations"],
    injuryHistory: "Minor hip clean-up.",
    estimatedContract: "Mid 1st round",
    suitableTeams: ["DAL", "GSW", "ATL"],
    videoUrl: "https://www.youtube.com/watch?v=8C2iQeM3e0E"
  },
  {
    id: "p7",
    name: "Baylor Scheierman",
    college: "Creighton",
    position: "G/F",
    height: 198,
    weight: 93,
    classYear: "Senior",
    stats: { ppg: 18.5, rpg: 8.4, apg: 4.0, pir: 22.0, blk: 0.4, stl: 1.0, fg3: 0.385 },
    attributes: { shooting: 88, rebounding: 76, playmaking: 78, defense: 70, mobility: 76, bballIQ: 86 },
    strengths: ["Shooting gravity", "Secondary playmaking"],
    weaknesses: ["On-ball defense vs quick wings"],
    improvement: ["Off-movement 3 volume"],
    injuryHistory: "Healthy.",
    estimatedContract: "Late 1st–early 2nd",
    suitableTeams: ["SAC", "MIA", "DEN"],
    videoUrl: "https://www.youtube.com/watch?v=5i7uR9kG3Nw"
  },
  {
    id: "p8",
    name: "Jamal Shead",
    college: "Houston",
    position: "PG",
    height: 185,
    weight: 87,
    classYear: "Senior",
    stats: { ppg: 14.0, rpg: 3.5, apg: 6.8, pir: 20.5, blk: 0.3, stl: 2.2, fg3: 0.362 },
    attributes: { shooting: 75, rebounding: 48, playmaking: 88, defense: 92, mobility: 86, bballIQ: 88 },
    strengths: ["Point-of-attack defense", "PnR control", "Leadership"],
    weaknesses: ["Elite shooting volume"],
    improvement: ["Off-dribble 3 at scale"],
    injuryHistory: "Healthy.",
    estimatedContract: "Late 1st–early 2nd",
    suitableTeams: ["MIN", "MIA", "NYK"],
    videoUrl: "https://www.youtube.com/watch?v=3m0J8Yy0N9c"
  },
  {
    id: "p9",
    name: "Ryan Kalkbrenner",
    college: "Creighton",
    position: "C",
    height: 216,
    weight: 108,
    classYear: "Senior",
    stats: { ppg: 16.8, rpg: 7.4, apg: 1.1, pir: 22.8, blk: 2.7, stl: 0.6, fg3: 0.2 },
    attributes: { shooting: 66, rebounding: 82, playmaking: 50, defense: 88, mobility: 72, bballIQ: 82 },
    strengths: ["Drop coverage rim protection", "Lob threat"],
    weaknesses: ["Switching in space"],
    improvement: ["Short roll passing"],
    injuryHistory: "Minor ankle in past season; cleared.",
    estimatedContract: "Late 1st",
    suitableTeams: ["NOP", "OKC", "NYK"],
    videoUrl: "https://www.youtube.com/watch?v=fQ0k9JXf1EY"
  },
  {
    id: "p10",
    name: "Dalton Knecht",
    college: "Tennessee",
    position: "G/F",
    height: 198,
    weight: 95,
    classYear: "Senior",
    stats: { ppg: 20.1, rpg: 5.4, apg: 2.6, pir: 22.6, blk: 0.5, stl: 0.9, fg3: 0.395 },
    attributes: { shooting: 90, rebounding: 70, playmaking: 68, defense: 70, mobility: 80, bballIQ: 82 },
    strengths: ["Shot creation", "3-point shooting"],
    weaknesses: ["Point-of-attack defense vs elite wings"],
    improvement: ["Pick-and-roll reads"],
    injuryHistory: "Healthy.",
    estimatedContract: "Mid 1st",
    suitableTeams: ["ORL", "DET", "BKN"],
    videoUrl: "https://www.youtube.com/watch?v=6V6m8bQ6y2A"
  }
];

const news = [
  {
    id: "n1",
    title: "Film Room: Dickinson vs. Elite Drop Coverage",
    tag: "Analysis",
    date: "2025-10-15",
    summary: "How Kansas leverages delay actions to spring Dickinson into deep seals and short roll reads.",
    videoUrl: "https://www.youtube.com/watch?v=b4pGkP5ZQHc"
  },
  {
    id: "n2",
    title: "Kolek's Late-Clock PnR Mastery",
    tag: "Tactics",
    date: "2025-10-28",
    summary: "Marquette's Spain pick-and-roll package and why NBA teams care.",
    videoUrl: "https://www.youtube.com/watch?v=cR0xXJw7tJA"
  },
  {
    id: "n3",
    title: "Prospect Lens: Norchad's Motor",
    tag: "Scouting",
    date: "2025-10-30",
    summary: "Tracking effort events: box-outs, rim runs, and second jumps.",
    videoUrl: "https://www.youtube.com/watch?v=2b8Cs1P7X6M"
  }
];

// ------------------------------------------
// Utilities
// ------------------------------------------
const formatHeight = (cm) => `${Math.floor(cm/30.48)}'${Math.round((cm/2.54)%12)}`; // rough
const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");

function simpleAISearch(prompt) {
  const text = (prompt || "").toLowerCase();
  const wants = {
    shooter: /shoot|3\s?pt|spacing|gravity/.test(text),
    rebound: /rebound|glass|boards/.test(text),
    rimProtection: /rim|block|protector|drop/.test(text),
    passer: /pass|playmak|assist|p&r|pnr|pick/.test(text),
    defender: /defen|poi|switch/.test(text),
    big: /(^|\s)c($|\s)|center|\bbig\b/.test(text),
    pg: /\bpg\b|point\s?guard/.test(text),
    wing: /wing|g\/f|\bsf\b|\bsg\b/.test(text),
  };
  // score each player by heuristic match
  return players
    .map((p) => {
      let score = 0;
      if (wants.shooter) score += p.attributes.shooting / 10;
      if (wants.rebound) score += p.attributes.rebounding / 10;
      if (wants.rimProtection) score += (p.attributes.defense + (p.stats.blk * 10)) / 20;
      if (wants.passer) score += p.attributes.playmaking / 10;
      if (wants.defender) score += p.attributes.defense / 10;
      if (wants.big && ["C","PF/C","C/PF"].includes(p.position)) score += 5;
      if (wants.pg && p.position.includes("PG")) score += 5;
      if (wants.wing && ["G/F","F","SF","SG"].includes(p.position)) score += 3;
      // small boost for PIR as overall impact proxy
      score += p.stats.pir / 10;
      return { ...p, aiScore: Math.round(score) };
    })
    .sort((a,b)=> b.aiScore - a.aiScore);
}

function tierByMetric(list, key) {
  const sorted = [...list].sort((a,b)=> (b.stats[key] ?? 0) - (a.stats[key] ?? 0));
  const third = Math.ceil(sorted.length / 3) || 1;
  return {
    top: sorted.slice(0, third),
    mid: sorted.slice(third, 2*third),
    rest: sorted.slice(2*third),
  };
}

// ------------------------------------------
// Lightweight runtime "tests" (dev assertions)
// ------------------------------------------
function runSelfTests() {
  const failures = [];
  if (!Array.isArray(players) || players.length === 0) failures.push("players should be a non-empty array");
  for (const p of players) {
    if (!p.id || !p.name) failures.push("each player must have id and name");
    if (!p.stats || typeof p.stats.ppg !== "number") failures.push(`player ${p.name} must have numeric stats.ppg`);
  }
  const ai = simpleAISearch("shooting wing");
  if (!Array.isArray(ai) || ai.length === 0) failures.push("ai search should return a non-empty array");
  // ensure sorted desc by aiScore
  if (ai.length >= 2 && ai[0].aiScore < ai[1].aiScore) failures.push("ai search should be sorted by score desc");
  if (failures.length) {
    // eslint-disable-next-line no-console
    console.error("Self-tests failed:", failures);
  } else {
    // eslint-disable-next-line no-console
    console.log("Self-tests passed");
  }
}

// ------------------------------------------
// UI Pieces
// ------------------------------------------
function Header({ onLogout, user }) {
  return (
    <div className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-2xl bg-black text-white grid place-items-center font-bold">N</div>
          <div className="text-xl font-semibold">NCAA Scout</div>
          <Badge className="ml-2" variant="secondary">Beta</Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <User className="h-4 w-4" /> {user?.email}
          <Button size="sm" variant="secondary" onClick={onLogout} className="gap-2"><LogOut className="h-4 w-4"/> Logout</Button>
        </div>
      </div>
    </div>
  );
}

function PlayerCard({ p, onOpen, onCompareAdd }) {
  return (
    <Card className="hover:shadow-lg transition cursor-pointer">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span>{p.name}</span>
          <Badge variant="outline">{p.position}</Badge>
        </CardTitle>
        <div className="text-xs text-muted-foreground">{p.college} • {formatHeight(p.height)} • {p.weight}kg</div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div><div className="text-lg font-semibold">{p.stats.ppg}</div><div className="text-xs">PPG</div></div>
          <div><div className="text-lg font-semibold">{p.stats.rpg}</div><div className="text-xs">RPG</div></div>
          <div><div className="text-lg font-semibold">{p.stats.apg}</div><div className="text-xs">APG</div></div>
          <div><div className="text-lg font-semibold">{p.stats.pir}</div><div className="text-xs">PIR</div></div>
        </div>
        <div className="flex gap-2 mt-3">
          <Button size="sm" className="w-full" onClick={()=>onOpen(p)}><TrendingUp className="h-4 w-4 mr-2"/>Profile</Button>
          <Button size="sm" variant="secondary" onClick={()=>onCompareAdd(p)} className="w-full"><ArrowRightLeft className="h-4 w-4 mr-2"/>Compare</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PlayerProfile({ p, onClose }) {
  const radar = [
    { key: 'Shooting', value: p.attributes.shooting },
    { key: 'Rebounding', value: p.attributes.rebounding },
    { key: 'Playmaking', value: p.attributes.playmaking },
    { key: 'Defense', value: p.attributes.defense },
    { key: 'Mobility', value: p.attributes.mobility },
    { key: 'BBall IQ', value: p.attributes.bballIQ },
  ];
  return (
    <Dialog open={!!p} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{p.name} <Badge variant="outline">{p.position}</Badge></DialogTitle>
          <DialogDescription>{p.college} • {formatHeight(p.height)} • {p.weight}kg • {p.classYear}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Attribute Radar</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radar}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="key" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar dataKey="value" name={p.name} fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Key Stats</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div><div className="text-lg font-semibold">{p.stats.ppg}</div><div className="text-xs">PPG</div></div>
                  <div><div className="text-lg font-semibold">{p.stats.rpg}</div><div className="text-xs">RPG</div></div>
                  <div><div className="text-lg font-semibold">{p.stats.apg}</div><div className="text-xs">APG</div></div>
                  <div><div className="text-lg font-semibold">{p.stats.pir}</div><div className="text-xs">PIR</div></div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Scouting Report</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <div className="font-semibold">Strengths</div>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {p.strengths.map((s,i)=>(<li key={i}>{s}</li>))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold">Weaknesses</div>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {p.weaknesses.map((s,i)=>(<li key={i}>{s}</li>))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold">Potential for Improvement</div>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {p.improvement.map((s,i)=>(<li key={i}>{s}</li>))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold">Injury History</div>
                  <div className="text-muted-foreground">{p.injuryHistory}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="font-semibold">Estimated Contract</div>
                    <div className="text-muted-foreground">{p.estimatedContract}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Suitable Teams</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.suitableTeams.map((t,i)=>(<Badge variant="secondary" key={i}>{t}</Badge>))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Video</CardTitle></CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-xl">
                  <div className="w-full h-full grid place-items-center bg-slate-200">
                    <Button variant="secondary" onClick={() => openExternal(p.videoUrl)}>Open video</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Compare({ a, b }) {
  if (!a || !b) return (
    <Card>
      <CardHeader><CardTitle>Select two players to compare</CardTitle></CardHeader>
      <CardContent className="text-sm text-muted-foreground">Use the selectors above to choose players and visualize side-by-side metrics and attributes.</CardContent>
    </Card>
  );

  const barData = [
    { metric: 'PPG', [a.name]: a.stats.ppg, [b.name]: b.stats.ppg },
    { metric: 'RPG', [a.name]: a.stats.rpg, [b.name]: b.stats.rpg },
    { metric: 'APG', [a.name]: a.stats.apg, [b.name]: b.stats.apg },
    { metric: 'PIR', [a.name]: a.stats.pir, [b.name]: b.stats.pir },
    { metric: 'BLK', [a.name]: a.stats.blk, [b.name]: b.stats.blk },
    { metric: 'STL', [a.name]: a.stats.stl, [b.name]: b.stats.stl },
  ];

  const radar = (p) => ([
    { key: 'Shooting', value: p.attributes.shooting },
    { key: 'Rebounding', value: p.attributes.rebounding },
    { key: 'Playmaking', value: p.attributes.playmaking },
    { key: 'Defense', value: p.attributes.defense },
    { key: 'Mobility', value: p.attributes.mobility },
    { key: 'BBall IQ', value: p.attributes.bballIQ },
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Box Metrics</CardTitle></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={a.name} />
              <Bar dataKey={b.name} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>{a.name} – Attributes</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar(a)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="key" />
                <PolarRadiusAxis angle={30} domain={[0,100]} />
                <Radar dataKey="value" name={a.name} fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>{b.name} – Attributes</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar(b)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="key" />
                <PolarRadiusAxis angle={30} domain={[0,100]} />
                <Radar dataKey="value" name={b.name} fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("ai");
  const [prompt, setPrompt] = useState("");
  const [aiResults, setAiResults] = useState(players.slice(0,4));
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [compareA, setCompareA] = useState(null);
  const [compareB, setCompareB] = useState(null);
  const [metric, setMetric] = useState("ppg");
  const [onlySeniors, setOnlySeniors] = useState(true);

  useEffect(() => { runSelfTests(); }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setUser({ email: data.email });
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const filtered = useMemo(()=>{
    const base = onlySeniors ? players.filter(p=>p.classYear.toLowerCase()==="senior") : players;
    return base;
  }, [onlySeniors]);

  const tiers = useMemo(()=> tierByMetric(filtered, metric), [filtered, metric]);

  const runAIScout = () => {
    const res = simpleAISearch(prompt);
    setAiResults(res.slice(0,4)); // show 4 initially; more appear after search matches
  };

  const addToCompare = (p) => {
    if (!compareA) setCompareA(p); else if (!compareB && p.id !== compareA.id) setCompareB(p);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 to-slate-100">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">NCAA Scout – Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input name="email" type="email" required placeholder="you@team.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <Input name="password" type="password" required placeholder="••••••••" />
              </div>
              <Button className="w-full" type="submit">Continue</Button>
              <div className="text-xs text-muted-foreground text-center">Demo login – any email/password works.</div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onLogout={handleLogout} user={user} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="ai" className="gap-2"><Wand2 className="h-4 w-4"/> AI Scout</TabsTrigger>
            <TabsTrigger value="stats" className="gap-2"><BarChart3 className="h-4 w-4"/> Stats</TabsTrigger>
            <TabsTrigger value="news" className="gap-2"><Newspaper className="h-4 w-4"/> News</TabsTrigger>
            <TabsTrigger value="compare" className="gap-2"><ArrowRightLeft className="h-4 w-4"/> Compare</TabsTrigger>
          </TabsList>

          {/* AI SCOUT */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2"><Search className="h-5 w-5"/>Ask for a player type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-[1fr_auto] gap-3">
                  <Input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="e.g., Need a switchable wing who shoots 38%+ from three and can pass in PnR" />
                  <Button onClick={runAIScout} className="gap-2"><Wand2 className="h-4 w-4"/> Find matches</Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Examples: “defensive PG who can pressure the ball”, “rim protector big with short-roll passing”, “movement shooter wing”.</div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-4 gap-4">
              {aiResults.map((p) => (
                <div key={p.id}>
                  <PlayerCard p={p} onOpen={setSelectedPlayer} onCompareAdd={addToCompare} />
                  {p.aiScore !== undefined && (
                    <div className="text-xs text-muted-foreground mt-1">AI match score: <span className="font-medium">{p.aiScore}</span></div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={()=> setAiResults(simpleAISearch(prompt).slice(0,8))}>Show more results</Button>
            </div>
          </TabsContent>

          {/* STATS */}
          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardContent className="pt-6 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Metric</span>
                  <Select value={metric} onValueChange={setMetric}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Select metric"/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ppg">Points</SelectItem>
                      <SelectItem value="apg">Assists</SelectItem>
                      <SelectItem value="rpg">Rebounds</SelectItem>
                      <SelectItem value="pir">PIR index</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Checkbox id="seniors" checked={onlySeniors} onCheckedChange={(v)=> setOnlySeniors(!!v)} />
                  <label htmlFor="seniors">Only seniors</label>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm font-semibold mb-2">Top tier</div>
                <div className="grid gap-3">
                  {tiers.top.map(p => (
                    <PlayerCard key={p.id} p={p} onOpen={setSelectedPlayer} onCompareAdd={addToCompare} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Mid tier</div>
                <div className="grid gap-3">
                  {tiers.mid.map(p => (
                    <PlayerCard key={p.id} p={p} onOpen={setSelectedPlayer} onCompareAdd={addToCompare} />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Develop / rest</div>
                <div className="grid gap-3">
                  {tiers.rest.map(p => (
                    <PlayerCard key={p.id} p={p} onOpen={setSelectedPlayer} onCompareAdd={addToCompare} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* NEWS */}
          <TabsContent value="news">
            <div className="grid md:grid-cols-3 gap-6">
              {news.map((n) => (
                <Card key={n.id} className="hover:shadow-lg transition">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{n.tag}</Badge>
                      <div className="text-xs text-muted-foreground">{n.date}</div>
                    </div>
                    <CardTitle className="text-base">{n.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-muted-foreground">{n.summary}</div>
                    <div className="aspect-video w-full overflow-hidden rounded-xl">
                      <div className="w-full h-full grid place-items-center bg-slate-200">
                        <Button variant="secondary" onClick={() => openExternal(n.videoUrl)}>Open video</Button>
                      </div>
                    </div>
                    <Button variant="ghost" className="gap-2 w-full">Open analysis <ChevronRight className="h-4 w-4"/></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* COMPARE */}
          <TabsContent value="compare" className="space-y-4">
            <Card>
              <CardContent className="pt-6 grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm mb-1">Player A</div>
                  <Select value={compareA?.id} onValueChange={(id)=> setCompareA(players.find(p=>p.id===id))}>
                    <SelectTrigger><SelectValue placeholder="Select player"/></SelectTrigger>
                    <SelectContent className="max-h-64">
                      {players.map(p => (<SelectItem key={p.id} value={p.id}>{p.name} • {p.college}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="text-sm mb-1">Player B</div>
                  <Select value={compareB?.id} onValueChange={(id)=> setCompareB(players.find(p=>p.id===id))}>
                    <SelectTrigger><SelectValue placeholder="Select player"/></SelectTrigger>
                    <SelectContent className="max-h-64">
                      {players.map(p => (<SelectItem key={p.id} value={p.id}>{p.name} • {p.college}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            <Compare a={compareA} b={compareB} />
          </TabsContent>
        </Tabs>
      </main>

      {selectedPlayer && (
        <PlayerProfile p={selectedPlayer} onClose={()=>setSelectedPlayer(null)} />
      )}
    </div>
  );
}
