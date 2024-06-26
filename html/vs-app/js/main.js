!(function (e, o) {
  "object" == typeof exports && "undefined" != typeof module ? (module.exports = o()) : "function" == typeof define && define.amd ? define(o) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).BrowserDtector = o());
})(this, function () {
  "use strict";
  function e(e, o) {
    for (var n = 0; n < o.length; n++) {
      var r = o[n];
      (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }
  var o = { chrome: "Google Chrome", brave: "Brave", crios: "Google Chrome", edge: "Microsoft Edge", edg: "Microsoft Edge", fennec: "Mozilla Firefox", jsdom: "JsDOM", mozilla: "Mozilla Firefox", msie: "Microsoft Internet Explorer", opera: "Opera", opios: "Opera", opr: "Opera", rv: "Microsoft Internet Explorer", safari: "Safari", samsungbrowser: "Samsung Browser" },
    n = { android: "Android", androidTablet: "Android Tablet", cros: "Chrome OS", fennec: "Android Tablet", ipad: "IPad", iphone: "IPhone", jsdom: "JsDOM", linux: "Linux", mac: "Macintosh", tablet: "Android Tablet", win: "Windows", "windows phone": "Windows Phone", xbox: "Microsoft Xbox" },
    r = function (e) {
      var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1,
        n = new RegExp("^-?\\d+(?:.\\d{0,".concat(o, "})?")),
        r = Number(e).toString().match(n);
      return r ? r[0] : null;
    },
    i = function () {
      return "undefined" != typeof window ? window.navigator : null;
    };
  return (function () {
    function a(e) {
      var o;
      !(function (e, o) {
        if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
      })(this, a),
        (this.userAgent = e || (null === (o = i()) || void 0 === o ? void 0 : o.userAgent) || null);
    }
    var t, s, l;
    return (
      (t = a),
      (l = [
        {
          key: "VERSION",
          get: function () {
            return "3.1.2";
          },
        },
      ]),
      (s = [
        {
          key: "parseUserAgent",
          value: function (e) {
            var a,
              t,
              s,
              l = {},
              d = e || this.userAgent || "",
              c = d.toLowerCase().replace(/\s\s+/g, " "),
              u = /(edge)\/([\w.]+)/.exec(c) || /(edg)[/]([\w.]+)/.exec(c) || /(opr)[/]([\w.]+)/.exec(c) || /(jsdom)[/]([\w.]+)/.exec(c) || /(samsungbrowser)[/]([\w.]+)/.exec(c) || /(chrome)[/]([\w.]+)/.exec(c) || /(crios)[/]([\w.]+)/.exec(c) || /(opios)[/]([\w.]+)/.exec(c) || /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(c) || /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(c) || /(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(c) || /(webkit)[/]([\w.]+)/.exec(c) || /(opera)(?:.*version|)[/]([\w.]+)/.exec(c) || /(msie) ([\w.]+)/.exec(c) || /(fennec)[/]([\w.]+)/.exec(c) || (c.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(c)) || (c.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(c)) || [],
              f = /(ipad)/.exec(c) || /(ipod)/.exec(c) || /(iphone)/.exec(c) || /(jsdom)/.exec(c) || /(windows phone)/.exec(c) || /(xbox)/.exec(c) || /(win)/.exec(c) || /(tablet)/.exec(c) || (/(android)/.test(c) && !1 === /(mobile)/.test(c) && ["androidTablet"]) || /(android)/.exec(c) || /(mac)/.exec(c) || /(linux)/.exec(c) || /(cros)/.exec(c) || [],
              p = u[5] || u[3] || u[1] || null,
              w = f[0] || null,
              x = u[4] || u[2] || null,
              b = i();
            "function" == typeof (null == b || null === (a = b.brave) || void 0 === a ? void 0 : a.isBrave) && (p = "brave"), p && (l[p] = !0), w && (l[w] = !0);
            var m = Boolean(l.tablet || l.android || l.androidTablet),
              v = Boolean(l.ipad || l.tablet || l.androidTablet),
              g = Boolean(l.android || l.androidTablet || l.tablet || l.ipad || l.ipod || l.iphone || l["windows phone"]),
              h = Boolean(l.cros || l.mac || l.linux || l.win),
              y = Boolean(l.brave || l.chrome || l.crios || l.opr || l.safari || l.edg),
              A = Boolean(l.msie || l.rv);
            return { name: null !== (t = o[p]) && void 0 !== t ? t : null, platform: null !== (s = n[w]) && void 0 !== s ? s : null, userAgent: d, version: x, shortVersion: x ? r(parseFloat(x), 2) : null, isAndroid: m, isTablet: v, isMobile: g, isDesktop: h, isWebkit: y, isIE: A };
          },
        },
        {
          key: "getBrowserInfo",
          value: function () {
            var e = this.parseUserAgent();
            return { name: e.name, platform: e.platform, userAgent: e.userAgent, version: e.version, shortVersion: e.shortVersion };
          },
        },
      ]) && e(t.prototype, s),
      l && e(t, l),
      a
    );
  })();
});
//# sourceMappingURL=browser-dtector.umd.min.js.map
