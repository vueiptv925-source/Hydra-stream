// ================================================================
// 🎬 قائمة المصادر (تم التحقق من صلاحيتها - يوليو 2026)
// ================================================================

export const providers = [
  // ============================================================
  // ✅ المصادر الأساسية (Core) - الأكثر استقراراً
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
  {
    id: 'vidsrc.pm',
    label: 'VidSrc.pm',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.pm/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.pm/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
  {
    id: 'vidlink',
    label: 'VidLink',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidlink.pro/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidlink.pro/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
  {
    id: 'vidfast',
    label: 'VidFast',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidfast.pro/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidfast.pro/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
  {
    id: 'vidsrc.cc',
    label: 'VidSrc.cc',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.cc/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.cc/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
  {
    id: '2embed.skin',
    label: '2Embed.skin',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://2embed.skin/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://2embed.skin/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
  {
    id: '2embed.cc',
    label: '2Embed.cc',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://www.2embed.cc/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://www.2embed.cc/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },

  // ============================================================
  // 🟢 مصادر بديلة قوية (Extras)
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
  {
    id: 'vidcore',
    label: 'VidCore',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidcore.org/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidcore.org/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
  {
    id: 'superembed',
    label: 'SuperEmbed',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://superembed.stream/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://superembed.stream/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
  {
    id: 'videasy',
    label: 'Videasy',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://player.videasy.net/movie/${p.id}`;
      if (p.type === 'tv') return `https://player.videasy.net/tv/${p.id}`;
      return '';
    }
  },
  {
    id: 'vidsrc.wiki',
    label: 'VidSrc.wiki',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.wiki/embed/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.wiki/embed/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
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
  // 🔵 مصادر إضافية (قد تعمل في بعض المناطق)
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
  {
    id: 'vidsrc.ru',
    label: 'VidSrc.ru',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidsrc.ru/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidsrc.ru/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
  {
    id: 'vidfast.vc',
    label: 'VidFast.vc',
    buildUrl: (p) => {
      if (p.type === 'movie') return `https://vidfast.vc/movie/${p.id}`;
      if (p.type === 'tv') return `https://vidfast.vc/tv/${p.id}/${p.season}/${p.episode}`;
      return '';
    }
  },
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
  // 🟣 مصادر الأنمي (متخصصة)
  // ============================================================
  {
    id: 'animeplay',
    label: 'AnimePlay.cfd',
    buildUrl: (p) => {
      if (p.type === 'tv' && p.animeSource) {
        const source = p.animeSource || 's-2';
        const epNum = p.episode || 1;
        const lang = p.language || 'sub';
        if (source === 's-2') return `https://animeplay.cfd/stream/s-2/${p.id}/${lang}`;
        if (source === 'mal') return `https://animeplay.cfd/stream/mal/${p.id}/${epNum}/${lang}`;
        if (source === 'ani') return `https://animeplay.cfd/stream/ani/${p.id}/${epNum}/${lang}`;
      }
      return '';
    }
  },

  // ============================================================
  // ⚠️ المصادر التي تم إزالتها (لا تعمل حاليًا)
  // ============================================================
  // تم إزالة المصادر التالية لأنها متوقفة أو غير موثوقة:
  // - vidsrc.me (غير مؤكد)
  // - vidsrc.mov (غير مؤكد)
  // - 111movies.net (غير مؤكد)
  // - vidzee.wtf (غير مؤكد)
  // - vidnest.fun (غير مؤكد)
  // - cinesrc.st (غير مؤكد)
  // - wavembed.lol (غير مؤكد)
  // - vidzen.fun (غير مؤكد)
  // - vidphantom.com (غير مؤكد)
  // - cinemaos.tech (موقع مشبوه)
  // - apiplayer.ru (لا يعمل)
  // ============================================================
];

export const buildUrl = (provider, params) => {
  return provider.buildUrl(params);
};
