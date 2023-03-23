/*!FIRST*/
if (!('F' in window)) window.F = {}; (function () {
    "use strict"; var _N, dev = (window.location.hostname.search(/\.?first\.org/) < 0), wwwHost = 'first.org', mHost = 'portal.first.org', _delayedElement = '.delayed-list li', _activatedElement = '.activated-list li, .cards-list blockquote'; var supportPageOffset = window.pageXOffset !== undefined; var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"); function preload() {
        startNav(); startBanners(); var L = document.querySelectorAll('.search-list,.tags'), i = L.length; while (i-- > 0) { startSearch(L[i]) }
        var T = document.getElementById('tag-cloud'); if (T) { var Tn, Tu = T.getAttribute('data-url'); if (Tu && Tu != window.location.pathname) { L = null; L = T.querySelectorAll('a'); i = L.length; while (i--) { if (!L[i].getAttribute('data-tag')) { Tn = L[i].getAttribute('href'); if (Tn.substr(0, 1) == '#') { L[i].href = Tu + Tn } } } } }
        L = null; L = document.querySelectorAll('*[data-paginate]:not(.paginate)'); i = L.length; while (i-- > 0) { if (Z.parentNode(L[i], '.no-paginate')) break; paginate.call(L[i]) }
        startToc(document.getElementById('toc')); L = document.querySelectorAll('.data-rss'); i = L.length; while (i-- > 0) { startNews(L[i]) }
        if (document.getElementById('map')) startMap(); noSidebar(); if (dev) Z.addEvent(window, 'keypress', metakeys); Z.bind(window, 'resize', startPc); _PcT = setTimeout(startPc, 500)
    }
    function startup() {
        if (document.readyState !== "complete" || !('Z' in window)) { return setTimeout(startup, 250) }
        preload(); Z.ready(userInfo); var L = document.querySelectorAll('.backtop'), i = L.length; while (i-- > 0) { Z.bind(L[i], 'click', backtop) }
        L = document.querySelectorAll('ul.list-one > li > *:first-child'); i = L.length; while (i-- > 0) {
            if (L[i].parentNode.className.search(/\b(not-)one\b/) < -1) { if (i > 0) L[i].parentNode.className = 'not-one'; else L[i].parentNode.className = 'one' }
            Z.bind(L[i], 'click', listOne)
        }
        L = document.querySelectorAll('a[target]'); i = L.length; while (i--) { if (!L[i].getAttribute('rel')) L[i].setAttribute('rel', 'noopener noreferrer') }
        L = document.querySelectorAll('.paper-files details'); i = L.length; while (i-- > 0) { Z.bind(L[i], 'click', donothing) }
        L = document.querySelectorAll(_delayedElement); i = L.length; while (i--) { delayedHover(L[i]) }
        L = document.querySelectorAll(_activatedElement); i = L.length; while (i--) { Z.bind(L[i], 'click', activate) }
        if (document.getElementById('twitterBox')) twitterTimeline(); document.querySelector('html').className += ' ready'
    }
    function donothing(e) { e.preventDefault() }
    function backtop(e) { Z.stopEvent(e); document.body.parentNode.scrollTop = document.getElementById('header').getBoundingClientRect().height; return !1 }
    function listOne(e) {
        if (this.parentNode.className != 'one') {
            var L = this.parentNode.parentNode.querySelectorAll('li.one'), i = L.length; while (i-- > 0) { L[i].className = 'not-one' }
            this.parentNode.className = 'one'
        }
        return !1
    }
    function activate(e) { if (this.className.search(/\b(active|hover)\b/) > -1) { this.className = this.className.replace(/(\b|\s*)(active|hover)\b/g, '') } else { this.className += ' active' } }
    var _delayedAttr = 'data-delayed-event', _delay = 3000; function delayedHover(el) { if (el.getAttribute(_delayedAttr)) return; el.setAttribute(_delayedAttr, "0"); Z.bind(el, 'mouseleave', hoverOff); Z.bind(el, 'mouseover', hoverOn) }
    function hoverOn(e) {
        var i = parseInt(this.getAttribute(_delayedAttr)); if (i) { this.setAttribute(_delayedAttr, "0"); clearTimeout(i) }
        if (e) { var el = this; this.setAttribute(_delayedAttr, setTimeout(function () { hoverOn.apply(el) }, _delay)) } else { this.className += ' hover' }
    }
    function hoverOff(e) {
        var i = parseInt(this.getAttribute(_delayedAttr)); if (i) { this.setAttribute(_delayedAttr, "0"); clearTimeout(i) }
        if (this.className.search(/\bhover\b/) > -1) this.className = this.className.replace(/(\s*|\b)hover\b/g, '')
    }
    function twitterTimeline() {
        var d = document, s = 'script', id = 'twitter-wjs'; var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) {
            js = d.createElement(s); js.id = id; var jsn = document.querySelector('script[nonce]'); if (fjs.getAttribute('nonce')) { js.setAttribute('nonce', fjs.getAttribute('nonce')) }
            js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs)
        }
    }
    function userInfo() { var t = document.querySelector('.menu.icon3bars'); if (t) { var i = t.children.length; while (i--) if (!t.children[i].id || t.children[i].id != 'socialnetworks') Z.deleteNode(t.children[i]); t.className += ' signin'; Z.element.call(t, { e: 'a', p: { className: 'button signin', href: 'https://' + mHost }, c: 'Sign in' }) } }
    function metakeys(e) { if (!e.ctrlKey && !e.metaKey) return; if (e.key == ';') grid() }
    function grid() { var h = document.querySelector('html'); if (h.className.search(/\bgrid\b/) > -1) h.className = h.className.replace(/\s*\bgrid\b/g, ''); else h.className += ' grid' }
    function startMap() { if (!('map' in window.F)) Z.load('/_/map.js', '/_/map.css'); Z.ajax('/_/map/world-simple.json', null, map, null, 'json') }
    function map(d) {
        if (d) window.F.mapData = d; if (!('d3' in window) || !('topojson' in window) || !('map' in window.F)) { setTimeout(map, 100); return !1 }
        return window.F.map()
    }
    function startNews(C) { var u = C.getAttribute('data-rss'), m; if (!u) u = C.getAttribute('href'); if (!u && (m = document.querySelector('link[type="application/rss+xml"]'))) u = m.getAttribute('href'); if (!u) return; Z.ajax(u, null, newsItems, null, 'xml', C) }
    var _B = [], _Bt = 5000, _Bn; function startBanners() {
        var L = document.querySelectorAll('.banners'), i = L.length, t = (new Date().getTime()), b, c, d, j, clone = !0; while (i--) {
            clone = (L[i].className.search(/\bno-thumbnails?\b/) < 0); if (L[i].getAttribute('data-timeout')) _Bt = parseInt(L[i].getAttribute('data-timeout')); if (!L[i].getAttribute('data-banner') && (b = L[i].querySelectorAll('li,.banner')) && b.length > 1) {
                L[i].setAttribute('data-banner', 1); if (b[0].className.search(/\bactive\b/) < 0)
                    b[0].className += ' active'; c = document.createElement(b[0].parentNode.nodeName); for (j = 0; j < b.length; j++) { d = (clone) ? (b[j].cloneNode(!0)) : (document.createElement(b[j].nodeName)); if (b[j].className.search(/\bbanner\b/) < 0) b[j].className += ' banner'; d.setAttribute('data-target', j); if (d.getAttribute('style')) d.removeAttribute('style'); Z.addEvent(d, 'click', setBanner); c.appendChild(d) }
                c.id = 'thumb' + i; c.className = 'thumbnails t' + b.length; b[0].parentNode.parentNode.insertBefore(c, b[0].parentNode.nextSibling); L[i].className += ' animation'; _B.push(t + _Bt); b = null; d = null
            }
        }
        _Bn = setTimeout(nextBanner, _Bt + 1)
    }
    function setBanner(e) {
        Z.stopEvent(e); if (_Bn) { clearTimeout(_Bn); _Bn = null }
        var i = this.parentNode.id.substr(5); _B[i] = 0; var L = document.querySelectorAll('.banners[data-banner]'); L[i].setAttribute('data-banner', this.getAttribute('data-target')); _Bn = setTimeout(nextBanner, 100); return !1
    }
    function nextBanner() {
        var L = document.querySelectorAll('.banners[data-banner]'), i = L.length, t = (new Date().getTime()), b, n, j, rea = /\bactive\b/, rep = /\bprevious\b/, cn, T; if (_Bn) { clearTimeout(_Bn); _Bn = null }
        while (i--) {
            if (i <= _B.length && t > _B[i]) {
                _B[i] = t + _Bt; b = L[i].querySelectorAll('.banner'); T = document.querySelectorAll('#thumb' + i + '.thumbnails *[data-target]'); n = parseInt(L[i].getAttribute('data-banner')); if (!n || n >= b.length) n = 0; j = b.length; while (j--) {
                    cn = b[j].className; if (rep.test(cn)) cn = cn.replace(/\s*\bprevious\b/g, ''); if (j == n) { if (!rea.test(cn)) cn += ' active' } else { if (rea.test(cn)) cn = cn.replace(/\s*\bactive\b/g, ' previous') }
                    cn = cn.trim(); if (cn != b[j].className) b[j].className = cn; cn = cn.replace(/\bbanner\b/g, ''); if (j < T.length && T[j].className != cn) T[j].className = cn
                }
                n++; if (!n || n >= b.length) n = 0; L[i].setAttribute('data-banner', n)
            }
        }
        _Bn = setTimeout(nextBanner, _Bt + 1)
    }
    function newsItems(d) {
        Z.rss = d; var a = this.getAttribute('data-limit'), l = (a) ? (parseInt(a)) : (5), dl = this.getAttribute('data-days'), t = this.getAttribute('data-title'), n, o, i = 0; if (!t) { t = Z.text(d, 'channel > title') }
        var w = [{ e: 'h3', p: { className: 'label orange' }, c: [t] }, { e: 'div', p: { className: 'section orange' }, c: [] }]; if ((t = Z.text(d, 'channel > link'))) { w[0].c[0] = { e: 'a', p: { href: t }, c: w[0].c[0] } }
        var L = d.querySelectorAll('item'), j = L.length; while (i < l && i < j) {
            var u = Z.text(L[i], 'link'), c = [{ e: 'h4', p: { className: 'p-name' }, c: [{ e: 'a', p: { className: 'p-url', href: u }, c: Z.text(L[i], 'title') }] }, { e: 'p', p: { className: 'dt-published' }, c: Z.text(L[i], 'pubDate').replace(/\:00\s/, ' ') }, { e: 'p', p: { className: 'p-summary' }, x: !0, c: Z.text(L[i], 'description') }]; if (u.search(/\.mp3(\?|$)/) > -1) { c.push({ e: 'audio', a: { src: u, controls: !0, preload: 'none' } }) }
            w[1].c.push({ e: 'article', p: { className: 'h-entry' }, c: c }); i++
        }
        Z.element.call(this, w)
    }
    function startToc(P) {
        if (!P) return; var L = document.querySelectorAll('.toc-h1 h1,.toc-h2 h2,.toc-h3 h3,.toc-h4 h4'), i = L.length, c = [], t, txt, el, m, a, n, p; while (i--) {
            t = L[i].id; if (!t) { t = 't' + i; L[i].setAttribute('id', t) }
            txt = L[i].textContent || L[i].innerText; if ((m = txt.match(/^([a-z0-9IVLXM\.]+\. )(.*)$/)) && m.length > 1) { el = [{ e: 'span', p: { className: 'num' }, c: m[1] }, m[2]] } else { el = [{ e: 'span', p: { className: 'bullet' } }, txt] }
            n = L[i].nodeName.toLowerCase(); a = 'tocindex-' + n; if (window.location.hash.substr(1) == t || (n == 'h3' && p)) { a += ' active'; if (n == 'h4') p = !0; else p = null }
            Z.element({ e: 'a', p: { href: '#body', className: 'backtop icon-ctrl' } }, L[i]); c.unshift({ e: 'p', p: { className: a }, t: { click: subnav }, c: [{ e: 'a', a: { href: '#' + t }, c: el }] }); txt = null; m = null
        }
        p = null; var T = []; if (!P.querySelector('h1,h3')) T.push({ e: 'h3', c: 'Table of Contents' }); T.push({ e: 'div', p: { className: 'box' }, c: c }); Z.element.call(P, T)
    }
    var _S = [], _reH = /\bhidden\b/, _reA = /\bvisible\b/, _reN = /\bnext-page\b/, _reV = /\b(odd|even)\b/; function startSearch(e) {
        if (Z.parentNode(e, '.no-paginate')) return; var sp = e.getAttribute('data-search-item'); if (!sp) sp = '.search-item'; if (e.getAttribute('data-search-target')) { var p = e.getAttribute('data-paginate'); var t = e.getAttribute('data-title'); e = e.querySelector(e.getAttribute('data-search-target')); if (!e) return; if (p) e.setAttribute('data-paginate', p); if (sp) e.setAttribute('data-search-item', sp); if (t) e.setAttribute('title', t) }
        if (e.getAttribute('data-search')) return; var sid = _S.length; e.setAttribute('data-search', sid); var F; if (e.className.search(/\bsearch-list\b/) > -1) { F = Z.element({ e: 'form', p: { className: 'search-input' }, a: { method: 'get', action: '#', 'data-target': sid }, t: { submit: search }, c: [{ e: 'input', a: { type: 'search', placeholder: 'Search ' + e.getAttribute('title') }, t: { input: search } }, { e: 'div' }] }, e) } else { F = Z.element({ e: 'form', p: { className: 'search-input hidden' }, a: { method: 'get', action: '#', 'data-target': sid }, t: { submit: search }, c: [{ e: 'input', a: { type: 'hidden' }, t: { input: search } }] }, e) }
        _S.push({}); var L = e.querySelectorAll(sp), i = L.length, j, C = [], M, k, s; if (e.nodeName.toLowerCase() == 'table') {
            M = e.querySelectorAll('thead th'); k = M.length; while (k--) { C.unshift(Z.slug(M[k].textContent || M[k].innerText)) }
            M = null
        }
        if (e.getAttribute('data-paginate')) { Z.element({ e: 'div', p: { className: 'page-control' }, c: [{ e: 'a', p: { className: 'show-more' }, t: { click: paginate }, c: 'View more' }, { e: 'a', p: { className: 'show-all' }, t: { click: paginate }, c: 'View all' }] }, null, e); window.F.searchTriggers.push(paginate) }
        var prop, D; if (!('country' in window.F)) { window.F.country = {} }
        D = window.F.country; while (i-- > 0) {
            j = L[i].attributes.length; prop = {}; while (j-- > 0) {
                if (L[i].attributes[j].name == 'data-subject') {
                    if (!('subject' in window.F)) { window.F.subject = {} }
                    var S = L[i].attributes[j].value.split(/\s*\,\s*/g), Si = S.length, Sn; while (Si--) { Sn = Z.slug(S[Si]); searchIndex(sid, 'subject', Sn, L[i]); if (!(Sn in window.F.subject)) { window.F.subject[Sn] = [1, S[Si]] } else { window.F.subject[Sn][0]++ } }
                } else if (L[i].attributes[j].name.substr(0, 5) == 'data-') { searchIndex(sid, L[i].attributes[j].name.substr(5), L[i].attributes[j].value, L[i]); prop[L[i].attributes[j].name.substr(5)] = L[i].attributes[j].value }
            }
            if (C.length > 0) { M = L[i].querySelectorAll('td'); k = M.length; while (k--) { if (k < C.length) { s = M[k].textContent || M[k].innerText; s = s.trim(); if (s) { searchIndex(sid, C[k], s, L[i]); prop[C[k]] = s } } } }
            if ('country' in prop) { if (!(prop.country in D)) { D[prop.country] = { length: 1 }; if ('country-name' in prop) D[prop.country].name = prop['country-name'] } else { D[prop.country].length++ } }
        }
        if (F) {
            if (window.location.hash.length > 1) { F.elements[0].value = decodeURIComponent(window.location.hash.substr(1)) }
            search.call(F)
        }
        Z.bind(window, 'hashchange', updateSearch)
    }
    var _Ids = {}; function searchIndex(sid, n, v, e) {
        var id = e.id; if (!id) { if (!(sid in _Ids)) _Ids[sid] = 0; id = 'i' + sid + '-' + (_Ids[sid]++); e.setAttribute('id', id) }
        if (!(v in _S[sid])) _S[sid][v] = {}; if (!(n in _S[sid][v])) _S[sid][v][n] = [id]; else _S[sid][v][n].push(id)
    }
    window.F.data = _S; function updateSearch(e) { var I = document.querySelector('form.search-input input'); if (I) I.value = decodeURIComponent(window.location.hash.replace(/^#/, '')); search(e) }
    var _Sl, _St, _So; function search(e) {
        if (_St) { clearTimeout(_St); _St = null }
        var s; if (e) { if (typeof (e) == 'object') { var t = (new Date()).getTime(); if (!_Sl || _Sl + 500 > t) { setTimeout(search, 200); _So = this; return } } else { s = decodeURIComponent(e); window.location.hash = '#' + encodeURIComponent(s); e = null } }
        _Sl = (new Date()).getTime(); var F = (!Z.isNode(this)) ? (document.querySelector('form.search-input')) : (this); var sid = F.getAttribute('data-target'), p; if (!sid) { if (!s) s = F.value; else F.value = s; F = F.form; sid = F.getAttribute('data-target') } else { if (!s) s = F.children[0].value; else F.children[0].value = s }
        if (!(sid in _S)) return; var I = [], P = {}, i, n, f0 = !1; s = s.trim(); window.F.query = s; if (_St) { clearTimeout(_St); _St = null }
        if (e && e.type.toLowerCase() == 'submit') { window.location.hash = '#' + encodeURIComponent(s); Z.stopEvent(e) }
        if (s.indexOf(':') > -1) { p = s.substr(0, s.indexOf(':')); s = s.substr(s.indexOf(':') + 1) }
        if (s) {
            var r = new RegExp(s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/\s+/g, '\\b.+\\b'), 'i'); for (n in _S[sid]) { if (r.test(n)) { if (p) { if (p in _S[sid][n]) { P[p] = !0; I = I.concat(_S[sid][n][p]) } } else { for (p in _S[sid][n]) { P[p] = !0; I = I.concat(_S[sid][n][p]); p = null } } } }
            i = I.length
        } else { f0 = !0 }
        var sp = F.nextSibling.getAttribute('data-search-item'), empty = !1; if (!sp) sp = '.search-item'; var L = F.nextSibling.querySelectorAll(sp), l = L.length, f, K = {}, oe, cn, readCountry = (document.getElementById('map')), countries = 0, cc = {}, country; I = Z.unique(I); i = I.length; while (i--) K[I[i]] = !0; i = I.length; while (l--) {
            f = f0; cn = L[l].className || ''; if (readCountry && (country = L[l].getAttribute('data-country-name'))) { if (!(country in cc)) { cc[country] = !0; countries++ } }
            if (L[l].id in K) { f = !0; oe = (i-- % 2) ? (' odd') : (' even'); delete (K[L[l].id]) } else { oe = '' }
            if (f) { if (_reH.test(cn)) cn = cn.replace(/\s*\bhidden\b/g, ''); if (!_reA.test(cn)) cn += ' visible'; if (_reV.test(cn)) cn = cn.replace(/\s*\b(odd|even)\b/g, oe); else cn += oe } else { if (_reA.test(cn)) cn = cn.replace(/\s*\bvisible\b/g, ''); if (_reV.test(cn)) cn = cn.replace(/\s*\b(odd|even)\b/g, ''); if (!_reH.test(cn)) cn += ' hidden' }
            if (cn != L[l].className) L[l].className = cn
        }
        if (F.children.length > 1) {
            var m, rn = F.nextSibling.getAttribute('data-item') || 'record', rns = F.nextSibling.getAttribute('data-items') || rn + 's'; if (!s) {
                m = 'There ' + ((L.length > 1) ? ('are ') : ('is ')) + L.length + ' ' + ((L.length > 1) ? (rns) : (rn)); if (countries > 0) { m += ' in ' + countries + ' different countries' }
                m += '.'
            } else { if (I.length) { m = 'There ' + ((I.length > 1) ? ('are ') : ('is ')) + I.length + ' ' + ((I.length > 1) ? (rns) : (rn)) + ' in ' + L.length + ' for your query.' } else { m = 'There are no ' + rns + ' available for your query.'; empty = !0 } }
            F.children[1].innerHTML = m
        } else { if (I.length == 0 && F.children[0].value != '') { if (window.location.hash != '' && window.location.hash != '#') window.location.hash = ''; F.children[0].value = ''; _St = setTimeout(search, 200) } }
        if (window.F.searchTriggers.length > 0) { for (i = 0; i < window.F.searchTriggers.length; i++) { window.F.searchTriggers[i].call(F.nextSibling) } }
        var T = document.getElementById('tag-cloud'); if (T) {
            L = T.querySelectorAll('a.active'); if ((l = L.length)) { while (l--) L[l].className = L[l].className.replace(/\s\bactive\b/g, ''); }
            var a; if (s && (a = T.querySelector('a[href$="#' + Z.slug(s) + '"]'))) { a.className += ' active' }
        }
        if (!empty && F.nextSibling.className.search(/\bempty\b/) > -1) F.nextSibling.className = F.nextSibling.className.replace(/\s*\bempty\b/g, ''); else if (empty && F.nextSibling.className.search(/\bempty\b/) < 0) F.nextSibling.className += ' empty'
    }
    window.F.search = search; window.F.searchTriggers = []; window.F.query = null; function paginate(n) {
        var T; if (this.getAttribute('data-paginate') || this.nodeName.toLowerCase() == 'table') T = this; else T = this.parentNode.previousSibling; if (T.className.search(/\bpaginate\b/) < 0) { T.className += ' paginate'; if (!T.nextElementSibling || T.nextElementSibling.className != 'page-control') { Z.element({ e: 'div', p: { className: 'page-control' }, c: [{ e: 'a', p: { className: 'show-more' }, t: { click: paginate }, c: 'View more' }, { e: 'a', p: { className: 'show-all' }, t: { click: paginate }, c: 'View all' }] }, null, T) } }
        var C = (this.nodeName.toLowerCase() == 'a') ? (this.parentNode) : (this.nextSibling), np = parseInt(T.getAttribute('data-paginate')), sp = T.getAttribute('data-search-item'); if (!sp) sp = '.search-item'; var L = T.querySelectorAll(sp + '.visible' + ((n) ? ('.next-page') : (''))), i = L.length; if (this.className && this.className.search(/\bshow-all\b/) > -1) { np = i }
        if (i) {
            while (i-- > np) { if (!_reN.test(L[i].className)) L[i].className += ' next-page' }
            i++; while (i--) { if (_reN.test(L[i].className)) L[i].className = L[i].className.replace(/\s*\bnext-page\b/g, '') }
        }
        if (L.length - np > 0) { if (_reH.test(C.className)) C.className = C.className.replace(/\s*\bhidden\b/g, '') } else { if (!_reH.test(C.className)) C.className += ' hidden' }
    }
    function noResults(sid) { return !1 }
    function startNav() {
        var L = document.querySelectorAll('#header .nav ul, #header .menu ul, #navbar ul ul ul, #navbar ul ul a'), i = L.length; while (i--) { if (L[i].nodeName.toLowerCase() == 'a') { Z.bind(L[i], 'click', subnav) } else { Z.element({ e: 'a', p: { className: 'subnav' }, t: { click: subnav } }, L[i]) } }
        L = null; var p = chars(window.location.pathname + ((window.location.hash) ? (window.location.hash) : (''))), p0 = p, c = document.querySelector('#topbar .nav ul a[href="' + p + '"]'); if (!c) { p = window.location.pathname; while (p && !c) { if ((c = document.querySelector('#topbar .nav ul a[href="' + chars(p) + '"]'))) break; p = p.replace(/\/[^\/]*$/, ''); if (!p || p.indexOf('/') < 0) break } }
        if (c) {
            i = 5; var m = document.querySelector('#navbar ul ul a[href="' + chars(p) + '"]'), n = 'ancestor'; if (!m && p != p0) { m = document.querySelector('#navbar ul ul a[href="' + chars(p0) + '"]') }
            if (c.nextSibling && c.nextSibling.className.search(/\bsubnav\b/) > -1) c = c.nextSibling; while (i-- > 0) {
                c.className += (c.className) ? (' ' + n) : (n); c.parentNode.className += (c.parentNode.className) ? (' ' + n) : (n); c = c.parentNode.parentNode.previousSibling; if (m) { m.className += (m.className) ? (' active') : ('active'); m.parentNode.className += (m.parentNode.className) ? (' active') : ('active'); m = m.parentNode.parentNode.previousSibling }
                if (!c || c.parentNode.nodeName.toLowerCase() != 'li' || c.className.search(/\bsubnav\b/) < 0) break
            }
        }
        L = document.querySelectorAll('#navbar > .floating ul.navbar,#sidebar .floating'); i = L.length; _N = []; while (i--) { var r = L[i].getBoundingClientRect(), d = { o: r.y + window.pageYOffset, a: !1, e: L[i] }; r = null; if (!d.o) d.o = 58; _N.push(d); d = null }
        if (_N.length) { window.onscroll = navtop }
        if (window.pageYOffset) navtop()
    }
    function noSidebar() {
        var s = document.getElementById('sidebar'), t; if (s) { t = s.textContent || s.innerText; if (t) t.replace(/\s+/, ''); s = null }
        if (!t) { document.querySelector('html').className += ' nosidebar' }
        t = null
    }
    function navtop() { var i = _N.length, o = window.pageYOffset; while (i--) { if (o > _N[i].o) { if (!_N[i].a) { _N[i].a = !0; _N[i].e.className += ' fixed' } } else if (_N[i].a) { _N[i].a = !1; _N[i].e.className = _N[i].e.className.replace(/\s*\bfixed\b/g, '') } } }
    function chars(s) { return s.replace(/[^\#a-zA-Z\-\.\/0-9_]+/g, '') }
    function subnav(e) {
        if (this.className.search(/\bsubnav\b/) > -1) Z.stopEvent(e); else if (this.className.search(/\btocindex/) < 0) { var u = chars(window.location.pathname + ((window.location.hash) ? (window.location.hash) : (''))), c = document.querySelector('#navbar ul ul a[href="' + u + '"]'); if (!c) c = document.querySelector('#navbar ul ul a[href="' + chars(window.location.pathname) + '"]'); if (c.className.search(/\bactive\b/) > -1) c.className = c.className.replace(/\s*\bactive\b/g, ''); c = null; u = null } else {
            if (this.className.search(/\bactive\b/) < 0) {
                var L = this.parentNode.querySelectorAll('.active'), i = L.length; while (i--) L[i].className = L[i].className.replace(/\s*\bactive\b/g, ''); this.className += ' active'; if (this.className.search(/\btocindex-h4/) > -1) {
                    i = 20; var p = this.previousSibling; while (i--) {
                        if (p.className.search(/\btocindex-h3\b/) > -1) { p.className += ' active'; break }
                        p = p.previousSibling; if (!p || p === this) break
                    }
                }
            }
            return
        }
        if (this.className.search(/\bactive\b/) > -1) { this.parentNode.className = this.parentNode.className.replace(/\s*\bactive\b/g, ''); this.className = this.className.replace(/\s*\bactive\b/g, '') } else { this.parentNode.className += ' active'; this.className += ' active' }
    }
    var _PcT; function startPc(T) {
        var L, i; if (_PcT) clearTimeout(_PcT); if (!T) {
            L = document.querySelectorAll('ul.pc-list .pc-member'); i = L.length; while (i-- > 0) { if (Z.parentNode(L[i], '.no-pc')) continue; startPc(L[i]) }
            return
        } else if (!('querySelector' in T)) { _PcT = setTimeout(startPc, 500); return }
        var B = T.querySelector('.biography'), Bb = (B) ? B.getBoundingClientRect() : null, H = T.querySelector('p.role'), Hb = (H) ? H.getBoundingClientRect() : null, h = (H) ? Hb.height * 1.125 * 4 : null, C; if (B && H && Bb.height > h) { if (!(C = T.querySelector('.expand'))) { Z.element.call(T, { e: 'a', p: { className: 'expand more', title: 'Read mode' }, t: { click: toggleExpand } }) } } else if ((C = T.querySelector('.expand'))) { Z.deleteNode(C) }
    }
    function toggleExpand(e) { Z.stopEvent(e); var P = Z.parentNode(this, '.pc-member'); if (this.className.search(/\bmore\b/) > -1) { this.className = this.className.replace(/\s*\bmore\b/g, ''); P.className += ' expanded' } else { this.className += ' more'; P.className = P.className.replace(/\s*\bexpanded\b/g, '') } }
    startup()
})()