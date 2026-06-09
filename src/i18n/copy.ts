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
    savedPlaces: string;
    tripVisits: string;
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
    categories: Record<string, string>;
  };
  nearby: {
    title: string;
    searchPlaceholder: string;
    noResults: string;
  };
  experiences: {
    browseByVibe: string;
    topExperiences: string;
    myTrips: string;
    allEvents: string;
    noResults: string;
    noTrips: string;
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
    savedLabel: string;
    addToTrip: string;
    inTrip: string;
    notFound: string;
    about: string;
    reviews: string;
    addReview: string;
    similarPlaces: string;
    open: string;
    closed: string;
    schedule: string;
    closesAt: string;
    free: string;
    freeEntry: string;
    price: string;
    showMore: string;
    showLess: string;
    sending: string;
    sendError: string;
    reviewPlaceholder: string;
    reviewSubmit: string;
    reviewRatingError: string;
    reportProblem: string;
    reportCancel: string;
    reportSent: string;
    reportPlaceholder: string;
    reportSend: string;
    reportDescError: string;
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
  localDash: {
    verifiedPartner: string;
    yourLocal: string;
    noAddressSpecified: string;
    noAddressRegistered: string;
    free: string;
    edit: string;
    performance: string;
    last7Days: string;
    statViews: string;
    statClicks: string;
    statSavedRoutes: string;
    statProfileVisits: string;
    recentActivity: string;
    actNewReview: string;
    actReviewQuote: string;
    actProfileUpdated: string;
    actHoursChanged: string;
    actEventApproved: string;
    actEventVisible: string;
    ago5h: string;
    ago1d: string;
    ago2d: string;
    partnerStatus: string;
    businessVerified: string;
    businessVerifiedDesc: string;
    activePosts: string;
    activePostsDesc: string;
    partnerSince: string;
    memberSince: string;
    accountAndBusiness: string;
    ownerInfo: string;
    ownerInfoDesc: string;
    contactInfo: string;
    emailLabel: string;
    manageVerification: string;
    manageVerificationDesc: string;
    socialMedia: string;
    socialMediaDesc: string;
    helpCenter: string;
    logout: string;
    errNoLocal: string;
    eventUpdated: string;
    eventCreated: string;
    errSaveEvent: string;
    editEvent: string;
    createNewEvent: string;
    fieldTitle: string;
    fieldTitlePlaceholder: string;
    fieldDescription: string;
    fieldDescriptionPlaceholder: string;
    fieldDate: string;
    fieldStartTime: string;
    fieldPrice: string;
    fieldCapacity: string;
    fieldEventAddress: string;
    fieldEventAddressPlaceholder: string;
    fieldImageUrl: string;
    fieldImageUrlPlaceholder: string;
    saving: string;
    saveChanges: string;
    publishEvent: string;
    invitationAccepted: string;
    experiencesTitle: string;
    createExperience: string;
    tabMyExperiences: string;
    tabInvitations: string;
    stops: string;
    partners: string;
    statusApproved: string;
    statusUnderReview: string;
    statusDraft: string;
    live: string;
    noInvitations: string;
    organizedBy: string;
    invitedOn: string;
    accept: string;
    decline: string;
    newExperienceDefault: string;
    createLocalExperience: string;
    expTypeTitle: string;
    expTypeSubtitle: string;
    expBusinessTitle: string;
    expBusinessDesc: string;
    expCollabTitle: string;
    expCollabDesc: string;
    expTitleStep: string;
    expTitleSubtitle: string;
    expTitleLabel: string;
    expTitlePlaceholder: string;
    expShortDesc: string;
    expDescPlaceholder: string;
    expDetailsTitle: string;
    expDetailsSubtitle: string;
    expCategory: string;
    expDuration: string;
    expAvailability: string;
    expPriceRange: string;
    expLanguages: string;
    expPhotos: string;
    expInviteTitle: string;
    expInviteSubtitle: string;
    expSearchPartners: string;
    expSuggestedPartners: string;
    continueBtn: string;
    skipForNow: string;
    errLoadingData: string;
    myEvents: string;
    eventsOf: string;
    loadingLocal: string;
    createEventBtn: string;
    noEvents: string;
    createFirstEvent: string;
    noImage: string;
    active: string;
    inactive: string;
    toggleStatus: string;
    unspecifiedLocation: string;
    noDescription: string;
    notFound: string;
    eventDetailsTitle: string;
    eventPublished: string;
    labelDate: string;
    labelSchedule: string;
    labelPrice: string;
    labelCapacity: string;
    labelLocation: string;
    people: string;
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
      savedPlaces: 'Places saved',
      tripVisits: 'Trips added',
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
      categories: {
        food: 'Food', culture: 'Culture', nature: 'Nature', bars: 'Bars',
        local_favorites: 'Local Faves', shopping: 'Shopping', coffee_shops: 'Cafés',
        walking_tours: 'Walking', family_friendly: 'Family', vegetarian_vegan: 'Veg & Vegan',
        history: 'History', festivals_events: 'Events', beaches: 'Beaches',
        nightlife: 'Nightlife', budget_friendly: 'Budget',
        experiences: 'Experiences', places: 'Places',
        oneday: 'One day', threedays: '3 days', oneweek: 'One week', longstay: 'Long stay',
        solo: 'Solo', partner: 'Partner', friends: 'Friends', family: 'Family',
      },
    },
    nearby: {
      title: 'Places near you',
      searchPlaceholder: 'Where do you want to go?',
      noResults: 'No places found in this category.',
    },
    experiences: {
      browseByVibe: 'Browse by vibe',
      topExperiences: 'Top experiences',
      myTrips: 'My Trips',
      allEvents: 'All Events',
      noResults: 'No experiences found.',
      noTrips: 'No trips added yet.',
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
      savedLabel: 'Saved',
      addToTrip: 'Add to My Trip',
      inTrip: 'In my trip',
      notFound: 'Item not found',
      about: 'About this place',
      reviews: 'Reviews',
      addReview: 'Add a review',
      similarPlaces: 'Similar places nearby',
      open: 'Open',
      closed: 'Closed',
      schedule: 'Hours',
      closesAt: 'Closes',
      free: 'Free',
      freeEntry: 'Free entry',
      price: 'Price',
      showMore: 'Show more',
      showLess: 'Show less',
      sending: 'Sending…',
      sendError: 'Could not send. Please try again.',
      reviewPlaceholder: 'Write your review…',
      reviewSubmit: 'Post review',
      reviewRatingError: 'Please add a rating and a comment.',
      reportProblem: 'Report a problem',
      reportCancel: 'Cancel',
      reportSent: 'Report sent. Thank you!',
      reportPlaceholder: 'Describe the problem (wrong info, place closed, etc.)…',
      reportSend: 'Send report',
      reportDescError: 'Please write a description of the problem.',
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
    localDash: {
      verifiedPartner: 'Verified Partner',
      yourLocal: 'Your Business',
      noAddressSpecified: 'Address not specified',
      noAddressRegistered: 'No address registered',
      free: 'Free',
      edit: 'Edit',
      performance: 'Performance',
      last7Days: 'Last 7 days',
      statViews: 'Views',
      statClicks: 'Clicks',
      statSavedRoutes: 'Saved to Routes',
      statProfileVisits: 'Profile Visits',
      recentActivity: 'Recent Activity',
      actNewReview: 'New review received',
      actReviewQuote: '"Great atmosphere and excellent pintxos!"',
      actProfileUpdated: 'Profile updated',
      actHoursChanged: 'Opening hours were changed',
      actEventApproved: 'Event "Pinto Crawl" approved',
      actEventVisible: "It's now visible to users",
      ago5h: '5h ago',
      ago1d: '1d ago',
      ago2d: '2d ago',
      partnerStatus: 'Partner Status',
      businessVerified: 'Verified Business',
      businessVerifiedDesc: 'Your business is verified on Aupa.',
      activePosts: 'Active Posts',
      activePostsDesc: 'Your events are visible to the public.',
      partnerSince: 'Partner Since',
      memberSince: 'Member since May 2026',
      accountAndBusiness: 'Account & Business',
      ownerInfo: 'Owner Information',
      ownerInfoDesc: 'Name, role and profile details',
      contactInfo: 'Contact Information',
      emailLabel: 'Email',
      manageVerification: 'Manage Verification',
      manageVerificationDesc: 'Documents and status of your verification',
      socialMedia: 'Social Media',
      socialMediaDesc: 'Instagram, Facebook and Website',
      helpCenter: 'Help Center',
      logout: 'Log Out',
      errNoLocal: 'Error: No business associated with your account was found.',
      eventUpdated: 'Event updated successfully!',
      eventCreated: 'Event created successfully!',
      errSaveEvent: 'Error saving the event on the server.',
      editEvent: 'Edit Event',
      createNewEvent: 'Create New Event',
      fieldTitle: 'Event Title *',
      fieldTitlePlaceholder: 'E.g. Wine tasting, Live music...',
      fieldDescription: 'Description',
      fieldDescriptionPlaceholder: 'Describe the event, what it includes, etc.',
      fieldDate: 'Date *',
      fieldStartTime: 'Start Time *',
      fieldPrice: 'Price (€)',
      fieldCapacity: 'Capacity',
      fieldEventAddress: 'Event Address',
      fieldEventAddressPlaceholder: 'Event address',
      fieldImageUrl: 'Image URL',
      fieldImageUrlPlaceholder: 'https://example.com/image.jpg',
      saving: 'Saving...',
      saveChanges: 'Save Changes',
      publishEvent: 'Publish Event',
      invitationAccepted: 'Invitation accepted. You are now part of this experience.',
      experiencesTitle: 'Experiences',
      createExperience: 'Create Experience',
      tabMyExperiences: 'My Experiences',
      tabInvitations: 'Invitations',
      stops: 'stops',
      partners: 'partners',
      statusApproved: 'Approved',
      statusUnderReview: 'Under Review',
      statusDraft: 'Draft',
      live: 'Live',
      noInvitations: 'You have no pending invitations.',
      organizedBy: 'Organized by',
      invitedOn: 'Invited on',
      accept: 'Accept',
      decline: 'Decline',
      newExperienceDefault: 'New Experience',
      createLocalExperience: 'Create local experience',
      expTypeTitle: 'What kind of experience do you want to create?',
      expTypeSubtitle: 'Choose how you would like to build your experience.',
      expBusinessTitle: 'My business experience',
      expBusinessDesc: 'Create an experience organized solely by your business.',
      expCollabTitle: 'Collaborative experience',
      expCollabDesc: 'Create an experience together with other local businesses.',
      expTitleStep: 'Give your experience a title',
      expTitleSubtitle: 'A great title helps travelers understand what it is about.',
      expTitleLabel: 'Title',
      expTitlePlaceholder: 'E.g. Pintxo Masterclass',
      expShortDesc: 'Short description',
      expDescPlaceholder: 'Learn the art of crafting authentic Basque pintxos with our chef...',
      expDetailsTitle: 'Add details about your experience',
      expDetailsSubtitle: 'Share key information travelers should know.',
      expCategory: 'Category',
      expDuration: 'Duration',
      expAvailability: 'When is it available?',
      expPriceRange: 'Price Range',
      expLanguages: 'Languages',
      expPhotos: 'Photos',
      expInviteTitle: 'Invite partners (optional)',
      expInviteSubtitle: 'Collaborate with other local businesses to create a shared experience.',
      expSearchPartners: 'Search partners...',
      expSuggestedPartners: 'Suggested Partners',
      continueBtn: 'Continue',
      skipForNow: 'Skip for now',
      errLoadingData: 'Could not load the information. Showing sample data.',
      myEvents: 'My Events',
      eventsOf: 'Events from {name}',
      loadingLocal: 'Loading business...',
      createEventBtn: 'Create Event',
      noEvents: "You don't have any published events yet.",
      createFirstEvent: 'Create my first event',
      noImage: 'No Image',
      active: 'Active',
      inactive: 'Inactive',
      toggleStatus: 'Toggle Status',
      unspecifiedLocation: 'Location not specified',
      noDescription: 'No detailed description.',
      notFound: 'Item not found',
      eventDetailsTitle: 'Event Details (Business)',
      eventPublished: 'Published Event',
      labelDate: 'Date',
      labelSchedule: 'Schedule',
      labelPrice: 'Price',
      labelCapacity: 'Capacity',
      labelLocation: 'Location',
      people: 'people',
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
      savedPlaces: 'Lugares guardados',
      tripVisits: 'Añadidos al viaje',
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
      categories: {
        food: 'Comida', culture: 'Cultura', nature: 'Naturaleza', bars: 'Bares',
        local_favorites: 'Locales', shopping: 'Compras', coffee_shops: 'Cafeterías',
        walking_tours: 'A pie', family_friendly: 'Familiar', vegetarian_vegan: 'Vegetariano',
        history: 'Historia', festivals_events: 'Eventos', beaches: 'Playas',
        nightlife: 'Nocturna', budget_friendly: 'Económico',
        experiences: 'Experiencias', places: 'Lugares',
        oneday: 'Un día', threedays: '3 días', oneweek: 'Una semana', longstay: 'Larga estancia',
        solo: 'Solo/a', partner: 'En pareja', friends: 'Amigos', family: 'Familia',
      },
    },
    nearby: {
      title: 'Lugares cerca de ti',
      searchPlaceholder: '¿A dónde quieres ir?',
      noResults: 'No se encontraron lugares en esta categoría.',
    },
    experiences: {
      browseByVibe: 'Explorar por ambiente',
      topExperiences: 'Mejores experiencias',
      myTrips: 'Mis viajes',
      allEvents: 'Todos los eventos',
      noResults: 'No se encontraron experiencias.',
      noTrips: 'Aún no tienes viajes añadidos.',
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
      savedLabel: 'Guardado',
      addToTrip: 'Añadir a mi viaje',
      inTrip: 'En mi viaje',
      notFound: 'Elemento no encontrado',
      about: 'Sobre este lugar',
      reviews: 'Reseñas',
      addReview: 'Añadir reseña',
      similarPlaces: 'Lugares similares cerca',
      open: 'Abierto',
      closed: 'Cerrado',
      schedule: 'Horario',
      closesAt: 'Cierra',
      free: 'Gratis',
      freeEntry: 'Entrada libre',
      price: 'Precio',
      showMore: 'Ver más',
      showLess: 'Ver menos',
      sending: 'Enviando…',
      sendError: 'No se pudo enviar. Inténtalo de nuevo.',
      reviewPlaceholder: 'Escribe tu reseña…',
      reviewSubmit: 'Publicar reseña',
      reviewRatingError: 'Añade una puntuación y un comentario.',
      reportProblem: 'Reportar un problema',
      reportCancel: 'Cancelar',
      reportSent: 'Incidencia enviada. ¡Gracias por tu reporte!',
      reportPlaceholder: 'Describe el problema (información incorrecta, lugar cerrado, etc.)…',
      reportSend: 'Enviar reporte',
      reportDescError: 'Escribe una descripción del problema.',
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
    localDash: {
      verifiedPartner: 'Socio Verificado',
      yourLocal: 'Tu Local',
      noAddressSpecified: 'Dirección no especificada',
      noAddressRegistered: 'Sin dirección registrada',
      free: 'Gratis',
      edit: 'Editar',
      performance: 'Rendimiento',
      last7Days: 'Últimos 7 días',
      statViews: 'Visualizaciones',
      statClicks: 'Clics',
      statSavedRoutes: 'Guardado en Rutas',
      statProfileVisits: 'Visitas Perfil',
      recentActivity: 'Actividad Reciente',
      actNewReview: 'Nueva reseña recibida',
      actReviewQuote: '"¡Gran ambiente y excelentes pinchos!"',
      actProfileUpdated: 'Perfil actualizado',
      actHoursChanged: 'Se cambiaron los horarios de apertura',
      actEventApproved: 'Evento "Pinto Crawl" aprobado',
      actEventVisible: 'Ya está visible para los usuarios',
      ago5h: 'Hace 5h',
      ago1d: 'Hace 1d',
      ago2d: 'Hace 2d',
      partnerStatus: 'Estado de Socio',
      businessVerified: 'Negocio Verificado',
      businessVerifiedDesc: 'Tu local está verificado en Aupa.',
      activePosts: 'Publicaciones Activas',
      activePostsDesc: 'Tus eventos son visibles al público.',
      partnerSince: 'Socio Desde',
      memberSince: 'Miembro desde Mayo 2026',
      accountAndBusiness: 'Cuenta y Negocio',
      ownerInfo: 'Información del Propietario',
      ownerInfoDesc: 'Nombre, rol y detalles del perfil',
      contactInfo: 'Información de Contacto',
      emailLabel: 'Email',
      manageVerification: 'Gestionar Verificación',
      manageVerificationDesc: 'Documentos y estado de tu verificación',
      socialMedia: 'Redes Sociales',
      socialMediaDesc: 'Instagram, Facebook y Sitio Web',
      helpCenter: 'Centro de Ayuda',
      logout: 'Cerrar Sesión',
      errNoLocal: 'Error: No se encontró un local asociado a tu cuenta.',
      eventUpdated: '¡Evento actualizado exitosamente!',
      eventCreated: '¡Evento creado exitosamente!',
      errSaveEvent: 'Error al guardar el evento en el servidor.',
      editEvent: 'Editar Evento',
      createNewEvent: 'Crear Nuevo Evento',
      fieldTitle: 'Título del Evento *',
      fieldTitlePlaceholder: 'Ej. Cata de vinos, Música en vivo...',
      fieldDescription: 'Descripción',
      fieldDescriptionPlaceholder: 'Describe el evento, qué incluye, etc.',
      fieldDate: 'Fecha *',
      fieldStartTime: 'Hora Inicio *',
      fieldPrice: 'Precio (€)',
      fieldCapacity: 'Capacidad',
      fieldEventAddress: 'Dirección de Celebración',
      fieldEventAddressPlaceholder: 'Dirección del evento',
      fieldImageUrl: 'URL de Imagen',
      fieldImageUrlPlaceholder: 'https://ejemplo.com/imagen.jpg',
      saving: 'Guardando...',
      saveChanges: 'Guardar Cambios',
      publishEvent: 'Publicar Evento',
      invitationAccepted: 'Invitación aceptada. Ahora eres parte de esta experiencia.',
      experiencesTitle: 'Experiencias',
      createExperience: 'Crear Experiencia',
      tabMyExperiences: 'Mis Experiencias',
      tabInvitations: 'Invitaciones',
      stops: 'paradas',
      partners: 'socios',
      statusApproved: 'Aprobada',
      statusUnderReview: 'En Revisión',
      statusDraft: 'Borrador',
      live: 'En Vivo',
      noInvitations: 'No tienes invitaciones pendientes.',
      organizedBy: 'Organizado por',
      invitedOn: 'Invitado el',
      accept: 'Aceptar',
      decline: 'Rechazar',
      newExperienceDefault: 'Nueva Experiencia',
      createLocalExperience: 'Crear experiencia local',
      expTypeTitle: '¿Qué tipo de experiencia quieres crear?',
      expTypeSubtitle: 'Elige cómo te gustaría construir tu experiencia.',
      expBusinessTitle: 'Mi experiencia de negocio',
      expBusinessDesc: 'Crea una experiencia organizada únicamente por tu negocio.',
      expCollabTitle: 'Experiencia colaborativa',
      expCollabDesc: 'Crea una experiencia conjuntamente con otros negocios locales.',
      expTitleStep: 'Dale un título a tu experiencia',
      expTitleSubtitle: 'Un gran título ayuda a los viajeros a entender de qué se trata.',
      expTitleLabel: 'Título',
      expTitlePlaceholder: 'Ej. Pintxo Masterclass',
      expShortDesc: 'Descripción corta',
      expDescPlaceholder: 'Aprende el arte de elaborar auténticos pinchos vascos con nuestro chef...',
      expDetailsTitle: 'Añade detalles sobre tu experiencia',
      expDetailsSubtitle: 'Comparte información clave que los viajeros deben saber.',
      expCategory: 'Categoría',
      expDuration: 'Duración',
      expAvailability: '¿Cuándo está disponible?',
      expPriceRange: 'Rango de Precio',
      expLanguages: 'Idiomas',
      expPhotos: 'Fotos',
      expInviteTitle: 'Invitar socios (opcional)',
      expInviteSubtitle: 'Colabora con otros negocios locales para crear una experiencia compartida.',
      expSearchPartners: 'Buscar socios...',
      expSuggestedPartners: 'Socios Sugeridos',
      continueBtn: 'Continuar',
      skipForNow: 'Omitir por ahora',
      errLoadingData: 'No se pudo cargar la información. Mostrando datos simulados.',
      myEvents: 'Mis Eventos',
      eventsOf: 'Eventos de {name}',
      loadingLocal: 'Cargando local...',
      createEventBtn: 'Crear Evento',
      noEvents: 'No tienes eventos publicados todavía.',
      createFirstEvent: 'Crear mi primer evento',
      noImage: 'Sin Imagen',
      active: 'Activo',
      inactive: 'Inactivo',
      toggleStatus: 'Cambiar Estado',
      unspecifiedLocation: 'Ubicación no especificada',
      noDescription: 'Sin descripción detallada.',
      notFound: 'Elemento no encontrado',
      eventDetailsTitle: 'Detalles del Evento (Local)',
      eventPublished: 'Evento Publicado',
      labelDate: 'Fecha',
      labelSchedule: 'Horario',
      labelPrice: 'Precio',
      labelCapacity: 'Capacidad',
      labelLocation: 'Ubicación',
      people: 'personas',
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
      savedPlaces: 'Gordetako lekuak',
      tripVisits: 'Bidaian gehituta',
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
      categories: {
        food: 'Janaria', culture: 'Kultura', nature: 'Natura', bars: 'Tabernak',
        local_favorites: 'Bertakoak', shopping: 'Erosketak', coffee_shops: 'Kafetegiak',
        walking_tours: 'Oinez', family_friendly: 'Familia', vegetarian_vegan: 'Begetarianoa',
        history: 'Historia', festivals_events: 'Festak', beaches: 'Hondartzak',
        nightlife: 'Gaueko bizitza', budget_friendly: 'Aurrekontua',
        experiences: 'Esperientziak', places: 'Lekuak',
        oneday: 'Egun bat', threedays: '3 egun', oneweek: 'Aste bat', longstay: 'Egonaldi luzea',
        solo: 'Bakarrik', partner: 'Bikotea', friends: 'Lagunak', family: 'Familia',
      },
    },
    nearby: {
      title: 'Inguruko lekuak',
      searchPlaceholder: 'Nora joan nahi duzu?',
      noResults: 'Ez da lekurik aurkitu kategoria honetan.',
    },
    experiences: {
      browseByVibe: 'Aurkitu giroaren arabera',
      topExperiences: 'Esperientzia onenak',
      myTrips: 'Nire bidaiak',
      allEvents: 'Ekitaldi guztiak',
      noResults: 'Ez da esperientziarik aurkitu.',
      noTrips: 'Oraindik ez duzu bidaiarik gehitu.',
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
      savedLabel: 'Gordeta',
      addToTrip: 'Nire bidaian gehitu',
      inTrip: 'Nire bidaian',
      notFound: 'Ez da aurkitu',
      about: 'Leku honi buruz',
      reviews: 'Iritziak',
      addReview: 'Iritzi bat gehitu',
      similarPlaces: 'Inguruko antzeko lekuak',
      open: 'Irekita',
      closed: 'Itxita',
      schedule: 'Ordutegia',
      closesAt: 'Ixten da',
      free: 'Doan',
      freeEntry: 'Sarrera doan',
      price: 'Prezioa',
      showMore: 'Gehiago ikusi',
      showLess: 'Gutxiago ikusi',
      sending: 'Bidaltzen…',
      sendError: 'Ezin izan da bidali. Saiatu berriz.',
      reviewPlaceholder: 'Idatzi zure iritzia…',
      reviewSubmit: 'Argitaratu iritzia',
      reviewRatingError: 'Gehitu puntuazio bat eta iruzkin bat.',
      reportProblem: 'Arazo bat salatu',
      reportCancel: 'Utzi',
      reportSent: 'Txostena bidalita. Eskerrik asko!',
      reportPlaceholder: 'Deskribatu arazoa (informazio okerra, lekua itxita, etab.)…',
      reportSend: 'Bidali txostena',
      reportDescError: 'Idatzi arazoaren deskribapena.',
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
    localDash: {
      verifiedPartner: 'Bazkide Egiaztatua',
      yourLocal: 'Zure Lokala',
      noAddressSpecified: 'Helbidea zehaztu gabe',
      noAddressRegistered: 'Helbiderik erregistratu gabe',
      free: 'Doan',
      edit: 'Editatu',
      performance: 'Errendimendua',
      last7Days: 'Azken 7 egunak',
      statViews: 'Bisualizazioak',
      statClicks: 'Klikak',
      statSavedRoutes: 'Ibilbideetan Gordeta',
      statProfileVisits: 'Profil Bisitak',
      recentActivity: 'Azken Jarduera',
      actNewReview: 'Iritzi berria jasota',
      actReviewQuote: '"Giro bikaina eta pintxo bikainak!"',
      actProfileUpdated: 'Profila eguneratuta',
      actHoursChanged: 'Irekitze ordutegiak aldatu dira',
      actEventApproved: '"Pinto Crawl" ekitaldia onartuta',
      actEventVisible: 'Dagoeneko erabiltzaileentzat ikusgai dago',
      ago5h: 'Duela 5o',
      ago1d: 'Duela 1e',
      ago2d: 'Duela 2e',
      partnerStatus: 'Bazkide Egoera',
      businessVerified: 'Negozio Egiaztatua',
      businessVerifiedDesc: 'Zure lokala Aupa-n egiaztatuta dago.',
      activePosts: 'Argitalpen Aktiboak',
      activePostsDesc: 'Zure ekitaldiak publikoarentzat ikusgai daude.',
      partnerSince: 'Bazkide Noiztik',
      memberSince: 'Kide 2026ko Maiatzetik',
      accountAndBusiness: 'Kontua eta Negozioa',
      ownerInfo: 'Jabearen Informazioa',
      ownerInfoDesc: 'Izena, rola eta profileko xehetasunak',
      contactInfo: 'Harremanetarako Informazioa',
      emailLabel: 'Emaila',
      manageVerification: 'Kudeatu Egiaztapena',
      manageVerificationDesc: 'Zure egiaztapenaren dokumentuak eta egoera',
      socialMedia: 'Sare Sozialak',
      socialMediaDesc: 'Instagram, Facebook eta Webgunea',
      helpCenter: 'Laguntza Gunea',
      logout: 'Saioa Itxi',
      errNoLocal: 'Errorea: Ez da zure kontuari lotutako lokalik aurkitu.',
      eventUpdated: 'Ekitaldia ondo eguneratu da!',
      eventCreated: 'Ekitaldia ondo sortu da!',
      errSaveEvent: 'Errorea ekitaldia zerbitzarian gordetzean.',
      editEvent: 'Editatu Ekitaldia',
      createNewEvent: 'Sortu Ekitaldi Berria',
      fieldTitle: 'Ekitaldiaren Izenburua *',
      fieldTitlePlaceholder: 'Adib. Ardo dastaketa, Zuzeneko musika...',
      fieldDescription: 'Deskribapena',
      fieldDescriptionPlaceholder: 'Deskribatu ekitaldia, zer barne hartzen duen, etab.',
      fieldDate: 'Data *',
      fieldStartTime: 'Hasiera Ordua *',
      fieldPrice: 'Prezioa (€)',
      fieldCapacity: 'Edukiera',
      fieldEventAddress: 'Ospakizun Helbidea',
      fieldEventAddressPlaceholder: 'Ekitaldiaren helbidea',
      fieldImageUrl: 'Irudiaren URLa',
      fieldImageUrlPlaceholder: 'https://adibidea.com/irudia.jpg',
      saving: 'Gordetzen...',
      saveChanges: 'Gorde Aldaketak',
      publishEvent: 'Argitaratu Ekitaldia',
      invitationAccepted: 'Gonbidapena onartuta. Orain esperientzia honen parte zara.',
      experiencesTitle: 'Esperientziak',
      createExperience: 'Sortu Esperientzia',
      tabMyExperiences: 'Nire Esperientziak',
      tabInvitations: 'Gonbidapenak',
      stops: 'geldialdi',
      partners: 'bazkide',
      statusApproved: 'Onartuta',
      statusUnderReview: 'Berrikuspenean',
      statusDraft: 'Zirriborroa',
      live: 'Zuzenean',
      noInvitations: 'Ez duzu gonbidapen pendienterik.',
      organizedBy: 'Antolatzailea:',
      invitedOn: 'Gonbidatua:',
      accept: 'Onartu',
      decline: 'Ezetsi',
      newExperienceDefault: 'Esperientzia Berria',
      createLocalExperience: 'Sortu tokiko esperientzia',
      expTypeTitle: 'Zer-nolako esperientzia sortu nahi duzu?',
      expTypeSubtitle: 'Aukeratu nola eraiki nahi duzun zure esperientzia.',
      expBusinessTitle: 'Nire negozio esperientzia',
      expBusinessDesc: 'Sortu zure negozioak soilik antolatutako esperientzia bat.',
      expCollabTitle: 'Esperientzia kolaboratiboa',
      expCollabDesc: 'Sortu esperientzia bat beste tokiko negozio batzuekin batera.',
      expTitleStep: 'Eman izenburu bat zure esperientziari',
      expTitleSubtitle: 'Izenburu on batek bidaiariei zertaz doan ulertzen laguntzen die.',
      expTitleLabel: 'Izenburua',
      expTitlePlaceholder: 'Adib. Pintxo Masterclass',
      expShortDesc: 'Deskribapen laburra',
      expDescPlaceholder: 'Ikasi benetako euskal pintxoak egiteko artea gure sukaldariarekin...',
      expDetailsTitle: 'Gehitu xehetasunak zure esperientziari buruz',
      expDetailsSubtitle: 'Partekatu bidaiariek jakin beharreko funtsezko informazioa.',
      expCategory: 'Kategoria',
      expDuration: 'Iraupena',
      expAvailability: 'Noiz dago eskuragarri?',
      expPriceRange: 'Prezio Tartea',
      expLanguages: 'Hizkuntzak',
      expPhotos: 'Argazkiak',
      expInviteTitle: 'Gonbidatu bazkideak (aukerakoa)',
      expInviteSubtitle: 'Lankidetzan aritu beste tokiko negozioekin esperientzia partekatu bat sortzeko.',
      expSearchPartners: 'Bilatu bazkideak...',
      expSuggestedPartners: 'Gomendatutako Bazkideak',
      continueBtn: 'Jarraitu',
      skipForNow: 'Saltatu oraingoz',
      errLoadingData: 'Ezin izan da informazioa kargatu. Datu simulatuak erakusten.',
      myEvents: 'Nire Ekitaldiak',
      eventsOf: '{name}-(r)en ekitaldiak',
      loadingLocal: 'Lokala kargatzen...',
      createEventBtn: 'Sortu Ekitaldia',
      noEvents: 'Ez duzu ekitaldirik argitaratu oraindik.',
      createFirstEvent: 'Sortu nire lehen ekitaldia',
      noImage: 'Irudirik Ez',
      active: 'Aktibo',
      inactive: 'Inaktibo',
      toggleStatus: 'Aldatu Egoera',
      unspecifiedLocation: 'Kokapena zehaztu gabe',
      noDescription: 'Deskribapen zehatzik gabe.',
      notFound: 'Elementua ez da aurkitu',
      eventDetailsTitle: 'Ekitaldiaren Xehetasunak (Lokala)',
      eventPublished: 'Argitaratutako Ekitaldia',
      labelDate: 'Data',
      labelSchedule: 'Ordutegia',
      labelPrice: 'Prezioa',
      labelCapacity: 'Edukiera',
      labelLocation: 'Kokapena',
      people: 'pertsona',
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
      savedPlaces: 'Lieux sauvegardés',
      tripVisits: 'Ajoutés au voyage',
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
      categories: {
        food: 'Cuisine', culture: 'Culture', nature: 'Nature', bars: 'Bars',
        local_favorites: 'Coups de cœur', shopping: 'Shopping', coffee_shops: 'Cafés',
        walking_tours: 'À pied', family_friendly: 'Famille', vegetarian_vegan: 'Végétarien',
        history: 'Histoire', festivals_events: 'Événements', beaches: 'Plages',
        nightlife: 'Vie nocturne', budget_friendly: 'Budget',
        experiences: 'Expériences', places: 'Lieux',
        oneday: 'Une journée', threedays: '3 jours', oneweek: 'Une semaine', longstay: 'Long séjour',
        solo: 'Seul(e)', partner: 'En couple', friends: 'Amis', family: 'Famille',
      },
    },
    nearby: {
      title: 'Lieux près de vous',
      searchPlaceholder: 'Où voulez-vous aller ?',
      noResults: 'Aucun lieu trouvé dans cette catégorie.',
    },
    experiences: {
      browseByVibe: 'Parcourir par ambiance',
      topExperiences: 'Meilleures expériences',
      myTrips: 'Mes voyages',
      allEvents: 'Tous les événements',
      noResults: 'Aucune expérience trouvée.',
      noTrips: 'Aucun voyage ajouté pour l\'instant.',
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
      savedLabel: 'Enregistré',
      addToTrip: 'Ajouter à mon voyage',
      inTrip: 'Dans mon voyage',
      notFound: 'Élément introuvable',
      about: 'À propos de ce lieu',
      reviews: 'Avis',
      addReview: 'Ajouter un avis',
      similarPlaces: 'Lieux similaires à proximité',
      open: 'Ouvert',
      closed: 'Fermé',
      schedule: 'Horaires',
      closesAt: 'Ferme',
      free: 'Gratuit',
      freeEntry: 'Entrée libre',
      price: 'Prix',
      showMore: 'Voir plus',
      showLess: 'Voir moins',
      sending: 'Envoi…',
      sendError: "Impossible d'envoyer. Veuillez réessayer.",
      reviewPlaceholder: 'Rédigez votre avis…',
      reviewSubmit: "Publier l'avis",
      reviewRatingError: 'Veuillez ajouter une note et un commentaire.',
      reportProblem: 'Signaler un problème',
      reportCancel: 'Annuler',
      reportSent: 'Signalement envoyé. Merci !',
      reportPlaceholder: 'Décrivez le problème (infos incorrectes, lieu fermé, etc.)…',
      reportSend: 'Envoyer le signalement',
      reportDescError: 'Veuillez décrire le problème.',
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
    localDash: {
      verifiedPartner: 'Partenaire Vérifié',
      yourLocal: 'Votre Établissement',
      noAddressSpecified: 'Adresse non spécifiée',
      noAddressRegistered: 'Aucune adresse enregistrée',
      free: 'Gratuit',
      edit: 'Modifier',
      performance: 'Performance',
      last7Days: '7 derniers jours',
      statViews: 'Vues',
      statClicks: 'Clics',
      statSavedRoutes: 'Enregistré dans les itinéraires',
      statProfileVisits: 'Visites du profil',
      recentActivity: 'Activité Récente',
      actNewReview: 'Nouvel avis reçu',
      actReviewQuote: '"Super ambiance et excellents pintxos !"',
      actProfileUpdated: 'Profil mis à jour',
      actHoursChanged: "Les horaires d'ouverture ont été modifiés",
      actEventApproved: 'Événement "Pinto Crawl" approuvé',
      actEventVisible: 'Il est désormais visible par les utilisateurs',
      ago5h: 'Il y a 5h',
      ago1d: 'Il y a 1j',
      ago2d: 'Il y a 2j',
      partnerStatus: 'Statut de Partenaire',
      businessVerified: 'Établissement Vérifié',
      businessVerifiedDesc: 'Votre établissement est vérifié sur Aupa.',
      activePosts: 'Publications Actives',
      activePostsDesc: 'Vos événements sont visibles par le public.',
      partnerSince: 'Partenaire Depuis',
      memberSince: 'Membre depuis mai 2026',
      accountAndBusiness: 'Compte et Établissement',
      ownerInfo: 'Informations du Propriétaire',
      ownerInfoDesc: 'Nom, rôle et détails du profil',
      contactInfo: 'Coordonnées',
      emailLabel: 'E-mail',
      manageVerification: 'Gérer la Vérification',
      manageVerificationDesc: 'Documents et statut de votre vérification',
      socialMedia: 'Réseaux Sociaux',
      socialMediaDesc: 'Instagram, Facebook et Site Web',
      helpCenter: "Centre d'Aide",
      logout: 'Se Déconnecter',
      errNoLocal: "Erreur : Aucun établissement associé à votre compte n'a été trouvé.",
      eventUpdated: 'Événement mis à jour avec succès !',
      eventCreated: 'Événement créé avec succès !',
      errSaveEvent: "Erreur lors de l'enregistrement de l'événement sur le serveur.",
      editEvent: "Modifier l'Événement",
      createNewEvent: 'Créer un Nouvel Événement',
      fieldTitle: "Titre de l'Événement *",
      fieldTitlePlaceholder: 'Ex. Dégustation de vins, Musique live...',
      fieldDescription: 'Description',
      fieldDescriptionPlaceholder: "Décrivez l'événement, ce qu'il inclut, etc.",
      fieldDate: 'Date *',
      fieldStartTime: 'Heure de Début *',
      fieldPrice: 'Prix (€)',
      fieldCapacity: 'Capacité',
      fieldEventAddress: "Adresse de l'Événement",
      fieldEventAddressPlaceholder: "Adresse de l'événement",
      fieldImageUrl: "URL de l'Image",
      fieldImageUrlPlaceholder: 'https://exemple.com/image.jpg',
      saving: 'Enregistrement...',
      saveChanges: 'Enregistrer les Modifications',
      publishEvent: "Publier l'Événement",
      invitationAccepted: 'Invitation acceptée. Vous faites maintenant partie de cette expérience.',
      experiencesTitle: 'Expériences',
      createExperience: 'Créer une Expérience',
      tabMyExperiences: 'Mes Expériences',
      tabInvitations: 'Invitations',
      stops: 'arrêts',
      partners: 'partenaires',
      statusApproved: 'Approuvée',
      statusUnderReview: 'En Révision',
      statusDraft: 'Brouillon',
      live: 'En Direct',
      noInvitations: "Vous n'avez aucune invitation en attente.",
      organizedBy: 'Organisé par',
      invitedOn: 'Invité le',
      accept: 'Accepter',
      decline: 'Refuser',
      newExperienceDefault: 'Nouvelle Expérience',
      createLocalExperience: 'Créer une expérience locale',
      expTypeTitle: "Quel type d'expérience voulez-vous créer ?",
      expTypeSubtitle: 'Choisissez comment vous souhaitez construire votre expérience.',
      expBusinessTitle: 'Mon expérience commerciale',
      expBusinessDesc: 'Créez une expérience organisée uniquement par votre établissement.',
      expCollabTitle: 'Expérience collaborative',
      expCollabDesc: "Créez une expérience conjointement avec d'autres établissements locaux.",
      expTitleStep: 'Donnez un titre à votre expérience',
      expTitleSubtitle: "Un bon titre aide les voyageurs à comprendre de quoi il s'agit.",
      expTitleLabel: 'Titre',
      expTitlePlaceholder: 'Ex. Masterclass de Pintxos',
      expShortDesc: 'Description courte',
      expDescPlaceholder: "Apprenez l'art de préparer d'authentiques pintxos basques avec notre chef...",
      expDetailsTitle: 'Ajoutez des détails sur votre expérience',
      expDetailsSubtitle: 'Partagez les informations clés que les voyageurs doivent connaître.',
      expCategory: 'Catégorie',
      expDuration: 'Durée',
      expAvailability: 'Quand est-ce disponible ?',
      expPriceRange: 'Gamme de Prix',
      expLanguages: 'Langues',
      expPhotos: 'Photos',
      expInviteTitle: 'Inviter des partenaires (optionnel)',
      expInviteSubtitle: "Collaborez avec d'autres établissements locaux pour créer une expérience partagée.",
      expSearchPartners: 'Rechercher des partenaires...',
      expSuggestedPartners: 'Partenaires Suggérés',
      continueBtn: 'Continuer',
      skipForNow: 'Ignorer pour le moment',
      errLoadingData: 'Impossible de charger les informations. Affichage de données simulées.',
      myEvents: 'Mes Événements',
      eventsOf: 'Événements de {name}',
      loadingLocal: "Chargement de l'établissement...",
      createEventBtn: 'Créer un Événement',
      noEvents: "Vous n'avez encore aucun événement publié.",
      createFirstEvent: 'Créer mon premier événement',
      noImage: 'Aucune Image',
      active: 'Actif',
      inactive: 'Inactif',
      toggleStatus: 'Changer le Statut',
      unspecifiedLocation: 'Emplacement non spécifié',
      noDescription: 'Aucune description détaillée.',
      notFound: 'Élément introuvable',
      eventDetailsTitle: "Détails de l'Événement (Établissement)",
      eventPublished: 'Événement Publié',
      labelDate: 'Date',
      labelSchedule: 'Horaire',
      labelPrice: 'Prix',
      labelCapacity: 'Capacité',
      labelLocation: 'Emplacement',
      people: 'personnes',
    },
  },
};

export const getAppCopy = (language?: string | null) => {
  return (language && language in APP_COPY ? APP_COPY[language as LanguageType] : APP_COPY.en);
};

export const getCatLabel = (key: string | undefined | null, copy: AppCopy): string => {
  if (!key) return '';
  return copy.onboarding.categories[key] ?? key.replace(/_/g, ' ');
};
