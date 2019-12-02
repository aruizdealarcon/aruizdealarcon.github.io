! function(t) {
    var e = {};

    function n(o) {
        if (e[o]) return e[o].exports;
        var r = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: o
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) n.d(o, r, function(e) {
                return t[e]
            }.bind(null, r));
        return o
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 4)
}([function(t, e, n) {
    function o(t) {
        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }! function() {
        "use strict";

        function e(t, e) {
            var n, o, r, i, a = D;
            for (i = arguments.length; i-- > 2;) x.push(arguments[i]);
            for (e && null != e.children && (x.length || x.push(e.children), delete e.children); x.length;)
                if ((o = x.pop()) && void 0 !== o.pop)
                    for (i = o.length; i--;) x.push(o[i]);
                else "boolean" == typeof o && (o = null), (r = "function" != typeof t) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? a[a.length - 1] += o : a === D ? a = [o] : a.push(o), n = r;
            var l = new P;
            return l.nodeName = t, l.children = a, l.attributes = null == e ? void 0 : e, l.key = null == e ? void 0 : e.key, void 0 !== E.vnode && E.vnode(l), l
        }

        function n(t, e) {
            for (var n in e) t[n] = e[n];
            return t
        }

        function r(t, e) {
            null != t && ("function" == typeof t ? t(e) : t.current = e)
        }

        function i(t) {
            !t.__d && (t.__d = !0) && 1 == T.push(t) && (E.debounceRendering || M)(a)
        }

        function a() {
            for (var t; t = T.pop();) t.__d && C(t)
        }

        function l(t, e, n) {
            return "string" == typeof e || "number" == typeof e ? void 0 !== t.splitText : "string" == typeof e.nodeName ? !t._componentConstructor && u(t, e.nodeName) : n || t._componentConstructor === e.nodeName
        }

        function u(t, e) {
            return t.__n === e || t.nodeName.toLowerCase() === e.toLowerCase()
        }

        function c(t) {
            var e = n({}, t.attributes);
            e.children = t.children;
            var o = t.nodeName.defaultProps;
            if (void 0 !== o)
                for (var r in o) void 0 === e[r] && (e[r] = o[r]);
            return e
        }

        function s(t) {
            var e = t.parentNode;
            e && e.removeChild(t)
        }

        function p(t, e, n, i, a) {
            if ("className" === e && (e = "class"), "key" === e);
            else if ("ref" === e) r(n, null), r(i, t);
            else if ("class" !== e || a)
                if ("style" === e) {
                    if (i && "string" != typeof i && "string" != typeof n || (t.style.cssText = i || ""), i && "object" == o(i)) {
                        if ("string" != typeof n)
                            for (var l in n) l in i || (t.style[l] = "");
                        for (var l in i) t.style[l] = "number" == typeof i[l] && !1 === A.test(l) ? i[l] + "px" : i[l]
                    }
                } else if ("dangerouslySetInnerHTML" === e) i && (t.innerHTML = i.__html || "");
            else if ("o" == e[0] && "n" == e[1]) {
                var u = e !== (e = e.replace(/Capture$/, ""));
                e = e.toLowerCase().substring(2), i ? n || t.addEventListener(e, d, u) : t.removeEventListener(e, d, u), (t.__l || (t.__l = {}))[e] = i
            } else if ("list" !== e && "type" !== e && !a && e in t) {
                try {
                    t[e] = null == i ? "" : i
                } catch (t) {}
                null != i && !1 !== i || "spellcheck" == e || t.removeAttribute(e)
            } else {
                var c = a && e !== (e = e.replace(/^xlink:?/, ""));
                null == i || !1 === i ? c ? t.removeAttributeNS("http://www.w3.org/1999/xlink", e.toLowerCase()) : t.removeAttribute(e) : "function" != typeof i && (c ? t.setAttributeNS("http://www.w3.org/1999/xlink", e.toLowerCase(), i) : t.setAttribute(e, i))
            } else t.className = i || ""
        }

        function d(t) {
            return this.__l[t.type](E.event && E.event(t) || t)
        }

        function f() {
            for (var t; t = I.shift();) E.afterMount && E.afterMount(t), t.componentDidMount && t.componentDidMount()
        }

        function h(t, e, n, o, r, i) {
            B++ || (L = null != r && void 0 !== r.ownerSVGElement, N = null != t && !("__preactattr_" in t));
            var a = b(t, e, n, o, i);
            return r && a.parentNode !== r && r.appendChild(a), --B || (N = !1, i || f()), a
        }

        function b(t, e, n, o, r) {
            var i = t,
                a = L;
            if (null != e && "boolean" != typeof e || (e = ""), "string" == typeof e || "number" == typeof e) return t && void 0 !== t.splitText && t.parentNode && (!t._component || r) ? t.nodeValue != e && (t.nodeValue = e) : (i = document.createTextNode(e), t && (t.parentNode && t.parentNode.replaceChild(i, t), m(t, !0))), i.__preactattr_ = !0, i;
            var l = e.nodeName;
            if ("function" == typeof l) return _(t, e, n, o);
            if (L = "svg" === l || "foreignObject" !== l && L, l += "", (!t || !u(t, l)) && (i = function(t, e) {
                    var n = e ? document.createElementNS("http://www.w3.org/2000/svg", t) : document.createElement(t);
                    return n.__n = t, n
                }(l, L), t)) {
                for (; t.firstChild;) i.appendChild(t.firstChild);
                t.parentNode && t.parentNode.replaceChild(i, t), m(t, !0)
            }
            var c = i.firstChild,
                s = i.__preactattr_,
                p = e.children;
            if (null == s) {
                s = i.__preactattr_ = {};
                for (var d = i.attributes, f = d.length; f--;) s[d[f].name] = d[f].value
            }
            return !N && p && 1 === p.length && "string" == typeof p[0] && null != c && void 0 !== c.splitText && null == c.nextSibling ? c.nodeValue != p[0] && (c.nodeValue = p[0]) : (p && p.length || null != c) && y(i, p, n, o, N || null != s.dangerouslySetInnerHTML), g(i, e.attributes, s), L = a, i
        }

        function y(t, e, n, o, r) {
            var i, a, u, c, p, d = t.childNodes,
                f = [],
                h = {},
                y = 0,
                v = 0,
                g = d.length,
                w = 0,
                k = e ? e.length : 0;
            if (0 !== g)
                for (var O = 0; O < g; O++) {
                    var C = d[O],
                        _ = C.__preactattr_;
                    null != (j = k && _ ? C._component ? C._component.__k : _.key : null) ? (y++, h[j] = C) : (_ || (void 0 !== C.splitText ? !r || C.nodeValue.trim() : r)) && (f[w++] = C)
                }
            if (0 !== k)
                for (O = 0; O < k; O++) {
                    var j;
                    if (p = null, null != (j = (c = e[O]).key)) y && void 0 !== h[j] && (p = h[j], h[j] = void 0, y--);
                    else if (v < w)
                        for (i = v; i < w; i++)
                            if (void 0 !== f[i] && l(a = f[i], c, r)) {
                                p = a, f[i] = void 0, i === w - 1 && w--, i === v && v++;
                                break
                            } p = b(p, c, n, o), u = d[O], p && p !== t && p !== u && (null == u ? t.appendChild(p) : p === u.nextSibling ? s(u) : t.insertBefore(p, u))
                }
            if (y)
                for (var O in h) void 0 !== h[O] && m(h[O], !1);
            for (; v <= w;) void 0 !== (p = f[w--]) && m(p, !1)
        }

        function m(t, e) {
            var n = t._component;
            n ? j(n) : (null != t.__preactattr_ && r(t.__preactattr_.ref, null), !1 !== e && null != t.__preactattr_ || s(t), v(t))
        }

        function v(t) {
            for (t = t.lastChild; t;) {
                var e = t.previousSibling;
                m(t, !0), t = e
            }
        }

        function g(t, e, n) {
            var o;
            for (o in n) e && null != e[o] || null == n[o] || p(t, o, n[o], n[o] = void 0, L);
            for (o in e) "children" === o || "innerHTML" === o || o in n && e[o] === ("value" === o || "checked" === o ? t[o] : n[o]) || p(t, o, n[o], n[o] = e[o], L)
        }

        function w(t, e, n) {
            var o, r = U.length;
            for (t.prototype && t.prototype.render ? (o = new t(e, n), S.call(o, e, n)) : ((o = new S(e, n)).constructor = t, o.render = k); r--;)
                if (U[r].constructor === t) return o.__b = U[r].__b, U.splice(r, 1), o;
            return o
        }

        function k(t, e, n) {
            return this.constructor(t, n)
        }

        function O(t, e, n, o, a) {
            t.__x || (t.__x = !0, t.__r = e.ref, t.__k = e.key, delete e.ref, delete e.key, void 0 === t.constructor.getDerivedStateFromProps && (!t.base || a ? t.componentWillMount && t.componentWillMount() : t.componentWillReceiveProps && t.componentWillReceiveProps(e, o)), o && o !== t.context && (t.__c || (t.__c = t.context), t.context = o), t.__p || (t.__p = t.props), t.props = e, t.__x = !1, 0 !== n && (1 !== n && !1 === E.syncComponentUpdates && t.base ? i(t) : C(t, 1, a)), r(t.__r, t))
        }

        function C(t, e, o, r) {
            if (!t.__x) {
                var i, a, l, u = t.props,
                    s = t.state,
                    p = t.context,
                    d = t.__p || u,
                    b = t.__s || s,
                    y = t.__c || p,
                    v = t.base,
                    g = t.__b,
                    k = v || g,
                    _ = t._component,
                    S = !1,
                    P = y;
                if (t.constructor.getDerivedStateFromProps && (s = n(n({}, s), t.constructor.getDerivedStateFromProps(u, s)), t.state = s), v && (t.props = d, t.state = b, t.context = y, 2 !== e && t.shouldComponentUpdate && !1 === t.shouldComponentUpdate(u, s, p) ? S = !0 : t.componentWillUpdate && t.componentWillUpdate(u, s, p), t.props = u, t.state = s, t.context = p), t.__p = t.__s = t.__c = t.__b = null, t.__d = !1, !S) {
                    i = t.render(u, s, p), t.getChildContext && (p = n(n({}, p), t.getChildContext())), v && t.getSnapshotBeforeUpdate && (P = t.getSnapshotBeforeUpdate(d, b));
                    var x, D, M = i && i.nodeName;
                    if ("function" == typeof M) {
                        var A = c(i);
                        (a = _) && a.constructor === M && A.key == a.__k ? O(a, A, 1, p, !1) : (x = a, t._component = a = w(M, A, p), a.__b = a.__b || g, a.__u = t, O(a, A, 0, p, !1), C(a, 1, o, !0)), D = a.base
                    } else l = k, (x = _) && (l = t._component = null), (k || 1 === e) && (l && (l._component = null), D = h(l, i, p, o || !v, k && k.parentNode, !0));
                    if (k && D !== k && a !== _) {
                        var T = k.parentNode;
                        T && D !== T && (T.replaceChild(D, k), x || (k._component = null, m(k, !1)))
                    }
                    if (x && j(x), t.base = D, D && !r) {
                        for (var L = t, N = t; N = N.__u;)(L = N).base = D;
                        D._component = L, D._componentConstructor = L.constructor
                    }
                }
                for (!v || o ? I.push(t) : S || (t.componentDidUpdate && t.componentDidUpdate(d, b, P), E.afterUpdate && E.afterUpdate(t)); t.__h.length;) t.__h.pop().call(t);
                B || r || f()
            }
        }

        function _(t, e, n, o) {
            for (var r = t && t._component, i = r, a = t, l = r && t._componentConstructor === e.nodeName, u = l, s = c(e); r && !u && (r = r.__u);) u = r.constructor === e.nodeName;
            return r && u && (!o || r._component) ? (O(r, s, 3, n, o), t = r.base) : (i && !l && (j(i), t = a = null), r = w(e.nodeName, s, n), t && !r.__b && (r.__b = t, a = null), O(r, s, 1, n, o), t = r.base, a && t !== a && (a._component = null, m(a, !1))), t
        }

        function j(t) {
            E.beforeUnmount && E.beforeUnmount(t);
            var e = t.base;
            t.__x = !0, t.componentWillUnmount && t.componentWillUnmount(), t.base = null;
            var n = t._component;
            n ? j(n) : e && (null != e.__preactattr_ && r(e.__preactattr_.ref, null), t.__b = e, s(e), U.push(t), v(e)), r(t.__r, null)
        }

        function S(t, e) {
            this.__d = !0, this.context = e, this.props = t, this.state = this.state || {}, this.__h = []
        }
        var P = function() {},
            E = {},
            x = [],
            D = [],
            M = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
            A = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
            T = [],
            I = [],
            B = 0,
            L = !1,
            N = !1,
            U = [];
        n(S.prototype, {
            setState: function(t, e) {
                this.__s || (this.__s = this.state), this.state = n(n({}, this.state), "function" == typeof t ? t(this.state, this.props) : t), e && this.__h.push(e), i(this)
            },
            forceUpdate: function(t) {
                t && this.__h.push(t), C(this, 2)
            },
            render: function() {}
        });
        var H = {
            h: e,
            createElement: e,
            cloneElement: function(t, o) {
                return e(t.nodeName, n(n({}, t.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : t.children)
            },
            createRef: function() {
                return {}
            },
            Component: S,
            render: function(t, e, n) {
                return h(n, t, {}, !1, e, !1)
            },
            rerender: a,
            options: E
        };
        t.exports = H
    }()
}, function(t, e, n) {
    var o;

    function r(t) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */
    ! function() {
        "use strict";
        var i = {}.hasOwnProperty;

        function a() {
            for (var t = [], e = 0; e < arguments.length; e++) {
                var n = arguments[e];
                if (n) {
                    var o = r(n);
                    if ("string" === o || "number" === o) t.push(n);
                    else if (Array.isArray(n) && n.length) {
                        var l = a.apply(null, n);
                        l && t.push(l)
                    } else if ("object" === o)
                        for (var u in n) i.call(n, u) && n[u] && t.push(u)
                }
            }
            return t.join(" ")
        }
        t.exports ? (a.default = a, t.exports = a) : "object" === r(n(3)) && n(3) ? void 0 === (o = function() {
            return a
        }.apply(e, [])) || (t.exports = o) : window.classNames = a
    }()
}, function(t, e, n) {
    "use strict";
    t.exports = function(t) {
        var e = document.createElement("textarea");
        e.value = t, e.setAttribute("readonly", ""), e.style.contain = "strict", e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "12pt";
        var n = document.getSelection(),
            o = !1;
        n.rangeCount > 0 && (o = n.getRangeAt(0)), document.body.appendChild(e), e.select(), e.selectionStart = 0, e.selectionEnd = t.length;
        var r = !1;
        try {
            r = document.execCommand("copy")
        } catch (t) {}
        return document.body.removeChild(e), o && (n.removeAllRanges(), n.addRange(o)), r
    }
}, function(t, e) {
    (function(e) {
        t.exports = e
    }).call(this, {})
}, function(t, e, n) {
    "use strict";
    n.r(e);
    var o = n(0),
        r = n(2),
        i = n.n(r);

    function a(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                return n
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function l(t, e) {
        for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++) o[r - 2] = arguments[r];
        return {
            type: t,
            props: e || {},
            key: e && e.key,
            children: function t(e) {
                return e.reduce(function(e, n) {
                    return n instanceof Array ? e.push.apply(e, a(t(n))) : e.push(n), e
                }, [])
            }(o)
        }
    }

    function u(t) {
        return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function c(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {},
                o = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable
            }))), o.forEach(function(e) {
                s(t, e, n[e])
            })
        }
        return t
    }

    function s(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function p(t, e) {
        return !e || "object" !== u(e) && "function" != typeof e ? function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }

    function d(t) {
        return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function f(t, e) {
        return (f = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function h(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function b(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function y(t, e, n) {
        return e && b(t.prototype, e), n && b(t, n), t
    }

    function m(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                return n
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function v(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = [],
                o = !0,
                r = !1,
                i = void 0;
            try {
                for (var a, l = t[Symbol.iterator](); !(o = (a = l.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
            } catch (t) {
                r = !0, i = t
            } finally {
                try {
                    o || null == l.return || l.return()
                } finally {
                    if (r) throw i
                }
            }
            return n
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }
    var g = ['"', ",", "]"];
    var w = function() {},
        k = function() {},
        O = function() {
            function t(e) {
                h(this, t), this.props = e
            }
            return y(t, [{
                key: "render",
                value: function() {}
            }]), t
        }(),
        C = function(t) {
            function e(t) {
                var n;
                h(this, e);
                var o = function t(e) {
                    return e.children.reduce(function(e, n) {
                        return null == n ? e : ([w, k].includes(n.type) ? e.push(n) : e.push.apply(e, m(t(n))), e)
                    }, [])
                }((n = p(this, d(e).call(this, t))).props);
                return n.nodes = o.reduce(function(t, e) {
                    return e.type === w && e.key && e.props.position ? (e.key in t ? t[e.key] = c({}, t[e.key], {
                        props: c({}, t[e.key].props, e.props)
                    }) : t[e.key] = e, t) : t
                }, {}), n.edges = o.reduce(function(e, o) {
                    if (o.type !== k || !o.props.from || !o.props.to) return e;
                    var r, i, a, l, u, s, p, d, f, h, b = v(t.co ? ["to", "from"] : ["from", "to"], 2),
                        y = b[0],
                        m = b[1];
                    return o.props[y] in e || (e[o.props[y]] = []), e[o.props[y]].push(c({}, o, {
                        props: c({}, o.props, {
                            direction: (r = n.nodes[o.props[y]].props.position, i = n.nodes[o.props[m]].props.position, a = v(r, 2), l = a[0], u = a[1], s = v(i, 2), p = s[0] - l, d = s[1] - u, f = [p, d].map(Math.sign), h = [
                                ["l", "", "r"],
                                ["u", "", "d"]
                            ], [p, d].map(function(t, e) {
                                return h[e][f[e] + 1].repeat(Math.abs(t))
                            }).join(""))
                        })
                    })), e
                }, {}), n
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && f(t, e)
            }(e, O), y(e, [{
                key: "getBounds",
                value: function() {
                    var t = this;
                    return Object.keys(this.nodes).map(function(e) {
                        return t.nodes[e].props.position
                    }).reduce(function(t, e) {
                        var n = v(t, 4),
                            o = n[0],
                            r = n[1],
                            i = n[2],
                            a = n[3],
                            l = v(e, 2),
                            u = l[0],
                            c = l[1];
                        return [Math.min(o, u), Math.max(r, u), Math.min(i, c), Math.max(a, c)]
                    }, [1 / 0, -1 / 0, 1 / 0, -1 / 0])
                }
            }, {
                key: "toArray",
                value: function() {
                    var t = v(this.getBounds(), 4),
                        e = t[0],
                        n = t[1],
                        o = t[2],
                        r = t[3];
                    if (e > n || o > r) return [];
                    for (var i = Array(r - o + 1).fill().map(function(t) {
                            return Array(n - e + 1).fill(null)
                        }), a = Object.keys(this.nodes), l = 0; l < a.length; l++) {
                        var u = a[l],
                            c = v(this.nodes[u].props.position, 2),
                            s = c[0];
                        i[c[1] - o][s - e] = {
                            node: this.nodes[u],
                            edges: this.edges[u] || []
                        }
                    }
                    return i
                }
            }, {
                key: "render",
                value: function() {
                    var t = this,
                        e = null == this.props.options ? "" : "[".concat(this.props.options, "]"),
                        n = this.toArray().map(function(e) {
                            return e.map(function(e) {
                                return null == e ? "" : [(n = e.node.props.value, o = v(null != n && g.some(function(t) {
                                    return n.includes(t)
                                }) ? ["{", "}"] : ["", ""], 2), r = o[0], i = o[1], null != n ? "".concat(r).concat(n).concat(i) : "{}")].concat(m(e.edges.map(function(e) {
                                    return function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                            n = t.props,
                                            o = n.direction,
                                            r = n.alt,
                                            i = n.value;
                                        if (null == o) return "";
                                        var a = t.props.labelPosition || "left";
                                        e === !r && "inside" !== a && (a = "left" === a ? "right" : "left");
                                        var l = {
                                                left: "",
                                                right: "'",
                                                inside: " description"
                                            } [a],
                                            u = v(null != i && g.some(function(t) {
                                                return i.includes(t)
                                            }) ? ["{", "}"] : ["", ""], 2),
                                            c = u[0],
                                            s = u[1],
                                            p = ["", null != i ? '"'.concat(c).concat(i).concat(s, '"').concat(l) : null].concat(m(t.props.args || [])).filter(function(t) {
                                                return null != t
                                            }).join(", ");
                                        return "\\arrow[".concat(o).concat(p, "]")
                                    }(e, t.props.co)
                                }))).join(" ");
                                var n, o, r, i
                            })
                        });
                    if (this.props.align && n.length > 0)
                        for (var o = function(t) {
                                for (var e = Math.max.apply(Math, m(n.map(function(e) {
                                        return e[t].length
                                    }))), o = 0; o < n.length; o++) n[o][t] = n[o][t].padEnd(e, " ")
                            }, r = 0; r < n[0].length; r++) o(r);
                    return ["\\begin{tikzcd}".concat(e), n.map(function(t) {
                        return t.join(" & ")
                    }).join(" \\\\\n"), "\\end{tikzcd}"].join("\n")
                }
            }]), e
        }();

    function _(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {},
                o = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable
            }))), o.forEach(function(e) {
                j(t, e, n[e])
            })
        }
        return t
    }

    function j(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function S(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            o = function t(e) {
                if (null == e) return null;
                if (![C, w, k].includes(e.type)) {
                    var n = _({}, e.props, {
                        children: e.children
                    });
                    return "render" in e.type.prototype ? t(new e.type(n).render()) : t(e.type(n))
                }
                return _({}, e, {
                    children: e.children.map(function(e) {
                        return t(e)
                    })
                })
            }(t);
        return null == o || o.type !== C ? null : new C(_({}, o.props, {
            co: n !== !!o.props.co,
            align: !!e.align && e.align,
            children: o.children
        }))
    }

    function P(t) {
        return S(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, arguments.length > 2 && void 0 !== arguments[2] && arguments[2]).render()
    }
    var E = 0;

    function x() {
        return (E++).toString()
    }

    function D(t, e) {
        return t.length === e.length && t.every(function(t, n) {
            return t === e[n]
        })
    }

    function M(t, e) {
        return t.map(function(t, n) {
            return t + e[n]
        })
    }

    function A(t, e) {
        return e.map(function(e) {
            return t * e
        })
    }

    function T(t, e) {
        return t.map(function(t, n) {
            return t - e[n]
        })
    }

    function I(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                return n
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function B(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {},
                o = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable
            }))), o.forEach(function(e) {
                L(t, e, n[e])
            })
        }
        return t
    }

    function L(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function N(t) {
        var e = JSON.parse(t),
            n = e.nodes.map(function(t) {
                return B({}, t, {
                    id: x()
                })
            });
        return {
            nodes: n,
            edges: e.edges.map(function(t) {
                return B({}, t, {
                    from: n[t.from].id,
                    to: n[t.to].id
                })
            })
        }
    }

    function U(t) {
        return e = function(t) {
            var e = [0, 1].map(function(e) {
                return t.nodes.reduce(function(t, n) {
                    return Math.min(t, n.position[e])
                }, 1 / 0)
            });
            return JSON.stringify({
                nodes: t.nodes.map(function(t) {
                    return B({}, t, {
                        id: void 0,
                        position: t.position.map(function(t, n) {
                            return t - e[n]
                        })
                    })
                }),
                edges: t.edges.map(function(e) {
                    return B({}, e, {
                        from: t.nodes.findIndex(function(t) {
                            return t.id === e.from
                        }),
                        to: t.nodes.findIndex(function(t) {
                            return t.id === e.to
                        })
                    })
                })
            })
        }(t), btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(t, e) {
            return String.fromCharCode(parseInt(e, 16))
        }));
        var e
    }

    function H(t) {
        return N((e = t, decodeURIComponent(Array.prototype.map.call(atob(e), function(t) {
            return "%" + ("00" + t.charCodeAt(0).toString(16)).slice(-2)
        }).join(""))));
        var e
    }

    function R(t) {
        return P(l(C, null, t.nodes.map(function(t, e) {
            return l(w, {
                key: t.id,
                position: t.position,
                value: t.value
            })
        }), t.edges.map(function(t) {
            return [l(k, {
                from: t.from,
                to: t.to,
                value: t.value,
                labelPosition: t.labelPosition,
                args: [].concat(I([t.head, t.line, t.tail, t.labelPositionLongitudinal].map(function(t, e) {
                    return {
                        none: ["no head", null, null][e],
                        default: null,
                        harpoon: "harpoon",
                        harpoonalt: "harpoon'",
                        hook: "hook",
                        hookalt: "hook'",
                        mapsto: "maps to",
                        tail: "tail",
                        twoheads: "two heads",
                        dashed: "dashed",
                        dotted: "dotted",
                        solid: null,
                        center: null,
                        nearstart: "near start",
                        nearend: "near end",
                        verynearstart: "very near start",
                        verynearend: "very near end"
                    } [t]
                })), [t.bend > 0 ? "bend left=".concat(t.bend).replace("=30", "") : t.bend < 0 ? "bend right=".concat(-t.bend).replace("=30", "") : null]).filter(function(t) {
                    return null != t
                })
            })]
        })), {
            align: !0
        })
    }
    var z = n(1),
        J = n.n(z);

    function W(t) {
        return (W = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function K(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function V(t) {
        return (V = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function G(t, e) {
        return (G = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function F(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function X(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }
    var Y = function(t) {
        function e() {
            var t, n, o, r;
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            for (var i = arguments.length, a = new Array(i), l = 0; l < i; l++) a[l] = arguments[l];
            return o = this, r = (t = V(e)).call.apply(t, [this].concat(a)), n = !r || "object" !== W(r) && "function" != typeof r ? F(o) : r, X(F(F(n)), "handleGrabberMouseDown", function(t) {
                var e = n.props.onGrabberMouseDown,
                    o = void 0 === e ? function() {} : e;
                t.position = n.props.position, o(t)
            }), X(F(F(n)), "handleGrabberDragStart", function(t) {
                t.preventDefault()
            }), X(F(F(n)), "handleEditSubmit", function(t) {
                t.preventDefault();
                var e = n.props.onSubmit;
                (void 0 === e ? function() {} : e)(t)
            }), X(F(F(n)), "handleInputBlur", function(t) {
                n.handleEditSubmit(t)
            }), X(F(F(n)), "stopPropagation", function(t) {
                t.stopPropagation()
            }), X(F(F(n)), "handleInputChange", function(t) {
                var e = n.props.onChange;
                (void 0 === e ? function() {} : e)({
                    position: n.props.position,
                    value: t.currentTarget.value
                })
            }), n
        }
        var n, r, i;
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && G(t, e)
        }(e, o["Component"]), n = e, (r = [{
            key: "componentDidMount",
            value: function() {
                this.componentDidUpdate()
            }
        }, {
            key: "shouldComponentUpdate",
            value: function(t) {
                return t.value !== this.props.value || t.edit !== this.props.edit
            }
        }, {
            key: "componentDidUpdate",
            value: function(t) {
                var e = !0,
                    n = !1,
                    o = void 0;
                try {
                    for (var r, i = this.valueElement.querySelectorAll(['span[id^="MathJax"]', ".MathJax_Preview", "script"].join(", "))[Symbol.iterator](); !(e = (r = i.next()).done); e = !0) {
                        r.value.remove()
                    }
                } catch (t) {
                    n = !0, o = t
                } finally {
                    try {
                        e || null == i.return || i.return()
                    } finally {
                        if (n) throw o
                    }
                }
                this.props.value && MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.valueElement]), null != this.inputElement && t.edit !== this.props.edit && this.inputElement.select()
            }
        }, {
            key: "render",
            value: function() {
                var t = this;
                return Object(o.h)("li", {
                    class: J()("grid-cell", {
                        edit: this.props.edit
                    }),
                    "data-position": this.props.position.join(",")
                }, Object(o.h)("img", {
                    class: "grabber",
                    src: "./grabber.svg",
                    onMouseDown: this.handleGrabberMouseDown,
                    onDragStart: this.handleGrabberDragStart
                }), Object(o.h)("div", {
                    class: "value",
                    ref: function(e) {
                        return t.valueElement = e
                    }
                }, this.props.value ? "\\(".concat(this.props.value, "\\)") : Object(o.h)("span", {
                    class: "hide"
                }, "_")), this.props.edit && Object(o.h)("form", {
                    class: "edit",
                    onSubmit: this.handleEditSubmit
                }, Object(o.h)("input", {
                    ref: function(e) {
                        return t.inputElement = e
                    },
                    type: "text",
                    value: this.props.value,
                    onBlur: this.handleInputBlur,
                    onInput: this.handleInputChange,
                    onMouseDown: this.stopPropagation,
                    onKeyDown: this.stopPropagation
                })))
            }
        }]) && K(n.prototype, r), i && K(n, i), e
    }();

    function q(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                return n
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function Q(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = [],
                o = !0,
                r = !1,
                i = void 0;
            try {
                for (var a, l = t[Symbol.iterator](); !(o = (a = l.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
            } catch (t) {
                r = !0, i = t
            } finally {
                try {
                    o || null == l.return || l.return()
                } finally {
                    if (r) throw i
                }
            }
            return n
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }

    function $(t, e, n) {
        var o = Q(t, 2);
        return {
            width: e,
            height: n,
            left: o[0] - e / 2,
            top: o[1] - n / 2
        }
    }

    function Z(t, e, n) {
        var o = t.left,
            r = t.top,
            i = t.width,
            a = t.height,
            l = Q(e, 2),
            u = l[0],
            c = l[1],
            s = Q(n, 2),
            p = [s[0] - u, s[1] - c],
            d = [o, r];
        return [u, c].map(function(t, e) {
            return [d[e], d[e] + [i, a][e]].map(function(n) {
                return (n - t) / p[e]
            })
        }).reduce(function(t, e) {
            return [].concat(q(t), q(e))
        }, []).filter(function(t) {
            return 0 <= t && t <= 1
        }).map(function(t) {
            return e.map(function(e, n) {
                return e + t * p[n]
            })
        }).filter(function(e) {
            return function(t, e) {
                var n = t.left,
                    o = t.top,
                    r = t.width,
                    i = t.height,
                    a = Q(e, 2),
                    l = a[0],
                    u = a[1];
                return n <= l && l <= n + r && o <= u && u <= o + i
            }(t, e)
        })
    }

    function tt(t) {
        return Math.sqrt(t.reduce(function(t, e) {
            return t + e * e
        }, 0))
    }

    function et(t) {
        return (et = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function nt(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = [],
                o = !0,
                r = !1,
                i = void 0;
            try {
                for (var a, l = t[Symbol.iterator](); !(o = (a = l.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
            } catch (t) {
                r = !0, i = t
            } finally {
                try {
                    o || null == l.return || l.return()
                } finally {
                    if (r) throw i
                }
            }
            return n
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }

    function ot(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function rt(t, e) {
        return !e || "object" !== et(e) && "function" != typeof e ? function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }

    function it(t) {
        return (it = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function at(t, e) {
        return (at = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var lt = function(t) {
        function e(t) {
            var n;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), (n = rt(this, it(e).call(this))).state = {
                labelX: "50%",
                labelY: 0,
                startPoint: t.from.map(function(e) {
                    return e * t.cellSize + t.cellSize / 2
                }),
                endPoint: t.to.map(function(e) {
                    return e * t.cellSize + t.cellSize / 2
                })
            }, n
        }
        var n, r, i;
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && at(t, e)
        }(e, o["Component"]), n = e, (r = [{
            key: "componentDidMount",
            value: function() {
                this.componentDidUpdate(), this.componentWillReceiveProps()
            }
        }, {
            key: "shouldComponentUpdate",
            value: function(t, e) {
                for (var n in t)
                    if (t[n] !== this.props[n]) return !0;
                for (var o in e)
                    if (e[o] instanceof Array && !D(e[o], this.state[o]) || !(e[o] instanceof Array) && e[o] !== this.state[o]) return !0;
                return !1
            }
        }, {
            key: "componentWillReceiveProps",
            value: function(t) {
                var e = this;
                null != t && t.from === this.props.from && t.to === this.props.to && t.bend === this.props.bend || (null == t && (t = this.props), MathJax.Hub.Queue(function() {
                    var n = t.cellSize,
                        o = function(t) {
                            return '.grid-cell[data-position="'.concat(t.join(","), '"] .value')
                        },
                        r = document.querySelector(o(t.from)),
                        i = document.querySelector(o(t.to)),
                        a = 0,
                        l = 0,
                        u = 0,
                        c = 0;
                    if (null != r) {
                        var s = r.getBoundingClientRect();
                        a = s.width, l = s.height
                    }
                    if (null != i) {
                        var p = i.getBoundingClientRect();
                        u = p.width, c = p.height
                    }
                    var d = nt([u, c].map(function(t) {
                        return Math.min(n, t + 20)
                    }), 2);
                    u = d[0], c = d[1];
                    var f = nt([a, l].map(function(t) {
                        return Math.min(n, t + 40)
                    }), 2);
                    a = f[0], l = f[1];
                    var h, b, y, m, v = nt([t.from, t.to].map(function(t) {
                            return t.map(function(t) {
                                return t * n + n / 2
                            })
                        }), 2),
                        g = v[0],
                        w = v[1],
                        k = A(.5, M(g, w)),
                        O = T(w, g),
                        C = M(k, A(e.getLengthAngle().length * Math.tan(-(t.bend || 0) * Math.PI / 180) / 2, (y = Q(O, 2), m = y[0], h = [-y[1], m], b = tt(h), h.map(function(t) {
                            return t / b
                        })))),
                        _ = $(g, a, l),
                        j = $(w, u, c),
                        S = Z(_, g, C)[0],
                        P = Z(j, C, w)[0];
                    e.setState({
                        startPoint: S || g,
                        endPoint: P || w
                    })
                }))
            }
        }, {
            key: "componentDidUpdate",
            value: function(t, e) {
                var n = this;
                if (null != this.valueElement) {
                    var o = !0,
                        r = !1,
                        i = void 0;
                    try {
                        for (var a, l = this.valueElement.querySelectorAll(['span[id^="MathJax"]', ".MathJax_Preview", "script"].join(", "))[Symbol.iterator](); !(o = (a = l.next()).done); o = !0) {
                            a.value.remove()
                        }
                    } catch (t) {
                        r = !0, i = t
                    } finally {
                        try {
                            o || null == l.return || l.return()
                        } finally {
                            if (r) throw i
                        }
                    }
                    this.props.value && MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.valueElement]), MathJax.Hub.Queue(function() {
                        if (null == t || n.props.value !== t.value || n.props.labelPosition !== t.labelPosition || n.props.from !== t.from || n.props.to !== t.to || n.props.bend !== t.bend || n.state.startPoint !== e.startPoint || n.state.endPoint !== e.endPoint) {
                            null == t && (t = n.props);
                            var o = n.edgePath.getBBox(),
                                r = window.getComputedStyle(n.valueElement),
                                i = r.width,
                                a = r.height,
                                l = nt([i, a].map(parseFloat), 2);
                            i = l[0], a = l[1];
                            var u = n.getLengthAngle().angle,
                                c = a * Math.abs(Math.cos(u)) + i * Math.abs(Math.sin(u)) - a;
                            n.setState({
                                labelX: "calc(50% + ".concat(-i / 2 - 6.5, "px)"),
                                labelY: {
                                    left: n.props.bend >= 0 ? o.y - a - c / 2 - 5 : o.y + o.height - a - c / 2 - 11,
                                    right: n.props.bend > 0 ? o.y + c / 2 + 11 : o.y + o.height + c / 2 + 5,
                                    inside: n.props.bend > 0 ? o.y - a / 2 : o.y + o.height - a / 2
                                } [n.props.labelPosition || "left"]
                            })
                        }
                    })
                }
            }
        }, {
            key: "getLengthAngle",
            value: function() {
                var t = this.state,
                    e = t.startPoint,
                    n = nt(T(t.endPoint, e), 2),
                    o = n[0],
                    r = n[1];
                return {
                    length: tt([o, r]),
                    angle: Math.atan2(r, o)
                }
            }
        }, {
            key: "render",
            value: function() {
                var t = this;
                if (!D(this.props.from, this.props.to)) {
                    var e = this.state,
                        n = nt(A(.5, M(e.startPoint, e.endPoint)), 2),
                        r = n[0],
                        i = n[1],
                        a = this.getLengthAngle(),
                        l = a.length,
                        u = 180 * a.angle / Math.PI,
                        c = this.props.bend || 0,
                        s = l / 2,
                        p = l * Math.tan(c * Math.PI / 180) / 2,
                        d = Math.max(Math.abs(p) + 13, 13),
                        f = "M 9.764 ".concat(d / 2, " Q ").concat(9.764 + s, " ").concat(d / 2 - p, " ").concat(l, " ").concat(d / 2);
                    return Object(o.h)("li", {
                        "data-id": this.props.id,
                        class: J()("grid-edge", {
                            selected: this.props.selected,
                            phantom: this.props.phantom
                        }),
                        style: {
                            height: d,
                            width: l + 13,
                            left: r - (l + 13) / 2,
                            top: i - d / 2,
                            transform: "rotate(".concat(u, "deg)")
                        },
                        onClick: this.props.onClick
                    }, Object(o.h)("svg", {
                        ref: function(e) {
                            return t.svgElement = e
                        },
                        width: l + 13,
                        height: d
                    }, Object(o.h)("path", {
                        class: "mouse",
                        fill: "none",
                        "stroke-width": "12",
                        stroke: "transparent",
                        "stroke-linecap": "square",
                        d: f
                    }), Object(o.h)("path", {
                        ref: function(e) {
                            return t.edgePath = e
                        },
                        fill: "none",
                        "stroke-width": "1",
                        stroke: "black",
                        "stroke-dasharray": {
                            solid: null,
                            dashed: "7, 3",
                            dotted: "2, 4"
                        } [this.props.line],
                        d: f
                    }), Object(o.h)("image", {
                        x: "0",
                        y: d / 2 - 6.5,
                        width: "9.764",
                        height: "13",
                        transform: "rotate(".concat(-c, " ", 9.764, " ").concat(d / 2, ")"),
                        xlinkHref: "./arrow/".concat(this.props.tail || "none", ".svg")
                    }), Object(o.h)("image", {
                        x: l - 9.764,
                        y: d / 2 - 6.5,
                        width: "9.764",
                        height: "13",
                        transform: "rotate(".concat(c, " ").concat(l, " ").concat(d / 2, ")"),
                        xlinkHref: "./arrow/".concat(this.props.head || "default", ".svg")
                    })), Object(o.h)("div", {
                        ref: function(e) {
                            return t.valueElement = e
                        },
                        class: J()("value", this.props.labelPosition),
                        style: {
                            left: this.state.labelX,
                            top: this.state.labelY,
                            transform: "rotate(".concat(-u, "deg)")
                        }
                    }, this.props.value ? "\\(".concat(this.props.value, "\\)") : Object(o.h)("span", {
                        class: "hide"
                    }, "_")))
                }
            }
        }]) && ot(n.prototype, r), i && ot(n, i), e
    }();

    function ut(t) {
        return (ut = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function ct(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = [],
                o = !0,
                r = !1,
                i = void 0;
            try {
                for (var a, l = t[Symbol.iterator](); !(o = (a = l.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
            } catch (t) {
                r = !0, i = t
            } finally {
                try {
                    o || null == l.return || l.return()
                } finally {
                    if (r) throw i
                }
            }
            return n
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }

    function st(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                return n
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function pt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function dt(t) {
        return (dt = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function ft(t, e) {
        return (ft = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function ht(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function bt(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }
    var yt = function(t) {
        function e(t) {
            var n, o, r;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), o = this, r = dt(e).call(this), n = !r || "object" !== ut(r) && "function" != typeof r ? ht(o) : r, bt(ht(ht(n)), "handleNodeMouseDown", function(t) {
                if (0 === t.button) {
                    var e = n.props,
                        o = e.cellSize,
                        r = e.cameraPosition,
                        i = [t.clientX, t.clientY].map(function(t, e) {
                            return Math.floor((t + r[e]) / o)
                        }),
                        a = n.props.data.nodes.findIndex(function(t) {
                            return D(t.position, i)
                        }),
                        l = n.props.data.nodes[a];
                    n.mouseDown = {
                        evt: t,
                        position: i,
                        nodeIndex: a,
                        node: l,
                        mode: n.props.mode
                    }
                }
            }), bt(ht(ht(n)), "handleNodeGrabberMouseDown", function(t) {
                if (0 === t.button) {
                    t.stopPropagation();
                    var e = t.position,
                        o = n.props.data.nodes.findIndex(function(t) {
                            return D(t.position, e)
                        }),
                        r = n.props.data.nodes[o];
                    n.mouseDown = {
                        evt: t,
                        position: e,
                        nodeIndex: o,
                        node: r,
                        mode: "move"
                    }
                }
            }), bt(ht(ht(n)), "handleNodeMouseUp", function(t) {
                if (null != n.mouseDown) {
                    var e = n.mouseDown.evt;
                    if (t.clientX === e.clientX && t.clientY === e.clientY) {
                        var o = n.mouseDown.position;
                        n.setState({
                            editPosition: o
                        })
                    }
                }
            }), bt(ht(ht(n)), "handleNodeSubmit", function() {
                n.setState({
                    editPosition: [null, null]
                })
            }), bt(ht(ht(n)), "handleNodeChange", function(t) {
                var e = n.props.onDataChange,
                    o = void 0 === e ? function() {} : e,
                    r = st(n.props.data.nodes),
                    i = r.findIndex(function(e) {
                        return D(e.position, t.position)
                    });
                if (i < 0) "" !== t.value.trim() && r.push({
                    id: x(),
                    position: t.position,
                    value: t.value
                });
                else {
                    var a = r[i].id;
                    if (r[i] = {
                            id: a,
                            position: st(t.position),
                            value: t.value
                        }, "" === t.value.trim()) n.props.data.edges.find(function(t) {
                        return t.from === a || t.to === a
                    }) || (r[i] = null)
                }
                o({
                    data: {
                        nodes: r.filter(function(t) {
                            return null != t
                        }),
                        edges: n.props.data.edges
                    }
                })
            }), bt(ht(ht(n)), "handleEdgeClick", function(t) {
                return null == n.edgeClickHandlersCache && (n.edgeClickHandlersCache = {}), null == n.edgeClickHandlersCache[t] && (n.edgeClickHandlersCache[t] = function(e) {
                    var o = n.props.onEdgeClick,
                        r = void 0 === o ? function() {} : o;
                    e.edge = t, r(e)
                }), n.edgeClickHandlersCache[t]
            }), n.state = {
                width: null,
                height: null,
                editPosition: [null, null],
                phantomEdge: null
            }, n
        }
        var n, r, i;
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && ft(t, e)
        }(e, o["Component"]), n = e, (r = [{
            key: "componentDidMount",
            value: function() {
                var t = this;
                this.updateSize(), window.addEventListener("resize", function() {
                    return t.updateSize()
                }), document.addEventListener("mouseup", function() {
                    t.mouseDown = null;
                    var e = t.state.phantomEdge;
                    if (null != e) {
                        if (!D(e.from, e.to)) {
                            var n = st(t.props.data.nodes),
                                o = ct([e.from, e.to].map(function(t) {
                                    return n.find(function(e) {
                                        return D(e.position, t)
                                    })
                                }), 2),
                                r = o[0],
                                i = o[1];
                            null == r && n.push(r = {
                                id: x(),
                                position: e.from,
                                value: ""
                            }), null == i && n.push(i = {
                                id: x(),
                                position: e.to,
                                value: ""
                            });
                            var a = [].concat(st(t.props.data.edges), [{
                                    from: r.id,
                                    to: i.id
                                }]),
                                l = t.props.onDataChange;
                            (void 0 === l ? function() {} : l)({
                                data: {
                                    nodes: n,
                                    edges: a
                                }
                            })
                        }
                        t.setState({
                            phantomEdge: null
                        })
                    }
                }), document.addEventListener("keyup", function(e) {
                    "Escape" === e.key && (e.stopPropagation(), t.setState({
                        editPosition: [null, null]
                    }))
                }), document.addEventListener("mousemove", function(e) {
                    if (null != t.mouseDown) {
                        e.preventDefault();
                        var n = t.props,
                            o = n.cellSize,
                            r = n.cameraPosition,
                            i = [e.clientX, e.clientY].map(function(t, e) {
                                return Math.floor((t + r[e]) / o)
                            });
                        if ("pan" === t.mouseDown.mode) {
                            var a = e.movementX,
                                l = e.movementY,
                                u = t.props.onPan;
                            (void 0 === u ? function() {} : u)({
                                cameraPosition: T(r, [a, l])
                            })
                        } else if ("move" === t.mouseDown.mode) {
                            var c = t.mouseDown.nodeIndex;
                            if (c < 0) return;
                            if (null != t.props.data.nodes.find(function(t) {
                                    return D(t.position, i)
                                })) return;
                            var s = t.props.onDataChange;
                            (void 0 === s ? function() {} : s)({
                                data: {
                                    nodes: t.props.data.nodes.map(function(t, e) {
                                        return e !== c ? t : function(t) {
                                            for (var e = 1; e < arguments.length; e++) {
                                                var n = null != arguments[e] ? arguments[e] : {},
                                                    o = Object.keys(n);
                                                "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                                                    return Object.getOwnPropertyDescriptor(n, t).enumerable
                                                }))), o.forEach(function(e) {
                                                    bt(t, e, n[e])
                                                })
                                            }
                                            return t
                                        }({}, t, {
                                            position: i
                                        })
                                    }),
                                    edges: t.props.data.edges
                                }
                            })
                        } else if ("arrow" === t.mouseDown.mode) {
                            var p = t.mouseDown.position,
                                d = i;
                            if (null != t.state.phantomEdge && D(p, t.state.phantomEdge.from) && D(d, t.state.phantomEdge.to)) return;
                            t.setState({
                                phantomEdge: {
                                    from: p,
                                    to: d
                                }
                            })
                        }
                    }
                })
            }
        }, {
            key: "updateSize",
            value: function() {
                var t = this.element.getBoundingClientRect(),
                    e = t.width,
                    n = t.height;
                this.setState({
                    width: e,
                    height: n
                })
            }
        }, {
            key: "render",
            value: function() {
                var t = this;
                if (null == this.state.width) return Object(o.h)("section", {
                    ref: function(e) {
                        return t.element = e
                    },
                    id: "grid"
                });
                var e = this.props,
                    n = e.cellSize,
                    r = e.cameraPosition,
                    i = [this.state.width, this.state.height],
                    a = ct(r.map(function(t) {
                        return Math.floor(t / n)
                    }), 2),
                    l = a[0],
                    u = a[1],
                    c = ct(r.map(function(t, e) {
                        return Math.floor((t + i[e]) / n)
                    }), 2),
                    s = c[0],
                    p = c[1],
                    d = s - l + 1,
                    f = p - u + 1,
                    h = ct(T(A(n, [l, u]), r), 2),
                    b = h[0],
                    y = h[1];
                return Object(o.h)("section", {
                    ref: function(e) {
                        return t.element = e
                    },
                    id: "grid",
                    class: J()(bt({}, this.props.mode, !0))
                }, Object(o.h)("ol", {
                    style: {
                        gridTemplateColumns: "repeat(".concat(d, ", ").concat(n, "px)"),
                        gridTemplateRows: "repeat(".concat(f, ", ").concat(n, "px)"),
                        left: b,
                        top: y,
                        width: d * n,
                        height: f * n
                    },
                    onMouseDown: this.handleNodeMouseDown,
                    onMouseUp: this.handleNodeMouseUp
                }, Array(f).fill().map(function(e, r) {
                    return Array(d).fill().map(function(e, i) {
                        return a = [i + l, r + u], Object(o.h)(Y, {
                            key: a.join(","),
                            position: a,
                            size: n,
                            edit: D(a, t.state.editPosition),
                            value: (c = t.props.data.nodes.find(function(t) {
                                return D(t.position, a)
                            }), c && c.value),
                            onGrabberMouseDown: t.handleNodeGrabberMouseDown,
                            onSubmit: t.handleNodeSubmit,
                            onChange: t.handleNodeChange
                        });
                        var a, c
                    })
                })), Object(o.h)("ul", {
                    style: {
                        left: -r[0],
                        top: -r[1]
                    }
                }, this.props.data.edges.map(function(e, r) {
                    return Object(o.h)(lt, {
                        cellSize: n,
                        id: r.toString(),
                        from: t.props.data.nodes.find(function(t) {
                            return t.id === e.from
                        }).position,
                        to: t.props.data.nodes.find(function(t) {
                            return t.id === e.to
                        }).position,
                        selected: t.props.selectedEdge === r,
                        bend: e.bend,
                        tail: e.tail,
                        line: e.line,
                        head: e.head,
                        value: e.value,
                        labelPosition: e.labelPosition,
                        onClick: t.handleEdgeClick(r)
                    })
                }), this.state.phantomEdge && Object(o.h)(lt, {
                    cellSize: n,
                    phantom: !0,
                    from: this.state.phantomEdge.from,
                    to: this.state.phantomEdge.to
                })))
            }
        }]) && pt(n.prototype, r), i && pt(n, i), e
    }();

    function mt(t) {
        return (mt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function vt(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function gt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function wt(t, e, n) {
        return e && gt(t.prototype, e), n && gt(t, n), t
    }

    function kt(t, e) {
        return !e || "object" !== mt(e) && "function" != typeof e ? jt(t) : e
    }

    function Ot(t) {
        return (Ot = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function Ct(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), e && _t(t, e)
    }

    function _t(t, e) {
        return (_t = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function jt(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    var St = function(t) {
            function e() {
                var t, n, o, r, i;
                vt(this, e);
                for (var a = arguments.length, l = new Array(a), u = 0; u < a; u++) l[u] = arguments[u];
                return n = kt(this, (t = Ot(e)).call.apply(t, [this].concat(l))), o = jt(jt(n)), i = function(t) {
                    t.preventDefault();
                    var e = n.props.onClick;
                    (void 0 === e ? function() {} : e)(t)
                }, (r = "handleClick") in o ? Object.defineProperty(o, r, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : o[r] = i, n
            }
            return Ct(e, o["Component"]), wt(e, [{
                key: "render",
                value: function() {
                    var t = this.props,
                        e = t.checked,
                        n = t.disabled,
                        r = t.icon,
                        i = t.name;
                    return Object(o.h)("li", {
                        class: J()("button", this.props.class, {
                            checked: e, disabled: n
                        }),
                        title: i
                    }, Object(o.h)("a", {
                        href: "#",
                        onClick: this.handleClick
                    }, Object(o.h)("img", {
                        style: {
                            backgroundImage: "url('".concat(r, "')")
                        },
                        src: "./blank.svg",
                        alt: i
                    })))
                }
            }]), e
        }(),
        Pt = function() {
            return Object(o.h)("li", {
                class: "separator"
            }, "Separator")
        },
        Et = function(t) {
            function e() {
                return vt(this, e), kt(this, Ot(e).apply(this, arguments))
            }
            return Ct(e, o["Component"]), wt(e, [{
                key: "render",
                value: function() {
                    return Object(o.h)("section", {
                        class: J()("toolbox", this.props.class),
                        id: this.props.id
                    }, Object(o.h)("ul", null, this.props.children))
                }
            }]), e
        }();

    function xt(t) {
        return (xt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function Dt(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {},
                o = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable
            }))), o.forEach(function(e) {
                Bt(t, e, n[e])
            })
        }
        return t
    }

    function Mt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function At(t) {
        return (At = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function Tt(t, e) {
        return (Tt = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function It(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function Bt(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }
    var Lt = function(t) {
        function e() {
            var t, n, o;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), n = this, o = At(e).call(this), t = !o || "object" !== xt(o) && "function" != typeof o ? It(n) : o, Bt(It(It(t)), "handleButtonClick", function(e) {
                return null == t.buttonClickHandlersCache && (t.buttonClickHandlersCache = {}), null == t.buttonClickHandlersCache[e] && (t.buttonClickHandlersCache[e] = function(n) {
                    var o, r, i, a = t.props,
                        l = a.data,
                        u = a.onChange,
                        c = void 0 === u ? function() {} : u,
                        s = {};
                    if (["tail", "mapsto", "twoheads"].includes(e)) {
                        var p = "twoheads" === e ? "head" : "tail";
                        s = Bt({}, p, l[p] === e ? "none" : e)
                    } else if ("head" === e) s = {
                        head: null == l.head ? "none" : null
                    };
                    else if (["solid", "dashed", "dotted"].includes(e)) s = {
                        line: e
                    };
                    else if (["labelleft", "labelright", "labelinside"].includes(e)) s = {
                        labelPosition: e.slice(5)
                    };
                    else if (["hook", "harpoon"].includes(e)) {
                        var d = "hook" === e ? "tail" : "head",
                            f = [e, "".concat(e, "alt"), "none"],
                            h = (f.indexOf(l[d]) + 1) % f.length;
                        s = Bt({}, d, f[h])
                    } else if (["bendleft", "bendright"].includes(e)) {
                        var b = l.bend,
                            y = void 0 === b ? 0 : b,
                            m = 0 === y || ("bendleft" === e ? y > 0 : y < 0),
                            v = 0 !== y ? Math.sign(y) : "bendleft" === e ? 1 : -1,
                            g = [0, 30, 49, 60, 67, 71, 74, 76, 78, 79, 80],
                            w = g.reduce(function(t, e, n) {
                                return e <= Math.abs(y) ? n : t
                            }, -1);
                        w < g.length - 1 && y >= (g[w + 1] + g[w]) / 2 && w++;
                        var k = v * g[Math.min(w + (2 * +m - 1), g.length - 1)];
                        s = {
                            bend: (o = -80, r = 80, i = k, Math.max(o, Math.min(r, i)))
                        }
                    } else if (["reversearrow"].includes(e)) {
                        var O = l.from,
                            C = l.to,
                            _ = l.labelPosition,
                            j = void 0 === _ ? "left" : _,
                            S = j;
                        "left" === j ? S = "right" : "right" === j && (S = "left"), (s = {
                            to: O,
                            from: C
                        }).labelPosition = S, null != l.bend && (s.bend = -l.bend)
                    }
                    c({
                        data: Dt({}, l, s)
                    })
                }), t.buttonClickHandlersCache[e]
            }), Bt(It(It(t)), "handleEditButtonClick", function() {
                t.updateEditPosition(), t.setState({
                    edit: !0
                })
            }), Bt(It(It(t)), "handleFormSubmit", function(e) {
                e.preventDefault(), t.setState({
                    edit: !1
                })
            }), Bt(It(It(t)), "handleInputBlur", function() {
                t.setState({
                    edit: !1
                })
            }), Bt(It(It(t)), "handleInputChange", function(e) {
                var n = e.currentTarget.value,
                    o = t.props.onChange;
                (void 0 === o ? function() {} : o)({
                    data: Dt({}, t.props.data, {
                        value: n
                    })
                })
            }), Bt(It(It(t)), "handleInputKeyDown", function(t) {
                t.stopPropagation()
            }), Bt(It(It(t)), "handleInputKeyUp", function(e) {
                "Escape" === e.key && (e.stopPropagation(), t.setState({
                    edit: !1
                }))
            }), t.state = {
                edit: !1,
                editTop: 0,
                editLeft: 0
            }, t
        }
        var n, r, i;
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && Tt(t, e)
        }(e, o["Component"]), n = e, (r = [{
            key: "componentDidMount",
            value: function() {
                var t = this,
                    e = {
                        ArrowUp: "bendleft",
                        ArrowDown: "bendright",
                        r: "reversearrow",
                        a: "labelleft",
                        s: "labelinside",
                        d: "labelright"
                    },
                    n = ["Delete", "Backspace"];
                document.addEventListener("keydown", function(o) {
                    if (!o.ctrlKey && !o.metaKey && t.props.show && !t.state.edit)
                        if (null != e[o.key]) o.preventDefault(), t.handleButtonClick(e[o.key])();
                        else if (n.includes(o.key)) {
                        o.preventDefault();
                        var r = t.props.onRemoveClick;
                        (void 0 === r ? function() {} : r)(o)
                    } else "Enter" == o.key && (o.preventDefault(), t.handleEditButtonClick())
                })
            }
        }, {
            key: "shouldComponentUpdate",
            value: function(t, e) {
                return t.show !== this.props.show || t.data !== this.props.data || e.edit !== this.state.edit || e.editTop !== this.state.editTop || e.editLeft !== this.state.editLeft
            }
        }, {
            key: "componentDidUpdate",
            value: function(t, e) {
                !e.edit && this.state.edit ? this.inputElement.select() : e.edit && !this.state.edit && this.inputElement.blur()
            }
        }, {
            key: "updateEditPosition",
            value: function() {
                var t = document.querySelector('.grid-edge[data-id="'.concat(this.props.edgeId, '"] .value')).getBoundingClientRect(),
                    e = t.left,
                    n = t.top,
                    o = t.width,
                    r = window.getComputedStyle(this.editElement),
                    i = r.width,
                    a = r.height;
                this.setState({
                    editLeft: e + o / 2 - parseFloat(i) / 2,
                    editTop: n - parseFloat(a) - 10
                })
            }
        }, {
            key: "render",
            value: function() {
                var t = this,
                    e = null == this.props.data ? {} : this.props.data;
                return Object(o.h)("section", {
                    id: "properties",
                    class: J()({
                        show: this.props.show,
                        edit: this.state.edit
                    })
                }, Object(o.h)(Et, null, Object(o.h)(St, {
                    checked: !1,
                    icon: "./reverse.svg",
                    name: "Reverse Arrow (R)",
                    onClick: this.handleButtonClick("reversearrow")
                }), Object(o.h)(Pt, null), Object(o.h)(St, {
                    checked: "tail" === e.tail,
                    icon: "./tail.svg",
                    name: "Tail",
                    onClick: this.handleButtonClick("tail")
                }), Object(o.h)(St, {
                    checked: "mapsto" === e.tail,
                    icon: "./mapsto.svg",
                    name: "Maps To",
                    onClick: this.handleButtonClick("mapsto")
                }), Object(o.h)(St, {
                    checked: ["hook", "hookalt"].includes(e.tail),
                    icon: "./".concat("hookalt" === e.tail ? "hookalt" : "hook", ".svg"),
                    name: "Hook",
                    onClick: this.handleButtonClick("hook")
                }), Object(o.h)(Pt, null), Object(o.h)(St, {
                    icon: "./bendright.svg",
                    name: "Bend Right (Down Arrow)",
                    onClick: this.handleButtonClick("bendright")
                }), Object(o.h)(St, {
                    checked: "dotted" === e.line,
                    icon: "./dotted.svg",
                    name: "Dotted",
                    onClick: this.handleButtonClick("dotted")
                }), Object(o.h)(St, {
                    checked: "dashed" === e.line,
                    icon: "./dashed.svg",
                    name: "Dashed",
                    onClick: this.handleButtonClick("dashed")
                }), Object(o.h)(St, {
                    checked: !e.line || "solid" === e.line,
                    icon: "./solid.svg",
                    name: "Solid",
                    onClick: this.handleButtonClick("solid")
                }), Object(o.h)(St, {
                    icon: "./bendleft.svg",
                    name: "Bend Left (Up Arrow)",
                    onClick: this.handleButtonClick("bendleft")
                }), Object(o.h)(Pt, null), Object(o.h)(St, {
                    checked: ["harpoon", "harpoonalt"].includes(e.head),
                    icon: "./".concat("harpoonalt" === e.head ? "harpoonalt" : "harpoon", ".svg"),
                    name: "Harpoon",
                    onClick: this.handleButtonClick("harpoon")
                }), Object(o.h)(St, {
                    checked: null == e.head,
                    icon: "./head.svg",
                    name: "Default Head",
                    onClick: this.handleButtonClick("head")
                }), Object(o.h)(St, {
                    checked: "twoheads" == e.head,
                    icon: "./twoheads.svg",
                    name: "Two Heads",
                    onClick: this.handleButtonClick("twoheads")
                }), Object(o.h)(Pt, null), Object(o.h)(St, {
                    checked: !e.labelPosition || "left" === e.labelPosition,
                    icon: "./labelleft.svg",
                    name: "Left Label (A)",
                    onClick: this.handleButtonClick("labelleft")
                }), Object(o.h)(St, {
                    checked: "inside" === e.labelPosition,
                    icon: "./properties/labelinside.svg",
                    name: "Inside Label (S)",
                    onClick: this.handleButtonClick("labelinside")
                }), Object(o.h)(St, {
                    checked: "right" === e.labelPosition,
                    icon: "./labelright.svg",
                    name: "Right Label (D)",
                    onClick: this.handleButtonClick("labelright")
                }), Object(o.h)(St, {
                    checked: this.state.edit,
                    icon: "./edit.svg",
                    name: "Edit Label (Enter)",
                    onClick: this.handleEditButtonClick
                }), Object(o.h)(Pt, null), Object(o.h)(St, {
                    class: "remove",
                    icon: "./trash.svg",
                    name: "Remove Arrow (Del)",
                    onClick: this.props.onRemoveClick
                })), Object(o.h)("form", {
                    ref: function(e) {
                        return t.editElement = e
                    },
                    class: "edit",
                    style: {
                        left: this.state.editLeft,
                        top: this.state.editTop
                    },
                    onSubmit: this.handleFormSubmit
                }, Object(o.h)("input", {
                    ref: function(e) {
                        return t.inputElement = e
                    },
                    type: "text",
                    value: e.value,
                    onBlur: this.handleInputBlur,
                    onInput: this.handleInputChange,
                    onKeyDown: this.handleInputKeyDown,
                    onKeyUp: this.handleInputKeyUp
                })))
            }
        }]) && Mt(n.prototype, r), i && Mt(n, i), e
    }();

    function Nt(t) {
        return (Nt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function Ut(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function Ht(t) {
        return (Ht = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function Rt(t, e) {
        return (Rt = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function zt(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function Jt(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }
    var Wt = function(t) {
        function e(t) {
            var n, o, r;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), o = this, r = Ht(e).call(this, t), n = !r || "object" !== Nt(r) && "function" != typeof r ? zt(o) : r, Jt(zt(zt(n)), "handleOverlayKeyUp", function(t) {
                if ("Escape" === t.key) {
                    var e = n.props.onClose;
                    (void 0 === e ? function() {} : e)(t)
                }
            }), Jt(zt(zt(n)), "handleOverlayClick", function(t) {
                if (t.target === t.currentTarget) {
                    var e = n.props.onClose;
                    (void 0 === e ? function() {} : e)(t)
                }
            }), Jt(zt(zt(n)), "handleCopyClick", function() {
                i()(n.props.code), n.textareaElement.focus(), n.textareaElement.select()
            }), n
        }
        var n, r, a;
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && Rt(t, e)
        }(e, o["Component"]), n = e, (r = [{
            key: "componentDidUpdate",
            value: function(t) {
                !t.show && this.props.show && (this.textareaElement.focus(), this.textareaElement.select())
            }
        }, {
            key: "render",
            value: function() {
                var t = this,
                    e = this.props,
                    n = e.show,
                    r = e.code;
                return Object(o.h)("section", {
                    id: "modal-overlay",
                    class: J()({
                        show: n
                    }),
                    onClick: this.handleOverlayClick,
                    onKeyUp: this.handleOverlayKeyUp
                }, Object(o.h)("section", {
                    class: "modal-box code-box"
                }, Object(o.h)("textarea", {
                    ref: function(e) {
                        return t.textareaElement = e
                    },
                    value: r,
                    onInput: this.props.onCodeInput
                }), Object(o.h)("ul", {
                    class: "buttons"
                }, Object(o.h)("li", null, Object(o.h)("button", {
                    onClick: this.handleCopyClick
                }, "Copy")), Object(o.h)("li", {
                    class: "separator"
                }), Object(o.h)("li", null, Object(o.h)("button", {
                    onClick: this.props.onParseButtonClick
                }, "Parse")), Object(o.h)("li", null, Object(o.h)("button", {
                    onClick: this.props.onClose
                }, "Close")))))
            }
        }]) && Ut(n.prototype, r), a && Ut(n, a), e
    }();

    function Kt(t) {
        return (Kt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function Vt(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                return n
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function Gt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function Ft(t) {
        return (Ft = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function Xt(t, e) {
        return (Xt = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function Yt(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function qt(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }
    var Qt = function(t) {
        function e() {
            var t, n, r;
            if (function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e), n = this, r = Ft(e).call(this), t = !r || "object" !== Kt(r) && "function" != typeof r ? Yt(n) : r, qt(Yt(Yt(t)), "handlePan", function(e) {
                    var n = e.cameraPosition;
                    t.setState({
                        cameraPosition: n
                    })
                }), qt(Yt(Yt(t)), "copyLink", function() {
                    if (!t.state.confirmLinkCopy) {
                        var e = U(t.state.diagram),
                            n = window.location.href.split("#")[0] + "#" + e;
                        window.history.replaceState(null, null, "#" + e), i()(n) ? (t.setState({
                            confirmLinkCopy: !0
                        }), setTimeout(function() {
                            return t.setState({
                                confirmLinkCopy: !1
                            })
                        }, 1e3)) : prompt("Copy link down below:", n)
                    }
                }), qt(Yt(Yt(t)), "openCodeBox", function() {
                    var e = R(t.state.diagram);
                    t.setState({
                        codeValue: e,
                        showCodeBox: !0,
                        selectedEdge: null
                    })
                }), qt(Yt(Yt(t)), "handleCloseCodeBox", function() {
                    t.setState({
                        showCodeBox: !1
                    })
                }), qt(Yt(Yt(t)), "handleCodeInput", function(e) {
                    t.setState({
                        codeValue: e.currentTarget.value
                    })
                }), qt(Yt(Yt(t)), "handleParseCode", function() {
                    var e = R(t.state.diagram),
                        n = t.state.codeValue,
                        o = t.state.diagram;
                    if (e !== n) try {
                        o = function(t) {
                            for (var e = [], n = [], o = 0, r = 0, i = [{
                                    string: "\\begin{tikzcd}"
                                }, {
                                    string: "\\end{tikzcd}"
                                }, {
                                    string: "&",
                                    callback: function() {
                                        o++
                                    }
                                }, {
                                    string: "\\\\",
                                    callback: function() {
                                        r++, o = 0
                                    }
                                }, {
                                    string: "\\arrow[",
                                    callback: function() {
                                        var e = t.split("]"),
                                            i = e.shift();
                                        t = e.join("]");
                                        var a = (e = i.split(","))[0],
                                            l = o + (a.split("r").length - 1) - (a.split("l").length - 1),
                                            u = r + (a.split("d").length - 1) - (a.split("u").length - 1),
                                            c = {
                                                from: [o, r],
                                                to: [l, u]
                                            };
                                        if (e.length > 1 && e[1].includes('"')) {
                                            var s;
                                            s = e[1].includes('"{') ? /"{(.*)}"/ : /"(.*)"/;
                                            var p = e[1].match(s);
                                            if (!p || 2 !== p.length) throw new Error("Could not match edge label.");
                                            c.value = p[1], e[1].endsWith("'") && (c.labelPosition = "right"), e[1].endsWith("description") && (c.labelPosition = "inside")
                                        }
                                        if (i.includes("near start") && (c.labelPositionLongitudinal = "nearstart"), i.includes("very near start") && (c.labelPositionLongitudinal = "verynearstart"), i.includes("near end") && (c.labelPositionLongitudinal = "nearend"), i.includes("very near end") && (c.labelPositionLongitudinal = "verynearend"), i.includes("harpoon") && (c.head = "harpoon"), i.includes("harpoon'") && (c.head = "harpoonalt"), i.includes("two heads") && (c.head = "twoheads"), i.includes("no head") && (c.head = "none"), i.includes("hook") && (c.tail = "hook"), i.includes("hook'") && (c.tail = "hookalt"), i.includes("maps to") && (c.tail = "mapsto"), i.includes("dashed") && (c.line = "dashed"), i.includes("dotted") && (c.line = "dotted"), i.includes("bend left")) {
                                            var d = i.match(/bend left=(\d+)/);
                                            d && d.length > 1 ? c.bend = parseInt(d[1]) : c.bend = 30
                                        }
                                        if (i.includes("bend right")) {
                                            var f = i.match(/bend right=(\d+)/);
                                            f && f.length > 1 ? c.bend = -parseInt(f[1]) : c.bend = -30
                                        }
                                        n.push(c)
                                    }
                                }, {
                                    string: "",
                                    callback: function() {
                                        var n = Math.min.apply(Math, I([t.indexOf("&"), t.indexOf("\n"), t.indexOf("\\\\"), t.indexOf("\\arrow")].filter(function(t) {
                                                return t > -1
                                            }))),
                                            i = t.substring(0, n);
                                        i = i.trim(), t = t.substring(n), i.startsWith("{") && i.endsWith("}") && (i = i.substring(1, i.length - 1));
                                        var a = {
                                            position: [o, r],
                                            value: i
                                        };
                                        e.push(a)
                                    }
                                }]; 0 !== t.length;) {
                                t = t.trim();
                                for (var a = !1, l = 0; l < i.length; l++) {
                                    var u = i[l];
                                    if (t.startsWith(u.string)) {
                                        t = t.replace(u.string, ""), u.callback && u.callback(), a = !0;
                                        break
                                    }
                                }
                                if (!a) throw new Error("Cannot parse the code further.")
                            }
                            return n.forEach(function(t) {
                                for (var n = t.from, o = t.to, r = -1, i = -1, a = 0; a < e.length; a++) e[a].position[0] === n[0] && e[a].position[1] === n[1] && (r = a), e[a].position[0] === o[0] && e[a].position[1] === o[1] && (i = a);
                                if (-1 === r) {
                                    var l = {
                                        position: n,
                                        value: ""
                                    };
                                    e.push(l), r = e.length - 1
                                }
                                if (-1 === i) {
                                    var u = {
                                        position: o,
                                        value: ""
                                    };
                                    e.push(u), i = e.length - 1
                                }
                                t.from = r, t.to = i
                            }), N(JSON.stringify({
                                nodes: e,
                                edges: n
                            }))
                        }(n)
                    } catch (t) {
                        alert("Could not parse code.\n\nReason: ".concat(t.message))
                    }
                    t.setState({
                        cameraPosition: Array(2).fill(-Math.floor(t.state.cellSize / 2)),
                        selectedEdge: null,
                        showCodeBox: !1
                    }), t.handleDataChange({
                        data: o
                    })
                }), qt(Yt(Yt(t)), "moveInHistory", function(e) {
                    null != t.history[t.historyPointer + e] && (t.historyPointer += e, t.setState({
                        diagram: t.history[t.historyPointer].diagram,
                        selectedEdge: null
                    }))
                }), qt(Yt(Yt(t)), "undo", function() {
                    return t.moveInHistory(-1)
                }), qt(Yt(Yt(t)), "redo", function() {
                    return t.moveInHistory(1)
                }), qt(Yt(Yt(t)), "handleDataChange", function(e) {
                    var n = t.state.diagram.edges.length + 1 === e.data.edges.length,
                        o = {
                            diagram: e.data,
                            time: Date.now()
                        };
                    (t.historyPointer < t.history.length - 1 || Date.now() - t.history[t.historyPointer].time > 500) && t.history[t.historyPointer].diagram !== e.data ? (t.history.splice(t.historyPointer + 1, t.history.length, o), t.historyPointer = t.history.length - 1) : t.history[t.historyPointer] = o, t.setState({
                        diagram: e.data,
                        selectedEdge: n ? e.data.edges.length - 1 : t.state.selectedEdge
                    })
                }), qt(Yt(Yt(t)), "handleEdgeClick", function(e) {
                    t.setState({
                        selectedEdge: t.state.selectedEdge === e.edge ? null : e.edge
                    })
                }), qt(Yt(Yt(t)), "handleToolClick", function(e) {
                    return null == t.toolClickHandlersCache && (t.toolClickHandlersCache = {}), null == t.toolClickHandlersCache[e] && (t.toolClickHandlersCache[e] = function(n) {
                        t.setState({
                            tool: e,
                            selectedEdge: null
                        })
                    }), t.toolClickHandlersCache[e]
                }), qt(Yt(Yt(t)), "handleAboutClick", function() {
                    var t = Object(o.render)(Object(o.h)("a", {
                        href: "https://github.com/yishn/tikzcd-editor",
                        target: "_blank"
                    }), document.body);
                    t.click(), t.remove()
                }), qt(Yt(Yt(t)), "handleEdgeChange", function(e) {
                    var n = Vt(t.state.diagram.edges);
                    n[t.state.selectedEdge] = function(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = null != arguments[e] ? arguments[e] : {},
                                o = Object.keys(n);
                            "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                                return Object.getOwnPropertyDescriptor(n, t).enumerable
                            }))), o.forEach(function(e) {
                                qt(t, e, n[e])
                            })
                        }
                        return t
                    }({}, n[t.state.selectedEdge], e.data), null != e.data.value && "" === e.data.value.trim() && delete n[t.state.selectedEdge].value, t.handleDataChange({
                        data: {
                            nodes: t.state.diagram.nodes,
                            edges: n
                        }
                    })
                }), qt(Yt(Yt(t)), "handleEdgeRemoveClick", function() {
                    var e = t.state.diagram.edges.filter(function(e, n) {
                            return n !== t.state.selectedEdge
                        }),
                        n = t.state.diagram.nodes.filter(function(t) {
                            return "" !== t.value.trim() || e.some(function(e) {
                                return e.from === t.id || e.to === t.id
                            })
                        });
                    t.handleDataChange({
                        data: {
                            nodes: n,
                            edges: e
                        }
                    }), t.setState({
                        selectedEdge: null
                    })
                }), t.state = {
                    tool: "pan",
                    cellSize: 130,
                    cameraPosition: [-65, -65],
                    selectedEdge: null,
                    confirmLinkCopy: !1,
                    diagram: {
                        nodes: [],
                        edges: []
                    },
                    showCodeBox: !1
                }, window.location.hash.length > 0) try {
                t.state.diagram = H(window.location.hash.slice(1))
            } catch (t) {
                alert("Invalid diagram permalink")
            }
            return t.history = [{
                diagram: t.state.diagram,
                time: Date.now()
            }], t.historyPointer = 0, t
        }
        var n, r, a;
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && Xt(t, e)
        }(e, o["Component"]), n = e, (r = [{
            key: "componentDidMount",
            value: function() {
                var t = this,
                    e = {
                        Shift: "arrow",
                        " ": "pan"
                    };
                document.addEventListener("keydown", function(n) {
                    if (null != e[n.key]) {
                        if (null != t.prevTool) return;
                        t.prevTool = t.state.tool, t.setState({
                            tool: e[n.key]
                        })
                    }
                }), document.addEventListener("keyup", function(n) {
                    if (Object.keys(e).includes(n.key.toString())) {
                        if (null == t.prevTool) return;
                        t.setState({
                            tool: t.prevTool
                        }), t.prevTool = null
                    }
                }), document.addEventListener("keyup", function(e) {
                    "Escape" === e.key && t.setState({
                        selectedEdge: null
                    })
                }), window.addEventListener("beforeunload", function(e) {
                    if (t.state.diagram.nodes.length > 0 || t.state.diagram.edges.length > 0) {
                        var n = "Do you really want to leave?";
                        return e.returnValue = n, n
                    }
                })
            }
        }, {
            key: "render",
            value: function() {
                return Object(o.h)("div", {
                    id: "root"
                }, Object(o.h)(yt, {
                    cellSize: this.state.cellSize,
                    cameraPosition: this.state.cameraPosition,
                    data: this.state.diagram,
                    mode: this.state.tool,
                    selectedEdge: this.state.selectedEdge,
                    onPan: this.handlePan,
                    onDataChange: this.handleDataChange,
                    onEdgeClick: this.handleEdgeClick
                }), Object(o.h)(Lt, {
                    edgeId: this.state.selectedEdge,
                    show: null != this.state.selectedEdge,
                    data: this.state.diagram.edges[this.state.selectedEdge],
                    onChange: this.handleEdgeChange,
                    onRemoveClick: this.handleEdgeRemoveClick
                }), Object(o.h)(Et, {
                    id: "toolbox"
                }, Object(o.h)(St, {
                    checked: "pan" === this.state.tool,
                    icon: "./pan.svg",
                    name: "Pan Tool (Space)",
                    onClick: this.handleToolClick("pan")
                }), Object(o.h)(St, {
                    checked: "arrow" === this.state.tool,
                    icon: "./arrow.svg",
                    name: "Arrow Tool (Shift)",
                    onClick: this.handleToolClick("arrow")
                }), Object(o.h)(Pt, null), Object(o.h)(St, {
                    disabled: null == this.history[this.historyPointer - 1],
                    icon: "./undo.svg",
                    name: "Undo",
                    onClick: this.undo
                }), Object(o.h)(St, {
                    disabled: null == this.history[this.historyPointer + 1],
                    icon: "./redo.svg",
                    name: "Redo",
                    onClick: this.redo
                }), Object(o.h)(Pt, null), Object(o.h)(St, {
                    checked: this.state.showCodeBox,
                    icon: "./code.svg",
                    name: "Open Code",
                    onClick: this.openCodeBox
                }), Object(o.h)(St, {
                    icon: "./".concat(this.state.confirmLinkCopy ? "tick" : "link", ".svg"),
                    name: "Copy Diagram Permalink",
                    onClick: this.copyLink
                }), Object(o.h)(Pt, null), Object(o.h)(St, {
                    icon: "./about.svg",
                    name: "GitHub Repository",
                    onClick: this.handleAboutClick
                })), Object(o.h)(Wt, {
                    code: this.state.codeValue,
                    show: this.state.showCodeBox,
                    onCodeInput: this.handleCodeInput,
                    onParseButtonClick: this.handleParseCode,
                    onClose: this.handleCloseCodeBox
                }))
            }
        }]) && Gt(n.prototype, r), a && Gt(n, a), e
    }();
    MathJax.Hub.processSectionDelay = 0, MathJax.Hub.processUpdateDelay = 0, MathJax.Hub.Config({
        messageStyle: "none",
        skipStartupTypeset: !0,
        showMathMenu: !1,
        errorSettings: {
            message: [""]
        }
    }), Object(o.render)(Object(o.h)(Qt, null), document.body)
}]);
//# sourceMappingURL=bundle.js.map
