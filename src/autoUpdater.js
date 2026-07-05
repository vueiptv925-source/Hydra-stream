// ============================================================
// نظام التحديث التلقائي للمصادر (Auto Updater)
// ============================================================

import { providers } from './providers.js';

// حالة التحديث
let lastUpdate = null;
let liveSources = [];

/**
 * اختبار مصدر واحد
 * @param {Object} provider - بيانات المصدر
 * @returns {Object} نتيجة الاختبار
 */
const testSource = async (provider) => {
  const url = `https://${provider.id}/embed/movie/tt1375666`; // رابط اختبار
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000) // مهلة 5 ثوانٍ
    });
    return {
      ...provider,
      alive: response.ok || response.status === 403
    };
  } catch (error) {
    return {
      ...provider,
      alive: false,
      error: error.message
    };
  }
};

/**
 * تحديث قائمة المصادر الحية
 * @returns {Array} قائمة المصادر الحية
 */
export const refreshLiveSources = async () => {
  console.log('🔄 جاري تحديث المصادر الحية...');
  
  const results = await Promise.all(
    providers.map(provider => testSource(provider))
  );

  liveSources = results.filter(p => p.alive).map(p => p.id);
  lastUpdate = new Date().toISOString();

  console.log(`✅ المصادر الحية: ${liveSources.length} من أصل ${providers.length}`);
  console.log(`📋 المصادر الحية: ${liveSources.join(', ')}`);
  
  return liveSources;
};

/**
 * الحصول على قائمة المصادر الحية (مع تحديث دوري)
 * @returns {Array} قائمة المصادر الحية
 */
export const getLiveSources = async () => {
  // إذا مرت ساعة على آخر تحديث، جدد القائمة
  if (!lastUpdate || Date.now() - new Date(lastUpdate).getTime() > 60 * 60 * 1000) {
    await refreshLiveSources();
  }
  return liveSources;
};

/**
 * بدء التحديث التلقائي (كل ساعة)
 */
export const startAutoUpdate = () => {
  // تحديث فوري عند البدء
  refreshLiveSources();
  
  // تحديث دوري كل ساعة
  setInterval(refreshLiveSources, 60 * 60 * 1000);
  
  console.log('🔄 بدء التحديث التلقائي للمصادر (كل ساعة)');
};

// بدء التحديث التلقائي عند استيراد الملف
startAutoUpdate();
