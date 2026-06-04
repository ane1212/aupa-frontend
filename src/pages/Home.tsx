import { Bell, Guitar, MapPin, Paintbrush, PersonStanding, Sun } from "lucide-react";
import logo from "../assets/logo-trimmed.png";
import {
  ExperienceCard,
  LocalPickCard,
  RecommendationCard,
  SectionHeader,
} from "../components/home";

const recommendations = [
  { title: "Walk through Casco Viejo", distance: "12 min away", score: 96 },
  { title: "Hidden pintxo bar", distance: "8 min away", score: 94 },
  { title: "Best river view locals actually use", distance: "15 min away", score: 91 },
];

const localPicks = [
  { name: "Bar El Globo", category: "Pintxos", distance: "400m" },
  { name: "La Vina del Ensanche", category: "Wine bar", distance: "600m" },
  { name: "Kafe Antzokia", category: "Cafe", distance: "600m" },
];

const experiences = [
  { icon: Guitar, label: "Live music" },
  { icon: Paintbrush, label: "Local art" },
  { icon: PersonStanding, label: "Walking route" },
];

const Home = () => {
  return (
    <div className="home">
      <header className="home-hero">
        <div className="home-topbar">
          <img className="logo" src={logo} alt="Aupa" />
          <button className="icon-button" type="button" aria-label="Notifications">
            <Bell size={24} fill="currentColor" />
          </button>
        </div>

        <h1>Aupa, Jovian!</h1>
        <p>Ready to live like basque today?</p>

        <div className="home-meta">
          <span>
            <MapPin size={18} fill="currentColor" />
            Bilbao
          </span>
          <span>
            <Sun size={18} />
            18°C
          </span>
        </div>
      </header>

      <section className="home-section">
        <SectionHeader title="Recommended right now" />
        <div className="recommendation-list">
          {recommendations.map((item) => (
            <RecommendationCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeader title="Local top picks" actionLabel="See all" />
        <div className="local-picks-grid">
          {localPicks.map((item) => (
            <LocalPickCard key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeader title="Experiences for you" actionLabel="See all" />
        <div className="experience-list">
          {experiences.map((item) => (
            <ExperienceCard key={item.label} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
