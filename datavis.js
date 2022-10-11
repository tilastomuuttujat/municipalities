! function (e, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n(e.dataviz = {})
}(this, function (e) {
    "use strict";
    var r = "http://www.w3.org/1999/xhtml",
        i = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: r,
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };

    function o(e) {
        var n = e += "",
            t = n.indexOf(":");
        return 0 <= t && "xmlns" !== (n = e.slice(0, t)) && (e = e.slice(t + 1)), i.hasOwnProperty(n) ? {
            space: i[n],
            local: e
        } : e
    }

    function a(e) {
        var n = o(e);
        return (n.local ? function (e) {
            return function () {
                return this.ownerDocument.createElementNS(e.space, e.local)
            }
        } : function (t) {
            return function () {
                var e = this.ownerDocument,
                    n = this.namespaceURI;
                return n === r && e.documentElement.namespaceURI === r ? e.createElement(t) : e.createElementNS(n, t)
            }
        })(n)
    }

    function n() {}

    function f(e) {
        return null == e ? n : function () {
            return this.querySelector(e)
        }
    }

    function t() {
        return []
    }

    function g(e) {
        return null == e ? t : function () {
            return this.querySelectorAll(e)
        }
    }
    var l = function (e) {
        return function () {
            return this.matches(e)
        }
    };
    if ("undefined" != typeof document) {
        var c = document.documentElement;
        if (!c.matches) {
            var s = c.webkitMatchesSelector || c.msMatchesSelector || c.mozMatchesSelector || c.oMatchesSelector;
            l = function (e) {
                return function () {
                    return s.call(this, e)
                }
            }
        }
    }
    var u = l;

    function p(e) {
        return new Array(e.length)
    }

    function h(e, n) {
        this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = n
    }
    h.prototype = {
        constructor: h,
        appendChild: function (e) {
            return this._parent.insertBefore(e, this._next)
        },
        insertBefore: function (e, n) {
            return this._parent.insertBefore(e, n)
        },
        querySelector: function (e) {
            return this._parent.querySelector(e)
        },
        querySelectorAll: function (e) {
            return this._parent.querySelectorAll(e)
        }
    };
    var y = "$";

    function w(e, n, t, r, i, o) {
        for (var a, l = 0, c = n.length, s = o.length; l < s; ++l)(a = n[l]) ? (a.__data__ = o[l], r[l] = a) : t[l] = new h(e, o[l]);
        for (; l < c; ++l)(a = n[l]) && (i[l] = a)
    }

    function D(e, n, t, r, i, o, a) {
        var l, c, s, u = {},
            p = n.length,
            d = o.length,
            f = new Array(p);
        for (l = 0; l < p; ++l)(c = n[l]) && (f[l] = s = y + a.call(c, c.__data__, l, n), s in u ? i[l] = c : u[s] = c);
        for (l = 0; l < d; ++l)(c = u[s = y + a.call(e, o[l], l, o)]) ? ((r[l] = c).__data__ = o[l], u[s] = null) : t[l] = new h(e, o[l]);
        for (l = 0; l < p; ++l)(c = n[l]) && u[f[l]] === c && (i[l] = c)
    }

    function d(e, n) {
        return e < n ? -1 : n < e ? 1 : n <= e ? 0 : NaN
    }

    function m(e) {
        return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView
    }

    function b(e, n) {
        return e.style.getPropertyValue(n) || m(e).getComputedStyle(e, null).getPropertyValue(n)
    }

    function v(e) {
        return e.trim().split(/^|\s+/)
    }

    function P(e) {
        return e.classList || new x(e)
    }

    function x(e) {
        this._node = e, this._names = v(e.getAttribute("class") || "")
    }

    function G(e, n) {
        for (var t = P(e), r = -1, i = n.length; ++r < i;) t.add(n[r])
    }

    function C(e, n) {
        for (var t = P(e), r = -1, i = n.length; ++r < i;) t.remove(n[r])
    }

    function S() {
        this.textContent = ""
    }

    function I() {
        this.innerHTML = ""
    }

    function M() {
        this.nextSibling && this.parentNode.appendChild(this)
    }

    function k() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }

    function A() {
        return null
    }

    function _() {
        var e = this.parentNode;
        e && e.removeChild(this)
    }

    function O() {
        return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling)
    }

    function L() {
        return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling)
    }
    x.prototype = {
        add: function (e) {
            this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")))
        },
        remove: function (e) {
            var n = this._names.indexOf(e);
            0 <= n && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")))
        },
        contains: function (e) {
            return 0 <= this._names.indexOf(e)
        }
    };
    var E = {},
        N = null;
    "undefined" != typeof document && ("onmouseenter" in document.documentElement || (E = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }));

    function j(t, e, n) {
        return t = T(t, e, n),
            function (e) {
                var n = e.relatedTarget;
                n && (n === this || 8 & n.compareDocumentPosition(this)) || t.call(this, e)
            }
    }

    function T(t, r, i) {
        return function (e) {
            var n = N;
            N = e;
            try {
                t.call(this, this.__data__, r, i)
            } finally {
                N = n
            }
        }
    }

    function $(o) {
        return function () {
            var e = this.__on;
            if (e) {
                for (var n, t = 0, r = -1, i = e.length; t < i; ++t) n = e[t], o.type && n.type !== o.type || n.name !== o.name ? e[++r] = n : this.removeEventListener(n.type, n.listener, n.capture);
                ++r ? e.length = r : delete this.__on
            }
        }
    }

    function z(c, s, u) {
        var p = E.hasOwnProperty(c.type) ? j : T;
        return function (e, n, t) {
            var r, i = this.__on,
                o = p(s, n, t);
            if (i)
                for (var a = 0, l = i.length; a < l; ++a)
                    if ((r = i[a]).type === c.type && r.name === c.name) return this.removeEventListener(r.type, r.listener, r.capture), this.addEventListener(r.type, r.listener = o, r.capture = u), void(r.value = s);
            this.addEventListener(c.type, o, u), r = {
                type: c.type,
                name: c.name,
                value: s,
                listener: o,
                capture: u
            }, i ? i.push(r) : this.__on = [r]
        }
    }

    function B(e, n, t) {
        var r = m(e),
            i = r.CustomEvent;
        "function" == typeof i ? i = new i(n, t) : (i = r.document.createEvent("Event"), t ? (i.initEvent(n, t.bubbles, t.cancelable), i.detail = t.detail) : i.initEvent(n, !1, !1)), e.dispatchEvent(i)
    }
    var q = [null];

    function F(e, n) {
        this._groups = e, this._parents = n
    }

    function R() {
        return new F([
            [document.documentElement]
        ], q)
    }

    function U(e) {
        return "string" == typeof e ? new F([
            [document.querySelector(e)]
        ], [document.documentElement]) : new F([
            [e]
        ], q)
    }

    function Y() {
        for (var e, n = N; e = n.sourceEvent;) n = e;
        return n
    }

    function H(e, n) {
        var t = e.ownerSVGElement || e;
        if (t.createSVGPoint) {
            var r = t.createSVGPoint();
            return r.x = n.clientX, r.y = n.clientY, [(r = r.matrixTransform(e.getScreenCTM().inverse())).x, r.y]
        }
        var i = e.getBoundingClientRect();
        return [n.clientX - i.left - e.clientLeft, n.clientY - i.top - e.clientTop]
    }

    function V(e) {
        var n = Y();
        return n.changedTouches && (n = n.changedTouches[0]), H(e, n)
    }

    function W(e, n, t) {
        arguments.length < 3 && (t = n, n = Y().changedTouches);
        for (var r, i = 0, o = n ? n.length : 0; i < o; ++i)
            if ((r = n[i]).identifier === t) return H(e, r);
        return null
    }
    F.prototype = R.prototype = {
        constructor: F,
        select: function (e) {
            "function" != typeof e && (e = f(e));
            for (var n = this._groups, t = n.length, r = new Array(t), i = 0; i < t; ++i)
                for (var o, a, l = n[i], c = l.length, s = r[i] = new Array(c), u = 0; u < c; ++u)(o = l[u]) && (a = e.call(o, o.__data__, u, l)) && ("__data__" in o && (a.__data__ = o.__data__), s[u] = a);
            return new F(r, this._parents)
        },
        selectAll: function (e) {
            "function" != typeof e && (e = g(e));
            for (var n = this._groups, t = n.length, r = [], i = [], o = 0; o < t; ++o)
                for (var a, l = n[o], c = l.length, s = 0; s < c; ++s)(a = l[s]) && (r.push(e.call(a, a.__data__, s, l)), i.push(a));
            return new F(r, i)
        },
        filter: function (e) {
            "function" != typeof e && (e = u(e));
            for (var n = this._groups, t = n.length, r = new Array(t), i = 0; i < t; ++i)
                for (var o, a = n[i], l = a.length, c = r[i] = [], s = 0; s < l; ++s)(o = a[s]) && e.call(o, o.__data__, s, a) && c.push(o);
            return new F(r, this._parents)
        },
        data: function (e, n) {
            if (!e) return h = new Array(this.size()), u = -1, this.each(function (e) {
                h[++u] = e
            }), h;
            var t, r = n ? D : w,
                i = this._parents,
                o = this._groups;
            "function" != typeof e && (t = e, e = function () {
                return t
            });
            for (var a = o.length, l = new Array(a), c = new Array(a), s = new Array(a), u = 0; u < a; ++u) {
                var p = i[u],
                    d = o[u],
                    f = d.length,
                    h = e.call(p, p && p.__data__, u, i),
                    y = h.length,
                    m = c[u] = new Array(y),
                    g = l[u] = new Array(y);
                r(p, d, m, g, s[u] = new Array(f), h, n);
                for (var v, P, x = 0, b = 0; x < y; ++x)
                    if (v = m[x]) {
                        for (b <= x && (b = x + 1); !(P = g[b]) && ++b < y;);
                        v._next = P || null
                    }
            }
            return (l = new F(l, i))._enter = c, l._exit = s, l
        },
        enter: function () {
            return new F(this._enter || this._groups.map(p), this._parents)
        },
        exit: function () {
            return new F(this._exit || this._groups.map(p), this._parents)
        },
        merge: function (e) {
            for (var n = this._groups, t = e._groups, r = n.length, i = t.length, o = Math.min(r, i), a = new Array(r), l = 0; l < o; ++l)
                for (var c, s = n[l], u = t[l], p = s.length, d = a[l] = new Array(p), f = 0; f < p; ++f)(c = s[f] || u[f]) && (d[f] = c);
            for (; l < r; ++l) a[l] = n[l];
            return new F(a, this._parents)
        },
        order: function () {
            for (var e = this._groups, n = -1, t = e.length; ++n < t;)
                for (var r, i = e[n], o = i.length - 1, a = i[o]; 0 <= --o;)(r = i[o]) && (a && a !== r.nextSibling && a.parentNode.insertBefore(r, a), a = r);
            return this
        },
        sort: function (t) {
            function e(e, n) {
                return e && n ? t(e.__data__, n.__data__) : !e - !n
            }
            t || (t = d);
            for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
                for (var a, l = n[o], c = l.length, s = i[o] = new Array(c), u = 0; u < c; ++u)(a = l[u]) && (s[u] = a);
                s.sort(e)
            }
            return new F(i, this._parents).order()
        },
        call: function () {
            var e = arguments[0];
            return arguments[0] = this, e.apply(null, arguments), this
        },
        nodes: function () {
            var e = new Array(this.size()),
                n = -1;
            return this.each(function () {
                e[++n] = this
            }), e
        },
        node: function () {
            for (var e = this._groups, n = 0, t = e.length; n < t; ++n)
                for (var r = e[n], i = 0, o = r.length; i < o; ++i) {
                    var a = r[i];
                    if (a) return a
                }
            return null
        },
        size: function () {
            var e = 0;
            return this.each(function () {
                ++e
            }), e
        },
        empty: function () {
            return !this.node()
        },
        each: function (e) {
            for (var n = this._groups, t = 0, r = n.length; t < r; ++t)
                for (var i, o = n[t], a = 0, l = o.length; a < l; ++a)(i = o[a]) && e.call(i, i.__data__, a, o);
            return this
        },
        attr: function (e, n) {
            var t = o(e);
            if (arguments.length < 2) {
                var r = this.node();
                return t.local ? r.getAttributeNS(t.space, t.local) : r.getAttribute(t)
            }
            return this.each((null == n ? t.local ? function (e) {
                return function () {
                    this.removeAttributeNS(e.space, e.local)
                }
            } : function (e) {
                return function () {
                    this.removeAttribute(e)
                }
            } : "function" == typeof n ? t.local ? function (n, t) {
                return function () {
                    var e = t.apply(this, arguments);
                    null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e)
                }
            } : function (n, t) {
                return function () {
                    var e = t.apply(this, arguments);
                    null == e ? this.removeAttribute(n) : this.setAttribute(n, e)
                }
            } : t.local ? function (e, n) {
                return function () {
                    this.setAttributeNS(e.space, e.local, n)
                }
            } : function (e, n) {
                return function () {
                    this.setAttribute(e, n)
                }
            })(t, n))
        },
        style: function (e, n, t) {
            return 1 < arguments.length ? this.each((null == n ? function (e) {
                return function () {
                    this.style.removeProperty(e)
                }
            } : "function" == typeof n ? function (n, t, r) {
                return function () {
                    var e = t.apply(this, arguments);
                    null == e ? this.style.removeProperty(n) : this.style.setProperty(n, e, r)
                }
            } : function (e, n, t) {
                return function () {
                    this.style.setProperty(e, n, t)
                }
            })(e, n, null == t ? "" : t)) : b(this.node(), e)
        },
        property: function (e, n) {
            return 1 < arguments.length ? this.each((null == n ? function (e) {
                return function () {
                    delete this[e]
                }
            } : "function" == typeof n ? function (n, t) {
                return function () {
                    var e = t.apply(this, arguments);
                    null == e ? delete this[n] : this[n] = e
                }
            } : function (e, n) {
                return function () {
                    this[e] = n
                }
            })(e, n)) : this.node()[e]
        },
        classed: function (e, n) {
            var t = v(e + "");
            if (arguments.length < 2) {
                for (var r = P(this.node()), i = -1, o = t.length; ++i < o;)
                    if (!r.contains(t[i])) return !1;
                return !0
            }
            return this.each(("function" == typeof n ? function (e, n) {
                return function () {
                    (n.apply(this, arguments) ? G : C)(this, e)
                }
            } : n ? function (e) {
                return function () {
                    G(this, e)
                }
            } : function (e) {
                return function () {
                    C(this, e)
                }
            })(t, n))
        },
        text: function (e) {
            return arguments.length ? this.each(null == e ? S : ("function" == typeof e ? function (n) {
                return function () {
                    var e = n.apply(this, arguments);
                    this.textContent = null == e ? "" : e
                }
            } : function (e) {
                return function () {
                    this.textContent = e
                }
            })(e)) : this.node().textContent
        },
        html: function (e) {
            return arguments.length ? this.each(null == e ? I : ("function" == typeof e ? function (n) {
                return function () {
                    var e = n.apply(this, arguments);
                    this.innerHTML = null == e ? "" : e
                }
            } : function (e) {
                return function () {
                    this.innerHTML = e
                }
            })(e)) : this.node().innerHTML
        },
        raise: function () {
            return this.each(M)
        },
        lower: function () {
            return this.each(k)
        },
        append: function (e) {
            var n = "function" == typeof e ? e : a(e);
            return this.select(function () {
                return this.appendChild(n.apply(this, arguments))
            })
        },
        insert: function (e, n) {
            var t = "function" == typeof e ? e : a(e),
                r = null == n ? A : "function" == typeof n ? n : f(n);
            return this.select(function () {
                return this.insertBefore(t.apply(this, arguments), r.apply(this, arguments) || null)
            })
        },
        remove: function () {
            return this.each(_)
        },
        clone: function (e) {
            return this.select(e ? L : O)
        },
        datum: function (e) {
            return arguments.length ? this.property("__data__", e) : this.node().__data__
        },
        on: function (e, n, t) {
            var r, i, o = (e + "").trim().split(/^|\s+/).map(function (e) {
                    var n = "",
                        t = e.indexOf(".");
                    return 0 <= t && (n = e.slice(t + 1), e = e.slice(0, t)), {
                        type: e,
                        name: n
                    }
                }),
                a = o.length;
            if (!(arguments.length < 2)) {
                for (l = n ? z : $, null == t && (t = !1), r = 0; r < a; ++r) this.each(l(o[r], n, t));
                return this
            }
            var l = this.node().__on;
            if (l)
                for (var c, s = 0, u = l.length; s < u; ++s)
                    for (r = 0, c = l[s]; r < a; ++r)
                        if ((i = o[r]).type === c.type && i.name === c.name) return c.value
        },
        dispatch: function (e, n) {
            return this.each(("function" == typeof n ? function (e, n) {
                return function () {
                    return B(this, e, n.apply(this, arguments))
                }
            } : function (e, n) {
                return function () {
                    return B(this, e, n)
                }
            })(e, n))
        }
    };
    var Z, K, X = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        J = 0,
        Q = 0,
        ee = 0,
        ne = 1e3,
        te = 0,
        re = 0,
        ie = 0,
        oe = "object" === ("undefined" == typeof performance ? "undefined" : X(performance)) && performance.now ? performance : Date,
        ae = "object" === ("undefined" == typeof window ? "undefined" : X(window)) && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (e) {
            setTimeout(e, 17)
        };

    function le() {
        return re || (ae(ce), re = oe.now() + ie)
    }

    function ce() {
        re = 0
    }

    function se() {
        this._call = this._time = this._next = null
    }

    function ue(e, n, t) {
        var r = new se;
        return r.restart(e, n, t), r
    }

    function pe() {
        re = (te = oe.now()) + ie, J = Q = 0;
        try {
            ! function () {
                le(), ++J;
                for (var e, n = Z; n;) 0 <= (e = re - n._time) && n._call.call(null, e), n = n._next;
                --J
            }()
        } finally {
            J = 0,
                function () {
                    var e, n, t = Z,
                        r = 1 / 0;
                    for (; t;) t = t._call ? (r > t._time && (r = t._time), (e = t)._next) : (n = t._next, t._next = null, e ? e._next = n : Z = n);
                    K = e, fe(r)
                }(), re = 0
        }
    }

    function de() {
        var e = oe.now(),
            n = e - te;
        ne < n && (ie -= n, te = e)
    }

    function fe(e) {
        J || (Q && (Q = clearTimeout(Q)), 24 < e - re ? (e < 1 / 0 && (Q = setTimeout(pe, e - oe.now() - ie)), ee && (ee = clearInterval(ee))) : (ee || (te = oe.now(), ee = setInterval(de, ne)), J = 1, ae(pe)))
    }

    function he(n, t, e) {
        var r = new se;
        return t = null == t ? 0 : +t, r.restart(function (e) {
            r.stop(), n(e + t)
        }, t, e), r
    }

    function ye(e, n) {
        return e < n ? -1 : n < e ? 1 : n <= e ? 0 : NaN
    }
    se.prototype = ue.prototype = {
        constructor: se,
        restart: function (e, n, t) {
            if ("function" != typeof e) throw new TypeError("callback is not a function");
            t = (null == t ? le() : +t) + (null == n ? 0 : +n), this._next || K === this || (K ? K._next = this : Z = this, K = this), this._call = e, this._time = t, fe()
        },
        stop: function () {
            this._call && (this._call = null, this._time = 1 / 0, fe())
        }
    };
    var me, ge, ve = (1 === (me = ye).length && (ge = me, me = function (e, n) {
        return ye(ge(e), n)
    }), {
        left: function (e, n, t, r) {
            for (null == t && (t = 0), null == r && (r = e.length); t < r;) {
                var i = t + r >>> 1;
                me(e[i], n) < 0 ? t = i + 1 : r = i
            }
            return t
        },
        right: function (e, n, t, r) {
            for (null == t && (t = 0), null == r && (r = e.length); t < r;) {
                var i = t + r >>> 1;
                0 < me(e[i], n) ? r = i : t = i + 1
            }
            return t
        }
    }).right;

    function Pe(e) {
        return null === e ? NaN : +e
    }

    function xe(e, n) {
        var t = function (e, n) {
            var t, r, i = e.length,
                o = 0,
                a = -1,
                l = 0,
                c = 0;
            if (null == n)
                for (; ++a < i;) isNaN(t = Pe(e[a])) || (c += (r = t - l) * (t - (l += r / ++o)));
            else
                for (; ++a < i;) isNaN(t = Pe(n(e[a], a, e))) || (c += (r = t - l) * (t - (l += r / ++o)));
            if (1 < o) return c / (o - 1)
        }(e, n);
        return t ? Math.sqrt(t) : t
    }

    function be(e, n) {
        var t, r, i, o = e.length,
            a = -1;
        if (null == n) {
            for (; ++a < o;)
                if (null != (t = e[a]) && t <= t)
                    for (r = i = t; ++a < o;) null != (t = e[a]) && (t < r && (r = t), i < t && (i = t))
        } else
            for (; ++a < o;)
                if (null != (t = n(e[a], a, e)) && t <= t)
                    for (r = i = t; ++a < o;) null != (t = n(e[a], a, e)) && (t < r && (r = t), i < t && (i = t));
        return [r, i]
    }
    var we = Math.sqrt(50),
        De = Math.sqrt(10),
        Ge = Math.sqrt(2);

    function Ce(e, n, t) {
        var r, i, o, a, l, c, s, u, p = -1;
        if (t = +t, (e = +e) === (n = +n) && 0 < t) return [e];
        if ((r = n < e) && (i = e, e = n, n = i), 0 == (l = t, c = (n - e) / Math.max(0, l), s = Math.floor(Math.log(c) / Math.LN10), u = c / Math.pow(10, s), a = 0 <= s ? (we <= u ? 10 : De <= u ? 5 : Ge <= u ? 2 : 1) * Math.pow(10, s) : -Math.pow(10, -s) / (we <= u ? 10 : De <= u ? 5 : Ge <= u ? 2 : 1)) || !isFinite(a)) return [];
        if (0 < a)
            for (e = Math.ceil(e / a), n = Math.floor(n / a), o = new Array(i = Math.ceil(n - e + 1)); ++p < i;) o[p] = (e + p) * a;
        else
            for (e = Math.floor(e * a), n = Math.ceil(n * a), o = new Array(i = Math.ceil(e - n + 1)); ++p < i;) o[p] = (e - p) / a;
        return r && o.reverse(), o
    }

    function Se(e, n, t) {
        var r = Math.abs(n - e) / Math.max(0, t),
            i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
            o = r / i;
        return we <= o ? i *= 10 : De <= o ? i *= 5 : Ge <= o && (i *= 2), n < e ? -i : i
    }

    function Ie(e, n, t) {
        if (null == t && (t = Pe), r = e.length) {
            if ((n = +n) <= 0 || r < 2) return +t(e[0], 0, e);
            if (1 <= n) return +t(e[r - 1], r - 1, e);
            var r, i = (r - 1) * n,
                o = Math.floor(i),
                a = +t(e[o], o, e);
            return a + (+t(e[o + 1], o + 1, e) - a) * (i - o)
        }
    }

    function Me(e, n) {
        var t, r = e.length,
            i = r,
            o = -1,
            a = 0;
        if (null == n)
            for (; ++o < r;) isNaN(t = Pe(e[o])) ? --i : a += t;
        else
            for (; ++o < r;) isNaN(t = Pe(n(e[o], o, e))) ? --i : a += t;
        if (i) return a / i
    }

    function ke(e) {
        for (var n, t, r, i = e.length, o = -1, a = 0; ++o < i;) a += e[o].length;
        for (t = new Array(a); 0 <= --i;)
            for (n = (r = e[i]).length; 0 <= --n;) t[--a] = r[n];
        return t
    }

    function Ae(e, n, t) {
        e.prototype = n.prototype = t, t.constructor = e
    }

    function _e(e, n) {
        var t = Object.create(e.prototype);
        for (var r in n) t[r] = n[r];
        return t
    }

    function Oe() {}
    var Le = 1 / .7,
        Ee = "\\s*([+-]?\\d+)\\s*",
        Ne = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        je = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        Te = /^#([0-9a-f]{3})$/,
        $e = /^#([0-9a-f]{6})$/,
        ze = new RegExp("^rgb\\(" + [Ee, Ee, Ee] + "\\)$"),
        Be = new RegExp("^rgb\\(" + [je, je, je] + "\\)$"),
        qe = new RegExp("^rgba\\(" + [Ee, Ee, Ee, Ne] + "\\)$"),
        Fe = new RegExp("^rgba\\(" + [je, je, je, Ne] + "\\)$"),
        Re = new RegExp("^hsl\\(" + [Ne, je, je] + "\\)$"),
        Ue = new RegExp("^hsla\\(" + [Ne, je, je, Ne] + "\\)$"),
        Ye = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };

    function He(e) {
        var n;
        return e = (e + "").trim().toLowerCase(), (n = Te.exec(e)) ? new Xe((n = parseInt(n[1], 16)) >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1) : (n = $e.exec(e)) ? Ve(parseInt(n[1], 16)) : (n = ze.exec(e)) ? new Xe(n[1], n[2], n[3], 1) : (n = Be.exec(e)) ? new Xe(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = qe.exec(e)) ? We(n[1], n[2], n[3], n[4]) : (n = Fe.exec(e)) ? We(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = Re.exec(e)) ? Qe(n[1], n[2] / 100, n[3] / 100, 1) : (n = Ue.exec(e)) ? Qe(n[1], n[2] / 100, n[3] / 100, n[4]) : Ye.hasOwnProperty(e) ? Ve(Ye[e]) : "transparent" === e ? new Xe(NaN, NaN, NaN, 0) : null
    }

    function Ve(e) {
        return new Xe(e >> 16 & 255, e >> 8 & 255, 255 & e, 1)
    }

    function We(e, n, t, r) {
        return r <= 0 && (e = n = t = NaN), new Xe(e, n, t, r)
    }

    function Ze(e) {
        return e instanceof Oe || (e = He(e)), e ? new Xe((e = e.rgb()).r, e.g, e.b, e.opacity) : new Xe
    }

    function Ke(e, n, t, r) {
        return 1 === arguments.length ? Ze(e) : new Xe(e, n, t, null == r ? 1 : r)
    }

    function Xe(e, n, t, r) {
        this.r = +e, this.g = +n, this.b = +t, this.opacity = +r
    }

    function Je(e) {
        return ((e = Math.max(0, Math.min(255, Math.round(e) || 0))) < 16 ? "0" : "") + e.toString(16)
    }

    function Qe(e, n, t, r) {
        return r <= 0 ? e = n = t = NaN : t <= 0 || 1 <= t ? e = n = NaN : n <= 0 && (e = NaN), new en(e, n, t, r)
    }

    function en(e, n, t, r) {
        this.h = +e, this.s = +n, this.l = +t, this.opacity = +r
    }

    function nn(e, n, t) {
        return 255 * (e < 60 ? n + (t - n) * e / 60 : e < 180 ? t : e < 240 ? n + (t - n) * (240 - e) / 60 : n)
    }
    Ae(Oe, He, {
        displayable: function () {
            return this.rgb().displayable()
        },
        hex: function () {
            return this.rgb().hex()
        },
        toString: function () {
            return this.rgb() + ""
        }
    }), Ae(Xe, Ke, _e(Oe, {
        brighter: function (e) {
            return e = null == e ? Le : Math.pow(Le, e), new Xe(this.r * e, this.g * e, this.b * e, this.opacity)
        },
        darker: function (e) {
            return e = null == e ? .7 : Math.pow(.7, e), new Xe(this.r * e, this.g * e, this.b * e, this.opacity)
        },
        rgb: function () {
            return this
        },
        displayable: function () {
            return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1
        },
        hex: function () {
            return "#" + Je(this.r) + Je(this.g) + Je(this.b)
        },
        toString: function () {
            var e = this.opacity;
            return (1 === (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === e ? ")" : ", " + e + ")")
        }
    })), Ae(en, function (e, n, t, r) {
        return 1 === arguments.length ? function (e) {
            if (e instanceof en) return new en(e.h, e.s, e.l, e.opacity);
            if (e instanceof Oe || (e = He(e)), !e) return new en;
            if (e instanceof en) return e;
            var n = (e = e.rgb()).r / 255,
                t = e.g / 255,
                r = e.b / 255,
                i = Math.min(n, t, r),
                o = Math.max(n, t, r),
                a = NaN,
                l = o - i,
                c = (o + i) / 2;
            return l ? (a = n === o ? (t - r) / l + 6 * (t < r) : t === o ? (r - n) / l + 2 : (n - t) / l + 4, l /= c < .5 ? o + i : 2 - o - i, a *= 60) : l = 0 < c && c < 1 ? 0 : a, new en(a, l, c, e.opacity)
        }(e) : new en(e, n, t, null == r ? 1 : r)
    }, _e(Oe, {
        brighter: function (e) {
            return e = null == e ? Le : Math.pow(Le, e), new en(this.h, this.s, this.l * e, this.opacity)
        },
        darker: function (e) {
            return e = null == e ? .7 : Math.pow(.7, e), new en(this.h, this.s, this.l * e, this.opacity)
        },
        rgb: function () {
            var e = this.h % 360 + 360 * (this.h < 0),
                n = isNaN(e) || isNaN(this.s) ? 0 : this.s,
                t = this.l,
                r = t + (t < .5 ? t : 1 - t) * n,
                i = 2 * t - r;
            return new Xe(nn(240 <= e ? e - 240 : e + 120, i, r), nn(e, i, r), nn(e < 120 ? e + 240 : e - 120, i, r), this.opacity)
        },
        displayable: function () {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        }
    }));
    var tn = Math.PI / 180,
        rn = 180 / Math.PI,
        on = .96422,
        an = 1,
        ln = .82521,
        cn = 4 / 29,
        sn = 6 / 29,
        un = 3 * sn * sn,
        pn = sn * sn * sn;

    function dn(e) {
        if (e instanceof fn) return new fn(e.l, e.a, e.b, e.opacity);
        if (e instanceof vn) {
            if (isNaN(e.h)) return new fn(e.l, 0, 0, e.opacity);
            var n = e.h * tn;
            return new fn(e.l, Math.cos(n) * e.c, Math.sin(n) * e.c, e.opacity)
        }
        e instanceof Xe || (e = Ze(e));
        var t, r, i = gn(e.r),
            o = gn(e.g),
            a = gn(e.b),
            l = hn((.2225045 * i + .7168786 * o + .0606169 * a) / an);
        return i === o && o === a ? t = r = l : (t = hn((.4360747 * i + .3850649 * o + .1430804 * a) / on), r = hn((.0139322 * i + .0971045 * o + .7141733 * a) / ln)), new fn(116 * l - 16, 500 * (t - l), 200 * (l - r), e.opacity)
    }

    function fn(e, n, t, r) {
        this.l = +e, this.a = +n, this.b = +t, this.opacity = +r
    }

    function hn(e) {
        return pn < e ? Math.pow(e, 1 / 3) : e / un + cn
    }

    function yn(e) {
        return sn < e ? e * e * e : un * (e - cn)
    }

    function mn(e) {
        return 255 * (e <= .0031308 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - .055)
    }

    function gn(e) {
        return (e /= 255) <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
    }

    function vn(e, n, t, r) {
        this.h = +e, this.c = +n, this.l = +t, this.opacity = +r
    }
    Ae(fn, function (e, n, t, r) {
        return 1 === arguments.length ? dn(e) : new fn(e, n, t, null == r ? 1 : r)
    }, _e(Oe, {
        brighter: function (e) {
            return new fn(this.l + 18 * (null == e ? 1 : e), this.a, this.b, this.opacity)
        },
        darker: function (e) {
            return new fn(this.l - 18 * (null == e ? 1 : e), this.a, this.b, this.opacity)
        },
        rgb: function () {
            var e = (this.l + 16) / 116,
                n = isNaN(this.a) ? e : e + this.a / 500,
                t = isNaN(this.b) ? e : e - this.b / 200;
            return new Xe(mn(3.1338561 * (n = on * yn(n)) - 1.6168667 * (e = an * yn(e)) - .4906146 * (t = ln * yn(t))), mn(-.9787684 * n + 1.9161415 * e + .033454 * t), mn(.0719453 * n - .2289914 * e + 1.4052427 * t), this.opacity)
        }
    })), Ae(vn, function (e, n, t, r) {
        return 1 === arguments.length ? function (e) {
            if (e instanceof vn) return new vn(e.h, e.c, e.l, e.opacity);
            if (e instanceof fn || (e = dn(e)), 0 === e.a && 0 === e.b) return new vn(NaN, 0, e.l, e.opacity);
            var n = Math.atan2(e.b, e.a) * rn;
            return new vn(n < 0 ? n + 360 : n, Math.sqrt(e.a * e.a + e.b * e.b), e.l, e.opacity)
        }(e) : new vn(e, n, t, null == r ? 1 : r)
    }, _e(Oe, {
        brighter: function (e) {
            return new vn(this.h, this.c, this.l + 18 * (null == e ? 1 : e), this.opacity)
        },
        darker: function (e) {
            return new vn(this.h, this.c, this.l - 18 * (null == e ? 1 : e), this.opacity)
        },
        rgb: function () {
            return dn(this).rgb()
        }
    }));
    var Pn = 1.78277,
        xn = -.29227,
        bn = -.90649,
        wn = 1.97294,
        Dn = wn * bn,
        Gn = wn * Pn,
        Cn = Pn * xn - -.14861 * bn;

    function Sn(e, n, t, r) {
        return 1 === arguments.length ? function (e) {
            if (e instanceof In) return new In(e.h, e.s, e.l, e.opacity);
            e instanceof Xe || (e = Ze(e));
            var n = e.r / 255,
                t = e.g / 255,
                r = e.b / 255,
                i = (Cn * r + Dn * n - Gn * t) / (Cn + Dn - Gn),
                o = r - i,
                a = (wn * (t - i) - xn * o) / bn,
                l = Math.sqrt(a * a + o * o) / (wn * i * (1 - i)),
                c = l ? Math.atan2(a, o) * rn - 120 : NaN;
            return new In(c < 0 ? c + 360 : c, l, i, e.opacity)
        }(e) : new In(e, n, t, null == r ? 1 : r)
    }

    function In(e, n, t, r) {
        this.h = +e, this.s = +n, this.l = +t, this.opacity = +r
    }
    Ae(In, Sn, _e(Oe, {
        brighter: function (e) {
            return e = null == e ? Le : Math.pow(Le, e), new In(this.h, this.s, this.l * e, this.opacity)
        },
        darker: function (e) {
            return e = null == e ? .7 : Math.pow(.7, e), new In(this.h, this.s, this.l * e, this.opacity)
        },
        rgb: function () {
            var e = isNaN(this.h) ? 0 : (this.h + 120) * tn,
                n = +this.l,
                t = isNaN(this.s) ? 0 : this.s * n * (1 - n),
                r = Math.cos(e),
                i = Math.sin(e);
            return new Xe(255 * (n + t * (-.14861 * r + Pn * i)), 255 * (n + t * (xn * r + bn * i)), 255 * (n + t * (wn * r)), this.opacity)
        }
    }));
    var Mn = function () {
        this.__data__ = [], this.size = 0
    };
    var kn = function (e, n) {
        return e === n || e != e && n != n
    };
    var An = function (e, n) {
            for (var t = e.length; t--;)
                if (kn(e[t][0], n)) return t;
            return -1
        },
        _n = Array.prototype.splice;
    var On = function (e) {
        var n = this.__data__,
            t = An(n, e);
        return !(t < 0 || (t == n.length - 1 ? n.pop() : _n.call(n, t, 1), --this.size, 0))
    };
    var Ln = function (e) {
        var n = this.__data__,
            t = An(n, e);
        return t < 0 ? void 0 : n[t][1]
    };
    var En = function (e) {
        return -1 < An(this.__data__, e)
    };
    var Nn = function (e, n) {
        var t = this.__data__,
            r = An(t, e);
        return r < 0 ? (++this.size, t.push([e, n])) : t[r][1] = n, this
    };

    function jn(e) {
        var n = -1,
            t = null == e ? 0 : e.length;
        for (this.clear(); ++n < t;) {
            var r = e[n];
            this.set(r[0], r[1])
        }
    }
    jn.prototype.clear = Mn, jn.prototype.delete = On, jn.prototype.get = Ln, jn.prototype.has = En, jn.prototype.set = Nn;
    var Tn = jn;
    var $n = function () {
        this.__data__ = new Tn, this.size = 0
    };
    var zn = function (e) {
        var n = this.__data__,
            t = n.delete(e);
        return this.size = n.size, t
    };
    var Bn = function (e) {
        return this.__data__.get(e)
    };
    var qn = function (e) {
            return this.__data__.has(e)
        },
        Fn = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function Rn(e, n) {
        return e(n = {
            exports: {}
        }, n.exports), n.exports
    }
    var Un = "object" == ("function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(Fn) && Fn && Fn.Object === Object && Fn,
        Yn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Hn = "object" == ("undefined" == typeof self ? "undefined" : Yn(self)) && self && self.Object === Object && self,
        Vn = Un || Hn || Function("return this")(),
        Wn = Vn.Symbol,
        Zn = Object.prototype,
        Kn = Zn.hasOwnProperty,
        Xn = Zn.toString,
        Jn = Wn ? Wn.toStringTag : void 0;
    var Qn = function (e) {
            var n = Kn.call(e, Jn),
                t = e[Jn];
            try {
                e[Jn] = void 0
            } catch (e) {}
            var r = Xn.call(e);
            return n ? e[Jn] = t : delete e[Jn], r
        },
        et = Object.prototype.toString;
    var nt = function (e) {
            return et.call(e)
        },
        tt = Wn ? Wn.toStringTag : void 0;
    var rt = function (e) {
            return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : tt && tt in Object(e) ? Qn(e) : nt(e)
        },
        it = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    var ot = function (e) {
        var n = void 0 === e ? "undefined" : it(e);
        return null != e && ("object" == n || "function" == n)
    };
    var at, lt = function (e) {
            if (!ot(e)) return !1;
            var n = rt(e);
            return "[object Function]" == n || "[object GeneratorFunction]" == n || "[object AsyncFunction]" == n || "[object Proxy]" == n
        },
        ct = Vn["__core-js_shared__"],
        st = (at = /[^.]+$/.exec(ct && ct.keys && ct.keys.IE_PROTO || "")) ? "Symbol(src)_1." + at : "";
    var ut = function (e) {
            return !!st && st in e
        },
        pt = Function.prototype.toString;
    var dt = function (e) {
            if (null != e) {
                try {
                    return pt.call(e)
                } catch (e) {}
                try {
                    return e + ""
                } catch (e) {}
            }
            return ""
        },
        ft = /^\[object .+?Constructor\]$/,
        ht = Function.prototype,
        yt = Object.prototype,
        mt = ht.toString,
        gt = yt.hasOwnProperty,
        vt = RegExp("^" + mt.call(gt).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Pt = function (e) {
        return !(!ot(e) || ut(e)) && (lt(e) ? vt : ft).test(dt(e))
    };
    var xt = function (e, n) {
        return null == e ? void 0 : e[n]
    };
    var bt = function (e, n) {
            var t = xt(e, n);
            return Pt(t) ? t : void 0
        },
        wt = bt(Vn, "Map"),
        Dt = bt(Object, "create");
    var Gt = function () {
        this.__data__ = Dt ? Dt(null) : {}, this.size = 0
    };
    var Ct = function (e) {
            var n = this.has(e) && delete this.__data__[e];
            return this.size -= n ? 1 : 0, n
        },
        St = Object.prototype.hasOwnProperty;
    var It = function (e) {
            var n = this.__data__;
            if (Dt) {
                var t = n[e];
                return "__lodash_hash_undefined__" === t ? void 0 : t
            }
            return St.call(n, e) ? n[e] : void 0
        },
        Mt = Object.prototype.hasOwnProperty;
    var kt = function (e) {
        var n = this.__data__;
        return Dt ? void 0 !== n[e] : Mt.call(n, e)
    };
    var At = function (e, n) {
        var t = this.__data__;
        return this.size += this.has(e) ? 0 : 1, t[e] = Dt && void 0 === n ? "__lodash_hash_undefined__" : n, this
    };

    function _t(e) {
        var n = -1,
            t = null == e ? 0 : e.length;
        for (this.clear(); ++n < t;) {
            var r = e[n];
            this.set(r[0], r[1])
        }
    }
    _t.prototype.clear = Gt, _t.prototype.delete = Ct, _t.prototype.get = It, _t.prototype.has = kt, _t.prototype.set = At;
    var Ot = _t;
    var Lt = function () {
            this.size = 0, this.__data__ = {
                hash: new Ot,
                map: new(wt || Tn),
                string: new Ot
            }
        },
        Et = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    var Nt = function (e) {
        var n = void 0 === e ? "undefined" : Et(e);
        return "string" == n || "number" == n || "symbol" == n || "boolean" == n ? "__proto__" !== e : null === e
    };
    var jt = function (e, n) {
        var t = e.__data__;
        return Nt(n) ? t["string" == typeof n ? "string" : "hash"] : t.map
    };
    var Tt = function (e) {
        var n = jt(this, e).delete(e);
        return this.size -= n ? 1 : 0, n
    };
    var $t = function (e) {
        return jt(this, e).get(e)
    };
    var zt = function (e) {
        return jt(this, e).has(e)
    };
    var Bt = function (e, n) {
        var t = jt(this, e),
            r = t.size;
        return t.set(e, n), this.size += t.size == r ? 0 : 1, this
    };

    function qt(e) {
        var n = -1,
            t = null == e ? 0 : e.length;
        for (this.clear(); ++n < t;) {
            var r = e[n];
            this.set(r[0], r[1])
        }
    }
    qt.prototype.clear = Lt, qt.prototype.delete = Tt, qt.prototype.get = $t, qt.prototype.has = zt, qt.prototype.set = Bt;
    var Ft = qt;
    var Rt = function (e, n) {
        var t = this.__data__;
        if (t instanceof Tn) {
            var r = t.__data__;
            if (!wt || r.length < 199) return r.push([e, n]), this.size = ++t.size, this;
            t = this.__data__ = new Ft(r)
        }
        return t.set(e, n), this.size = t.size, this
    };

    function Ut(e) {
        var n = this.__data__ = new Tn(e);
        this.size = n.size
    }
    Ut.prototype.clear = $n, Ut.prototype.delete = zn, Ut.prototype.get = Bn, Ut.prototype.has = qn, Ut.prototype.set = Rt;
    var Yt = Ut,
        Ht = function () {
            try {
                var e = bt(Object, "defineProperty");
                return e({}, "", {}), e
            } catch (e) {}
        }();
    var Vt = function (e, n, t) {
        "__proto__" == n && Ht ? Ht(e, n, {
            configurable: !0,
            enumerable: !0,
            value: t,
            writable: !0
        }) : e[n] = t
    };
    var Wt = function (e, n, t) {
        (void 0 === t || kn(e[n], t)) && (void 0 !== t || n in e) || Vt(e, n, t)
    };
    var Zt = function (c) {
            return function (e, n, t) {
                for (var r = -1, i = Object(e), o = t(e), a = o.length; a--;) {
                    var l = o[c ? a : ++r];
                    if (!1 === n(i[l], l, i)) break
                }
                return e
            }
        }(),
        Kt = Rn(function (e, n) {
            var t = n && !n.nodeType && n,
                r = t && e && !e.nodeType && e,
                i = r && r.exports === t ? Vn.Buffer : void 0,
                o = i ? i.allocUnsafe : void 0;
            e.exports = function (e, n) {
                if (n) return e.slice();
                var t = e.length,
                    r = o ? o(t) : new e.constructor(t);
                return e.copy(r), r
            }
        }),
        Xt = Vn.Uint8Array;
    var Jt = function (e) {
        var n = new e.constructor(e.byteLength);
        return new Xt(n).set(new Xt(e)), n
    };
    var Qt = function (e, n) {
        var t = n ? Jt(e.buffer) : e.buffer;
        return new e.constructor(t, e.byteOffset, e.length)
    };
    var er = function (e, n) {
            var t = -1,
                r = e.length;
            for (n || (n = Array(r)); ++t < r;) n[t] = e[t];
            return n
        },
        nr = Object.create,
        tr = function () {
            function t() {}
            return function (e) {
                if (!ot(e)) return {};
                if (nr) return nr(e);
                t.prototype = e;
                var n = new t;
                return t.prototype = void 0, n
            }
        }();
    var rr = function (n, t) {
            return function (e) {
                return n(t(e))
            }
        },
        ir = rr(Object.getPrototypeOf, Object),
        or = Object.prototype;
    var ar = function (e) {
        var n = e && e.constructor;
        return e === ("function" == typeof n && n.prototype || or)
    };
    var lr = function (e) {
            return "function" != typeof e.constructor || ar(e) ? {} : tr(ir(e))
        },
        cr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    var sr = function (e) {
        return null != e && "object" == (void 0 === e ? "undefined" : cr(e))
    };
    var ur = function (e) {
            return sr(e) && "[object Arguments]" == rt(e)
        },
        pr = Object.prototype,
        dr = pr.hasOwnProperty,
        fr = pr.propertyIsEnumerable,
        hr = ur(function () {
            return arguments
        }()) ? ur : function (e) {
            return sr(e) && dr.call(e, "callee") && !fr.call(e, "callee")
        },
        yr = Array.isArray;
    var mr = function (e) {
        return "number" == typeof e && -1 < e && e % 1 == 0 && e <= 9007199254740991
    };
    var gr = function (e) {
        return null != e && mr(e.length) && !lt(e)
    };
    var vr = function (e) {
        return sr(e) && gr(e)
    };
    var Pr = function () {
            return !1
        },
        xr = Rn(function (e, n) {
            var t = n && !n.nodeType && n,
                r = t && e && !e.nodeType && e,
                i = r && r.exports === t ? Vn.Buffer : void 0,
                o = (i ? i.isBuffer : void 0) || Pr;
            e.exports = o
        }),
        br = Function.prototype,
        wr = Object.prototype,
        Dr = br.toString,
        Gr = wr.hasOwnProperty,
        Cr = Dr.call(Object);
    var Sr = function (e) {
            if (!sr(e) || "[object Object]" != rt(e)) return !1;
            var n = ir(e);
            if (null === n) return !0;
            var t = Gr.call(n, "constructor") && n.constructor;
            return "function" == typeof t && t instanceof t && Dr.call(t) == Cr
        },
        Ir = {};
    Ir["[object Float32Array]"] = Ir["[object Float64Array]"] = Ir["[object Int8Array]"] = Ir["[object Int16Array]"] = Ir["[object Int32Array]"] = Ir["[object Uint8Array]"] = Ir["[object Uint8ClampedArray]"] = Ir["[object Uint16Array]"] = Ir["[object Uint32Array]"] = !0, Ir["[object Arguments]"] = Ir["[object Array]"] = Ir["[object ArrayBuffer]"] = Ir["[object Boolean]"] = Ir["[object DataView]"] = Ir["[object Date]"] = Ir["[object Error]"] = Ir["[object Function]"] = Ir["[object Map]"] = Ir["[object Number]"] = Ir["[object Object]"] = Ir["[object RegExp]"] = Ir["[object Set]"] = Ir["[object String]"] = Ir["[object WeakMap]"] = !1;
    var Mr = function (e) {
        return sr(e) && mr(e.length) && !!Ir[rt(e)]
    };
    var kr = function (n) {
            return function (e) {
                return n(e)
            }
        },
        Ar = Rn(function (e, n) {
            var t = n && !n.nodeType && n,
                r = t && e && !e.nodeType && e,
                i = r && r.exports === t && Un.process,
                o = function () {
                    try {
                        var e = r && r.require && r.require("util").types;
                        return e || i && i.binding && i.binding("util")
                    } catch (e) {}
                }();
            e.exports = o
        }),
        _r = Ar && Ar.isTypedArray,
        Or = _r ? kr(_r) : Mr;
    var Lr = function (e, n) {
            if ("__proto__" != n) return e[n]
        },
        Er = Object.prototype.hasOwnProperty;
    var Nr = function (e, n, t) {
        var r = e[n];
        Er.call(e, n) && kn(r, t) && (void 0 !== t || n in e) || Vt(e, n, t)
    };
    var jr = function (e, n, t, r) {
        var i = !t;
        t || (t = {});
        for (var o = -1, a = n.length; ++o < a;) {
            var l = n[o],
                c = r ? r(t[l], e[l], l, t, e) : void 0;
            void 0 === c && (c = e[l]), i ? Vt(t, l, c) : Nr(t, l, c)
        }
        return t
    };
    var Tr = function (e, n) {
            for (var t = -1, r = Array(e); ++t < e;) r[t] = n(t);
            return r
        },
        $r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        zr = /^(?:0|[1-9]\d*)$/;
    var Br = function (e, n) {
            var t = void 0 === e ? "undefined" : $r(e);
            return !!(n = null == n ? 9007199254740991 : n) && ("number" == t || "symbol" != t && zr.test(e)) && -1 < e && e % 1 == 0 && e < n
        },
        qr = Object.prototype.hasOwnProperty;
    var Fr = function (e, n) {
        var t = yr(e),
            r = !t && hr(e),
            i = !t && !r && xr(e),
            o = !t && !r && !i && Or(e),
            a = t || r || i || o,
            l = a ? Tr(e.length, String) : [],
            c = l.length;
        for (var s in e) !n && !qr.call(e, s) || a && ("length" == s || i && ("offset" == s || "parent" == s) || o && ("buffer" == s || "byteLength" == s || "byteOffset" == s) || Br(s, c)) || l.push(s);
        return l
    };
    var Rr = function (e) {
            var n = [];
            if (null != e)
                for (var t in Object(e)) n.push(t);
            return n
        },
        Ur = Object.prototype.hasOwnProperty;
    var Yr = function (e) {
        if (!ot(e)) return Rr(e);
        var n = ar(e),
            t = [];
        for (var r in e)("constructor" != r || !n && Ur.call(e, r)) && t.push(r);
        return t
    };
    var Hr = function (e) {
        return gr(e) ? Fr(e, !0) : Yr(e)
    };
    var Vr = function (e) {
        return jr(e, Hr(e))
    };
    var Wr = function (e, n, t, r, i, o, a) {
        var l = Lr(e, t),
            c = Lr(n, t),
            s = a.get(c);
        if (s) Wt(e, t, s);
        else {
            var u = o ? o(l, c, t + "", e, n, a) : void 0,
                p = void 0 === u;
            if (p) {
                var d = yr(c),
                    f = !d && xr(c),
                    h = !d && !f && Or(c);
                u = c, d || f || h ? u = yr(l) ? l : vr(l) ? er(l) : f ? Kt(c, !(p = !1)) : h ? Qt(c, !(p = !1)) : [] : Sr(c) || hr(c) ? hr(u = l) ? u = Vr(l) : ot(l) && !lt(l) || (u = lr(c)) : p = !1
            }
            p && (a.set(c, u), i(u, c, r, o, a), a.delete(c)), Wt(e, t, u)
        }
    };
    var Zr = function r(i, o, a, l, c) {
        i !== o && Zt(o, function (e, n) {
            if (ot(e)) c || (c = new Yt), Wr(i, o, n, a, r, l, c);
            else {
                var t = l ? l(Lr(i, n), e, n + "", i, o, c) : void 0;
                void 0 === t && (t = e), Wt(i, n, t)
            }
        }, Hr)
    };
    var Kr = function (e) {
        return e
    };
    var Xr = function (e, n, t) {
            switch (t.length) {
            case 0:
                return e.call(n);
            case 1:
                return e.call(n, t[0]);
            case 2:
                return e.call(n, t[0], t[1]);
            case 3:
                return e.call(n, t[0], t[1], t[2])
            }
            return e.apply(n, t)
        },
        Jr = Math.max;
    var Qr = function (o, a, l) {
        return a = Jr(void 0 === a ? o.length - 1 : a, 0),
            function () {
                for (var e = arguments, n = -1, t = Jr(e.length - a, 0), r = Array(t); ++n < t;) r[n] = e[a + n];
                n = -1;
                for (var i = Array(a + 1); ++n < a;) i[n] = e[n];
                return i[a] = l(r), Xr(o, this, i)
            }
    };
    var ei = function (e) {
            return function () {
                return e
            }
        },
        ni = Ht ? function (e, n) {
            return Ht(e, "toString", {
                configurable: !0,
                enumerable: !1,
                value: ei(n),
                writable: !0
            })
        } : Kr,
        ti = Date.now;
    var ri = function (t) {
        var r = 0,
            i = 0;
        return function () {
            var e = ti(),
                n = 16 - (e - i);
            if (i = e, 0 < n) {
                if (800 <= ++r) return arguments[0]
            } else r = 0;
            return t.apply(void 0, arguments)
        }
    }(ni);
    var ii = function (e, n) {
            return ri(Qr(e, n, Kr), e + "")
        },
        oi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    var ai = function (e, n, t) {
        if (!ot(t)) return !1;
        var r = void 0 === n ? "undefined" : oi(n);
        return !!("number" == r ? gr(t) && Br(n, t.length) : "string" == r && n in t) && kn(t[n], e)
    };
    var li = function (l) {
            return ii(function (e, n) {
                var t = -1,
                    r = n.length,
                    i = 1 < r ? n[r - 1] : void 0,
                    o = 2 < r ? n[2] : void 0;
                for (i = 3 < l.length && "function" == typeof i ? (r--, i) : void 0, o && ai(n[0], n[1], o) && (i = r < 3 ? void 0 : i, r = 1), e = Object(e); ++t < r;) {
                    var a = n[t];
                    a && l(e, a, t, i)
                }
                return e
            })
        }(function (e, n, t) {
            Zr(e, n, t)
        }),
        ci = rr(Object.keys, Object),
        si = Object.prototype.hasOwnProperty;
    var ui = function (e) {
        if (!ar(e)) return ci(e);
        var n = [];
        for (var t in Object(e)) si.call(e, t) && "constructor" != t && n.push(t);
        return n
    };
    var pi = function (e) {
        return gr(e) ? Fr(e) : ui(e)
    };
    var di = function (e, n) {
        for (var t = -1, r = null == e ? 0 : e.length; ++t < r && !1 !== n(e[t], t, e););
        return e
    };
    var fi = function (o, a) {
        return function (e, n) {
            if (null == e) return e;
            if (!gr(e)) return o(e, n);
            for (var t = e.length, r = a ? t : -1, i = Object(e);
                (a ? r-- : ++r < t) && !1 !== n(i[r], r, i););
            return e
        }
    }(function (e, n) {
        return e && Zt(e, n, pi)
    });
    var hi = function (e) {
        return "function" == typeof e ? e : Kr
    };
    var yi = function (e, n) {
        return (yr(e) ? di : fi)(e, hi(n))
    };
    var mi = function (e) {
        return "number" == typeof e || sr(e) && "[object Number]" == rt(e)
    };
    var gi = function (e) {
        return mi(e) && e != +e
    };
    var vi = function (e, n, t, r) {
        for (var i = e.length, o = t + (r ? 1 : -1); r ? o-- : ++o < i;)
            if (n(e[o], o, e)) return o;
        return -1
    };
    var Pi = function (e) {
        return e != e
    };
    var xi = function (e, n, t) {
        for (var r = t - 1, i = e.length; ++r < i;)
            if (e[r] === n) return r;
        return -1
    };
    var bi = function (e, n, t) {
            return n == n ? xi(e, n, t) : vi(e, Pi, t)
        },
        wi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    var Di = function (e) {
            return "symbol" == (void 0 === e ? "undefined" : wi(e)) || sr(e) && "[object Symbol]" == rt(e)
        },
        Gi = /^\s+|\s+$/g,
        Ci = /^[-+]0x[0-9a-f]+$/i,
        Si = /^0b[01]+$/i,
        Ii = /^0o[0-7]+$/i,
        Mi = parseInt;
    var ki = function (e) {
        if ("number" == typeof e) return e;
        if (Di(e)) return NaN;
        if (ot(e)) {
            var n = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = ot(n) ? n + "" : n
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(Gi, "");
        var t = Si.test(e);
        return t || Ii.test(e) ? Mi(e.slice(2), t ? 2 : 8) : Ci.test(e) ? NaN : +e
    };
    var Ai = function (e) {
        return e ? (e = ki(e)) !== 1 / 0 && e !== -1 / 0 ? e == e ? e : 0 : 17976931348623157e292 * (e < 0 ? -1 : 1) : 0 === e ? e : 0
    };
    var _i = function (e) {
            var n = Ai(e),
                t = n % 1;
            return n == n ? t ? n - t : n : 0
        },
        Oi = Math.max;
    var Li = function (e, n, t) {
        var r = null == e ? 0 : e.length;
        if (!r) return -1;
        var i = null == t ? 0 : _i(t);
        return i < 0 && (i = Oi(r + i, 0)), bi(e, n, i)
    };
    var Ei = function (e) {
        return this.__data__.has(e)
    };

    function Ni(e) {
        var n = -1,
            t = null == e ? 0 : e.length;
        for (this.__data__ = new Ft; ++n < t;) this.add(e[n])
    }
    Ni.prototype.add = Ni.prototype.push = function (e) {
        return this.__data__.set(e, "__lodash_hash_undefined__"), this
    }, Ni.prototype.has = Ei;
    var ji = Ni;
    var Ti = function (e, n) {
        for (var t = -1, r = null == e ? 0 : e.length; ++t < r;)
            if (n(e[t], t, e)) return !0;
        return !1
    };
    var $i = function (e, n) {
        return e.has(n)
    };
    var zi = function (e, n, t, r, i, o) {
        var a = 1 & t,
            l = e.length,
            c = n.length;
        if (l != c && !(a && l < c)) return !1;
        var s = o.get(e);
        if (s && o.get(n)) return s == n;
        var u = -1,
            p = !0,
            d = 2 & t ? new ji : void 0;
        for (o.set(e, n), o.set(n, e); ++u < l;) {
            var f = e[u],
                h = n[u];
            if (r) var y = a ? r(h, f, u, n, e, o) : r(f, h, u, e, n, o);
            if (void 0 !== y) {
                if (y) continue;
                p = !1;
                break
            }
            if (d) {
                if (!Ti(n, function (e, n) {
                        if (!$i(d, n) && (f === e || i(f, e, t, r, o))) return d.push(n)
                    })) {
                    p = !1;
                    break
                }
            } else if (f !== h && !i(f, h, t, r, o)) {
                p = !1;
                break
            }
        }
        return o.delete(e), o.delete(n), p
    };
    var Bi = function (e) {
        var t = -1,
            r = Array(e.size);
        return e.forEach(function (e, n) {
            r[++t] = [n, e]
        }), r
    };
    var qi = function (e) {
            var n = -1,
                t = Array(e.size);
            return e.forEach(function (e) {
                t[++n] = e
            }), t
        },
        Fi = Wn ? Wn.prototype : void 0,
        Ri = Fi ? Fi.valueOf : void 0;
    var Ui = function (e, n, t, r, i, o, a) {
        switch (t) {
        case "[object DataView]":
            if (e.byteLength != n.byteLength || e.byteOffset != n.byteOffset) return !1;
            e = e.buffer, n = n.buffer;
        case "[object ArrayBuffer]":
            return !(e.byteLength != n.byteLength || !o(new Xt(e), new Xt(n)));
        case "[object Boolean]":
        case "[object Date]":
        case "[object Number]":
            return kn(+e, +n);
        case "[object Error]":
            return e.name == n.name && e.message == n.message;
        case "[object RegExp]":
        case "[object String]":
            return e == n + "";
        case "[object Map]":
            var l = Bi;
        case "[object Set]":
            var c = 1 & r;
            if (l || (l = qi), e.size != n.size && !c) return !1;
            var s = a.get(e);
            if (s) return s == n;
            r |= 2, a.set(e, n);
            var u = zi(l(e), l(n), r, i, o, a);
            return a.delete(e), u;
        case "[object Symbol]":
            if (Ri) return Ri.call(e) == Ri.call(n)
        }
        return !1
    };
    var Yi = function (e, n) {
        for (var t = -1, r = n.length, i = e.length; ++t < r;) e[i + t] = n[t];
        return e
    };
    var Hi = function (e, n, t) {
        var r = n(e);
        return yr(e) ? r : Yi(r, t(e))
    };
    var Vi = function (e, n) {
        for (var t = -1, r = null == e ? 0 : e.length, i = 0, o = []; ++t < r;) {
            var a = e[t];
            n(a, t, e) && (o[i++] = a)
        }
        return o
    };
    var Wi = function () {
            return []
        },
        Zi = Object.prototype.propertyIsEnumerable,
        Ki = Object.getOwnPropertySymbols,
        Xi = Ki ? function (n) {
            return null == n ? [] : (n = Object(n), Vi(Ki(n), function (e) {
                return Zi.call(n, e)
            }))
        } : Wi;
    var Ji = function (e) {
            return Hi(e, pi, Xi)
        },
        Qi = Object.prototype.hasOwnProperty;
    var eo = function (e, n, t, r, i, o) {
            var a = 1 & t,
                l = Ji(e),
                c = l.length;
            if (c != Ji(n).length && !a) return !1;
            for (var s = c; s--;) {
                var u = l[s];
                if (!(a ? u in n : Qi.call(n, u))) return !1
            }
            var p = o.get(e);
            if (p && o.get(n)) return p == n;
            var d = !0;
            o.set(e, n), o.set(n, e);
            for (var f = a; ++s < c;) {
                var h = e[u = l[s]],
                    y = n[u];
                if (r) var m = a ? r(y, h, u, n, e, o) : r(h, y, u, e, n, o);
                if (!(void 0 === m ? h === y || i(h, y, t, r, o) : m)) {
                    d = !1;
                    break
                }
                f || (f = "constructor" == u)
            }
            if (d && !f) {
                var g = e.constructor,
                    v = n.constructor;
                g != v && "constructor" in e && "constructor" in n && !("function" == typeof g && g instanceof g && "function" == typeof v && v instanceof v) && (d = !1)
            }
            return o.delete(e), o.delete(n), d
        },
        no = bt(Vn, "DataView"),
        to = bt(Vn, "Promise"),
        ro = bt(Vn, "Set"),
        io = bt(Vn, "WeakMap"),
        oo = "[object Map]",
        ao = "[object Promise]",
        lo = "[object Set]",
        co = "[object WeakMap]",
        so = "[object DataView]",
        uo = dt(no),
        po = dt(wt),
        fo = dt(to),
        ho = dt(ro),
        yo = dt(io),
        mo = rt;
    (no && mo(new no(new ArrayBuffer(1))) != so || wt && mo(new wt) != oo || to && mo(to.resolve()) != ao || ro && mo(new ro) != lo || io && mo(new io) != co) && (mo = function (e) {
        var n = rt(e),
            t = "[object Object]" == n ? e.constructor : void 0,
            r = t ? dt(t) : "";
        if (r) switch (r) {
        case uo:
            return so;
        case po:
            return oo;
        case fo:
            return ao;
        case ho:
            return lo;
        case yo:
            return co
        }
        return n
    });
    var go = mo,
        vo = "[object Arguments]",
        Po = "[object Array]",
        xo = "[object Object]",
        bo = Object.prototype.hasOwnProperty;
    var wo = function (e, n, t, r, i, o) {
        var a = yr(e),
            l = yr(n),
            c = a ? Po : go(e),
            s = l ? Po : go(n),
            u = (c = c == vo ? xo : c) == xo,
            p = (s = s == vo ? xo : s) == xo,
            d = c == s;
        if (d && xr(e)) {
            if (!xr(n)) return !1;
            u = !(a = !0)
        }
        if (d && !u) return o || (o = new Yt), a || Or(e) ? zi(e, n, t, r, i, o) : Ui(e, n, c, t, r, i, o);
        if (!(1 & t)) {
            var f = u && bo.call(e, "__wrapped__"),
                h = p && bo.call(n, "__wrapped__");
            if (f || h) {
                var y = f ? e.value() : e,
                    m = h ? n.value() : n;
                return o || (o = new Yt), i(y, m, t, r, o)
            }
        }
        return !!d && (o || (o = new Yt), eo(e, n, t, r, i, o))
    };
    var Do = function e(n, t, r, i, o) {
        return n === t || (null == n || null == t || !sr(n) && !sr(t) ? n != n && t != t : wo(n, t, r, i, e, o))
    };
    var Go = function (e, n, t, r) {
        var i = t.length,
            o = i,
            a = !r;
        if (null == e) return !o;
        for (e = Object(e); i--;) {
            var l = t[i];
            if (a && l[2] ? l[1] !== e[l[0]] : !(l[0] in e)) return !1
        }
        for (; ++i < o;) {
            var c = (l = t[i])[0],
                s = e[c],
                u = l[1];
            if (a && l[2]) {
                if (void 0 === s && !(c in e)) return !1
            } else {
                var p = new Yt;
                if (r) var d = r(s, u, c, e, n, p);
                if (!(void 0 === d ? Do(u, s, 3, r, p) : d)) return !1
            }
        }
        return !0
    };
    var Co = function (e) {
        return e == e && !ot(e)
    };
    var So = function (e) {
        for (var n = pi(e), t = n.length; t--;) {
            var r = n[t],
                i = e[r];
            n[t] = [r, i, Co(i)]
        }
        return n
    };
    var Io = function (n, t) {
        return function (e) {
            return null != e && e[n] === t && (void 0 !== t || n in Object(e))
        }
    };
    var Mo = function (n) {
            var t = So(n);
            return 1 == t.length && t[0][2] ? Io(t[0][0], t[0][1]) : function (e) {
                return e === n || Go(e, n, t)
            }
        },
        ko = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Ao = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        _o = /^\w*$/;
    var Oo = function (e, n) {
            if (yr(e)) return !1;
            var t = void 0 === e ? "undefined" : ko(e);
            return !("number" != t && "symbol" != t && "boolean" != t && null != e && !Di(e)) || _o.test(e) || !Ao.test(e) || null != n && e in Object(n)
        },
        Lo = "Expected a function";

    function Eo(o, a) {
        if ("function" != typeof o || null != a && "function" != typeof a) throw new TypeError(Lo);
        var e = function e() {
            var n = arguments,
                t = a ? a.apply(this, n) : n[0],
                r = e.cache;
            if (r.has(t)) return r.get(t);
            var i = o.apply(this, n);
            return e.cache = r.set(t, i) || r, i
        };
        return e.cache = new(Eo.Cache || Ft), e
    }
    Eo.Cache = Ft;
    var No = Eo;
    var jo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        To = /\\(\\)?/g,
        $o = function (e) {
            var n = No(e, function (e) {
                    return 500 === t.size && t.clear(), e
                }),
                t = n.cache;
            return n
        }(function (e) {
            var i = [];
            return 46 === e.charCodeAt(0) && i.push(""), e.replace(jo, function (e, n, t, r) {
                i.push(t ? r.replace(To, "$1") : n || e)
            }), i
        });
    var zo = function (e, n) {
            for (var t = -1, r = null == e ? 0 : e.length, i = Array(r); ++t < r;) i[t] = n(e[t], t, e);
            return i
        },
        Bo = 1 / 0,
        qo = Wn ? Wn.prototype : void 0,
        Fo = qo ? qo.toString : void 0;
    var Ro = function e(n) {
        if ("string" == typeof n) return n;
        if (yr(n)) return zo(n, e) + "";
        if (Di(n)) return Fo ? Fo.call(n) : "";
        var t = n + "";
        return "0" == t && 1 / n == -Bo ? "-0" : t
    };
    var Uo = function (e) {
        return null == e ? "" : Ro(e)
    };
    var Yo = function (e, n) {
        return yr(e) ? e : Oo(e, n) ? [e] : $o(Uo(e))
    };
    var Ho = function (e) {
        if ("string" == typeof e || Di(e)) return e;
        var n = e + "";
        return "0" == n && 1 / e == -1 / 0 ? "-0" : n
    };
    var Vo = function (e, n) {
        for (var t = 0, r = (n = Yo(n, e)).length; null != e && t < r;) e = e[Ho(n[t++])];
        return t && t == r ? e : void 0
    };
    var Wo = function (e, n, t) {
        var r = null == e ? void 0 : Vo(e, n);
        return void 0 === r ? t : r
    };
    var Zo = function (e, n) {
        return null != e && n in Object(e)
    };
    var Ko = function (e, n, t) {
        for (var r = -1, i = (n = Yo(n, e)).length, o = !1; ++r < i;) {
            var a = Ho(n[r]);
            if (!(o = null != e && t(e, a))) break;
            e = e[a]
        }
        return o || ++r != i ? o : !!(i = null == e ? 0 : e.length) && mr(i) && Br(a, i) && (yr(e) || hr(e))
    };
    var Xo = function (e, n) {
        return null != e && Ko(e, n, Zo)
    };
    var Jo = function (t, r) {
        return Oo(t) && Co(r) ? Io(Ho(t), r) : function (e) {
            var n = Wo(e, t);
            return void 0 === n && n === r ? Xo(e, t) : Do(r, n, 3)
        }
    };
    var Qo = function (n) {
        return function (e) {
            return null == e ? void 0 : e[n]
        }
    };
    var ea = function (n) {
        return function (e) {
            return Vo(e, n)
        }
    };
    var na = function (e) {
            return Oo(e) ? Qo(Ho(e)) : ea(e)
        },
        ta = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    var ra = function (e) {
            return "function" == typeof e ? e : null == e ? Kr : "object" == (void 0 === e ? "undefined" : ta(e)) ? yr(e) ? Jo(e[0], e[1]) : Mo(e) : na(e)
        },
        ia = Math.max;
    var oa = function (e, n, t) {
        var r = null == e ? 0 : e.length;
        if (!r) return -1;
        var i = null == t ? 0 : _i(t);
        return i < 0 && (i = ia(r + i, 0)), vi(e, ra(n, 3), i)
    };
    var aa = function (a) {
        return function (e, n, t) {
            var r = Object(e);
            if (!gr(e)) {
                var i = ra(n, 3);
                e = pi(e), n = function (e) {
                    return i(r[e], e, r)
                }
            }
            var o = a(e, n, t);
            return -1 < o ? r[i ? e[o] : o] : void 0
        }
    }(oa);
    var la = function (e, n) {
        return e && jr(n, pi(n), e)
    };
    var ca = function (e, n) {
        return e && jr(n, Hr(n), e)
    };
    var sa = function (e, n) {
            return jr(e, Xi(e), n)
        },
        ua = Object.getOwnPropertySymbols ? function (e) {
            for (var n = []; e;) Yi(n, Xi(e)), e = ir(e);
            return n
        } : Wi;
    var pa = function (e, n) {
        return jr(e, ua(e), n)
    };
    var da = function (e) {
            return Hi(e, Hr, ua)
        },
        fa = Object.prototype.hasOwnProperty;
    var ha = function (e) {
        var n = e.length,
            t = new e.constructor(n);
        return n && "string" == typeof e[0] && fa.call(e, "index") && (t.index = e.index, t.input = e.input), t
    };
    var ya = function (e, n) {
            var t = n ? Jt(e.buffer) : e.buffer;
            return new e.constructor(t, e.byteOffset, e.byteLength)
        },
        ma = /\w*$/;
    var ga = function (e) {
            var n = new e.constructor(e.source, ma.exec(e));
            return n.lastIndex = e.lastIndex, n
        },
        va = Wn ? Wn.prototype : void 0,
        Pa = va ? va.valueOf : void 0;
    var xa = function (e) {
        return Pa ? Object(Pa.call(e)) : {}
    };
    var ba = function (e, n, t) {
        var r = e.constructor;
        switch (n) {
        case "[object ArrayBuffer]":
            return Jt(e);
        case "[object Boolean]":
        case "[object Date]":
            return new r(+e);
        case "[object DataView]":
            return ya(e, t);
        case "[object Float32Array]":
        case "[object Float64Array]":
        case "[object Int8Array]":
        case "[object Int16Array]":
        case "[object Int32Array]":
        case "[object Uint8Array]":
        case "[object Uint8ClampedArray]":
        case "[object Uint16Array]":
        case "[object Uint32Array]":
            return Qt(e, t);
        case "[object Map]":
            return new r;
        case "[object Number]":
        case "[object String]":
            return new r(e);
        case "[object RegExp]":
            return ga(e);
        case "[object Set]":
            return new r;
        case "[object Symbol]":
            return xa(e)
        }
    };
    var wa = function (e) {
            return sr(e) && "[object Map]" == go(e)
        },
        Da = Ar && Ar.isMap,
        Ga = Da ? kr(Da) : wa;
    var Ca = function (e) {
            return sr(e) && "[object Set]" == go(e)
        },
        Sa = Ar && Ar.isSet,
        Ia = Sa ? kr(Sa) : Ca,
        Ma = 1,
        ka = 2,
        Aa = 4,
        _a = "[object Arguments]",
        Oa = "[object Function]",
        La = "[object GeneratorFunction]",
        Ea = "[object Object]",
        Na = {};
    Na[_a] = Na["[object Array]"] = Na["[object ArrayBuffer]"] = Na["[object DataView]"] = Na["[object Boolean]"] = Na["[object Date]"] = Na["[object Float32Array]"] = Na["[object Float64Array]"] = Na["[object Int8Array]"] = Na["[object Int16Array]"] = Na["[object Int32Array]"] = Na["[object Map]"] = Na["[object Number]"] = Na[Ea] = Na["[object RegExp]"] = Na["[object Set]"] = Na["[object String]"] = Na["[object Symbol]"] = Na["[object Uint8Array]"] = Na["[object Uint8ClampedArray]"] = Na["[object Uint16Array]"] = Na["[object Uint32Array]"] = !0, Na["[object Error]"] = Na[Oa] = Na["[object WeakMap]"] = !1;
    var ja = function t(r, i, o, e, n, a) {
        var l, c = i & Ma,
            s = i & ka,
            u = i & Aa;
        if (o && (l = n ? o(r, e, n, a) : o(r)), void 0 !== l) return l;
        if (!ot(r)) return r;
        var p = yr(r);
        if (p) {
            if (l = ha(r), !c) return er(r, l)
        } else {
            var d = go(r),
                f = d == Oa || d == La;
            if (xr(r)) return Kt(r, c);
            if (d == Ea || d == _a || f && !n) {
                if (l = s || f ? {} : lr(r), !c) return s ? pa(r, ca(l, r)) : sa(r, la(l, r))
            } else {
                if (!Na[d]) return n ? r : {};
                l = ba(r, d, c)
            }
        }
        a || (a = new Yt);
        var h = a.get(r);
        if (h) return h;
        if (a.set(r, l), Ia(r)) return r.forEach(function (e) {
            l.add(t(e, i, o, e, r, a))
        }), l;
        if (Ga(r)) return r.forEach(function (e, n) {
            l.set(n, t(e, i, o, n, r, a))
        }), l;
        var y = u ? s ? da : Ji : s ? keysIn : pi,
            m = p ? void 0 : y(r);
        return di(m || r, function (e, n) {
            m && (e = r[n = e]), Nr(l, n, t(e, i, o, n, r, a))
        }), l
    };
    var Ta = function (e) {
            return ja(e, 5)
        },
        $a = {
            value: function () {}
        };

    function za() {
        for (var e, n = 0, t = arguments.length, r = {}; n < t; ++n) {
            if (!(e = arguments[n] + "") || e in r) throw new Error("illegal type: " + e);
            r[e] = []
        }
        return new Ba(r)
    }

    function Ba(e) {
        this._ = e
    }

    function qa(e, n) {
        for (var t, r = 0, i = e.length; r < i; ++r)
            if ((t = e[r]).name === n) return t.value
    }

    function Fa(e, n, t) {
        for (var r = 0, i = e.length; r < i; ++r)
            if (e[r].name === n) {
                e[r] = $a, e = e.slice(0, r).concat(e.slice(r + 1));
                break
            } return null != t && e.push({
            name: n,
            value: t
        }), e
    }

    function Ra() {
        N.preventDefault(), N.stopImmediatePropagation()
    }

    function Ua(e) {
        return function () {
            return e
        }
    }

    function Ya(n, t) {
        return function (e) {
            return n + e * t
        }
    }

    function Ha(o) {
        return 1 == (o = +o) ? Va : function (e, n) {
            return n - e ? (t = e, r = n, i = o, t = Math.pow(t, i), r = Math.pow(r, i) - t, i = 1 / i, function (e) {
                return Math.pow(t + e * r, i)
            }) : Ua(isNaN(e) ? n : e);
            var t, r, i
        }
    }

    function Va(e, n) {
        var t = n - e;
        return t ? Ya(e, t) : Ua(isNaN(e) ? n : e)
    }
    Ba.prototype = za.prototype = {
        constructor: Ba,
        on: function (e, n) {
            var t, r, i = this._,
                o = (r = i, (e + "").trim().split(/^|\s+/).map(function (e) {
                    var n = "",
                        t = e.indexOf(".");
                    if (0 <= t && (n = e.slice(t + 1), e = e.slice(0, t)), e && !r.hasOwnProperty(e)) throw new Error("unknown type: " + e);
                    return {
                        type: e,
                        name: n
                    }
                })),
                a = -1,
                l = o.length;
            if (!(arguments.length < 2)) {
                if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
                for (; ++a < l;)
                    if (t = (e = o[a]).type) i[t] = Fa(i[t], e.name, n);
                    else if (null == n)
                    for (t in i) i[t] = Fa(i[t], e.name, null);
                return this
            }
            for (; ++a < l;)
                if ((t = (e = o[a]).type) && (t = qa(i[t], e.name))) return t
        },
        copy: function () {
            var e = {},
                n = this._;
            for (var t in n) e[t] = n[t].slice();
            return new Ba(e)
        },
        call: function (e, n) {
            if (0 < (t = arguments.length - 2))
                for (var t, r, i = new Array(t), o = 0; o < t; ++o) i[o] = arguments[o + 2];
            if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
            for (o = 0, t = (r = this._[e]).length; o < t; ++o) r[o].value.apply(n, i)
        },
        apply: function (e, n, t) {
            if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
            for (var r = this._[e], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, t)
        }
    };
    var Wa = function e(n) {
        var a = Ha(n);

        function t(n, e) {
            var t = a((n = Ke(n)).r, (e = Ke(e)).r),
                r = a(n.g, e.g),
                i = a(n.b, e.b),
                o = Va(n.opacity, e.opacity);
            return function (e) {
                return n.r = t(e), n.g = r(e), n.b = i(e), n.opacity = o(e), n + ""
            }
        }
        return t.gamma = e, t
    }(1);

    function Za(n, t) {
        return t -= n = +n,
            function (e) {
                return n + t * e
            }
    }
    var Ka = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    var Xa = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        Ja = new RegExp(Xa.source, "g");

    function Qa(e, r) {
        var n, t, i, o, a, l = Xa.lastIndex = Ja.lastIndex = 0,
            c = -1,
            s = [],
            u = [];
        for (e += "", r += "";
            (n = Xa.exec(e)) && (t = Ja.exec(r));)(i = t.index) > l && (i = r.slice(l, i), s[c] ? s[c] += i : s[++c] = i), (n = n[0]) === (t = t[0]) ? s[c] ? s[c] += t : s[++c] = t : (s[++c] = null, u.push({
            i: c,
            x: Za(n, t)
        })), l = Ja.lastIndex;
        return l < r.length && (i = r.slice(l), s[c] ? s[c] += i : s[++c] = i), s.length < 2 ? u[0] ? (a = u[0].x, function (e) {
            return a(e) + ""
        }) : (o = r, function () {
            return o
        }) : (r = u.length, function (e) {
            for (var n, t = 0; t < r; ++t) s[(n = u[t]).i] = n.x(e);
            return s.join("")
        })
    }
    var el = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function nl(e, n) {
        var t, r = void 0 === n ? "undefined" : el(n);
        return null == n || "boolean" === r ? Ua(n) : ("number" === r ? Za : "string" === r ? (t = He(n)) ? (n = t, Wa) : Qa : n instanceof He ? Wa : n instanceof Date ? function (n, t) {
            var r = new Date;
            return t -= n = +n,
                function (e) {
                    return r.setTime(n + t * e), r
                }
        } : Array.isArray(n) ? function (e, n) {
            var t, r = n ? n.length : 0,
                i = e ? Math.min(r, e.length) : 0,
                o = new Array(i),
                a = new Array(r);
            for (t = 0; t < i; ++t) o[t] = nl(e[t], n[t]);
            for (; t < r; ++t) a[t] = n[t];
            return function (e) {
                for (t = 0; t < i; ++t) a[t] = o[t](e);
                return a
            }
        } : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? function (e, n) {
            var t, r = {},
                i = {};
            for (t in null !== e && "object" === (void 0 === e ? "undefined" : Ka(e)) || (e = {}), null !== n && "object" === (void 0 === n ? "undefined" : Ka(n)) || (n = {}), n) t in e ? r[t] = nl(e[t], n[t]) : i[t] = n[t];
            return function (e) {
                for (t in r) i[t] = r[t](e);
                return i
            }
        } : Za)(e, n)
    }

    function tl(n, t) {
        return t -= n = +n,
            function (e) {
                return Math.round(n + t * e)
            }
    }
    var rl, il, ol, al, ll = 180 / Math.PI,
        cl = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1
        };

    function sl(e, n, t, r, i, o) {
        var a, l, c;
        return (a = Math.sqrt(e * e + n * n)) && (e /= a, n /= a), (c = e * t + n * r) && (t -= e * c, r -= n * c), (l = Math.sqrt(t * t + r * r)) && (t /= l, r /= l, c /= l), e * r < n * t && (e = -e, n = -n, c = -c, a = -a), {
            translateX: i,
            translateY: o,
            rotate: Math.atan2(n, e) * ll,
            skewX: Math.atan(c) * ll,
            scaleX: a,
            scaleY: l
        }
    }

    function ul(d, f, h, y) {
        function m(e) {
            return e.length ? e.pop() + " " : ""
        }
        return function (e, n) {
            var t, r, i, o, a, l, c, s, u = [],
                p = [];
            return e = d(e), n = d(n),
                function (e, n, t, r, i, o) {
                    if (e !== t || n !== r) {
                        var a = i.push("translate(", null, f, null, h);
                        o.push({
                            i: a - 4,
                            x: Za(e, t)
                        }, {
                            i: a - 2,
                            x: Za(n, r)
                        })
                    } else(t || r) && i.push("translate(" + t + f + r + h)
                }(e.translateX, e.translateY, n.translateX, n.translateY, u, p), t = e.rotate, r = n.rotate, i = u, o = p, t !== r ? (180 < t - r ? r += 360 : 180 < r - t && (t += 360), o.push({
                    i: i.push(m(i) + "rotate(", null, y) - 2,
                    x: Za(t, r)
                })) : r && i.push(m(i) + "rotate(" + r + y), a = e.skewX, l = n.skewX, c = u, s = p, a !== l ? s.push({
                    i: c.push(m(c) + "skewX(", null, y) - 2,
                    x: Za(a, l)
                }) : l && c.push(m(c) + "skewX(" + l + y),
                function (e, n, t, r, i, o) {
                    if (e !== t || n !== r) {
                        var a = i.push(m(i) + "scale(", null, ",", null, ")");
                        o.push({
                            i: a - 4,
                            x: Za(e, t)
                        }, {
                            i: a - 2,
                            x: Za(n, r)
                        })
                    } else 1 === t && 1 === r || i.push(m(i) + "scale(" + t + "," + r + ")")
                }(e.scaleX, e.scaleY, n.scaleX, n.scaleY, u, p), e = n = null,
                function (e) {
                    for (var n, t = -1, r = p.length; ++t < r;) u[(n = p[t]).i] = n.x(e);
                    return u.join("")
                }
        }
    }
    var pl = ul(function (e) {
            return "none" === e ? cl : (rl || (rl = document.createElement("DIV"), il = document.documentElement, ol = document.defaultView), rl.style.transform = e, e = ol.getComputedStyle(il.appendChild(rl), null).getPropertyValue("transform"), il.removeChild(rl), sl(+(e = e.slice(7, -1).split(","))[0], +e[1], +e[2], +e[3], +e[4], +e[5]))
        }, "px, ", "px)", "deg)"),
        dl = ul(function (e) {
            return null == e ? cl : (al || (al = document.createElementNS("http://www.w3.org/2000/svg", "g")), al.setAttribute("transform", e), (e = al.transform.baseVal.consolidate()) ? sl((e = e.matrix).a, e.b, e.c, e.d, e.e, e.f) : cl)
        }, ", ", ")", ")"),
        fl = Math.SQRT2,
        hl = 2,
        yl = 4,
        ml = 1e-12;

    function gl(e) {
        return ((e = Math.exp(e)) + 1 / e) / 2
    }

    function vl(e, n) {
        var t, a, l = e[0],
            c = e[1],
            s = e[2],
            r = n[0],
            i = n[1],
            o = n[2],
            u = r - l,
            p = i - c,
            d = u * u + p * p;
        if (d < ml) a = Math.log(o / s) / fl, t = function (e) {
            return [l + e * u, c + e * p, s * Math.exp(fl * e * a)]
        };
        else {
            var f = Math.sqrt(d),
                h = (o * o - s * s + yl * d) / (2 * s * hl * f),
                y = (o * o - s * s - yl * d) / (2 * o * hl * f),
                m = Math.log(Math.sqrt(h * h + 1) - h),
                g = Math.log(Math.sqrt(y * y + 1) - y);
            a = (g - m) / fl, t = function (e) {
                var n, t, r = e * a,
                    i = gl(m),
                    o = s / (hl * f) * (i * (t = fl * r + m, ((t = Math.exp(2 * t)) - 1) / (t + 1)) - (n = m, ((n = Math.exp(n)) - 1 / n) / 2));
                return [l + o * u, c + o * p, s * i / gl(fl * r + m)]
            }
        }
        return t.duration = 1e3 * a, t
    }

    function Pl(l) {
        return function e(a) {
            function n(n, e) {
                var t = l((n = Sn(n)).h, (e = Sn(e)).h),
                    r = Va(n.s, e.s),
                    i = Va(n.l, e.l),
                    o = Va(n.opacity, e.opacity);
                return function (e) {
                    return n.h = t(e), n.s = r(e), n.l = i(Math.pow(e, a)), n.opacity = o(e), n + ""
                }
            }
            return a = +a, n.gamma = e, n
        }(1)
    }
    Pl(function (e, n) {
        var t = n - e;
        return t ? Ya(e, 180 < t || t < -180 ? t - 360 * Math.round(t / 360) : t) : Ua(isNaN(e) ? n : e)
    });
    var xl = Pl(Va),
        bl = za("start", "end", "interrupt"),
        wl = [],
        Dl = 0,
        Gl = 1,
        Cl = 2,
        Sl = 3,
        Il = 4,
        Ml = 5,
        kl = 6;

    function Al(e, n, t, r, i, o) {
        var a = e.__transition;
        if (a) {
            if (t in a) return
        } else e.__transition = {};
        ! function (o, a, l) {
            var c, s = o.__transition;

            function u(e) {
                var n, t, r, i;
                if (l.state !== Gl) return d();
                for (n in s)
                    if ((i = s[n]).name === l.name) {
                        if (i.state === Sl) return he(u);
                        i.state === Il ? (i.state = kl, i.timer.stop(), i.on.call("interrupt", o, o.__data__, i.index, i.group), delete s[n]) : +n < a && (i.state = kl, i.timer.stop(), delete s[n])
                    } if (he(function () {
                        l.state === Sl && (l.state = Il, l.timer.restart(p, l.delay, l.time), p(e))
                    }), l.state = Cl, l.on.call("start", o, o.__data__, l.index, l.group), l.state === Cl) {
                    for (l.state = Sl, c = new Array(r = l.tween.length), n = 0, t = -1; n < r; ++n)(i = l.tween[n].value.call(o, o.__data__, l.index, l.group)) && (c[++t] = i);
                    c.length = t + 1
                }
            }

            function p(e) {
                for (var n = e < l.duration ? l.ease.call(null, e / l.duration) : (l.timer.restart(d), l.state = Ml, 1), t = -1, r = c.length; ++t < r;) c[t].call(null, n);
                l.state === Ml && (l.on.call("end", o, o.__data__, l.index, l.group), d())
            }

            function d() {
                for (var e in l.state = kl, l.timer.stop(), delete s[a], s) return;
                delete o.__transition
            }(s[a] = l).timer = ue(function (e) {
                l.state = Gl, l.timer.restart(u, l.delay, l.time), l.delay <= e && u(e - l.delay)
            }, 0, l.time)
        }(e, t, {
            name: n,
            index: r,
            group: i,
            on: bl,
            tween: wl,
            time: o.time,
            delay: o.delay,
            duration: o.duration,
            ease: o.ease,
            timer: null,
            state: Dl
        })
    }

    function _l(e, n) {
        var t = Ll(e, n);
        if (t.state > Dl) throw new Error("too late; already scheduled");
        return t
    }

    function Ol(e, n) {
        var t = Ll(e, n);
        if (t.state > Cl) throw new Error("too late; already started");
        return t
    }

    function Ll(e, n) {
        var t = e.__transition;
        if (!t || !(t = t[n])) throw new Error("transition not found");
        return t
    }

    function El(e, n) {
        var t, r, i, o = e.__transition,
            a = !0;
        if (o) {
            for (i in n = null == n ? null : n + "", o)(t = o[i]).name === n ? (r = t.state > Cl && t.state < Ml, t.state = kl, t.timer.stop(), r && t.on.call("interrupt", e, e.__data__, t.index, t.group), delete o[i]) : a = !1;
            a && delete e.__transition
        }
    }

    function Nl(e, n, t) {
        var r = e._id;
        return e.each(function () {
                var e = Ol(this, r);
                (e.value || (e.value = {}))[n] = t.apply(this, arguments)
            }),
            function (e) {
                return Ll(e, r).value[n]
            }
    }

    function jl(e, n) {
        var t;
        return ("number" == typeof n ? Za : n instanceof He ? Wa : (t = He(n)) ? (n = t, Wa) : Qa)(e, n)
    }
    var Tl = R.prototype.constructor;
    var $l = 0;

    function zl(e, n, t, r) {
        this._groups = e, this._parents = n, this._name = t, this._id = r
    }

    function Bl() {
        return ++$l
    }
    var ql = R.prototype;

    function Fl(e) {
        return +e
    }

    function Rl(e) {
        return e * e * e
    }
    zl.prototype = function (e) {
        return R().transition(e)
    }.prototype = {
        constructor: zl,
        select: function (e) {
            var n = this._name,
                t = this._id;
            "function" != typeof e && (e = f(e));
            for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
                for (var l, c, s = r[a], u = s.length, p = o[a] = new Array(u), d = 0; d < u; ++d)(l = s[d]) && (c = e.call(l, l.__data__, d, s)) && ("__data__" in l && (c.__data__ = l.__data__), p[d] = c, Al(p[d], n, t, d, p, Ll(l, t)));
            return new zl(o, this._parents, n, t)
        },
        selectAll: function (e) {
            var n = this._name,
                t = this._id;
            "function" != typeof e && (e = g(e));
            for (var r = this._groups, i = r.length, o = [], a = [], l = 0; l < i; ++l)
                for (var c, s = r[l], u = s.length, p = 0; p < u; ++p)
                    if (c = s[p]) {
                        for (var d, f = e.call(c, c.__data__, p, s), h = Ll(c, t), y = 0, m = f.length; y < m; ++y)(d = f[y]) && Al(d, n, t, y, f, h);
                        o.push(f), a.push(c)
                    } return new zl(o, a, n, t)
        },
        filter: function (e) {
            "function" != typeof e && (e = u(e));
            for (var n = this._groups, t = n.length, r = new Array(t), i = 0; i < t; ++i)
                for (var o, a = n[i], l = a.length, c = r[i] = [], s = 0; s < l; ++s)(o = a[s]) && e.call(o, o.__data__, s, a) && c.push(o);
            return new zl(r, this._parents, this._name, this._id)
        },
        merge: function (e) {
            if (e._id !== this._id) throw new Error;
            for (var n = this._groups, t = e._groups, r = n.length, i = t.length, o = Math.min(r, i), a = new Array(r), l = 0; l < o; ++l)
                for (var c, s = n[l], u = t[l], p = s.length, d = a[l] = new Array(p), f = 0; f < p; ++f)(c = s[f] || u[f]) && (d[f] = c);
            for (; l < r; ++l) a[l] = n[l];
            return new zl(a, this._parents, this._name, this._id)
        },
        selection: function () {
            return new Tl(this._groups, this._parents)
        },
        transition: function () {
            for (var e = this._name, n = this._id, t = Bl(), r = this._groups, i = r.length, o = 0; o < i; ++o)
                for (var a, l = r[o], c = l.length, s = 0; s < c; ++s)
                    if (a = l[s]) {
                        var u = Ll(a, n);
                        Al(a, e, t, s, l, {
                            time: u.time + u.delay + u.duration,
                            delay: 0,
                            duration: u.duration,
                            ease: u.ease
                        })
                    } return new zl(r, this._parents, e, t)
        },
        call: ql.call,
        nodes: ql.nodes,
        node: ql.node,
        size: ql.size,
        empty: ql.empty,
        each: ql.each,
        on: function (e, n) {
            var t, r, i, o, a, l, c = this._id;
            return arguments.length < 2 ? Ll(this.node(), c).on.on(e) : this.each((t = c, i = n, l = ((r = e) + "").trim().split(/^|\s+/).every(function (e) {
                var n = e.indexOf(".");
                return 0 <= n && (e = e.slice(0, n)), !e || "start" === e
            }) ? _l : Ol, function () {
                var e = l(this, t),
                    n = e.on;
                n !== o && (a = (o = n).copy()).on(r, i), e.on = a
            }))
        },
        attr: function (e, n) {
            var t = o(e),
                r = "transform" === t ? dl : jl;
            return this.attrTween(e, "function" == typeof n ? (t.local ? function (t, r, i) {
                var o, a, l;
                return function () {
                    var e, n = i(this);
                    if (null != n) return (e = this.getAttributeNS(t.space, t.local)) === n ? null : e === o && n === a ? l : l = r(o = e, a = n);
                    this.removeAttributeNS(t.space, t.local)
                }
            } : function (t, r, i) {
                var o, a, l;
                return function () {
                    var e, n = i(this);
                    if (null != n) return (e = this.getAttribute(t)) === n ? null : e === o && n === a ? l : l = r(o = e, a = n);
                    this.removeAttribute(t)
                }
            })(t, r, Nl(this, "attr." + e, n)) : null == n ? (t.local ? function (e) {
                return function () {
                    this.removeAttributeNS(e.space, e.local)
                }
            } : function (e) {
                return function () {
                    this.removeAttribute(e)
                }
            })(t) : (t.local ? function (n, t, r) {
                var i, o;
                return function () {
                    var e = this.getAttributeNS(n.space, n.local);
                    return e === r ? null : e === i ? o : o = t(i = e, r)
                }
            } : function (n, t, r) {
                var i, o;
                return function () {
                    var e = this.getAttribute(n);
                    return e === r ? null : e === i ? o : o = t(i = e, r)
                }
            })(t, r, n + ""))
        },
        attrTween: function (e, n) {
            var t = "attr." + e;
            if (arguments.length < 2) return (t = this.tween(t)) && t._value;
            if (null == n) return this.tween(t, null);
            if ("function" != typeof n) throw new Error;
            var r = o(e);
            return this.tween(t, (r.local ? function (r, e) {
                function n() {
                    var n = this,
                        t = e.apply(n, arguments);
                    return t && function (e) {
                        n.setAttributeNS(r.space, r.local, t(e))
                    }
                }
                return n._value = e, n
            } : function (r, e) {
                function n() {
                    var n = this,
                        t = e.apply(n, arguments);
                    return t && function (e) {
                        n.setAttribute(r, t(e))
                    }
                }
                return n._value = e, n
            })(r, n))
        },
        style: function (e, n, t) {
            var r, i, o, a, l, c, s, u, p, d, f, h, y, m, g, v, P, x = "transform" == (e += "") ? pl : jl;
            return null == n ? this.styleTween(e, (y = e, m = x, function () {
                var e = b(this, y),
                    n = (this.style.removeProperty(y), b(this, y));
                return e === n ? null : e === g && n === v ? P : P = m(g = e, v = n)
            })).on("end.style." + e, (h = e, function () {
                this.style.removeProperty(h)
            })) : this.styleTween(e, "function" == typeof n ? (s = x, u = Nl(this, "style." + (c = e), n), function () {
                var e = b(this, c),
                    n = u(this);
                return null == n && (this.style.removeProperty(c), n = b(this, c)), e === n ? null : e === p && n === d ? f : f = s(p = e, d = n)
            }) : (r = e, i = x, o = n + "", function () {
                var e = b(this, r);
                return e === o ? null : e === a ? l : l = i(a = e, o)
            }), t)
        },
        styleTween: function (e, n, t) {
            var r = "style." + (e += "");
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == n) return this.tween(r, null);
            if ("function" != typeof n) throw new Error;
            return this.tween(r, function (r, e, i) {
                function n() {
                    var n = this,
                        t = e.apply(n, arguments);
                    return t && function (e) {
                        n.style.setProperty(r, t(e), i)
                    }
                }
                return n._value = e, n
            }(e, n, null == t ? "" : t))
        },
        text: function (e) {
            return this.tween("text", "function" == typeof e ? (t = Nl(this, "text", e), function () {
                var e = t(this);
                this.textContent = null == e ? "" : e
            }) : (n = null == e ? "" : e + "", function () {
                this.textContent = n
            }));
            var n, t
        },
        remove: function () {
            return this.on("end.remove", (t = this._id, function () {
                var e = this.parentNode;
                for (var n in this.__transition)
                    if (+n !== t) return;
                e && e.removeChild(this)
            }));
            var t
        },
        tween: function (e, n) {
            var t = this._id;
            if (e += "", arguments.length < 2) {
                for (var r, i = Ll(this.node(), t).tween, o = 0, a = i.length; o < a; ++o)
                    if ((r = i[o]).name === e) return r.value;
                return null
            }
            return this.each((null == n ? function (i, o) {
                var a, l;
                return function () {
                    var e = Ol(this, i),
                        n = e.tween;
                    if (n !== a)
                        for (var t = 0, r = (l = a = n).length; t < r; ++t)
                            if (l[t].name === o) {
                                (l = l.slice()).splice(t, 1);
                                break
                            } e.tween = l
                }
            } : function (o, a, l) {
                var c, s;
                if ("function" != typeof l) throw new Error;
                return function () {
                    var e = Ol(this, o),
                        n = e.tween;
                    if (n !== c) {
                        s = (c = n).slice();
                        for (var t = {
                                name: a,
                                value: l
                            }, r = 0, i = s.length; r < i; ++r)
                            if (s[r].name === a) {
                                s[r] = t;
                                break
                            } r === i && s.push(t)
                    }
                    e.tween = s
                }
            })(t, e, n))
        },
        delay: function (e) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof e ? function (e, n) {
                return function () {
                    _l(this, e).delay = +n.apply(this, arguments)
                }
            } : function (e, n) {
                return n = +n,
                    function () {
                        _l(this, e).delay = n
                    }
            })(n, e)) : Ll(this.node(), n).delay
        },
        duration: function (e) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof e ? function (e, n) {
                return function () {
                    Ol(this, e).duration = +n.apply(this, arguments)
                }
            } : function (e, n) {
                return n = +n,
                    function () {
                        Ol(this, e).duration = n
                    }
            })(n, e)) : Ll(this.node(), n).duration
        },
        ease: function (e) {
            var n = this._id;
            return arguments.length ? this.each(function (e, n) {
                if ("function" != typeof n) throw new Error;
                return function () {
                    Ol(this, e).ease = n
                }
            }(n, e)) : Ll(this.node(), n).ease
        }
    };
    Math.PI, Math.PI;
    var Ul = {
        time: null,
        delay: 0,
        duration: 250,
        ease: function (e) {
            return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2
        }
    };

    function Yl(e, n) {
        for (var t; !(t = e.__transition) || !(t = t[n]);)
            if (!(e = e.parentNode)) return Ul.time = le(), Ul;
        return t
    }

    function Hl(e) {
        return function () {
            return e
        }
    }

    function Vl(e, n, t) {
        this.target = e, this.type = n, this.transform = t
    }

    function Wl(e, n, t) {
        this.k = e, this.x = n, this.y = t
    }
    R.prototype.interrupt = function (e) {
        return this.each(function () {
            El(this, e)
        })
    }, R.prototype.transition = function (e) {
        var n, t;
        e = e instanceof zl ? (n = e._id, e._name) : (n = Bl(), (t = Ul).time = le(), null == e ? null : e + "");
        for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
            for (var a, l = r[o], c = l.length, s = 0; s < c; ++s)(a = l[s]) && Al(a, e, n, s, l, t || Yl(a, n));
        return new zl(r, this._parents, e, n)
    }, Wl.prototype = {
        constructor: Wl,
        scale: function (e) {
            return 1 === e ? this : new Wl(this.k * e, this.x, this.y)
        },
        translate: function (e, n) {
            return 0 === e & 0 === n ? this : new Wl(this.k, this.x + this.k * e, this.y + this.k * n)
        },
        apply: function (e) {
            return [e[0] * this.k + this.x, e[1] * this.k + this.y]
        },
        applyX: function (e) {
            return e * this.k + this.x
        },
        applyY: function (e) {
            return e * this.k + this.y
        },
        invert: function (e) {
            return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k]
        },
        invertX: function (e) {
            return (e - this.x) / this.k
        },
        invertY: function (e) {
            return (e - this.y) / this.k
        },
        rescaleX: function (e) {
            return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e))
        },
        rescaleY: function (e) {
            return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e))
        },
        toString: function () {
            return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
        }
    };
    var Zl = new Wl(1, 0, 0);

    function Kl() {
        N.stopImmediatePropagation()
    }

    function Xl() {
        N.preventDefault(), N.stopImmediatePropagation()
    }

    function Jl() {
        return !N.button
    }

    function Ql() {
        var e, n, t = this;
        return n = t instanceof SVGElement ? (e = (t = t.ownerSVGElement || t).width.baseVal.value, t.height.baseVal.value) : (e = t.clientWidth, t.clientHeight), [
            [0, 0],
            [e, n]
        ]
    }

    function ec() {
        return this.__zoom || Zl
    }

    function nc() {
        return -N.deltaY * (N.deltaMode ? 120 : 1) / 500
    }

    function tc() {
        return "ontouchstart" in this
    }

    function rc(e, n, t) {
        var r = e.invertX(n[0][0]) - t[0][0],
            i = e.invertX(n[1][0]) - t[1][0],
            o = e.invertY(n[0][1]) - t[0][1],
            a = e.invertY(n[1][1]) - t[1][1];
        return e.translate(r < i ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o < a ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a))
    }

    function ic() {
        var f, c, s = Jl,
            u = Ql,
            h = rc,
            i = nc,
            n = tc,
            o = [0, 1 / 0],
            y = [
                [-1 / 0, -1 / 0],
                [1 / 0, 1 / 0]
            ],
            a = 250,
            p = vl,
            l = [],
            t = za("start", "zoom", "end"),
            d = 500,
            m = 150,
            g = 0;

        function v(e) {
            e.property("__zoom", ec).on("wheel.zoom", r).on("mousedown.zoom", C).on("dblclick.zoom", S).filter(n).on("touchstart.zoom", I).on("touchmove.zoom", M).on("touchend.zoom touchcancel.zoom", k).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
        }

        function P(e, n) {
            return (n = Math.max(o[0], Math.min(o[1], n))) === e.k ? e : new Wl(n, e.x, e.y)
        }

        function x(e, n, t) {
            var r = n[0] - t[0] * e.k,
                i = n[1] - t[1] * e.k;
            return r === e.x && i === e.y ? e : new Wl(e.k, r, i)
        }

        function b(e) {
            return [(+e[0][0] + +e[1][0]) / 2, (+e[0][1] + +e[1][1]) / 2]
        }

        function w(e, c, s) {
            e.on("start.zoom", function () {
                D(this, arguments).start()
            }).on("interrupt.zoom end.zoom", function () {
                D(this, arguments).end()
            }).tween("zoom", function () {
                var e = arguments,
                    r = D(this, e),
                    n = u.apply(this, e),
                    i = s || b(n),
                    o = Math.max(n[1][0] - n[0][0], n[1][1] - n[0][1]),
                    t = this.__zoom,
                    a = "function" == typeof c ? c.apply(this, e) : c,
                    l = p(t.invert(i).concat(o / t.k), a.invert(i).concat(o / a.k));
                return function (e) {
                    if (1 === e) e = a;
                    else {
                        var n = l(e),
                            t = o / n[2];
                        e = new Wl(t, i[0] - n[0] * t, i[1] - n[1] * t)
                    }
                    r.zoom(null, e)
                }
            })
        }

        function D(e, n) {
            for (var t, r = 0, i = l.length; r < i; ++r)
                if ((t = l[r]).that === e) return t;
            return new G(e, n)
        }

        function G(e, n) {
            this.that = e, this.args = n, this.index = -1, this.active = 0, this.extent = u.apply(e, n)
        }

        function r() {
            if (s.apply(this, arguments)) {
                var e = D(this, arguments),
                    n = this.__zoom,
                    t = Math.max(o[0], Math.min(o[1], n.k * Math.pow(2, i.apply(this, arguments)))),
                    r = V(this);
                if (e.wheel) e.mouse[0][0] === r[0] && e.mouse[0][1] === r[1] || (e.mouse[1] = n.invert(e.mouse[0] = r)), clearTimeout(e.wheel);
                else {
                    if (n.k === t) return;
                    e.mouse = [r, n.invert(r)], El(this), e.start()
                }
                Xl(), e.wheel = setTimeout(function () {
                    e.wheel = null, e.end()
                }, m), e.zoom("mouse", h(x(P(n, t), e.mouse[0], e.mouse[1]), e.extent, y))
            }
        }

        function C() {
            if (!c && s.apply(this, arguments)) {
                var e, n, t, i = D(this, arguments),
                    o = U(N.view).on("mousemove.zoom", function () {
                        if (Xl(), !i.moved) {
                            var e = N.clientX - a,
                                n = N.clientY - l;
                            i.moved = g < e * e + n * n
                        }
                        i.zoom("mouse", h(x(i.that.__zoom, i.mouse[0] = V(i.that), i.mouse[1]), i.extent, y))
                    }, !0).on("mouseup.zoom", function () {
                        o.on("mousemove.zoom mouseup.zoom", null), e = N.view, n = i.moved, t = e.document.documentElement, r = U(e).on("dragstart.drag", null), n && (r.on("click.drag", Ra, !0), setTimeout(function () {
                            r.on("click.drag", null)
                        }, 0)), "onselectstart" in t ? r.on("selectstart.drag", null) : (t.style.MozUserSelect = t.__noselect, delete t.__noselect), Xl(), i.end();
                        var e, n, t, r
                    }, !0),
                    r = V(this),
                    a = N.clientX,
                    l = N.clientY;
                e = N.view, n = e.document.documentElement, t = U(e).on("dragstart.drag", Ra, !0), "onselectstart" in n ? t.on("selectstart.drag", Ra, !0) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none"), Kl(), i.mouse = [r, this.__zoom.invert(r)], El(this), i.start()
            }
        }

        function S() {
            if (s.apply(this, arguments)) {
                var e = this.__zoom,
                    n = V(this),
                    t = e.invert(n),
                    r = e.k * (N.shiftKey ? .5 : 2),
                    i = h(x(P(e, r), n, t), u.apply(this, arguments), y);
                Xl(), 0 < a ? U(this).transition().duration(a).call(w, i, n) : U(this).call(v.transform, i)
            }
        }

        function I() {
            if (s.apply(this, arguments)) {
                var e, n, t, r, i = D(this, arguments),
                    o = N.changedTouches,
                    a = o.length;
                for (Kl(), n = 0; n < a; ++n) r = [r = W(this, o, (t = o[n]).identifier), this.__zoom.invert(r), t.identifier], i.touch0 ? i.touch1 || (i.touch1 = r) : (i.touch0 = r, e = !0);
                if (f && (f = clearTimeout(f), !i.touch1)) return i.end(), void((r = U(this).on("dblclick.zoom")) && r.apply(this, arguments));
                e && (f = setTimeout(function () {
                    f = null
                }, d), El(this), i.start())
            }
        }

        function M() {
            var e, n, t, r, i = D(this, arguments),
                o = N.changedTouches,
                a = o.length;
            for (Xl(), f && (f = clearTimeout(f)), e = 0; e < a; ++e) t = W(this, o, (n = o[e]).identifier), i.touch0 && i.touch0[2] === n.identifier ? i.touch0[0] = t : i.touch1 && i.touch1[2] === n.identifier && (i.touch1[0] = t);
            if (n = i.that.__zoom, i.touch1) {
                var l = i.touch0[0],
                    c = i.touch0[1],
                    s = i.touch1[0],
                    u = i.touch1[1],
                    p = (p = s[0] - l[0]) * p + (p = s[1] - l[1]) * p,
                    d = (d = u[0] - c[0]) * d + (d = u[1] - c[1]) * d;
                n = P(n, Math.sqrt(p / d)), t = [(l[0] + s[0]) / 2, (l[1] + s[1]) / 2], r = [(c[0] + u[0]) / 2, (c[1] + u[1]) / 2]
            } else {
                if (!i.touch0) return;
                t = i.touch0[0], r = i.touch0[1]
            }
            i.zoom("touch", h(x(n, t, r), i.extent, y))
        }

        function k() {
            var e, n, t = D(this, arguments),
                r = N.changedTouches,
                i = r.length;
            for (Kl(), c && clearTimeout(c), c = setTimeout(function () {
                    c = null
                }, d), e = 0; e < i; ++e) n = r[e], t.touch0 && t.touch0[2] === n.identifier ? delete t.touch0 : t.touch1 && t.touch1[2] === n.identifier && delete t.touch1;
            t.touch1 && !t.touch0 && (t.touch0 = t.touch1, delete t.touch1), t.touch0 ? t.touch0[1] = this.__zoom.invert(t.touch0[0]) : t.end()
        }
        return v.transform = function (e, n) {
            var t = e.selection ? e.selection() : e;
            t.property("__zoom", ec), e !== t ? w(e, n) : t.interrupt().each(function () {
                D(this, arguments).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end()
            })
        }, v.scaleBy = function (e, n) {
            v.scaleTo(e, function () {
                return this.__zoom.k * ("function" == typeof n ? n.apply(this, arguments) : n)
            })
        }, v.scaleTo = function (e, o) {
            v.transform(e, function () {
                var e = u.apply(this, arguments),
                    n = this.__zoom,
                    t = b(e),
                    r = n.invert(t),
                    i = "function" == typeof o ? o.apply(this, arguments) : o;
                return h(x(P(n, i), t, r), e, y)
            })
        }, v.translateBy = function (e, n, t) {
            v.transform(e, function () {
                return h(this.__zoom.translate("function" == typeof n ? n.apply(this, arguments) : n, "function" == typeof t ? t.apply(this, arguments) : t), u.apply(this, arguments), y)
            })
        }, v.translateTo = function (e, r, i) {
            v.transform(e, function () {
                var e = u.apply(this, arguments),
                    n = this.__zoom,
                    t = b(e);
                return h(Zl.translate(t[0], t[1]).scale(n.k).translate("function" == typeof r ? -r.apply(this, arguments) : -r, "function" == typeof i ? -i.apply(this, arguments) : -i), e, y)
            })
        }, G.prototype = {
            start: function () {
                return 1 == ++this.active && (this.index = l.push(this) - 1, this.emit("start")), this
            },
            zoom: function (e, n) {
                return this.mouse && "mouse" !== e && (this.mouse[1] = n.invert(this.mouse[0])), this.touch0 && "touch" !== e && (this.touch0[1] = n.invert(this.touch0[0])), this.touch1 && "touch" !== e && (this.touch1[1] = n.invert(this.touch1[0])), this.that.__zoom = n, this.emit("zoom"), this
            },
            end: function () {
                return 0 == --this.active && (l.splice(this.index, 1), this.index = -1, this.emit("end")), this
            },
            emit: function (e) {
                ! function (e, n, t, r) {
                    var i = N;
                    e.sourceEvent = N, N = e;
                    try {
                        n.apply(t, r)
                    } finally {
                        N = i
                    }
                }(new Vl(v, e, this.that.__zoom), t.apply, t, [e, this.that, this.args])
            }
        }, v.wheelDelta = function (e) {
            return arguments.length ? (i = "function" == typeof e ? e : Hl(+e), v) : i
        }, v.filter = function (e) {
            return arguments.length ? (s = "function" == typeof e ? e : Hl(!!e), v) : s
        }, v.touchable = function (e) {
            return arguments.length ? (n = "function" == typeof e ? e : Hl(!!e), v) : n
        }, v.extent = function (e) {
            return arguments.length ? (u = "function" == typeof e ? e : Hl([
                [+e[0][0], +e[0][1]],
                [+e[1][0], +e[1][1]]
            ]), v) : u
        }, v.scaleExtent = function (e) {
            return arguments.length ? (o[0] = +e[0], o[1] = +e[1], v) : [o[0], o[1]]
        }, v.translateExtent = function (e) {
            return arguments.length ? (y[0][0] = +e[0][0], y[1][0] = +e[1][0], y[0][1] = +e[0][1], y[1][1] = +e[1][1], v) : [
                [y[0][0], y[0][1]],
                [y[1][0], y[1][1]]
            ]
        }, v.constrain = function (e) {
            return arguments.length ? (h = e, v) : h
        }, v.duration = function (e) {
            return arguments.length ? (a = +e, v) : a
        }, v.interpolate = function (e) {
            return arguments.length ? (p = e, v) : p
        }, v.on = function () {
            var e = t.on.apply(t, arguments);
            return e === t ? v : e
        }, v.clickDistance = function (e) {
            return arguments.length ? (g = (e = +e) * e, v) : Math.sqrt(g)
        }, v
    }
    var oc = "$";

    function ac() {}

    function lc(e, n) {
        var t = new ac;
        if (e instanceof ac) e.each(function (e, n) {
            t.set(n, e)
        });
        else if (Array.isArray(e)) {
            var r, i = -1,
                o = e.length;
            if (null == n)
                for (; ++i < o;) t.set(i, e[i]);
            else
                for (; ++i < o;) t.set(n(r = e[i], i, e), r)
        } else if (e)
            for (var a in e) t.set(a, e[a]);
        return t
    }

    function cc() {}
    ac.prototype = lc.prototype = {
        constructor: ac,
        has: function (e) {
            return oc + e in this
        },
        get: function (e) {
            return this[oc + e]
        },
        set: function (e, n) {
            return this[oc + e] = n, this
        },
        remove: function (e) {
            var n = oc + e;
            return n in this && delete this[n]
        },
        clear: function () {
            for (var e in this) e[0] === oc && delete this[e]
        },
        keys: function () {
            var e = [];
            for (var n in this) n[0] === oc && e.push(n.slice(1));
            return e
        },
        values: function () {
            var e = [];
            for (var n in this) n[0] === oc && e.push(this[n]);
            return e
        },
        entries: function () {
            var e = [];
            for (var n in this) n[0] === oc && e.push({
                key: n.slice(1),
                value: this[n]
            });
            return e
        },
        size: function () {
            var e = 0;
            for (var n in this) n[0] === oc && ++e;
            return e
        },
        empty: function () {
            for (var e in this)
                if (e[0] === oc) return !1;
            return !0
        },
        each: function (e) {
            for (var n in this) n[0] === oc && e(this[n], n.slice(1), this)
        }
    };
    var sc = lc.prototype;
    cc.prototype = function (e, n) {
        var t = new cc;
        if (e instanceof cc) e.each(function (e) {
            t.add(e)
        });
        else if (e) {
            var r = -1,
                i = e.length;
            if (null == n)
                for (; ++r < i;) t.add(e[r]);
            else
                for (; ++r < i;) t.add(n(e[r], r, e))
        }
        return t
    }.prototype = {
        constructor: cc,
        has: sc.has,
        add: function (e) {
            return this[oc + (e += "")] = e, this
        },
        remove: sc.remove,
        clear: sc.clear,
        values: sc.keys,
        size: sc.size,
        empty: sc.empty,
        each: sc.each
    };
    var uc = Array.prototype,
        pc = uc.map,
        dc = uc.slice,
        fc = {
            name: "implicit"
        };

    function hc(e) {
        return function () {
            return e
        }
    }

    function yc(e) {
        return +e
    }
    var mc = [0, 1];

    function gc(n, t) {
        return (t -= n = +n) ? function (e) {
            return (e - n) / t
        } : hc(t)
    }

    function vc(e, n, t, r) {
        var i = e[0],
            o = e[1],
            a = n[0],
            l = n[1];
        return a = o < i ? (i = t(o, i), r(l, a)) : (i = t(i, o), r(a, l)),
            function (e) {
                return a(i(e))
            }
    }

    function Pc(t, e, n, r) {
        var i = Math.min(t.length, e.length) - 1,
            o = new Array(i),
            a = new Array(i),
            l = -1;
        for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++l < i;) o[l] = n(t[l], t[l + 1]), a[l] = r(e[l], e[l + 1]);
        return function (e) {
            var n = ve(t, e, 1, i) - 1;
            return a[n](o[n](e))
        }
    }

    function xc(e, n) {
        return n.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp())
    }

    function bc(n, t) {
        var r, o, a, l = mc,
            c = mc,
            s = nl,
            u = !1;

        function i() {
            return r = 2 < Math.min(l.length, c.length) ? Pc : vc, o = a = null, e
        }

        function e(e) {
            return (o || (o = r(l, c, u ? (i = n, function (n, t) {
                var r = i(n = +n, t = +t);
                return function (e) {
                    return e <= n ? 0 : t <= e ? 1 : r(e)
                }
            }) : n, s)))(+e);
            var i
        }
        return e.invert = function (e) {
            return (a || (a = r(c, l, gc, u ? (i = t, function (n, t) {
                var r = i(n = +n, t = +t);
                return function (e) {
                    return e <= 0 ? n : 1 <= e ? t : r(e)
                }
            }) : t)))(+e);
            var i
        }, e.domain = function (e) {
            return arguments.length ? (l = pc.call(e, yc), i()) : l.slice()
        }, e.range = function (e) {
            return arguments.length ? (c = dc.call(e), i()) : c.slice()
        }, e.rangeRound = function (e) {
            return c = dc.call(e), s = tl, i()
        }, e.clamp = function (e) {
            return arguments.length ? (u = !!e, i()) : u
        }, e.interpolate = function (e) {
            return arguments.length ? (s = e, i()) : s
        }, i()
    }

    function wc(e, n) {
        if ((t = (e = n ? e.toExponential(n - 1) : e.toExponential()).indexOf("e")) < 0) return null;
        var t, r = e.slice(0, t);
        return [1 < r.length ? r[0] + r.slice(2) : r, +e.slice(t + 1)]
    }

    function Dc(e) {
        return (e = wc(Math.abs(e))) ? e[1] : NaN
    }
    var Gc, Cc = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function Sc(e) {
        return new Ic(e)
    }

    function Ic(e) {
        if (!(n = Cc.exec(e))) throw new Error("invalid format: " + e);
        var n;
        this.fill = n[1] || " ", this.align = n[2] || ">", this.sign = n[3] || "-", this.symbol = n[4] || "", this.zero = !!n[5], this.width = n[6] && +n[6], this.comma = !!n[7], this.precision = n[8] && +n[8].slice(1), this.trim = !!n[9], this.type = n[10] || ""
    }

    function Mc(e, n) {
        var t = wc(e, n);
        if (!t) return e + "";
        var r = t[0],
            i = t[1];
        return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
    }
    Sc.prototype = Ic.prototype, Ic.prototype.toString = function () {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
    };
    var kc = {
        "%": function (e, n) {
            return (100 * e).toFixed(n)
        },
        b: function (e) {
            return Math.round(e).toString(2)
        },
        c: function (e) {
            return e + ""
        },
        d: function (e) {
            return Math.round(e).toString(10)
        },
        e: function (e, n) {
            return e.toExponential(n)
        },
        f: function (e, n) {
            return e.toFixed(n)
        },
        g: function (e, n) {
            return e.toPrecision(n)
        },
        o: function (e) {
            return Math.round(e).toString(8)
        },
        p: function (e, n) {
            return Mc(100 * e, n)
        },
        r: Mc,
        s: function (e, n) {
            var t = wc(e, n);
            if (!t) return e + "";
            var r = t[0],
                i = t[1],
                o = i - (Gc = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                a = r.length;
            return o === a ? r : a < o ? r + new Array(o - a + 1).join("0") : 0 < o ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + wc(e, Math.max(0, n + o - 1))[0]
        },
        X: function (e) {
            return Math.round(e).toString(16).toUpperCase()
        },
        x: function (e) {
            return Math.round(e).toString(16)
        }
    };

    function Ac(e) {
        return e
    }
    var _c, Oc, Lc, Ec = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    function Nc(e) {
        var n, l, c, w = e.grouping && e.thousands ? (l = e.grouping, c = e.thousands, function (e, n) {
                for (var t = e.length, r = [], i = 0, o = l[0], a = 0; 0 < t && 0 < o && (n < a + o + 1 && (o = Math.max(1, n - a)), r.push(e.substring(t -= o, t + o)), !((a += o + 1) > n));) o = l[i = (i + 1) % l.length];
                return r.reverse().join(c)
            }) : Ac,
            r = e.currency,
            D = e.decimal,
            G = e.numerals ? (n = e.numerals, function (e) {
                return e.replace(/[0-9]/g, function (e) {
                    return n[+e]
                })
            }) : Ac,
            i = e.percent || "%";

        function a(e) {
            var s = (e = Sc(e)).fill,
                u = e.align,
                p = e.sign,
                n = e.symbol,
                d = e.zero,
                f = e.width,
                h = e.comma,
                y = e.precision,
                m = e.trim,
                g = e.type;
            "n" === g ? (h = !0, g = "g") : kc[g] || (null == y && (y = 12), m = !0, g = "g"), (d || "0" === s && "=" === u) && (d = !0, s = "0", u = "=");
            var v = "$" === n ? r[0] : "#" === n && /[boxX]/.test(g) ? "0" + g.toLowerCase() : "",
                P = "$" === n ? r[1] : /[%p]/.test(g) ? i : "",
                x = kc[g],
                b = /[defgprs%]/.test(g);

            function t(e) {
                var n, t, r, i = v,
                    o = P;
                if ("c" === g) o = x(e) + o, e = "";
                else {
                    var a = (e = +e) < 0;
                    if (e = x(Math.abs(e), y), m && (e = function (e) {
                            e: for (var n, t = e.length, r = 1, i = -1; r < t; ++r) switch (e[r]) {
                            case ".":
                                i = n = r;
                                break;
                            case "0":
                                0 === i && (i = r), n = r;
                                break;
                            default:
                                if (0 < i) {
                                    if (!+e[r]) break e;
                                    i = 0
                                }
                            }
                            return 0 < i ? e.slice(0, i) + e.slice(n + 1) : e
                        }(e)), a && 0 == +e && (a = !1), i = (a ? "(" === p ? p : "-" : "-" === p || "(" === p ? "" : p) + i, o = ("s" === g ? Ec[8 + Gc / 3] : "") + o + (a && "(" === p ? ")" : ""), b)
                        for (n = -1, t = e.length; ++n < t;)
                            if ((r = e.charCodeAt(n)) < 48 || 57 < r) {
                                o = (46 === r ? D + e.slice(n + 1) : e.slice(n)) + o, e = e.slice(0, n);
                                break
                            }
                }
                h && !d && (e = w(e, 1 / 0));
                var l = i.length + e.length + o.length,
                    c = l < f ? new Array(f - l + 1).join(s) : "";
                switch (h && d && (e = w(c + e, c.length ? f - o.length : 1 / 0), c = ""), u) {
                case "<":
                    e = i + e + o + c;
                    break;
                case "=":
                    e = i + c + e + o;
                    break;
                case "^":
                    e = c.slice(0, l = c.length >> 1) + i + e + o + c.slice(l);
                    break;
                default:
                    e = c + i + e + o
                }
                return G(e)
            }
            return y = null == y ? 6 : /[gprs]/.test(g) ? Math.max(1, Math.min(21, y)) : Math.max(0, Math.min(20, y)), t.toString = function () {
                return e + ""
            }, t
        }
        return {
            format: a,
            formatPrefix: function (e, n) {
                var t = a(((e = Sc(e)).type = "f", e)),
                    r = 3 * Math.max(-8, Math.min(8, Math.floor(Dc(n) / 3))),
                    i = Math.pow(10, -r),
                    o = Ec[8 + r / 3];
                return function (e) {
                    return t(i * e) + o
                }
            }
        }
    }

    function jc(e, n, t) {
        var r, i, o, a, l, c, s = e[0],
            u = e[e.length - 1],
            p = Se(s, u, null == n ? 10 : n);
        switch ((t = Sc(null == t ? ",f" : t)).type) {
        case "s":
            var d = Math.max(Math.abs(s), Math.abs(u));
            return null != t.precision || isNaN((l = p, c = d, r = Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(Dc(c) / 3))) - Dc(Math.abs(l))))) || (t.precision = r), Lc(t, d);
        case "":
        case "e":
        case "g":
        case "p":
        case "r":
            null != t.precision || isNaN((o = p, a = Math.max(Math.abs(s), Math.abs(u)), o = Math.abs(o), a = Math.abs(a) - o, r = Math.max(0, Dc(a) - Dc(o)) + 1)) || (t.precision = r - ("e" === t.type));
            break;
        case "f":
        case "%":
            null != t.precision || isNaN((i = p, r = Math.max(0, -Dc(Math.abs(i))))) || (t.precision = r - 2 * ("%" === t.type))
        }
        return Oc(t)
    }

    function Tc(l) {
        var c = l.domain;
        return l.ticks = function (e) {
            var n = c();
            return Ce(n[0], n[n.length - 1], null == e ? 10 : e)
        }, l.tickFormat = function (e, n) {
            return jc(c(), e, n)
        }, l.nice = function (e) {
            var n = c(),
                t = n.length - 1,
                r = null == e ? 10 : e,
                i = n[0],
                o = n[t],
                a = Se(i, o, r);
            return a && (a = Se(Math.floor(i / a) * a, Math.ceil(o / a) * a, r), n[0] = Math.floor(i / a) * a, n[t] = Math.ceil(o / a) * a, c(n)), l
        }, l
    }

    function $c() {
        var e = bc(gc, Za);
        return e.copy = function () {
            return xc(e, $c())
        }, Tc(e)
    }

    function zc(e, n) {
        return e < 0 ? -Math.pow(-e, n) : Math.pow(e, n)
    }

    function Bc() {
        var r = 1,
            e = bc(function (n, t) {
                return (t = zc(t, r) - (n = zc(n, r))) ? function (e) {
                    return (zc(e, r) - n) / t
                } : hc(t)
            }, function (n, t) {
                return t = zc(t, r) - (n = zc(n, r)),
                    function (e) {
                        return zc(n + t * e, 1 / r)
                    }
            }),
            n = e.domain;
        return e.exponent = function (e) {
            return arguments.length ? (r = +e, n(n())) : r
        }, e.copy = function () {
            return xc(e, Bc().exponent(r))
        }, Tc(e)
    }
    _c = Nc({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
    }), Oc = _c.format, Lc = _c.formatPrefix;
    var qc = new Date,
        Fc = new Date;

    function Rc(o, a, t, r) {
        function l(e) {
            return o(e = new Date(+e)), e
        }
        return (l.floor = l).ceil = function (e) {
            return o(e = new Date(e - 1)), a(e, 1), o(e), e
        }, l.round = function (e) {
            var n = l(e),
                t = l.ceil(e);
            return e - n < t - e ? n : t
        }, l.offset = function (e, n) {
            return a(e = new Date(+e), null == n ? 1 : Math.floor(n)), e
        }, l.range = function (e, n, t) {
            var r, i = [];
            if (e = l.ceil(e), t = null == t ? 1 : Math.floor(t), !(e < n && 0 < t)) return i;
            for (; i.push(r = new Date(+e)), a(e, t), o(e), r < e && e < n;);
            return i
        }, l.filter = function (t) {
            return Rc(function (e) {
                if (e <= e)
                    for (; o(e), !t(e);) e.setTime(e - 1)
            }, function (e, n) {
                if (e <= e)
                    if (n < 0)
                        for (; ++n <= 0;)
                            for (; a(e, -1), !t(e););
                    else
                        for (; 0 <= --n;)
                            for (; a(e, 1), !t(e););
            })
        }, t && (l.count = function (e, n) {
            return qc.setTime(+e), Fc.setTime(+n), o(qc), o(Fc), Math.floor(t(qc, Fc))
        }, l.every = function (n) {
            return n = Math.floor(n), isFinite(n) && 0 < n ? 1 < n ? l.filter(r ? function (e) {
                return r(e) % n == 0
            } : function (e) {
                return l.count(0, e) % n == 0
            }) : l : null
        }), l
    }
    var Uc = Rc(function () {}, function (e, n) {
        e.setTime(+e + n)
    }, function (e, n) {
        return n - e
    });
    Uc.every = function (t) {
        return t = Math.floor(t), isFinite(t) && 0 < t ? 1 < t ? Rc(function (e) {
            e.setTime(Math.floor(e / t) * t)
        }, function (e, n) {
            e.setTime(+e + n * t)
        }, function (e, n) {
            return (n - e) / t
        }) : Uc : null
    };
    Uc.range;
    var Yc = 6e4,
        Hc = 36e5,
        Vc = (Rc(function (e) {
            e.setTime(1e3 * Math.floor(e / 1e3))
        }, function (e, n) {
            e.setTime(+e + 1e3 * n)
        }, function (e, n) {
            return (n - e) / 1e3
        }, function (e) {
            return e.getUTCSeconds()
        }).range, Rc(function (e) {
            e.setTime(Math.floor(e / Yc) * Yc)
        }, function (e, n) {
            e.setTime(+e + n * Yc)
        }, function (e, n) {
            return (n - e) / Yc
        }, function (e) {
            return e.getMinutes()
        }).range, Rc(function (e) {
            var n = e.getTimezoneOffset() * Yc % Hc;
            n < 0 && (n += Hc), e.setTime(Math.floor((+e - n) / Hc) * Hc + n)
        }, function (e, n) {
            e.setTime(+e + n * Hc)
        }, function (e, n) {
            return (n - e) / Hc
        }, function (e) {
            return e.getHours()
        }).range, Rc(function (e) {
            e.setHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setDate(e.getDate() + n)
        }, function (e, n) {
            return (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * Yc) / 864e5
        }, function (e) {
            return e.getDate() - 1
        }));
    Vc.range;

    function Wc(n) {
        return Rc(function (e) {
            e.setDate(e.getDate() - (e.getDay() + 7 - n) % 7), e.setHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setDate(e.getDate() + 7 * n)
        }, function (e, n) {
            return (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * Yc) / 6048e5
        })
    }
    var Zc = Wc(0),
        Kc = Wc(1),
        Xc = (Wc(2), Wc(3), Wc(4)),
        Jc = (Wc(5), Wc(6), Zc.range, Kc.range, Xc.range, Rc(function (e) {
            e.setDate(1), e.setHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setMonth(e.getMonth() + n)
        }, function (e, n) {
            return n.getMonth() - e.getMonth() + 12 * (n.getFullYear() - e.getFullYear())
        }, function (e) {
            return e.getMonth()
        }).range, Rc(function (e) {
            e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setFullYear(e.getFullYear() + n)
        }, function (e, n) {
            return n.getFullYear() - e.getFullYear()
        }, function (e) {
            return e.getFullYear()
        }));
    Jc.every = function (t) {
        return isFinite(t = Math.floor(t)) && 0 < t ? Rc(function (e) {
            e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setFullYear(e.getFullYear() + n * t)
        }) : null
    };
    Jc.range, Rc(function (e) {
        e.setUTCSeconds(0, 0)
    }, function (e, n) {
        e.setTime(+e + n * Yc)
    }, function (e, n) {
        return (n - e) / Yc
    }, function (e) {
        return e.getUTCMinutes()
    }).range, Rc(function (e) {
        e.setUTCMinutes(0, 0, 0)
    }, function (e, n) {
        e.setTime(+e + n * Hc)
    }, function (e, n) {
        return (n - e) / Hc
    }, function (e) {
        return e.getUTCHours()
    }).range;
    var Qc = Rc(function (e) {
        e.setUTCHours(0, 0, 0, 0)
    }, function (e, n) {
        e.setUTCDate(e.getUTCDate() + n)
    }, function (e, n) {
        return (n - e) / 864e5
    }, function (e) {
        return e.getUTCDate() - 1
    });
    Qc.range;

    function es(n) {
        return Rc(function (e) {
            e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - n) % 7), e.setUTCHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setUTCDate(e.getUTCDate() + 7 * n)
        }, function (e, n) {
            return (n - e) / 6048e5
        })
    }
    var ns = es(0),
        ts = es(1),
        rs = (es(2), es(3), es(4)),
        is = (es(5), es(6), ns.range, ts.range, rs.range, Rc(function (e) {
            e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setUTCMonth(e.getUTCMonth() + n)
        }, function (e, n) {
            return n.getUTCMonth() - e.getUTCMonth() + 12 * (n.getUTCFullYear() - e.getUTCFullYear())
        }, function (e) {
            return e.getUTCMonth()
        }).range, Rc(function (e) {
            e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setUTCFullYear(e.getUTCFullYear() + n)
        }, function (e, n) {
            return n.getUTCFullYear() - e.getUTCFullYear()
        }, function (e) {
            return e.getUTCFullYear()
        }));
    is.every = function (t) {
        return isFinite(t = Math.floor(t)) && 0 < t ? Rc(function (e) {
            e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
        }, function (e, n) {
            e.setUTCFullYear(e.getUTCFullYear() + n * t)
        }) : null
    };
    is.range;

    function os(e) {
        if (0 <= e.y && e.y < 100) {
            var n = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
            return n.setFullYear(e.y), n
        }
        return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L)
    }

    function as(e) {
        if (0 <= e.y && e.y < 100) {
            var n = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
            return n.setUTCFullYear(e.y), n
        }
        return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L))
    }

    function ls(e) {
        return {
            y: e,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0
        }
    }
    var cs, ss, us, ps = {
            "-": "",
            _: " ",
            0: "0"
        },
        ds = /^\s*\d+/,
        fs = /^%/,
        hs = /[\\^$*+?|[\]().{}]/g;

    function ys(e, n, t) {
        var r = e < 0 ? "-" : "",
            i = (r ? -e : e) + "",
            o = i.length;
        return r + (o < t ? new Array(t - o + 1).join(n) + i : i)
    }

    function ms(e) {
        return e.replace(hs, "\\$&")
    }

    function gs(e) {
        return new RegExp("^(?:" + e.map(ms).join("|") + ")", "i")
    }

    function vs(e) {
        for (var n = {}, t = -1, r = e.length; ++t < r;) n[e[t].toLowerCase()] = t;
        return n
    }

    function Ps(e, n, t) {
        var r = ds.exec(n.slice(t, t + 1));
        return r ? (e.w = +r[0], t + r[0].length) : -1
    }

    function xs(e, n, t) {
        var r = ds.exec(n.slice(t, t + 1));
        return r ? (e.u = +r[0], t + r[0].length) : -1
    }

    function bs(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.U = +r[0], t + r[0].length) : -1
    }

    function ws(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.V = +r[0], t + r[0].length) : -1
    }

    function Ds(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.W = +r[0], t + r[0].length) : -1
    }

    function Gs(e, n, t) {
        var r = ds.exec(n.slice(t, t + 4));
        return r ? (e.y = +r[0], t + r[0].length) : -1
    }

    function Cs(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.y = +r[0] + (68 < +r[0] ? 1900 : 2e3), t + r[0].length) : -1
    }

    function Ss(e, n, t) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(t, t + 6));
        return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), t + r[0].length) : -1
    }

    function Is(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.m = r[0] - 1, t + r[0].length) : -1
    }

    function Ms(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.d = +r[0], t + r[0].length) : -1
    }

    function ks(e, n, t) {
        var r = ds.exec(n.slice(t, t + 3));
        return r ? (e.m = 0, e.d = +r[0], t + r[0].length) : -1
    }

    function As(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.H = +r[0], t + r[0].length) : -1
    }

    function _s(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.M = +r[0], t + r[0].length) : -1
    }

    function Os(e, n, t) {
        var r = ds.exec(n.slice(t, t + 2));
        return r ? (e.S = +r[0], t + r[0].length) : -1
    }

    function Ls(e, n, t) {
        var r = ds.exec(n.slice(t, t + 3));
        return r ? (e.L = +r[0], t + r[0].length) : -1
    }

    function Es(e, n, t) {
        var r = ds.exec(n.slice(t, t + 6));
        return r ? (e.L = Math.floor(r[0] / 1e3), t + r[0].length) : -1
    }

    function Ns(e, n, t) {
        var r = fs.exec(n.slice(t, t + 1));
        return r ? t + r[0].length : -1
    }

    function js(e, n, t) {
        var r = ds.exec(n.slice(t));
        return r ? (e.Q = +r[0], t + r[0].length) : -1
    }

    function Ts(e, n, t) {
        var r = ds.exec(n.slice(t));
        return r ? (e.Q = 1e3 * +r[0], t + r[0].length) : -1
    }

    function $s(e, n) {
        return ys(e.getDate(), n, 2)
    }

    function zs(e, n) {
        return ys(e.getHours(), n, 2)
    }

    function Bs(e, n) {
        return ys(e.getHours() % 12 || 12, n, 2)
    }

    function qs(e, n) {
        return ys(1 + Vc.count(Jc(e), e), n, 3)
    }

    function Fs(e, n) {
        return ys(e.getMilliseconds(), n, 3)
    }

    function Rs(e, n) {
        return Fs(e, n) + "000"
    }

    function Us(e, n) {
        return ys(e.getMonth() + 1, n, 2)
    }

    function Ys(e, n) {
        return ys(e.getMinutes(), n, 2)
    }

    function Hs(e, n) {
        return ys(e.getSeconds(), n, 2)
    }

    function Vs(e) {
        var n = e.getDay();
        return 0 === n ? 7 : n
    }

    function Ws(e, n) {
        return ys(Zc.count(Jc(e), e), n, 2)
    }

    function Zs(e, n) {
        var t = e.getDay();
        return e = 4 <= t || 0 === t ? Xc(e) : Xc.ceil(e), ys(Xc.count(Jc(e), e) + (4 === Jc(e).getDay()), n, 2)
    }

    function Ks(e) {
        return e.getDay()
    }

    function Xs(e, n) {
        return ys(Kc.count(Jc(e), e), n, 2)
    }

    function Js(e, n) {
        return ys(e.getFullYear() % 100, n, 2)
    }

    function Qs(e, n) {
        return ys(e.getFullYear() % 1e4, n, 4)
    }

    function eu(e) {
        var n = e.getTimezoneOffset();
        return (0 < n ? "-" : (n *= -1, "+")) + ys(n / 60 | 0, "0", 2) + ys(n % 60, "0", 2)
    }

    function nu(e, n) {
        return ys(e.getUTCDate(), n, 2)
    }

    function tu(e, n) {
        return ys(e.getUTCHours(), n, 2)
    }

    function ru(e, n) {
        return ys(e.getUTCHours() % 12 || 12, n, 2)
    }

    function iu(e, n) {
        return ys(1 + Qc.count(is(e), e), n, 3)
    }

    function ou(e, n) {
        return ys(e.getUTCMilliseconds(), n, 3)
    }

    function au(e, n) {
        return ou(e, n) + "000"
    }

    function lu(e, n) {
        return ys(e.getUTCMonth() + 1, n, 2)
    }

    function cu(e, n) {
        return ys(e.getUTCMinutes(), n, 2)
    }

    function su(e, n) {
        return ys(e.getUTCSeconds(), n, 2)
    }

    function uu(e) {
        var n = e.getUTCDay();
        return 0 === n ? 7 : n
    }

    function pu(e, n) {
        return ys(ns.count(is(e), e), n, 2)
    }

    function du(e, n) {
        var t = e.getUTCDay();
        return e = 4 <= t || 0 === t ? rs(e) : rs.ceil(e), ys(rs.count(is(e), e) + (4 === is(e).getUTCDay()), n, 2)
    }

    function fu(e) {
        return e.getUTCDay()
    }

    function hu(e, n) {
        return ys(ts.count(is(e), e), n, 2)
    }

    function yu(e, n) {
        return ys(e.getUTCFullYear() % 100, n, 2)
    }

    function mu(e, n) {
        return ys(e.getUTCFullYear() % 1e4, n, 4)
    }

    function gu() {
        return "+0000"
    }

    function vu() {
        return "%"
    }

    function Pu(e) {
        return +e
    }

    function xu(e) {
        return Math.floor(+e / 1e3)
    }
    cs = function (e) {
        var r = e.dateTime,
            i = e.date,
            o = e.time,
            n = e.periods,
            t = e.days,
            a = e.shortDays,
            l = e.months,
            c = e.shortMonths,
            s = gs(n),
            u = vs(n),
            p = gs(t),
            d = vs(t),
            f = gs(a),
            h = vs(a),
            y = gs(l),
            m = vs(l),
            g = gs(c),
            v = vs(c),
            P = {
                a: function (e) {
                    return a[e.getDay()]
                },
                A: function (e) {
                    return t[e.getDay()]
                },
                b: function (e) {
                    return c[e.getMonth()]
                },
                B: function (e) {
                    return l[e.getMonth()]
                },
                c: null,
                d: $s,
                e: $s,
                f: Rs,
                H: zs,
                I: Bs,
                j: qs,
                L: Fs,
                m: Us,
                M: Ys,
                p: function (e) {
                    return n[+(12 <= e.getHours())]
                },
                Q: Pu,
                s: xu,
                S: Hs,
                u: Vs,
                U: Ws,
                V: Zs,
                w: Ks,
                W: Xs,
                x: null,
                X: null,
                y: Js,
                Y: Qs,
                Z: eu,
                "%": vu
            },
            x = {
                a: function (e) {
                    return a[e.getUTCDay()]
                },
                A: function (e) {
                    return t[e.getUTCDay()]
                },
                b: function (e) {
                    return c[e.getUTCMonth()]
                },
                B: function (e) {
                    return l[e.getUTCMonth()]
                },
                c: null,
                d: nu,
                e: nu,
                f: au,
                H: tu,
                I: ru,
                j: iu,
                L: ou,
                m: lu,
                M: cu,
                p: function (e) {
                    return n[+(12 <= e.getUTCHours())]
                },
                Q: Pu,
                s: xu,
                S: su,
                u: uu,
                U: pu,
                V: du,
                w: fu,
                W: hu,
                x: null,
                X: null,
                y: yu,
                Y: mu,
                Z: gu,
                "%": vu
            },
            b = {
                a: function (e, n, t) {
                    var r = f.exec(n.slice(t));
                    return r ? (e.w = h[r[0].toLowerCase()], t + r[0].length) : -1
                },
                A: function (e, n, t) {
                    var r = p.exec(n.slice(t));
                    return r ? (e.w = d[r[0].toLowerCase()], t + r[0].length) : -1
                },
                b: function (e, n, t) {
                    var r = g.exec(n.slice(t));
                    return r ? (e.m = v[r[0].toLowerCase()], t + r[0].length) : -1
                },
                B: function (e, n, t) {
                    var r = y.exec(n.slice(t));
                    return r ? (e.m = m[r[0].toLowerCase()], t + r[0].length) : -1
                },
                c: function (e, n, t) {
                    return G(e, r, n, t)
                },
                d: Ms,
                e: Ms,
                f: Es,
                H: As,
                I: As,
                j: ks,
                L: Ls,
                m: Is,
                M: _s,
                p: function (e, n, t) {
                    var r = s.exec(n.slice(t));
                    return r ? (e.p = u[r[0].toLowerCase()], t + r[0].length) : -1
                },
                Q: js,
                s: Ts,
                S: Os,
                u: xs,
                U: bs,
                V: ws,
                w: Ps,
                W: Ds,
                x: function (e, n, t) {
                    return G(e, i, n, t)
                },
                X: function (e, n, t) {
                    return G(e, o, n, t)
                },
                y: Cs,
                Y: Gs,
                Z: Ss,
                "%": Ns
            };

        function w(c, s) {
            return function (e) {
                var n, t, r, i = [],
                    o = -1,
                    a = 0,
                    l = c.length;
                for (e instanceof Date || (e = new Date(+e)); ++o < l;) 37 === c.charCodeAt(o) && (i.push(c.slice(a, o)), null != (t = ps[n = c.charAt(++o)]) ? n = c.charAt(++o) : t = "e" === n ? " " : "0", (r = s[n]) && (n = r(e, t)), i.push(n), a = o + 1);
                return i.push(c.slice(a, o)), i.join("")
            }
        }

        function D(i, o) {
            return function (e) {
                var n, t, r = ls(1900);
                if (G(r, i, e += "", 0) != e.length) return null;
                if ("Q" in r) return new Date(r.Q);
                if ("p" in r && (r.H = r.H % 12 + 12 * r.p), "V" in r) {
                    if (r.V < 1 || 53 < r.V) return null;
                    "w" in r || (r.w = 1), r.d = "Z" in r ? (n = 4 < (t = (n = as(ls(r.y))).getUTCDay()) || 0 === t ? ts.ceil(n) : ts(n), n = Qc.offset(n, 7 * (r.V - 1)), r.y = n.getUTCFullYear(), r.m = n.getUTCMonth(), n.getUTCDate() + (r.w + 6) % 7) : (n = 4 < (t = (n = o(ls(r.y))).getDay()) || 0 === t ? Kc.ceil(n) : Kc(n), n = Vc.offset(n, 7 * (r.V - 1)), r.y = n.getFullYear(), r.m = n.getMonth(), n.getDate() + (r.w + 6) % 7)
                } else("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : "W" in r ? 1 : 0), t = "Z" in r ? as(ls(r.y)).getUTCDay() : o(ls(r.y)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + 7 * r.W - (t + 5) % 7 : r.w + 7 * r.U - (t + 6) % 7);
                return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, as(r)) : o(r)
            }
        }

        function G(e, n, t, r) {
            for (var i, o, a = 0, l = n.length, c = t.length; a < l;) {
                if (c <= r) return -1;
                if (37 === (i = n.charCodeAt(a++))) {
                    if (i = n.charAt(a++), !(o = b[i in ps ? n.charAt(a++) : i]) || (r = o(e, t, r)) < 0) return -1
                } else if (i != t.charCodeAt(r++)) return -1
            }
            return r
        }
        return P.x = w(i, P), P.X = w(o, P), P.c = w(r, P), x.x = w(i, x), x.X = w(o, x), x.c = w(r, x), {
            format: function (e) {
                var n = w(e += "", P);
                return n.toString = function () {
                    return e
                }, n
            },
            parse: function (e) {
                var n = D(e += "", os);
                return n.toString = function () {
                    return e
                }, n
            },
            utcFormat: function (e) {
                var n = w(e += "", x);
                return n.toString = function () {
                    return e
                }, n
            },
            utcParse: function (e) {
                var n = D(e, as);
                return n.toString = function () {
                    return e
                }, n
            }
        }
    }({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }), cs.format, cs.parse, ss = cs.utcFormat, us = cs.utcParse;
    var bu = "%Y-%m-%dT%H:%M:%S.%LZ";
    Date.prototype.toISOString || ss(bu); + new Date("2000-01-01T00:00:00.000Z") || us(bu);

    function wu(e) {
        return e.match(/.{6}/g).map(function (e) {
            return "#" + e
        })
    }
    wu("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), wu("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"), wu("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"), wu("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"), xl(Sn(300, .5, 0), Sn(-240, .5, 1));
    xl(Sn(-100, .75, .35), Sn(80, 1.5, .8)), xl(Sn(260, .75, .35), Sn(80, 1.5, .8)), Sn();

    function Du(n) {
        var t = n.length;
        return function (e) {
            return n[Math.max(0, Math.min(t - 1, Math.floor(e * t)))]
        }
    }
    
    
    function Gu() {
        return new Cu
    }

    function Cu() {
        this.reset()
    }
    Cu.prototype = {
        constructor: Cu,
        reset: function () {
            this.s = this.t = 0
        },
        add: function (e) {
            Iu(Su, e, this.t), Iu(this, Su.s, this.s), this.s ? this.t += Su.t : this.s = Su.t
        },
        valueOf: function () {
            return this.s
        }
    };
    var Su = new Cu;

    function Iu(e, n, t) {
        var r = e.s = n + t,
            i = r - n,
            o = r - i;
        e.t = n - o + (t - i)
    }
    var Mu = 1e-6,
        ku = Math.PI,
        Au = ku / 2,
        _u = ku / 4,
        Ou = 2 * ku,
        Lu = 180 / ku,
        Eu = ku / 180,
        Nu = Math.abs,
        ju = Math.atan,
        Tu = Math.atan2,
        $u = Math.cos,
        zu = Math.exp,
        Bu = Math.log,
        qu = Math.sin,
        Fu = Math.sqrt,
        Ru = Math.tan;

    function Uu(e) {
        return 1 < e ? Au : e < -1 ? -Au : Math.asin(e)
    }

    function Yu() {}

    function Hu(e, n) {
        e && Wu.hasOwnProperty(e.type) && Wu[e.type](e, n)
    }
    var Vu = {
            Feature: function (e, n) {
                Hu(e.geometry, n)
            },
            FeatureCollection: function (e, n) {
                for (var t = e.features, r = -1, i = t.length; ++r < i;) Hu(t[r].geometry, n)
            }
        },
        Wu = {
            Sphere: function (e, n) {
                n.sphere()
            },
            Point: function (e, n) {
                e = e.coordinates, n.point(e[0], e[1], e[2])
            },
            MultiPoint: function (e, n) {
                for (var t = e.coordinates, r = -1, i = t.length; ++r < i;) e = t[r], n.point(e[0], e[1], e[2])
            },
            LineString: function (e, n) {
                Zu(e.coordinates, n, 0)
            },
            MultiLineString: function (e, n) {
                for (var t = e.coordinates, r = -1, i = t.length; ++r < i;) Zu(t[r], n, 0)
            },
            Polygon: function (e, n) {
                Ku(e.coordinates, n)
            },
            MultiPolygon: function (e, n) {
                for (var t = e.coordinates, r = -1, i = t.length; ++r < i;) Ku(t[r], n)
            },
            GeometryCollection: function (e, n) {
                for (var t = e.geometries, r = -1, i = t.length; ++r < i;) Hu(t[r], n)
            }
        };

    function Zu(e, n, t) {
        var r, i = -1,
            o = e.length - t;
        for (n.lineStart(); ++i < o;) r = e[i], n.point(r[0], r[1], r[2]);
        n.lineEnd()
    }

    function Ku(e, n) {
        var t = -1,
            r = e.length;
        for (n.polygonStart(); ++t < r;) Zu(e[t], n, 1);
        n.polygonEnd()
    }

    function Xu(e, n) {
        e && Vu.hasOwnProperty(e.type) ? Vu[e.type](e, n) : Hu(e, n)
    }
    Gu(), Gu();

    function Ju(e) {
        return [Tu(e[1], e[0]), Uu(e[2])]
    }

    function Qu(e) {
        var n = e[0],
            t = e[1],
            r = $u(t);
        return [r * $u(n), r * qu(n), qu(t)]
    }

    function ep(e, n) {
        return e[0] * n[0] + e[1] * n[1] + e[2] * n[2]
    }

    function np(e, n) {
        return [e[1] * n[2] - e[2] * n[1], e[2] * n[0] - e[0] * n[2], e[0] * n[1] - e[1] * n[0]]
    }

    function tp(e, n) {
        e[0] += n[0], e[1] += n[1], e[2] += n[2]
    }

    function rp(e, n) {
        return [e[0] * n, e[1] * n, e[2] * n]
    }

    function ip(e) {
        var n = Fu(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
        e[0] /= n, e[1] /= n, e[2] /= n
    }
    Gu();

    function op(t, r) {
        function e(e, n) {
            return e = t(e, n), r(e[0], e[1])
        }
        return t.invert && r.invert && (e.invert = function (e, n) {
            return (e = r.invert(e, n)) && t.invert(e[0], e[1])
        }), e
    }

    function ap(e, n) {
        return [Nu(e) > ku ? e + Math.round(-e / Ou) * Ou : e, n]
    }

    function lp(e, n, t) {
        return (e %= Ou) ? n || t ? op(sp(e), up(n, t)) : sp(e) : n || t ? up(n, t) : ap
    }

    function cp(t) {
        return function (e, n) {
            return [ku < (e += t) ? e - Ou : e < -ku ? e + Ou : e, n]
        }
    }

    function sp(e) {
        var n = cp(e);
        return n.invert = cp(-e), n
    }

    function up(e, n) {
        var l = $u(e),
            c = qu(e),
            s = $u(n),
            u = qu(n);

        function t(e, n) {
            var t = $u(n),
                r = $u(e) * t,
                i = qu(e) * t,
                o = qu(n),
                a = o * l + r * c;
            return [Tu(i * s - a * u, r * l - o * c), Uu(a * s + i * u)]
        }
        return t.invert = function (e, n) {
            var t = $u(n),
                r = $u(e) * t,
                i = qu(e) * t,
                o = qu(n),
                a = o * s - i * u;
            return [Tu(i * s + o * u, r * l + a * c), Uu(a * l - r * c)]
        }, t
    }

    function pp(e, n) {
        (n = Qu(n))[0] -= e, ip(n);
        var t, r = 1 < (t = -n[1]) ? 0 : t < -1 ? ku : Math.acos(t);
        return ((-n[2] < 0 ? -r : r) + Ou - Mu) % Ou
    }

    function dp() {
        var t, n = [];
        return {
            point: function (e, n) {
                t.push([e, n])
            },
            lineStart: function () {
                n.push(t = [])
            },
            lineEnd: Yu,
            rejoin: function () {
                1 < n.length && n.push(n.pop().concat(n.shift()))
            },
            result: function () {
                var e = n;
                return n = [], t = null, e
            }
        }
    }

    function fp(e, n) {
        return Nu(e[0] - n[0]) < Mu && Nu(e[1] - n[1]) < Mu
    }

    function hp(e, n, t, r) {
        this.x = e, this.z = n, this.o = t, this.e = r, this.v = !1, this.n = this.p = null
    }

    function yp(e, n, t, r, o) {
        var a, i, l = [],
            c = [];
        if (e.forEach(function (e) {
                if (!((n = e.length - 1) <= 0)) {
                    var n, t, r = e[0],
                        i = e[n];
                    if (fp(r, i)) {
                        for (o.lineStart(), a = 0; a < n; ++a) o.point((r = e[a])[0], r[1]);
                        o.lineEnd()
                    } else l.push(t = new hp(r, e, null, !0)), c.push(t.o = new hp(r, null, t, !1)), l.push(t = new hp(i, e, null, !1)), c.push(t.o = new hp(i, null, t, !0))
                }
            }), l.length) {
            for (c.sort(n), mp(l), mp(c), a = 0, i = c.length; a < i; ++a) c[a].e = t = !t;
            for (var s, u, p = l[0];;) {
                for (var d = p, f = !0; d.v;)
                    if ((d = d.n) === p) return;
                s = d.z, o.lineStart();
                do {
                    if (d.v = d.o.v = !0, d.e) {
                        if (f)
                            for (a = 0, i = s.length; a < i; ++a) o.point((u = s[a])[0], u[1]);
                        else r(d.x, d.n.x, 1, o);
                        d = d.n
                    } else {
                        if (f)
                            for (s = d.p.z, a = s.length - 1; 0 <= a; --a) o.point((u = s[a])[0], u[1]);
                        else r(d.x, d.p.x, -1, o);
                        d = d.p
                    }
                    s = (d = d.o).z, f = !f
                } while (!d.v);
                o.lineEnd()
            }
        }
    }

    function mp(e) {
        if (n = e.length) {
            for (var n, t, r = 0, i = e[0]; ++r < n;) i.n = t = e[r], t.p = i, i = t;
            i.n = t = e[0], t.p = i
        }
    }
    ap.invert = ap;
    var gp = Gu();

    function vp(m, g, v, P) {
        return function (l) {
            var c, s, u, t = g(l),
                p = dp(),
                d = g(p),
                f = !1,
                n = {
                    point: r,
                    lineStart: i,
                    lineEnd: o,
                    polygonStart: function () {
                        n.point = h, n.lineStart = a, n.lineEnd = y, s = [], c = []
                    },
                    polygonEnd: function () {
                        n.point = r, n.lineStart = i, n.lineEnd = o, s = ke(s);
                        var e = function (e, n) {
                            var t = n[0],
                                r = n[1],
                                i = qu(r),
                                o = [qu(t), -$u(t), 0],
                                a = 0,
                                l = 0;
                            gp.reset(), 1 === i ? r = Au + Mu : -1 === i && (r = -Au - Mu);
                            for (var c = 0, s = e.length; c < s; ++c)
                                if (p = (u = e[c]).length)
                                    for (var u, p, d = u[p - 1], f = d[0], h = d[1] / 2 + _u, y = qu(h), m = $u(h), g = 0; g < p; ++g, f = P, y = b, m = w, d = v) {
                                        var v = u[g],
                                            P = v[0],
                                            x = v[1] / 2 + _u,
                                            b = qu(x),
                                            w = $u(x),
                                            D = P - f,
                                            G = 0 <= D ? 1 : -1,
                                            C = G * D,
                                            S = ku < C,
                                            I = y * b;
                                        if (gp.add(Tu(I * G * qu(C), m * w + I * $u(C))), a += S ? D + G * Ou : D, S ^ t <= f ^ t <= P) {
                                            var M = np(Qu(d), Qu(v));
                                            ip(M);
                                            var k = np(o, M);
                                            ip(k);
                                            var A = (S ^ 0 <= D ? -1 : 1) * Uu(k[2]);
                                            (A < r || r === A && (M[0] || M[1])) && (l += S ^ 0 <= D ? 1 : -1)
                                        }
                                    }
                            return (a < -Mu || a < Mu && gp < -Mu) ^ 1 & l
                        }(c, P);
                        s.length ? (f || (l.polygonStart(), f = !0), yp(s, xp, e, v, l)) : e && (f || (l.polygonStart(), f = !0), l.lineStart(), v(null, null, 1, l), l.lineEnd()), f && (l.polygonEnd(), f = !1), s = c = null
                    },
                    sphere: function () {
                        l.polygonStart(), l.lineStart(), v(null, null, 1, l), l.lineEnd(), l.polygonEnd()
                    }
                };

            function r(e, n) {
                m(e, n) && l.point(e, n)
            }

            function e(e, n) {
                t.point(e, n)
            }

            function i() {
                n.point = e, t.lineStart()
            }

            function o() {
                n.point = r, t.lineEnd()
            }

            function h(e, n) {
                u.push([e, n]), d.point(e, n)
            }

            function a() {
                d.lineStart(), u = []
            }

            function y() {
                h(u[0][0], u[0][1]), d.lineEnd();
                var e, n, t, r, i = d.clean(),
                    o = p.result(),
                    a = o.length;
                if (u.pop(), c.push(u), u = null, a)
                    if (1 & i) {
                        if (0 < (n = (t = o[0]).length - 1)) {
                            for (f || (l.polygonStart(), f = !0), l.lineStart(), e = 0; e < n; ++e) l.point((r = t[e])[0], r[1]);
                            l.lineEnd()
                        }
                    } else 1 < a && 2 & i && o.push(o.pop().concat(o.shift())), s.push(o.filter(Pp))
            }
            return n
        }
    }

    function Pp(e) {
        return 1 < e.length
    }

    function xp(e, n) {
        return ((e = e.x)[0] < 0 ? e[1] - Au - Mu : Au - e[1]) - ((n = n.x)[0] < 0 ? n[1] - Au - Mu : Au - n[1])
    }
    var bp = vp(function () {
        return !0
    }, function (p) {
        var d, f = NaN,
            h = NaN,
            y = NaN;
        return {
            lineStart: function () {
                p.lineStart(), d = 1
            },
            point: function (e, n) {
                var t, r, i, o, a, l, c, s = 0 < e ? ku : -ku,
                    u = Nu(e - f);
                Nu(u - ku) < Mu ? (p.point(f, h = 0 < (h + n) / 2 ? Au : -Au), p.point(y, h), p.lineEnd(), p.lineStart(), p.point(s, h), p.point(e, h), d = 0) : y !== s && ku <= u && (Nu(f - y) < Mu && (f -= y * Mu), Nu(e - s) < Mu && (e -= s * Mu), r = h, o = n, c = qu((t = f) - (i = e)), h = Nu(c) > Mu ? ju((qu(r) * (l = $u(o)) * qu(i) - qu(o) * (a = $u(r)) * qu(t)) / (a * l * c)) : (r + o) / 2, p.point(y, h), p.lineEnd(), p.lineStart(), p.point(s, h), d = 0), p.point(f = e, h = n), y = s
            },
            lineEnd: function () {
                p.lineEnd(), f = h = NaN
            },
            clean: function () {
                return 2 - d
            }
        }
    }, function (e, n, t, r) {
        var i;
        if (null == e) i = t * Au, r.point(-ku, i), r.point(0, i), r.point(ku, i), r.point(ku, 0), r.point(ku, -i), r.point(0, -i), r.point(-ku, -i), r.point(-ku, 0), r.point(-ku, i);
        else if (Nu(e[0] - n[0]) > Mu) {
            var o = e[0] < n[0] ? ku : -ku;
            i = t * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
        } else r.point(n[0], n[1])
    }, [-ku, -Au]);

    function wp(i) {
        var S = $u(i),
            o = 6 * Eu,
            f = 0 < S,
            h = Nu(S) > Mu;

        function y(e, n) {
            return $u(e) * $u(n) > S
        }

        function m(e, n, t) {
            var r = [1, 0, 0],
                i = np(Qu(e), Qu(n)),
                o = ep(i, i),
                a = i[0],
                l = o - a * a;
            if (!l) return !t && e;
            var c = S * o / l,
                s = -S * a / l,
                u = np(r, i),
                p = rp(r, c);
            tp(p, rp(i, s));
            var d = u,
                f = ep(p, d),
                h = ep(d, d),
                y = f * f - h * (ep(p, p) - 1);
            if (!(y < 0)) {
                var m = Fu(y),
                    g = rp(d, (-f - m) / h);
                if (tp(g, p), g = Ju(g), !t) return g;
                var v, P = e[0],
                    x = n[0],
                    b = e[1],
                    w = n[1];
                x < P && (v = P, P = x, x = v);
                var D = x - P,
                    G = Nu(D - ku) < Mu;
                if (!G && w < b && (v = b, b = w, w = v), G || D < Mu ? G ? 0 < b + w ^ g[1] < (Nu(g[0] - P) < Mu ? b : w) : b <= g[1] && g[1] <= w : ku < D ^ (P <= g[0] && g[0] <= x)) {
                    var C = rp(d, (-f + m) / h);
                    return tp(C, p), [g, Ju(C)]
                }
            }
        }

        function g(e, n) {
            var t = f ? i : ku - i,
                r = 0;
            return e < -t ? r |= 1 : t < e && (r |= 2), n < -t ? r |= 4 : t < n && (r |= 8), r
        }
        return vp(y, function (l) {
            var c, s, u, p, d;
            return {
                lineStart: function () {
                    p = u = !1, d = 1
                },
                point: function (e, n) {
                    var t, r = [e, n],
                        i = y(e, n),
                        o = f ? i ? 0 : g(e, n) : i ? g(e + (e < 0 ? ku : -ku), n) : 0;
                    if (!c && (p = u = i) && l.lineStart(), i !== u && (!(t = m(c, r)) || fp(c, t) || fp(r, t)) && (r[0] += Mu, r[1] += Mu, i = y(r[0], r[1])), i !== u) d = 0, i ? (l.lineStart(), t = m(r, c), l.point(t[0], t[1])) : (t = m(c, r), l.point(t[0], t[1]), l.lineEnd()), c = t;
                    else if (h && c && f ^ i) {
                        var a;
                        o & s || !(a = m(r, c, !0)) || (d = 0, f ? (l.lineStart(), l.point(a[0][0], a[0][1]), l.point(a[1][0], a[1][1]), l.lineEnd()) : (l.point(a[1][0], a[1][1]), l.lineEnd(), l.lineStart(), l.point(a[0][0], a[0][1])))
                    }!i || c && fp(c, r) || l.point(r[0], r[1]), c = r, u = i, s = o
                },
                lineEnd: function () {
                    u && l.lineEnd(), c = null
                },
                clean: function () {
                    return d | (p && u) << 1
                }
            }
        }, function (e, n, t, r) {
            ! function (e, n, t, r, i, o) {
                if (t) {
                    var a = $u(n),
                        l = qu(n),
                        c = r * t;
                    null == i ? (i = n + r * Ou, o = n - c / 2) : (i = pp(a, i), o = pp(a, o), (0 < r ? i < o : o < i) && (i += r * Ou));
                    for (var s, u = i; 0 < r ? o < u : u < o; u -= c) s = Ju([a, -l * $u(u), -l * qu(u)]), e.point(s[0], s[1])
                }
            }(r, i, o, t, e, n)
        }, f ? [0, -i] : [-ku, i - ku])
    }
    var Dp = 1e9,
        Gp = -Dp;

    function Cp(g, v, P, x) {
        function b(e, n) {
            return g <= e && e <= P && v <= n && n <= x
        }

        function w(e, n, t, r) {
            var i = 0,
                o = 0;
            if (null == e || (i = a(e, t)) !== (o = a(n, t)) || l(e, n) < 0 ^ 0 < t)
                for (; r.point(0 === i || 3 === i ? g : P, 1 < i ? x : v), (i = (i + t + 4) % 4) !== o;);
            else r.point(n[0], n[1])
        }

        function a(e, n) {
            return Nu(e[0] - g) < Mu ? 0 < n ? 0 : 3 : Nu(e[0] - P) < Mu ? 0 < n ? 2 : 1 : Nu(e[1] - v) < Mu ? 0 < n ? 1 : 0 : 0 < n ? 3 : 2
        }

        function D(e, n) {
            return l(e.x, n.x)
        }

        function l(e, n) {
            var t = a(e, 1),
                r = a(n, 1);
            return t !== r ? t - r : 0 === t ? n[1] - e[1] : 1 === t ? e[0] - n[0] : 2 === t ? e[1] - n[1] : n[0] - e[0]
        }
        return function (r) {
            var i, p, o, a, l, c, s, u, d, f, h, y = r,
                e = dp(),
                n = {
                    point: t,
                    lineStart: function () {
                        n.point = m, p && p.push(o = []);
                        f = !0, d = !1, s = u = NaN
                    },
                    lineEnd: function () {
                        i && (m(a, l), c && d && e.rejoin(), i.push(e.result()));
                        n.point = t, d && y.lineEnd()
                    },
                    polygonStart: function () {
                        y = e, i = [], p = [], h = !0
                    },
                    polygonEnd: function () {
                        var e = function () {
                                for (var e = 0, n = 0, t = p.length; n < t; ++n)
                                    for (var r, i, o = p[n], a = 1, l = o.length, c = o[0], s = c[0], u = c[1]; a < l; ++a) r = s, i = u, c = o[a], s = c[0], u = c[1], i <= x ? x < u && (u - i) * (g - r) < (s - r) * (x - i) && ++e : u <= x && (s - r) * (x - i) < (u - i) * (g - r) && --e;
                                return e
                            }(),
                            n = h && e,
                            t = (i = ke(i)).length;
                        (n || t) && (r.polygonStart(), n && (r.lineStart(), w(null, null, 1, r), r.lineEnd()), t && yp(i, D, e, w, r), r.polygonEnd());
                        y = r, i = p = o = null
                    }
                };

            function t(e, n) {
                b(e, n) && y.point(e, n)
            }

            function m(e, n) {
                var t = b(e, n);
                if (p && o.push([e, n]), f) a = e, l = n, f = !1, (c = t) && (y.lineStart(), y.point(e, n));
                else if (t && d) y.point(e, n);
                else {
                    var r = [s = Math.max(Gp, Math.min(Dp, s)), u = Math.max(Gp, Math.min(Dp, u))],
                        i = [e = Math.max(Gp, Math.min(Dp, e)), n = Math.max(Gp, Math.min(Dp, n))];
                    ! function (e, n, t, r, i, o) {
                        var a, l = e[0],
                            c = e[1],
                            s = 0,
                            u = 1,
                            p = n[0] - l,
                            d = n[1] - c;
                        if (a = t - l, p || !(0 < a)) {
                            if (a /= p, p < 0) {
                                if (a < s) return;
                                a < u && (u = a)
                            } else if (0 < p) {
                                if (u < a) return;
                                s < a && (s = a)
                            }
                            if (a = i - l, p || !(a < 0)) {
                                if (a /= p, p < 0) {
                                    if (u < a) return;
                                    s < a && (s = a)
                                } else if (0 < p) {
                                    if (a < s) return;
                                    a < u && (u = a)
                                }
                                if (a = r - c, d || !(0 < a)) {
                                    if (a /= d, d < 0) {
                                        if (a < s) return;
                                        a < u && (u = a)
                                    } else if (0 < d) {
                                        if (u < a) return;
                                        s < a && (s = a)
                                    }
                                    if (a = o - c, d || !(a < 0)) {
                                        if (a /= d, d < 0) {
                                            if (u < a) return;
                                            s < a && (s = a)
                                        } else if (0 < d) {
                                            if (a < s) return;
                                            a < u && (u = a)
                                        }
                                        return 0 < s && (e[0] = l + s * p, e[1] = c + s * d), u < 1 && (n[0] = l + u * p, n[1] = c + u * d), !0
                                    }
                                }
                            }
                        }
                    }(r, i, g, v, P, x) ? t && (y.lineStart(), y.point(e, n), h = !1): (d || (y.lineStart(), y.point(r[0], r[1])), y.point(i[0], i[1]), t || y.lineEnd(), h = !1)
                }
                s = e, u = n, d = t
            }
            return n
        }
    }
    Gu();

    function Sp(e) {
        return e
    }
    var Ip, Mp, kp, Ap, _p = Gu(),
        Op = Gu(),
        Lp = {
            point: Yu,
            lineStart: Yu,
            lineEnd: Yu,
            polygonStart: function () {
                Lp.lineStart = Ep, Lp.lineEnd = Tp
            },
            polygonEnd: function () {
                Lp.lineStart = Lp.lineEnd = Lp.point = Yu, _p.add(Nu(Op)), Op.reset()
            },
            result: function () {
                var e = _p / 2;
                return _p.reset(), e
            }
        };

    function Ep() {
        Lp.point = Np
    }

    function Np(e, n) {
        Lp.point = jp, Ip = kp = e, Mp = Ap = n
    }

    function jp(e, n) {
        Op.add(Ap * e - kp * n), kp = e, Ap = n
    }

    function Tp() {
        jp(Ip, Mp)
    }
    var $p = 1 / 0,
        zp = $p,
        Bp = -$p,
        qp = Bp,
        Fp = {
            point: function (e, n) {
                e < $p && ($p = e);
                Bp < e && (Bp = e);
                n < zp && (zp = n);
                qp < n && (qp = n)
            },
            lineStart: Yu,
            lineEnd: Yu,
            polygonStart: Yu,
            polygonEnd: Yu,
            result: function () {
                var e = [
                    [$p, zp],
                    [Bp, qp]
                ];
                return Bp = qp = -(zp = $p = 1 / 0), e
            }
        };
    var Rp, Up, Yp, Hp, Vp = 0,
        Wp = 0,
        Zp = 0,
        Kp = 0,
        Xp = 0,
        Jp = 0,
        Qp = 0,
        ed = 0,
        nd = 0,
        td = {
            point: rd,
            lineStart: id,
            lineEnd: ld,
            polygonStart: function () {
                td.lineStart = cd, td.lineEnd = sd
            },
            polygonEnd: function () {
                td.point = rd, td.lineStart = id, td.lineEnd = ld
            },
            result: function () {
                var e = nd ? [Qp / nd, ed / nd] : Jp ? [Kp / Jp, Xp / Jp] : Zp ? [Vp / Zp, Wp / Zp] : [NaN, NaN];
                return Vp = Wp = Zp = Kp = Xp = Jp = Qp = ed = nd = 0, e
            }
        };

    function rd(e, n) {
        Vp += e, Wp += n, ++Zp
    }

    function id() {
        td.point = od
    }

    function od(e, n) {
        td.point = ad, rd(Yp = e, Hp = n)
    }

    function ad(e, n) {
        var t = e - Yp,
            r = n - Hp,
            i = Fu(t * t + r * r);
        Kp += i * (Yp + e) / 2, Xp += i * (Hp + n) / 2, Jp += i, rd(Yp = e, Hp = n)
    }

    function ld() {
        td.point = rd
    }

    function cd() {
        td.point = ud
    }

    function sd() {
        pd(Rp, Up)
    }

    function ud(e, n) {
        td.point = pd, rd(Rp = Yp = e, Up = Hp = n)
    }

    function pd(e, n) {
        var t = e - Yp,
            r = n - Hp,
            i = Fu(t * t + r * r);
        Kp += i * (Yp + e) / 2, Xp += i * (Hp + n) / 2, Jp += i, Qp += (i = Hp * e - Yp * n) * (Yp + e), ed += i * (Hp + n), nd += 3 * i, rd(Yp = e, Hp = n)
    }

    function dd(e) {
        this._context = e
    }
    dd.prototype = {
        _radius: 4.5,
        pointRadius: function (e) {
            return this._radius = e, this
        },
        polygonStart: function () {
            this._line = 0
        },
        polygonEnd: function () {
            this._line = NaN
        },
        lineStart: function () {
            this._point = 0
        },
        lineEnd: function () {
            0 === this._line && this._context.closePath(), this._point = NaN
        },
        point: function (e, n) {
            switch (this._point) {
            case 0:
                this._context.moveTo(e, n), this._point = 1;
                break;
            case 1:
                this._context.lineTo(e, n);
                break;
            default:
                this._context.moveTo(e + this._radius, n), this._context.arc(e, n, this._radius, 0, Ou)
            }
        },
        result: Yu
    };
    var fd, hd, yd, md, gd, vd = Gu(),
        Pd = {
            point: Yu,
            lineStart: function () {
                Pd.point = xd
            },
            lineEnd: function () {
                fd && bd(hd, yd), Pd.point = Yu
            },
            polygonStart: function () {
                fd = !0
            },
            polygonEnd: function () {
                fd = null
            },
            result: function () {
                var e = +vd;
                return vd.reset(), e
            }
        };

    function xd(e, n) {
        Pd.point = bd, hd = md = e, yd = gd = n
    }

    function bd(e, n) {
        md -= e, gd -= n, vd.add(Fu(md * md + gd * gd)), md = e, gd = n
    }

    function wd() {
        this._string = []
    }

    function Dd(e) {
        return "m0," + e + "a" + e + "," + e + " 0 1,1 0," + -2 * e + "a" + e + "," + e + " 0 1,1 0," + 2 * e + "z"
    }

    function Gd(r) {
        return function (e) {
            var n = new Cd;
            for (var t in r) n[t] = r[t];
            return n.stream = e, n
        }
    }

    function Cd() {}

    function Sd(e, n, t) {
        var r = e.clipExtent && e.clipExtent();
        return e.scale(150).translate([0, 0]), null != r && e.clipExtent(null), Xu(t, e.stream(Fp)), n(Fp.result()), null != r && e.clipExtent(r), e
    }

    function Id(a, l, e) {
        return Sd(a, function (e) {
            var n = l[1][0] - l[0][0],
                t = l[1][1] - l[0][1],
                r = Math.min(n / (e[1][0] - e[0][0]), t / (e[1][1] - e[0][1])),
                i = +l[0][0] + (n - r * (e[1][0] + e[0][0])) / 2,
                o = +l[0][1] + (t - r * (e[1][1] + e[0][1])) / 2;
            a.scale(150 * r).translate([i, o])
        }, e)
    }
    wd.prototype = {
        _radius: 4.5,
        _circle: Dd(4.5),
        pointRadius: function (e) {
            return (e = +e) !== this._radius && (this._radius = e, this._circle = null), this
        },
        polygonStart: function () {
            this._line = 0
        },
        polygonEnd: function () {
            this._line = NaN
        },
        lineStart: function () {
            this._point = 0
        },
        lineEnd: function () {
            0 === this._line && this._string.push("Z"), this._point = NaN
        },
        point: function (e, n) {
            switch (this._point) {
            case 0:
                this._string.push("M", e, ",", n), this._point = 1;
                break;
            case 1:
                this._string.push("L", e, ",", n);
                break;
            default:
                null == this._circle && (this._circle = Dd(this._radius)), this._string.push("M", e, ",", n, this._circle)
            }
        },
        result: function () {
            if (this._string.length) {
                var e = this._string.join("");
                return this._string = [], e
            }
            return null
        }
    }, Cd.prototype = {
        constructor: Cd,
        point: function (e, n) {
            this.stream.point(e, n)
        },
        sphere: function () {
            this.stream.sphere()
        },
        lineStart: function () {
            this.stream.lineStart()
        },
        lineEnd: function () {
            this.stream.lineEnd()
        },
        polygonStart: function () {
            this.stream.polygonStart()
        },
        polygonEnd: function () {
            this.stream.polygonEnd()
        }
    };
    var Md = 16,
        kd = $u(30 * Eu);

    function Ad(e, n) {
        return +n ? function (k, A) {
            function _(e, n, t, r, i, o, a, l, c, s, u, p, d, f) {
                var h = a - e,
                    y = l - n,
                    m = h * h + y * y;
                if (4 * A < m && d--) {
                    var g = r + s,
                        v = i + u,
                        P = o + p,
                        x = Fu(g * g + v * v + P * P),
                        b = Uu(P /= x),
                        w = Nu(Nu(P) - 1) < Mu || Nu(t - c) < Mu ? (t + c) / 2 : Tu(v, g),
                        D = k(w, b),
                        G = D[0],
                        C = D[1],
                        S = G - e,
                        I = C - n,
                        M = y * S - h * I;
                    (A < M * M / m || .3 < Nu((h * S + y * I) / m - .5) || r * s + i * u + o * p < kd) && (_(e, n, t, r, i, o, G, C, w, g /= x, v /= x, P, d, f), f.point(G, C), _(G, C, w, g, v, P, a, l, c, s, u, p, d, f))
                }
            }
            return function (i) {
                var t, r, o, a, l, c, s, u, p, d, f, h, y = {
                    point: e,
                    lineStart: n,
                    lineEnd: g,
                    polygonStart: function () {
                        i.polygonStart(), y.lineStart = v
                    },
                    polygonEnd: function () {
                        i.polygonEnd(), y.lineStart = n
                    }
                };

                function e(e, n) {
                    e = k(e, n), i.point(e[0], e[1])
                }

                function n() {
                    u = NaN, y.point = m, i.lineStart()
                }

                function m(e, n) {
                    var t = Qu([e, n]),
                        r = k(e, n);
                    _(u, p, s, d, f, h, u = r[0], p = r[1], s = e, d = t[0], f = t[1], h = t[2], Md, i), i.point(u, p)
                }

                function g() {
                    y.point = e, i.lineEnd()
                }

                function v() {
                    n(), y.point = P, y.lineEnd = x
                }

                function P(e, n) {
                    m(t = e, n), r = u, o = p, a = d, l = f, c = h, y.point = m
                }

                function x() {
                    _(u, p, s, d, f, h, r, o, t, a, l, c, Md, i), (y.lineEnd = g)()
                }
                return y
            }
        }(e, n) : (t = e, Gd({
            point: function (e, n) {
                e = t(e, n), this.stream.point(e[0], e[1])
            }
        }));
        var t
    }
    var _d = Gd({
        point: function (e, n) {
            this.stream.point(e * Eu, n * Eu)
        }
    });

    function Od(e, t, r, n) {
        var i = $u(n),
            o = qu(n),
            a = i * e,
            l = o * e,
            c = i / e,
            s = o / e,
            u = (o * r - i * t) / e,
            p = (o * t + i * r) / e;

        function d(e, n) {
            return [a * e - l * n + t, r - l * e - a * n]
        }
        return d.invert = function (e, n) {
            return [c * e - s * n + u, p - s * e - c * n]
        }, d
    }

    function Ld(e) {
        return function (e) {
            var t, i, n, r, o, a, l, c, s, u, p = 150,
                d = 480,
                f = 250,
                h = 0,
                y = 0,
                m = 0,
                g = 0,
                v = 0,
                P = 0,
                x = null,
                b = bp,
                w = null,
                D = Sp,
                G = .5;

            function C(e) {
                return c(e[0] * Eu, e[1] * Eu)
            }

            function S(e) {
                return (e = c.invert(e[0], e[1])) && [e[0] * Lu, e[1] * Lu]
            }

            function I() {
                var e = Od(p, 0, 0, P).apply(null, t(h, y)),
                    n = (P ? Od : function (t, r, i) {
                        function e(e, n) {
                            return [r + t * e, i - t * n]
                        }
                        return e.invert = function (e, n) {
                            return [(e - r) / t, (i - n) / t]
                        }, e
                    })(p, d - e[0], f - e[1], P);
                return i = lp(m, g, v), l = op(t, n), c = op(i, l), a = Ad(l, G), M()
            }

            function M() {
                return s = u = null, C
            }
            return C.stream = function (e) {
                    return s && u === e ? s : s = _d((r = i, Gd({
                        point: function (e, n) {
                            var t = r(e, n);
                            return this.stream.point(t[0], t[1])
                        }
                    })(b(a(D(u = e))))));
                    var r
                }, C.preclip = function (e) {
                    return arguments.length ? (b = e, x = void 0, M()) : b
                }, C.postclip = function (e) {
                    return arguments.length ? (D = e, w = n = r = o = null, M()) : D
                }, C.clipAngle = function (e) {
                    return arguments.length ? (b = +e ? wp(x = e * Eu) : (x = null, bp), M()) : x * Lu
                }, C.clipExtent = function (e) {
                    return arguments.length ? (D = null == e ? (w = n = r = o = null, Sp) : Cp(w = +e[0][0], n = +e[0][1], r = +e[1][0], o = +e[1][1]), M()) : null == w ? null : [
                        [w, n],
                        [r, o]
                    ]
                }, C.scale = function (e) {
                    return arguments.length ? (p = +e, I()) : p
                }, C.translate = function (e) {
                    return arguments.length ? (d = +e[0], f = +e[1], I()) : [d, f]
                }, C.center = function (e) {
                    return arguments.length ? (h = e[0] % 360 * Eu, y = e[1] % 360 * Eu, I()) : [h * Lu, y * Lu]
                }, C.rotate = function (e) {
                    return arguments.length ? (m = e[0] % 360 * Eu, g = e[1] % 360 * Eu, v = 2 < e.length ? e[2] % 360 * Eu : 0, I()) : [m * Lu, g * Lu, v * Lu]
                }, C.angle = function (e) {
                    return arguments.length ? (P = e % 360 * Eu, I()) : P * Lu
                }, C.precision = function (e) {
                    return arguments.length ? (a = Ad(l, G = e * e), M()) : Fu(G)
                }, C.fitExtent = function (e, n) {
                    return Id(C, e, n)
                }, C.fitSize = function (e, n) {
                    return Id(C, [
                        [0, 0], e
                    ], n)
                }, C.fitWidth = function (e, n) {
                    return a = e, Sd(o = C, function (e) {
                        var n = +a,
                            t = n / (e[1][0] - e[0][0]),
                            r = (n - t * (e[1][0] + e[0][0])) / 2,
                            i = -t * e[0][1];
                        o.scale(150 * t).translate([r, i])
                    }, n);
                    var o, a
                }, C.fitHeight = function (e, n) {
                    return a = e, Sd(o = C, function (e) {
                        var n = +a,
                            t = n / (e[1][1] - e[0][1]),
                            r = -t * e[0][0],
                            i = (n - t * (e[1][1] + e[0][1])) / 2;
                        o.scale(150 * t).translate([r, i])
                    }, n);
                    var o, a
                },
                function () {
                    return t = e.apply(this, arguments), C.invert = t.invert && S, I()
                }
        }(function () {
            return e
        })()
    }

    function Ed(e, n) {
        return [e, Bu(Ru((Au + n) / 2))]
    }

    function Nd() {
        return function (t) {
            var r, i, o, a = Ld(t),
                n = a.center,
                l = a.scale,
                c = a.translate,
                s = a.clipExtent,
                u = null;

            function p() {
                var e = ku * l(),
                    n = a(function (n) {
                        function e(e) {
                            return (e = n(e[0] * Eu, e[1] * Eu))[0] *= Lu, e[1] *= Lu, e
                        }
                        return n = lp(n[0] * Eu, n[1] * Eu, 2 < n.length ? n[2] * Eu : 0), e.invert = function (e) {
                            return (e = n.invert(e[0] * Eu, e[1] * Eu))[0] *= Lu, e[1] *= Lu, e
                        }, e
                    }(a.rotate()).invert([0, 0]));
                return s(null == u ? [
                    [n[0] - e, n[1] - e],
                    [n[0] + e, n[1] + e]
                ] : t === Ed ? [
                    [Math.max(n[0] - e, u), r],
                    [Math.min(n[0] + e, i), o]
                ] : [
                    [u, Math.max(n[1] - e, r)],
                    [i, Math.min(n[1] + e, o)]
                ])
            }
            return a.scale = function (e) {
                return arguments.length ? (l(e), p()) : l()
            }, a.translate = function (e) {
                return arguments.length ? (c(e), p()) : c()
            }, a.center = function (e) {
                return arguments.length ? (n(e), p()) : n()
            }, a.clipExtent = function (e) {
                return arguments.length ? (null == e ? u = r = i = o = null : (u = +e[0][0], r = +e[0][1], i = +e[1][0], o = +e[1][1]), p()) : null == u ? null : [
                    [u, r],
                    [i, o]
                ]
            }, p()
        }(Ed).scale(961 / Ou)
    }
    Ed.invert = function (e, n) {
        return [e, 2 * ju(zu(n)) - Au]
    };
    var jd = Math.PI,
        Td = 2 * jd,
        $d = 1e-6,
        zd = Td - $d;

    function Bd() {
        this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
    }

    function qd() {
        return new Bd
    }

    function Fd(e) {
        return function () {
            return e
        }
    }
    Bd.prototype = qd.prototype = {
        constructor: Bd,
        moveTo: function (e, n) {
            this._ += "M" + (this._x0 = this._x1 = +e) + "," + (this._y0 = this._y1 = +n)
        },
        closePath: function () {
            null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
        },
        lineTo: function (e, n) {
            this._ += "L" + (this._x1 = +e) + "," + (this._y1 = +n)
        },
        quadraticCurveTo: function (e, n, t, r) {
            this._ += "Q" + +e + "," + +n + "," + (this._x1 = +t) + "," + (this._y1 = +r)
        },
        bezierCurveTo: function (e, n, t, r, i, o) {
            this._ += "C" + +e + "," + +n + "," + +t + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o)
        },
        arcTo: function (e, n, t, r, i) {
            e = +e, n = +n, t = +t, r = +r, i = +i;
            var o = this._x1,
                a = this._y1,
                l = t - e,
                c = r - n,
                s = o - e,
                u = a - n,
                p = s * s + u * u;
            if (i < 0) throw new Error("negative radius: " + i);
            if (null === this._x1) this._ += "M" + (this._x1 = e) + "," + (this._y1 = n);
            else if ($d < p)
                if (Math.abs(u * l - c * s) > $d && i) {
                    var d = t - o,
                        f = r - a,
                        h = l * l + c * c,
                        y = d * d + f * f,
                        m = Math.sqrt(h),
                        g = Math.sqrt(p),
                        v = i * Math.tan((jd - Math.acos((h + p - y) / (2 * m * g))) / 2),
                        P = v / g,
                        x = v / m;
                    Math.abs(P - 1) > $d && (this._ += "L" + (e + P * s) + "," + (n + P * u)), this._ += "A" + i + "," + i + ",0,0," + +(s * f < u * d) + "," + (this._x1 = e + x * l) + "," + (this._y1 = n + x * c)
                } else this._ += "L" + (this._x1 = e) + "," + (this._y1 = n);
            else;
        },
        arc: function (e, n, t, r, i, o) {
            e = +e, n = +n;
            var a = (t = +t) * Math.cos(r),
                l = t * Math.sin(r),
                c = e + a,
                s = n + l,
                u = 1 ^ o,
                p = o ? r - i : i - r;
            if (t < 0) throw new Error("negative radius: " + t);
            null === this._x1 ? this._ += "M" + c + "," + s : (Math.abs(this._x1 - c) > $d || Math.abs(this._y1 - s) > $d) && (this._ += "L" + c + "," + s), t && (p < 0 && (p = p % Td + Td), zd < p ? this._ += "A" + t + "," + t + ",0,1," + u + "," + (e - a) + "," + (n - l) + "A" + t + "," + t + ",0,1," + u + "," + (this._x1 = c) + "," + (this._y1 = s) : $d < p && (this._ += "A" + t + "," + t + ",0," + +(jd <= p) + "," + u + "," + (this._x1 = e + t * Math.cos(i)) + "," + (this._y1 = n + t * Math.sin(i))))
        },
        rect: function (e, n, t, r) {
            this._ += "M" + (this._x0 = this._x1 = +e) + "," + (this._y0 = this._y1 = +n) + "h" + +t + "v" + +r + "h" + -t + "Z"
        },
        toString: function () {
            return this._
        }
    };
    var Rd = Math.PI,
        Ud = 2 * Rd,
        Yd = {
            draw: function (e, n) {
                var t = Math.sqrt(n / Rd);
                e.moveTo(t, 0), e.arc(0, 0, t, 0, Ud)
            }
        },
        Hd = {
            draw: function (e, n) {
                var t = Math.sqrt(n / 5) / 2;
                e.moveTo(-3 * t, -t), e.lineTo(-t, -t), e.lineTo(-t, -3 * t), e.lineTo(t, -3 * t), e.lineTo(t, -t), e.lineTo(3 * t, -t), e.lineTo(3 * t, t), e.lineTo(t, t), e.lineTo(t, 3 * t), e.lineTo(-t, 3 * t), e.lineTo(-t, t), e.lineTo(-3 * t, t), e.closePath()
            }
        };

    function Vd() {
        var n = Fd(Yd),
            t = Fd(64),
            r = null;

        function i() {
            var e;
            if (r || (r = e = qd()), n.apply(this, arguments).draw(r, +t.apply(this, arguments)), e) return r = null, e + "" || null
        }
        return i.type = function (e) {
            return arguments.length ? (n = "function" == typeof e ? e : Fd(e), i) : n
        }, i.size = function (e) {
            return arguments.length ? (t = "function" == typeof e ? e : Fd(+e), i) : t
        }, i.context = function (e) {
            return arguments.length ? (r = null == e ? null : e, i) : r
        }, i
    }

    function Wd(e) {
        return e < 0 ? -1 : 1
    }

    function Zd(e, n, t) {
        var r = e._x1 - e._x0,
            i = n - e._x1,
            o = (e._y1 - e._y0) / (r || i < 0 && -0),
            a = (t - e._y1) / (i || r < 0 && -0),
            l = (o * i + a * r) / (r + i);
        return (Wd(o) + Wd(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(l)) || 0
    }

    function Kd(e, n) {
        var t = e._x1 - e._x0;
        return t ? (3 * (e._y1 - e._y0) / t - n) / 2 : n
    }

    function Xd(e, n, t) {
        var r = e._x0,
            i = e._y0,
            o = e._x1,
            a = e._y1,
            l = (o - r) / 3;
        e._context.bezierCurveTo(r + l, i + l * n, o - l, a - l * t, o, a)
    }

    function Jd(e) {
        this._context = e
    }

    function Qd(e) {
        this._context = e
    }

    function ef(e) {
        return e
    }

    function nf(e, n) {
        var t = n.id,
            r = n.bbox,
            i = null == n.properties ? {} : n.properties,
            o = function (e, n) {
                var o = function (e) {
                        if (null == e) return ef;
                        var o, a, l = e.scale[0],
                            c = e.scale[1],
                            s = e.translate[0],
                            u = e.translate[1];
                        return function (e, n) {
                            n || (o = a = 0);
                            var t = 2,
                                r = e.length,
                                i = new Array(r);
                            for (i[0] = (o += e[0]) * l + s, i[1] = (a += e[1]) * c + u; t < r;) i[t] = e[t], ++t;
                            return i
                        }
                    }(e.transform),
                    a = e.arcs;

                function i(e, n) {
                    n.length && n.pop();
                    for (var t = a[e < 0 ? ~e : e], r = 0, i = t.length; r < i; ++r) n.push(o(t[r], r));
                    e < 0 && function (e, n) {
                        for (var t, r = e.length, i = r - n; i < --r;) t = e[i], e[i++] = e[r], e[r] = t
                    }(n, i)
                }

                function l(e) {
                    return o(e)
                }

                function c(e) {
                    for (var n = [], t = 0, r = e.length; t < r; ++t) i(e[t], n);
                    return n.length < 2 && n.push(n[0]), n
                }

                function t(e) {
                    for (var n = c(e); n.length < 4;) n.push(n[0]);
                    return n
                }

                function s(e) {
                    return e.map(t)
                }
                return function e(n) {
                    var t, r = n.type;
                    switch (r) {
                    case "GeometryCollection":
                        return {
                            type: r, geometries: n.geometries.map(e)
                        };
                    case "Point":
                        t = l(n.coordinates);
                        break;
                    case "MultiPoint":
                        t = n.coordinates.map(l);
                        break;
                    case "LineString":
                        t = c(n.arcs);
                        break;
                    case "MultiLineString":
                        t = n.arcs.map(c);
                        break;
                    case "Polygon":
                        t = s(n.arcs);
                        break;
                    case "MultiPolygon":
                        t = n.arcs.map(s);
                        break;
                    default:
                        return null
                    }
                    return {
                        type: r,
                        coordinates: t
                    }
                }(n)
            }(e, n);
        return null == t && null == r ? {
            type: "Feature",
            properties: i,
            geometry: o
        } : null == r ? {
            type: "Feature",
            id: t,
            properties: i,
            geometry: o
        } : {
            type: "Feature",
            id: t,
            bbox: r,
            properties: i,
            geometry: o
        }
    }
    Jd.prototype = {
        areaStart: function () {
            this._line = 0
        },
        areaEnd: function () {
            this._line = NaN
        },
        lineStart: function () {
            this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
        },
        lineEnd: function () {
            switch (this._point) {
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
            case 3:
                Xd(this, this._t0, Kd(this, this._t0))
            }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
        },
        point: function (e, n) {
            var t = NaN;
            if (n = +n, (e = +e) !== this._x1 || n !== this._y1) {
                switch (this._point) {
                case 0:
                    this._point = 1, this._line ? this._context.lineTo(e, n) : this._context.moveTo(e, n);
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3, Xd(this, Kd(this, t = Zd(this, e, n)), t);
                    break;
                default:
                    Xd(this, this._t0, t = Zd(this, e, n))
                }
                this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = n, this._t0 = t
            }
        }
    }, (function (e) {
        this._context = new Qd(e)
    }.prototype = Object.create(Jd.prototype)).point = function (e, n) {
        Jd.prototype.point.call(this, n, e)
    }, Qd.prototype = {
        moveTo: function (e, n) {
            this._context.moveTo(n, e)
        },
        closePath: function () {
            this._context.closePath()
        },
        lineTo: function (e, n) {
            this._context.lineTo(n, e)
        },
        bezierCurveTo: function (e, n, t, r, i, o) {
            this._context.bezierCurveTo(n, e, r, t, o, i)
        }
    };
    Math.PI;
    var tf = ["Africa", "Asia", "Europe", "Middle East", "Oceania", "North America", "South America", "no data"],
        rf = ["AFR", "AS", "EU", "ME", "OC", "NA", "SA", "n/a"],
        of = ["Africa", "Asia", "Europe", "M. East", "Oceania", "N. America", "S. America", "no data"],
        af = {
            Afghanistan: "Asia",
            Albania: "Europe",
            Algeria: "Africa",
            Angola: "Africa",
            Argentina: "South America",
            Armenia: "Asia",
            Australia: "Oceania",
            Austria: "Europe",
            Azerbaijan: "Asia",
            Bahamas: "North America",
            Bahrain: "Middle East",
            Bangladesh: "Asia",
            Barbados: "North America",
            Belarus: "Europe",
            Belgium: "Europe",
            Belize: "North America",
            Benin: "Africa",
            Bhutan: "Asia",
            Bolivia: "South America",
            "Bosnia and Herzegovina": "Europe",
            Botswana: "Africa",
            Brazil: "South America",
            Brunei: "Asia",
            Bulgaria: "Europe",
            "Burkina Faso": "Africa",
            Burundi: "Africa",
            "Cabo Verde": "Africa",
            Cambodia: "Asia",
            Cameroon: "Africa",
            Canada: "North America",
            "Central African Republic": "Africa",
            Chad: "Africa",
            Chile: "South America",
            China: "Asia",
            Colombia: "South America",
            Comoros: "Africa",
            "Congo (Dem. Rep.)": "Africa",
            "Congo (Rep.)": "Africa",
            "Costa Rica": "North America",
            "Cote d'Ivoire": "Africa",
            Croatia: "Europe",
            Cuba: "North America",
            Cyprus: "Middle East",
            "Czech Republic": "Europe",
            Denmark: "Europe",
            Djibouti: "Africa",
            Dominica: "North America",
            "Dominican Republic": "North America",
            Ecuador: "South America",
            Egypt: "Middle East",
            "El Salvador": "North America",
            "Equatorial Guinea": "Africa",
            Eritrea: "Africa",
            Estonia: "Europe",
            Eswatini: "Africa",
            Ethiopia: "Africa",
            Fiji: "Oceania",
            Finland: "Europe",
            France: "Europe",
            Gabon: "Africa",
            "Gambia. The": "Africa",
            Georgia: "Asia",
            Germany: "Europe",
            Ghana: "Africa",
            Greece: "Europe",
            Guatemala: "North America",
            Guinea: "Africa",
            "Guinea-Bissau": "Africa",
            Guyana: "South America",
            Haiti: "North America",
            Honduras: "North America",
            Hungary: "Europe",
            Iceland: "Europe",
            India: "Asia",
            Indonesia: "Asia",
            Iran: "Middle East",
            Iraq: "Middle East",
            Ireland: "Europe",
            Israel: "Middle East",
            Italy: "Europe",
            Jamaica: "North America",
            Japan: "Asia",
            Jordan: "Middle East",
            Kazakhstan: "Asia",
            Kenya: "Africa",
            Kiribati: "Oceania",
            "Korea (Dem. Peoples Rep.)": "Asia",
            "Korea (Rep.)": "Asia",
            Kosovo: "Asia",
            Kuwait: "Middle East",
            Kyrgyzstan: "Asia",
            Laos: "Asia",
            Latvia: "Europe",
            Lebanon: "Middle East",
            Lesotho: "Africa",
            Liberia: "Africa",
            Libya: "Africa",
            Lithuania: "Europe",
            Luxembourg: "Europe",
            Macedonia: "Europe",
            Madagascar: "Africa",
            Malawi: "Africa",
            Malaysia: "Asia",
            Maldives: "Asia",
            Mali: "Africa",
            Malta: "Europe",
            Mauritania: "Africa",
            Mauritius: "Africa",
            Mexico: "North America",
            Micronesia: "Oceania",
            Moldova: "Europe",
            Mongolia: "Asia",
            Montenegro: "Europe",
            Morocco: "Africa",
            Mozambique: "Africa",
            Myanmar: "Asia",
            Namibia: "Africa",
            Nepal: "Asia",
            Netherlands: "Europe",
            "New Zealand": "Oceania",
            Nicaragua: "North America",
            Niger: "Africa",
            Nigeria: "Africa",
            Norway: "Europe",
            Oman: "Middle East",
            Pakistan: "Asia",
            Panama: "North America",
            "Papua New Guinea": "Oceania",
            Paraguay: "South America",
            Peru: "South America",
            Philippines: "Asia",
            Poland: "Europe",
            Portugal: "Europe",
            Qatar: "Middle East",
            Romania: "Europe",
            Russia: "Europe",
            Rwanda: "Africa",
            "Saint Lucia": "North America",
            "Saint Vincent and the Grenadines": "North America",
            Samoa: "Oceania",
            "Sao Tome and Principe": "Africa",
            "Saudi Arabia": "Middle East",
            Senegal: "Africa",
            Serbia: "Europe",
            Seychelles: "Africa",
            "Sierra Leone": "Africa",
            Singapore: "Asia",
            Slovakia: "Europe",
            Slovenia: "Europe",
            "Solomon Islands": "Oceania",
            Somalia: "Africa",
            "South Africa": "Africa",
            Spain: "Europe",
            "Sri Lanka": "Asia",
            Sudan: "Africa",
            Suriname: "South America",
            Sweden: "Europe",
            Switzerland: "Europe",
            Syria: "Middle East",
            Taiwan: "Asia",
            Tajikistan: "Asia",
            Tanzania: "Africa",
            Thailand: "Asia",
            "Timor-Leste": "Asia",
            Togo: "Africa",
            Tonga: "Oceania",
            "Trinidad and Tobago": "North America",
            Tunisia: "Africa",
            Turkey: "Middle East",
            Turkmenistan: "Asia",
            Uganda: "Africa",
            Ukraine: "Europe",
            "United Arab Emirates": "Middle East",
            "United Kingdom": "Europe",
            "United States": "North America",
            Uruguay: "South America",
            Uzbekistan: "Asia",
            Vanuatu: "Oceania",
            Venezuela: "South America",
            Vietnam: "Asia",
            Yemen: "Middle East",
            Zambia: "Africa",
            Zimbabwe: "Africa"
        },
        lf = 0,
        cf = 0,
        sf = 0,
        uf = 0,
        pf = "population",
        df = "indicator",
        ff = ["Andorra", "Antigua & Barbuda", "Grenada", "Liechtenstein", "Marshall Islands", "Monaco", "Nauru", "Palau", "Saint Kitts and Nevis", "San Marino", "South Sudan", "Tuvalu"],
        hf = ["France", "Belgium", "Sweden", "Denmark", "Austria", "Finland", "Norway", "Iceland", "Ireland", "Netherlands", "Germany", "United Kingdom", "New Zealand", "Switzerland", "Luxembourg", "United States", "Austria", "Canada", "Japan", "Australia"],
        yf = ["China", "India"],
        mf = ["Singapore", "Brunei", "United Arab Emirates", "Qatar", "Bahrain", "Saudi Arabia", "Kuwait", "Oman"],
        gf = ["Russia", "Brazil"],
        vf = ["political stability & absence of violence", "rule of law", "regulatory quality", "property rights score", "government integrity score"],
        Pf = [2, 3, 9, 10, 13, 15, 16, 20, 21],
        xf = [4, 5, 8, 23, 24],
        bf = [6, 7, 22, 25, 26],
        wf = [19],
        Df = [4, 17, 18, 20, 21, 27, 28, 29, 30, 31, 21],
        Gf = [{
            "ISO 3166 Country Code": "AD",
            Country: "Andorra",
            Latitude: "42.5",
            Longitude: "1.5"
        }, {
            "ISO 3166 Country Code": "AE",
            Country: "United Arab Emirates",
            Latitude: "24",
            Longitude: "54"
        }, {
            "ISO 3166 Country Code": "AF",
            Country: "Afghanistan",
            Latitude: "33",
            Longitude: "65"
        }, {
            "ISO 3166 Country Code": "AG",
            Country: "Antigua and Barbuda",
            Latitude: "17.05",
            Longitude: "-61.8"
        }, {
            "ISO 3166 Country Code": "AI",
            Country: "Anguilla",
            Latitude: "18.25",
            Longitude: "-63.17"
        }, {
            "ISO 3166 Country Code": "AL",
            Country: "Albania",
            Latitude: "41",
            Longitude: "20"
        }, {
            "ISO 3166 Country Code": "AM",
            Country: "Armenia",
            Latitude: "40",
            Longitude: "45"
        }, {
            "ISO 3166 Country Code": "AO",
            Country: "Angola",
            Latitude: "-12.5",
            Longitude: "18.5"
        }, {
            "ISO 3166 Country Code": "AQ",
            Country: "Antarctica",
            Latitude: "-90",
            Longitude: "0"
        }, {
            "ISO 3166 Country Code": "AR",
            Country: "Argentina",
            Latitude: "-34",
            Longitude: "-64"
        }, {
            "ISO 3166 Country Code": "AS",
            Country: "American Samoa",
            Latitude: "-14.33",
            Longitude: "-170"
        }, {
            "ISO 3166 Country Code": "AT",
            Country: "Austria",
            Latitude: "47.33",
            Longitude: "13.33"
        }, {
            "ISO 3166 Country Code": "AU",
            Country: "Australia",
            Latitude: "-27",
            Longitude: "133"
        }, {
            "ISO 3166 Country Code": "AW",
            Country: "Aruba",
            Latitude: "12.5",
            Longitude: "-69.97"
        }, {
            "ISO 3166 Country Code": "AX",
            Country: "Aland Islands",
            Latitude: "60.1",
            Longitude: "19.93"
        }, {
            "ISO 3166 Country Code": "AZ",
            Country: "Azerbaijan",
            Latitude: "40.5",
            Longitude: "47.5"
        }, {
            "ISO 3166 Country Code": "BA",
            Country: "Bosnia and Herzegovina",
            Latitude: "44",
            Longitude: "18"
        }, {
            "ISO 3166 Country Code": "BB",
            Country: "Barbados",
            Latitude: "13.17",
            Longitude: "-59.53"
        }, {
            "ISO 3166 Country Code": "BD",
            Country: "Bangladesh",
            Latitude: "24",
            Longitude: "90"
        }, {
            "ISO 3166 Country Code": "BE",
            Country: "Belgium",
            Latitude: "50.83",
            Longitude: "4"
        }, {
            "ISO 3166 Country Code": "BF",
            Country: "Burkina Faso",
            Latitude: "13",
            Longitude: "-2"
        }, {
            "ISO 3166 Country Code": "BG",
            Country: "Bulgaria",
            Latitude: "43",
            Longitude: "25"
        }, {
            "ISO 3166 Country Code": "BH",
            Country: "Bahrain",
            Latitude: "26",
            Longitude: "50.55"
        }, {
            "ISO 3166 Country Code": "BI",
            Country: "Burundi",
            Latitude: "-3.5",
            Longitude: "30"
        }, {
            "ISO 3166 Country Code": "BJ",
            Country: "Benin",
            Latitude: "9.5",
            Longitude: "2.25"
        }, {
            "ISO 3166 Country Code": "BL",
            Country: "St. Barthelemy",
            Latitude: "17.897908",
            Longitude: "-62.850556"
        }, {
            "ISO 3166 Country Code": "BM",
            Country: "Bermuda",
            Latitude: "32.33",
            Longitude: "-64.75"
        }, {
            "ISO 3166 Country Code": "BN",
            Country: "Brunei",
            Latitude: "4.5",
            Longitude: "114.67"
        }, {
            "ISO 3166 Country Code": "BO",
            Country: "Bolivia",
            Latitude: "-17",
            Longitude: "-65"
        }, {
            "ISO 3166 Country Code": "BQ",
            Country: "Bonaire, Saint Eustatius and Saba",
            Latitude: "12.25",
            Longitude: "-68.75"
        }, {
            "ISO 3166 Country Code": "BR",
            Country: "Brazil",
            Latitude: "-10",
            Longitude: "-55"
        }, {
            "ISO 3166 Country Code": "BS",
            Country: "Bahamas",
            Latitude: "24.25",
            Longitude: "-76"
        }, {
            "ISO 3166 Country Code": "BT",
            Country: "Bhutan",
            Latitude: "27.5",
            Longitude: "90.5"
        }, {
            "ISO 3166 Country Code": "BV",
            Country: "Bouvet Island",
            Latitude: "-54.43",
            Longitude: "3.4"
        }, {
            "ISO 3166 Country Code": "BW",
            Country: "Botswana",
            Latitude: "-22",
            Longitude: "24"
        }, {
            "ISO 3166 Country Code": "BY",
            Country: "Belarus",
            Latitude: "53",
            Longitude: "28"
        }, {
            "ISO 3166 Country Code": "BZ",
            Country: "Belize",
            Latitude: "17.25",
            Longitude: "-88.75"
        }, {
            "ISO 3166 Country Code": "CA",
            Country: "Canada",
            Latitude: "60",
            Longitude: "-95"
        }, {
            "ISO 3166 Country Code": "CC",
            Country: "Cocos (Keeling) Islands",
            Latitude: "-12.5",
            Longitude: "96.83"
        }, {
            "ISO 3166 Country Code": "CD",
            Country: "Congo (Dem. Rep.)",
            Latitude: "0",
            Longitude: "25"
        }, {
            "ISO 3166 Country Code": "CF",
            Country: "Central African Republic",
            Latitude: "7",
            Longitude: "21"
        }, {
            "ISO 3166 Country Code": "CG",
            Country: "Congo (Rep.)",
            Latitude: "-1",
            Longitude: "15"
        }, {
            "ISO 3166 Country Code": "CH",
            Country: "Switzerland",
            Latitude: "47",
            Longitude: "8"
        }, {
            "ISO 3166 Country Code": "CI",
            Country: "Cote d'Ivoire",
            Latitude: "8",
            Longitude: "-5"
        }, {
            "ISO 3166 Country Code": "CK",
            Country: "Cook Islands",
            Latitude: "-21.23",
            Longitude: "-159.77"
        }, {
            "ISO 3166 Country Code": "CL",
            Country: "Chile",
            Latitude: "-30",
            Longitude: "-71"
        }, {
            "ISO 3166 Country Code": "CM",
            Country: "Cameroon",
            Latitude: "6",
            Longitude: "12"
        }, {
            "ISO 3166 Country Code": "CN",
            Country: "China",
            Latitude: "35",
            Longitude: "105"
        }, {
            "ISO 3166 Country Code": "CO",
            Country: "Colombia",
            Latitude: "4",
            Longitude: "-72"
        }, {
            "ISO 3166 Country Code": "CR",
            Country: "Costa Rica",
            Latitude: "10",
            Longitude: "-84"
        }, {
            "ISO 3166 Country Code": "CU",
            Country: "Cuba",
            Latitude: "21.5",
            Longitude: "-80"
        }, {
            "ISO 3166 Country Code": "CV",
            Country: "Cabo Verde",
            Latitude: "16",
            Longitude: "-24"
        }, {
            "ISO 3166 Country Code": "CW",
            Country: "Curaçao",
            Latitude: "12.25",
            Longitude: "-68.75"
        }, {
            "ISO 3166 Country Code": "CX",
            Country: "Christmas Island",
            Latitude: "-10.5",
            Longitude: "105.67"
        }, {
            "ISO 3166 Country Code": "CY",
            Country: "Cyprus",
            Latitude: "35",
            Longitude: "33"
        }, {
            "ISO 3166 Country Code": "CZ",
            Country: "Czech Republic",
            Latitude: "49.75",
            Longitude: "15.5"
        }, {
            "ISO 3166 Country Code": "DE",
            Country: "Germany",
            Latitude: "51",
            Longitude: "9"
        }, {
            "ISO 3166 Country Code": "DJ",
            Country: "Djibouti",
            Latitude: "11.5",
            Longitude: "43"
        }, {
            "ISO 3166 Country Code": "DK",
            Country: "Denmark",
            Latitude: "56",
            Longitude: "10"
        }, {
            "ISO 3166 Country Code": "DM",
            Country: "Dominica",
            Latitude: "15.42",
            Longitude: "-61.33"
        }, {
            "ISO 3166 Country Code": "DO",
            Country: "Dominican Republic",
            Latitude: "19",
            Longitude: "-70.67"
        }, {
            "ISO 3166 Country Code": "DZ",
            Country: "Algeria",
            Latitude: "28",
            Longitude: "3"
        }, {
            "ISO 3166 Country Code": "EC",
            Country: "Ecuador",
            Latitude: "-2",
            Longitude: "-77.5"
        }, {
            "ISO 3166 Country Code": "EE",
            Country: "Estonia",
            Latitude: "59",
            Longitude: "26"
        }, {
            "ISO 3166 Country Code": "EG",
            Country: "Egypt",
            Latitude: "27",
            Longitude: "30"
        }, {
            "ISO 3166 Country Code": "EH",
            Country: "Western Sahara",
            Latitude: "24.5",
            Longitude: "-13"
        }, {
            "ISO 3166 Country Code": "ER",
            Country: "Eritrea",
            Latitude: "15",
            Longitude: "39"
        }, {
            "ISO 3166 Country Code": "",
            Country: "Eswatini",
            Latitude: "-26",
            Longitude: "31"
        }, {
            "ISO 3166 Country Code": "ES",
            Country: "Spain",
            Latitude: "40",
            Longitude: "-4"
        }, {
            "ISO 3166 Country Code": "ET",
            Country: "Ethiopia",
            Latitude: "8",
            Longitude: "38"
        }, {
            "ISO 3166 Country Code": "FI",
            Country: "Finland",
            Latitude: "64",
            Longitude: "26"
        }, {
            "ISO 3166 Country Code": "FJ",
            Country: "Fiji",
            Latitude: "-18",
            Longitude: "175"
        }, {
            "ISO 3166 Country Code": "FK",
            Country: "Falkland Islands (Malvinas)",
            Latitude: "-51.75",
            Longitude: "-59"
        }, {
            "ISO 3166 Country Code": "FM",
            Country: "Micronesia",
            Latitude: "6.92",
            Longitude: "158.25"
        }, {
            "ISO 3166 Country Code": "FO",
            Country: "Faroe Islands",
            Latitude: "62",
            Longitude: "-7"
        }, {
            "ISO 3166 Country Code": "FR",
            Country: "France",
            Latitude: "46",
            Longitude: "2"
        }, {
            "ISO 3166 Country Code": "GA",
            Country: "Gabon",
            Latitude: "-1",
            Longitude: "11.75"
        }, {
            "ISO 3166 Country Code": "GB",
            Country: "United Kingdom",
            Latitude: "54",
            Longitude: "-2"
        }, {
            "ISO 3166 Country Code": "GD",
            Country: "Grenada",
            Latitude: "12.12",
            Longitude: "-61.67"
        }, {
            "ISO 3166 Country Code": "GE",
            Country: "Georgia",
            Latitude: "42",
            Longitude: "43.5"
        }, {
            "ISO 3166 Country Code": "GF",
            Country: "French Guiana",
            Latitude: "4",
            Longitude: "-53"
        }, {
            "ISO 3166 Country Code": "GG",
            Country: "Guernsey",
            Latitude: "49.45",
            Longitude: "-2.533333"
        }, {
            "ISO 3166 Country Code": "GH",
            Country: "Ghana",
            Latitude: "8",
            Longitude: "-2"
        }, {
            "ISO 3166 Country Code": "GI",
            Country: "Gibraltar",
            Latitude: "36.18",
            Longitude: "-5.37"
        }, {
            "ISO 3166 Country Code": "GL",
            Country: "Greenland",
            Latitude: "72",
            Longitude: "-40"
        }, {
            "ISO 3166 Country Code": "GM",
            Country: "Gambia. The",
            Latitude: "13.47",
            Longitude: "-16.57"
        }, {
            "ISO 3166 Country Code": "GN",
            Country: "Guinea",
            Latitude: "11",
            Longitude: "-10"
        }, {
            "ISO 3166 Country Code": "GP",
            Country: "Guadeloupe",
            Latitude: "16.25",
            Longitude: "-61.58"
        }, {
            "ISO 3166 Country Code": "GQ",
            Country: "Equatorial Guinea",
            Latitude: "2",
            Longitude: "10"
        }, {
            "ISO 3166 Country Code": "GR",
            Country: "Greece",
            Latitude: "39",
            Longitude: "22"
        }, {
            "ISO 3166 Country Code": "GS",
            Country: "South Georgia and the South Sandwich Islands",
            Latitude: "-54.5",
            Longitude: "-37"
        }, {
            "ISO 3166 Country Code": "GT",
            Country: "Guatemala",
            Latitude: "15.5",
            Longitude: "-90.25"
        }, {
            "ISO 3166 Country Code": "GU",
            Country: "Guam",
            Latitude: "13.47",
            Longitude: "144.78"
        }, {
            "ISO 3166 Country Code": "GW",
            Country: "Guinea-Bissau",
            Latitude: "12",
            Longitude: "-15"
        }, {
            "ISO 3166 Country Code": "GY",
            Country: "Guyana",
            Latitude: "5",
            Longitude: "-59"
        }, {
            "ISO 3166 Country Code": "HK",
            Country: "Hong Kong",
            Latitude: "22.25",
            Longitude: "114.17"
        }, {
            "ISO 3166 Country Code": "HM",
            Country: "Heard Island and McDonald Islands",
            Latitude: "-53.1",
            Longitude: "72.52"
        }, {
            "ISO 3166 Country Code": "HN",
            Country: "Honduras",
            Latitude: "15",
            Longitude: "-86.5"
        }, {
            "ISO 3166 Country Code": "HR",
            Country: "Croatia",
            Latitude: "45.17",
            Longitude: "15.5"
        }, {
            "ISO 3166 Country Code": "HT",
            Country: "Haiti",
            Latitude: "19",
            Longitude: "-72.42"
        }, {
            "ISO 3166 Country Code": "HU",
            Country: "Hungary",
            Latitude: "47",
            Longitude: "20"
        }, {
            "ISO 3166 Country Code": "ID",
            Country: "Indonesia",
            Latitude: "-5",
            Longitude: "120"
        }, {
            "ISO 3166 Country Code": "IE",
            Country: "Ireland",
            Latitude: "53",
            Longitude: "-8"
        }, {
            "ISO 3166 Country Code": "IL",
            Country: "Israel",
            Latitude: "31.5",
            Longitude: "34.75"
        }, {
            "ISO 3166 Country Code": "IM",
            Country: "Isle of Man",
            Latitude: "54.14521",
            Longitude: "-4.48172"
        }, {
            "ISO 3166 Country Code": "IN",
            Country: "India",
            Latitude: "20",
            Longitude: "77"
        }, {
            "ISO 3166 Country Code": "IO",
            Country: "British Indian Ocean Territory",
            Latitude: "-6",
            Longitude: "71.5"
        }, {
            "ISO 3166 Country Code": "IQ",
            Country: "Iraq",
            Latitude: "33",
            Longitude: "44"
        }, {
            "ISO 3166 Country Code": "IR",
            Country: "Iran",
            Latitude: "32",
            Longitude: "53"
        }, {
            "ISO 3166 Country Code": "IS",
            Country: "Iceland",
            Latitude: "65",
            Longitude: "-18"
        }, {
            "ISO 3166 Country Code": "IT",
            Country: "Italy",
            Latitude: "42.83",
            Longitude: "12.83"
        }, {
            "ISO 3166 Country Code": "JE",
            Country: "Jersey",
            Latitude: "49.190017",
            Longitude: "-2.11"
        }, {
            "ISO 3166 Country Code": "JM",
            Country: "Jamaica",
            Latitude: "18.25",
            Longitude: "-77.5"
        }, {
            "ISO 3166 Country Code": "JO",
            Country: "Jordan",
            Latitude: "31",
            Longitude: "36"
        }, {
            "ISO 3166 Country Code": "JP",
            Country: "Japan",
            Latitude: "36",
            Longitude: "138"
        }, {
            "ISO 3166 Country Code": "KE",
            Country: "Kenya",
            Latitude: "1",
            Longitude: "38"
        }, {
            "ISO 3166 Country Code": "",
            Country: "Kosovo",
            Latitude: "42",
            Longitude: "21"
        }, {
            "ISO 3166 Country Code": "KG",
            Country: "Kyrgyzstan",
            Latitude: "41",
            Longitude: "75"
        }, {
            "ISO 3166 Country Code": "KH",
            Country: "Cambodia",
            Latitude: "13",
            Longitude: "105"
        }, {
            "ISO 3166 Country Code": "KI",
            Country: "Kiribati",
            Latitude: "1.42",
            Longitude: "173"
        }, {
            "ISO 3166 Country Code": "KM",
            Country: "Comoros",
            Latitude: "-12.17",
            Longitude: "44.25"
        }, {
            "ISO 3166 Country Code": "KN",
            Country: "Saint Kitts and Nevis",
            Latitude: "17.33",
            Longitude: "-62.75"
        }, {
            "ISO 3166 Country Code": "KP",
            Country: "Korea (Dem. Peoples Rep.)",
            Latitude: "40",
            Longitude: "127"
        }, {
            "ISO 3166 Country Code": "KR",
            Country: "Korea (Rep.)",
            Latitude: "37",
            Longitude: "127.5"
        }, {
            "ISO 3166 Country Code": "KW",
            Country: "Kuwait",
            Latitude: "29.34",
            Longitude: "47.66"
        }, {
            "ISO 3166 Country Code": "KY",
            Country: "Cayman Islands",
            Latitude: "19.5",
            Longitude: "-80.5"
        }, {
            "ISO 3166 Country Code": "KZ",
            Country: "Kazakhstan",
            Latitude: "48",
            Longitude: "68"
        }, {
            "ISO 3166 Country Code": "LA",
            Country: "Laos",
            Latitude: "18",
            Longitude: "105"
        }, {
            "ISO 3166 Country Code": "LB",
            Country: "Lebanon",
            Latitude: "33.83",
            Longitude: "35.83"
        }, {
            "ISO 3166 Country Code": "LC",
            Country: "Saint Lucia",
            Latitude: "13.88",
            Longitude: "-61.13"
        }, {
            "ISO 3166 Country Code": "LI",
            Country: "Liechtenstein",
            Latitude: "47.17",
            Longitude: "9.53"
        }, {
            "ISO 3166 Country Code": "LK",
            Country: "Sri Lanka",
            Latitude: "7",
            Longitude: "81"
        }, {
            "ISO 3166 Country Code": "LR",
            Country: "Liberia",
            Latitude: "6.5",
            Longitude: "-9.5"
        }, {
            "ISO 3166 Country Code": "LS",
            Country: "Lesotho",
            Latitude: "-29.5",
            Longitude: "28.5"
        }, {
            "ISO 3166 Country Code": "LT",
            Country: "Lithuania",
            Latitude: "56",
            Longitude: "24"
        }, {
            "ISO 3166 Country Code": "LU",
            Country: "Luxembourg",
            Latitude: "49.75",
            Longitude: "6.17"
        }, {
            "ISO 3166 Country Code": "LV",
            Country: "Latvia",
            Latitude: "57",
            Longitude: "25"
        }, {
            "ISO 3166 Country Code": "LY",
            Country: "Libya",
            Latitude: "25",
            Longitude: "17"
        }, {
            "ISO 3166 Country Code": "MA",
            Country: "Morocco",
            Latitude: "32",
            Longitude: "-5"
        }, {
            "ISO 3166 Country Code": "MC",
            Country: "Monaco",
            Latitude: "43.73",
            Longitude: "7.4"
        }, {
            "ISO 3166 Country Code": "MD",
            Country: "Moldova",
            Latitude: "47",
            Longitude: "29"
        }, {
            "ISO 3166 Country Code": "ME",
            Country: "Montenegro",
            Latitude: "42",
            Longitude: "19"
        }, {
            "ISO 3166 Country Code": "MF",
            Country: "Saint Martin",
            Latitude: "18.066667",
            Longitude: "-63.05"
        }, {
            "ISO 3166 Country Code": "MG",
            Country: "Madagascar",
            Latitude: "-20",
            Longitude: "47"
        }, {
            "ISO 3166 Country Code": "MH",
            Country: "Marshall Islands",
            Latitude: "9",
            Longitude: "168"
        }, {
            "ISO 3166 Country Code": "MK",
            Country: "Macedonia",
            Latitude: "41.83",
            Longitude: "22"
        }, {
            "ISO 3166 Country Code": "ML",
            Country: "Mali",
            Latitude: "17",
            Longitude: "-4"
        }, {
            "ISO 3166 Country Code": "MM",
            Country: "Myanmar",
            Latitude: "22",
            Longitude: "98"
        }, {
            "ISO 3166 Country Code": "MN",
            Country: "Mongolia",
            Latitude: "46",
            Longitude: "105"
        }, {
            "ISO 3166 Country Code": "MO",
            Country: "Macao",
            Latitude: "22.17",
            Longitude: "113.55"
        }, {
            "ISO 3166 Country Code": "MP",
            Country: "Northern Mariana Islands",
            Latitude: "15.2",
            Longitude: "145.75"
        }, {
            "ISO 3166 Country Code": "MQ",
            Country: "Martinique",
            Latitude: "14.67",
            Longitude: "-61"
        }, {
            "ISO 3166 Country Code": "MR",
            Country: "Mauritania",
            Latitude: "20",
            Longitude: "-12"
        }, {
            "ISO 3166 Country Code": "MS",
            Country: "Montserrat",
            Latitude: "16.75",
            Longitude: "-62.2"
        }, {
            "ISO 3166 Country Code": "MT",
            Country: "Malta",
            Latitude: "35.83",
            Longitude: "14.58"
        }, {
            "ISO 3166 Country Code": "MU",
            Country: "Mauritius",
            Latitude: "-20.28",
            Longitude: "57.55"
        }, {
            "ISO 3166 Country Code": "MV",
            Country: "Maldives",
            Latitude: "3.25",
            Longitude: "73"
        }, {
            "ISO 3166 Country Code": "MW",
            Country: "Malawi",
            Latitude: "-13.5",
            Longitude: "34"
        }, {
            "ISO 3166 Country Code": "MX",
            Country: "Mexico",
            Latitude: "23",
            Longitude: "-102"
        }, {
            "ISO 3166 Country Code": "MY",
            Country: "Malaysia",
            Latitude: "2.5",
            Longitude: "112.5"
        }, {
            "ISO 3166 Country Code": "MZ",
            Country: "Mozambique",
            Latitude: "-18.25",
            Longitude: "35"
        }, {
            "ISO 3166 Country Code": "NA",
            Country: "Namibia",
            Latitude: "-22",
            Longitude: "17"
        }, {
            "ISO 3166 Country Code": "NC",
            Country: "New Caledonia",
            Latitude: "-21.5",
            Longitude: "165.5"
        }, {
            "ISO 3166 Country Code": "NE",
            Country: "Niger",
            Latitude: "16",
            Longitude: "8"
        }, {
            "ISO 3166 Country Code": "NF",
            Country: "Norfolk Island",
            Latitude: "-29.03",
            Longitude: "167.95"
        }, {
            "ISO 3166 Country Code": "NG",
            Country: "Nigeria",
            Latitude: "10",
            Longitude: "8"
        }, {
            "ISO 3166 Country Code": "NI",
            Country: "Nicaragua",
            Latitude: "13",
            Longitude: "-85"
        }, {
            "ISO 3166 Country Code": "NL",
            Country: "Netherlands",
            Latitude: "52.5",
            Longitude: "5.75"
        }, {
            "ISO 3166 Country Code": "NO",
            Country: "Norway",
            Latitude: "62",
            Longitude: "10"
        }, {
            "ISO 3166 Country Code": "NP",
            Country: "Nepal",
            Latitude: "28",
            Longitude: "84"
        }, {
            "ISO 3166 Country Code": "NR",
            Country: "Nauru",
            Latitude: "-0.53",
            Longitude: "166.92"
        }, {
            "ISO 3166 Country Code": "NU",
            Country: "Niue",
            Latitude: "-19.03",
            Longitude: "-169.87"
        }, {
            "ISO 3166 Country Code": "NZ",
            Country: "New Zealand",
            Latitude: "-41",
            Longitude: "174"
        }, {
            "ISO 3166 Country Code": "OM",
            Country: "Oman",
            Latitude: "21",
            Longitude: "57"
        }, {
            "ISO 3166 Country Code": "PA",
            Country: "Panama",
            Latitude: "9",
            Longitude: "-80"
        }, {
            "ISO 3166 Country Code": "PE",
            Country: "Peru",
            Latitude: "-10",
            Longitude: "-76"
        }, {
            "ISO 3166 Country Code": "PF",
            Country: "French Polynesia",
            Latitude: "-15",
            Longitude: "-140"
        }, {
            "ISO 3166 Country Code": "PG",
            Country: "Papua New Guinea",
            Latitude: "-6",
            Longitude: "147"
        }, {
            "ISO 3166 Country Code": "PH",
            Country: "Philippines",
            Latitude: "13",
            Longitude: "122"
        }, {
            "ISO 3166 Country Code": "PK",
            Country: "Pakistan",
            Latitude: "30",
            Longitude: "70"
        }, {
            "ISO 3166 Country Code": "PL",
            Country: "Poland",
            Latitude: "52",
            Longitude: "20"
        }, {
            "ISO 3166 Country Code": "PM",
            Country: "Saint Pierre and Miquelon",
            Latitude: "46.83",
            Longitude: "-56.33"
        }, {
            "ISO 3166 Country Code": "PN",
            Country: "Pitcairn",
            Latitude: "-25.066667",
            Longitude: "-130.1"
        }, {
            "ISO 3166 Country Code": "PR",
            Country: "Puerto Rico",
            Latitude: "18.25",
            Longitude: "-66.5"
        }, {
            "ISO 3166 Country Code": "PS",
            Country: "Palestinian Territory",
            Latitude: "32",
            Longitude: "35.25"
        }, {
            "ISO 3166 Country Code": "PT",
            Country: "Portugal",
            Latitude: "39.5",
            Longitude: "-8"
        }, {
            "ISO 3166 Country Code": "PW",
            Country: "Palau",
            Latitude: "7.5",
            Longitude: "134.5"
        }, {
            "ISO 3166 Country Code": "PY",
            Country: "Paraguay",
            Latitude: "-23",
            Longitude: "-58"
        }, {
            "ISO 3166 Country Code": "QA",
            Country: "Qatar",
            Latitude: "25.5",
            Longitude: "51.25"
        }, {
            "ISO 3166 Country Code": "RE",
            Country: "Reunion",
            Latitude: "-21.1",
            Longitude: "55.6"
        }, {
            "ISO 3166 Country Code": "RO",
            Country: "Romania",
            Latitude: "46",
            Longitude: "25"
        }, {
            "ISO 3166 Country Code": "RS",
            Country: "Serbia",
            Latitude: "44",
            Longitude: "21"
        }, {
            "ISO 3166 Country Code": "RU",
            Country: "Russia",
            Latitude: "60",
            Longitude: "100"
        }, {
            "ISO 3166 Country Code": "RW",
            Country: "Rwanda",
            Latitude: "-2",
            Longitude: "30"
        }, {
            "ISO 3166 Country Code": "SA",
            Country: "Saudi Arabia",
            Latitude: "25",
            Longitude: "45"
        }, {
            "ISO 3166 Country Code": "SB",
            Country: "Solomon Islands",
            Latitude: "-8",
            Longitude: "159"
        }, {
            "ISO 3166 Country Code": "SC",
            Country: "Seychelles",
            Latitude: "-4.58",
            Longitude: "55.67"
        }, {
            "ISO 3166 Country Code": "SD",
            Country: "Sudan",
            Latitude: "15",
            Longitude: "30"
        }, {
            "ISO 3166 Country Code": "SE",
            Country: "Sweden",
            Latitude: "62",
            Longitude: "15"
        }, {
            "ISO 3166 Country Code": "SG",
            Country: "Singapore",
            Latitude: "1.37",
            Longitude: "103.8"
        }, {
            "ISO 3166 Country Code": "SH",
            Country: "Saint Helena",
            Latitude: "-15.93",
            Longitude: "-5.7"
        }, {
            "ISO 3166 Country Code": "SI",
            Country: "Slovenia",
            Latitude: "46",
            Longitude: "15"
        }, {
            "ISO 3166 Country Code": "SJ",
            Country: "Svalbard and Jan Mayen",
            Latitude: "78",
            Longitude: "20"
        }, {
            "ISO 3166 Country Code": "SK",
            Country: "Slovakia",
            Latitude: "48.67",
            Longitude: "19.5"
        }, {
            "ISO 3166 Country Code": "SL",
            Country: "Sierra Leone",
            Latitude: "8.5",
            Longitude: "-11.5"
        }, {
            "ISO 3166 Country Code": "SM",
            Country: "San Marino",
            Latitude: "43.77",
            Longitude: "12.42"
        }, {
            "ISO 3166 Country Code": "SN",
            Country: "Senegal",
            Latitude: "14",
            Longitude: "-14"
        }, {
            "ISO 3166 Country Code": "SO",
            Country: "Somalia",
            Latitude: "10",
            Longitude: "49"
        }, {
            "ISO 3166 Country Code": "SR",
            Country: "Suriname",
            Latitude: "4",
            Longitude: "-56"
        }, {
            "ISO 3166 Country Code": "ST",
            Country: "Sao Tome and Principe",
            Latitude: "1",
            Longitude: "7"
        }, {
            "ISO 3166 Country Code": "SS",
            Country: "South Sudan",
            Latitude: "7.95",
            Longitude: "29.775"
        }, {
            "ISO 3166 Country Code": "SV",
            Country: "El Salvador",
            Latitude: "13.83",
            Longitude: "-88.92"
        }, {
            "ISO 3166 Country Code": "SX",
            Country: "Dutch Sint Maarten",
            Latitude: "12.25",
            Longitude: "-68.75"
        }, {
            "ISO 3166 Country Code": "SY",
            Country: "Syria",
            Latitude: "35",
            Longitude: "38"
        }, {
            "ISO 3166 Country Code": "SZ",
            Country: "Swaziland",
            Latitude: "-26.5",
            Longitude: "31.5"
        }, {
            "ISO 3166 Country Code": "TC",
            Country: "Turks and Caicos Islands",
            Latitude: "21.75",
            Longitude: "-71.58"
        }, {
            "ISO 3166 Country Code": "TD",
            Country: "Chad",
            Latitude: "15",
            Longitude: "19"
        }, {
            "ISO 3166 Country Code": "TF",
            Country: "French Southern Territories",
            Latitude: "-43",
            Longitude: "67"
        }, {
            "ISO 3166 Country Code": "TG",
            Country: "Togo",
            Latitude: "8",
            Longitude: "1.17"
        }, {
            "ISO 3166 Country Code": "TH",
            Country: "Thailand",
            Latitude: "15",
            Longitude: "100"
        }, {
            "ISO 3166 Country Code": "TJ",
            Country: "Tajikistan",
            Latitude: "39",
            Longitude: "71"
        }, {
            "ISO 3166 Country Code": "TK",
            Country: "Tokelau",
            Latitude: "-9",
            Longitude: "-172"
        }, {
            "ISO 3166 Country Code": "TL",
            Country: "Timor-Leste",
            Latitude: "-8.566667",
            Longitude: "125.566667"
        }, {
            "ISO 3166 Country Code": "TM",
            Country: "Turkmenistan",
            Latitude: "40",
            Longitude: "60"
        }, {
            "ISO 3166 Country Code": "TN",
            Country: "Tunisia",
            Latitude: "34",
            Longitude: "9"
        }, {
            "ISO 3166 Country Code": "TO",
            Country: "Tonga",
            Latitude: "-20",
            Longitude: "-175"
        }, {
            "ISO 3166 Country Code": "TR",
            Country: "Turkey",
            Latitude: "39",
            Longitude: "35"
        }, {
            "ISO 3166 Country Code": "TT",
            Country: "Trinidad and Tobago",
            Latitude: "11",
            Longitude: "-61"
        }, {
            "ISO 3166 Country Code": "TV",
            Country: "Tuvalu",
            Latitude: "-8",
            Longitude: "178"
        }, {
            "ISO 3166 Country Code": "TW",
            Country: "Taiwan",
            Latitude: "23.5",
            Longitude: "121"
        }, {
            "ISO 3166 Country Code": "TZ",
            Country: "Tanzania",
            Latitude: "-6",
            Longitude: "35"
        }, {
            "ISO 3166 Country Code": "UA",
            Country: "Ukraine",
            Latitude: "49",
            Longitude: "32"
        }, {
            "ISO 3166 Country Code": "UG",
            Country: "Uganda",
            Latitude: "1",
            Longitude: "32"
        }, {
            "ISO 3166 Country Code": "UM",
            Country: "United States Minor Outlying Islands",
            Latitude: "19.28",
            Longitude: "166.6"
        }, {
            "ISO 3166 Country Code": "US",
            Country: "United States",
            Latitude: "38",
            Longitude: "-97"
        }, {
            "ISO 3166 Country Code": "UY",
            Country: "Uruguay",
            Latitude: "-33",
            Longitude: "-56"
        }, {
            "ISO 3166 Country Code": "UZ",
            Country: "Uzbekistan",
            Latitude: "41",
            Longitude: "64"
        }, {
            "ISO 3166 Country Code": "VA",
            Country: "Holy See (Vatican City State)",
            Latitude: "41.9",
            Longitude: "12.45"
        }, {
            "ISO 3166 Country Code": "VC",
            Country: "Saint Vincent and the Grenadines",
            Latitude: "13.25",
            Longitude: "-61.2"
        }, {
            "ISO 3166 Country Code": "VE",
            Country: "Venezuela",
            Latitude: "8",
            Longitude: "-66"
        }, {
            "ISO 3166 Country Code": "VG",
            Country: "Virgin Islands, British",
            Latitude: "18.5",
            Longitude: "-64.5"
        }, {
            "ISO 3166 Country Code": "VI",
            Country: "Virgin Islands, U.S.",
            Latitude: "18.33",
            Longitude: "-64.83"
        }, {
            "ISO 3166 Country Code": "VN",
            Country: "Vietnam",
            Latitude: "16",
            Longitude: "106"
        }, {
            "ISO 3166 Country Code": "VU",
            Country: "Vanuatu",
            Latitude: "-16",
            Longitude: "167"
        }, {
            "ISO 3166 Country Code": "WF",
            Country: "Wallis and Futuna",
            Latitude: "-13.3",
            Longitude: "-176.2"
        }, {
            "ISO 3166 Country Code": "WS",
            Country: "Samoa",
            Latitude: "-13.58",
            Longitude: "-172.33"
        }, {
            "ISO 3166 Country Code": "YE",
            Country: "Yemen",
            Latitude: "15",
            Longitude: "48"
        }, {
            "ISO 3166 Country Code": "YT",
            Country: "Mayotte",
            Latitude: "-12.83",
            Longitude: "45.17"
        }, {
            "ISO 3166 Country Code": "ZA",
            Country: "South Africa",
            Latitude: "-29",
            Longitude: "24"
        }, {
            "ISO 3166 Country Code": "ZM",
            Country: "Zambia",
            Latitude: "-15",
            Longitude: "30"
        }, {
            "ISO 3166 Country Code": "ZW",
            Country: "Zimbabwe",
            Latitude: "-20",
            Longitude: "30"
        }],
        Cf = ["#FD8A6D", "#F9B888", "#F6E6B1", "#C9ECC6", "#90D6D8", "#72C1FC", "#c7b6eb"],
        Sf = ["#cefda9", "#c0f0b8", "#afe2c7", "#9dd5d5", "#87c8e2", "#6cbbef", "#41affc"],
        If = {
            Africa: Cf[0],
            Asia: Cf[1],
            Europe: Cf[2],
            "Middle East": Cf[3],
            Oceania: Cf[4],
            "North America": Cf[5],
            "South America": Cf[6]
        },
        Mf = "#9B9BA5",
        kf = "#5b6370",
        Af = "#22252A",
        _f = "#393e46",
        Of = "#CFD0D6",
        Lf = "rgba(28, 30, 34, 0.725)",
        Ef = Sf[4],
        Nf = Sf[6],
        jf = Sf[1];

    function Tf(e) {
        return If[af[e.indicator]]
    }

    function $f(n) {
        var e = aa(Gf, function (e) {
            return n.indicator === e.Country
        });
        return e || console.log(n.indicator), e ? [+e.Longitude, +e.Latitude] : [0, 0]
    }

    function zf(e) {
        if (Array.isArray(e)) {
            for (var n = 0, t = Array(e.length); n < e.length; n++) t[n] = e[n];
            return t
        }
        return Array.from(e)
    }
    var Bf = function (e) {
        return function e(r) {
            var o = lc(),
                a = [],
                i = fc;

            function l(e) {
                var n = e + "",
                    t = o.get(n);
                if (!t) {
                    if (i !== fc) return i;
                    o.set(n, t = a.push(e))
                }
                return r[(t - 1) % r.length]
            }
            return r = null == r ? [] : dc.call(r), l.domain = function (e) {
                if (!arguments.length) return a.slice();
                a = [], o = lc();
                for (var n, t, r = -1, i = e.length; ++r < i;) o.has(t = (n = e[r]) + "") || o.set(t, a.push(n));
                return l
            }, l.range = function (e) {
                return arguments.length ? (r = dc.call(e), l) : r.slice()
            }, l.unknown = function (e) {
                return arguments.length ? (i = e, l) : i
            }, l.copy = function () {
                return e().domain(a).range(r).unknown(i)
            }, l
        }().domain([].concat(zf(tf), ["no data"])).range([].concat(zf(e), ["#cccccc"]))
    };
    $c().domain([1, 50]).range([1, 10]).clamp(!0), Bc().exponent(.5).range([2, 15]);

    function qf(e, n) {
        var t = n.indexOf(e);
        return -1 !== Pf.indexOf(t) ? function (e) {
            return 1e9 <= e ? parseFloat((e / 1e9).toFixed(1)) + "B" : 1e6 <= e ? (e / 1e6).toFixed(0) + "M" : 1e3 <= e ? parseFloat((e / 1e3).toFixed(1e4 < e ? 0 : 1)) + "K" : "" + e.toFixed(0)
        } : -1 !== xf.indexOf(t) ? function (e) {
            return e.toFixed(1)
        } : -1 !== bf.indexOf(t) ? function (e) {
            return e.toFixed(2)
        } : -1 !== wf.indexOf(t) ? function (e) {
            return parseFloat(e.toFixed(0)) + "%"
        } : function (e) {
            return parseFloat(e.toFixed(1)) + "%"
        }
    }
    var Ff = {
        animationIterationCount: 1,
        borderImageOutset: 1,
        borderImageSlice: 1,
        borderImageWidth: 1,
        boxFlex: 1,
        boxFlexGroup: 1,
        boxOrdinalGroup: 1,
        columnCount: 1,
        columns: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        flexOrder: 1,
        gridRow: 1,
        gridRowEnd: 1,
        gridRowSpan: 1,
        gridRowStart: 1,
        gridColumn: 1,
        gridColumnEnd: 1,
        gridColumnSpan: 1,
        gridColumnStart: 1,
        fontWeight: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        tabSize: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1,
        WebkitLineClamp: 1,
        fillOpacity: 1,
        floodOpacity: 1,
        stopOpacity: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1,
        strokeMiterlimit: 1,
        strokeOpacity: 1,
        strokeWidth: 1
    };

    function Rf(e) {
        function M(e, n, t) {
            var r = n.trim().split(p),
                i = (n = r).length,
                o = e.length;
            switch (o) {
            case 0:
            case 1:
                var a = 0;
                for (e = 0 === o ? "" : e[0] + " "; a < i; ++a) n[a] = s(e, n[a], t).trim();
                break;
            default:
                var l = a = 0;
                for (n = []; a < i; ++a)
                    for (var c = 0; c < o; ++c) n[l++] = s(e[c] + " ", r[a], t).trim()
            }
            return n
        }

        function s(e, n, t) {
            var r = n.charCodeAt(0);
            switch (r < 33 && (r = (n = n.trim()).charCodeAt(0)), r) {
            case 38:
                return n.replace(i, "$1" + e.trim());
            case 58:
                return e.trim() + n.replace(i, "$1" + e.trim());
            default:
                if (0 < 1 * t && 0 < n.indexOf("\f")) return n.replace(i, (58 === e.charCodeAt(0) ? "" : "$1") + e.trim())
            }
            return e + n
        }

        function k(e, n, t, r) {
            var i = e + ";",
                o = 2 * n + 3 * t + 4 * r;
            if (944 === o) {
                e = i.indexOf(":", 9) + 1;
                var a = i.substring(e, i.length - 1).trim();
                return a = i.substring(0, e).trim() + a + ";", 1 === F || 2 === F && A(a, 1) ? "-webkit-" + a + a : a
            }
            if (0 === F || 2 === F && !A(i, 1)) return i;
            switch (o) {
            case 1015:
                return 97 === i.charCodeAt(10) ? "-webkit-" + i + i : i;
            case 951:
                return 116 === i.charCodeAt(3) ? "-webkit-" + i + i : i;
            case 963:
                return 110 === i.charCodeAt(5) ? "-webkit-" + i + i : i;
            case 1009:
                if (100 !== i.charCodeAt(4)) break;
            case 969:
            case 942:
                return "-webkit-" + i + i;
            case 978:
                return "-webkit-" + i + "-moz-" + i + i;
            case 1019:
            case 983:
                return "-webkit-" + i + "-moz-" + i + "-ms-" + i + i;
            case 883:
                if (45 === i.charCodeAt(8)) return "-webkit-" + i + i;
                if (0 < i.indexOf("image-set(", 11)) return i.replace(m, "$1-webkit-$2") + i;
                break;
            case 932:
                if (45 === i.charCodeAt(4)) switch (i.charCodeAt(5)) {
                case 103:
                    return "-webkit-box-" + i.replace("-grow", "") + "-webkit-" + i + "-ms-" + i.replace("grow", "positive") + i;
                case 115:
                    return "-webkit-" + i + "-ms-" + i.replace("shrink", "negative") + i;
                case 98:
                    return "-webkit-" + i + "-ms-" + i.replace("basis", "preferred-size") + i
                }
                return "-webkit-" + i + "-ms-" + i + i;
            case 964:
                return "-webkit-" + i + "-ms-flex-" + i + i;
            case 1023:
                if (99 !== i.charCodeAt(8)) break;
                return "-webkit-box-pack" + (a = i.substring(i.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify")) + "-webkit-" + i + "-ms-flex-pack" + a + i;
            case 1005:
                return c.test(i) ? i.replace(l, ":-webkit-") + i.replace(l, ":-moz-") + i : i;
            case 1e3:
                switch (n = (a = i.substring(13).trim()).indexOf("-") + 1, a.charCodeAt(0) + a.charCodeAt(n)) {
                case 226:
                    a = i.replace(d, "tb");
                    break;
                case 232:
                    a = i.replace(d, "tb-rl");
                    break;
                case 220:
                    a = i.replace(d, "lr");
                    break;
                default:
                    return i
                }
                return "-webkit-" + i + "-ms-" + a + i;
            case 1017:
                if (-1 === i.indexOf("sticky", 9)) break;
            case 975:
                switch (n = (i = e).length - 10, o = (a = (33 === i.charCodeAt(n) ? i.substring(0, n) : i).substring(e.indexOf(":", 7) + 1).trim()).charCodeAt(0) + (0 | a.charCodeAt(7))) {
                case 203:
                    if (a.charCodeAt(8) < 111) break;
                case 115:
                    i = i.replace(a, "-webkit-" + a) + ";" + i;
                    break;
                case 207:
                case 102:
                    i = i.replace(a, "-webkit-" + (102 < o ? "inline-" : "") + "box") + ";" + i.replace(a, "-webkit-" + a) + ";" + i.replace(a, "-ms-" + a + "box") + ";" + i
                }
                return i + ";";
            case 938:
                if (45 === i.charCodeAt(5)) switch (i.charCodeAt(6)) {
                case 105:
                    return a = i.replace("-items", ""), "-webkit-" + i + "-webkit-box-" + a + "-ms-flex-" + a + i;
                case 115:
                    return "-webkit-" + i + "-ms-flex-item-" + i.replace(h, "") + i;
                default:
                    return "-webkit-" + i + "-ms-flex-line-pack" + i.replace("align-content", "").replace(h, "") + i
                }
                break;
            case 973:
            case 989:
                if (45 !== i.charCodeAt(3) || 122 === i.charCodeAt(4)) break;
            case 931:
            case 953:
                if (!0 === y.test(e)) return 115 === (a = e.substring(e.indexOf(":") + 1)).charCodeAt(0) ? k(e.replace("stretch", "fill-available"), n, t, r).replace(":fill-available", ":stretch") : i.replace(a, "-webkit-" + a) + i.replace(a, "-moz-" + a.replace("fill-", "")) + i;
                break;
            case 962:
                if (i = "-webkit-" + i + (102 === i.charCodeAt(5) ? "-ms-" + i : "") + i, 211 === t + r && 105 === i.charCodeAt(13) && 0 < i.indexOf("transform", 10)) return i.substring(0, i.indexOf(";", 27) + 1).replace(u, "$1-webkit-$2") + i
            }
            return i
        }

        function A(e, n) {
            var t = e.indexOf(1 === n ? ":" : "{"),
                r = e.substring(0, 3 !== n ? t : 10);
            return t = e.substring(t + 1, e.length - 1), a(2 !== n ? r : r.replace(o, "$1"), t, n)
        }

        function _(e, n) {
            var t = k(n, n.charCodeAt(0), n.charCodeAt(1), n.charCodeAt(2));
            return t !== n + ";" ? t.replace(r, " or ($1)").substring(4) : "(" + n + ")"
        }

        function O(e, n, t, r, i, o, a, l, c, s) {
            for (var u, p = 0, d = n; p < U; ++p) switch (u = g[p].call(f, e, d, t, r, i, o, a, l, c, s)) {
            case void 0:
            case !1:
            case !0:
            case null:
                break;
            default:
                d = u
            }
            if (d !== n) return d
        }

        function n(e) {
            return void 0 !== (e = e.prefix) && (a = null, e ? "function" != typeof e ? F = 1 : (F = 2, a = e) : F = 0), n
        }

        function f(e, n) {
            var t = e;
            if (t.charCodeAt(0) < 33 && (t = t.trim()), t = [t], 0 < U) {
                var r = O(-1, n, t, t, B, z, 0, 0, 0, 0);
                void 0 !== r && "string" == typeof r && (n = r)
            }
            var i = function e(n, t, r, i, o) {
                for (var a, l, c, s, u, p = 0, d = 0, f = 0, h = 0, y = 0, m = 0, g = c = a = 0, v = 0, P = 0, x = 0, b = 0, w = r.length, D = w - 1, G = "", C = "", S = "", I = ""; v < w;) {
                    if (l = r.charCodeAt(v), v === D && 0 !== d + h + f + p && (0 !== d && (l = 47 === d ? 10 : 47), h = f = p = 0, w++, D++), 0 === d + h + f + p) {
                        if (v === D && (0 < P && (G = G.replace(E, "")), 0 < G.trim().length)) {
                            switch (l) {
                            case 32:
                            case 9:
                            case 59:
                            case 13:
                            case 10:
                                break;
                            default:
                                G += r.charAt(v)
                            }
                            l = 59
                        }
                        switch (l) {
                        case 123:
                            for (a = (G = G.trim()).charCodeAt(0), c = 1, b = ++v; v < w;) {
                                switch (l = r.charCodeAt(v)) {
                                case 123:
                                    c++;
                                    break;
                                case 125:
                                    c--;
                                    break;
                                case 47:
                                    switch (l = r.charCodeAt(v + 1)) {
                                    case 42:
                                    case 47:
                                        e: {
                                            for (g = v + 1; g < D; ++g) switch (r.charCodeAt(g)) {
                                            case 47:
                                                if (42 !== l || 42 !== r.charCodeAt(g - 1) || v + 2 === g) break;
                                                v = g + 1;
                                                break e;
                                            case 10:
                                                if (47 === l) {
                                                    v = g + 1;
                                                    break e
                                                }
                                            }
                                            v = g
                                        }
                                    }
                                    break;
                                case 91:
                                    l++;
                                case 40:
                                    l++;
                                case 34:
                                case 39:
                                    for (; v++ < D && r.charCodeAt(v) !== l;);
                                }
                                if (0 === c) break;
                                v++
                            }
                            switch (c = r.substring(b, v), 0 === a && (a = (G = G.replace(L, "").trim()).charCodeAt(0)), a) {
                            case 64:
                                switch (0 < P && (G = G.replace(E, "")), l = G.charCodeAt(1)) {
                                case 100:
                                case 109:
                                case 115:
                                case 45:
                                    P = t;
                                    break;
                                default:
                                    P = R
                                }
                                if (b = (c = e(t, P, c, l, o + 1)).length, 0 < U && (u = O(3, c, P = M(R, G, x), t, B, z, b, l, o, i), G = P.join(""), void 0 !== u && 0 === (b = (c = u.trim()).length) && (l = 0, c = "")), 0 < b) switch (l) {
                                case 115:
                                    G = G.replace($, _);
                                case 100:
                                case 109:
                                case 45:
                                    c = G + "{" + c + "}";
                                    break;
                                case 107:
                                    c = (G = G.replace(N, "$1 $2")) + "{" + c + "}", c = 1 === F || 2 === F && A("@" + c, 3) ? "@-webkit-" + c + "@" + c : "@" + c;
                                    break;
                                default:
                                    c = G + c, 112 === i && (C += c, c = "")
                                } else c = "";
                                break;
                            default:
                                c = e(t, M(t, G, x), c, i, o + 1)
                            }
                            S += c, c = x = P = g = a = 0, G = "", l = r.charCodeAt(++v);
                            break;
                        case 125:
                        case 59:
                            if (1 < (b = (G = (0 < P ? G.replace(E, "") : G).trim()).length)) switch (0 === g && (a = G.charCodeAt(0), 45 === a || 96 < a && a < 123) && (b = (G = G.replace(" ", ":")).length), 0 < U && void 0 !== (u = O(1, G, t, n, B, z, C.length, i, o, i)) && 0 === (b = (G = u.trim()).length) && (G = "\0\0"), a = G.charCodeAt(0), l = G.charCodeAt(1), a) {
                            case 0:
                                break;
                            case 64:
                                if (105 === l || 99 === l) {
                                    I += G + r.charAt(v);
                                    break
                                }
                                default:
                                    58 !== G.charCodeAt(b - 1) && (C += k(G, a, l, G.charCodeAt(2)))
                            }
                            x = P = g = a = 0, G = "", l = r.charCodeAt(++v)
                        }
                    }
                    switch (l) {
                    case 13:
                    case 10:
                        47 === d ? d = 0 : 0 === 1 + a && 107 !== i && 0 < G.length && (P = 1, G += "\0"), 0 < U * Y && O(0, G, t, n, B, z, C.length, i, o, i), z = 1, B++;
                        break;
                    case 59:
                    case 125:
                        if (0 === d + h + f + p) {
                            z++;
                            break
                        }
                        default:
                            switch (z++, s = r.charAt(v), l) {
                            case 9:
                            case 32:
                                if (0 === h + p + d) switch (y) {
                                case 44:
                                case 58:
                                case 9:
                                case 32:
                                    s = "";
                                    break;
                                default:
                                    32 !== l && (s = " ")
                                }
                                break;
                            case 0:
                                s = "\\0";
                                break;
                            case 12:
                                s = "\\f";
                                break;
                            case 11:
                                s = "\\v";
                                break;
                            case 38:
                                0 === h + d + p && (P = x = 1, s = "\f" + s);
                                break;
                            case 108:
                                if (0 === h + d + p + q && 0 < g) switch (v - g) {
                                case 2:
                                    112 === y && 58 === r.charCodeAt(v - 3) && (q = y);
                                case 8:
                                    111 === m && (q = m)
                                }
                                break;
                            case 58:
                                0 === h + d + p && (g = v);
                                break;
                            case 44:
                                0 === d + f + h + p && (P = 1, s += "\r");
                                break;
                            case 34:
                            case 39:
                                0 === d && (h = h === l ? 0 : 0 === h ? l : h);
                                break;
                            case 91:
                                0 === h + d + f && p++;
                                break;
                            case 93:
                                0 === h + d + f && p--;
                                break;
                            case 41:
                                0 === h + d + p && f--;
                                break;
                            case 40:
                                if (0 === h + d + p) {
                                    if (0 === a) switch (2 * y + 3 * m) {
                                    case 533:
                                        break;
                                    default:
                                        a = 1
                                    }
                                    f++
                                }
                                break;
                            case 64:
                                0 === d + f + h + p + g + c && (c = 1);
                                break;
                            case 42:
                            case 47:
                                if (!(0 < h + p + f)) switch (d) {
                                case 0:
                                    switch (2 * l + 3 * r.charCodeAt(v + 1)) {
                                    case 235:
                                        d = 47;
                                        break;
                                    case 220:
                                        b = v, d = 42
                                    }
                                    break;
                                case 42:
                                    47 === l && 42 === y && b + 2 !== v && (33 === r.charCodeAt(b + 2) && (C += r.substring(b, v + 1)), s = "", d = 0)
                                }
                            }
                            0 === d && (G += s)
                    }
                    m = y, y = l, v++
                }
                if (0 < (b = C.length)) {
                    if (P = t, 0 < U && void 0 !== (u = O(2, C, P, n, B, z, b, i, o, i)) && 0 === (C = u).length) return I + C + S;
                    if (C = P.join(",") + "{" + C + "}", 0 != F * q) {
                        switch (2 !== F || A(C, 2) || (q = 0), q) {
                        case 111:
                            C = C.replace(T, ":-moz-$1") + C;
                            break;
                        case 112:
                            C = C.replace(j, "::-webkit-input-$1") + C.replace(j, "::-moz-$1") + C.replace(j, ":-ms-input-$1") + C
                        }
                        q = 0
                    }
                }
                return I + C + S
            }(R, t, n, 0, 0);
            return 0 < U && (void 0 !== (r = O(-2, i, t, t, B, z, i.length, 0, 0, 0)) && (i = r)), "", q = 0, z = B = 1, i
        }
        var L = /^\0+/g,
            E = /[\0\r\f]/g,
            l = /: */g,
            c = /zoo|gra/,
            u = /([,: ])(transform)/g,
            p = /,\r+?/g,
            i = /([\t\r\n ])*\f?&/g,
            N = /@(k\w+)\s*(\S*)\s*/,
            j = /::(place)/g,
            T = /:(read-only)/g,
            d = /[svh]\w+-[tblr]{2}/,
            $ = /\(\s*(.*)\s*\)/g,
            r = /([\s\S]*?);/g,
            h = /-self|flex-/g,
            o = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
            y = /stretch|:\s*\w+\-(?:conte|avail)/,
            m = /([^-])(image-set\()/,
            z = 1,
            B = 1,
            q = 0,
            F = 1,
            R = [],
            g = [],
            U = 0,
            a = null,
            Y = 0;
        return f.use = function e(n) {
            switch (n) {
            case void 0:
            case null:
                U = g.length = 0;
                break;
            default:
                switch (n.constructor) {
                case Array:
                    for (var t = 0, r = n.length; t < r; ++t) e(n[t]);
                    break;
                case Function:
                    g[U++] = n;
                    break;
                case Boolean:
                    Y = 0 | !!n
                }
            }
            return e
        }, f.set = n, void 0 !== e && n(e), f
    }
    var Uf, Yf, Hf = Rn(function (e, n) {
            e.exports = function (u) {
                function p(e) {
                    if (e) try {
                        u(e + "}")
                    } catch (e) {}
                }
                return function (e, n, t, r, i, o, a, l, c, s) {
                    switch (e) {
                    case 1:
                        if (0 === c && 64 === n.charCodeAt(0)) return u(n + ";"), "";
                        break;
                    case 2:
                        if (0 === l) return n + "";
                        break;
                    case 3:
                        switch (l) {
                        case 102:
                        case 112:
                            return u(t[0] + n), "";
                        default:
                            return n + (0 === s ? "" : "")
                        }
                        case -2:
                            n.split("}").forEach(p)
                    }
                }
            }
        }),
        Vf = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Wf = /[A-Z]|^ms/g,
        Zf = (Uf = function (e) {
            return e.replace(Wf, "-$&").toLowerCase()
        }, Yf = {}, function (e) {
            return void 0 === Yf[e] && (Yf[e] = Uf(e)), Yf[e]
        }),
        Kf = function (e, n) {
            return null == n || "boolean" == typeof n ? "" : 1 === Ff[e] || 45 === e.charCodeAt(1) || isNaN(n) || 0 === n ? n : n + "px"
        },
        Xf = /(attr|calc|counters?|url)\(/,
        Jf = ["normal", "none", "counter", "open-quote", "close-quote", "no-open-quote", "no-close-quote", "initial", "inherit", "unset"],
        Qf = Kf;
    Kf = function (e, n) {
        return "content" === e && ("string" != typeof n || -1 === Jf.indexOf(n) && !Xf.test(n) && (n.charAt(0) !== n.charAt(n.length - 1) || '"' !== n.charAt(0) && "'" !== n.charAt(0))) && console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + n + "\"'`"), Qf(e, n)
    };
    var eh = "undefined" != typeof document;

    function nh(e) {
        var n = document.createElement("style");
        return n.setAttribute("data-emotion", e.key || ""), void 0 !== e.nonce && n.setAttribute("nonce", e.nonce), n.appendChild(document.createTextNode("")), (void 0 !== e.container ? e.container : document.head).appendChild(n), n
    }
    var th = function () {
        function e(e) {
            this.isSpeedy = !1, this.tags = [], this.ctr = 0, this.opts = e
        }
        var n = e.prototype;
        return n.inject = function () {
            if (this.injected) throw new Error("already injected!");
            this.tags[0] = nh(this.opts), this.injected = !0
        }, n.speedy = function (e) {
            if (0 !== this.ctr) throw new Error("cannot change speedy now");
            this.isSpeedy = !!e
        }, n.insert = function (n, e) {
            if (this.isSpeedy) {
                var t = function (e) {
                    if (e.sheet) return e.sheet;
                    for (var n = 0; n < document.styleSheets.length; n++)
                        if (document.styleSheets[n].ownerNode === e) return document.styleSheets[n]
                }(this.tags[this.tags.length - 1]);
                try {
                    t.insertRule(n, t.cssRules.length)
                } catch (e) {
                    console.warn("illegal rule", n)
                }
            } else {
                var r = nh(this.opts);
                this.tags.push(r), r.appendChild(document.createTextNode(n + (e || "")))
            }
            this.ctr++, this.ctr % 65e3 == 0 && this.tags.push(nh(this.opts))
        }, n.flush = function () {
            this.tags.forEach(function (e) {
                return e.parentNode.removeChild(e)
            }), this.tags = [], this.ctr = 0, this.injected = !1
        }, e
    }();
    var rh, ih, oh = function (e, n) {
            if (void 0 !== e.__SECRET_EMOTION__) return e.__SECRET_EMOTION__;
            void 0 === n && (n = {});
            var t, r = n.key || "css";
            if (/[^a-z-]/.test(r)) throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + r + '" was passed');
            var i, o = Hf(function (e) {
                t += e, eh && l.insert(e, s)
            });
            void 0 !== n.prefix && (i = {
                prefix: n.prefix
            });
            var a = {
                    registered: {},
                    inserted: {},
                    nonce: n.nonce,
                    key: r
                },
                l = new th(n);
            eh && l.inject();
            var c = new Rf(i);
            c.use(n.stylisPlugins)(o);
            var s = "";

            function u(e, n) {
                if (null == e) return "";
                switch (void 0 === e ? "undefined" : Vf(e)) {
                case "boolean":
                    return "";
                case "function":
                    if (void 0 === e.__emotion_styles) return void 0 === this && console.error("Interpolating functions in css calls is deprecated and will be removed in the next major version of Emotion.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"), u.call(this, void 0 === this ? e() : e(this.mergedProps, this.context), n);
                    var t = e.toString();
                    if ("NO_COMPONENT_SELECTOR" === t) throw new Error("Component selectors can only be used in conjunction with babel-plugin-emotion.");
                    return t;
                case "object":
                    return function (e) {
                        if (f.has(e)) return f.get(e);
                        var t = "";
                        return Array.isArray(e) ? e.forEach(function (e) {
                            t += u.call(this, e, !1)
                        }, this) : Object.keys(e).forEach(function (n) {
                            if ("object" !== Vf(e[n])) void 0 !== a.registered[e[n]] ? t += n + "{" + a.registered[e[n]] + "}" : t += Zf(n) + ":" + Kf(n, e[n]) + ";";
                            else {
                                if ("NO_COMPONENT_SELECTOR" === n) throw new Error("Component selectors can only be used in conjunction with babel-plugin-emotion.");
                                Array.isArray(e[n]) && "string" == typeof e[n][0] && void 0 === a.registered[e[n][0]] ? e[n].forEach(function (e) {
                                    t += Zf(n) + ":" + Kf(n, e) + ";"
                                }) : t += n + "{" + u.call(this, e[n], !1) + "}"
                            }
                        }, this), f.set(e, t), t
                    }.call(this, e);
                default:
                    var r = a.registered[e];
                    return !1 === n && void 0 !== r ? r : e
                }
            }
            var p, d, f = new WeakMap,
                h = /label:\s*([^\s;\n{]+)\s*;/g,
                y = function (e, n) {
                    return function (e) {
                        for (var n, t = e.length, r = t ^ t, i = 0; 4 <= t;) n = 1540483477 * (65535 & (n = 255 & e.charCodeAt(i) | (255 & e.charCodeAt(++i)) << 8 | (255 & e.charCodeAt(++i)) << 16 | (255 & e.charCodeAt(++i)) << 24)) + ((1540483477 * (n >>> 16) & 65535) << 16), r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16) ^ (n = 1540483477 * (65535 & (n ^= n >>> 24)) + ((1540483477 * (n >>> 16) & 65535) << 16)), t -= 4, ++i;
                        switch (t) {
                        case 3:
                            r ^= (255 & e.charCodeAt(i + 2)) << 16;
                        case 2:
                            r ^= (255 & e.charCodeAt(i + 1)) << 8;
                        case 1:
                            r = 1540483477 * (65535 & (r ^= 255 & e.charCodeAt(i))) + ((1540483477 * (r >>> 16) & 65535) << 16)
                        }
                        return r = 1540483477 * (65535 & (r ^= r >>> 13)) + ((1540483477 * (r >>> 16) & 65535) << 16), ((r ^= r >>> 15) >>> 0).toString(36)
                    }(e + n) + n
                },
                m = y,
                g = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
            y = function (e, n) {
                return m(e.replace(g, function (e) {
                    return s = e, ""
                }), n)
            };
            var v = function (t) {
                    var r = !0,
                        i = "",
                        o = "";
                    null == t || void 0 === t.raw ? i += u.call(this, t, r = !1) : i += t[0];
                    for (var e = arguments.length, n = new Array(1 < e ? e - 1 : 0), a = 1; a < e; a++) n[a - 1] = arguments[a];
                    return n.forEach(function (e, n) {
                        i += u.call(this, e, 46 === i.charCodeAt(i.length - 1)), !0 === r && void 0 !== t[n + 1] && (i += t[n + 1])
                    }, this), i = (d = i).replace(h, function (e, n) {
                        return o += "-" + n, ""
                    }), p = y(i, o), i
                },
                P = c;

            function x(e, n) {
                void 0 === a.inserted[p] && (t = "", c(e, n), a.inserted[p] = t)
            }
            c = function (e, n) {
                P(e, n), s = ""
            };
            var b = function () {
                var e = v.apply(this, arguments),
                    n = r + "-" + p;
                return void 0 === a.registered[n] && (a.registered[n] = d), x("." + n, e), n
            };

            function w(n, e) {
                var t = "";
                return e.split(" ").forEach(function (e) {
                    void 0 !== a.registered[e] ? n.push(e) : t += e + " "
                }), t
            }

            function D(e, n) {
                var t = [],
                    r = w(t, e);
                return t.length < 2 ? e : r + b(t, n)
            }

            function G(e) {
                a.inserted[e] = !0
            }
            if (eh) {
                var C = document.querySelectorAll("[data-emotion-" + r + "]");
                Array.prototype.forEach.call(C, function (e) {
                    l.tags[0].parentNode.insertBefore(e, l.tags[0]), e.getAttribute("data-emotion-" + r).split(" ").forEach(G)
                })
            }
            var S = {
                flush: function () {
                    eh && (l.flush(), l.inject()), a.inserted = {}, a.registered = {}
                },
                hydrate: function (e) {
                    e.forEach(G)
                },
                cx: function () {
                    for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                    return D(function e(n) {
                        for (var t = n.length, r = 0, i = ""; r < t; r++) {
                            var o = n[r];
                            if (null != o) {
                                var a = void 0;
                                switch (void 0 === o ? "undefined" : Vf(o)) {
                                case "boolean":
                                    break;
                                case "function":
                                    console.error("Passing functions to cx is deprecated and will be removed in the next major version of Emotion.\nPlease call the function before passing it to cx."), a = e([o()]);
                                    break;
                                case "object":
                                    if (Array.isArray(o)) a = e(o);
                                    else
                                        for (var l in a = "", o) o[l] && l && (a && (a += " "), a += l);
                                    break;
                                default:
                                    a = o
                                }
                                a && (i && (i += " "), i += a)
                            }
                        }
                        return i
                    }(n))
                },
                merge: D,
                getRegisteredStyles: w,
                injectGlobal: function () {
                    x("", v.apply(this, arguments))
                },
                keyframes: function () {
                    var e = v.apply(this, arguments),
                        n = "animation-" + p;
                    return x("", "@keyframes " + n + "{" + e + "}"), n
                },
                css: b,
                sheet: l,
                caches: a
            };
            return e.__SECRET_EMOTION__ = S
        }("undefined" != typeof global ? global : {}),
        ah = (oh.flush, oh.hydrate, oh.cx, oh.merge, oh.getRegisteredStyles, oh.injectGlobal, oh.keyframes, oh.css),
        lh = (oh.sheet, oh.caches, rh = ["\n  label: scatter;\n  width: 100%;\n  height: 100%;\n  cursor: crosshair;\n  user-select: none;\n\n  .point {\n    cursor: pointer;\n    opacity: 0.8;\n\n    text {\n      text-anchor: middle;\n      font-family: 'Roboto', sans-serif;\n      text-shadow: 1px 1px 1px rgba(28, 30, 34, 0.725);\n      visibility: 'visible';\n      opacity: 1;\n      transition: visibility 0.5s, opacity 0.5s;\n\n      &.hidden {\n        visibility: 'hidden';\n        opacity: 0;\n      }\n    }\n  }\n"], ih = ["\n  label: scatter;\n  width: 100%;\n  height: 100%;\n  cursor: crosshair;\n  user-select: none;\n\n  .point {\n    cursor: pointer;\n    opacity: 0.8;\n\n    text {\n      text-anchor: middle;\n      font-family: 'Roboto', sans-serif;\n      text-shadow: 1px 1px 1px rgba(28, 30, 34, 0.725);\n      visibility: 'visible';\n      opacity: 1;\n      transition: visibility 0.5s, opacity 0.5s;\n\n      &.hidden {\n        visibility: 'hidden';\n        opacity: 0;\n      }\n    }\n  }\n"], Object.freeze(Object.defineProperties(rh, {
            raw: {
                value: Object.freeze(ih)
            }
        })));
    var ch = ah(lh),
        sh = {
            type: "Topology",
            objects: {
                countries: {
                    type: "GeometryCollection",
                    geometries: [{
                        type: "Polygon",
                        arcs: [
                            [0, 1, 2, 3, 4, 5]
                        ],
                        id: "004"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [6, 7, 8, 9]
                            ],
                            [
                                [10, 11, 12]
                            ]
                        ],
                        id: "024"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [13, 14, 15, 16, 17]
                        ],
                        id: "008"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [18, 19, 20, 21, 22]
                        ],
                        id: "784"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [23, 24]
                            ],
                            [
                                [25, 26, 27, 28, 29, 30]
                            ]
                        ],
                        id: "032"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [31, 32, 33, 34, 35]
                        ],
                        id: "051"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [36]
                            ],
                            [
                                [37]
                            ],
                            [
                                [38]
                            ],
                            [
                                [39]
                            ],
                            [
                                [40]
                            ],
                            [
                                [41]
                            ],
                            [
                                [42]
                            ],
                            [
                                [43]
                            ]
                        ],
                        id: "010"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [44]
                        ],
                        id: "260"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [45]
                            ],
                            [
                                [46]
                            ]
                        ],
                        id: "036"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [47, 48, 49, 50, 51, 52, 53]
                        ],
                        id: "040"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [54, -35]
                            ],
                            [
                                [55, 56, -33, 57, 58]
                            ]
                        ],
                        id: "031"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [59, 60, 61]
                        ],
                        id: "108"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [62, 63, 64, 65, 66]
                        ],
                        id: "056"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [67, 68, 69, 70, 71]
                        ],
                        id: "204"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [72, 73, 74, -70, 75, 76]
                        ],
                        id: "854"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [77, 78, 79]
                        ],
                        id: "050"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [80, 81, 82, 83, 84, 85]
                        ],
                        id: "100"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [86]
                            ],
                            [
                                [87]
                            ],
                            [
                                [88]
                            ]
                        ],
                        id: "044"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [89, 90, 91]
                        ],
                        id: "070"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [92, 93, 94, 95, 96]
                        ],
                        id: "112"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [97, 98, 99]
                        ],
                        id: "084"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [100, 101, 102, 103, -31]
                        ],
                        id: "068"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-27, 104, -103, 105, 106, 107, 108, 109, 110, 111, 112]
                        ],
                        id: "076"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [113, 114]
                        ],
                        id: "096"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [115, 116]
                        ],
                        id: "064"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [117, 118, 119, 120]
                        ],
                        id: "072"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [121, 122, 123, 124, 125, 126, 127]
                        ],
                        id: "140"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [128]
                            ],
                            [
                                [129]
                            ],
                            [
                                [130]
                            ],
                            [
                                [131]
                            ],
                            [
                                [132]
                            ],
                            [
                                [133]
                            ],
                            [
                                [134]
                            ],
                            [
                                [135]
                            ],
                            [
                                [136]
                            ],
                            [
                                [137]
                            ],
                            [
                                [138, 139, 140, 141]
                            ],
                            [
                                [142]
                            ],
                            [
                                [143]
                            ],
                            [
                                [144]
                            ],
                            [
                                [145]
                            ],
                            [
                                [146]
                            ],
                            [
                                [147]
                            ],
                            [
                                [148]
                            ],
                            [
                                [149]
                            ],
                            [
                                [150]
                            ],
                            [
                                [151]
                            ],
                            [
                                [152]
                            ],
                            [
                                [153]
                            ],
                            [
                                [154]
                            ],
                            [
                                [155]
                            ],
                            [
                                [156]
                            ],
                            [
                                [157]
                            ],
                            [
                                [158]
                            ],
                            [
                                [159]
                            ],
                            [
                                [160]
                            ]
                        ],
                        id: "124"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-51, 161, 162, 163]
                        ],
                        id: "756"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [-24, 164]
                            ],
                            [
                                [-30, 165, 166, -101]
                            ]
                        ],
                        id: "152"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [167]
                            ],
                            [
                                [168, 169, 170, 171, 172, 173, -117, 174, 175, 176, 177, -4, 178, 179, 180, 181, 182, 183]
                            ]
                        ],
                        id: "156"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [184, 185, 186, 187, -73, 188]
                        ],
                        id: "384"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [189, 190, 191, 192, 193, 194, -128, 195]
                        ],
                        id: "120"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [196, 197, -60, 198, 199, 200, 201, -10, 202, -13, 203, -126, 204]
                        ],
                        id: "180"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-12, 205, 206, -196, -127, -204]
                        ],
                        id: "178"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [207, 208, 209, 210, 211, -107, 212]
                        ],
                        id: "170"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [213, 214, 215, 216]
                        ],
                        id: "188"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [217]
                        ],
                        id: "192"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [218, 219]
                        ],
                        id: "-99"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [220, -220]
                        ],
                        id: "196"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-53, 221, 222, 223]
                        ],
                        id: "203"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [224, 225, -222, -52, -164, 226, 227, -64, 228, 229, 230]
                        ],
                        id: "276"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [231, 232, 233, 234]
                        ],
                        id: "262"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [235]
                            ],
                            [
                                [-231, 236]
                            ]
                        ],
                        id: "208"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [237, 238]
                        ],
                        id: "214"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [239, 240, 241, 242, 243, 244, 245, 246]
                        ],
                        id: "012"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [247, -208, 248]
                        ],
                        id: "218"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [249, 250, 251, 252, 253]
                        ],
                        id: "818"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [254, 255, 256, -235]
                        ],
                        id: "232"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [257, 258, 259, 260]
                        ],
                        id: "724"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [261, 262, 263]
                        ],
                        id: "233"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-234, 264, 265, 266, 267, 268, 269, -255]
                        ],
                        id: "231"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [270, 271, 272, 273]
                        ],
                        id: "246"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [274]
                            ],
                            [
                                [275]
                            ]
                        ],
                        id: "242"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [276]
                        ],
                        id: "238"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [277, 278, 279, -111]
                            ],
                            [
                                [280]
                            ],
                            [
                                [281, -227, -163, 282, 283, -259, 284, -66]
                            ]
                        ],
                        id: "250"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [285, 286, -190, -207]
                        ],
                        id: "266"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [287, 288]
                            ],
                            [
                                [289]
                            ]
                        ],
                        id: "826"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [290, 291, -58, -32, 292]
                        ],
                        id: "268"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [293, -189, -77, 294]
                        ],
                        id: "288"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [295, 296, 297, 298, 299, 300, -187]
                        ],
                        id: "324"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [301, 302]
                        ],
                        id: "270"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [303, 304, -299]
                        ],
                        id: "624"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [305, -191, -287]
                        ],
                        id: "226"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [306]
                            ],
                            [
                                [307, -15, 308, -84, 309]
                            ]
                        ],
                        id: "300"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [310]
                        ],
                        id: "304"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [311, 312, -100, 313, 314, 315]
                        ],
                        id: "320"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [316, 317, -109, 318]
                        ],
                        id: "328"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [319, 320, -315, 321, 322]
                        ],
                        id: "340"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [323, -92, 324, 325, 326, 327]
                        ],
                        id: "191"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-239, 328]
                        ],
                        id: "332"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-48, 329, 330, 331, 332, -328, 333]
                        ],
                        id: "348"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [334]
                            ],
                            [
                                [335, 336]
                            ],
                            [
                                [337]
                            ],
                            [
                                [338]
                            ],
                            [
                                [339]
                            ],
                            [
                                [340]
                            ],
                            [
                                [341]
                            ],
                            [
                                [342]
                            ],
                            [
                                [343, 344]
                            ],
                            [
                                [345]
                            ],
                            [
                                [346]
                            ],
                            [
                                [347, 348]
                            ],
                            [
                                [349]
                            ]
                        ],
                        id: "360"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-177, 350, -175, -116, -174, 351, -80, 352, 353]
                        ],
                        id: "356"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [354, -288]
                        ],
                        id: "372"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [355, -6, 356, 357, 358, 359, -55, -34, -57, 360]
                        ],
                        id: "364"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [361, 362, 363, 364, 365, 366, -359]
                        ],
                        id: "368"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [367]
                        ],
                        id: "352"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [368, 369, 370, -254, 371, 372, 373]
                        ],
                        id: "376"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [374]
                            ],
                            [
                                [375]
                            ],
                            [
                                [376, 377, -283, -162, -50]
                            ]
                        ],
                        id: "380"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [378]
                        ],
                        id: "388"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-369, 379, -365, 380, 381, -371, 382]
                        ],
                        id: "400"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [383]
                            ],
                            [
                                [384]
                            ],
                            [
                                [385]
                            ]
                        ],
                        id: "392"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [386, 387, 388, 389, -181, 390]
                        ],
                        id: "398"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [391, 392, 393, 394, -267, 395]
                        ],
                        id: "404"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-391, -180, 396, 397]
                        ],
                        id: "417"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [398, 399, 400, 401]
                        ],
                        id: "116"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [402, 403]
                        ],
                        id: "410"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-18, 404, 405, 406]
                        ],
                        id: "-99"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [407, 408, -363]
                        ],
                        id: "414"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [409, 410, -172, 411, -400]
                        ],
                        id: "418"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-373, 412, 413]
                        ],
                        id: "422"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [414, 415, -296, -186]
                        ],
                        id: "430"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [416, -247, 417, 418, -252, 419, 420]
                        ],
                        id: "434"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [421]
                        ],
                        id: "144"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [422]
                        ],
                        id: "426"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [423, 424, 425, -93, 426]
                        ],
                        id: "440"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-228, -282, -65]
                        ],
                        id: "442"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [427, -264, 428, -94, -426]
                        ],
                        id: "428"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-244, 429, 430]
                        ],
                        id: "504"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [431, 432]
                        ],
                        id: "498"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [433]
                        ],
                        id: "450"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [434, -98, -313, 435, 436]
                        ],
                        id: "484"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-407, 437, -85, -309, -14]
                        ],
                        id: "807"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [438, -241, 439, -74, -188, -301, 440]
                        ],
                        id: "466"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [441, -78, -352, -173, -411, 442]
                        ],
                        id: "104"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [443, -325, -91, 444, -405, -17]
                        ],
                        id: "499"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [445, -183]
                        ],
                        id: "496"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [446, 447, 448, 449, 450, 451, 452, 453]
                        ],
                        id: "508"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [454, 455, 456, -242, -439]
                        ],
                        id: "478"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-454, 457, 458]
                        ],
                        id: "454"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [459, 460]
                            ],
                            [
                                [-348, 461, -115, 462]
                            ]
                        ],
                        id: "458"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [463, -8, 464, -119, 465]
                        ],
                        id: "516"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [466]
                        ],
                        id: "540"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-75, -440, -240, -417, 467, -194, 468, -71]
                        ],
                        id: "562"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [469, -72, -469, -193]
                        ],
                        id: "566"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [470, -323, 471, -215]
                        ],
                        id: "558"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-229, -63, 472]
                        ],
                        id: "528"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [473, -274, 474, 475]
                            ],
                            [
                                [476]
                            ],
                            [
                                [477]
                            ],
                            [
                                [478]
                            ]
                        ],
                        id: "578"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-351, -176]
                        ],
                        id: "524"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [479]
                            ],
                            [
                                [480]
                            ]
                        ],
                        id: "554"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [481, 482, -22, 483]
                            ],
                            [
                                [-20, 484]
                            ]
                        ],
                        id: "512"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-178, -354, 485, -357, -5]
                        ],
                        id: "586"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [486, -217, 487, -210]
                        ],
                        id: "591"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-167, 488, -249, -213, -106, -102]
                        ],
                        id: "604"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [489]
                            ],
                            [
                                [490]
                            ],
                            [
                                [491]
                            ],
                            [
                                [492]
                            ],
                            [
                                [493]
                            ],
                            [
                                [494]
                            ],
                            [
                                [495]
                            ]
                        ],
                        id: "608"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [496]
                            ],
                            [
                                [497]
                            ],
                            [
                                [-344, 498]
                            ],
                            [
                                [499]
                            ]
                        ],
                        id: "598"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-226, 500, 501, -427, -97, 502, 503, -223]
                        ],
                        id: "616"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [504]
                        ],
                        id: "630"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [505, 506, -404, 507, -169]
                        ],
                        id: "408"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-261, 508]
                        ],
                        id: "620"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-104, -105, -26]
                        ],
                        id: "600"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-383, -370]
                        ],
                        id: "275"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [509, 510]
                        ],
                        id: "634"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [511, -433, 512, 513, -81, 514, -332]
                        ],
                        id: "642"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [515]
                            ],
                            [
                                [-502, 516, -424]
                            ],
                            [
                                [517]
                            ],
                            [
                                [518]
                            ],
                            [
                                [519]
                            ],
                            [
                                [520]
                            ],
                            [
                                [521]
                            ],
                            [
                                [-506, -184, -446, -182, -390, 522, -59, -292, 523, 524, -95, -429, -263, 525, -271, -474, 526]
                            ],
                            [
                                [527]
                            ],
                            [
                                [528]
                            ],
                            [
                                [529]
                            ]
                        ],
                        id: "643"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [530, -61, -198, 531]
                        ],
                        id: "646"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-243, -457, 532, -430]
                        ],
                        id: "732"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [533, -381, -364, -409, 534, -511, 535, -23, -483, 536]
                        ],
                        id: "682"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [537, 538, -123, 539, -420, -251, 540, -256, -270, 541]
                        ],
                        id: "729"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [542, -268, -395, 543, -205, -125, 544, -538]
                        ],
                        id: "728"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [545, -455, -441, -300, -305, 546, -303]
                        ],
                        id: "686"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [547]
                            ],
                            [
                                [548]
                            ],
                            [
                                [549]
                            ],
                            [
                                [550]
                            ],
                            [
                                [551]
                            ]
                        ],
                        id: "090"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [552, -297, -416]
                        ],
                        id: "694"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [553, -316, -321]
                        ],
                        id: "222"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-265, -233, 554, 555]
                        ],
                        id: "-99"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-396, -266, -556, 556]
                        ],
                        id: "706"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-86, -438, -406, -445, -90, -324, -333, -515]
                        ],
                        id: "688"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [557, -279, 558, -110, -318]
                        ],
                        id: "740"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-504, 559, -330, -54, -224]
                        ],
                        id: "703"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-49, -334, -327, 560, -377]
                        ],
                        id: "705"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-475, -273, 561]
                        ],
                        id: "752"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [562, -450]
                        ],
                        id: "748"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-380, -374, -414, 563, 564, -366]
                        ],
                        id: "760"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-468, -421, -540, -122, -195]
                        ],
                        id: "148"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [565, -295, -76, -69]
                        ],
                        id: "768"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [566, -461, 567, -443, -410, -399]
                        ],
                        id: "764"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-397, -179, -3, 568]
                        ],
                        id: "762"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-356, 569, -388, 570, -1]
                        ],
                        id: "795"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [571, -336]
                        ],
                        id: "626"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [572]
                        ],
                        id: "780"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-246, 573, -418]
                        ],
                        id: "788"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [-293, -36, -360, -367, -565, 574]
                            ],
                            [
                                [-310, -83, 575]
                            ]
                        ],
                        id: "792"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [576]
                        ],
                        id: "158"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-393, 577, -447, -459, 578, -201, 579, -199, -62, -531, 580]
                        ],
                        id: "834"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-532, -197, -544, -394, -581]
                        ],
                        id: "800"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-525, 581, -513, -432, -512, -331, -560, -503, -96]
                        ],
                        id: "804"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-113, 582, -28]
                        ],
                        id: "858"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [583]
                            ],
                            [
                                [584]
                            ],
                            [
                                [585]
                            ],
                            [
                                [586]
                            ],
                            [
                                [587]
                            ],
                            [
                                [588, -437, 589, -139]
                            ],
                            [
                                [590]
                            ],
                            [
                                [591]
                            ],
                            [
                                [592]
                            ],
                            [
                                [-141, 593]
                            ]
                        ],
                        id: "840"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-571, -387, -398, -569, -2]
                        ],
                        id: "860"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [594, -319, -108, -212]
                        ],
                        id: "862"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [595, -401, -412, -171]
                        ],
                        id: "704"
                    }, {
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [596]
                            ],
                            [
                                [597]
                            ]
                        ],
                        id: "548"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [598, -537, -482]
                        ],
                        id: "887"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-466, -118, 599, -451, -563, -449, 600],
                            [-423]
                        ],
                        id: "710"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-458, -453, 601, -120, -465, -7, -202, -579]
                        ],
                        id: "894"
                    }, {
                        type: "Polygon",
                        arcs: [
                            [-600, -121, -602, -452]
                        ],
                        id: "716"
                    }]
                },
                land: {
                    type: "GeometryCollection",
                    geometries: [{
                        type: "MultiPolygon",
                        arcs: [
                            [
                                [595, 401, 566, 459, 567, 441, 78, 352, 485, 357, 361, 407, 534, 509, 535, 18, 484, 20, 483, 598, 533, 381, 249, 540, 256, 231, 554, 556, 391, 577, 447, 600, 463, 8, 202, 10, 205, 285, 305, 191, 469, 67, 565, 293, 184, 414, 552, 297, 303, 546, 301, 545, 455, 532, 430, 244, 573, 418, 252, 371, 412, 563, 574, 290, 523, 581, 513, 81, 575, 307, 15, 443, 325, 560, 377, 283, 259, 508, 257, 284, 66, 472, 229, 236, 224, 500, 516, 424, 427, 261, 525, 271, 561, 475, 526, 506, 402, 507, 169],
                                [123, 544, 538],
                                [199, 579],
                                [542, 268, 541],
                                [388, 522, 55, 360, 569]
                            ],
                            [
                                [24, 164]
                            ],
                            [
                                [582, 28, 165, 488, 247, 208, 486, 213, 470, 319, 553, 311, 435, 589, 139, 593, 141, 588, 434, 98, 313, 321, 471, 215, 487, 210, 594, 316, 557, 279, 111],
                                [558, 277]
                            ],
                            [
                                [36]
                            ],
                            [
                                [37]
                            ],
                            [
                                [38]
                            ],
                            [
                                [39]
                            ],
                            [
                                [40]
                            ],
                            [
                                [41]
                            ],
                            [
                                [42]
                            ],
                            [
                                [43]
                            ],
                            [
                                [44]
                            ],
                            [
                                [45]
                            ],
                            [
                                [46]
                            ],
                            [
                                [86]
                            ],
                            [
                                [87]
                            ],
                            [
                                [88]
                            ],
                            [
                                [461, 113, 462, 348]
                            ],
                            [
                                [128]
                            ],
                            [
                                [129]
                            ],
                            [
                                [130]
                            ],
                            [
                                [131]
                            ],
                            [
                                [132]
                            ],
                            [
                                [133]
                            ],
                            [
                                [134]
                            ],
                            [
                                [135]
                            ],
                            [
                                [136]
                            ],
                            [
                                [137]
                            ],
                            [
                                [142]
                            ],
                            [
                                [143]
                            ],
                            [
                                [144]
                            ],
                            [
                                [145]
                            ],
                            [
                                [146]
                            ],
                            [
                                [147]
                            ],
                            [
                                [148]
                            ],
                            [
                                [149]
                            ],
                            [
                                [150]
                            ],
                            [
                                [151]
                            ],
                            [
                                [152]
                            ],
                            [
                                [153]
                            ],
                            [
                                [154]
                            ],
                            [
                                [155]
                            ],
                            [
                                [156]
                            ],
                            [
                                [157]
                            ],
                            [
                                [158]
                            ],
                            [
                                [159]
                            ],
                            [
                                [160]
                            ],
                            [
                                [167]
                            ],
                            [
                                [217]
                            ],
                            [
                                [218, 220]
                            ],
                            [
                                [235]
                            ],
                            [
                                [237, 328]
                            ],
                            [
                                [274]
                            ],
                            [
                                [275]
                            ],
                            [
                                [276]
                            ],
                            [
                                [280]
                            ],
                            [
                                [288, 354]
                            ],
                            [
                                [289]
                            ],
                            [
                                [306]
                            ],
                            [
                                [310]
                            ],
                            [
                                [334]
                            ],
                            [
                                [336, 571]
                            ],
                            [
                                [337]
                            ],
                            [
                                [338]
                            ],
                            [
                                [339]
                            ],
                            [
                                [340]
                            ],
                            [
                                [341]
                            ],
                            [
                                [342]
                            ],
                            [
                                [344, 498]
                            ],
                            [
                                [345]
                            ],
                            [
                                [346]
                            ],
                            [
                                [349]
                            ],
                            [
                                [367]
                            ],
                            [
                                [374]
                            ],
                            [
                                [375]
                            ],
                            [
                                [378]
                            ],
                            [
                                [383]
                            ],
                            [
                                [384]
                            ],
                            [
                                [385]
                            ],
                            [
                                [421]
                            ],
                            [
                                [433]
                            ],
                            [
                                [466]
                            ],
                            [
                                [476]
                            ],
                            [
                                [477]
                            ],
                            [
                                [478]
                            ],
                            [
                                [479]
                            ],
                            [
                                [480]
                            ],
                            [
                                [489]
                            ],
                            [
                                [490]
                            ],
                            [
                                [491]
                            ],
                            [
                                [492]
                            ],
                            [
                                [493]
                            ],
                            [
                                [494]
                            ],
                            [
                                [495]
                            ],
                            [
                                [496]
                            ],
                            [
                                [497]
                            ],
                            [
                                [499]
                            ],
                            [
                                [504]
                            ],
                            [
                                [515]
                            ],
                            [
                                [517]
                            ],
                            [
                                [518]
                            ],
                            [
                                [519]
                            ],
                            [
                                [520]
                            ],
                            [
                                [521]
                            ],
                            [
                                [527]
                            ],
                            [
                                [528]
                            ],
                            [
                                [529]
                            ],
                            [
                                [547]
                            ],
                            [
                                [548]
                            ],
                            [
                                [549]
                            ],
                            [
                                [550]
                            ],
                            [
                                [551]
                            ],
                            [
                                [572]
                            ],
                            [
                                [576]
                            ],
                            [
                                [583]
                            ],
                            [
                                [584]
                            ],
                            [
                                [585]
                            ],
                            [
                                [586]
                            ],
                            [
                                [587]
                            ],
                            [
                                [590]
                            ],
                            [
                                [591]
                            ],
                            [
                                [592]
                            ],
                            [
                                [596]
                            ],
                            [
                                [597]
                            ]
                        ]
                    }]
                }
            }, topology ,
            bbox: [-180, -85.60903777459767, 180, 83.64513000000001],
            transform: {
                scale: [.0036000360003600037, .00169255860333201],
                translate: [-180, -85.60903777459767]
            }
        },
        uh = Object.assign || function (e) {
            for (var n = 1; n < arguments.length; n++) {
                var t = arguments[n];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            }
            return e
        },
        ph = function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }();

    function dh(e) {
        if (Array.isArray(e)) {
            for (var n = 0, t = Array(e.length); n < e.length; n++) t[n] = e[n];
            return t
        }
        return Array.from(e)
    }
    var fh = function () {
            function t(e) {
                var n = this;
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.svg = e.attr("class", ch).attr("transform", "translate(" + lf + ", " + cf + ")"), this.svg.on("click", function () {
                    return n.reset()
                }), this.mapBox = this.svg.append("g"), this.scatterGroup = this.svg.append("g"), this.radiusBox = this.svg.append("g").attr("opacity", 0), this.symbol = Vd().size(64), this.zoom = ic().scaleExtent([-1, 8]).on("zoom", function () {
                    return n._zoomed()
                }), this.svg.call(this.zoom), this.xScale = $c(), this.yScale = $c(), this.rScale = Bc().exponent(.5).range([2, 13]), this.labelScale = Bc().exponent(.5).range([2, 13]).clamp(!0), this.domains = {}, this.colorScale = function e() {
                    var i = [],
                        t = [],
                        r = [];

                    function o() {
                        var e = 0,
                            n = Math.max(1, t.length);
                        for (r = new Array(n - 1); ++e < n;) r[e - 1] = Ie(i, e / n);
                        return a
                    }

                    function a(e) {
                        if (!isNaN(e = +e)) return t[ve(r, e)]
                    }
                    return a.invertExtent = function (e) {
                        var n = t.indexOf(e);
                        return n < 0 ? [NaN, NaN] : [0 < n ? r[n - 1] : i[0], n < r.length ? r[n] : i[i.length - 1]]
                    }, a.domain = function (e) {
                        if (!arguments.length) return i.slice();
                        i = [];
                        for (var n, t = 0, r = e.length; t < r; ++t) null == (n = e[t]) || isNaN(n = +n) || i.push(n);
                        return i.sort(ye), o()
                    }, a.range = function (e) {
                        return arguments.length ? (t = dc.call(e), o()) : t.slice()
                    }, a.quantiles = function () {
                        return r.slice()
                    }, a.copy = function () {
                        return e().domain(i).range(t)
                    }, a
                }().range(Cf), this.kZoom = 1, this.dur = 250, this.clickedCountryId = void 0, this.firstZoomTo = !1, this.activeCountries = void 0, this.textIsHidden = !0, this.mapMode = !0, this.currentlyZooming = !1, this.useSpy = !0, this.radiusValues = []
            }
            return ph(t, [{
                key: "render",
                value: function () {
                    var r = this,
                        i = this.nodes,
                        e = this.scatterGroup,
                        n = this.xScale,
                        t = this.yScale,
                        o = this.dur,
                        a = this.radiusParam,
                        l = this.getWidth() - sf - lf,
                        c = this.getHeight() - cf - uf;
                    if (this.w = l, this.h = c, this.radiusBox.attr("transform", "translate(42, " + (c - 15) + ")"), n.range([lf, l - lf - sf]), t.range([cf, c - cf - uf]), i) {
                        var s = e.selectAll(".point").data(i);
                        s.exit().remove();
                        var u = s.enter().append("g").attr("class", "point").on("click", function (e, n) {
                            N.stopPropagation(), r.activeCountries = void 0, r.actions.onPointClick(r.nodes[n], n), r.zoomTo(i[n].indicator)
                        });
                        u.append("circle"), u.append("path"), u.append("text").attr("class", "name").classed("hidden", !0).text(function (e, n) {
                            return i[n].indicator
                        }), this.points = s.merge(u), this.points.transition().duration(o).style("fill", function (e, n) {
                            return i[n].color
                        }).style("opacity", function (e, n) {
                            var t = !0;
                            return (r.clickedCountryId || r.activeCountries) && n !== r.clickedCountryId && -1 === Li(r.activeCountries, i[n].indicator) && (t = !1), t ? 1 : .2
                        }).style("font-size", 11 / this.kZoom + "px"), this.points.select("circle").style("visibility", function (e, n) {
                            return gi(+i[n][a]) ? "hidden" : "visible"
                        }).transition().duration(o).style("stroke", function (e, n) {
                            return void 0 === i[n].color && console.log(i[n], i[n].color), He(i[n].color).darker(.6)
                        }).style("stroke-width", .5 / this.kZoom).attr("r", function (e, n) {
                            return gi(i[n].radius) ? 0 : i[n].radius / r.kZoom
                        }), this.points.select("path").style("stroke", function (e, n) {
                            return He(i[n].color).darker(.6)
                        }).style("visibility", function (e, n) {
                            return gi(+i[n][a]) ? "visible" : "hidden"
                        }).attr("d", function () {
                            return r.symbol.size(64 / (r.kZoom * r.kZoom)).type(Hd)()
                        })
                    }
                    this.updateText()
                }
            }, {
                key: "showText",
                value: function () {
                    this.textIsHidden = !1, this.updateText()
                }
            }, {
                key: "updateText",
                value: function () {
                    var r = this,
                        i = this.nodes,
                        o = this.clickedCountryId;
                    this.points.select(".name").attr("dy", function (e, n) {
                        return (-(gi(i[n].radius) ? 8 : i[n].radius) - 5) / r.kZoom
                    }).style("font-size", function (e, n) {
                        var t = gi(i[n].radius) ? 0 : i[n].radius;
                        return Math.min(14, Math.max(11, 1.5 * t)) / r.kZoom + "px"
                    }).classed("hidden", function (e, n) {
                        var t = 1.3 * ((gi(i[n].labelRadius) ? 3 : i[n].labelRadius) * r.kZoom) < Me([2, 13]);
                        return o !== n && (r.textIsHidden || r.kZoom < .55 || t || o === n)
                    })
                }
            }, {
                key: "setGeoPosition",
                value: function (e) {
                    var t = this.projection,
                        n = this.countries;
                    this.data = e, this.projection.fitSize([this.getWidth(), this.getHeight() - 200], n);
                    var r = this.projection([-180, 59.26])[0],
                        i = this.projection([20.69, 71.08])[1],
                        o = this.projection([180, 63.56])[0],
                        a = this.projection([-35.69, -38.33])[1];
                    this.projection.fitExtent([
                        [-r, -i],
                        [2 * this.getWidth() - o, 2 * this.getHeight() - a]
                    ], n);
                    var l = function (n, t) {
                        var r, i, o = 4.5;

                        function a(e) {
                            return e && ("function" == typeof o && i.pointRadius(+o.apply(this, arguments)), Xu(e, r(i))), i.result()
                        }
                        return a.area = function (e) {
                            return Xu(e, r(Lp)), Lp.result()
                        }, a.measure = function (e) {
                            return Xu(e, r(Pd)), Pd.result()
                        }, a.bounds = function (e) {
                            return Xu(e, r(Fp)), Fp.result()
                        }, a.centroid = function (e) {
                            return Xu(e, r(td)), td.result()
                        }, a.projection = function (e) {
                            return arguments.length ? (r = null == e ? (n = null, Sp) : (n = e).stream, a) : n
                        }, a.context = function (e) {
                            return arguments.length ? (i = null == e ? (t = null, new wd) : new dd(t = e), "function" != typeof o && i.pointRadius(o), a) : t
                        }, a.pointRadius = function (e) {
                            return arguments.length ? (o = "function" == typeof e ? e : (i.pointRadius(+e), +e), a) : o
                        }, a.projection(n).context(t)
                    }().projection(this.projection);
                    this.map.attr("d", l);
                    var c = e.map(function (e) {
                        var n = $f(e);
                        return t(n)
                    });
                    return this.points.attr("transform", function (e, n) {
                        return "translate(" + c[n][0] + ", " + c[n][1] + ")"
                    }), c
                }
            }, {
                key: "updatePosition",
                value: function (e) {
                    var t = this,
                        n = this.points,
                        r = this.xScale,
                        i = this.yScale;
                    return this.useSpy && this.clickedCountryId && !this.currentlyZooming && this.zoomTo(this.nodes[this.clickedCountryId].indicator, 2, 500, !0), e && (this.data = e, r.domain(be(e.map(function (e) {
                        return e[0]
                    }))), i.domain(be(e.map(function (e) {
                        return e[1]
                    })))), this.mapMode ? this.setGeoPosition(this.data) : n.attr("transform", function (e, n) {
                        return "translate(" + r(t.data[n][0]) + ", " + i(t.data[n][1]) + ")"
                    }), this
                }
            }, {
                key: "updateRadiusDomian",
                value: function () {
                    var e = this.rScale,
                        n = this.labelScale,
                        t = this.domains,
                        r = this.radiusParam;
                    e.domain(be(t[r])), "surface area (km²)" === r ? (e.exponent(1), n.exponent(1)) : (e.exponent(.5), n.exponent(.5))
                }
            }, {
                key: "setRadius",
                value: function (n) {
                    var e = this.nodes,
                        t = this.rScale,
                        r = this.labelScale;
                    this.radiusParam = n, this.updateRadiusDomian(), e.forEach(function (e) {
                        return e.radius = t(+e[n])
                    });
                    var i = e.map(function (e) {
                            return +e[n]
                        }).filter(function (e) {
                            return !gi(e)
                        }).sort(function (e, n) {
                            return e - n
                        }),
                        o = Ie(i, .1),
                        a = Ie(i, .9);
                    return r.domain([o, a]), e.forEach(function (e) {
                        return e.labelRadius = r(+e[n])
                    }), this
                }
            }, {
                key: "setColor",
                value: function (t, e) {
                    var n = this.nodes,
                        r = this.colorScale;
                    this.colorParam = t;
                    var i = Cf;
                    return "indicator" !== t && (i = -1 !== Df.indexOf(e) ? [].concat(dh(Sf)) : [].concat(dh(Sf)).slice().reverse()), r.range(i).domain(n.map(function (e) {
                        return +e[t]
                    })), yi(n, function (e) {
                        if ("indicator" === t) e.color = Tf(e);
                        else {
                            var n = +e[t];
                            e.color = gi(n) ? "#ccc" : r(n)
                        }
                    }), this
                }
            }, {
                key: "setData",
                value: function (e, n) {
                    var t = this;
                    n.forEach(function (e) {
                        return t.domains[e.key] = e.extent
                    });
                    var r, i, o = "GeometryCollection" === (i = (r = sh).objects.countries).type ? {
                        type: "FeatureCollection",
                        features: i.geometries.map(function (e) {
                            return nf(r, e)
                        })
                    } : nf(r, i);
                    return this.countries = o, this.projection = Nd().fitSize([this.getWidth(), this.getHeight()], o), this.map = this.mapBox.selectAll(".country").data(o.features).enter().append("path").attr("class", "country"), this.nodes = e.map(function (e) {
                        return uh({}, e)
                    }), console.log("this.nodes", this.nodes), this
                }
            }, {
                key: "setActions",
                value: function (e) {
                    this.actions = e
                }
            }, {
                key: "showOverviewTransition",
                value: function () {
                    this.zoomTo("United Kingdom", 2, 28e3, !0), this.reset()
                }
            }, {
                key: "showDevelopedCountries",
                value: function () {
                    this.activeCountries = hf, this.zoomTo("United Kingdom")
                }
            }, {
                key: "showBiggestCountries",
                value: function () {
                    this.activeCountries = yf, this.zoomTo("China")
                }
            }, {
                key: "showSingaporeBrunei",
                value: function () {
                    this.activeCountries = mf, this.zoomTo("Brunei")
                }
            }, {
                key: "showRussiaBrazil",
                value: function () {
                    this.activeCountries = gf, this.zoomTo("Brazil")
                }
            }, {
                key: "setActiveCountriesRussiaBrazil",
                value: function () {
                    this.activeCountries = gf, this.render()
                }
            }, {
                key: "showUSA",
                value: function () {
                    this.activeCountries = void 0, this.zoomTo("United States", 1);
                    var e = oa(this.nodes, ["indicator", "United States"]);
                    this.actions.onPointClick(this.nodes[e], e)
                }
            }, {
                key: "zoomTo",
                value: function (n) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 2,
                        t = this,
                        r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1e3,
                        i = 3 < arguments.length && void 0 !== arguments[3] && arguments[3];
                    this.currentlyZooming = !0, setTimeout(function () {
                        t.currentlyZooming = !1
                    }, r);
                    var o = this.nodes,
                        a = this.data,
                        l = this.projection,
                        c = oa(o, function (e) {
                            return e.indicator === n
                        }),
                        s = void 0,
                        u = void 0;
                    if (this.mapMode) {
                        var p = l($f(a[c]));
                        s = this.w / 2 - p[0] * e, u = this.h / 2 - p[1] * e
                    } else {
                        var d = a[this.clickedCountryId = c];
                        s = this.w / 2 - this.xScale(d[0]) * e, u = this.h / 2 - this.yScale(d[1]) * e - .15 * this.h
                    }
                    if (this.svg.transition().duration(r).ease(i ? Fl : Rl).call(this.zoom.transform, Zl.translate(s, u).scale(e)), this.render(), !this.firstZoomTo) return this.firstZoomTo = !0, n
                }
            }, {
                key: "_zoomed",
                value: function () {
                    var t = this,
                        r = this.nodes;
                    this.t = N.transform, this.kZoom = N.transform.k, this.scatterGroup.attr("transform", N.transform), this.mapMode && this.mapBox.attr("transform", N.transform), this.points.select("circle").style("stroke-width", .5 / this.kZoom).attr("r", function (e, n) {
                        return gi(r[n].radius) ? 0 : r[n].radius / t.kZoom
                    }), this.symbol.size(64 / (this.kZoom * this.kZoom)), this.points.select("path").style("stroke-width", .5 / this.kZoom).attr("d", function () {
                        return t.symbol.type(Hd)()
                    }), this.updateText()
                }
            }, {
                key: "zoomOut",
                value: function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1e3;
                    this.svg.transition().duration(e).call(this.zoom.transform, Zl.scale(1)), this.reset()
                }
            }, {
                key: "zoomOutABit",
                value: function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1e3;
                    this.svg.transition().duration(e).call(this.zoom.transform, Zl.translate(.1 * this.w, .1 * this.h).scale(.8)), this.currentlyZooming = !1
                }
            }, {
                key: "reset",
                value: function () {
                    this.clickedCountryId = void 0, this.activeCountries = void 0, this.actions.onSvgClick(), this.render()
                }
            }, {
                key: "setNodeValue",
                value: function (e) {
                    var n = this.radiusParam,
                        t = this.colorParam,
                        r = this.colorScale,
                        i = e.countryId,
                        o = e.key,
                        a = e.value;
                    if (o === n && void 0 !== i && (this.updateRadiusDomian(), this.nodes[i].radius = this.rScale(a)), o === t && void 0 !== i) {
                        var l = this.nodes[i];
                        l.color = "indicator" === t ? Tf(l) : gi(+l[t]) ? "#ccc" : r(a)
                    }
                    this.render()
                }
            }, {
                key: "removeMap",
                value: function () {
                    this.mapMode = !1, this.mapBox.style("opacity", .3).transition().duration(500).style("opacity", 0).remove()
                }
            }, {
                key: "setFont",
                value: function (e) {
                    this.fontFamily = e
                }
            }, {
                key: "getWidth",
                value: function () {
                    var e = this.svg;
                    return e.node().parentNode.clientWidth || e.node().parentNode.width.animVal.value
                }
            }, {
                key: "getHeight",
                value: function () {
                    var e = this.svg;
                    return e.node().parentNode.clientHeight || e.node().parentNode.height.animVal.value
                }
            }]), t
        }(),
        hh = bh(["\n  text-align: center;\n"], ["\n  text-align: center;\n"]),
        yh = bh(["\n  label: tool;\n  font-size: 9px;\n  border-radius: 0.3rem;\n  padding: 0.3rem;\n  text-align: center;\n  transform: translateX(-25%);\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  left: calc(", "px);\n  transition: opacity 0.3s;\n  background-color: ", ";\n  visibility: visible;\n  opacity: 1;\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"], ["\n  label: tool;\n  font-size: 9px;\n  border-radius: 0.3rem;\n  padding: 0.3rem;\n  text-align: center;\n  transform: translateX(-25%);\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  left: calc(", "px);\n  transition: opacity 0.3s;\n  background-color: ", ";\n  visibility: visible;\n  opacity: 1;\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"]),
        mh = bh(["\n  label: text;\n  max-width: 100%;\n  padding-bottom: 0.3rem;\n  text-align: center;\n  pointer-events: none;\n  font-size: 10.5px;\n  line-height: 11px;\n  // text-transform: capitalize;\n"], ["\n  label: text;\n  max-width: 100%;\n  padding-bottom: 0.3rem;\n  text-align: center;\n  pointer-events: none;\n  font-size: 10.5px;\n  line-height: 11px;\n  // text-transform: capitalize;\n"]),
        gh = bh(["\n  label: value;\n  float: ", ";\n  font-size: 10px;\n  display: inline-block;\n  position: absolute;\n  display: block;\n  font-size: 10px;\n  font-weight: 100;\n  font-size: 9px;\n  // color: ", ";\n  // transform: translateY(-50%);\n  transform: translateY(-35%);\n  display: inline-block;\n  ", ";\n"], ["\n  label: value;\n  float: ", ";\n  font-size: 10px;\n  display: inline-block;\n  position: absolute;\n  display: block;\n  font-size: 10px;\n  font-weight: 100;\n  font-size: 9px;\n  // color: ", ";\n  // transform: translateY(-50%);\n  transform: translateY(-35%);\n  display: inline-block;\n  ", ";\n"]),
        vh = bh(["\n  label: counter;\n  font-size: 10px;\n  margin-top: 0.3rem;\n  display: block;\n"], ["\n  label: counter;\n  font-size: 10px;\n  margin-top: 0.3rem;\n  display: block;\n"]),
        Ph = bh(["\n  position: relative;\n  display: inline-block;\n  padding: 0.4rem 0rem;\n  text-align: center;\n  width: 100%;\n  margin: 0;\n\n  &.hidden {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n\n  > input::focus {\n    outline: none;\n  }\n\n  > input::-moz-focus-outer {\n    border: 0;\n  }\n\n  > input {\n    appearance: none;\n    width: 75%;\n    padding: 0;\n    margin: 0;\n    border: 0;\n    height: 3px;\n\n    &.left {\n      &::-webkit-slider-runnable-track {\n        background-image: linear-gradient(to left, ", ", ", ");\n        height: 3px;\n      }\n      &::-moz-range-track {\n        background-image: linear-gradient(to left, ", ", ", ");\n        background-size: 100% 0.2rem;\n      }\n      &::-ms-track {\n      background-image: linear-gradient(to left, ", ", ", ");\n      background-size: 100% 0.2rem;\n      }\n    }\n\n    &.right {\n      &::-webkit-slider-runnable-track {\n        background-image: linear-gradient(to right, ", ", ", ");\n        height: 3px;\n      }\n      &::-moz-range-track {\n        background-image: linear-gradient(to right, ", ", ", ");\n        background-size: 100% 0.2rem;\n      }\n      &::-ms-track {\n      background-image: linear-gradient(to right, ", ", ", ");\n      background-size: 100% 0.2rem;\n\n      }\n    }\n  }\n\n  > input::-webkit-slider-runnable-track {\n    width: 100%;\n    // height: 0.2rem;\n    padding: 0;\n    border: 0;\n    vertical-align: middle;\n    cursor: pointer;\n    box-shadow: none;\n  }\n\n  > input::-moz-range-track {\n    width: 100%;\n    height: 3px;\n    padding: 0;\n    border: 0;\n    vertical-align: middle;\n    cursor: pointer;\n    box-shadow: none;\n  }\n\n  > input::-ms-track {\n    appearance: none;\n    width: 100%;\n    height: 3px;\n  }\n\n  > input::-ms-fill-lower {\n    box-shadow: none;\n  }\n\n  > input::-ms-fill-upper {\n    box-shadow: none;\n  }\n\n  > input::-webkit-slider-thumb {\n    box-sizing: border-box;\n    appearance: none;\n    box-shadow: none;\n    width: 10px;\n    height: 10px;\n    margin -3.5px 0;\n    // margin-top: -4px;\n    border-radius: 50%;\n    background: white;\n    cursor: pointer;\n  }\n\n  input::-moz-range-thumb {\n    box-sizing: border-box;\n    appearance: none;\n    box-shadow: none;\n    border: none;\n    width: 10px;\n    height: 10px;\n    margin-top: -4px;\n    border-radius: 50%;\n    background: white;\n    cursor: pointer;\n  }\n\n  > input::-ms-thumb {\n    border: none;\n    height: 8px;\n    width: 8px;\n    border-radius: 50%;\n    background: white;\n  }\n"], ["\n  position: relative;\n  display: inline-block;\n  padding: 0.4rem 0rem;\n  text-align: center;\n  width: 100%;\n  margin: 0;\n\n  &.hidden {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n\n  > input::focus {\n    outline: none;\n  }\n\n  > input::-moz-focus-outer {\n    border: 0;\n  }\n\n  > input {\n    appearance: none;\n    width: 75%;\n    padding: 0;\n    margin: 0;\n    border: 0;\n    height: 3px;\n\n    &.left {\n      &::-webkit-slider-runnable-track {\n        background-image: linear-gradient(to left, ", ", ", ");\n        height: 3px;\n      }\n      &::-moz-range-track {\n        background-image: linear-gradient(to left, ", ", ", ");\n        background-size: 100% 0.2rem;\n      }\n      &::-ms-track {\n      background-image: linear-gradient(to left, ", ", ", ");\n      background-size: 100% 0.2rem;\n      }\n    }\n\n    &.right {\n      &::-webkit-slider-runnable-track {\n        background-image: linear-gradient(to right, ", ", ", ");\n        height: 3px;\n      }\n      &::-moz-range-track {\n        background-image: linear-gradient(to right, ", ", ", ");\n        background-size: 100% 0.2rem;\n      }\n      &::-ms-track {\n      background-image: linear-gradient(to right, ", ", ", ");\n      background-size: 100% 0.2rem;\n\n      }\n    }\n  }\n\n  > input::-webkit-slider-runnable-track {\n    width: 100%;\n    // height: 0.2rem;\n    padding: 0;\n    border: 0;\n    vertical-align: middle;\n    cursor: pointer;\n    box-shadow: none;\n  }\n\n  > input::-moz-range-track {\n    width: 100%;\n    height: 3px;\n    padding: 0;\n    border: 0;\n    vertical-align: middle;\n    cursor: pointer;\n    box-shadow: none;\n  }\n\n  > input::-ms-track {\n    appearance: none;\n    width: 100%;\n    height: 3px;\n  }\n\n  > input::-ms-fill-lower {\n    box-shadow: none;\n  }\n\n  > input::-ms-fill-upper {\n    box-shadow: none;\n  }\n\n  > input::-webkit-slider-thumb {\n    box-sizing: border-box;\n    appearance: none;\n    box-shadow: none;\n    width: 10px;\n    height: 10px;\n    margin -3.5px 0;\n    // margin-top: -4px;\n    border-radius: 50%;\n    background: white;\n    cursor: pointer;\n  }\n\n  input::-moz-range-thumb {\n    box-sizing: border-box;\n    appearance: none;\n    box-shadow: none;\n    border: none;\n    width: 10px;\n    height: 10px;\n    margin-top: -4px;\n    border-radius: 50%;\n    background: white;\n    cursor: pointer;\n  }\n\n  > input::-ms-thumb {\n    border: none;\n    height: 8px;\n    width: 8px;\n    border-radius: 50%;\n    background: white;\n  }\n"]),
        xh = bh(["\n  width: 2px;\n  height: 4px;\n  background-color: #ccc;\n  position: absolute;\n  bottom: 9px;\n  margin-left: 5px;\n  z-index: -10;\n"], ["\n  width: 2px;\n  height: 4px;\n  background-color: #ccc;\n  position: absolute;\n  bottom: 9px;\n  margin-left: 5px;\n  z-index: -10;\n"]);

    function bh(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var wh = ah(hh),
        Dh = function (e) {
            return ah(yh, e.left, Lf)
        },
        Gh = ah(mh),
        Ch = function (e) {
            return ah(gh, "min" == e.pos ? "left" : "right", Mf, "min" == e.pos ? "right: 90%" : "left: 90%")
        },
        Sh = (ah(vh), ah(Ph, Nf, jf, Nf, jf, Nf, jf, Nf, jf, Nf, jf, Nf, jf)),
        Ih = ah(xh),
        Mh = function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }();
    var kh = function () {
            function u(e, n, t, r, i, o, a, l) {
                var c = this;
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, u), this.maxValue = n[1], this.el = e.attr("class", wh), this.callback = l, this.defaultValue = t, this.title = r, this.formatter = o;
                var s = (Math.abs(n[0]) + Math.abs(n[1])) / 150;
                this.range = this.el.append("div").attr("class", Sh), this.range.append("div").attr("class", Gh).text(r), this.range.append("div").attr("class", Ch({
                    pos: "min"
                })).text("Perplexity" === r ? n[0] : o(n[0])), this.range.append("div").attr("class", Ch({
                    pos: "max"
                })).text("Perplexity" === r ? n[1] : o(n[1])), "Perplexity" !== r && (this.tick = this.range.append("div").attr("class", Ih)), this.handle = this.range.append("input").attr("type", "range").attr("min", "" + n[0]).attr("max", "" + n[1]).attr("step", "" + (t % 1 == 0 ? s.toFixed() : s.toFixed(2))).attr("onkeydown", "return false;"), this.tooltip = this.range.append("div").attr("class", Dh({
                    left: 23
                })).text("s").classed("hidden", !0), -1 !== Df.indexOf(a) ? this.handle.classed("left", !0) : this.handle.classed("right", !0), this.handle.on("input", function () {
                    c.updateValue(c.getValue(), !0), l(c.getValue())
                }).on("change", function () {
                    c.updateValue(c.getValue(), !1)
                }).on("mouseover", function () {
                    c.tooltip.classed("hidden", !1)
                }).on("mouseout", function () {
                    c.tooltip.classed("hidden", !0)
                }), this.updateValue(t)
            }
            return Mh(u, [{
                key: "updateTick",
                value: function (e) {
                    var n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                        t = this.defaultValue % 1 == 0 ? (+e).toFixed() : (+e).toFixed(2),
                        r = this.handle.node(),
                        i = (+t - r.min) / (r.max - r.min),
                        o = (this.handle.node().clientWidth - 10) * i;
                    return this.tick.style("left", o + 23).style("visibility", n ? "hidden" : "visible"), this
                }
            }, {
                key: "updateValue",
                value: function (e) {
                    var n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                        t = this.title,
                        r = this.formatter;
                    this.handle.property("value", "" + e);
                    var i = this.defaultValue % 1 == 0 ? (+e).toFixed() : (+e).toFixed(2),
                        o = this.handle.node(),
                        a = (+i - o.min) / (o.max - o.min),
                        l = (this.handle.node().clientWidth - 10) * a,
                        c = "Perplexity" === t ? i : r(+i);
                    return this.tooltip.text(c).attr("class", Dh({
                        left: l + 23
                    })), this.tooltip.classed("hidden", !n), this
                }
            }, {
                key: "slowlyUpdateValueTo",
                value: function (n) {
                    var t = this,
                        r = (+this.getValue() - n) / 15;
                    this.timer = ue(function () {
                        var e = +t.getValue();
                        n < e - r ? t.updateValue(e - r, !0) : (t.updateValue(n, !1), t.callback(n), t.timer.stop())
                    }, 150)
                }
            }, {
                key: "updateVisibility",
                value: function (e) {
                    return this.range.classed("hidden", !e), this
                }
            }, {
                key: "getValue",
                value: function () {
                    return this.handle.node().value
                }
            }, {
                key: "setFont",
                value: function (e) {
                    this.fontFamily = e
                }
            }, {
                key: "getWidth",
                value: function () {
                    return this.width
                }
            }, {
                key: "getHeight",
                value: function () {
                    return this.height
                }
            }]), u
        }(),
        Ah = Lh(["\n  padding: 0.25rem 0;\n  position: relative;\n"], ["\n  padding: 0.25rem 0;\n  position: relative;\n"]),
        _h = Lh(["\n  display: inline-block;\n  margin-left: 1.25rem;\n  // text-transform: uppercase;\n  cursor: pointer;\n  // font-size: 10px;\n  font-size: 10.5px;\n  line-height: 11px;\n  // text-transform: capitalize;\n"], ["\n  display: inline-block;\n  margin-left: 1.25rem;\n  // text-transform: uppercase;\n  cursor: pointer;\n  // font-size: 10px;\n  font-size: 10.5px;\n  line-height: 11px;\n  // text-transform: capitalize;\n"]),
        Oh = Lh(["\n  position: absolute;\n  display: inline-block;\n  float: left;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n\n  input[type='checkbox'] {\n    display: none;\n  }\n\n  .toggle {\n    cursor: pointer;\n    position: relative;\n    width: 6px;\n    height: 6px;\n    border: 1px solid ", ";\n    border-radius: 1px;\n\n    &:after {\n      content: '';\n      position: absolute;\n      width: 6px;\n      height: 6px;\n      transition: background 0.125s;\n    }\n  }\n\n  input[type='checkbox']:checked + .toggle:after {\n    background: ", ";\n    content: url(", ");\n  }\n"], ["\n  position: absolute;\n  display: inline-block;\n  float: left;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n\n  input[type='checkbox'] {\n    display: none;\n  }\n\n  .toggle {\n    cursor: pointer;\n    position: relative;\n    width: 6px;\n    height: 6px;\n    border: 1px solid ", ";\n    border-radius: 1px;\n\n    &:after {\n      content: '';\n      position: absolute;\n      width: 6px;\n      height: 6px;\n      transition: background 0.125s;\n    }\n  }\n\n  input[type='checkbox']:checked + .toggle:after {\n    background: ", ";\n    content: url(", ");\n  }\n"]);

    function Lh(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var Eh = ah(Ah),
        Nh = ah(_h),
        jh = ah(Oh, kf, kf, "data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20data-prefix%3D%22fas%22%20data-icon%3D%22check%22%20class%3D%22svg-inline--fa%20fa-check%20fa-w-16%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22%23CFD0D6%22%20d%3D%22M173.898%20439.404l-166.4-166.4c-9.997-9.997-9.997-26.206%200-36.204l36.203-36.204c9.997-9.998%2026.207-9.998%2036.204%200L192%20312.69%20432.095%2072.596c9.997-9.997%2026.207-9.997%2036.204%200l36.203%2036.204c9.997%209.997%209.997%2026.206%200%2036.204l-294.4%20294.401c-9.998%209.997-26.207%209.997-36.204-.001z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"),
        Th = function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }();
    var $h = function () {
            function n(e) {
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, n), this.el = e.attr("class", Eh), this.title = this.el.append("label").attr("class", Nh), this.checkbox = this.el.append("div").attr("class", jh), this.input = this.checkbox.append("input").attr("type", "checkbox").attr("id", ""), this.toggle = this.checkbox.append("div").attr("class", "toggle")
            }
            return Th(n, [{
                key: "setData",
                value: function (e) {
                    return this.input.attr("id", e.title), this.checked = e.checked, this.title.attr("for", e.title).text(e.title), this.input.property("checked", e.checked), this
                }
            }, {
                key: "setActions",
                value: function (e) {
                    var n = this;
                    return this.action = e, this.title.on("click", function () {
                        n.checked = !n.checked, e(n.checked)
                    }), this.toggle.on("click", function () {
                        n.checked = !n.checked, n.update(), e(n.checked)
                    }), this
                }
            }, {
                key: "check",
                value: function (e) {
                    this.action;
                    return this.checked = void 0 !== e ? e : !this.checked, this.update(), this.checked
                }
            }, {
                key: "update",
                value: function () {
                    this.input.property("checked", this.checked)
                }
            }, {
                key: "setFont",
                value: function (e) {
                    this.fontFamily = e
                }
            }, {
                key: "getWidth",
                value: function () {
                    return this.width
                }
            }, {
                key: "getHeight",
                value: function () {
                    return this.height
                }
            }]), n
        }(),
        zh = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%20%20%20%20%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h20v20H0V0z%22%2F%3E%20%20%20%20%3Cpath%20d%3D%22M15.95%2010.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12%202.34c-.03-.2-.2-.34-.4-.34H8.4c-.2%200-.36.14-.39.34l-.3%202.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39%200-.49.18l-1.6%202.77c-.1.18-.06.39.1.51l1.69%201.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37%2012.1c-.15.12-.19.34-.1.51l1.6%202.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58%201.35.78l.3%202.12c.04.2.2.34.4.34h3.2c.2%200%20.37-.14.39-.34l.3-2.12c.49-.2.94-.47%201.35-.78l1.99.8c.18.07.39%200%20.49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10%2013c-1.65%200-3-1.35-3-3s1.35-3%203-3%203%201.35%203%203-1.35%203-3%203z%22%20fill%3D%22%239B9BA5%22%2F%3E%3C%2Fsvg%3E",
        Bh = "data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20data-prefix%3D%22fas%22%20data-icon%3D%22chevron-right%22%20class%3D%22svg-inline--fa%20fa-chevron-right%20fa-w-10%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%3E%3Cpath%20fill%3D%22%239B9BA5%22%20d%3D%22M285.476%20272.971L91.132%20467.314c-9.373%209.373-24.569%209.373-33.941%200l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505%20256%2034.484%20101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373%2024.569-9.373%2033.941%200L285.475%20239.03c9.373%209.372%209.373%2024.568.001%2033.941z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
        qh = Kh(["\n  width: ", ";\n"], ["\n  width: ", ";\n"]),
        Fh = Kh(["\n  label: controlPanel;\n  font-size: 10pt;\n  color: ", ";\n  position: fixed;\n  right: 0;\n  top: calc(50% + 25px);\n  transform: translateY(-50%);\n  margin: 0 0.5rem;\n  scrollbar-width: thin;\n  border-radius: 0.3rem;\n  backdrop-filter: blur(3px);\n  background-color: ", ";\n  width: ", ";\n  min-height: calc(60% - 44px - 2rem);\n  max-height: calc(100% - 44px - 2rem);\n  overflow-x: hidden;\n  overflow-y: hidden;\n  transition: right 300ms, visibility 300ms;\n\n  :hover {\n    scrollbar-width: thin;\n    overflow-y: scroll;\n  }\n\n  &.hidden {\n    visibility: hidden;\n    right: calc(-", "px - 0.5rem);\n  }\n"], ["\n  label: controlPanel;\n  font-size: 10pt;\n  color: ", ";\n  position: fixed;\n  right: 0;\n  top: calc(50% + 25px);\n  transform: translateY(-50%);\n  margin: 0 0.5rem;\n  scrollbar-width: thin;\n  border-radius: 0.3rem;\n  backdrop-filter: blur(3px);\n  background-color: ", ";\n  width: ", ";\n  min-height: calc(60% - 44px - 2rem);\n  max-height: calc(100% - 44px - 2rem);\n  overflow-x: hidden;\n  overflow-y: hidden;\n  transition: right 300ms, visibility 300ms;\n\n  :hover {\n    scrollbar-width: thin;\n    overflow-y: scroll;\n  }\n\n  &.hidden {\n    visibility: hidden;\n    right: calc(-", "px - 0.5rem);\n  }\n"]),
        Rh = Kh(["\n  margin: 0.5rem 1rem 1rem;\n  color: ", ";\n  &.hidden {\n    display: none;\n  }\n"], ["\n  margin: 0.5rem 1rem 1rem;\n  color: ", ";\n  &.hidden {\n    display: none;\n  }\n"]),
        Uh = Kh(["\n  label: reset;\n  width: 115px;\n  border-radius: 3rem;\n  margin: auto;\n  font-size: 10px;\n  color: ", ";\n  text-align: center;\n  height: 15px;\n  line-height: 15px;\n  border: 1px solid ", ";\n  text-align: center;\n  cursor: pointer;\n\n  &:hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"], ["\n  label: reset;\n  width: 115px;\n  border-radius: 3rem;\n  margin: auto;\n  font-size: 10px;\n  color: ", ";\n  text-align: center;\n  height: 15px;\n  line-height: 15px;\n  border: 1px solid ", ";\n  text-align: center;\n  cursor: pointer;\n\n  &:hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"]),
        Yh = Kh(["\n  color: ", ";\n  margin: 0.75rem 1rem;\n  font-size: 14px;\n  text-align: center;\n  text-transform: uppercase;\n"], ["\n  color: ", ";\n  margin: 0.75rem 1rem;\n  font-size: 14px;\n  text-align: center;\n  text-transform: uppercase;\n"]),
        Hh = Kh(["\n  position: fixed;\n  right: 0.5rem;\n  transform: translateY(-50%);\n  top: 50%;\n  transition: right 0.3s, opacity 0.5s;\n  height: 24px;\n  width: 24px;\n  background: ", ";\n  border-radius: 50px;\n  opacity: 1;\n  &:hover,\n  &:focus {\n    cursor: pointer;\n  }\n  &.close {\n    right: calc(", "px + 1rem);\n    transition: right 300ms;\n  }\n\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"], ["\n  position: fixed;\n  right: 0.5rem;\n  transform: translateY(-50%);\n  top: 50%;\n  transition: right 0.3s, opacity 0.5s;\n  height: 24px;\n  width: 24px;\n  background: ", ";\n  border-radius: 50px;\n  opacity: 1;\n  &:hover,\n  &:focus {\n    cursor: pointer;\n  }\n  &.close {\n    right: calc(", "px + 1rem);\n    transition: right 300ms;\n  }\n\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"]),
        Vh = Kh(["\n  label: closeButton;\n  margin: auto;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n\n  &.close {\n    background: url(", ") no-repeat center center;\n  }\n"], ["\n  label: closeButton;\n  margin: auto;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n\n  &.close {\n    background: url(", ") no-repeat center center;\n  }\n"]),
        Wh = Kh(["\n  label: titleText;\n  font-size: 12px;\n  margin: 1rem 0;\n  text-align: center;\n  text-transform: uppercase;\n"], ["\n  label: titleText;\n  font-size: 12px;\n  margin: 1rem 0;\n  text-align: center;\n  text-transform: uppercase;\n"]),
        Zh = Kh(["\n  label: titleTexty;\n  max-width: 90%;\n  font-size: 16px;\n  font-weight: 400;\n  text-align: center;\n  margin-top: 40px;\n  margin-left: 20px;\n  margin-right: 20px;\n"], ["\n  label: titleTexty;\n  max-width: 90%;\n  font-size: 16px;\n  font-weight: 400;\n  text-align: center;\n  margin-top: 40px;\n  margin-left: 20px;\n  margin-right: 20px;\n"]);

    function Kh(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var Xh = ah(qh, 240),
        Jh = ah(Fh, "rgba(255, 255, 255, 1)", Lf, 240, 240),
        Qh = ah(Rh, Of),
        ey = ah(Uh, Mf, Mf, Ef, Ef),
        ny = ah(Yh, Of),
        ty = ah(Hh, Lf, 240),
        ry = ah(Vh, zh, Bh),
        iy = (ah(Wh), ah(Zh), function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }());
    var oy = function () {
            function r(e, n) {
                var t = this;
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, r), this.root = e, this.el = this.root.append("div").attr("class", "" + Jh), this.content = this.el.append("div").attr("class", "" + Xh), this.updateTsne = n, this.isOpen = !1, this.countryMode = !1, this.menuButton = this.root.append("div").attr("class", ty).on("click", function () {
                    t.isOpen = !t.isOpen, t.el.classed("hidden", !t.isOpen), t.menuButton.classed("close", t.isOpen), t.icon.classed("close", t.isOpen)
                }), this.icon = this.menuButton.append("div").attr("class", ry), this.el.classed("hidden", !this.isOpen), this.menuButton.classed("hidden", !0), this.panelTitle = this.content.append("div").attr("class", ny).text("t-SNE Controls"), this.resetButton = this.content.append("div").attr("class", ey).text("reset general settings"), this.interactivePanel = this.content.append("div").attr("class", Qh), this.countryPanel = this.content.append("div").attr("class", Qh), this.countryPanel.classed("hidden", !0), this.setGeneralPanel(n), this.setCountryPanel()
            }
            return iy(r, [{
                key: "update",
                value: function (e) {
                    this.isOpen = e, this.el.classed("hidden", !this.isOpen), this.menuButton.classed("close", this.isOpen), this.icon.classed("close", this.isOpen)
                }
            }, {
                key: "setGeneralPanel",
                value: function (n) {
                    this.perplexitySliderContainer = this.interactivePanel.append("div"), this.perplexitySlider = new kh(this.perplexitySliderContainer, [0, 50], 4, "Perplexity", 230, null, null, function (e) {
                        n({
                            perplexity: e
                        })
                    })
                }
            }, {
                key: "setCountryPanel",
                value: function () {
                    this.countrySliders = {}, this.sliderContainer = this.countryPanel.append("div")
                }
            }, {
                key: "createCountryPanel",
                value: function (n) {
                    this.countrySliders[n.title] = new kh(this.sliderContainer, n.feature.extent, n.feature.extent[0], n.title, 200, n.formatter, n.allKeys.indexOf(n.title), function (e) {
                        n.action(e)
                    })
                }
            }, {
                key: "setupMode",
                value: function (e) {
                    this.countryMode = e, this.interactivePanel.classed("hidden", e), this.countryPanel.classed("hidden", !e), this.content.node().scrollTop = 0, this.resetButton.text(e ? "reset country settings" : "reset general settings")
                }
            }, {
                key: "scrollToHealthExpenditure",
                value: function (e) {
                    var i = this,
                        n = 0;
                    this.timer = ue(function () {
                        if (n < 450) n += 50, i.content.node().scrollTop = n;
                        else {
                            i.timer.stop();
                            var r = pi(i.countrySliders);
                            e.forEach(function (e, n) {
                                var t = Li(r, e);
                                0 === n ? i.countrySliders[r[t]].slowlyUpdateValueTo(736) : i.countrySliders[r[t]].slowlyUpdateValueTo(4.14)
                            })
                        }
                    }, 100)
                }
            }, {
                key: "setupCheckbox",
                value: function (e) {
                    var n = this.interactivePanel.append("div"),
                        t = new $h(n);
                    return t.setData({
                        title: e.title,
                        checked: e.checked
                    }).setActions(e.action), t
                }
            }, {
                key: "setResetAction",
                value: function (e) {
                    var n = this;
                    this.resetButton.on("click", function () {
                        n.countryMode ? e.resetCountry() : (n.perplexitySlider.updateValue(4), e.resetSettings())
                    })
                }
            }, {
                key: "setFont",
                value: function (e) {
                    this.fontFamily = e
                }
            }, {
                key: "getWidth",
                value: function () {
                    return this.width
                }
            }, {
                key: "getHeight",
                value: function () {
                    return this.height
                }
            }]), r
        }(),
        ay = "data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20data-prefix%3D%22fas%22%20data-icon%3D%22times%22%20class%3D%22svg-inline--fa%20fa-times%20fa-w-11%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20352%20512%22%3E%3Cpath%20fill%3D%22%239B9BA5%22%20d%3D%22M242.72%20256l100.07-100.07c12.28-12.28%2012.28-32.19%200-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48%200L176%20189.28%2075.93%2089.21c-12.28-12.28-32.19-12.28-44.48%200L9.21%20111.45c-12.28%2012.28-12.28%2032.19%200%2044.48L109.28%20256%209.21%20356.07c-12.28%2012.28-12.28%2032.19%200%2044.48l22.24%2022.24c12.28%2012.28%2032.2%2012.28%2044.48%200L176%20322.72l100.07%20100.07c12.28%2012.28%2032.2%2012.28%2044.48%200l22.24-22.24c12.28-12.28%2012.28-32.19%200-44.48L242.72%20256z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
        ly = my(["\n  label: arrow;\n  height: 18px;\n  width: 11px;\n  top: calc(50% - 1rem);\n  margin: auto;\n  position: absolute;\n  transform: translateY(-50%);\n  ", ";\n  cursor: pointer;\n  background-repeat: no-repeat;\n\n  &.hidden {\n    pointer-events: none;\n    opacity: 0.35;\n  }\n"], ["\n  label: arrow;\n  height: 18px;\n  width: 11px;\n  top: calc(50% - 1rem);\n  margin: auto;\n  position: absolute;\n  transform: translateY(-50%);\n  ", ";\n  cursor: pointer;\n  background-repeat: no-repeat;\n\n  &.hidden {\n    pointer-events: none;\n    opacity: 0.35;\n  }\n"]),
        cy = my(["\n  display: inline-block;\n  height: auto;\n  width: 3rem;\n  position: relative;\n  opacity: 1;\n  transition: opacity 0.5s;\n  cursor: pointer;\n\n  path {\n    fill: ", ";\n  }\n\n  :hover {\n    path {\n      fill: ", ";\n    }\n  }\n\n  &.hidden {\n    width: 0;\n    opacity: 0;\n    visibility: hidden;\n  }\n\n  &.empty {\n    margin: 0;\n  }\n"], ["\n  display: inline-block;\n  height: auto;\n  width: 3rem;\n  position: relative;\n  opacity: 1;\n  transition: opacity 0.5s;\n  cursor: pointer;\n\n  path {\n    fill: ", ";\n  }\n\n  :hover {\n    path {\n      fill: ", ";\n    }\n  }\n\n  &.hidden {\n    width: 0;\n    opacity: 0;\n    visibility: hidden;\n  }\n\n  &.empty {\n    margin: 0;\n  }\n"]),
        sy = my(["\n  display: flex;\n  width: 100%;\n"], ["\n  display: flex;\n  width: 100%;\n"]),
        uy = my(["\n  color: ", ";\n  display: inline-block;\n  margin-bottom: 1rem;\n  margin-top: 0.5rem;\n  // margin-bottom: 1.5rem;\n  width: 100%;\n  font-size: 14px;\n  line-height: 1.25rem;\n  text-align: justify;\n  p {\n    margin: 0.5rem 0rem;\n    padding: 0;\n  }\n  span {\n    margin: 0.5rem 0rem;\n    padding: 0;\n  }\n  &.empty {\n    margin: 0;\n  }\n"], ["\n  color: ", ";\n  display: inline-block;\n  margin-bottom: 1rem;\n  margin-top: 0.5rem;\n  // margin-bottom: 1.5rem;\n  width: 100%;\n  font-size: 14px;\n  line-height: 1.25rem;\n  text-align: justify;\n  p {\n    margin: 0.5rem 0rem;\n    padding: 0;\n  }\n  span {\n    margin: 0.5rem 0rem;\n    padding: 0;\n  }\n  &.empty {\n    margin: 0;\n  }\n"]),
        py = my(["\n  position: absolute;\n  left: 50%;\n  bottom: 0%;\n  transform: translateX(-50%);\n  background-color: ", ";\n  max-width: 45%;\n  margin: 1rem 0rem;\n  padding: 0.5rem;\n  border-radius: 0.3rem;\n  backdrop-filter: blur(3px);\n  box-shadow: 2px 2px 11px -4px #14151c;\n  transition: bottom 300ms, visibility 300ms;\n\n  &.hidden {\n    bottom: calc(-", "px - 0.5rem);\n    visibility: hidden;\n  }\n\n  .story-title {\n    color: ", ";\n    // margin: 0.75rem 1rem;\n    margin: 0.3rem 1rem;\n    line-height: 2.5rem;\n    font-size: 1.5rem;\n    font-weight: 100;\n    text-align: center;\n    text-transform: uppercase;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n    font-weight: bold;\n    &:hover {\n      color: ", ";\n    }\n  }\n"], ["\n  position: absolute;\n  left: 50%;\n  bottom: 0%;\n  transform: translateX(-50%);\n  background-color: ", ";\n  max-width: 45%;\n  margin: 1rem 0rem;\n  padding: 0.5rem;\n  border-radius: 0.3rem;\n  backdrop-filter: blur(3px);\n  box-shadow: 2px 2px 11px -4px #14151c;\n  transition: bottom 300ms, visibility 300ms;\n\n  &.hidden {\n    bottom: calc(-", "px - 0.5rem);\n    visibility: hidden;\n  }\n\n  .story-title {\n    color: ", ";\n    // margin: 0.75rem 1rem;\n    margin: 0.3rem 1rem;\n    line-height: 2.5rem;\n    font-size: 1.5rem;\n    font-weight: 100;\n    text-align: center;\n    text-transform: uppercase;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n    font-weight: bold;\n    &:hover {\n      color: ", ";\n    }\n  }\n"]),
        dy = my(["\n  label: openButton;\n  position: fixed;\n  bottom: 1rem;\n  left: calc(50% - 0.25rem - 12px);\n  transition: opacity 0.5s;\n  margin-right: 2rem;\n  height: 24px;\n  width: 24px;\n  border-radius: 50px;\n  opacity: 1;\n  background: ", ";\n\n  &:hover,\n  &:focus {\n    cursor: pointer;\n  }\n\n  &.hidden {\n    transition: visibility 0.5s;\n    opacity: 0;\n    visibility: hidden;\n  }\n"], ["\n  label: openButton;\n  position: fixed;\n  bottom: 1rem;\n  left: calc(50% - 0.25rem - 12px);\n  transition: opacity 0.5s;\n  margin-right: 2rem;\n  height: 24px;\n  width: 24px;\n  border-radius: 50px;\n  opacity: 1;\n  background: ", ";\n\n  &:hover,\n  &:focus {\n    cursor: pointer;\n  }\n\n  &.hidden {\n    transition: visibility 0.5s;\n    opacity: 0;\n    visibility: hidden;\n  }\n"]),
        fy = my(["\n  label: openIcon;\n  margin: auto;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n"], ["\n  label: openIcon;\n  margin: auto;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n"]),
        hy = my(["\n  label: closeButton;\n  position: absolute;\n  bottom: calc(", "px - 1.25rem);\n  left: calc(50% + ", "px - 1.85rem);\n  transition: visibility 0s, opacity 0.3s;\n  transition-delay: 0.3s;\n  margin-right: 2rem;\n  height: 12px;\n  width: 12px;\n  border-radius: 50px;\n  opacity: 1;\n\n  path {\n    fill: ", ";\n  }\n\n  :hover {\n    cursor: pointer;\n    path {\n      fill: ", ";\n    }\n  }\n\n  // &:hover,\n  // &:focus {\n  //   cursor: pointer;\n  // }\n\n  &.hidden {\n    transition-delay: 0s;\n    visibility: hidden;\n    opacity: 0;\n  }\n"], ["\n  label: closeButton;\n  position: absolute;\n  bottom: calc(", "px - 1.25rem);\n  left: calc(50% + ", "px - 1.85rem);\n  transition: visibility 0s, opacity 0.3s;\n  transition-delay: 0.3s;\n  margin-right: 2rem;\n  height: 12px;\n  width: 12px;\n  border-radius: 50px;\n  opacity: 1;\n\n  path {\n    fill: ", ";\n  }\n\n  :hover {\n    cursor: pointer;\n    path {\n      fill: ", ";\n    }\n  }\n\n  // &:hover,\n  // &:focus {\n  //   cursor: pointer;\n  // }\n\n  &.hidden {\n    transition-delay: 0s;\n    visibility: hidden;\n    opacity: 0;\n  }\n"]),
        yy = my(["\n  label: closeIcon;\n  margin-left: auto;\n  position: relative;\n  top: 15%;\n  transform: translateY(-50%);\n  // background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n\n  \n"], ["\n  label: closeIcon;\n  margin-left: auto;\n  position: relative;\n  top: 15%;\n  transform: translateY(-50%);\n  // background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n\n  \n"]);

    function my(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var gy = function (e) {
            return ah(ly, "left" === e.direction ? "left: 25%;" : "right: 25%;")
        },
        vy = ah(cy, Mf, Ef),
        Py = ah(sy),
        xy = ah(uy, Mf),
        by = ah(py, Lf, 650, Of, Mf, Ef),
        wy = ah(fy, "data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20data-prefix%3D%22fas%22%20data-icon%3D%22comment%22%20class%3D%22svg-inline--fa%20fa-comment%20fa-w-16%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22%239B9BA5%22%20d%3D%22M256%2032C114.6%2032%200%20125.1%200%20240c0%2049.6%2021.4%2095%2057%20130.7C44.5%20421.1%202.7%20466%202.2%20466.5c-2.2%202.3-2.8%205.7-1.5%208.7S4.8%20480%208%20480c66.3%200%20116-31.8%20140.6-51.4%2032.7%2012.3%2069%2019.4%20107.4%2019.4%20141.4%200%20256-93.1%20256-208S397.4%2032%20256%2032z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"),
        Dy = function (e) {
            return ah(hy, e.height, e.width / 2, Mf, Ef)
        },
        Gy = ah(yy, ay),
        Cy = {
            searchPlaceholder: "Find a country...",
            startButton: "Run t-SNE",
            warning: "We are sorry, the project has been designed for big screens. Come back from your laptop or desktop computer to experiente the magic of machine learning and data visualization.",
            projectTitle: "<span>About the project</span>",
            projectDescription: "This project explores how machine learning algorithms and data visualization techniques can make raw data more meaningful and help to better understand it.\n\nGrand Prize winner of the World Data Visualization Prize 2019.",
            authorsTitle: "---",
            authors: "<b>I N T E R A C T A</b> <br/>Nikita Rokotyan | Olya Stukova | Dasha Kolmakova\n2019",
            introductionTitle: "<span> An alternative data-driven\ncountry map </span>",
            introductionSubTitle: "<span><b>t-SNE</b> powered data exploration experiment</span>",
            introductiondescription: "<span><b>t-SNE</b> is a (magical) machine learning algorithm that can visually group similar data points together without knowing anything about the actual data. Think of every country as a data point which has a number of properties, t-SNE will search for local and global similarities between the countries and place them closer to each other on this map.\n  \nWe processed the data about countries all around the world from one of three dataset provided by <b>Information is Beautiful</b> and <b>World Government Summit</b> through <b>t-SNE</b> and created this visual tool that allows you to play with the data by changing the values of country indicators and see where they land on a <b>t-SNE</b> plot after adjustments.</span>",
            storyTitle0: "t-SNE is doing its magic…",
            storyTitle1: "Understanding the data",
            story1: "<p>Every bubble is a country represented by various indicators and indexes, such as <b>Population</b>, <b>GDP</b>, <b>GINI index</b>, <b>Happy Planet Index</b> and others. You can see the full list by click on the gear on the left. </p>\n\n  <p>Different colors represent different continents, the size of a bubble is related to the population of its country. You will be able to change this later.</p>\n  <p> Some of the countries have been removed from the exploration due to absence of data.</p>",
            storyTitle2: "Understanding the data",
            story2: "<b>t-SNE</b> clusters similar countries together, but it doesn’t tell you what makes them similar. That’s what you have to figure out by yourself, which can uncover unexpected connections.",
            storyTitle3: "Let’s explore our t-SNE canvas",
            story3: "Here you can see a bunch of countries that form a cluster.\n\n  There’s <b>UK</b>, <b>Germany</b>, <b>United States</b>, <b>Japan</b>, and other countries that we call <b>developed</b>. They’re represented by high values of such indicators as <b>Political Stability</b>, <b>Control of Corruption</b>, <b>Judicial Effectiveness</b>, <b>Property Rights Score</b>, and others.",
            storyTitle4: "Let’s explore our t-SNE canvas",
            story4: "Here’s a small cluster that consists of <b>China</b> and <b>India</b>. As we found, it was formed because they have the biggest population in the world.",
            storyTitle5: "Middle East and Singapore?",
            story5: "Surprisingly, <b>Singapore</b> and <b>Brunei</b> landed in the same cluster with some of the <b>Middle East</b> countries. What do they have in common?\n\n  Click on a country bubble to see its indicators and explore!\n  ",
            storyTitle6: "Russia and Brazil?",
            story6: "Why is <b>Russia</b> close to <b>Brazil</b>?\n\n  You can turn on and off which indicators t-SNE will take into account when it calculates where to place the countries.",
            storyTitle7: "You can select which indicators to use",
            story7: "Let’s try to exclude <b>Population</b> and <b>Surface Area</b> from t-SNE and see how some of the clusters will reform.\n\n    <b>Russia</b> and <b>Brazil</b> will now split and move to other areas.",
            storyTitle8: "Play with the indicators",
            story8: "Now let’s see what will happen if you change some of the country indicators. Let’s reduce <b>Health Expendidure</b> in the <b>United States</b>.",
            storyTitle9: "Play with the indicators",
            story9: "The country will leave the developed countries cluster and go somewhere else!",
            storyTitle10: "Explore!",
            story10: "Interested what will happen if you change some of the properties of your country? Click on a bubble to display the control sliders and play with them."
        },
        Sy = function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }();
    var Iy = function () {
            function n(e) {
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, n), this.container = e, this.currentStep = 0, this.maxStep = 10, this.isOpen = !1
            }
            return Sy(n, [{
                key: "setupStepBox",
                value: function () {
                    var e = this,
                        n = this.container,
                        t = this.currentStep;
                    this.story = n.append("div").attr("class", by), this.story.style("opacity", 0).transition().duration(300).style("opacity", 1), this.story.classed("hidden", this.isOpen), this.stepTitle = this.story.append("div").attr("class", "story-title").html(Cy["storyTitle" + t]), this.stepContent = this.story.append("div").attr("class", Py), this.leftArrowBlock = this.stepContent.append("div").attr("class", vy).classed("hidden", !0).classed("empty", !0), setTimeout(function () {
                        e.leftArrowBlock.classed("hidden", !1)
                    }, 4e3), this.leftArrow = this.leftArrowBlock.append("div").attr("class", gy({
                        direction: "left"
                    })).classed("hidden", !0).classed("empty", !0), this.leftIcon = this.leftArrow.html('<svg aria-hidden="true" data-prefix="fas" data-icon="chevron-left" id="left-arrow-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>'), this.stepText = this.stepContent.append("div").attr("class", xy).html(Cy["story" + t]), this.stepText.classed("empty", !0), this.rightArrowBlock = this.stepContent.append("div").attr("class", vy).classed("hidden", !0).classed("empty", !0), setTimeout(function () {
                        e.rightArrowBlock.classed("hidden", !1)
                    }, 4e3), this.rigthArrow = this.rightArrowBlock.append("div").attr("class", gy({
                        direction: "right"
                    })), this.rigthIcon = this.rigthArrow.html('<svg aria-hidden="true" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>'), this.leftArrowBlock.on("click", function () {
                        1 < e.currentStep && (e.currentStep -= 1, e.update())
                    }), this.rightArrowBlock.on("click", function () {
                        e.currentStep < e.maxStep && 0 < e.currentStep && (e.currentStep += 1, e.update())
                    }), U(window).on("keydown", function () {
                        39 === N.keyCode && e.currentStep < e.maxStep && 0 < e.currentStep ? (e.currentStep += 1, e.update()) : 37 === N.keyCode && 1 < e.currentStep && (e.currentStep -= 1, e.update())
                    }), this.closeButton = this.container.append("div").attr("class", Dy({
                        height: this.story.node().clientHeight,
                        width: this.story.node().clientWidth
                    })).classed("hidden", !0).html('<svg aria-hidden="true" data-prefix="fas" data-icon="times"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="#9B9BA5" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>').on("click", function () {
                        e.isOpen = !e.isOpen, e.story.classed("hidden", e.isOpen), e.closeButton.classed("hidden", e.isOpen), e.closeIcon.classed("hidden", e.isOpen), e.openButton.classed("hidden", !e.isOpen), e.openIcon.classed("hidden", !e.isOpen)
                    }), this.closeIcon = this.closeButton.append("div").attr("class", Gy), this.openButton = this.container.append("div").attr("class", (this.story.node().clientHeight, ah(dy, Lf))).classed("hidden", !0).on("click", function () {
                        e.isOpen = !e.isOpen, e.story.classed("hidden", e.isOpen), e.closeButton.classed("hidden", e.isOpen), e.closeIcon.classed("hidden", e.isOpen), e.openButton.classed("hidden", !e.isOpen), e.openIcon.classed("hidden", !e.isOpen)
                    }), this.openIcon = this.openButton.append("div").attr("class", wy)
                }
            }, {
                key: "setActions",
                value: function (e) {
                    this.actions = e
                }
            }, {
                key: "update",
                value: function () {
                    var e = this.stepText,
                        n = this.stepTitle,
                        t = this.currentStep,
                        r = this.actions;
                    1 <= t && (this.leftArrow.classed("hidden", 1 === this.currentStep), this.rigthArrow.classed("hidden", this.currentStep === this.maxStep), e.classed("empty", null == Cy["story" + t]), this.rightArrowBlock.classed("empty", null == Cy["story" + t]), this.leftArrowBlock.classed("empty", null == Cy["story" + t]), n.html(Cy["storyTitle" + t]), e.html(Cy["story" + t]), r.reset(), r["story" + t](), this.closeButton.attr("class", Dy({
                        height: this.story.node().clientHeight,
                        width: this.story.node().clientWidth
                    })), this.closeButton.classed("hidden", this.isOpen))
                }
            }]), n
        }(),
        My = "http://www.w3.org/1999/xhtml",
        ky = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: My,
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };

    function Ay(e) {
        var n = e += "",
            t = n.indexOf(":");
        return 0 <= t && "xmlns" !== (n = e.slice(0, t)) && (e = e.slice(t + 1)), ky.hasOwnProperty(n) ? {
            space: ky[n],
            local: e
        } : e
    }

    function _y(e) {
        var n = Ay(e);
        return (n.local ? function (e) {
            return function () {
                return this.ownerDocument.createElementNS(e.space, e.local)
            }
        } : function (t) {
            return function () {
                var e = this.ownerDocument,
                    n = this.namespaceURI;
                return n === My && e.documentElement.namespaceURI === My ? e.createElement(t) : e.createElementNS(n, t)
            }
        })(n)
    }
    var Oy = function (e) {
        return function () {
            return this.matches(e)
        }
    };
    if ("undefined" != typeof document) {
        var Ly = document.documentElement;
        if (!Ly.matches) {
            var Ey = Ly.webkitMatchesSelector || Ly.msMatchesSelector || Ly.mozMatchesSelector || Ly.oMatchesSelector;
            Oy = function (e) {
                return function () {
                    return Ey.call(this, e)
                }
            }
        }
    }
    var Ny = Oy,
        jy = {};
    "undefined" != typeof document && ("onmouseenter" in document.documentElement || (jy = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }));

    function Ty(t, e, n) {
        return t = $y(t, e, n),
            function (e) {
                var n = e.relatedTarget;
                n && (n === this || 8 & n.compareDocumentPosition(this)) || t.call(this, e)
            }
    }

    function $y(n, t, r) {
        return function (e) {
            try {
                n.call(this, this.__data__, t, r)
            } finally {}
        }
    }

    function zy(o) {
        return function () {
            var e = this.__on;
            if (e) {
                for (var n, t = 0, r = -1, i = e.length; t < i; ++t) n = e[t], o.type && n.type !== o.type || n.name !== o.name ? e[++r] = n : this.removeEventListener(n.type, n.listener, n.capture);
                ++r ? e.length = r : delete this.__on
            }
        }
    }

    function By(c, s, u) {
        var p = jy.hasOwnProperty(c.type) ? Ty : $y;
        return function (e, n, t) {
            var r, i = this.__on,
                o = p(s, n, t);
            if (i)
                for (var a = 0, l = i.length; a < l; ++a)
                    if ((r = i[a]).type === c.type && r.name === c.name) return this.removeEventListener(r.type, r.listener, r.capture), this.addEventListener(r.type, r.listener = o, r.capture = u), void(r.value = s);
            this.addEventListener(c.type, o, u), r = {
                type: c.type,
                name: c.name,
                value: s,
                listener: o,
                capture: u
            }, i ? i.push(r) : this.__on = [r]
        }
    }

    function qy() {}

    function Fy(e) {
        return null == e ? qy : function () {
            return this.querySelector(e)
        }
    }

    function Ry() {
        return []
    }

    function Uy(e) {
        return new Array(e.length)
    }

    function Yy(e, n) {
        this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = n
    }
    Yy.prototype = {
        constructor: Yy,
        appendChild: function (e) {
            return this._parent.insertBefore(e, this._next)
        },
        insertBefore: function (e, n) {
            return this._parent.insertBefore(e, n)
        },
        querySelector: function (e) {
            return this._parent.querySelector(e)
        },
        querySelectorAll: function (e) {
            return this._parent.querySelectorAll(e)
        }
    };
    var Hy = "$";

    function Vy(e, n, t, r, i, o) {
        for (var a, l = 0, c = n.length, s = o.length; l < s; ++l)(a = n[l]) ? (a.__data__ = o[l], r[l] = a) : t[l] = new Yy(e, o[l]);
        for (; l < c; ++l)(a = n[l]) && (i[l] = a)
    }

    function Wy(e, n, t, r, i, o, a) {
        var l, c, s, u = {},
            p = n.length,
            d = o.length,
            f = new Array(p);
        for (l = 0; l < p; ++l)(c = n[l]) && (f[l] = s = Hy + a.call(c, c.__data__, l, n), s in u ? i[l] = c : u[s] = c);
        for (l = 0; l < d; ++l)(c = u[s = Hy + a.call(e, o[l], l, o)]) ? ((r[l] = c).__data__ = o[l], u[s] = null) : t[l] = new Yy(e, o[l]);
        for (l = 0; l < p; ++l)(c = n[l]) && u[f[l]] === c && (i[l] = c)
    }

    function Zy(e, n) {
        return e < n ? -1 : n < e ? 1 : n <= e ? 0 : NaN
    }

    function Ky(e) {
        return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView
    }

    function Xy(e) {
        return e.trim().split(/^|\s+/)
    }

    function Jy(e) {
        return e.classList || new Qy(e)
    }

    function Qy(e) {
        this._node = e, this._names = Xy(e.getAttribute("class") || "")
    }

    function em(e, n) {
        for (var t = Jy(e), r = -1, i = n.length; ++r < i;) t.add(n[r])
    }

    function nm(e, n) {
        for (var t = Jy(e), r = -1, i = n.length; ++r < i;) t.remove(n[r])
    }

    function tm() {
        this.textContent = ""
    }

    function rm() {
        this.innerHTML = ""
    }

    function im() {
        this.nextSibling && this.parentNode.appendChild(this)
    }

    function om() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }

    function am() {
        return null
    }

    function lm() {
        var e = this.parentNode;
        e && e.removeChild(this)
    }

    function cm(e, n, t) {
        var r = Ky(e),
            i = r.CustomEvent;
        i ? i = new i(n, t) : (i = r.document.createEvent("Event"), t ? (i.initEvent(n, t.bubbles, t.cancelable), i.detail = t.detail) : i.initEvent(n, !1, !1)), e.dispatchEvent(i)
    }
    Qy.prototype = {
        add: function (e) {
            this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")))
        },
        remove: function (e) {
            var n = this._names.indexOf(e);
            0 <= n && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")))
        },
        contains: function (e) {
            return 0 <= this._names.indexOf(e)
        }
    };
    var sm, um = [null];

    function pm(e, n) {
        this._groups = e, this._parents = n
    }

    function dm(e, n) {
        if ((t = (e = n ? e.toExponential(n - 1) : e.toExponential()).indexOf("e")) < 0) return null;
        var t, r = e.slice(0, t);
        return [1 < r.length ? r[0] + r.slice(2) : r, +e.slice(t + 1)]
    }

    function fm(e, n) {
        var t = dm(e, n);
        if (!t) return e + "";
        var r = t[0],
            i = t[1];
        return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
    }
    pm.prototype = function () {
        return new pm([
            [document.documentElement]
        ], um)
    }.prototype = {
        constructor: pm,
        select: function (e) {
            "function" != typeof e && (e = Fy(e));
            for (var n = this._groups, t = n.length, r = new Array(t), i = 0; i < t; ++i)
                for (var o, a, l = n[i], c = l.length, s = r[i] = new Array(c), u = 0; u < c; ++u)(o = l[u]) && (a = e.call(o, o.__data__, u, l)) && ("__data__" in o && (a.__data__ = o.__data__), s[u] = a);
            return new pm(r, this._parents)
        },
        selectAll: function (e) {
            var n;
            "function" != typeof e && (e = null == (n = e) ? Ry : function () {
                return this.querySelectorAll(n)
            });
            for (var t = this._groups, r = t.length, i = [], o = [], a = 0; a < r; ++a)
                for (var l, c = t[a], s = c.length, u = 0; u < s; ++u)(l = c[u]) && (i.push(e.call(l, l.__data__, u, c)), o.push(l));
            return new pm(i, o)
        },
        filter: function (e) {
            "function" != typeof e && (e = Ny(e));
            for (var n = this._groups, t = n.length, r = new Array(t), i = 0; i < t; ++i)
                for (var o, a = n[i], l = a.length, c = r[i] = [], s = 0; s < l; ++s)(o = a[s]) && e.call(o, o.__data__, s, a) && c.push(o);
            return new pm(r, this._parents)
        },
        data: function (e, n) {
            if (!e) return h = new Array(this.size()), u = -1, this.each(function (e) {
                h[++u] = e
            }), h;
            var t, r = n ? Wy : Vy,
                i = this._parents,
                o = this._groups;
            "function" != typeof e && (t = e, e = function () {
                return t
            });
            for (var a = o.length, l = new Array(a), c = new Array(a), s = new Array(a), u = 0; u < a; ++u) {
                var p = i[u],
                    d = o[u],
                    f = d.length,
                    h = e.call(p, p && p.__data__, u, i),
                    y = h.length,
                    m = c[u] = new Array(y),
                    g = l[u] = new Array(y);
                r(p, d, m, g, s[u] = new Array(f), h, n);
                for (var v, P, x = 0, b = 0; x < y; ++x)
                    if (v = m[x]) {
                        for (b <= x && (b = x + 1); !(P = g[b]) && ++b < y;);
                        v._next = P || null
                    }
            }
            return (l = new pm(l, i))._enter = c, l._exit = s, l
        },
        enter: function () {
            return new pm(this._enter || this._groups.map(Uy), this._parents)
        },
        exit: function () {
            return new pm(this._exit || this._groups.map(Uy), this._parents)
        },
        merge: function (e) {
            for (var n = this._groups, t = e._groups, r = n.length, i = t.length, o = Math.min(r, i), a = new Array(r), l = 0; l < o; ++l)
                for (var c, s = n[l], u = t[l], p = s.length, d = a[l] = new Array(p), f = 0; f < p; ++f)(c = s[f] || u[f]) && (d[f] = c);
            for (; l < r; ++l) a[l] = n[l];
            return new pm(a, this._parents)
        },
        order: function () {
            for (var e = this._groups, n = -1, t = e.length; ++n < t;)
                for (var r, i = e[n], o = i.length - 1, a = i[o]; 0 <= --o;)(r = i[o]) && (a && a !== r.nextSibling && a.parentNode.insertBefore(r, a), a = r);
            return this
        },
        sort: function (t) {
            function e(e, n) {
                return e && n ? t(e.__data__, n.__data__) : !e - !n
            }
            t || (t = Zy);
            for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
                for (var a, l = n[o], c = l.length, s = i[o] = new Array(c), u = 0; u < c; ++u)(a = l[u]) && (s[u] = a);
                s.sort(e)
            }
            return new pm(i, this._parents).order()
        },
        call: function () {
            var e = arguments[0];
            return arguments[0] = this, e.apply(null, arguments), this
        },
        nodes: function () {
            var e = new Array(this.size()),
                n = -1;
            return this.each(function () {
                e[++n] = this
            }), e
        },
        node: function () {
            for (var e = this._groups, n = 0, t = e.length; n < t; ++n)
                for (var r = e[n], i = 0, o = r.length; i < o; ++i) {
                    var a = r[i];
                    if (a) return a
                }
            return null
        },
        size: function () {
            var e = 0;
            return this.each(function () {
                ++e
            }), e
        },
        empty: function () {
            return !this.node()
        },
        each: function (e) {
            for (var n = this._groups, t = 0, r = n.length; t < r; ++t)
                for (var i, o = n[t], a = 0, l = o.length; a < l; ++a)(i = o[a]) && e.call(i, i.__data__, a, o);
            return this
        },
        attr: function (e, n) {
            var t = Ay(e);
            if (arguments.length < 2) {
                var r = this.node();
                return t.local ? r.getAttributeNS(t.space, t.local) : r.getAttribute(t)
            }
            return this.each((null == n ? t.local ? function (e) {
                return function () {
                    this.removeAttributeNS(e.space, e.local)
                }
            } : function (e) {
                return function () {
                    this.removeAttribute(e)
                }
            } : "function" == typeof n ? t.local ? function (n, t) {
                return function () {
                    var e = t.apply(this, arguments);
                    null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e)
                }
            } : function (n, t) {
                return function () {
                    var e = t.apply(this, arguments);
                    null == e ? this.removeAttribute(n) : this.setAttribute(n, e)
                }
            } : t.local ? function (e, n) {
                return function () {
                    this.setAttributeNS(e.space, e.local, n)
                }
            } : function (e, n) {
                return function () {
                    this.setAttribute(e, n)
                }
            })(t, n))
        },
        style: function (e, n, t) {
            var r;
            return 1 < arguments.length ? this.each((null == n ? function (e) {
                return function () {
                    this.style.removeProperty(e)
                }
            } : "function" == typeof n ? function (n, t, r) {
                return function () {
                    var e = t.apply(this, arguments);
                    null == e ? this.style.removeProperty(n) : this.style.setProperty(n, e, r)
                }
            } : function (e, n, t) {
                return function () {
                    this.style.setProperty(e, n, t)
                }
            })(e, n, null == t ? "" : t)) : Ky(r = this.node()).getComputedStyle(r, null).getPropertyValue(e)
        },
        property: function (e, n) {
            return 1 < arguments.length ? this.each((null == n ? function (e) {
                return function () {
                    delete this[e]
                }
            } : "function" == typeof n ? function (n, t) {
                return function () {
                    var e = t.apply(this, arguments);
                    null == e ? delete this[n] : this[n] = e
                }
            } : function (e, n) {
                return function () {
                    this[e] = n
                }
            })(e, n)) : this.node()[e]
        },
        classed: function (e, n) {
            var t = Xy(e + "");
            if (arguments.length < 2) {
                for (var r = Jy(this.node()), i = -1, o = t.length; ++i < o;)
                    if (!r.contains(t[i])) return !1;
                return !0
            }
            return this.each(("function" == typeof n ? function (e, n) {
                return function () {
                    (n.apply(this, arguments) ? em : nm)(this, e)
                }
            } : n ? function (e) {
                return function () {
                    em(this, e)
                }
            } : function (e) {
                return function () {
                    nm(this, e)
                }
            })(t, n))
        },
        text: function (e) {
            return arguments.length ? this.each(null == e ? tm : ("function" == typeof e ? function (n) {
                return function () {
                    var e = n.apply(this, arguments);
                    this.textContent = null == e ? "" : e
                }
            } : function (e) {
                return function () {
                    this.textContent = e
                }
            })(e)) : this.node().textContent
        },
        html: function (e) {
            return arguments.length ? this.each(null == e ? rm : ("function" == typeof e ? function (n) {
                return function () {
                    var e = n.apply(this, arguments);
                    this.innerHTML = null == e ? "" : e
                }
            } : function (e) {
                return function () {
                    this.innerHTML = e
                }
            })(e)) : this.node().innerHTML
        },
        raise: function () {
            return this.each(im)
        },
        lower: function () {
            return this.each(om)
        },
        append: function (e) {
            var n = "function" == typeof e ? e : _y(e);
            return this.select(function () {
                return this.appendChild(n.apply(this, arguments))
            })
        },
        insert: function (e, n) {
            var t = "function" == typeof e ? e : _y(e),
                r = null == n ? am : "function" == typeof n ? n : Fy(n);
            return this.select(function () {
                return this.insertBefore(t.apply(this, arguments), r.apply(this, arguments) || null)
            })
        },
        remove: function () {
            return this.each(lm)
        },
        datum: function (e) {
            return arguments.length ? this.property("__data__", e) : this.node().__data__
        },
        on: function (e, n, t) {
            var r, i, o = (e + "").trim().split(/^|\s+/).map(function (e) {
                    var n = "",
                        t = e.indexOf(".");
                    return 0 <= t && (n = e.slice(t + 1), e = e.slice(0, t)), {
                        type: e,
                        name: n
                    }
                }),
                a = o.length;
            if (!(arguments.length < 2)) {
                for (l = n ? By : zy, null == t && (t = !1), r = 0; r < a; ++r) this.each(l(o[r], n, t));
                return this
            }
            var l = this.node().__on;
            if (l)
                for (var c, s = 0, u = l.length; s < u; ++s)
                    for (r = 0, c = l[s]; r < a; ++r)
                        if ((i = o[r]).type === c.type && i.name === c.name) return c.value
        },
        dispatch: function (e, n) {
            return this.each(("function" == typeof n ? function (e, n) {
                return function () {
                    return cm(this, e, n.apply(this, arguments))
                }
            } : function (e, n) {
                return function () {
                    return cm(this, e, n)
                }
            })(e, n))
        }
    };
    var hm = {
            "": function (e, n) {
                e: for (var t, r = (e = e.toPrecision(n)).length, i = 1, o = -1; i < r; ++i) switch (e[i]) {
                case ".":
                    o = t = i;
                    break;
                case "0":
                    0 === o && (o = i), t = i;
                    break;
                case "e":
                    break e;
                default:
                    0 < o && (o = 0)
                }
                return 0 < o ? e.slice(0, o) + e.slice(t + 1) : e
            },
            "%": function (e, n) {
                return (100 * e).toFixed(n)
            },
            b: function (e) {
                return Math.round(e).toString(2)
            },
            c: function (e) {
                return e + ""
            },
            d: function (e) {
                return Math.round(e).toString(10)
            },
            e: function (e, n) {
                return e.toExponential(n)
            },
            f: function (e, n) {
                return e.toFixed(n)
            },
            g: function (e, n) {
                return e.toPrecision(n)
            },
            o: function (e) {
                return Math.round(e).toString(8)
            },
            p: function (e, n) {
                return fm(100 * e, n)
            },
            r: fm,
            s: function (e, n) {
                var t = dm(e, n);
                if (!t) return e + "";
                var r = t[0],
                    i = t[1],
                    o = i - (sm = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                    a = r.length;
                return o === a ? r : a < o ? r + new Array(o - a + 1).join("0") : 0 < o ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + dm(e, Math.max(0, n + o - 1))[0]
            },
            X: function (e) {
                return Math.round(e).toString(16).toUpperCase()
            },
            x: function (e) {
                return Math.round(e).toString(16)
            }
        },
        ym = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

    function mm(e) {
        return new gm(e)
    }

    function gm(e) {
        if (!(n = ym.exec(e))) throw new Error("invalid format: " + e);
        var n, t = n[1] || " ",
            r = n[2] || ">",
            i = n[3] || "-",
            o = n[4] || "",
            a = !!n[5],
            l = n[6] && +n[6],
            c = !!n[7],
            s = n[8] && +n[8].slice(1),
            u = n[9] || "";
        "n" === u ? (c = !0, u = "g") : hm[u] || (u = ""), (a || "0" === t && "=" === r) && (a = !0, t = "0", r = "="), this.fill = t, this.align = r, this.sign = i, this.symbol = o, this.zero = a, this.width = l, this.comma = c, this.precision = s, this.type = u
    }
    gm.prototype.toString = function () {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + this.type
    };
    var vm, Pm, xm, bm = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    function wm(e) {
        return e
    }

    function Dm(e) {
        var l, c, b = e.grouping && e.thousands ? (l = e.grouping, c = e.thousands, function (e, n) {
                for (var t = e.length, r = [], i = 0, o = l[0], a = 0; 0 < t && 0 < o && (n < a + o + 1 && (o = Math.max(1, n - a)), r.push(e.substring(t -= o, t + o)), !((a += o + 1) > n));) o = l[i = (i + 1) % l.length];
                return r.reverse().join(c)
            }) : wm,
            r = e.currency,
            w = e.decimal;

        function s(e) {
            var s = (e = mm(e)).fill,
                u = e.align,
                p = e.sign,
                n = e.symbol,
                d = e.zero,
                f = e.width,
                h = e.comma,
                y = e.precision,
                m = e.type,
                g = "$" === n ? r[0] : "#" === n && /[boxX]/.test(m) ? "0" + m.toLowerCase() : "",
                v = "$" === n ? r[1] : /[%p]/.test(m) ? "%" : "",
                P = hm[m],
                x = !m || /[defgprs%]/.test(m);

            function t(e) {
                var n, t, r, i = g,
                    o = v;
                if ("c" === m) o = P(e) + o, e = "";
                else {
                    var a = ((e = +e) < 0 || 1 / e < 0) && (e *= -1, !0);
                    if (e = P(e, y), a)
                        for (n = -1, t = e.length, a = !1; ++n < t;)
                            if (48 < (r = e.charCodeAt(n)) && r < 58 || "x" === m && 96 < r && r < 103 || "X" === m && 64 < r && r < 71) {
                                a = !0;
                                break
                            } if (i = (a ? "(" === p ? p : "-" : "-" === p || "(" === p ? "" : p) + i, o = o + ("s" === m ? bm[8 + sm / 3] : "") + (a && "(" === p ? ")" : ""), x)
                        for (n = -1, t = e.length; ++n < t;)
                            if ((r = e.charCodeAt(n)) < 48 || 57 < r) {
                                o = (46 === r ? w + e.slice(n + 1) : e.slice(n)) + o, e = e.slice(0, n);
                                break
                            }
                }
                h && !d && (e = b(e, 1 / 0));
                var l = i.length + e.length + o.length,
                    c = l < f ? new Array(f - l + 1).join(s) : "";
                switch (h && d && (e = b(c + e, c.length ? f - o.length : 1 / 0), c = ""), u) {
                case "<":
                    return i + e + o + c;
                case "=":
                    return i + c + e + o;
                case "^":
                    return c.slice(0, l = c.length >> 1) + i + e + o + c.slice(l)
                }
                return c + i + e + o
            }
            return y = null == y ? m ? 6 : 12 : /[gprs]/.test(m) ? Math.max(1, Math.min(21, y)) : Math.max(0, Math.min(20, y)), t.toString = function () {
                return e + ""
            }, t
        }
        return {
            format: s,
            formatPrefix: function (e, n) {
                var t, r = s(((e = mm(e)).type = "f", e)),
                    i = 3 * Math.max(-8, Math.min(8, Math.floor((t = n, ((t = dm(Math.abs(t))) ? t[1] : NaN) / 3)))),
                    o = Math.pow(10, -i),
                    a = bm[8 + i / 3];
                return function (e) {
                    return r(o * e) + a
                }
            }
        }
    }
    vm = Dm({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
    }), Pm = vm.format, xm = vm.formatPrefix;
    var Gm = {
        value: function () {}
    };

    function Cm() {
        for (var e, n = 0, t = arguments.length, r = {}; n < t; ++n) {
            if (!(e = arguments[n] + "") || e in r) throw new Error("illegal type: " + e);
            r[e] = []
        }
        return new Sm(r)
    }

    function Sm(e) {
        this._ = e
    }

    function Im(e, n) {
        for (var t, r = 0, i = e.length; r < i; ++r)
            if ((t = e[r]).name === n) return t.value
    }

    function Mm(e, n, t) {
        for (var r = 0, i = e.length; r < i; ++r)
            if (e[r].name === n) {
                e[r] = Gm, e = e.slice(0, r).concat(e.slice(r + 1));
                break
            } return null != t && e.push({
            name: n,
            value: t
        }), e
    }

    function km(e, n) {
        return e < n ? -1 : n < e ? 1 : n <= e ? 0 : NaN
    }
    Sm.prototype = Cm.prototype = {
        constructor: Sm,
        on: function (e, n) {
            var t, r, i = this._,
                o = (r = i, (e + "").trim().split(/^|\s+/).map(function (e) {
                    var n = "",
                        t = e.indexOf(".");
                    if (0 <= t && (n = e.slice(t + 1), e = e.slice(0, t)), e && !r.hasOwnProperty(e)) throw new Error("unknown type: " + e);
                    return {
                        type: e,
                        name: n
                    }
                })),
                a = -1,
                l = o.length;
            if (!(arguments.length < 2)) {
                if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
                for (; ++a < l;)
                    if (t = (e = o[a]).type) i[t] = Mm(i[t], e.name, n);
                    else if (null == n)
                    for (t in i) i[t] = Mm(i[t], e.name, null);
                return this
            }
            for (; ++a < l;)
                if ((t = (e = o[a]).type) && (t = Im(i[t], e.name))) return t
        },
        copy: function () {
            var e = {},
                n = this._;
            for (var t in n) e[t] = n[t].slice();
            return new Sm(e)
        },
        call: function (e, n) {
            if (0 < (t = arguments.length - 2))
                for (var t, r, i = new Array(t), o = 0; o < t; ++o) i[o] = arguments[o + 2];
            if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
            for (o = 0, t = (r = this._[e]).length; o < t; ++o) r[o].value.apply(n, i)
        },
        apply: function (e, n, t) {
            if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
            for (var r = this._[e], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, t)
        }
    };
    var Am, _m;
    1 === (Am = km).length && (_m = Am, Am = function (e, n) {
        return km(_m(e), n)
    });
    var Om = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        Lm = "function" == typeof Symbol && "symbol" === Om(Symbol.iterator) ? function (e) {
            return void 0 === e ? "undefined" : Om(e)
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : Om(e)
        },
        Em = function (e) {
            return e
        },
        Nm = function (e) {
            for (var n = [], t = 0, r = e.length; t < r; t++) n[t] = e[r - t - 1];
            return n
        },
        jm = function (e, l) {
            e.each(function () {
                for (var e, n, t = "string" == typeof (n = this) ? new pm([
                        [document.querySelector(n)]
                    ], [document.documentElement]) : new pm([
                        [n]
                    ], um), r = t.text().split(/\s+/).reverse(), i = [], o = (t.attr("y"), parseFloat(t.attr("dy")) || 0), a = t.text(null).append("tspan").attr("x", 0).attr("dy", o + "em"); e = r.pop();) i.push(e), a.text(i.join(" ")), a.node().getComputedTextLength() > l && 1 < i.length && (i.pop(), a.text(i.join(" ")), i = [e], a = t.append("tspan").attr("x", 0).attr("dy", 1.2 + o + "em").text(e))
            })
        },
        Tm = {
            d3_drawShapes: function (e, n, t, r, i, o) {
                "rect" === e ? n.attr("height", t).attr("width", r) : "circle" === e ? n.attr("r", i) : "line" === e ? n.attr("x1", 0).attr("x2", r).attr("y1", 0).attr("y2", 0) : "path" === e && n.attr("d", o)
            },
            d3_addText: function (e, n, t, r, i) {
                n.append("text").attr("class", r + "label");
                var o = e.selectAll("g." + r + "cell text." + r + "label").data(t).text(Em);
                return i && e.selectAll("g." + r + "cell text." + r + "label").call(jm, i), o
            },
            d3_calcType: function (e, n, t, r, i, o) {
                var a, l, c, s, u, p = e.invertExtent ? (c = i, s = o, u = (l = e).range().map(function (e) {
                        var n = l.invertExtent(e);
                        return c(n[0]) + " " + s + " " + c(n[1])
                    }), {
                        data: l.range(),
                        labels: u,
                        feature: Em
                    }) : e.ticks ? function (n, e, t) {
                        var r = [];
                        if (1 < e.length) r = e;
                        else
                            for (var i = n.domain(), o = (i[i.length - 1] - i[0]) / (e - 1), a = 0; a < e; a++) r.push(i[0] + a * o);
                        var l = r.map(t);
                        return {
                            data: r,
                            labels: l,
                            feature: function (e) {
                                return n(e)
                            }
                        }
                    }(e, t, i) : {
                        data: (a = e).domain(),
                        labels: a.domain(),
                        feature: function (e) {
                            return a(e)
                        }
                    },
                    d = e.range && e.range() || e.domain();
                return p.labels = function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [],
                        n = arguments[1],
                        t = arguments[2],
                        r = arguments[3],
                        i = arguments[4];
                    if ("object" === (void 0 === n ? "undefined" : Lm(n))) {
                        if (0 === n.length) return e;
                        for (var o = n.length; o < e.length; o++) n.push(e[o]);
                        return n
                    }
                    if ("function" != typeof n) return e;
                    for (var a = [], l = e.length, c = 0; c < l; c++) a.push(n({
                        i: c,
                        genLength: l,
                        generatedLabels: e,
                        domain: t,
                        range: r,
                        labelDelimiter: i
                    }));
                    return a
                }(p.labels, r, e.domain(), d, o), n && (p.labels = Nm(p.labels), p.data = Nm(p.data)), p
            },
            d3_filterCells: function (t, e) {
                var n = t.data.map(function (e, n) {
                        return {
                            data: e,
                            label: t.labels[n]
                        }
                    }).filter(e),
                    r = n.map(function (e) {
                        return e.data
                    }),
                    i = n.map(function (e) {
                        return e.label
                    });
                return t.data = t.data.filter(function (e) {
                    return -1 !== r.indexOf(e)
                }), t.labels = t.labels.filter(function (e) {
                    return -1 !== i.indexOf(e)
                }), t
            },
            d3_placement: function (e, n, t, r, i, o) {
                n.attr("transform", t), r.attr("transform", i), "horizontal" === e && r.style("text-anchor", o)
            },
            d3_addEvents: function (e, r) {
                e.on("mouseover.legend", function (e) {
                    var n, t;
                    n = e, t = this, r.call("cellover", t, n)
                }).on("mouseout.legend", function (e) {
                    var n, t;
                    n = e, t = this, r.call("cellout", t, n)
                }).on("click.legend", function (e) {
                    var n, t;
                    n = e, t = this, r.call("cellclick", t, n)
                })
            },
            d3_title: function (e, n, t, r) {
                if ("" !== n) {
                    e.selectAll("text." + t + "legendTitle").data([n]).enter().append("text").attr("class", t + "legendTitle"), e.selectAll("text." + t + "legendTitle").text(n), r && e.selectAll("text." + t + "legendTitle").call(jm, r);
                    var i = e.select("." + t + "legendCells"),
                        o = e.select("." + t + "legendTitle").nodes().map(function (e) {
                            return e.getBBox().height
                        })[0],
                        a = -i.nodes().map(function (e) {
                            return e.getBBox().x
                        })[0];
                    i.attr("transform", "translate(" + a + "," + o + ")")
                }
            },
            d3_defaultLocale: {
                format: Pm,
                formatPrefix: xm
            },
            d3_defaultFormatSpecifier: ".01f",
            d3_defaultDelimiter: "to"
        };
    var $m = Zm(["\n  label: legend;\n  position: fixed;\n  user-select: none;\n  top: 0px;\n  left: 0;\n  padding: 0.5rem 1rem;\n  height: 44px;\n  backdrop-filter: blur(3px);\n  background-color: ", ";\n  border-radius: 0.3rem;\n  font-size: 10px;\n  color: ", ";\n  width: 100%;\n  box-sizing: border-box;\n  // overflow: visible;\n  -webkit-font-smoothing: antialiased;\n  transition: opacity 0.5s;\n  opacity: 1;\n\n  &.hidden {\n    opacity: 0;\n    visibility: hidden;\n  }\n"], ["\n  label: legend;\n  position: fixed;\n  user-select: none;\n  top: 0px;\n  left: 0;\n  padding: 0.5rem 1rem;\n  height: 44px;\n  backdrop-filter: blur(3px);\n  background-color: ", ";\n  border-radius: 0.3rem;\n  font-size: 10px;\n  color: ", ";\n  width: 100%;\n  box-sizing: border-box;\n  // overflow: visible;\n  -webkit-font-smoothing: antialiased;\n  transition: opacity 0.5s;\n  opacity: 1;\n\n  &.hidden {\n    opacity: 0;\n    visibility: hidden;\n  }\n"]),
        zm = Zm(["\n  color: ", ";\n  margin: 0.75rem 1rem;\n  font-size: 14px;\n  text-align: center;\n  text-transform: uppercase;\n"], ["\n  color: ", ";\n  margin: 0.75rem 1rem;\n  font-size: 14px;\n  text-align: center;\n  text-transform: uppercase;\n"]),
        Bm = Zm(["\n  label: legend-text;\n  font-size: 9px;\n  transform: translate(37px, 17px);\n  text-anchor: middle;\n"], ["\n  label: legend-text;\n  font-size: 9px;\n  transform: translate(37px, 17px);\n  text-anchor: middle;\n"]),
        qm = Zm(["\n  label: legend-text;\n  font-size: 8px;\n  transform: translate(15px, 17px);\n  text-anchor: middle;\n"], ["\n  label: legend-text;\n  font-size: 8px;\n  transform: translate(15px, 17px);\n  text-anchor: middle;\n"]),
        Fm = Zm(["\n  label: legend-size;\n  width: 73px;\n  padding-left: 0.5rem;\n  // height: 55px;\n  vertical-align: top;\n  height: 29px;\n  fill: ", ";\n  top: 0;\n"], ["\n  label: legend-size;\n  width: 73px;\n  padding-left: 0.5rem;\n  // height: 55px;\n  vertical-align: top;\n  height: 29px;\n  fill: ", ";\n  top: 0;\n"]),
        Rm = Zm(["\n  width: 32px;\n  height: 29px;\n  padding-right: 0.75rem;\n  text {\n    font-size: 9px;\n  }\n"], ["\n  width: 32px;\n  height: 29px;\n  padding-right: 0.75rem;\n  text {\n    font-size: 9px;\n  }\n"]),
        Um = Zm(["\n  label: legend-color;\n  padding: 0rem 1rem;\n  position: relative;\n  top: 50%;\n  height: 18px;\n  display: inline-block;\n  vertical-align: top;\n  transform: translateY(-40%);\n  fill: ", ";\n  width: 600px;\n"], ["\n  label: legend-color;\n  padding: 0rem 1rem;\n  position: relative;\n  top: 50%;\n  height: 18px;\n  display: inline-block;\n  vertical-align: top;\n  transform: translateY(-40%);\n  fill: ", ";\n  width: 600px;\n"]),
        Ym = Zm(["\n  position: fixed;\n  left: calc(120px + 1rem);\n  transform: translateY(-50%);\n  top: 50%;\n  transition: left 0.3s, opacity 0.5s;\n  height: 24px;\n  width: 24px;\n  background: ", ";\n  border-radius: 50px;\n  opacity: 1;\n  &:hover,\n  &:focus {\n    cursor: pointer;\n  }\n  &.close {\n    left: 0.5rem;\n    transition: left 300ms;\n  }\n\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"], ["\n  position: fixed;\n  left: calc(120px + 1rem);\n  transform: translateY(-50%);\n  top: 50%;\n  transition: left 0.3s, opacity 0.5s;\n  height: 24px;\n  width: 24px;\n  background: ", ";\n  border-radius: 50px;\n  opacity: 1;\n  &:hover,\n  &:focus {\n    cursor: pointer;\n  }\n  &.close {\n    left: 0.5rem;\n    transition: left 300ms;\n  }\n\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"]),
        Hm = Zm(["\n  label: closeButton;\n  margin: auto;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n\n  &.close {\n    background: url(", ") no-repeat center center;\n  }\n"], ["\n  label: closeButton;\n  margin: auto;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n\n  &.close {\n    background: url(", ") no-repeat center center;\n  }\n"]),
        Vm = Zm(["\n  \n  display: inline-block;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 0.5rem;\n  \n  opacity: 1;\n  transition: opacity 0.5s;\n\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"], ["\n  \n  display: inline-block;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 0.5rem;\n  \n  opacity: 1;\n  transition: opacity 0.5s;\n\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"]),
        Wm = Zm(["\n  display: inline-block;\n  // width: 170px;\n  width: 662px;\n  height: 50px;\n  padding: 0 0.25rem;\n  // position: absolute;\n  // top: 50%;\n  // transform: translateY(-50%);\n"], ["\n  display: inline-block;\n  // width: 170px;\n  width: 662px;\n  height: 50px;\n  padding: 0 0.25rem;\n  // position: absolute;\n  // top: 50%;\n  // transform: translateY(-50%);\n"]);

    function Zm(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var Km = ah($m, Lf, Of),
        Xm = (ah(zm, Of), ah(Bm), ah(qm), ah(Fm, Mf)),
        Jm = ah(Rm),
        Qm = ah(Um, Of),
        eg = (ah(Ym, Lf), ah(Hm, Bh, zh), ah(Vm)),
        ng = (ah(Wm), ag(["\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  display: inline-block;\n  vertical-align: top;\n"], ["\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n  display: inline-block;\n  vertical-align: top;\n"])),
        tg = ag(["\n  label: text;\n  max-width: 80%;\n  padding: 0 0.5rem 0 0;\n  // padding-bottom: 0.25rem;\n  text-align: center;\n  display: inline-block;\n  pointer-events: none;\n  font-size: 11px;\n  margin: auto;\n  text-transform: uppercase;\n"], ["\n  label: text;\n  max-width: 80%;\n  padding: 0 0.5rem 0 0;\n  // padding-bottom: 0.25rem;\n  text-align: center;\n  display: inline-block;\n  pointer-events: none;\n  font-size: 11px;\n  margin: auto;\n  text-transform: uppercase;\n"]),
        rg = ag(["\n  display: inline-block;\n"], ["\n  display: inline-block;\n"]),
        ig = ag(["\n  font-size: 11px;\n  padding: 2px 20px 2px 8px;\n  width: 155px;\n  -moz-appearance: none;\n  appearance: none;\n  background-color: transparent;\n  color: ", ";\n  display: inline-block;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden !important;\n  cursor: pointer;\n  border-radius: 5px;\n  font-family: 'Open Sans';\n  border: 1px solid ", ";\n\n  &:hover {\n    color: ", ";\n    border-color: ", ";\n  }\n\n  ::-ms-expand {\n    display: none;\n  }\n\n  &:-moz-focusring {\n    color: transparent;\n    text-shadow: 0 0 0 ", ";\n    &:hover {\n      text-shadow: 0 0 0 ", ";\n    }\n  }\n\n  option {\n    color: black;\n    &:hover {\n      color: black;\n    }\n  }\n"], ["\n  font-size: 11px;\n  padding: 2px 20px 2px 8px;\n  width: 155px;\n  -moz-appearance: none;\n  appearance: none;\n  background-color: transparent;\n  color: ", ";\n  display: inline-block;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden !important;\n  cursor: pointer;\n  border-radius: 5px;\n  font-family: 'Open Sans';\n  border: 1px solid ", ";\n\n  &:hover {\n    color: ", ";\n    border-color: ", ";\n  }\n\n  ::-ms-expand {\n    display: none;\n  }\n\n  &:-moz-focusring {\n    color: transparent;\n    text-shadow: 0 0 0 ", ";\n    &:hover {\n      text-shadow: 0 0 0 ", ";\n    }\n  }\n\n  option {\n    color: black;\n    &:hover {\n      color: black;\n    }\n  }\n"]),
        og = ag(["\n  position: absolute;\n  right: 8px;\n  top: calc(50% - 1px);\n  pointer-events: none;\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 5px solid ", ";\n  margin-top: -1px;\n  transition: border-top-color 0.125s;\n"], ["\n  position: absolute;\n  right: 8px;\n  top: calc(50% - 1px);\n  pointer-events: none;\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 5px solid ", ";\n  margin-top: -1px;\n  transition: border-top-color 0.125s;\n"]);

    function ag(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var lg = ah(ng),
        cg = ah(tg),
        sg = ah(rg),
        ug = ah(ig, Of, Mf, Ef, Ef, Of, Ef),
        pg = ah(og, Of),
        dg = function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }();
    var fg = function () {
            function n(e) {
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, n), this.el = e.attr("class", lg), this.title = this.el.append("div").attr("class", cg), this.dropbownBox = this.el.append("div").attr("class", sg), this.dropdown = this.dropbownBox.append("select").attr("class", ug), this.arrow = this.dropbownBox.append("div").attr("class", pg)
            }
            return dg(n, [{
                key: "render",
                value: function () {}
            }, {
                key: "setData",
                value: function (n) {
                    return this.title.text(n.titleText), this.options = this.dropdown.selectAll("options").data(n.options).enter().append("option").attr("selected", function (e) {
                        return e === n.selected ? "selected" : null
                    }).attr("value", function (e) {
                        return e
                    }).text(function (e) {
                        return "indicator" === e ? "region" : e
                    }), this
                }
            }, {
                key: "setActions",
                value: function (o) {
                    return this.dropdown.on("change", function (e, n, t) {
                        var r = U(t[n]).node(),
                            i = r.options[r.selectedIndex].value;
                        o(i)
                    }), this
                }
            }, {
                key: "setFont",
                value: function (e) {
                    this.fontFamily = e
                }
            }, {
                key: "getWidth",
                value: function () {
                    return this.width
                }
            }, {
                key: "getHeight",
                value: function () {
                    return this.height
                }
            }]), n
        }(),
        hg = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        yg = Rn(function (o) {
            ! function () {
                var t = function e(n, t) {
                    var r = this;
                    e.count = (e.count || 0) + 1, this.count = e.count, this.isOpened = !1, this.input = a(n), this.input.setAttribute("autocomplete", "off"), this.input.setAttribute("aria-owns", "awesomplete_list_" + this.count), this.input.setAttribute("role", "combobox"), this.options = t = t || {},
                        function (e, n, t) {
                            for (var r in n) {
                                var i = n[r],
                                    o = e.input.getAttribute("data-" + r.toLowerCase());
                                "number" == typeof i ? e[r] = parseInt(o) : !1 === i ? e[r] = null !== o : i instanceof Function ? e[r] = null : e[r] = o, e[r] || 0 === e[r] || (e[r] = r in t ? t[r] : i)
                            }
                        }(this, {
                            minChars: 2,
                            maxItems: 10,
                            autoFirst: !1,
                            data: e.DATA,
                            filter: e.FILTER_CONTAINS,
                            sort: !1 !== t.sort && e.SORT_BYLENGTH,
                            container: e.CONTAINER,
                            item: e.ITEM,
                            replace: e.REPLACE,
                            tabSelect: !1
                        }, t), this.index = -1, this.container = this.container(n), this.ul = a.create("ul", {
                            hidden: "hidden",
                            role: "listbox",
                            id: "awesomplete_list_" + this.count,
                            inside: this.container
                        }), this.status = a.create("span", {
                            className: "visually-hidden",
                            role: "status",
                            "aria-live": "assertive",
                            "aria-atomic": !0,
                            inside: this.container,
                            textContent: 0 != this.minChars ? "Type " + this.minChars + " or more characters for results." : "Begin typing for results."
                        }), this._events = {
                            input: {
                                input: this.evaluate.bind(this),
                                blur: this.close.bind(this, {
                                    reason: "blur"
                                }),
                                keydown: function (e) {
                                    var n = e.keyCode;
                                    r.opened && (13 === n && r.selected ? (e.preventDefault(), r.select()) : 9 === n && r.selected && r.tabSelect ? r.select() : 27 === n ? r.close({
                                        reason: "esc"
                                    }) : 38 !== n && 40 !== n || (e.preventDefault(), r[38 === n ? "previous" : "next"]()))
                                }
                            },
                            form: {
                                submit: this.close.bind(this, {
                                    reason: "submit"
                                })
                            },
                            ul: {
                                mousedown: function (e) {
                                    e.preventDefault()
                                },
                                click: function (e) {
                                    var n = e.target;
                                    if (n !== this) {
                                        for (; n && !/li/i.test(n.nodeName);) n = n.parentNode;
                                        n && 0 === e.button && (e.preventDefault(), r.select(n, e.target))
                                    }
                                }
                            }
                        }, a.bind(this.input, this._events.input), a.bind(this.input.form, this._events.form), a.bind(this.ul, this._events.ul), this.input.hasAttribute("list") ? (this.list = "#" + this.input.getAttribute("list"), this.input.removeAttribute("list")) : this.list = this.input.getAttribute("data-list") || t.list || [], e.all.push(this)
                };

                function n(e) {
                    var n = Array.isArray(e) ? {
                        label: e[0],
                        value: e[1]
                    } : "object" === (void 0 === e ? "undefined" : hg(e)) && "label" in e && "value" in e ? e : {
                        label: e,
                        value: e
                    };
                    this.label = n.label || n.value, this.value = n.value
                }
                t.prototype = {
                    set list(e) {
                        if (Array.isArray(e)) this._list = e;
                        else if ("string" == typeof e && -1 < e.indexOf(",")) this._list = e.split(/\s*,\s*/);
                        else if ((e = a(e)) && e.children) {
                            var i = [];
                            r.apply(e.children).forEach(function (e) {
                                if (!e.disabled) {
                                    var n = e.textContent.trim(),
                                        t = e.value || n,
                                        r = e.label || n;
                                    "" !== t && i.push({
                                        label: r,
                                        value: t
                                    })
                                }
                            }), this._list = i
                        }
                        document.activeElement === this.input && this.evaluate()
                    },
                    get selected() {
                        return -1 < this.index
                    },
                    get opened() {
                        return this.isOpened
                    },
                    close: function (e) {
                        this.opened && (this.ul.setAttribute("hidden", ""), this.isOpened = !1, this.index = -1, this.status.setAttribute("hidden", ""), a.fire(this.input, "awesomplete-close", e || {}))
                    },
                    open: function () {
                        this.ul.removeAttribute("hidden"), this.isOpened = !0, this.status.removeAttribute("hidden"), this.autoFirst && -1 === this.index && this.goto(0), a.fire(this.input, "awesomplete-open")
                    },
                    destroy: function () {
                        if (a.unbind(this.input, this._events.input), a.unbind(this.input.form, this._events.form), !this.options.container) {
                            var e = this.container.parentNode;
                            e.insertBefore(this.input, this.container), e.removeChild(this.container)
                        }
                        this.input.removeAttribute("autocomplete"), this.input.removeAttribute("aria-autocomplete");
                        var n = t.all.indexOf(this); - 1 !== n && t.all.splice(n, 1)
                    },
                    next: function () {
                        var e = this.ul.children.length;
                        this.goto(this.index < e - 1 ? this.index + 1 : e ? 0 : -1)
                    },
                    previous: function () {
                        var e = this.ul.children.length,
                            n = this.index - 1;
                        this.goto(this.selected && -1 !== n ? n : e - 1)
                    },
                    goto: function (e) {
                        var n = this.ul.children;
                        this.selected && n[this.index].setAttribute("aria-selected", "false"), -1 < (this.index = e) && 0 < n.length && (n[e].setAttribute("aria-selected", "true"), this.status.textContent = n[e].textContent + ", list item " + (e + 1) + " of " + n.length, this.input.setAttribute("aria-activedescendant", this.ul.id + "_item_" + this.index), this.ul.scrollTop = n[e].offsetTop - this.ul.clientHeight + n[e].clientHeight, a.fire(this.input, "awesomplete-highlight", {
                            text: this.suggestions[this.index]
                        }))
                    },
                    select: function (e, n) {
                        if (e ? this.index = a.siblingIndex(e) : e = this.ul.children[this.index], e) {
                            var t = this.suggestions[this.index];
                            a.fire(this.input, "awesomplete-select", {
                                text: t,
                                origin: n || e
                            }) && (this.replace(t), this.close({
                                reason: "select"
                            }), a.fire(this.input, "awesomplete-selectcomplete", {
                                text: t
                            }))
                        }
                    },
                    evaluate: function () {
                        var t = this,
                            r = this.input.value;
                        r.length >= this.minChars && this._list && 0 < this._list.length ? (this.index = -1, this.ul.innerHTML = "", this.suggestions = this._list.map(function (e) {
                            return new n(t.data(e, r))
                        }).filter(function (e) {
                            return t.filter(e, r)
                        }), !1 !== this.sort && (this.suggestions = this.suggestions.sort(this.sort)), this.suggestions = this.suggestions.slice(0, this.maxItems), this.suggestions.forEach(function (e, n) {
                            t.ul.appendChild(t.item(e, r, n))
                        }), 0 === this.ul.children.length ? (this.status.textContent = "No results found", this.close({
                            reason: "nomatches"
                        })) : (this.open(), this.status.textContent = this.ul.children.length + " results found")) : (this.close({
                            reason: "nomatches"
                        }), this.status.textContent = "No results found")
                    }
                }, t.all = [], t.FILTER_CONTAINS = function (e, n) {
                    return RegExp(a.regExpEscape(n.trim()), "i").test(e)
                }, t.FILTER_STARTSWITH = function (e, n) {
                    return RegExp("^" + a.regExpEscape(n.trim()), "i").test(e)
                }, t.SORT_BYLENGTH = function (e, n) {
                    return e.length !== n.length ? e.length - n.length : e < n ? -1 : 1
                }, t.CONTAINER = function (e) {
                    return a.create("div", {
                        className: "awesomplete",
                        around: e
                    })
                }, t.ITEM = function (e, n, t) {
                    var r = "" === n.trim() ? e : e.replace(RegExp(a.regExpEscape(n.trim()), "gi"), "<mark>$&</mark>");
                    return a.create("li", {
                        innerHTML: r,
                        "aria-selected": "false",
                        id: "awesomplete_list_" + this.count + "_item_" + t
                    })
                }, t.REPLACE = function (e) {
                    this.input.value = e.value
                }, t.DATA = function (e) {
                    return e
                }, Object.defineProperty(n.prototype = Object.create(String.prototype), "length", {
                    get: function () {
                        return this.label.length
                    }
                }), n.prototype.toString = n.prototype.valueOf = function () {
                    return "" + this.label
                };
                var r = Array.prototype.slice;

                function a(e, n) {
                    return "string" == typeof e ? (n || document).querySelector(e) : e || null
                }

                function e(e, n) {
                    return r.call((n || document).querySelectorAll(e))
                }

                function i() {
                    e("input.awesomplete").forEach(function (e) {
                        new t(e)
                    })
                }
                a.create = function (e, n) {
                    var t = document.createElement(e);
                    for (var r in n) {
                        var i = n[r];
                        if ("inside" === r) a(i).appendChild(t);
                        else if ("around" === r) {
                            var o = a(i);
                            o.parentNode.insertBefore(t, o), t.appendChild(o), null != o.getAttribute("autofocus") && o.focus()
                        } else r in t ? t[r] = i : t.setAttribute(r, i)
                    }
                    return t
                }, a.bind = function (n, e) {
                    if (n)
                        for (var t in e) {
                            var r = e[t];
                            t.split(/\s+/).forEach(function (e) {
                                n.addEventListener(e, r)
                            })
                        }
                }, a.unbind = function (n, e) {
                    if (n)
                        for (var t in e) {
                            var r = e[t];
                            t.split(/\s+/).forEach(function (e) {
                                n.removeEventListener(e, r)
                            })
                        }
                }, a.fire = function (e, n, t) {
                    var r = document.createEvent("HTMLEvents");
                    for (var i in r.initEvent(n, !0, !0), t) r[i] = t[i];
                    return e.dispatchEvent(r)
                }, a.regExpEscape = function (e) {
                    return e.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")
                }, a.siblingIndex = function (e) {
                    for (var n = 0; e = e.previousElementSibling; n++);
                    return n
                }, "undefined" != typeof self && (self.Awesomplete = t), "undefined" != typeof Document && ("loading" !== document.readyState ? i() : document.addEventListener("DOMContentLoaded", i)), t.$ = a, t.$$ = e, o.exports && (o.exports = t)
            }()
        }),
        mg = vg(["\n  label: searchBarWrapper;\n  padding: 0.5rem;\n\n  .awesomplete {\n    width: 155px;\n    border-radius: 10px;\n    box-shadow: none;\n\n    mark {\n      background-color: transparent !important;\n      padding: 0;\n      margin: 0;\n      color: ", ";\n    }\n    ul {\n      max-height: 50vh;\n      overflow-y: scroll;\n      font-size: 14px;\n      scrollbar-width: thin;\n\n      color: ", ";\n      background: ", ";\n      border: none;\n      box-shadow: -2px 2px 11px -4px #000;\n\n      :before {\n        background: ", ";\n      }\n      li {\n        scrollbar-width: thin;\n\n        color: ", ";\n        :hover {\n          background: ", ";\n          color: ", ";\n        }\n      }\n    }\n\n    input {\n      width: 100%;\n      height: 20px;\n      font-size: 12px;\n      border-radius: 0.285rem;\n      background: ", ";\n      color: ", ";\n      border: none;\n      padding: 3px 8px;\n      box-shadow: 2px 2px 11px -4px #14151c;\n\n      &:focus {\n        outline-style: none;\n      }\n      ::placeholder {\n        color: ", ";\n      }\n    }\n  }\n"], ["\n  label: searchBarWrapper;\n  padding: 0.5rem;\n\n  .awesomplete {\n    width: 155px;\n    border-radius: 10px;\n    box-shadow: none;\n\n    mark {\n      background-color: transparent !important;\n      padding: 0;\n      margin: 0;\n      color: ", ";\n    }\n    ul {\n      max-height: 50vh;\n      overflow-y: scroll;\n      font-size: 14px;\n      scrollbar-width: thin;\n\n      color: ", ";\n      background: ", ";\n      border: none;\n      box-shadow: -2px 2px 11px -4px #000;\n\n      :before {\n        background: ", ";\n      }\n      li {\n        scrollbar-width: thin;\n\n        color: ", ";\n        :hover {\n          background: ", ";\n          color: ", ";\n        }\n      }\n    }\n\n    input {\n      width: 100%;\n      height: 20px;\n      font-size: 12px;\n      border-radius: 0.285rem;\n      background: ", ";\n      color: ", ";\n      border: none;\n      padding: 3px 8px;\n      box-shadow: 2px 2px 11px -4px #14151c;\n\n      &:focus {\n        outline-style: none;\n      }\n      ::placeholder {\n        color: ", ";\n      }\n    }\n  }\n"]),
        gg = vg(["\n  display: inline-block;\n  position: relative;\n"], ["\n  display: inline-block;\n  position: relative;\n"]);

    function vg(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var Pg = ah(mg, Ef, "#666671", Af, Af, Mf, _f, Mf, _f, Of, kf),
        xg = (ah(gg), function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }());
    var bg = function () {
            function t(e) {
                var n = this;
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.searchBarWrapper = e.append("div").attr("class", Pg), this.input = this.searchBarWrapper.append("input"), this.awesomplete = new yg(this.input.node(), {
                    maxItems: 100,
                    minChars: 0,
                    data: function (e) {
                        return {
                            label: e,
                            value: e
                        }
                    }
                }), this.input.on("click", function () {
                    n.showSuggestions()
                })
            }
            return xg(t, [{
                key: "setData",
                value: function (e) {
                    return this.input.attr("placeholder", e.placeholder), this.awesomplete.list = e.list, this
                }
            }, {
                key: "setActions",
                value: function (n) {
                    return this.input.node().addEventListener("awesomplete-selectcomplete", function (e) {
                        return n.complete(e.text.value)
                    }), this
                }
            }, {
                key: "setFont",
                value: function (e) {
                    this.fontFamily = e
                }
            }, {
                key: "showSuggestions",
                value: function () {
                    this.awesomplete.evaluate(), this.awesomplete.open()
                }
            }]), t
        }(),
        wg = Sg(["\n  label: size-legend-cell;\n"], ["\n  label: size-legend-cell;\n"]),
        Dg = Sg(["\n  label: size-legend-label;\n  text-anchor: start;\n  font-size: 9px;\n  fill: #ccc;\n  -webkit-font-smoothing: antialiased;\n"], ["\n  label: size-legend-label;\n  text-anchor: start;\n  font-size: 9px;\n  fill: #ccc;\n  -webkit-font-smoothing: antialiased;\n"]),
        Gg = Sg(["\n  label: size-legend-line;\n  stroke-width: 0.5;\n  stroke: #d1d1d1;\n"], ["\n  label: size-legend-line;\n  stroke-width: 0.5;\n  stroke: #d1d1d1;\n"]),
        Cg = Sg(["\n  label: size-legend-circle;\n  stroke-width: 0.8;\n  stroke: #ccc;\n  fill: none;\n"], ["\n  label: size-legend-circle;\n  stroke-width: 0.8;\n  stroke: #ccc;\n  fill: none;\n"]);

    function Sg(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var Ig = ah(wg),
        Mg = ah(Dg),
        kg = ah(Gg),
        Ag = ah(Cg),
        _g = function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }();

    function Og(e) {
        if (Array.isArray(e)) {
            for (var n = 0, t = Array(e.length); n < e.length; n++) t[n] = e[n];
            return t
        }
        return Array.from(e)
    }
    var Lg = function () {
            function t(e) {
                var n = this;
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.legend = e.append("div").attr("class", Km), this.isOpen = !0, this.datadata = "n/a", this.colorDropdownContainer = this.legend.append("div"), this.colorDropdown = new fg(this.colorDropdownContainer), this.legendColorContainer = this.legend.append("svg").attr("class", Qm), this.colorBox = this.legendColorContainer.append("g"), this.radiusDropdownContainer = this.legend.append("div"), this.radiusDropdown = new fg(this.radiusDropdownContainer), this.legendSizeContainer = this.legend.append("svg").attr("class", Xm), this.radiusBox = this.legendSizeContainer.append("g").style("transform", "translate(25%, 95%)").attr("transform", "translate(15, 27)"), this.noSizeContainer = this.legend.append("svg").attr("class", Jm), this.symbol = Vd().size(50), this.noRadiusPath = this.noSizeContainer.append("path").style("transform", "translate(50%, 30%)").attr("transform", "translate(15, 8)"), this.noRadiusPath.style("fill", "#ccc").style("stroke-width", .5 / this.kZoom).attr("d", function () {
                    return n.symbol.type(Hd)()
                }), this.noSizeContainer.append("text").text("no data").style("fill", "#ccc").attr("y", 25), this.searchBarContainer = this.legend.append("div").attr("class", eg), this.searchBar = new bg(this.searchBarContainer), this.updateVisibility(), this.legendColor = function () {
                    var d = $c(),
                        f = "rect",
                        h = 15,
                        y = 15,
                        m = 10,
                        g = 2,
                        v = [5],
                        P = void 0,
                        x = [],
                        b = "",
                        w = !1,
                        D = "",
                        G = Tm.d3_defaultLocale,
                        C = Tm.d3_defaultFormatSpecifier,
                        S = 10,
                        I = "middle",
                        M = Tm.d3_defaultDelimiter,
                        k = void 0,
                        A = "vertical",
                        _ = !1,
                        O = void 0,
                        L = void 0,
                        E = Cm("cellover", "cellout", "cellclick");

                    function t(e) {
                        var n = Tm.d3_calcType(d, _, v, x, G.format(C), M);
                        e.selectAll("g").data([d]).enter().append("g").attr("class", b + "legendCells"), P && Tm.d3_filterCells(n, P);
                        var t = e.select("." + b + "legendCells").selectAll("." + b + "cell").data(n.data),
                            r = t.enter().append("g").attr("class", b + "cell");
                        r.append(f).attr("class", b + "swatch");
                        var i = e.selectAll("g." + b + "cell " + f + "." + b + "swatch").data(n.data);
                        Tm.d3_addEvents(r, E), t.exit().transition().style("opacity", 0).remove(), i.exit().transition().style("opacity", 0).remove(), i = i.merge(i), Tm.d3_drawShapes(f, i, y, h, m, O);
                        var o = Tm.d3_addText(e, r, n.labels, b, k);
                        t = r.merge(t);
                        var a = o.nodes().map(function (e) {
                                return e.getBBox()
                            }),
                            l = i.nodes().map(function (e) {
                                return e.getBBox()
                            });
                        w ? i.attr("class", function (e) {
                            return b + "swatch " + n.feature(e)
                        }) : "line" == f ? i.style("stroke", n.feature) : i.style("fill", n.feature);
                        var c, s = void 0,
                            u = void 0,
                            p = "start" == I ? 0 : "middle" == I ? .5 : 1;
                        "vertical" === A ? (c = a.map(function (e, n) {
                            return Math.max(e.height, l[n].height)
                        }), s = function (e, n) {
                            return "translate(0, " + (function (e, n) {
                                var t, r = 0,
                                    i = e.length,
                                    o = -1;
                                if (null == n)
                                    for (; ++o < i;)(t = +e[o]) && (r += t);
                                else
                                    for (; ++o < i;)(t = +n(e[o], o, e)) && (r += t);
                                return r
                            }(c.slice(0, n)) + n * g) + ")"
                        }, u = function (e, n) {
                            return "translate( " + (l[n].width + l[n].x + S) + ", " + (l[n].y + l[n].height / 2 + 5) + ")"
                        }) : "horizontal" === A && (s = function (e, n) {
                            return "translate(" + n * (l[n].width + g) + ",0)"
                        }, u = function (e, n) {
                            return "translate(" + (l[n].width * p + l[n].x) + ",\n          " + (l[n].height + l[n].y + S + 8) + ")"
                        }), Tm.d3_placement(A, t, s, o, u, I), Tm.d3_title(e, D, b, L), t.transition().style("opacity", 1)
                    }
                    return t.scale = function (e) {
                        return arguments.length ? (d = e, t) : d
                    }, t.cells = function (e) {
                        return arguments.length ? ((1 < e.length || 2 <= e) && (v = e), t) : v
                    }, t.cellFilter = function (e) {
                        return arguments.length ? (P = e, t) : P
                    }, t.shape = function (e, n) {
                        return arguments.length ? (("rect" == e || "circle" == e || "line" == e || "path" == e && "string" == typeof n) && (f = e, O = n), t) : f
                    }, t.shapeWidth = function (e) {
                        return arguments.length ? (h = +e, t) : h
                    }, t.shapeHeight = function (e) {
                        return arguments.length ? (y = +e, t) : y
                    }, t.shapeRadius = function (e) {
                        return arguments.length ? (m = +e, t) : m
                    }, t.shapePadding = function (e) {
                        return arguments.length ? (g = +e, t) : g
                    }, t.labels = function (e) {
                        return arguments.length ? (x = e, t) : x
                    }, t.labelAlign = function (e) {
                        return arguments.length ? ("start" != e && "end" != e && "middle" != e || (I = e), t) : I
                    }, t.locale = function (e) {
                        return arguments.length ? (G = Dm(e), t) : G
                    }, t.labelFormat = function (e) {
                        return arguments.length ? (C = mm(e), t) : t.locale().format(C)
                    }, t.labelOffset = function (e) {
                        return arguments.length ? (S = +e, t) : S
                    }, t.labelDelimiter = function (e) {
                        return arguments.length ? (M = e, t) : M
                    }, t.labelWrap = function (e) {
                        return arguments.length ? (k = e, t) : k
                    }, t.useClass = function (e) {
                        return arguments.length ? (!0 !== e && !1 !== e || (w = e), t) : w
                    }, t.orient = function (e) {
                        return arguments.length ? ("horizontal" != (e = e.toLowerCase()) && "vertical" != e || (A = e), t) : A
                    }, t.ascending = function (e) {
                        return arguments.length ? (_ = !!e, t) : _
                    }, t.classPrefix = function (e) {
                        return arguments.length ? (b = e, t) : b
                    }, t.title = function (e) {
                        return arguments.length ? (D = e, t) : D
                    }, t.titleWidth = function (e) {
                        return arguments.length ? (L = e, t) : L
                    }, t.textWrap = function (e) {
                        return arguments.length ? (textWrap = e, t) : textWrap
                    }, t.on = function () {
                        var e = E.on.apply(E, arguments);
                        return e === E ? t : e
                    }, t
                }().scale(Bf(Cf)).shapeWidth(75).shapeHeight(4).labelOffset(5).shapePadding(2).labelFormat("").labelWrap(75).labelAlign("start").orient("horizontal")
            }
            return _g(t, [{
                key: "update",
                value: function () {
                    window.innerWidth <= 1280 ? (this.weirdestLegendUpdateFunctionInMyLife(249, 31, 15, 32, rf), this.datadata = "n/a") : 1280 <= window.innerWidth && window.innerWidth <= 1400 ? (this.weirdestLegendUpdateFunctionInMyLife(498, 62, 32, 60, of ), this.datadata = "n/a") : (this.weirdestLegendUpdateFunctionInMyLife(616, 77, 38, 75, tf), this.datadata = "no data")
                }
            }, {
                key: "weirdestLegendUpdateFunctionInMyLife",
                value: function (e, n, t, r, i) {
                    var o = this;
                    this.legendColor.shapeWidth(n), this.legendColor.shapePadding(0), this.legendColorContainer.style("width", e + "px"), this.colorBox.call(this.legendColor), "political rights score" !== this.type && "civil liberties score" !== this.type && "indicator" !== this.type && this.type ? (this.colorBox.selectAll("text").style("text-anchor", "end"), this.colorBox.selectAll("text").style("transform", "translate(" + r + "px, 17px)"), this.colorBox.selectAll("text").attr("transform", "translate(" + r + ", 17)"), this.colorBox.selectAll("text").text(function (e, n) {
                        return n === e.length - 1 ? o.datadata : o.arr[n]
                    })) : ("political rights score" === this.type || "civil liberties score" === this.type ? this.colorBox.selectAll("text").text(function (e, n) {
                        return 7 === n ? o.datadata : n + 1
                    }) : "indicator" !== this.type && this.type || (this.legendColor.shapeWidth(n - 1), this.legendColor.shapePadding(1), this.colorBox.call(this.legendColor), this.colorBox.selectAll("text").text(function (e, n) {
                        return i[n]
                    })), this.colorBox.selectAll("text").style("text-anchor", "middle"), this.colorBox.selectAll("text").style("transform", "translate(" + t + "px, 17px)"), this.colorBox.selectAll("text").attr("transform", "translate(" + t + ", 17)"))
                }
            }, {
                key: "updateVisibility",
                value: function () {
                    this.isOpen = !this.isOpen, this.legend.classed("hidden", this.isOpen)
                }
            }, {
                key: "sendColorScale",
                value: function (e, r, n) {
                    this.type = e;
                    var i = [].concat(Og(tf));
                    if ("indicator" !== e) {
                        var o = qf(e, n);
                        ("indicator" === e ? Cf : Sf).forEach(function (e, n) {
                            var t = r.invertExtent(e);
                            i[n] = "" + o(t[1])
                        })
                    }
                    var t = Cf;
                    "indicator" !== e && (Df.indexOf(n.indexOf(e)), t = [].concat(Og(Sf)).slice().reverse(), i.pop(), i.reverse(), i.push(this.datadata)), this.arr = i, this.legendColor.scale(Bf(t)), this.update()
                }
            }, {
                key: "sendRadiusScale",
                value: function (n, e, t) {
                    var r, i, o, a, l, c, s, u = qf(e, t),
                        p = [2.5, 7.25, 13],
                        d = p.map(function (e) {
                            return n.invert(e)
                        });
                    this.legendSize ? (this.legendSize.text.attr("y", function (e, n) {
                        return -2 * p[n]
                    }).text(function (e, n) {
                        return u(d[n])
                    }), this.legendSize.circle.attr("r", function (e, n) {
                        return p[n]
                    }).attr("cy", function (e, n) {
                        return -p[n]
                    }), this.legendSize.line.attr("y1", function (e, n) {
                        return -2 * p[n]
                    }).attr("y2", function (e, n) {
                        return -2 * p[n]
                    })) : this.legendSize = (r = this.radiusBox, i = n, o = d, a = u, l = r.selectAll(".legendCell").data(o).enter().append("g").attr("class", Ig + " legendCell"), c = l.append("text").attr("class", Mg).attr("x", 26).attr("y", function (e) {
                        return -2 * i(e)
                    }).attr("dy", function (e, n) {
                        return n === o.length - 1 ? "0.6em" : 0 === n ? "0.15em" : "0.255em"
                    }).text(function (e, n) {
                        return a(e)
                    }), s = l.append("line").attr("class", kg).attr("x1", 0).attr("y1", function (e) {
                        return -2 * i(e)
                    }).attr("x2", 22).attr("y2", function (e) {
                        return -2 * i(e)
                    }), {
                        text: c,
                        circle: l.append("circle").attr("r", function (e) {
                            return i(e)
                        }).attr("class", Ag).attr("cx", 0).attr("cy", function (e) {
                            return -i(e)
                        }),
                        line: s
                    })
                }
            }, {
                key: "setupRadiusDropdown",
                value: function (e) {
                    this.radiusDropdown.setData({
                        options: e.options,
                        selected: e.selected,
                        titleText: "Radius by"
                    }).setActions(e.actions)
                }
            }, {
                key: "setupColorDropdown",
                value: function (e) {
                    this.colorDropdown.setData({
                        options: e.options,
                        selected: e.selected,
                        titleText: "Color by"
                    }).setActions(e.actions)
                }
            }]), t
        }(),
        Eg = jg(["\n  label: welcomeScreen;\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  color: ", ";\n  background-color: rgba(28, 30, 34, 0.8);\n  // backdrop-filter: blur(3px);\n  opacity: 1;\n  transition: opacity 0.5s, backdrop-filter 0.5s;\n\n  &.hidden {\n    // backdrop-filter: blur(0px);\n    opacity: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n    font-weight: bold;\n    &:hover {\n      color: ", ";\n    }\n  }\n\n  .welcome {\n    color: ", ";\n    position: absolute;\n    top: 53%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    min-width: 50%;\n    max-width: 650px;\n    font-size: 15px;\n    display: block;\n    text-align: justify;\n    white-space: pre-wrap;\n\n    &.warning {\n      width: auto;\n    }\n\n    .title {\n      text-transform: uppercase;\n      font-size: 1.9rem;\n      font-weight: 100;\n      color: ", ";\n      text-align: center;\n    }\n\n    .subtitle {\n      margin: 1rem;\n      font-size: 13px;\n      text-align: center;\n    }\n\n    .text {\n      font-size: 14px;\n      line-height: 1.25rem;\n    }\n  }\n"], ["\n  label: welcomeScreen;\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  color: ", ";\n  background-color: rgba(28, 30, 34, 0.8);\n  // backdrop-filter: blur(3px);\n  opacity: 1;\n  transition: opacity 0.5s, backdrop-filter 0.5s;\n\n  &.hidden {\n    // backdrop-filter: blur(0px);\n    opacity: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n    font-weight: bold;\n    &:hover {\n      color: ", ";\n    }\n  }\n\n  .welcome {\n    color: ", ";\n    position: absolute;\n    top: 53%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    min-width: 50%;\n    max-width: 650px;\n    font-size: 15px;\n    display: block;\n    text-align: justify;\n    white-space: pre-wrap;\n\n    &.warning {\n      width: auto;\n    }\n\n    .title {\n      text-transform: uppercase;\n      font-size: 1.9rem;\n      font-weight: 100;\n      color: ", ";\n      text-align: center;\n    }\n\n    .subtitle {\n      margin: 1rem;\n      font-size: 13px;\n      text-align: center;\n    }\n\n    .text {\n      font-size: 14px;\n      line-height: 1.25rem;\n    }\n  }\n"]),
        Ng = jg(["\n  position: relative;\n  margin: 3rem 0;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 125px;\n  font-size: 1.5rem;\n  font-weight: 300;\n  text-transform: uppercase;\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: 4rem;\n  text-align: center;\n  cursor: pointer;\n  padding: 7px 20px;\n\n  &:hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"], ["\n  position: relative;\n  margin: 3rem 0;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 125px;\n  font-size: 1.5rem;\n  font-weight: 300;\n  text-transform: uppercase;\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: 4rem;\n  text-align: center;\n  cursor: pointer;\n  padding: 7px 20px;\n\n  &:hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"]);

    function jg(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var Tg = ah(Eg, Of, Mf, Ef, Mf, Of),
        $g = ah(Ng, Mf, Mf, Ef, Ef),
        zg = function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }();
    var Bg = function () {
            function n(e) {
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, n), this.container = e.attr("class", Tg), this.welcomeText = e.append("div").attr("class", "welcome"), this.welcomeText.append("div").attr("class", "title").html(Cy.introductionTitle), this.welcomeText.append("div").attr("class", "subtitle").html(Cy.introductionSubTitle), this.descriptionText = this.welcomeText.append("div").attr("class", "text"), this.welcomeText.style("opacity", 0), this.welcomeText.transition().duration(800).style("opacity", 1)
            }
            return zg(n, [{
                key: "setupMobile",
                value: function () {
                    this.welcomeText.classed("warning", !0), this.descriptionText.html(Cy.warning)
                }
            }, {
                key: "setupNormal",
                value: function () {
                    return this.descriptionText.html(Cy.introductiondescription), this.startButton = this.welcomeText.append("div").attr("class", $g).text(Cy.startButton), this
                }
            }, {
                key: "setActions",
                value: function (e) {
                    var n = this;
                    this.actions = e, this.startButton.on("click", function () {
                        e.run(), n.container.classed("hidden", !0), setTimeout(function () {
                            n.container.remove()
                        }, 600)
                    })
                }
            }]), n
        }(),
        qg = Hg(["\n  user-select: none;\n  position: absolute;\n  padding: 1rem 1.5rem;\n  top: 45%;\n  left: 50%;\n  width: auto;\n  transform: translate(-50%, -65%) scale(1);\n  background-color: rgba(28, 30, 34, 0.8);\n  backdrop-filter: blur(3px);\n  color: ", ";\n  border-radius: 0.3rem;\n  box-shadow: 2px 2px 11px -4px #14151c;\n  opacity: 1;\n  \n  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  white-space: pre-wrap;\n\n  a {\n    text-decoration: none;\n    color: ", ";\n    font-weight: bold;\n    &:hover {\n      color: ", ";\n    }\n  }\n\n  &.hidden {\n    opacity: 0;\n    \n    top: 55%;\n    transform: translate(-50%, -50%) scale(0.9);\n    pointer-events: none;\n  }\n"], ["\n  user-select: none;\n  position: absolute;\n  padding: 1rem 1.5rem;\n  top: 45%;\n  left: 50%;\n  width: auto;\n  transform: translate(-50%, -65%) scale(1);\n  background-color: rgba(28, 30, 34, 0.8);\n  backdrop-filter: blur(3px);\n  color: ", ";\n  border-radius: 0.3rem;\n  box-shadow: 2px 2px 11px -4px #14151c;\n  opacity: 1;\n  \n  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  white-space: pre-wrap;\n\n  a {\n    text-decoration: none;\n    color: ", ";\n    font-weight: bold;\n    &:hover {\n      color: ", ";\n    }\n  }\n\n  &.hidden {\n    opacity: 0;\n    \n    top: 55%;\n    transform: translate(-50%, -50%) scale(0.9);\n    pointer-events: none;\n  }\n"]),
        Fg = Hg(["\n  margin: 0.5rem;\n  color: ", ";\n  font-size: 1.5rem;\n  font-weight: 100;\n  text-align: center;\n  text-transform: uppercase;\n"], ["\n  margin: 0.5rem;\n  color: ", ";\n  font-size: 1.5rem;\n  font-weight: 100;\n  text-align: center;\n  text-transform: uppercase;\n"]),
        Rg = Hg(["\n  position: relative;\n  font-size: 14px;\n  margin: 0.5rem;\n"], ["\n  position: relative;\n  font-size: 14px;\n  margin: 0.5rem;\n"]),
        Ug = Hg(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin: 15px;\n  cursor: pointer;\n  background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n"], ["\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin: 15px;\n  cursor: pointer;\n  background: url(", ") no-repeat center center;\n  height: 16px;\n  width: 16px;\n"]),
        Yg = Hg(["\n  border: 0;\n  height: 0;\n  border-top: 0.5px solid rgba(0, 0, 0, 0.1);\n  border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);\n  margin: 1rem 0.5rem;\n  width: auto;\n"], ["\n  border: 0;\n  height: 0;\n  border-top: 0.5px solid rgba(0, 0, 0, 0.1);\n  border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);\n  margin: 1rem 0.5rem;\n  width: auto;\n"]);

    function Hg(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    var Vg = ah(qg, Mf, Mf, Ef),
        Wg = ah(Fg, Of),
        Zg = ah(Rg),
        Kg = ah(Ug, ay),
        Xg = ah(Yg),
        Jg = function () {
            function r(e, n) {
                for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (e, n, t) {
                return n && r(e.prototype, n), t && r(e, t), e
            }
        }();
    var Qg = function () {
            function t(e) {
                var n = this;
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.container = e.attr("class", Vg).classed("hidden", !0), this.projectTitle = e.append("div").attr("class", Wg).html(Cy.projectTitle), this.projectDescription = e.append("div").attr("class", Zg).html(Cy.projectDescription), this.divider = e.append("div").attr("class", Xg), this.authors = e.append("div").style("font-size", 13).attr("class", Zg).html(Cy.authors), this.logo = this.authors.append("div").style("position", "absolute").style("right", 0).style("top", 5), this.logo.append("img").attr("class", "world-data-logo-2").attr("src", "data/world-data-logo.svg").attr("alt", "World Data Visualization"), this.closeButton = e.append("div").attr("class", Kg), this.closeButton.on("click", function () {
                    n.container.classed("hidden", !0)
                })
            }
            return Jg(t, [{
                key: "show",
                value: function () {
                    this.container.classed("hidden", !1)
                }
            }, {
                key: "setFont",
                value: function (e) {
                    this.container.style("font-family", e)
                }
            }]), t
        }(),
        ev = tv(["\n  position: absolute;\n  // width: 170px;\n  top: 0;\n  right: 0;\n  opacity: 1;\n  transition: visibility 0.5s, opacity 0.5s;\n\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"], ["\n  position: absolute;\n  // width: 170px;\n  top: 0;\n  right: 0;\n  opacity: 1;\n  transition: visibility 0.5s, opacity 0.5s;\n\n  &.hidden {\n    visibility: hidden;\n    opacity: 0;\n  }\n"]),
        nv = tv(["\n  position: absolute;\n  bottom: 1rem;\n  left: 3rem;\n  opacity: 1;\n  \n  padding: 4px 10px 4px 10px;\n  \n  border-radius: 50px;\n  transition: visibility 0.5s, opacity 0.5s;\n  background: ", ";\n  color: #9b9ba4;\n  font-size: 10pt;\n  font-weight: 600;\n  cursor: pointer;\n\n  \n\n  &.hidden {\n    transition: visibility 0.5s;\n    visibility: hidden;\n    opacity: 0;\n  }\n"], ["\n  position: absolute;\n  bottom: 1rem;\n  left: 3rem;\n  opacity: 1;\n  \n  padding: 4px 10px 4px 10px;\n  \n  border-radius: 50px;\n  transition: visibility 0.5s, opacity 0.5s;\n  background: ", ";\n  color: #9b9ba4;\n  font-size: 10pt;\n  font-weight: 600;\n  cursor: pointer;\n\n  \n\n  &.hidden {\n    transition: visibility 0.5s;\n    visibility: hidden;\n    opacity: 0;\n  }\n"]);

    function tv(e, n) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }
    ah(ev);
    var rv = ah(nv, Lf, "data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20focusable%3D%22false%22%20data-prefix%3D%22fas%22%20data-icon%3D%22redo%22%20class%3D%22svg-inline--fa%20fa-redo%20fa-w-16%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22%239B9BA5%22%20d%3D%22M500.33%200h-47.41a12%2012%200%200%200-12%2012.57l4%2082.76A247.42%20247.42%200%200%200%20256%208C119.34%208%207.9%20119.53%208%20256.19%208.1%20393.07%20119.1%20504%20256%20504a247.1%20247.1%200%200%200%20166.18-63.91%2012%2012%200%200%200%20.48-17.43l-34-34a12%2012%200%200%200-16.38-.55A176%20176%200%201%201%20402.1%20157.8l-101.53-4.87a12%2012%200%200%200-12.57%2012v47.41a12%2012%200%200%200%2012%2012h200.33a12%2012%200%200%200%2012-12V12a12%2012%200%200%200-12-12z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"),
        iv = ivdata,
        ov = Rn(function (e) {
            var n, t = t || {
                REVISION: "0.2"
            };
            ! function (e) {
                var P = function (e, n) {
                        if (!e) throw n || "Assertion failed"
                    },
                    n = function (e, n, t) {
                        return e.hasOwnProperty(n) ? e[n] : t
                    },
                    o = !1,
                    a = 0,
                    c = function (e, n) {
                        return e + function e() {
                            if (o) return o = !1, a;
                            var n = 2 * Math.random() - 1,
                                t = 2 * Math.random() - 1,
                                r = n * n + t * t;
                            if (0 == r || 1 < r) return e();
                            var i = Math.sqrt(-2 * Math.log(r) / r);
                            return a = t * i, o = !0, n * i
                        }() * n
                    },
                    t = function (e, n, t) {
                        for (var r = void 0 !== t, i = [], o = 0; o < e; o++) {
                            for (var a = [], l = 0; l < n; l++) r ? a.push(t) : a.push(c(0, tsne.std));
                            i.push(a)
                        }
                        return i
                    },
                    l = function (e, n) {
                        for (var t = e.length, r = 0, i = 0; i < t; i++) {
                            var o = e[i],
                                a = n[i];
                            r += (o - a) * (o - a)
                        }
                        return r
                    },
                    s = function (e, n) {
                        for (var t = e.length, r = 0, i = 0; i < t; i++) r += Math.abs(e[i] - n[i]);
                        return r
                    },
                    u = function (e, n, t) {
                        var r = Math.sqrt(e.length),
                            i = Math.floor(r);
                        P(i === r, "D should have square number of elements."), tsne.Htarget = Math.log(n);
                        for (var o = new Float64Array(i * i), a = new Float64Array(i), l = 0; l < i; l++) {
                            for (var c = -1 / 0, s = 1 / 0, u = 1, p = !1, d = 0; !p;) {
                                for (var f = 0, h = 0; h < i; h++) {
                                    var y = Math.exp(-e[l * i + h] * u);
                                    l === h && (y = 0), f += a[h] = y
                                }
                                var m = 0;
                                for (h = 0; h < i; h++) {
                                    if (0 === f) y = 0;
                                    else y = a[h] / f;
                                    1e-7 < (a[h] = y) && (m -= y * Math.log(y))
                                }
                                m > tsne.Htarget ? (c = u, s === 1 / 0 ? u *= 2 : u = (u + s) / 2) : (s = u, c === -1 / 0 ? u /= 2 : u = (u + c) / 2), d++, Math.abs(m - tsne.Htarget) < t && (p = !0), 50 <= d && (p = !0)
                            }
                            for (h = 0; h < i; h++) o[l * i + h] = a[h]
                        }
                        var g = new Float64Array(i * i),
                            v = 2 * i;
                        for (l = 0; l < i; l++)
                            for (h = 0; h < i; h++) g[l * i + h] = Math.max((o[l * i + h] + o[h * i + l]) / v, 1e-100);
                        return g
                    };

                function d(e) {
                    return 0 < e ? 1 : e < 0 ? -1 : 0
                }
                var r = function (e) {
                    e = e || {};
                    this.prev_cost = 1e6, this.stopCond = 2e-6, this.perplexity = n(e, "perplexity", 30), this.dim = n(e, "dim", 2), this.epsilon = n(e, "epsilon", 10), this.iter = 0, this.STOP = !1, this.std = n(e, "spread", 1e-4), this.measure = n(e, "measure", "manhattan"), this.initial = n(e, "initial", "random")
                };
                r.prototype = {
                    animate: function (e) {
                        var r = this;
                        this.draw = e, d3.timer(function () {
                            var e = "N-Body" == d3.select("body").datum().physics;
                            r.step(), r.draw();
                            var n = tsne.getCost(),
                                t = tsne.prev_cost - n;
                            return tsne.prev_cost = n, !e || r.STOP || 0 < t && t < r.stopCond
                        })
                    },
                    check: function () {
                        console.log({
                            step: this.iter,
                            cost: this.getCost()
                        })
                    },
                    costGrad: function (e) {
                        for (var n = this.N, t = this.dim, r = this.P, i = (this.iter, new Float64Array(n * n)), o = 0, a = 0; a < n; a++)
                            for (var l = a + 1; l < n; l++) {
                                for (var c = 0, s = 0; s < t; s++) {
                                    var u = e[a][s] - e[l][s];
                                    c += u * u
                                }
                                var p = 1 / (1 + c);
                                i[a * n + l] = p, o += 2 * (i[l * n + a] = p)
                            }
                        for (var d = n * n, f = new Float64Array(d), h = 0; h < d; h++) f[h] = Math.max(i[h] / o, 1e-100);
                        var y = 0,
                            m = [];
                        for (a = 0; a < n; a++) {
                            var g = new Array(t);
                            for (s = 0; s < t; s++) g[s] = 0;
                            for (l = 0; l < n; l++) {
                                y += -r[a * n + l] * Math.log(f[a * n + l]);
                                var v = 4 * (1 * r[a * n + l] - f[a * n + l]) * i[a * n + l];
                                for (s = 0; s < t; s++) g[s] += v * (e[a][s] - e[l][s])
                            }
                            m.push(g)
                        }
                        return {
                            cost: y,
                            grad: m
                        }
                    },
                    debugGrad: function () {
                        for (var e = this.N, n = this.costGrad(this.Y), t = (n.cost, n.grad), r = 0; r < e; r++)
                            for (var i = 0; i < this.dim; i++) {
                                var o = this.Y[r][i];
                                this.Y[r][i] = o + 1e-5;
                                var a = this.costGrad(this.Y);
                                this.Y[r][i] = o - 1e-5;
                                var l = this.costGrad(this.Y),
                                    c = t[r][i],
                                    s = (a.cost - l.cost) / 2e-5;
                                console.log(r + "," + i + ": gradcheck analytic: " + c + " vs. numerical: " + s), this.Y[r][i] = o
                            }
                    },
                    getCost: function () {
                        return this.costGrad(this.Y).cost
                    },
                    getGrad: function () {
                        return this.costGrad(this.Y).grad
                    },
                    getSolution: function () {
                        return this.Y
                    },
                    initDataRaw: function (e, n) {
                        var t = e,
                            r = t.length,
                            i = t[0].length;
                        P(0 < r, " X is empty? You must have some data!"), P(0 < i, " X[0] is empty? Where is the data?");
                        var o = function (e) {
                            for (var n = e.length, t = new Float64Array(n * n), r = 0; r < n; r++)
                                for (var i = r + 1; i < n; i++) {
                                    if ("euclidean" == tsne.measure) var o = l(e[r], e[i]);
                                    else "cityblock" == tsne.measure && (o = s(e[r], e[i]));
                                    t[r * n + i] = o, t[i * n + r] = o
                                }
                            return t
                        }(t);
                        this.P = u(o, this.perplexity, 1e-4), this.N = r, this.initSolution(n)
                    },
                    initDataDist: function (e) {
                        var n = e.length;
                        P(0 < n, " X is empty? You must have some data!");
                        for (var t = new Float64Array(n * n), r = 0; r < n; r++)
                            for (var i = r + 1; i < n; i++) {
                                var o = e[r][i];
                                t[r * n + i] = o, t[i * n + r] = o
                            }
                        this.P = u(t, this.perplexity, 1e-4), this.N = n, this.initSolution()
                    },
                    initSolution: function (e) {
                        "random" == this.initial ? this.Y = t(this.N, this.dim) : this.Y = e, this.gains = t(this.N, this.dim, 1), this.ystep = t(this.N, this.dim, 0), this.iter = 0
                    },
                    initCurrent: function () {},
                    nudge: function () {
                        this.stop(), this.Y.forEach(function (e) {
                            e[0] += c(0, .25), e[1] += c(0, .25)
                        }), this.restart()
                    },
                    restart: function () {
                        var r = this;
                        r.STOP = !1, d3.timer(function () {
                            var e = "N-Body" == d3.select("body").datum().physics;
                            r.step(), r.draw();
                            var n = tsne.getCost(),
                                t = tsne.prev_cost - n;
                            return tsne.prev_cost = n, !e || r.STOP || 0 < t && t < r.stopCond
                        })
                    },
                    step: function () {
                        this.iter += 1;
                        for (var e = this.N, n = this.costGrad(this.Y), t = n.cost, r = n.grad, i = new Float64Array(this.dim), o = 0; o < e; o++)
                            for (var a = 0; a < this.dim; a++) {
                                var l = r[o][a],
                                    c = this.ystep[o][a],
                                    s = this.gains[o][a],
                                    u = d(l) === d(c) ? .8 * s : s + .2;
                                u < .01 && (u = .01), this.gains[o][a] = u;
                                var p = (this.iter < 250 ? .5 : .8) * c - this.epsilon * u * r[o][a];
                                this.ystep[o][a] = p, this.Y[o][a] += p, i[a] += this.Y[o][a]
                            }
                        for (o = 0; o < e; o++)
                            for (a = 0; a < this.dim; a++) this.Y[o][a] -= i[a] / e;
                        return t
                    },
                    stop: function () {
                        this.STOP = !0
                    }
                }, e.tSNE = r
            }(t), n = t, e.exports = n
        });

    function av(e) {
        if (e[0].fv) return function (e) {
            for (var n = e[0].fv.length, t = [], r = [], i = 0; i < n; i++) t[i] = xe(e, lv.bind(null, i)), r[i] = Me(e, lv.bind(null, i));
            return e.map(function (e) {
                return e.fv.map(function (e, n) {
                    return t[n] ? (e - r[n]) / t[n] : 0
                })
            })
        }(e);
        console.log("Cant find a fv object inside node")
    }

    function lv(e, n) {
        return n.fv[e]
    }
    var cv = function () {
        function r(e, n) {
            for (var t = 0; t < n.length; t++) {
                var r = n[t];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function (e, n, t) {
            return n && r(e.prototype, n), t && r(e, t), e
        }
    }();
    var sv = null,
        uv = function () {
            function t(e) {
                var a = this;
                ! function (e, n) {
                    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.element = e, this.container = U(e), this.container.on("click", function () {
                    clearTimeout(sv), sv = setTimeout(function () {
                        window.location.reload(!1)
                    }, 3e5)
                }), this.svg = this.container.append("svg"), this.welcomeScreenBox = this.container.append("div"), this.welcomeScreen = new Bg(this.welcomeScreenBox), this.reset = this.container.append("div").attr("class", rv).on("click", function () {
                    window.location.reload(!1)
                }).classed("hidden", !0), this.reset.append("div").text("Start Over");
                var n = this.container.style("visibility");
                this.container.style("visibility", "visible"), "hidden" === n ? this.welcomeScreen.setupMobile() : (this.welcomeScreen.setupNormal().setActions({
                    run: function () {
                        a._updateTsneData(), a._updateTsne({}), a.guideScreen.setupStepBox(), a.legend.legend.classed("hidden", !1), a.scatter.removeMap(), a.scatter.zoomOutABit(), setTimeout(function () {
                            a.scatter.showText(), a.guideScreen.currentStep += 1, a.guideScreen.update()
                        }, 4e3)
                    }
                }), this.guideScreenBox = this.container.append("div"), this.guideScreen = new Iy(this.guideScreenBox), this.guideScreen.setActions({
                    reset: function () {
                        return a.resetSettings()
                    },
                    story1: function () {
                        a.controlPanel.menuButton.classed("hidden", !1), a.reset.classed("hidden", !1), setTimeout(function () {
                            a.timer.stop()
                        }, 1e4)
                    },
                    story2: function () {},
                    story3: function () {
                        a.scatter.showDevelopedCountries()
                    },
                    story4: function () {
                        a.scatter.showBiggestCountries()
                    },
                    story5: function () {
                        a.scatter.showSingaporeBrunei()
                    },
                    story6: function () {
                        a.scatter.showRussiaBrazil()
                    },
                    story7: function () {
                        a.scatter.zoomOut(5e3), a.scatter.setActiveCountriesRussiaBrazil(), a.controlPanel.update(!0), setTimeout(function () {
                            ["population", "surface area (km²)"].forEach(function (e) {
                                var n = aa(a.features, ["key", e]);
                                n.checked = n.checkbox.check(!1)
                            }), a._updateTsneData(), a._updateTsne({})
                        }, 1e3)
                    },
                    story8: function () {
                        a.scatter.showUSA()
                    },
                    story9: function () {
                        setTimeout(function () {
                            var o = 0;
                            a.tempTimer = ue(function () {
                                var e = a.solution[a.usId],
                                    n = e,
                                    t = a.solution[a.inidaId],
                                    r = t[0] - n[0],
                                    i = t[1] - n[1];
                                e[0] = n[0] + .01 * r, e[1] = n[1] + .01 * i, 150 < (o += 1) && a.tempTimer.stop()
                            }, 250)
                        }, 1e3), ["population", "surface area (km²)"].forEach(function (e) {
                            var n = aa(a.features, ["key", e]);
                            n.checked = n.checkbox.check(!1)
                        }), a.controlPanel.scrollToHealthExpenditure(["health expenditure per person (int. $)", "health expenditure (% of GDP)"])
                    },
                    story10: function () {
                        a.tempTimer.stop(), a.scatter.zoomOut(5e3), a.scatter.useSpy = !1, a.resetCountry(), a.controlPanel.update(!1);
                        var e = U(".awesomplete > input").node();
                        e && (e.value = "", e.focus(), setTimeout(function () {
                            a.legend.searchBar.showSuggestions()
                        }, 500))
                    }
                }), this.scatter = new fh(this.svg), this.contolPanelContainer = this.container.append("div"), this.controlPanel = new oy(this.contolPanelContainer, function () {
                    return a._updateTsne()
                }), this.controlPanel.setResetAction({
                    resetCountry: function () {
                        return a.resetCountry()
                    },
                    resetSettings: function () {
                        return a.resetSettings()
                    }
                }), this.legendContainer = this.container.append("div"), this.legend = new Lg(this.legendContainer, function (e) {
                    a._updateTsne(e)
                }), this.legend.legend.classed("hidden", !0), this.actions = {
                    onPointClick: function (e, n) {
                        a.currentId = n, a.openControlPanel(e)
                    },
                    onSvgClick: function () {
                        a.controlPanel.setupMode(!1), a.controlPanel.panelTitle.text("t-SNE Controls")
                    }
                }, this.scatter.setActions(this.actions), this.tsneOptions = {
                    epsilon: 5,
                    perplexity: 4,
                    dim: 2,
                    measure: "euclidean",
                    initial: ""
                }, this.setData(iv), U(window).on("resize.chart_" + function () {
                    function e() {
                        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                    }
                    return "" + e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
                }(), function () {
                    a.scatter.updatePosition().render(), a.guideScreen.update(), a.legend.update()
                }))
            }
            return cv(t, [{
                key: "_updateTsne",
                value: function (e) {
                    var n = this.data;
                    this.tsneOptions = li(this.tsneOptions, e), this.tsne = new ov.tSNE(this.tsneOptions), window.tsne = this.tsne;
                    var t = this.solution || n.map(function (e) {
                        return [0, 0]
                    });
                    t.forEach(function (e) {
                        e[0] += 3 * (Math.random() - .5), e[1] += 3 * (Math.random() - .5)
                    }), this.tsne.initDataRaw(this.tsneInitData, t), this._startTimer()
                }
            }, {
                key: "_updateTsneData",
                value: function (o) {
                    var e = this.data,
                        n = this.features,
                        a = this.prepedData,
                        l = n.filter(function (e) {
                            return e.checked
                        }),
                        c = {
                            features: l.map(function (e) {
                                return e.key
                            }),
                            data: []
                        };
                    yi(e, function (e, n) {
                        var t, r, i;
                        o && n === o.countryId && (a[n][o.key] = +o.value), c.data.push({
                            name: e["ISO Country code"],
                            fv: (t = a[n], r = l.map(function (e) {
                                return e.key
                            }), i = [], yi(r, function (e) {
                                i.push(t[e])
                            }), i)
                        })
                    });
                    var t = c.data.map(function (e) {
                        return {
                            fv: e.fv
                        }
                    });
                    this.tsneInitData = av(t)
                }
            }, {
                key: "setData",
                value: function (e) {
                    var i = this,
                        n = this.scatter,
                        r = e.filter(function (e) {
                            return -1 === Li(ff, e.indicator)
                        });
                    this.usId = oa(r, function (e) {
                        return "United States" === e.indicator
                    }), this.inidaId = oa(r, function (e) {
                        return "India" === e.indicator
                    }), this.chinaId = oa(r, function (e) {
                        return "China" === e.indicator
                    }), this.data = r;
                    var t = pi(r[0]);
                    this.features = t.filter(function (e) {
                        return "indicator" !== e && "ISO Country code" !== e
                    }).map(function (n, e) {
                        var t = r.map(function (e) {
                            return +e[n]
                        }).filter(function (e) {
                            return gi(e)
                        }).length;
                        return {
                            key: n,
                            isSuitable: t < .2 * r.length && -1 === Li(vf, n),
                            extent: be(r.map(function (e) {
                                return +e[n]
                            }))
                        }
                    }), this.features.forEach(function (e) {
                        return e.checked = e.isSuitable
                    });
                    var o = {};
                    yi(this.features, function (n) {
                        o[n.key] = Me(r.map(function (e) {
                            return +e[n.key]
                        }))
                    }), this.prepedData = r.map(function (t) {
                        var r = {};
                        return yi(i.features, function (e) {
                            var n = +t[e.key];
                            gi(n) ? r[e.key] = o[e.key] : r[e.key] = n
                        }), r
                    }), this.defaultPrepedData = Ta(this.prepedData), n.setData(r, this.features).setRadius(pf).setColor(df, t.indexOf(df)).render(), this.legend.update(), this.legend.sendRadiusScale(this.scatter.rScale, pf, t), this.geopos = this.scatter.setGeoPosition(this.data), this.scatter.zoomTo("Greece", 1.8, 28e3, !0), this.legend.setupRadiusDropdown({
                        options: t.filter(function (e) {
                            return "indicator" !== e && "ISO Country code" !== e
                        }),
                        selected: pf,
                        actions: function (e) {
                            n.setRadius(e).setNodeValue({
                                countryId: i.currentId,
                                key: e,
                                value: i.controlPanel.countrySliders[e].getValue()
                            }), i.legend.sendRadiusScale(i.scatter.rScale, e, t)
                        }
                    }), this.legend.setupColorDropdown({
                        options: t.filter(function (e) {
                            return "ISO Country code" !== e
                        }),
                        selected: df,
                        actions: function (e) {
                            n.setColor(e, t.indexOf(e)).setNodeValue({
                                countryId: i.currentId,
                                key: e,
                                value: "indicator" === e ? "indicator" : i.controlPanel.countrySliders[e].getValue()
                            }), i.legend.sendColorScale(e, i.scatter.colorScale, t)
                        }
                    }), yi(this.features, function (n) {
                        n.checkbox = i.controlPanel.setupCheckbox({
                            checked: n.isSuitable,
                            title: n.key,
                            action: function (e) {
                                n.checked = e, i._updateTsneData(), i._updateTsne({})
                            }
                        }), i.controlPanel.createCountryPanel({
                            formatter: qf(n.key, t),
                            feature: n,
                            title: n.key,
                            allKeys: t,
                            action: function (e) {
                                i.scatter.setNodeValue({
                                    countryId: i.currentId,
                                    key: n.key,
                                    value: e
                                }), i._updateTsneData({
                                    countryId: i.currentId,
                                    value: e,
                                    key: n.key
                                }), i._updateTsne({})
                            }
                        })
                    }), this.defaultFeatures = Ta(this.features), this.legend.searchBar.setData({
                        placeholder: Cy.searchPlaceholder,
                        list: r.map(function (e) {
                            return e.indicator
                        })
                    }).setActions({
                        complete: function (e) {
                            i.timer.stop(), i.controlPanel.setupMode(!0);
                            i.scatter.zoomTo(e);
                            i.currentId = oa(i.data, ["indicator", e]), i.controlPanel.panelTitle.text(e), i.openControlPanel({
                                indicator: e
                            })
                        }
                    })
                }
            }, {
                key: "openControlPanel",
                value: function (n) {
                    var t = this;
                    yi(this.features, function (e) {
                        t.controlPanel.panelTitle.text(n.indicator), t.controlPanel.setupMode(!0), t.controlPanel.countrySliders[e.key].updateTick(t.defaultPrepedData[t.currentId][e.key], gi(+t.data[t.currentId][e.key])).updateValue(t.prepedData[t.currentId][e.key]).updateVisibility(e.checked)
                    }), this.controlPanel.isOpen || (this.controlPanel.isOpen = !0, this.controlPanel.el.classed("hidden", !1), this.controlPanel.menuButton.classed("close", !0))
                }
            }, {
                key: "resetSettings",
                value: function () {
                    var t = this;
                    this.features.forEach(function (e, n) {
                        e.checked = e.checkbox.check(t.defaultFeatures[n].checked), t.controlPanel.countrySliders[e.key].updateVisibility(e.checked)
                    }), this._updateTsneData(), this._updateTsne({
                        perplexity: 4
                    })
                }
            }, {
                key: "resetCountry",
                value: function () {
                    var t = this;
                    this.prepedData[this.currentId] = Ta(this.defaultPrepedData[this.currentId]), this.features.forEach(function (e) {
                        var n = t.prepedData[t.currentId][e.key];
                        t.controlPanel.countrySliders[e.key].updateValue(n), t.controlPanel.countrySliders[e.key].updateVisibility(e.checked)
                    }), this.scatter.setNodeValue({
                        countryId: this.currentId,
                        key: this.scatter.radiusParam,
                        value: this.prepedData[this.currentId][this.scatter.radiusParam]
                    }), this._updateTsneData(), this._updateTsne({})
                }
            }, {
                key: "_startTimer",
                value: function () {
                    var n = this,
                        t = this.tsne;
                    this.timer && this.timer.stop(), this.timer = ue(function () {
                        for (var e = 0; e < 10; e++) t.step();
                        n.solution = t.getSolution(), n.scatter.updatePosition(n.solution)
                    }, 150)
                }
            }, {
                key: "setLogo",
                value: function (e) {
                    var n = this;
                    this.aboutBox = this.container.append("div"), this.about = new Qg(this.aboutBox), U(e).on("click", function () {
                        n.about.show()
                    })
                }
            }, {
                key: "setFont",
                value: function (e) {
                    this.svg.style("font-family", e), this.about.setFont(e)
                }
            }]), t
        }();
    e.Core = uv, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});