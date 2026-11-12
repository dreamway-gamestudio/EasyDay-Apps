'use strict';

const siteTheme = {
  read() {
    const requested = new URLSearchParams(location.search).get('theme');
    if (requested === 'light' || requested === 'dark') return requested;

    try {
      return localStorage.getItem('easyday-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  },

  apply(theme) {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#111510' : '#f8f7f2';
  },

  save(theme) {
    try {
      localStorage.setItem('easyday-theme', theme);
    } catch {
      // The URL still carries the selected theme when storage is unavailable.
    }
  },

  updatePageLinks() {
    const current = new URLSearchParams(location.search);
    const theme = current.get('theme');
    for (const link of document.querySelectorAll('a[href*=".html"]:not([data-lang])')) {
      const url = new URL(link.href);
      if (url.origin !== location.origin || !url.pathname.endsWith('.html')) continue;

      if (current.get('lang') === 'ru') url.searchParams.set('lang', 'ru');
      else url.searchParams.delete('lang');

      if (theme === 'light' || theme === 'dark') url.searchParams.set('theme', theme);
      else url.searchParams.delete('theme');

      link.href = url.pathname + url.search + url.hash;
    }
  },
};

siteTheme.apply(siteTheme.read());
document.addEventListener('DOMContentLoaded', siteTheme.updatePageLinks);
