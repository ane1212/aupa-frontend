import { useState, useEffect } from 'react';
import { MapPin, Sun } from 'lucide-react';
import { fastapiService } from '../services/API';
import { getUserLocation, TEST_LOCATION } from '../utils/location';
import { getCategoryImage } from '../utils/categoryImages';
import { generateRandomScore } from '../utils/randomScore';
import { getWeather, getLocationFromCoords} from '../utils/weather';
import { getAppCategoryFromSubcategory } from '../utils/categoryMapper';
import logo from '../assets/logo-trimmed.png';
import {
  RecommendationCard,
  SectionHeader,
  LocalPickCard,
} from '../components/home';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import type { LanguageType } from '../services/models';
import NotificationPanel from '../components/layout/NotificationPanel';


const Home = () => {
  const { user } = useAuth();
  const copy = getAppCopy(user?.language);
  const locale = (user?.language ?? 'en') as LanguageType;

  const [recommendations, setRecommendations] = useState<{
    title: string;
    distance: string;
    score: number;
  }[]>([]);


  const [localPicks, setLocalPicks] = useState<{
    name: string;
    category: string;
    distance: string;
    image: string;
  }[]>([]);


  const [loading, setLoading] = useState(true);


  const [weather, setWeather] = useState({ temperature: 0, unit: '°C' });
  const [locationName, setLocationName] = useState('Paris');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await getUserLocation() ?? TEST_LOCATION;
        
        const [weatherData, locationData] = await Promise.all([
          getWeather(location.lat, location.lng),
          getLocationFromCoords(location.lat, location.lng),
        ]);
        
        setWeather(weatherData);
        setLocationName(locationData.city || locationData.name.split(',')[0]);

        const nearestResponse = await fastapiService.nearest(location.lat, location.lng, 12);
        const nearestRecs = nearestResponse.recommendations || [];


        setRecommendations(nearestRecs.slice(0, 6).map(rec => ({
          title: rec.name,
          distance: `${Math.floor((rec as any).distance_from_user || 0)}m away`,
          score: generateRandomScore(),
        })));


        setLocalPicks(nearestRecs.slice(6, 12).map(rec => ({
          name: rec.name,
          category: getAppCategoryFromSubcategory(rec.category),
          distance: `${Math.floor((rec as any).distance_from_user || 0)}m`,
          image: getCategoryImage(rec.category),
        })));


      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, []);




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
            {locationName}
          </span>
          <span>
            <Sun size={18} />
            {weather.temperature}{weather.unit}
          </span>
        </div>
      </header>

      <section className="home-section">
        <SectionHeader title={copy.home.recommended} />
        <div className="recommendation-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            recommendations.map((item, index) => (
              <RecommendationCard key={`${item.title}-${index}`} {...item} />
            ))
          )}
        </div>
      </section>

      <section className="home-section">
        <SectionHeader title={copy.home.topPicks} actionLabel={copy.home.seeAll} />
        <div className="local-picks-grid">
          {loading ? (
            <p>Loading...</p>
          ) : (
            localPicks.map((item, index) => (
              <LocalPickCard 
                key={`${item.name}-${index}`} 
                name={item.name} 
                category={item.category} 
                distance={item.distance}
                image={item.image}
              />
            ))
          )}
        </div>
      </section>

    </div>
  );
};


export default Home;