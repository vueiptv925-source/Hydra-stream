import axios from 'axios';

export const validateUrl = async (url) => {
  try {
    // طلب HEAD أولاً (أسرع طريقة)
    const res = await axios.head(url, {
      timeout: 4000,
      validateStatus: (status) => status < 500,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://google.com/'
      }
    });
    // نقبل 200, 302, 403 (بعض المواقع تمنع HEAD وتعطي 403 لكن الفيديو يعمل)
    if ([200, 302, 403].includes(res.status)) return true;
    return false;
  } catch {
    // محاولة GET كحل أخير (بعض السيرفرات تمنع HEAD)
    try {
      const res = await axios.get(url, {
        timeout: 5000,
        maxRedirects: 0,
        validateStatus: (status) => status < 500,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      return [200, 302, 403].includes(res.status);
    } catch {
      return false;
    }
  }
};
