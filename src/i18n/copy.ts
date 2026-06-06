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
  nearby: {
    title: string;
    searchPlaceholder: string;
  };
  experiences: {
    browseByVibe: string;
    topExperiences: string;
    noResults: string;
    searchPlaceholder: string;
  };
  saved: {
    title: string;
    tabSaved: string;
    tabTrip: string;
    filterAll: string;
    filterPlaces: string;
    filterFood: string;
    filterBars: string;
    tripProgress: string;
    tripCompleted: string;
    viewOnMaps: string;
    delete: string;
    moveToSaved: string;
    noItems: string;
    catFood: string;
    catBars: string;
    catExperiences: string;
    catPlaces: string;
  };
  detail: {
    localScore: string;
    stop: string;
    stops: string;
    budget: string;
    youllVisit: string;
    save: string;
    addToTrip: string;
    notFound: string;
  };
  localPartner: {
    introTitle: string;
    introSubtitle: string;
    benefit1Title: string; benefit1Desc: string;
    benefit2Title: string; benefit2Desc: string;
    benefit3Title: string; benefit3Desc: string;
    categoryTitle: string;
    categorySubtitle: string;
    categorySpecify: string;
    catRestaurant: string; catBars: string; catCoffeeShop: string;
    catMuseum: string; catAttraction: string; catShops: string; catOther: string;
    infoTitle: string;
    infoSubtitle: string;
    fieldName: string; fieldNamePlaceholder: string;
    fieldAddress: string; fieldAddressPlaceholder: string;
    fieldPhone: string; fieldPhonePlaceholder: string;
    fieldWebsite: string; fieldWebsitePlaceholder: string;
    fieldDesc: string; fieldDescPlaceholder: string;
    verifyTitle: string;
    verifySubtitle: string;
    verifyUploadLabel: string;
    verifyReviewNote: string;
    successTitle: string;
    successDesc1: string;
    successDesc2: string;
    successBackHome: string;
    continue: string;
    errorConflict: string;
    errorGeneral: string;
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
    nearby: {
      title: 'Places near you',
      searchPlaceholder: 'Where do you want to go?',
    },
    experiences: {
      browseByVibe: 'Browse by vibe',
      topExperiences: 'Top experiences',
      noResults: 'No experiences found.',
      searchPlaceholder: 'Search experiences',
    },
    saved: {
      title: 'Saved',
      tabSaved: 'Saved',
      tabTrip: 'My Trip',
      filterAll: 'All',
      filterPlaces: 'Places',
      filterFood: 'Food',
      filterBars: 'Bars',
      tripProgress: 'Your Trip Progress',
      tripCompleted: '{count} of {total} completed',
      viewOnMaps: 'View on maps',
      delete: 'Delete',
      moveToSaved: 'Move to Saved',
      noItems: 'No items saved in this category.',
      catFood: 'FOOD',
      catBars: 'BARS',
      catExperiences: 'EXPERIENCES',
      catPlaces: 'PLACES',
    },
    detail: {
      localScore: 'Local Score',
      stop: 'stop',
      stops: 'stops',
      budget: 'Budget',
      youllVisit: "You'll visit",
      save: 'Save',
      addToTrip: 'Add to My Trip',
      notFound: 'Item not found',
    },
    localPartner: {
      introTitle: 'Why become a Local Partner?',
      introSubtitle: 'Join Aupa Partners and unlock tools to grow your business.',
      benefit1Title: 'Showcase your business', benefit1Desc: 'Appear in local experiences and search results.',
      benefit2Title: 'Reach more travelers', benefit2Desc: 'Connect with thousands of people visiting Bilbao.',
      benefit3Title: 'Get valuable insights', benefit3Desc: 'Track views, saves and customer engagements.',
      categoryTitle: 'What best describes you?',
      categorySubtitle: 'Choose the category that fits your business or organization.',
      categorySpecify: 'Specify:',
      catRestaurant: 'Restaurant', catBars: 'Bars', catCoffeeShop: 'Coffee Shop',
      catMuseum: 'Museum', catAttraction: 'Attraction', catShops: 'Shops', catOther: 'Other',
      infoTitle: 'Tell us about your business',
      infoSubtitle: 'This information will appear on your partner profile.',
      fieldName: 'Business name', fieldNamePlaceholder: 'Bar El Globo',
      fieldAddress: 'Address', fieldAddressPlaceholder: 'Casco Viejo, Bilbao',
      fieldPhone: 'Phone number', fieldPhonePlaceholder: '+ 34 600 968 685',
      fieldWebsite: 'Website', fieldWebsitePlaceholder: 'www.barelglobo.com',
      fieldDesc: 'Short description', fieldDescPlaceholder: 'Describe your business…',
      verifyTitle: 'Verify your business',
      verifySubtitle: 'Help us verify that you are the owner or representative of this business.',
      verifyUploadLabel: 'Upload proof of ownership',
      verifyReviewNote: 'Your application will be reviewed within 2-3 business days.',
      successTitle: 'Application Submitted',
      successDesc1: 'Thank you for applying to become an Aupa! partner.',
      successDesc2: 'We will review your information and notify you once your account has been approved.',
      successBackHome: 'Back to Home',
      continue: 'Continue',
      errorConflict: 'You already have a registered or pending business.',
      errorGeneral: 'There was an error submitting the form. Please try again.',
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
    nearby: {
      title: 'Lugares cerca de ti',
      searchPlaceholder: '¿A dónde quieres ir?',
    },
    experiences: {
      browseByVibe: 'Explorar por ambiente',
      topExperiences: 'Mejores experiencias',
      noResults: 'No se encontraron experiencias.',
      searchPlaceholder: 'Buscar experiencias',
    },
    saved: {
      title: 'Guardado',
      tabSaved: 'Guardado',
      tabTrip: 'Mi viaje',
      filterAll: 'Todo',
      filterPlaces: 'Lugares',
      filterFood: 'Comida',
      filterBars: 'Bares',
      tripProgress: 'Progreso de tu viaje',
      tripCompleted: '{count} de {total} completados',
      viewOnMaps: 'Ver en mapa',
      delete: 'Eliminar',
      moveToSaved: 'Mover a guardados',
      noItems: 'No hay elementos guardados en esta categoría.',
      catFood: 'COMIDA',
      catBars: 'BARES',
      catExperiences: 'EXPERIENCIAS',
      catPlaces: 'LUGARES',
    },
    detail: {
      localScore: 'Puntuación local',
      stop: 'parada',
      stops: 'paradas',
      budget: 'Presupuesto',
      youllVisit: 'Visitarás',
      save: 'Guardar',
      addToTrip: 'Añadir a mi viaje',
      notFound: 'Elemento no encontrado',
    },
    localPartner: {
      introTitle: '¿Por qué ser Local Partner?',
      introSubtitle: 'Únete a Aupa Partners y desbloquea herramientas para hacer crecer tu negocio.',
      benefit1Title: 'Muestra tu negocio', benefit1Desc: 'Aparece en experiencias locales y resultados de búsqueda.',
      benefit2Title: 'Llega a más viajeros', benefit2Desc: 'Conéctate con miles de personas que visitan Bilbao.',
      benefit3Title: 'Obtén información valiosa', benefit3Desc: 'Rastrea visitas, guardados e interacciones con clientes.',
      categoryTitle: '¿Qué te describe mejor?',
      categorySubtitle: 'Elige la categoría que mejor se adapte a tu negocio u organización.',
      categorySpecify: 'Especifica:',
      catRestaurant: 'Restaurante', catBars: 'Bares', catCoffeeShop: 'Cafetería',
      catMuseum: 'Museo', catAttraction: 'Atracción', catShops: 'Tiendas', catOther: 'Otro',
      infoTitle: 'Cuéntanos sobre tu negocio',
      infoSubtitle: 'Esta información aparecerá en tu perfil de socio.',
      fieldName: 'Nombre del negocio', fieldNamePlaceholder: 'Bar El Globo',
      fieldAddress: 'Dirección', fieldAddressPlaceholder: 'Casco Viejo, Bilbao',
      fieldPhone: 'Teléfono', fieldPhonePlaceholder: '+ 34 600 968 685',
      fieldWebsite: 'Sitio web', fieldWebsitePlaceholder: 'www.barelglobo.com',
      fieldDesc: 'Descripción corta', fieldDescPlaceholder: 'Describe tu negocio…',
      verifyTitle: 'Verifica tu negocio',
      verifySubtitle: 'Ayúdanos a verificar que eres el propietario o representante de este negocio.',
      verifyUploadLabel: 'Sube prueba de propiedad',
      verifyReviewNote: 'Tu solicitud será revisada en 2-3 días hábiles.',
      successTitle: 'Solicitud enviada',
      successDesc1: 'Gracias por solicitar convertirte en socio de Aupa!.',
      successDesc2: 'Revisaremos tu información y te avisaremos cuando tu cuenta sea aprobada.',
      successBackHome: 'Volver al inicio',
      continue: 'Continuar',
      errorConflict: 'Ya tienes un local registrado o pendiente de verificación.',
      errorGeneral: 'Hubo un error al enviar el formulario. Inténtalo de nuevo.',
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
    nearby: {
      title: 'Inguruko lekuak',
      searchPlaceholder: 'Nora joan nahi duzu?',
    },
    experiences: {
      browseByVibe: 'Aurkitu giroaren arabera',
      topExperiences: 'Esperientzia onenak',
      noResults: 'Ez da esperientziarik aurkitu.',
      searchPlaceholder: 'Bilatu esperientziak',
    },
    saved: {
      title: 'Gordeta',
      tabSaved: 'Gordeta',
      tabTrip: 'Nire bidaia',
      filterAll: 'Guztiak',
      filterPlaces: 'Lekuak',
      filterFood: 'Janaria',
      filterBars: 'Taberna',
      tripProgress: 'Zure bidaiaren aurrerapena',
      tripCompleted: '{count}/{total} osatu',
      viewOnMaps: 'Ikusi mapan',
      delete: 'Ezabatu',
      moveToSaved: 'Gorde',
      noItems: 'Ez dago kategoria honetan gordeta.',
      catFood: 'JANARIA',
      catBars: 'TABERNA',
      catExperiences: 'ESPERIENTZIAK',
      catPlaces: 'LEKUAK',
    },
    detail: {
      localScore: 'Tokiko puntuazioa',
      stop: 'geldialdia',
      stops: 'geldialdiak',
      budget: 'Aurrekontua',
      youllVisit: 'Bisitatuko duzu',
      save: 'Gorde',
      addToTrip: 'Nire bidaian gehitu',
      notFound: 'Ez da aurkitu',
    },
    localPartner: {
      introTitle: 'Zergatik tokiko bazkide bihurtu?',
      introSubtitle: 'Sartu Aupa Partners-en eta desblokeatu tresnak zure negozioa hazteko.',
      benefit1Title: 'Erakutsi zure negozioa', benefit1Desc: 'Agertu tokiko esperientzietan eta bilaketa-emaitzetan.',
      benefit2Title: 'Bidaiari gehiagora iritsi', benefit2Desc: 'Lotu Bilbo bisitatzen duten milaka pertsonarekin.',
      benefit3Title: 'Lortu informazio baliotsua', benefit3Desc: 'Jarraitu bisitei, gordaketei eta bezero-interakzioei.',
      categoryTitle: 'Zerk deskribatzen zaitu hobekien?',
      categorySubtitle: 'Aukeratu zure negozio edo erakundeari egokitzen zaion kategoria.',
      categorySpecify: 'Zehaztu:',
      catRestaurant: 'Jatetxea', catBars: 'Taberna', catCoffeeShop: 'Kafetegia',
      catMuseum: 'Museoa', catAttraction: 'Erakarpena', catShops: 'Dendak', catOther: 'Beste bat',
      infoTitle: 'Kontatu zure negozioari buruz',
      infoSubtitle: 'Informazio hau zure bazkide-profilean agertuko da.',
      fieldName: 'Negozioaren izena', fieldNamePlaceholder: 'Bar El Globo',
      fieldAddress: 'Helbidea', fieldAddressPlaceholder: 'Casco Viejo, Bilbao',
      fieldPhone: 'Telefono-zenbakia', fieldPhonePlaceholder: '+ 34 600 968 685',
      fieldWebsite: 'Webgunea', fieldWebsitePlaceholder: 'www.barelglobo.com',
      fieldDesc: 'Deskripzio laburra', fieldDescPlaceholder: 'Deskribatu zure negozioa…',
      verifyTitle: 'Egiaztatu zure negozioa',
      verifySubtitle: 'Lagundu iezaguzu egiaztazen negozio honen jabea edo ordezkaria zarela.',
      verifyUploadLabel: 'Igo jabetza-frogagiria',
      verifyReviewNote: 'Zure eskaerak 2-3 lan-egunetan aztertuko da.',
      successTitle: 'Eskaera bidalia',
      successDesc1: 'Eskerrik asko Aupa! bazkide bihurtzeko eskaera egiteagatik.',
      successDesc2: 'Zure informazioa aztertuko dugu eta jakinaraziko dizugu zure kontua onartu denean.',
      successBackHome: 'Hasierara itzuli',
      continue: 'Jarraitu',
      errorConflict: 'Jadanik badaukazu erregistratutako edo egiaztapen zain dagoen negozio bat.',
      errorGeneral: 'Errorea formularioa bidaltzean. Saiatu berriz.',
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
    nearby: {
      title: 'Lieux près de vous',
      searchPlaceholder: 'Où voulez-vous aller ?',
    },
    experiences: {
      browseByVibe: 'Parcourir par ambiance',
      topExperiences: 'Meilleures expériences',
      noResults: 'Aucune expérience trouvée.',
      searchPlaceholder: 'Rechercher des expériences',
    },
    saved: {
      title: 'Enregistré',
      tabSaved: 'Enregistré',
      tabTrip: 'Mon voyage',
      filterAll: 'Tout',
      filterPlaces: 'Lieux',
      filterFood: 'Nourriture',
      filterBars: 'Bars',
      tripProgress: 'Progression de votre voyage',
      tripCompleted: '{count} sur {total} complété(s)',
      viewOnMaps: 'Voir sur la carte',
      delete: 'Supprimer',
      moveToSaved: 'Déplacer vers Enregistré',
      noItems: 'Aucun élément dans cette catégorie.',
      catFood: 'NOURRITURE',
      catBars: 'BARS',
      catExperiences: 'EXPÉRIENCES',
      catPlaces: 'LIEUX',
    },
    detail: {
      localScore: 'Score local',
      stop: 'arrêt',
      stops: 'arrêts',
      budget: 'Budget',
      youllVisit: 'Vous visiterez',
      save: 'Enregistrer',
      addToTrip: 'Ajouter à mon voyage',
      notFound: 'Élément introuvable',
    },
    localPartner: {
      introTitle: 'Pourquoi devenir Local Partner ?',
      introSubtitle: 'Rejoignez Aupa Partners et accédez à des outils pour développer votre activité.',
      benefit1Title: 'Mettez en valeur votre entreprise', benefit1Desc: 'Apparaissez dans les expériences locales et les résultats de recherche.',
      benefit2Title: 'Atteignez plus de voyageurs', benefit2Desc: 'Connectez-vous avec des milliers de personnes visitant Bilbao.',
      benefit3Title: 'Obtenez des insights précieux', benefit3Desc: 'Suivez les vues, les enregistrements et les interactions clients.',
      categoryTitle: 'Qu\'est-ce qui vous décrit le mieux ?',
      categorySubtitle: 'Choisissez la catégorie qui correspond à votre entreprise ou organisation.',
      categorySpecify: 'Précisez :',
      catRestaurant: 'Restaurant', catBars: 'Bars', catCoffeeShop: 'Café',
      catMuseum: 'Musée', catAttraction: 'Attraction', catShops: 'Boutiques', catOther: 'Autre',
      infoTitle: 'Parlez-nous de votre entreprise',
      infoSubtitle: 'Ces informations apparaîtront sur votre profil partenaire.',
      fieldName: 'Nom de l\'entreprise', fieldNamePlaceholder: 'Bar El Globo',
      fieldAddress: 'Adresse', fieldAddressPlaceholder: 'Casco Viejo, Bilbao',
      fieldPhone: 'Numéro de téléphone', fieldPhonePlaceholder: '+ 34 600 968 685',
      fieldWebsite: 'Site web', fieldWebsitePlaceholder: 'www.barelglobo.com',
      fieldDesc: 'Description courte', fieldDescPlaceholder: 'Décrivez votre entreprise…',
      verifyTitle: 'Vérifiez votre entreprise',
      verifySubtitle: 'Aidez-nous à vérifier que vous êtes le propriétaire ou le représentant de cette entreprise.',
      verifyUploadLabel: 'Téléchargez une preuve de propriété',
      verifyReviewNote: 'Votre demande sera examinée dans 2-3 jours ouvrables.',
      successTitle: 'Demande soumise',
      successDesc1: 'Merci de postuler pour devenir partenaire Aupa!.',
      successDesc2: 'Nous examinerons vos informations et vous notifierons dès que votre compte sera approuvé.',
      successBackHome: 'Retour à l\'accueil',
      continue: 'Continuer',
      errorConflict: 'Vous avez déjà une entreprise enregistrée ou en attente de vérification.',
      errorGeneral: 'Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.',
    },
  },
};

export const getAppCopy = (language?: string | null) => {
  return (language && language in APP_COPY ? APP_COPY[language as LanguageType] : APP_COPY.en);
};
