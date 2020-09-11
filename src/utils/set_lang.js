const fs = require('fs');
const path = require('path');

function setLang(data, req) {
  const en = JSON.parse(
    fs
      .readFileSync(
        path.join(__dirname, '..', 'locales', 'en', 'translation.json')
      )
      .toString()
  );

  const pt = JSON.parse(
    fs
      .readFileSync(
        path.join(__dirname, '..', 'locales', 'pt', 'translation.json')
      )
      .toString()
  );

  const lang = req.lang && req.lang === 'en' ? en : pt;

  return {
    ...data,
    lang,
  };
}

module.exports = setLang;
