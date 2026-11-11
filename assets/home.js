'use strict';

const russianCopy = {
  skip: 'Перейти к содержимому',
  navigation: 'Основная навигация',
  language: 'Язык сайта',
  gallery: 'Скриншоты приложения',
  footer: 'Поддержка и документы',
  navFeatures: 'Возможности',
  navHow: 'Как работает',
  navApp: 'Приложение',
  navSupport: 'Поддержка',
  getApp: 'Получить приложение',
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
  fastingTitle: 'Интервальное голодание',
  featureFasting: 'Отслеживай время приёмов пищи и интервалы между ними.',
  aiTitle: 'Узнавай калории по фото',
  aiDescription: 'Сфотографируй блюдо и получи оценку калорийности и состава. Её можно использовать для записи в дневнике питания.',
  aiCaption: 'Блюда и их состав в приложении',
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
  screenDark: 'Тёмная тема',
  downloadTitle: 'Начни с полезных привычек',
  downloadDescription: 'Calorie Tracker проходит закрытое тестирование в Google Play.',
  testing: 'Узнать о тестировании Android',
  testingSubject: 'Тестирование Calorie Tracker',
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
};

const copyElements = [...document.querySelectorAll('[data-copy], [data-label], [data-subject]')];
const englishValues = copyElements.map((element) => {
  if (element.dataset.label) return element.getAttribute('aria-label');
  if (element.dataset.subject) return 'Calorie Tracker testing';
  return element.textContent;
});

const languageLinks = [...document.querySelectorAll('[data-lang]')];
const galleryButtons = [...document.querySelectorAll('[data-gallery]')];
const galleryImage = document.getElementById('gallery-image');
const galleryCaption = document.getElementById('gallery-caption');
const description = document.querySelector('meta[name="description"]');
const englishDescription = description.content;
let language = 'en';

function updateImage(image) {
  const screen = image.dataset.screen;
  const source = 'assets/screen-' + language + '-' + screen + '.png';
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

function updateLanguage() {
  language = new URLSearchParams(window.location.search).get('lang') === 'ru' ? 'ru' : 'en';
  document.documentElement.lang = language;
  description.content = language === 'ru'
    ? 'Следи за калориями, планируй питание и отслеживай активность с Calorie Tracker от EasyDay Apps.'
    : englishDescription;

  copyElements.forEach((element, index) => {
    const { copy, label, subject } = element.dataset;
    const value = language === 'ru' ? russianCopy[copy || label || subject] : englishValues[index];
    if (label) {
      element.setAttribute('aria-label', value);
    } else if (subject) {
      element.href = 'mailto:easyday.appstudio@gmail.com?subject=' + encodeURIComponent(value);
    } else {
      element.textContent = value;
    }
  });

  for (const link of languageLinks) {
    if (link.dataset.lang === language) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  }

  document.querySelectorAll('[data-screen]').forEach(updateImage);
  showScreen(galleryImage.dataset.screen);
}

for (const link of languageLinks) {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (link.dataset.lang === language) return;
    const url = new URL(window.location.href);
    if (link.dataset.lang === 'ru') {
      url.searchParams.set('lang', 'ru');
    } else {
      url.searchParams.delete('lang');
    }
    history.pushState(null, '', url);
    updateLanguage();
  });
}

for (const button of galleryButtons) {
  button.addEventListener('click', () => showScreen(button.dataset.gallery));
}

for (const link of document.querySelectorAll('[data-gallery-link]')) {
  link.addEventListener('click', () => showScreen(link.dataset.galleryLink));
}

window.addEventListener('popstate', updateLanguage);
updateLanguage();
