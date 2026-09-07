/* Hyper visitor tracking — sends pageviews to /api/track for company
 * identification, and optionally loads the RB2B person-identification pixel.
 *
 * Installed in app/layout.tsx:
 *   <script src="/hyper-agent.js" data-rb2b="KEY" async></script>
 */
(function () {
  "use strict";
  if (window.__hyperAgentLoaded) return;
  window.__hyperAgentLoaded = true;

  var script = document.currentScript;
  var trackUrl = "/api/track";

  function uid() {
    return "xxxxxxxx".replace(/x/g, function () {
      return ((Math.random() * 36) | 0).toString(36);
    }) + Date.now().toString(36);
  }

  function getId(store, key) {
    try {
      var v = store.getItem(key);
      if (!v) {
        v = uid();
        store.setItem(key, v);
      }
      return v;
    } catch (e) {
      return uid();
    }
  }

  var visitorId = getId(window.localStorage, "_hyper_vid");
  var sessionId = getId(window.sessionStorage, "_hyper_sid");

  // Optionally load the RB2B person-identification pixel.
  var rb2bKey = script && script.getAttribute("data-rb2b");
  if (rb2bKey && !window.reb2b) {
    window.reb2b = { loaded: true };
    var rb = document.createElement("script");
    rb.async = true;
    rb.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + rb2bKey + "/" + rb2bKey + ".js.gz";
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(rb, first);
  }

  var lastPath = null;

  function trackPageview() {
    if (window.self !== window.top) return;
    var path = location.pathname + location.search;
    if (path === lastPath) return;
    lastPath = path;
    fetch(trackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        path: path,
        title: document.title,
        referrer: document.referrer || null,
        sessionId: sessionId,
        visitorId: visitorId,
      }),
      keepalive: true,
    }).catch(function () {});
  }

  // SPA navigation support (Next.js router uses pushState)
  var push = history.pushState;
  history.pushState = function () {
    push.apply(this, arguments);
    setTimeout(trackPageview, 0);
  };
  var replace = history.replaceState;
  history.replaceState = function () {
    replace.apply(this, arguments);
    setTimeout(trackPageview, 0);
  };
  window.addEventListener("popstate", function () {
    setTimeout(trackPageview, 0);
  });

  trackPageview();

  function isPrivatePath(path) {
    return /^\/(admin|account|api|popm-workshop)/.test(path);
  }

  var pointer = { x: 50, y: 40, clicked: false };
  document.addEventListener(
    "mousemove",
    function (event) {
      var w = window.innerWidth || 1;
      var h = window.innerHeight || 1;
      pointer.x = (event.clientX / w) * 100;
      pointer.y = (event.clientY / h) * 100;
    },
    { passive: true }
  );
  document.addEventListener(
    "click",
    function (event) {
      var w = window.innerWidth || 1;
      var h = window.innerHeight || 1;
      pointer.x = (event.clientX / w) * 100;
      pointer.y = (event.clientY / h) * 100;
      pointer.clicked = true;
    },
    { passive: true }
  );

  function sendPresence() {
    if (document.visibilityState !== "visible") return;
    if (window.self !== window.top) return;
    var path = location.pathname + location.search;
    var priv = isPrivatePath(path);
    var maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    var clicked = pointer.clicked;
    pointer.clicked = false;
    fetch(trackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "presence",
        path: path,
        title: document.title,
        sessionId: sessionId,
        visitorId: visitorId,
        private: priv,
        mouseX: priv ? null : pointer.x,
        mouseY: priv ? null : pointer.y,
        scrollY: priv ? null : window.scrollY || 0,
        scrollMax: priv ? null : maxScroll,
        vw: window.innerWidth,
        vh: window.innerHeight,
        clicked: !priv && clicked,
      }),
      keepalive: true,
    }).catch(function () {});
  }

  setInterval(sendPresence, 1500);
  sendPresence();
})();
