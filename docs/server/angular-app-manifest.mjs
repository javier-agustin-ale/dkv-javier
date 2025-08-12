
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/dkv-javier/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/dkv-javier"
  },
  {
    "renderMode": 0,
    "route": "/dkv-javier/car/*"
  },
  {
    "renderMode": 0,
    "route": "/dkv-javier/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24613, hash: '5a8e0cfcfb2dc17178a8921ca21ccbceede40db19f3dd67d01f205b2c5e7defc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17066, hash: '116eed1a0d5c85bb95690f144d36e1378aebf209da1209427af9c7a933fc549d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-MC7DNLBQ.css': {size: 8100, hash: '8P5gQXGkqW4', text: () => import('./assets-chunks/styles-MC7DNLBQ_css.mjs').then(m => m.default)}
  },
};
