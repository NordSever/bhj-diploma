/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let url = options.url;
  let data = null;
  const callback = options.callback || (() => {});

  if (options.data) {
    if (options.method === 'GET') {
      const params = new URLSearchParams();
      for (const key in options.data) {
        params.append(key, options.data[key]);
      }
      url += `?${params.toString()}`;
    } else {
        data = new FormData();
        for (const key in options.data) {
          data.append(key, options.data[key]);
        } 
    }
  }

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      callback(xhr.response.error || xhr.statusText);
    }
  };

  xhr.onerror = () => {
    callback(xhr.statusText || 'Ошибка сетевого подключения');
  };

  try {
    xhr.open(options.method, url);
    xhr.send(data);
  } catch (err) {
      callback(err);
      return;
  }
}

  


