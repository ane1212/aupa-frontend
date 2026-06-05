import type { LanguageType } from '../services/models';

export const LANGUAGE_NAMES: Record<LanguageType, string> = {
  en: 'English',
  es: 'Español',
  eu: 'Euskera',
  fr: 'Français',
};

export type AppCopy = {
  nav: {
    home: string;
    nearby: string;
    experiences: string;
    saved: string;
    profile: string;
  };
  home: {
    titleSuffix: string;
    subtitle: string;
    location: string;
    recommended: string;
    topPicks: string;
    experiences: string;
    seeAll: string;
  };
  profile: {
    title: string;
    language: string;
    edit: string;
    save: string;
    cancel: string;
    preferences: string;
    noPreferences: string;
    interests: string;
    duration: string;
    travelWith: string;
    partnerTitle: string;
    partnerSubtitle: string;
    logout: string;
  };
  onboarding: {
    introTitle: string;
    introSubtitle: string;
    step1Title: string;
    step1Subtitle: string;
    step1Next: string;
    step2Title: string;
    step2Subtitle: string;
    step2Next: string;
    step3Title: string;
    step3Subtitle: string;
    step3Next: string;
    step4Title: string;
    step4Subtitle: string;
    step4Skip: string;
    step4Finish: string;
  };
};

export const APP_COPY: Record<LanguageType, AppCopy> = {
  en: {
    nav: { home: 'Home', nearby: 'Nearby', experiences: 'Experiences', saved: 'Saved', profile: 'Profile' },
    home: {
      titleSuffix: 'there',
      subtitle: 'Ready to live like basque today?',
      location: 'Bilbao',
      recommended: 'Recommended right now',
      topPicks: 'Local top picks',
      experiences: 'Experiences for you',
      seeAll: 'See all',
    },
    profile: {
      title: 'Profile',
      language: 'Language',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      preferences: 'Your preferences',
      noPreferences: 'No preferences saved yet.',
      interests: 'Interests',
      duration: 'Duration',
      travelWith: 'Travel companion',
      partnerTitle: 'Become a local partner!',
      partnerSubtitle: 'Promote your local business on Aupa!',
      logout: 'Log out',
    },
    onboarding: {
      introTitle: "Let's get you started",
      introSubtitle: 'Tell us a bit about yourself',
      step1Title: 'Choose your language',
      step1Subtitle: 'You can change this in the Settings',
      step1Next: 'Next',
      step2Title: 'What are you looking for?',
      step2Subtitle: 'Choose maximum of 3',
      step2Next: 'Next',
      step3Title: 'How long are you staying?',
      step3Subtitle: 'Choose only 1',
      step3Next: 'Next',
      step4Title: 'Who are you traveling with?',
      step4Subtitle: 'Choose only 1',
      step4Skip: 'Skip',
      step4Finish: 'Finish',
    },
  },
  es: {
    nav: { home: 'Inicio', nearby: 'Cerca', experiences: 'Experiencias', saved: 'Guardado', profile: 'Perfil' },
    home: {
      titleSuffix: 'ahí',
      subtitle: '¿Listo para vivir como un local hoy?',
      location: 'Bilbao',
      recommended: 'Recomendado ahora',
      topPicks: 'Favoritos locales',
      experiences: 'Experiencias para ti',
      seeAll: 'Ver todo',
    },
    profile: {
      title: 'Perfil',
      language: 'Idioma',
      edit: 'Editar',
      save: 'Guardar',
      cancel: 'Cancelar',
      preferences: 'Tus preferencias',
      noPreferences: 'Todavía no hay preferencias guardadas.',
      interests: 'Intereses',
      duration: 'Duración',
      travelWith: 'Compañía de viaje',
      partnerTitle: '¡Conviértete en socio local!',
      partnerSubtitle: 'Promociona tu negocio local en Aupa!',
      logout: 'Cerrar sesión',
    },
    onboarding: {
      introTitle: 'Vamos a empezar',
      introSubtitle: 'Cuéntanos un poco sobre ti',
      step1Title: 'Elige tu idioma',
      step1Subtitle: 'Puedes cambiarlo más tarde en ajustes',
      step1Next: 'Siguiente',
      step2Title: '¿Qué estás buscando?',
      step2Subtitle: 'Elige un máximo de 3',
      step2Next: 'Siguiente',
      step3Title: '¿Cuánto tiempo te quedas?',
      step3Subtitle: 'Elige solo 1',
      step3Next: 'Siguiente',
      step4Title: '¿Con quién viajas?',
      step4Subtitle: 'Elige solo 1',
      step4Skip: 'Saltar',
      step4Finish: 'Finalizar',
    },
  },
  eu: {
    nav: { home: 'Hasiera', nearby: 'Inguruak', experiences: 'Esperientziak', saved: 'Gordeta', profile: 'Profila' },
    home: {
      titleSuffix: 'hor',
      subtitle: 'Prest zaude gaur bertako bezala bizitzeko?',
      location: 'Bilbo',
      recommended: 'Orain gomendatua',
      topPicks: 'Tokiko aukerak',
      experiences: 'Zuretzako esperientziak',
      seeAll: 'Ikusi guztia',
    },
    profile: {
      title: 'Profila',
      language: 'Hizkuntza',
      edit: 'Editatu',
      save: 'Gorde',
      cancel: 'Utzi',
      preferences: 'Zure lehentasunak',
      noPreferences: 'Oraindik ez dago lehentasunik gordeta.',
      interests: 'Interesak',
      duration: 'Iraupena',
      travelWith: 'Bidaia-laguna',
      partnerTitle: 'Bihurtu tokiko bazkide!',
      partnerSubtitle: 'Sustatu zure negozio lokala Aupan!',
      logout: 'Saioa itxi',
    },
    onboarding: {
      introTitle: 'Has gaitezen',
      introSubtitle: 'Kontatu zerbait zure buruz',
      step1Title: 'Hautatu zure hizkuntza',
      step1Subtitle: 'Gero ezarpenetan alda dezakezu',
      step1Next: 'Hurrengoa',
      step2Title: 'Zer bilatzen ari zara?',
      step2Subtitle: 'Hautatu gehienez 3',
      step2Next: 'Hurrengoa',
      step3Title: 'Zenbat denbora geratuko zara?',
      step3Subtitle: 'Hautatu bakarra',
      step3Next: 'Hurrengoa',
      step4Title: 'Norekin bidaiatzen duzu?',
      step4Subtitle: 'Hautatu bakarra',
      step4Skip: 'Saltatu',
      step4Finish: 'Amaitu',
    },
  },
  fr: {
    nav: { home: 'Accueil', nearby: 'Autour', experiences: 'Expériences', saved: 'Enregistré', profile: 'Profil' },
    home: {
      titleSuffix: 'là',
      subtitle: 'Prêt à vivre comme un local aujourd’hui ?',
      location: 'Bilbao',
      recommended: 'Recommandé maintenant',
      topPicks: 'Coups de cœur locaux',
      experiences: 'Expériences pour vous',
      seeAll: 'Voir tout',
    },
    profile: {
      title: 'Profil',
      language: 'Langue',
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler',
      preferences: 'Vos préférences',
      noPreferences: 'Aucune préférence enregistrée pour le moment.',
      interests: 'Centres d’intérêt',
      duration: 'Durée',
      travelWith: 'Compagnon de voyage',
      partnerTitle: 'Devenir partenaire local !',
      partnerSubtitle: 'Faites connaître votre entreprise sur Aupa !',
      logout: 'Se déconnecter',
    },
    onboarding: {
      introTitle: 'Commençons',
      introSubtitle: 'Parlez-nous un peu de vous',
      step1Title: 'Choisissez votre langue',
      step1Subtitle: 'Vous pouvez la changer plus tard dans les paramètres',
      step1Next: 'Suivant',
      step2Title: 'Que recherchez-vous ?',
      step2Subtitle: 'Choisissez 3 maximum',
      step2Next: 'Suivant',
      step3Title: 'Combien de temps restez-vous ?',
      step3Subtitle: 'Choisissez-en 1',
      step3Next: 'Suivant',
      step4Title: 'Avec qui voyagez-vous ?',
      step4Subtitle: 'Choisissez-en 1',
      step4Skip: 'Passer',
      step4Finish: 'Terminer',
    },
  },
};

export const getAppCopy = (language?: string | null) => {
  return (language && language in APP_COPY ? APP_COPY[language as LanguageType] : APP_COPY.en);
};
