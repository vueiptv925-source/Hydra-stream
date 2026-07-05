// ============================================================
// قائمة المصادر (4 مصادر فقط - تعمل جميعها)
// ============================================================

export const providers = [
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
  }
];

export const buildUrl = (provider, params) => {
  return provider.buildUrl(params);
};
