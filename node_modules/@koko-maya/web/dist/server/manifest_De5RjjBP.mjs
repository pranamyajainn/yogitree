import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_8sWmNpZx.mjs';
import 'es-module-lexer';
import { n as decodeKey } from './chunks/astro/server_DSxN40bN.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/","adapterName":"@astrojs/node","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"book/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/book","isIndex":true,"type":"page","pattern":"^\\/book\\/?$","segments":[[{"content":"book","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/book/index.astro","pathname":"/book","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":true,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact/index.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dining/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dining","isIndex":true,"type":"page","pattern":"^\\/dining\\/?$","segments":[[{"content":"dining","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dining/index.astro","pathname":"/dining","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"faq/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/faq","isIndex":true,"type":"page","pattern":"^\\/faq\\/?$","segments":[[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faq/index.astro","pathname":"/faq","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"gallery/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/gallery","isIndex":true,"type":"page","pattern":"^\\/gallery\\/?$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery/index.astro","pathname":"/gallery","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"offers/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/offers","isIndex":true,"type":"page","pattern":"^\\/offers\\/?$","segments":[[{"content":"offers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/offers/index.astro","pathname":"/offers","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"privacy-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy-policy","isIndex":true,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy/index.astro","pathname":"/privacy-policy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"rooms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rooms","isIndex":true,"type":"page","pattern":"^\\/rooms\\/?$","segments":[[{"content":"rooms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rooms/index.astro","pathname":"/rooms","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"terms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":true,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms/index.astro","pathname":"/terms","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.yourdomain.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/book/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/contact/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/dining/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/faq/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/gallery/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/offers/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/offers/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/privacy-policy/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/rooms/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/rooms/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/apps/web/src/pages/terms/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:../../node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/book/index@_@astro":"pages/book.astro.mjs","\u0000@astro-page:src/pages/contact/index@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/dining/index@_@astro":"pages/dining.astro.mjs","\u0000@astro-page:src/pages/faq/index@_@astro":"pages/faq.astro.mjs","\u0000@astro-page:src/pages/gallery/index@_@astro":"pages/gallery.astro.mjs","\u0000@astro-page:src/pages/offers/[slug]@_@astro":"pages/offers/_slug_.astro.mjs","\u0000@astro-page:src/pages/offers/index@_@astro":"pages/offers.astro.mjs","\u0000@astro-page:src/pages/privacy-policy/index@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/rooms/[slug]@_@astro":"pages/rooms/_slug_.astro.mjs","\u0000@astro-page:src/pages/rooms/index@_@astro":"pages/rooms.astro.mjs","\u0000@astro-page:src/pages/terms/index@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_De5RjjBP.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BBTmEMC0.js","/astro/hoisted.js?q=1":"_astro/hoisted.D6kwzk8_.js","C:/Users/ajeet/.gemini/antigravity/scratch/koko-maya-resort/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.DG4Fu6ia.js","/astro/hoisted.js?q=2":"_astro/hoisted.DhmfnCrK.js","/astro/hoisted.js?q=3":"_astro/hoisted.BrKH_MOv.js","@astrojs/preact/client.js":"_astro/client.Cj1GFGv6.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.X7t6XiLV.css","/_astro/_slug_.BJoXDTAY.css","/_astro/index.Bae4pANe.css","/robots.txt","/_astro/client.Cj1GFGv6.js","/_astro/client.v8safub7.js","/_astro/hoisted.BBTmEMC0.js","/_astro/hoisted.BrKH_MOv.js","/_astro/hoisted.D6kwzk8_.js","/_astro/hoisted.DhmfnCrK.js","/_astro/signals.module.DG4Fu6ia.js","/404.html","/book/index.html","/contact/index.html","/dining/index.html","/faq/index.html","/gallery/index.html","/offers/index.html","/privacy-policy/index.html","/rooms/index.html","/terms/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"JGwOklOlkSJt1CFdKrrBnAG2QUv41K8Lsqs3OKsKJyE=","experimentalEnvGetSecretEnabled":false});

export { manifest };
