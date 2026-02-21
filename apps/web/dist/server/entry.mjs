import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_3sQyKp36.mjs';
import { manifest } from './manifest_RbTD0lZy.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/book.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/dining.astro.mjs');
const _page5 = () => import('./pages/faq.astro.mjs');
const _page6 = () => import('./pages/gallery.astro.mjs');
const _page7 = () => import('./pages/offers/_slug_.astro.mjs');
const _page8 = () => import('./pages/offers.astro.mjs');
const _page9 = () => import('./pages/privacy-policy.astro.mjs');
const _page10 = () => import('./pages/rooms/_slug_.astro.mjs');
const _page11 = () => import('./pages/rooms.astro.mjs');
const _page12 = () => import('./pages/terms.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["../../node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/book/index.astro", _page2],
    ["src/pages/contact/index.astro", _page3],
    ["src/pages/dining/index.astro", _page4],
    ["src/pages/faq/index.astro", _page5],
    ["src/pages/gallery/index.astro", _page6],
    ["src/pages/offers/[slug].astro", _page7],
    ["src/pages/offers/index.astro", _page8],
    ["src/pages/privacy-policy/index.astro", _page9],
    ["src/pages/rooms/[slug].astro", _page10],
    ["src/pages/rooms/index.astro", _page11],
    ["src/pages/terms/index.astro", _page12],
    ["src/pages/index.astro", _page13]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/dist/client/",
    "server": "file:///C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
{
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
