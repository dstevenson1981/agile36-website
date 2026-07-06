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
})();
