'use strict';

const russianCopy = {
  skip: 'Перейти к содержимому',
  navigation: 'Основная навигация',
  language: 'Язык сайта',
  siteTheme: 'Тёмная тема сайта',
  gallery: 'Скриншоты приложения',
  footer: 'Поддержка и документы',
  navFeatures: 'Возможности',
  navHow: 'Как работает',
  navApp: 'Приложение',
  navSupport: 'Поддержка',
  getApp: 'Скачать приложение',
  appStoreCaption: 'Загрузите в',
  appStoreUnavailable: 'App Store, ссылка недоступна',
  googlePlayCaption: 'Доступно в',
  heroTitle: 'Здоровые привычки —',
  heroAccent: 'каждый день.',
  heroDescription: 'Калории, питание, активность и прогресс в одном приложении.',
  cameraTitle: 'ИИ-камера',
  cameraNote: 'Фото → калории',
  progressLabel: 'Твой прогресс',
  weekly: 'Статистика за неделю',
  waterTitle: 'Вода',
  waterNote: 'Ежедневный учёт',
  featuresTitle: 'Всё для твоего баланса',
  featuresDescription: 'Удобные инструменты помогают вести дневник питания, больше двигаться и следить за привычками.',
  featureCamera: 'Сфотографируй блюдо, чтобы узнать примерную калорийность и состав.',
  diaryTitle: 'Дневник питания',
  featureDiary: 'Записывай приёмы пищи и следи за калориями, белками, жирами и углеводами.',
  workoutsTitle: 'Тренировки',
  featureWorkouts: 'Выбирай активность и смотри, как она связана с твоей целью по калориям.',
  aiTitle: 'Узнавай калории по фото',
  aiDescription: 'Сфотографируй блюдо и получи оценку калорийности и состава. Её можно использовать для записи в дневнике питания.',
  progressTitle: 'Следи за прогрессом',
  progressDescription: 'Смотри, как меняются активность, калорийность рациона и вес, чтобы видеть результат своих привычек.',
  progressActivity: 'Активные дни',
  progressWeight: 'Динамика веса',
  appTitle: 'Посмотри Calorie Tracker',
  appDescription: 'Выбери экран, чтобы увидеть, как устроено приложение.',
  screenActivity: 'Активность',
  screenNutrition: 'Питание',
  screenDiary: 'Дневник питания',
  screenDiet: 'Индивидуальный рацион',
  screenWorkouts: 'Обмен калорий',
  downloadTitle: 'Начни с полезных привычек',
  contact: 'Связаться с нами',
  privacy: 'Политика конфиденциальности',
  terms: 'Условия использования',
  deletion: 'Удаление аккаунта',
};

const screens = {
  '01-home-activity': {
    en: 'Home screen with calories, steps, and water',
    ru: 'Главный экран с калориями, шагами и водой',
  },
  '02-home-nutrition': {
    en: 'Home screen with protein, fat, and carbohydrate totals',
    ru: 'Главный экран с данными о белках, жирах и углеводах',
  },
  '03-personal-diet': {
    en: 'Personal food diary with logged foods',
    ru: 'Дневник питания с добавленными продуктами',
  },
  '04-individual-diet': {
    en: 'Individual diet with progress by food group',
    ru: 'Индивидуальный рацион с прогрессом по группам продуктов',
  },
  '05-calorie-exchange': {
    en: 'Calorie exchange and workout options',
    ru: 'Обмен калорий и список тренировок',
  },
  '06-weekly-stats': {
    en: 'Weekly activity statistics with calories and steps',
    ru: 'Статистика активности за неделю с калориями и шагами',
  },
  '07-home-dark': {
    en: 'Home screen with dark mode enabled',
    ru: 'Главный экран в тёмной теме',
  },
  '08-ai-camera': {
    en: 'AI camera framing a meal of salmon, rice, and vegetables',
    ru: 'ИИ-камера с блюдом из лосося, риса и овощей в рамке',
    extension: 'jpg',
  },
  '09-weight-progress': {
    en: 'Annual weight progress with a goal and trend chart',
    ru: 'Контроль веса за год с целью и графиком динамики',
  },
};

const copyElements = [...document.querySelectorAll('[data-copy], [data-label]')];
const englishValues = copyElements.map((element) => {
  if (element.dataset.label) return element.getAttribute('aria-label');
  return element.textContent;
});

const languageLinks = [...document.querySelectorAll('[data-lang]')];
const themeToggle = document.querySelector('.theme-toggle');
const galleryButtons = [...document.querySelectorAll('[data-gallery]')];
const galleryImage = document.getElementById('gallery-image');
const galleryCaption = document.getElementById('gallery-caption');
const showcaseImages = document.querySelectorAll('[data-screen]:not(#gallery-image)');
const description = document.querySelector('meta[name="description"]');
const englishDescription = description.content;
let language = 'en';
let theme = 'light';

function updateImage(image) {
  const screen = (theme === 'dark' && image.dataset.darkHeroScreen) || image.dataset.screen;
  const usesDarkSet = theme === 'dark' && image.hasAttribute('data-theme-screen');
  const extension = screens[screen].extension ?? 'png';
  const source = `assets/screen-${language}-${usesDarkSet ? 'dark-' : ''}${screen}.${extension}`;
  image.toggleAttribute('data-dark-screen', usesDarkSet || screen === '07-home-dark');
  if (image.getAttribute('src') !== source) image.src = source;
  if (!image.closest('[aria-hidden="true"]')) image.alt = screens[screen][language];
}

function showScreen(screen) {
  const selected = galleryButtons.find((button) => button.dataset.gallery === screen);
  for (const button of galleryButtons) {
    button.setAttribute('aria-pressed', String(button === selected));
  }
  galleryImage.dataset.screen = screen;
  updateImage(galleryImage);
  galleryCaption.textContent = selected.textContent;
}

function updatePage() {
  language = new URLSearchParams(window.location.search).get('lang') === 'ru' ? 'ru' : 'en';
  theme = siteTheme.read();
  siteTheme.apply(theme);
  document.documentElement.lang = language;
  themeToggle.setAttribute('aria-checked', String(theme === 'dark'));
  description.content = language === 'ru'
    ? 'Следи за калориями, планируй питание и отслеживай активность с Calorie Tracker от EasyDay Apps.'
    : englishDescription;

  copyElements.forEach((element, index) => {
    const { copy, label } = element.dataset;
    const value = language === 'ru' ? russianCopy[copy || label] : englishValues[index];
    if (label) {
      element.setAttribute('aria-label', value);
    } else {
      element.textContent = value;
    }
  });

  for (const link of languageLinks) {
    const url = new URL(window.location.href);
    if (link.dataset.lang === 'ru') url.searchParams.set('lang', 'ru');
    else url.searchParams.delete('lang');
    link.href = url.href;

    if (link.dataset.lang === language) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  }

  showcaseImages.forEach(updateImage);
  showScreen(galleryImage.dataset.screen);
  siteTheme.updatePageLinks();
}

for (const link of languageLinks) {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (link.dataset.lang === language) return;
    history.pushState(null, '', link.href);
    updatePage();
  });
}

themeToggle.addEventListener('click', () => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const url = new URL(window.location.href);
  url.searchParams.set('theme', nextTheme);
  history.replaceState(null, '', url);
  siteTheme.save(nextTheme);
  updatePage();
});

for (const button of galleryButtons) {
  button.addEventListener('click', () => showScreen(button.dataset.gallery));
}

for (const link of document.querySelectorAll('[data-gallery-link]')) {
  link.addEventListener('click', () => showScreen(link.dataset.galleryLink));
}

window.addEventListener('popstate', updatePage);
updatePage();
themeToggle.hidden = false;
