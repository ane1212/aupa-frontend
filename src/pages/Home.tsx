import { Bell, Guitar, MapPin, Paintbrush, PersonStanding, Sun, type LucideIcon } from 'lucide-react';
import logo from '../assets/logo-trimmed.png';
import {
  ExperienceCard,
  LocalPickCard,
  RecommendationCard,
  SectionHeader,
} from '../components/home';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import type { LanguageType } from '../services/models';

const homeContent: Record<LanguageType, {
  recommendations: { title: string; distance: string; score: number }[];
  localPicks: { name: string; category: string; distance: string }[];
  experiences: { icon: LucideIcon; label: string }[];
}> = {
  en: {
    recommendations: [
      { title: 'Walk through Casco Viejo', distance: '12 min away', score: 96 },
      { title: 'Hidden pintxo bar', distance: '8 min away', score: 94 },
      { title: 'Best river view locals actually use', distance: '15 min away', score: 91 },
    ],
    localPicks: [
      { name: 'Bar El Globo', category: 'Pintxos', distance: '400m' },
      { name: 'La Vina del Ensanche', category: 'Wine bar', distance: '600m' },
      { name: 'Kafe Antzokia', category: 'Cafe', distance: '600m' },
    ],
    experiences: [
      { icon: Guitar, label: 'Live music' },
      { icon: Paintbrush, label: 'Local art' },
      { icon: PersonStanding, label: 'Walking route' },
    ],
  },
  es: {
    recommendations: [
      { title: 'Pasea por el Casco Viejo', distance: 'A 12 min', score: 96 },
      { title: 'Bar de pintxos escondido', distance: 'A 8 min', score: 94 },
      { title: 'La mejor vista al río que usan los locales', distance: 'A 15 min', score: 91 },
    ],
    localPicks: [
      { name: 'Bar El Globo', category: 'Pintxos', distance: '400m' },
      { name: 'La Viña del Ensanche', category: 'Bar de vino', distance: '600m' },
      { name: 'Kafe Antzokia', category: 'Café', distance: '600m' },
    ],
    experiences: [
      { icon: Guitar, label: 'Música en vivo' },
      { icon: Paintbrush, label: 'Arte local' },
      { icon: PersonStanding, label: 'Ruta a pie' },
    ],
  },
  eu: {
    recommendations: [
      { title: 'Paseatu Casco Viejo barruan', distance: '12 minera', score: 96 },
      { title: 'Ezkutuko pintxo taberna', distance: '8 minera', score: 94 },
      { title: 'Tokikoek erabiltzen duten ibai-ikuspegia', distance: '15 minera', score: 91 },
    ],
    localPicks: [
      { name: 'Bar El Globo', category: 'Pintxoak', distance: '400m' },
      { name: 'La Viña del Ensanche', category: 'Ardo-taberna', distance: '600m' },
      { name: 'Kafe Antzokia', category: 'Kafea', distance: '600m' },
    ],
    experiences: [
      { icon: Guitar, label: 'Zuzeneko musika' },
      { icon: Paintbrush, label: 'Arte lokala' },
      { icon: PersonStanding, label: 'Oinezko ibilbidea' },
    ],
  },
  fr: {
    recommendations: [
      { title: 'Se promener dans le Casco Viejo', distance: 'À 12 min', score: 96 },
      { title: 'Bar à pintxos caché', distance: 'À 8 min', score: 94 },
      { title: 'La meilleure vue sur la rivière utilisée par les locaux', distance: 'À 15 min', score: 91 },
    ],
    localPicks: [
      { name: 'Bar El Globo', category: 'Pintxos', distance: '400m' },
      { name: 'La Viña del Ensanche', category: 'Bar à vin', distance: '600m' },
      { name: 'Kafe Antzokia', category: 'Café', distance: '600m' },
    ],
    experiences: [
      { icon: Guitar, label: 'Musique live' },
      { icon: Paintbrush, label: 'Art local' },
      { icon: PersonStanding, label: 'Balade à pied' },
    ],
  },
};

const Home = () => {
  const { user } = useAuth();
  const copy = getAppCopy(user?.language);
  const locale = (user?.language ?? 'en') as LanguageType;
  const content = homeContent[locale] ?? homeContent.en;

  return (
    <div className="home">
      <header className="home-hero">
        <div className="home-topbar">
          <img className="logo" src={logo} alt="Aupa" />
          <NotificationPanel />
        </div>

        <h1>Aupa, {user?.name ?? copy.home.titleSuffix}!</h1>
        <p>{copy.home.subtitle}</p>

        <div className="home-meta">
          <span>
            <MapPin size={18} fill="currentColor" />
            {copy.home.location}
          </span>
          <span>
            <Sun size={18} />
            18°C
          </span>
        </div>
      </header>

      <section className="home-section">
        <SectionHeader title={copy.home.recommended} />
        <div className="recommendation-list">
          {content.recommendations.map((item) => (
            <RecommendationCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeader title={copy.home.topPicks} actionLabel={copy.home.seeAll} />
        <div className="local-picks-grid">
          {content.localPicks.map((item) => (
            <LocalPickCard key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeader title={copy.home.experiences} actionLabel={copy.home.seeAll} />
        <div className="experience-list">
          {content.experiences.map((item) => (
            <ExperienceCard key={item.label} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
