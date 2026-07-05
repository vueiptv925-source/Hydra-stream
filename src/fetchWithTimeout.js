import { circuitBreaker } from './circuitBreaker.js';

// دالة لجلب مصدر معين مع Timeout
const fetchWithTimeout = async (url, providerId, timeout = 6000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout (${timeout}ms)`));
    }, timeout);
    
    fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    })
      .then(response => {
        clearTimeout(timer);
        if (response.ok || response.status === 403) {
          circuitBreaker.recordSuccess(providerId);
          resolve({ providerId, url, status: 'success' });
        } else {
          circuitBreaker.recordFailure(providerId);
          reject(new Error(`HTTP ${response.status}`));
        }
      })
      .catch(error => {
        clearTimeout(timer);
        circuitBreaker.recordFailure(providerId);
        reject(error);
      });
  });
};

// دالة لجلب المصادر بالتوازي (Promise.any)
export const fetchSourcesParallel = async (sources, maxWait = 10000) => {
  const startTime = Date.now();
  
  // تصفية المصادر المفتوحة (Circuit Breaker)
  const availableSources = sources.filter(s => !circuitBreaker.isOpen(s.id));
  
  if (availableSources.length === 0) {
    throw new Error('جميع المصادر معطلة حالياً، حاول بعد 15 دقيقة');
  }
  
  // إنشاء طلبات متوازية (كل مصدر له Timeout خاص به)
  const fetchPromises = availableSources.map(source => 
    fetchWithTimeout(source.url, source.id, 6000)
  );
  
  try {
    // Promise.any: نجاح أول مصدر يرد
    const result = await Promise.any(fetchPromises);
    console.log(`✅ تم الحصول على مصدر ${result.providerId} في ${Date.now() - startTime}ms`);
    return result;
  } catch (error) {
    console.error('❌ فشل جميع المصادر:', error.message);
    throw new Error('جميع المصادر غير متاحة حالياً');
  }
};
