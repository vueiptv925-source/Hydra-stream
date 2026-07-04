// 20 مصدر بث - مقسمة إلى أساسية (Core) واحتياطية (Extras)
// المصادر الأساسية هي الأكثر استقراراً، والاحتياطية للتعويض عند موت أي منها

export const providers = [
  // ===== المصادر الأساسية (Core) - الأكثر استقراراً =====
  { 
    id: 'vidsrc.to', 
    label: 'VidSrc.to',
    buildUrl: (params) => `https://vidsrc.to/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'vidsrc.pm', 
    label: 'VidSrc.pm',
    buildUrl: (params) => `https://vidsrc.pm/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'vidsrc.cc', 
    label: 'VidSrc.cc',
    buildUrl: (params) => `https://vidsrc.cc/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'vidlink', 
    label: 'VidLink',
    buildUrl: (params) => `https://vidlink.pro/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'vidfast', 
    label: 'VidFast',
    buildUrl: (params) => `https://vidfast.pro/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: '2embed.cc', 
    label: '2Embed.cc',
    buildUrl: (params) => `https://www.2embed.cc/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: '2embed.skin', 
    label: '2Embed.skin',
    buildUrl: (params) => `https://2embed.skin/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'vidsrc.me', 
    label: 'VidSrc.me',
    buildUrl: (params) => `https://vidsrc.me/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },

  // ===== المصادر الاحتياطية (Extras) - للتعويض عند موت أي مصدر أساسي =====
  { 
    id: 'autoembed.co', 
    label: 'AutoEmbed.co',
    buildUrl: (params) => `https://autoembed.co/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'smashystream', 
    label: 'SmashyStream',
    buildUrl: (params) => `https://smashystream.com/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'moviesapi.to', 
    label: 'MoviesAPI.to',
    buildUrl: (params) => `https://moviesapi.to/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'nontongo.win', 
    label: 'Nontongo.win',
    buildUrl: (params) => `https://nontongo.win/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'frembed', 
    label: 'FrEmbed',
    buildUrl: (params) => `https://frembed.xyz/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'vixsrc', 
    label: 'VixSrc',
    buildUrl: (params) => `https://vixsrc.net/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'multiembed', 
    label: 'MultiEmbed',
    buildUrl: (params) => `https://multiembed.ru/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'embed.su', 
    label: 'Embed.su',
    buildUrl: (params) => `https://embed.su/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'movie-web', 
    label: 'Movie-Web',
    buildUrl: (params) => `https://movie-web.app/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'vidcore', 
    label: 'VidCore',
    buildUrl: (params) => `https://vidcore.xyz/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'superembed', 
    label: 'SuperEmbed',
    buildUrl: (params) => `https://superembed.xyz/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'flixhq', 
    label: 'FlixHQ',
    buildUrl: (params) => `https://flixhq.to/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  },
  { 
    id: 'watchseries', 
    label: 'WatchSeries',
    buildUrl: (params) => `https://watchseriesx.to/embed/${params.type}/${params.id}${params.type === 'tv' ? `/${params.season}/${params.episode}` : ''}`
  }
];

// دالة مساعدة لبناء الرابط
export const buildUrl = (provider, params) => {
  return provider.buildUrl(params);
};
