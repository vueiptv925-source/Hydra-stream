// ============================================================
// قائمة المصادر (4 مصادر فقط - تعمل جميعها)
// ============================================================

export const providers = [
  { 
    id: 'vidsrc.to', 
    label: 'VidSrc.to', 
    buildUrl: (p) => `https://vidsrc.to/embed/${p.type}/${p.id}${p.type === 'tv' ? `/${p.season}/${p.episode}` : ''}` 
  },
  { 
    id: 'vidsrc.pm', 
    label: 'VidSrc.pm', 
    buildUrl: (p) => `https://vidsrc.pm/embed/${p.type}/${p.id}${p.type === 'tv' ? `/${p.season}/${p.episode}` : ''}` 
  },
  { 
    id: 'vidsrc.me', 
    label: 'VidSrc.me', 
    buildUrl: (p) => `https://vidsrc.me/embed/${p.type}/${p.id}${p.type === 'tv' ? `/${p.season}/${p.episode}` : ''}` 
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
