const axios = require('axios');

const checkSiteSafety = async (domain) => {
  try {
    const response = await axios.get(`https://lookup.phishfort.com/api/lookup?domain=${domain}`);
    const siteStatus = response.data;

    if (siteStatus.safe) {
      console.log('Безопасный сайт');
    } else {
      console.log('Небезопасный сайт');
    }
  } catch (error) {
    console.error('Произошла ошибка при проверке безопасности сайта:', error.message);
  }
};

// Пример использования
checkSiteSafety('example.com');
