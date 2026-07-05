 // ============================================================
// قائمة المصادر (مرتبة حسب طلبك)
// ============================================================

export const providers = [
  // ===== 1. VidSrc.pm =====
  {
    id: 'vidsrc.pm',
    label: 'VidSrc.pm',
    buildUrl: (p) => {
      if (p.type === 'movie') {
        return `https://vidsrc.pm/embed/movie/${p.id}`;
      } else if (p.type === 'tv') {
        return `https://vidsrc.pm/embed/tv/${p.id}/${p.season}/${p.episode}`;
      }
      return '';
    }
  },

  // ===== 2. MoviesAPI =====
  {
    id: 'moviesapi',
    label: 'MoviesAPI',
    buildUrl: (p) => {
      if (p.type === 'movie') {
        return `https://moviesapi.to/movie/${p.id}`;
      } else if (p.type === 'tv') {
        return `https://moviesapi.to/tv/${p.id}/${p.season}/${p.episode}`;
      }
      return '';
    }
  },

  // ===== 3. VidCore =====
  {
    id: 'vidcore',
    label: 'VidCore',
    buildUrl: (p) => {
      if (p.type === 'movie') {
        return `https://www.vidcore.org/embed/movie/${p.id}`;
      } else if (p.type === 'tv') {
        return `https://www.vidcore.org/embed/tv/${p.id}/${p.season}/${p.episode}`;
      }
      return '';
    }
  },

  // ===== 4. VidSrc.to =====
  {
    id: 'vidsrc.to',
    label: 'VidSrc.to',
    buildUrl: (p) => {
      if (p.type === 'movie') {
        return `https://vidsrc.to/embed/movie/${p.id}`;
      } else if (p.type === 'tv') {
        return `https://vidsrc.to/embed/tv/${p.id}/${p.season}/${p.episode}`;
      }
      return '';
    }
  },

  // ===== 5. VidSrc.me =====
  {
    id: 'vidsrc.me',
    label: 'VidSrc.me',
    buildUrl: (p) => {
      if (p.type === 'movie') {
        return `https://vidsrc.me/embed/movie/${p.id}`;
      } else if (p.type === 'tv') {
        return `https://vidsrc.me/embed/tv/${p.id}/${p.season}/${p.episode}`;
      }
      return '';
    }
  },

  // ===== 6. VidSrc.mov =====
  {
    id: 'vidsrc.mov',
    label: 'VidSrc.mov',
    buildUrl: (p) => {
      if (p.type === 'movie') {
        return `https://vidsrc.mov/embed/movie/${p.id}`;
      } else if (p.type === 'tv') {
        return `https://vidsrc.mov/embed/tv/${p.id}/${p.season}/${p.episode}`;
      }
      return '';
    }
  }
];

// ============================================================
// دالة مساعدة لبناء الرابط
// ============================================================
export const buildUrl = (provider, params) => {
  return provider.buildUrl(params);
};   
