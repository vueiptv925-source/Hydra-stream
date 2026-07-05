import { providers, buildUrl } from './providers.js';
import { fetchSourcesParallel } from './fetchWithTimeout.js';
import { circuitBreaker } from './circuitBreaker.js';

const memoryCache = new Map();
const CACHE_TTL = 60 * 60 * 1000;

export const getStreams = async (params) => {
  const cacheKey = `${params.type}:${params.id}:${params.season}:${params.episode}`;

  if (memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey);
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      console.log(`✅ من الكاش: ${cacheKey}`);
      return entry.sources;
    }
  }

  const allSources = providers
    .filter(provider => !circuitBreaker.isOpen(provider.id))
    .map(provider => ({
      id: provider.id,
      label: provider.label,
      url: buildUrl(provider, params)
    }));

  if (allSources.length === 0) {
    const fallback = providers.map(p => ({
      id: p.id,
      label: p.label,
      url: buildUrl(p, params),
      status: '⏳ معطل مؤقتاً'
    }));
    return fallback;
  }

  try {
    const result = await fetchSourcesParallel(allSources);
    const sources = [{
      id: result.providerId,
      label: providers.find(p => p.id === result.providerId)?.label || result.providerId,
      url: result.url,
      status: 'ready'
    }];
    
    memoryCache.set(cacheKey, { timestamp: Date.now(), sources });
    return sources;
  } catch (error) {
    const fallback = allSources.map(s => ({
      ...s,
      status: '⚠️ حاول مرة أخرى'
    }));
    return fallback;
  }
};
