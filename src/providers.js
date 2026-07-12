// ================================================================
// 🎬 قائمة المصادر النهائية (23 مصدراً)
// 📅 تاريخ التحديث: 12 يوليو 2026
// ✅ المصادر الأساسية + المصادر العربية المضافة
// ================================================================

export const providers = [
  // ============================================================
  // 🔵 المصادر الأساسية (12 مصدراً)
  // ============================================================

  // 1. VidSrc.pm
  {
    id: 'vidsrc.pm',
    label: 'VidSrc.pm',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.pm/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.pm/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 2. MoviesAPI
  {
    id: 'moviesapi',
    label: 'MoviesAPI',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://moviesapi.to/movie/${p.id}`;
      if (p.type === 'tv') return `https://moviesapi.to/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 3. 111Movies
  {
    id: '111movies',
    label: '111Movies',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://111movies.net/movie/${p.id}`;
      if (p.type === 'tv') return `https://111movies.net/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 4. VidCore
  {
    id: 'vidcore',
    label: 'VidCore',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidcore.org/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidcore.org/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 5. VidSrc.to
  {
    id: 'vidsrc.to',
    label: 'VidSrc.to',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.to/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.to/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 6. VidSrc.me
  {
    id: 'vidsrc.me',
    label: 'VidSrc.me',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.me/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.me/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 7. VidLink.pro
  {
    id: 'vidlink',
    label: 'VidLink.pro',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidlink.pro/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidlink.pro/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 8. VsEmbed.ru
  {
    id: 'vsembed',
    label: 'VsEmbed.ru',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vsembed.ru/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vsembed.ru/embed/tv/${p.id}`;
      return '';
    }
  },

  // 9. VidSrc.top
  {
    id: 'vidsrc.top',
    label: 'VidSrc.top',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vid-src.top/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vid-src.top/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 10. VidSpark.to
  {
    id: 'vidspark',
    label: 'VidSpark.to',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidspark.to/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidspark.to/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 11. AutoEmbed.co
  {
    id: 'autoembed',
    label: 'AutoEmbed.co',
    buildUrl: (p) => {
      if (p.type === 'movie') {
        if (p.id.startsWith('tt')) {
          return `https://autoembed.co/movie/imdb/${p.id}`;
        } else {
          return `https://autoembed.co/movie/tmdb/${p.id}`;
        }
      }
      if (p.type === 'tv') {
        if (p.id.startsWith('tt')) {
          return `https://autoembed.co/tv/imdb/${p.id}-${p.season}-${p.episode}`;
        } else {
          return `https://autoembed.co/tv/tmdb/${p.id}-${p.season}-${p.episode}`;
        }
      }
      return '';
    }
  },

  // 12. VidSrc.in
  {
    id: 'vidsrc.in',
    label: 'VidSrc.in',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.in/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.in/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 🟢 المصادر العربية (11 مصدراً)
  // ============================================================

  // 13. Faselhd
  {
    id: 'faselhd',
    label: 'Faselhd',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://www.fasel-hd.com/movie/${p.id}`;
      if (p.type === 'tv') return `https://www.fasel-hd.com/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 14. WeCima
  {
    id: 'wecima',
    label: 'WeCima',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://wecima.gold/movie/${p.id}`;
      if (p.type === 'tv') return `https://wecima.gold/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 15. Akwam (أكوام)
  {
    id: 'akwam',
    label: 'Akwam',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://akwams.org/movie/${p.id}`;
      if (p.type === 'tv') return `https://akwams.org/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 16. LodyNet
  {
    id: 'lodynet',
    label: 'LodyNet',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://lodynet.watch/movie/${p.id}`;
      if (p.type === 'tv') return `https://lodynet.watch/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 17. TopCinema
  {
    id: 'topcinema',
    label: 'TopCinema',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://topcinemaa.top/movie/${p.id}`;
      if (p.type === 'tv') return `https://topcinemaa.top/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 18. Arabseed (بذور العرب)
  {
    id: 'arabseed',
    label: 'Arabseed',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://arabseed.in/movie/${p.id}`;
      if (p.type === 'tv') return `https://arabseed.in/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 19. 3isk (قصة عشق)
  {
    id: '3isk',
    label: '3isk',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://3iskk.xyz/movie/${p.id}`;
      if (p.type === 'tv') return `https://3iskk.xyz/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 20. Witanime
  {
    id: 'witanime',
    label: 'Witanime',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://www.witanime.net/movie/${p.id}`;
      if (p.type === 'tv') return `https://www.witanime.net/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 21. Anime4up
  {
    id: 'anime4up',
    label: 'Anime4up',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://www.anime4up.bond/movie/${p.id}`;
      if (p.type === 'tv') return `https://www.anime4up.bond/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 22. Egydead
  {
    id: 'egydead',
    label: 'Egydead',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://tv10.egydead.live/movie/${p.id}`;
      if (p.type === 'tv') return `https://tv10.egydead.live/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // 23. Shahid4u
  {
    id: 'shahid4u',
    label: 'Shahid4u',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://shhahidd4u.net/movie/${p.id}`;
      if (p.type === 'tv') return `https://shhahidd4u.net/tv/${p.id}/${p.season}/${p.episode}`;
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
