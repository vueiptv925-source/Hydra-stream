import { circuitBreaker } from './circuitBreaker.js';

// محاكاة جلب المصادر (بدون اتصال خارجي)
const simulateFetch = (url, providerId) => {
  return new Promise((resolve, reject) => {
    // محاكاة نجاح عشوائي (لتجربة الميزة)
    const isSuccess = Math.random() > 0.3; // 70% نجاح
    
    setTimeout(() => {
      if (isSuccess) {
        circuitBreaker.recordSuccess(providerId);
        resolve({ providerId, url, status: 'success' });
      } else {
        circuitBreaker.recordFailure(providerId);
        reject(new Error('محاكاة فشل المصدر'));
      }
    }, 200); // محاكاة زمن الاستجابة
  });
};

// جلب المصادر بالتوازي (محاكاة)
export const fetchSourcesParallel = async (sources, maxWait = 10000) => {
  const startTime = Date.now();
  
  const availableSources = sources.filter(s => !circuitBreaker.isOpen(s.id));
  
  if (availableSources.length === 0) {
    throw new Error('جميع المصادر معطلة حالياً');
  }
  
  const fetchPromises = availableSources.map(source => 
    simulateFetch(source.url, source.id)
  );
  
  try {
    const result = await Promise.any(fetchPromises);
    console.log(`✅ تم الحصول على مصدر ${result.providerId} (محاكاة)`);
    return result;
  } catch (error) {
    throw new Error('جميع المصادر غير متاحة (محاكاة)');
  }
};
