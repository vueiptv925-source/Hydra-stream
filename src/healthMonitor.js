import { providers } from './providers.js';

export const healthMonitor = {
  // فحص مصدر (محاكاة)
  async checkSource(provider) {
    // محاكاة زمن الاستجابة
    const latency = Math.floor(Math.random() * 200) + 50;
    const isHealthy = Math.random() > 0.2; // 80% صحي
    
    return {
      id: provider.id,
      label: provider.label,
      status: isHealthy ? 'healthy' : 'unhealthy',
      latency: isHealthy ? latency : null,
      statusCode: isHealthy ? 200 : 503,
      timestamp: new Date().toISOString()
    };
  },
  
  // فحص جميع المصادر
  async checkAllSources() {
    console.log('🔄 جاري فحص صحة المصادر (محاكاة)...');
    const results = await Promise.all(
      providers.map(p => this.checkSource(p))
    );
    
    const healthy = results.filter(r => r.status === 'healthy');
    console.log(`✅ ${healthy.length}/${providers.length} مصادر سليمة (محاكاة)`);
    return results;
  },
  
  // بدء المراقبة الدورية
  startMonitoring(interval = 30 * 60 * 1000) {
    console.log('📊 بدأت مراقبة الصحة (محاكاة)');
    this.checkAllSources();
    setInterval(async () => {
      await this.checkAllSources();
    }, interval);
  }
};
