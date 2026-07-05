import { providers, buildUrl } from './providers.js';
import { fetchSourcesParallel } from './fetchWithTimeout.js';

export const getStreams = async (params) => {
  // بناء جميع الروابط
  const allSources = providers.map(provider => ({
    id: provider.id,
    label: provider.label,
    url: buildUrl(provider, params)
  }));

  try {
    // محاولة اختيار أفضل مصدر (محاكاة)
    const result = await fetchSourcesParallel(allSources);
    
    // إرجاع المصدر المختار فقط (يمكنك تعديله لإرجاع الكل)
    return [{
      id: result.providerId,
      label: providers.find(p => p.id === result.providerId)?.label || result.providerId,
      url: result.url,
      status: 'ready'
    }];
  } catch (error) {
    // في حالة الفشل، إرجاع جميع المصادر كاحتياطي
    return allSources.map(s => ({
      ...s,
      status: '⚠️ حاول مرة أخرى'
    }));
  }
};
