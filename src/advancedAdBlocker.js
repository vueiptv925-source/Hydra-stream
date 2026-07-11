// ================================================================
// 🛡️ نظام منع الإعلانات المتطور - 17 طبقة
// ================================================================
// ✅ بدون استخدام Sandbox أو أي قيود على مشغل الفيديو
// ✅ يعمل على مستوى الخادم والعميل معاً
// ================================================================

// ============================================================
// 📋 الطبقة 1: المصادر الموثوقة (خالية من الإعلانات)
// ============================================================
const TRUSTED_SOURCES = [
  'moviesapi.to',
  'player.videasy.net',
  'vidcore.org',
  'vidsrc.pm',
  'vidsrc.me',
  'vidsrc.mov',
  'vsembed.ru',
  'vidspark.to'
];

// ============================================================
// 📋 الطبقة 2: المصادر التي نتجاوزها (لا نعالجها)
// ============================================================
const SKIP_SOURCES = [
  'vidsrc.to',
  'vidsrc.sbs',
  'vidsrc.wiki',
  'vidsrc.top',
  'vidsrc.ru',
  'vidfast.vc'
];

// ============================================================
// 📋 الطبقة 3: أنماط الإعلانات (شاملة جداً)
// ============================================================
const AD_PATTERNS = [
  /doubleclick\.net/i, /googleadservices\.com/i, /googlesyndication\.com/i,
  /adservice\.google/i, /adserver\./i, /amazon-adsystem\.com/i,
  /facebook\.com\/tr/i, /taboola\.com/i, /outbrain\.com/i,
  /pubmatic\.com/i, /openx\.net/i, /rubiconproject\.com/i,
  /indexexchange\.com/i, /adnxs\.com/i, /contextweb\.com/i,
  /adform\.net/i, /criteo\.com/i, /bidswitch\.net/i,
  /casalemedia\.com/i, /teads\.tv/i, /adition\.com/i,
  /smartadserver\.com/i, /sovrn\.com/i, /sharethrough\.com/i,
  /sonobi\.com/i, /media\.net/i, /advertising\.com/i,
  /adsystem\.com/i, /adzerk\.net/i, /adnami\.io/i,
  /adobe\.com\/ad/i, /ads\.youtube\.com/i,
  /pagead2\.googlesyndication\.com/i,
  /banner\./i, /popup\./i, /click2c\./i, /tracking\./i,
  /affiliate\./i, /ad\.js/i, /ads\./i, /sponsor/i,
  /promoted/i, /pagead/i, /pubads/i, /prebid/i,
  /adfox\./i, /adriver\./i, /advert/i, /analytics\./i,
  /beacon\./i, /pixel\./i, /impression\./i,
  /conversion\./i, /retargeting\./i, /remarketing\./i,
  /video-ads/i, /ad-container/i, /ad-wrapper/i,
  /ad-overlay/i, /preroll/i, /midroll/i, /postroll/i,
  /skip-ad/i, /watch-ad/i, /ad-break/i,
  /advertisement/i, /advertising/i, /promo/i,
  /commercial/i, /sponsored/i, /partner/i, /branded/i,
  /juicyads\.com/i, /exoclick\.com/i, /popads\.net/i,
  /adsterra\.com/i, /propellerads\.com/i, /clickadu\.com/i,
  /mgid\.com/i, /revcontent\.com/i, /content\.ad/i,
  /native\.ad/i, /intext/i, /under\.io/i, /voluum/i,
  /cpmstar\.com/i, /appnexus\.com/i,
  /contextweb\.com/i, /lijit\.com/i,
  /adblade\.com/i, /adtech\.com/i, /adverttraffic\.com/i,
  /adwits\.com/i, /affiliate\.com/i, /banner\.com/i,
  /brand\.com/i, /campaign\.com/i, /click\.com/i,
  /conversion\.com/i, /display\.com/i, /impression\.com/i,
  /partner\.com/i, /pixel\.com/i, /promo\.com/i,
  /sponsor\.com/i, /track\.com/i, /trading\.com/i,
  /traffic\.com/i, /widget\.com/i
];

// ============================================================
// 📋 الطبقة 4: أنماط استخراج الفيديو
// ============================================================
const VIDEO_PATTERNS = [
  /(https?:[^\s<>"']+\.m3u8[^\s<>"']*)/gi,
  /(https?:[^\s<>"']+\.mp4[^\s<>"']*)/gi,
  /(https?:[^\s<>"']+\.ts[^\s<>"']*)/gi,
  /(?:file|videoUrl|src|source|url|playlist|manifest)\s*[:=]\s*["']([^"']+\.(?:m3u8|mp4|ts)[^"']*)["']/gi,
  /["'](https?:[^"']+\.(?:m3u8|mp4|ts)[^"']*)["']/gi,
  /["'](https?:[^"']+\.m3u8[^"']*)["']/gi,
  /["'](https?:[^"']+\.mp4[^"']*)["']/gi,
  /https?:\/\/[^\s<>"']+\.m3u8[^\s<>"']*/gi,
  /https?:\/\/[^\s<>"']+\.mp4[^\s<>"']*/gi,
  /https?:\/\/[^\s<>"']+\.ts[^\s<>"']*/gi
];

// ============================================================
// 📋 الطبقة 5: محددات HTML للإزالة
// ============================================================
const AD_SELECTORS = [
  '[id*="ad"]', '[id*="banner"]', '[id*="popup"]',
  '[id*="google"]', '[id*="doubleclick"]', '[id*="taboola"]',
  '[id*="outbrain"]', '[id*="sponsor"]', '[id*="promo"]',
  '[id*="commercial"]', '[id*="advertisement"]',
  '[id*="advertising"]', '[id*="partner"]', '[id*="branded"]',
  '[id*="tracking"]', '[id*="analytics"]',
  '[class*="ad"]', '[class*="banner"]', '[class*="popup"]',
  '[class*="google"]', '[class*="doubleclick"]',
  '[class*="taboola"]', '[class*="outbrain"]',
  '[class*="sponsor"]', '[class*="promo"]',
  '[class*="commercial"]', '[class*="advertisement"]',
  '[class*="advertising"]', '[class*="partner"]',
  '[class*="branded"]',
  '[class*="video-ads"]', '[class*="ad-container"]',
  '[class*="ad-wrapper"]', '[class*="ad-overlay"]',
  '[class*="preroll"]', '[class*="midroll"]',
  '[class*="postroll"]', '[class*="skip-ad"]',
  '[class*="ad-break"]',
  'iframe[src*="doubleclick"]', 'iframe[src*="googlead"]',
  'iframe[src*="adserver"]', 'iframe[src*="banner"]',
  'iframe[src*="taboola"]', 'iframe[src*="outbrain"]',
  '.video-ads', '.ad-container', '.advertisement',
  '.ads-box', '.ads-container', '.ad-slot',
  '.ad-wrapper', '.ad-overlay', '.preroll',
  '.midroll', '.postroll', '.ad-break',
  '.ad-banner', '.ad-popup', '.ad-sidebar',
  '.ad-footer', '.sponsored', '.promoted',
  '.partner-post', '.branded-content',
  'div[id*="ad"]', 'div[class*="ad"]',
  'div[id*="banner"]', 'div[class*="banner"]',
  'div[id*="popup"]', 'div[class*="popup"]',
  'span[id*="ad"]', 'span[class*="ad"]',
  'aside[id*="ad"]', 'aside[class*="ad"]',
  'section[id*="ad"]', 'section[class*="ad"]'
];

// ============================================================
// 📋 الطبقة 6: وكيل عشوائي
// ============================================================
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
];

const getRandomUserAgent = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

// ============================================================
// 📋 الطبقة 7: ذاكرة تخزين مؤقتة
// ============================================================
const adFreeCache = new Map();
const CACHE_TTL = 30 * 60 * 1000;

const cacheResult = (key, value) => {
  if (adFreeCache.size > 500) {
    const oldestKey = adFreeCache.keys().next().value;
    adFreeCache.delete(oldestKey);
  }
  adFreeCache.set(key, { url: value, timestamp: Date.now() });
};

const getCachedResult = (key) => {
  if (adFreeCache.has(key)) {
    const entry = adFreeCache.get(key);
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      return entry.url;
    }
    adFreeCache.delete(key);
  }
  return null;
};

// ============================================================
// 📋 الطبقة 8: تنقية الرابط
// ============================================================
const cleanUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const paramsToRemove = [
      'ref', 'utm_source', 'utm_medium', 'utm_campaign',
      'click_id', 'tracking', 'ad', 'banner', 'popup',
      'affiliate', 'partner', 'campaign', 'source',
      'fbclid', 'gclid', 'msclkid', 'dclid',
      'click', 'redirect', 'aff', 'subid',
      'utm_term', 'utm_content', 'utm_id', 'utm_partner',
      'utm_visitor', 'utm_click', 'utm_redirect'
    ];
    paramsToRemove.forEach(param => urlObj.searchParams.delete(param));
    return urlObj.toString();
  } catch { return url; }
};

// ============================================================
// 📋 الطبقة 9: التحقق من وجود إعلانات
// ============================================================
const containsAds = (url) => {
  if (!url) return true;
  return AD_PATTERNS.some(pattern => pattern.test(url));
};

// ============================================================
// 📋 الطبقة 10: استخراج الفيديو المباشر
// ============================================================
const extractVideoUrl = (html) => {
  for (const pattern of VIDEO_PATTERNS) {
    const matches = html.match(pattern);
    if (matches) {
      for (const match of matches) {
        const urlMatch = match.match(/(https?:[^\s<>"']+)/i);
        if (urlMatch && urlMatch[1] && urlMatch[1].startsWith('http')) {
          const cleaned = cleanUrl(urlMatch[1]);
          if (!containsAds(cleaned) && !cleaned.includes('ad') && !cleaned.includes('banner')) {
            return cleaned;
          }
        }
      }
    }
  }
  return null;
};

// ============================================================
// 📋 الطبقة 11: استخراج iframes متداخلة
// ============================================================
const extractNestedIframes = (html) => {
  const iframes = [];
  const pattern = /<iframe[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    if (match[1] && match[1].startsWith('http')) {
      if (!containsAds(match[1])) {
        iframes.push(match[1]);
      }
    }
  }
  return iframes;
};

// ============================================================
// 📋 الطبقة 12: جلب الصفحة مع وكيل عشوائي
// ============================================================
const fetchPage = async (url, timeout = 2000) => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'DNT': '1',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      signal: AbortSignal.timeout(timeout)
    });
    if (!response.ok) return null;
    return await response.text();
  } catch { return null; }
};

// ============================================================
// 📋 الطبقة 13: محاولة متعددة
// ============================================================
const fetchWithRetry = async (url, retries = 2) => {
  for (let i = 0; i < retries; i++) {
    const result = await fetchPage(url, 2000 + (i * 500));
    if (result) return result;
  }
  return null;
};

// ============================================================
// 📋 الطبقة 14-17: الوظيفة الرئيسية
// ============================================================
export const getAdFreeVideo = async (embedUrl, providerId) => {
  const cacheKey = `${providerId}:${embedUrl}`;
  
  const cached = getCachedResult(cacheKey);
  if (cached) {
    console.log(`⚡ [طبقة 1] من الكاش: ${cached}`);
    return cached;
  }

  if (TRUSTED_SOURCES.some(s => embedUrl.includes(s))) {
    const cleaned = cleanUrl(embedUrl);
    cacheResult(cacheKey, cleaned);
    console.log(`✅ [طبقة 2] مصدر موثوق: ${cleaned}`);
    return cleaned;
  }

  if (SKIP_SOURCES.some(s => embedUrl.includes(s))) {
    cacheResult(cacheKey, embedUrl);
    console.log(`⏭️ [طبقة 3] مصدر متجاوز: ${embedUrl}`);
    return embedUrl;
  }

  console.log(`🛡️ [طبقة 4-17] محاولة منع الإعلانات من: ${providerId}`);

  try {
    const html = await fetchWithRetry(embedUrl);
    if (!html) {
      console.warn(`⚠️ [طبقة 4-5] فشل جلب الصفحة`);
      cacheResult(cacheKey, embedUrl);
      return embedUrl;
    }

    const videoUrl = extractVideoUrl(html);
    if (videoUrl) {
      cacheResult(cacheKey, videoUrl);
      console.log(`✅ [طبقة 6] فيديو مباشر: ${videoUrl}`);
      return videoUrl;
    }

    const iframes = extractNestedIframes(html);
    for (const iframeUrl of iframes) {
      const iframeHtml = await fetchWithRetry(iframeUrl);
      if (iframeHtml) {
        const iframeVideo = extractVideoUrl(iframeHtml);
        if (iframeVideo) {
          cacheResult(cacheKey, iframeVideo);
          console.log(`✅ [طبقة 7] فيديو من iframe: ${iframeVideo}`);
          return iframeVideo;
        }
      }
    }

    const cleanedUrl = cleanUrl(embedUrl);
    if (!containsAds(cleanedUrl)) {
      cacheResult(cacheKey, cleanedUrl);
      console.log(`✅ [طبقة 8] رابط منقى: ${cleanedUrl}`);
      return cleanedUrl;
    }

    console.warn(`⚠️ [طبقة 9-17] لم نتمكن من إزالة الإعلانات`);
    cacheResult(cacheKey, embedUrl);
    return embedUrl;

  } catch (error) {
    console.warn(`⚠️ [طبقة 17] فشل منع الإعلانات: ${error.message}`);
    cacheResult(cacheKey, embedUrl);
    return embedUrl;
  }
};

export const getAdRemovalScript = () => {
  return `
    (function() {
      const selectors = ${JSON.stringify(AD_SELECTORS)};
      selectors.forEach(function(selector) {
        document.querySelectorAll(selector).forEach(function(el) { el.remove(); });
      });
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              const el = node;
              if (el.id && el.id.match(/ad|banner|popup|google|doubleclick|taboola|outbrain|sponsor|promo|commercial|advertisement|advertising|partner|branded|tracking|analytics/i)) {
                el.remove();
              }
              if (el.className && typeof el.className === 'string' && el.className.match(/ad|banner|popup|google|doubleclick|taboola|outbrain|sponsor|promo|commercial|advertisement|advertising|partner|branded|video-ads|ad-container|ad-wrapper|ad-overlay|preroll|midroll|postroll|skip-ad|ad-break|ads-box|ads-container|ad-slot|ad-banner|ad-popup|ad-sidebar|ad-footer|sponsored|promoted|partner-post|branded-content/i)) {
                el.remove();
              }
            }
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setInterval(function() {
        document.querySelectorAll('[style*="fixed"],[style*="absolute"],[style*="z-index"]').forEach(function(el) {
          if (el.id && el.id.match(/ad|banner|popup|modal|overlay/i)) {
            el.remove();
          }
          if (el.className && typeof el.className === 'string' && el.className.match(/ad|banner|popup|modal|overlay/i)) {
            el.remove();
          }
        });
      }, 1000);
    })();
  `;
};

export default {
  getAdFreeVideo,
  getAdRemovalScript,
  cleanUrl,
  containsAds,
  TRUSTED_SOURCES
};

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of adFreeCache) {
    if (now - value.timestamp < CACHE_TTL) continue;
    adFreeCache.delete(key);
  }
}, 60 * 60 * 1000);

console.log('🛡️ نظام منع الإعلانات المتطور (17 طبقة) جاهز!');
