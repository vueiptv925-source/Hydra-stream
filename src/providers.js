// ================================================================
// 🎬 قائمة المصادر (22 مصدراً) - تم التحقق من عملها جميعاً
// ================================================================

export const providers = [
  // ============================================================
  // 1. VidSrc.pm (يعمل - معرف IMDb)
  // ============================================================
  {
    id: 'vidsrc.pm',
    label: 'VidSrc.pm',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.pm/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.pm/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 2. MoviesAPI (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'moviesapi',
    label: 'MoviesAPI',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://moviesapi.to/movie/${p.id}`;
      if (p.type === 'tv') return `https://moviesapi.to/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 3. VidCore.org (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidcore',
    label: 'VidCore.org',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://www.vidcore.org/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://www.vidcore.org/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 4. VidSrc.to (يعمل - معرف IMDb)
  // ============================================================
  {
    id: 'vidsrc.to',
    label: 'VidSrc.to',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.to/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.to/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 5. VidSrc.me (يعمل - معرف IMDb)
  // ============================================================
  {
    id: 'vidsrc.me',
    label: 'VidSrc.me',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.me/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.me/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 6. VidSrc.mov (يعمل - معرف IMDb)
  // ============================================================
  {
    id: 'vidsrc.mov',
    label: 'VidSrc.mov',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.mov/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.mov/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 7. Videasy (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'videasy',
    label: 'Videasy',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://player.videasy.net/movie/${p.id}`;
      if (p.type === 'tv') return `https://player.videasy.net/tv/${p.id}`;
      return '';
    }
  },

  // ============================================================
  // 8. VidSrc.wiki (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidsrc.wiki',
    label: 'VidSrc.wiki',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.wiki/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.wiki/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 9. VidSrc.sbs (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidsrc.sbs',
    label: 'VidSrc.sbs',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.sbs/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.sbs/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 10. StreamVaultSrc.click (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'streamvaultsrc',
    label: 'StreamVaultSrc.click',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://streamvaultsrc.click/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://streamvaultsrc.click/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 11. VidSrc.top (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidsrc.top',
    label: 'VidSrc.top',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vid-src.top/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vid-src.top/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 12. VidSrc.ru (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidsrc.ru',
    label: 'VidSrc.ru',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.ru/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.ru/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 13. VidFast.vc (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidfast.vc',
    label: 'VidFast.vc',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidfast.vc/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidfast.vc/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 14. CinemaOS.tech (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'cinemaos',
    label: 'CinemaOS.tech',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://cinemaos.tech/player/movie/${p.id}`;
      if (p.type === 'tv') return `https://cinemaos.tech/player/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 15. 111Movies.net (يعمل - معرف رقمي)
  // ============================================================
  {
    id: '111movies',
    label: '111Movies.net',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://111movies.net/movie/${p.id}`;
      if (p.type === 'tv') return `https://111movies.net/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 16. VidZee.wtf (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidzee',
    label: 'VidZee.wtf',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://player.vidzee.wtf/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://player.vidzee.wtf/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 17. VidNest.fun (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidnest',
    label: 'VidNest.fun',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidnest.fun/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidnest.fun/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 18. CineSrc.st (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'cinesrc',
    label: 'CineSrc.st',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://cinesrc.st/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://cinesrc.st/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 19. WavEmbed.lol (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'wavembed',
    label: 'WavEmbed.lol',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://wavembed.lol/movie/${p.id}`;
      if (p.type === 'tv') return `https://wavembed.lol/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 20. APIPlayer.ru (يعمل - معرف IMDb / رقمي)
  // ============================================================
  {
    id: 'apiplayer',
    label: 'APIPlayer.ru',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://apiplayer.ru/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://apiplayer.ru/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 21. VidZen.fun (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidzen',
    label: 'VidZen.fun',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidzen.fun/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidzen.fun/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 22. VidPhantom.com (يعمل - معرف رقمي)
  // ============================================================
  {
    id: 'vidphantom',
    label: 'VidPhantom.com',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidphantom.com/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidphantom.com/tv/${p.id}/${p.season}/${p.episode}`;
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
