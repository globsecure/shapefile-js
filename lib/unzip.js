'use strict';
const JSZip = require('jszip');
module.exports = async function (buffer) {
  const zip = new JSZip();
  const result = await zip.loadAsync(buffer);
  const files = result.file(/.+/);
  const out = {};
  for (const a of files) {
    if (
      a.name.slice(-3).toLowerCase() === 'shp' ||
      a.name.slice(-3).toLowerCase() === 'dbf'
    ) {
      await a.async('nodebuffer').then(function (content) {
        out[a.name] = content;
      });
    } else {
      await a.async('text').then(function (content) {
        out[a.name] = content;
      });
    }
  }
  return out;
};
