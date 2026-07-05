// إدارة المصادر بدون اتصال خارجي
const breakerState = new Map();

export const circuitBreaker = {
  isOpen(providerId) {
    const state = breakerState.get(providerId);
    if (!state) return false;
    
    if (state.status === 'OPEN') {
      if (Date.now() > state.nextAttempt) {
        state.status = 'HALF_OPEN';
        state.failures = 0;
        return false;
      }
      return true;
    }
    return false;
  },
  
  recordSuccess(providerId) {
    const state = breakerState.get(providerId);
    if (state) {
      state.failures = 0;
      state.status = 'CLOSED';
    }
  },
  
  recordFailure(providerId) {
    const state = breakerState.get(providerId);
    if (!state) {
      breakerState.set(providerId, {
        failures: 1,
        status: 'CLOSED',
        nextAttempt: Date.now()
      });
      return;
    }
    
    state.failures += 1;
    
    if (state.failures >= 5) {
      state.status = 'OPEN';
      state.nextAttempt = Date.now() + 15 * 60 * 1000;
      console.log(`⛔ المصدر ${providerId} معطل مؤقتاً`);
    }
  },
  
  getStats() {
    return Object.fromEntries(breakerState);
  },

  resetAll() {
    for (const [key] of breakerState) {
      breakerState.set(key, {
        failures: 0,
        status: 'CLOSED',
        nextAttempt: Date.now()
      });
    }
  }
};
