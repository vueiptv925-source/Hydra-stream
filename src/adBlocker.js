// ================================================================
// 🛡️ منع الإعلانات - نسخة سريعة
// ================================================================

const TRUSTED_SOURCES = [
  'moviesapi.to',
  'player.videasy.net',
  'vidcore.org',
  'vidsrc.pm',
  'vidsrc.me'
];

const AD_PATTERNS = [
  /doubleclick\.net/i, /googleadservices\.com/i, /googlesyndication\.com/i,
  /adservice\.google/i, /adserver\./i, /banner\./i, /popup\./i,
  /tracking\./i, /ads\./i, /sponsor/i, /pagead/i, /pubads/i,
  /prebid/i, /amazon-adsystem\.com/i, /facebook\.com\/tr/i,
  /taboola\.com/i, /outbrain\.com/i, /pubmatic\.com/i,
  /openx\.net/i, /rubiconproject\.com/i, /indexexchange\.com/i,
  /adnxs\.com/i, /contextweb\.com/i, /adform\.net/i,
  /criteo\.com/i, /bidswitch\.net/i, /casalemedia\.com/i,
  /teads\.tv/i, /adition\.com/i, /smartadserver\.com/i,
  /sovrn\.com/i, /sharethrough\.com/i, /sonobi\.com/i,
  /media\.net/i, /advertising\.com/i, /adsystem\.com/i,
  /adzerk\.net/i, /adnami\.io/i, /adobe\.com\/ad/i,
  /ads\.youtube\.com/i, /pagead2\.googlesyndication\.com/i
];

const VIDEO_PATTERNS = [
  /(https?:[^\s<>"']+\.m3u8[^\s<>"']*)/gi,
  /(https?:[^\s<>"']+\.mp4[^\s<>"']*)/gi,
  /(?:file|videoUrl|src|source)\s*[:=]\s*["']([^"']+\.(?:m3u8|mp4|ts)[^"']*)["']/gi,
  /["'](https?:[^"']+\.(?:m3u8|mp4|ts)[^"']*)["']/gi
];

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0'
];

const getRandomUserAgent = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

const cleanUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const paramsToRemove = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'click_id', 'tracking', 'ad', 'banner', 'popup', 'fbclid', 'gclid'];
    paramsToRemove.forEach(param => urlObj.searchParams.delete(param));
    return urlObj.toString();
  } catch {
    return url;
  }
};

const containsAds = (url) => {
  if (!url) return true;
  return AD_PATTERNS.some(pattern => pattern.test(url));
};

const extractVideoUrl = (html) => {
  for (const pattern of VIDEO_PATTERNS) {
    const matches = html.match(pattern);
    if (matches) {
      for (const match of matches) {
        const urlMatch = match.match(/(https?:[^\s<>"']+)/i);
        if (urlMatch && urlMatch[1] && urlMatch[1].startsWith('http')) {
          const cleaned = cleanUrl(urlMatch[1]);
          if (!containsAds(cleaned)) return cleaned;
        }
      }
    }
  }
  return null;
};

// ============================================================
// الوظيفة الرئيسية (سريعة، مهلة 2 ثانية)
// ============================================================
export const getAdFreeVideo = async (embedUrl, providerId) => {
  // 1. المصادر الموثوقة (لا نحتاج لاختبار)
  if (TRUSTED_SOURCES.some(s => embedUrl.includes(s))) {
    return cleanUrl(embedUrl);
  }

  try {
    // 2. محاولة واحدة فقط، مهلة 2 ثانية
    const response = await fetch(embedUrl, {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'DNT': '1',
        'Cache-Control': 'no-cache'
      },
      signal: AbortSignal.timeout(2000) // 2 ثانية فقط
    });

    if (!response.ok) return embedUrl;

    const html = await response.text();
    const videoUrl = extractVideoUrl(html);
    if (videoUrl) return videoUrl;

    return cleanUrl(embedUrl);

  } catch (error) {
    return embedUrl;
  }
};
