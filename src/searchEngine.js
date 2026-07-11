// ================================================================
// 🔍 محرك البحث السريع - اختبار المصادر بالتوازي (Promise.race)
// ================================================================

import { providers, buildUrl } from './providers.js';

// ============================================================
// 1. اختبار المصدر بسرعة (مهلة 1 ثانية فقط)
// ============================================================
const testSource = async (url) => {
  if (!url) return { isAlive: false };
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // 1 ثانية فقط
    
    const response = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return { 
      isAlive: response.ok || response.status === 403 || response.status === 302,
      statusCode: response.status 
    };
  } catch {
    return { isAlive: false };
  }
};

// ============================================================
// 2. البحث السريع - أول مصدر يعمل
// ============================================================
export const searchSources = async (params) => {
  const { type, id, season, episode } = params;
  
  console.log(`⚡ بحث سريع عن: ${id}`);

  try {
    // نبحث عن أول مصدر يعمل (باستخدام Promise.any)
    const result = await Promise.any(
      providers.map(async (provider) => {
        // بناء الرابط
        let url = buildUrl(provider, { type, id, season, episode });
        
        // إذا فشل، نحاول تحويل المعرف
        if (!url && id.startsWith('tt')) {
          const numId = parseInt(id.replace('tt', ''));
          if (!isNaN(numId)) {
            url = buildUrl(provider, { type, id: numId, season, episode });
          }
        }
        
        if (!url) throw new Error('no url');
        
        // اختبار المصدر
        const status = await testSource(url);
        if (!status.isAlive) throw new Error('dead');
        
        return {
          provider: provider.id,
          label: provider.label,
          url: url,
          id: id,
          isAlive: true,
          statusCode: status.statusCode
        };
      })
    );

    console.log(`✅ تم العثور على مصدر: ${result.provider}`);
    return [result];

  } catch (error) {
    // إذا لم نجد أي مصدر خلال المهلة
    console.warn('⚠️ لم يتم العثور على أي مصدر يعمل');
    return [];
  }
};

// ============================================================
// 3. البحث عن أنمي (سريع)
// ============================================================
export const searchAnime = async (params) => {
  const { id, season, episode, language = 'sub', source = 's-2' } = params;
  
  try {
    const animeProvider = providers.find(p => p.id === 'animeplay');
    if (!animeProvider) return null;
    
    const url = animeProvider.buildUrl({
      type: 'tv',
      id: id,
      season: season,
      episode: episode,
      animeSource: source,
      language: language
    });
    
    if (!url) return null;
    
    const status = await testSource(url);
    if (status.isAlive) {
      return {
        provider: 'animeplay',
        label: 'AnimePlay.cfd',
        url: url,
        id: id,
        type: 'anime',
        language: language,
        isAlive: true
      };
    }
  } catch (e) {}
  return null;
};

console.log('⚡ محرك البحث السريع جاهز (Promise.race)');
