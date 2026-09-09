/* Lite Thesko Bro · quotes, tension meter, shareable cards. No dependencies, nothing leaves the device. */
(function () {
  'use strict';

  var SITE = 'litetheskobro.com';
  var URL_ = 'https://litetheskobro.com';

  /* ---------------- categories ---------------- */
  var CATS = {
    general: { label: 'General',   bg: '#FFD23F', fg: '#14110F' },
    love:    { label: 'Prema',     bg: '#FF4D8D', fg: '#14110F' },
    office:  { label: 'Office',    bg: '#2F5BEA', fg: '#FFFFFF' },
    exams:   { label: 'Exams',     bg: '#17B26A', fg: '#14110F' },
    money:   { label: 'Dabbu',     bg: '#FF7A1A', fg: '#14110F' },
    family:  { label: 'Family',    bg: '#7A3EF0', fg: '#FFFFFF' },
    hyd:     { label: 'Hyderabad', bg: '#10B5B0', fg: '#14110F' },
    cricket: { label: 'Cricket',   bg: '#FF3B30', fg: '#FFFFFF' },
    friends: { label: 'Friends',   bg: '#FFFFFF', fg: '#14110F' }
  };

  var KEYWORDS = {
    love:    /\b(love|gf|bf|crush|girl|boy|breakup|break up|reply|seen|ignor\w*|ex|date|dating|prema|premika|premikudu|valentine|propose|block|pilla|ammayi|abbayi)\b/i,
    office:  /\b(office|boss|manager|job|work|salary|appraisal|deadline|layoff|laid off|meeting|wfh|client|shift|hike|resign|udyogam|jeetham|team lead|tl|hr|standup|sprint)\b/i,
    exams:   /\b(exam|exams|marks|result|results|study|college|school|semester|sem|supply|backlog|jee|neet|eamcet|gate|cat|assignment|project|viva|chaduvu|padhai|attendance|lab|internal|internals)\b/i,
    money:   /\b(money|rent|emi|loan|broke|dabbu|dabbulu|paisa|paisalu|savings|budget|bank|credit|debt|expensive|price|bill|bills|month end|month-end|nelaakharu)\b/i,
    family:  /\b(amma|nanna|mom|dad|mummy|daddy|parents|family|pelli|marriage|wedding|uncle|aunty|relatives|sister|brother|akka|anna|chelli|tammudu|home|intlo|intiki)\b/i,
    hyd:     /\b(traffic|hyderabad|hyd|metro|rain|vaana|road|roads|auto|ola|uber|rapido|signal|orr|gachibowli|hitech|hitec|madhapur|ameerpet|kukatpally|secunderabad|flyover|pothole|kphb|lb nagar|dilsukhnagar)\b/i,
    cricket: /\b(cricket|india|match|ipl|srh|rcb|csk|kohli|world cup|wicket|over|overs|batting|bowling|team|odipoyam|odipoyindi)\b/i,
    friends: /\b(friend|friends|frnd|frnds|late|plan|plans|trip|goa|group|gang|batch|party|hangout|dost|snehithudu|reunion)\b/i
  };

  /* ---------------- quotes ---------------- */
  var QUOTES = [
    /* general */
    { c: 'general', line: 'Tension padithe problem solve avadu bro. Lite thesko.', en: "Stressing won't solve it, bro. Take it light." },
    { c: 'general', line: 'Idi kooda pothundi. Migathaavanni poyinatte.', en: 'This too shall pass. Like everything before it.' },
    { c: 'general', line: 'Nee problem neeku peddadi, universe ki chinnadi. Lite thesko.', en: 'Your problem is big to you and tiny to the universe.' },
    { c: 'general', line: 'Repu inko roju vasthundi bro. Eeroju oka chai thaagu.', en: 'Tomorrow is another day. Today, have a chai.' },
    { c: 'general', line: 'Em kaadu bro. Lite thesko. Biryani thinu.', en: "Nothing's going to happen, bro. Chill. Eat biryani." },
    { c: 'general', line: 'Phone ki break ichinatte nee mind ki kooda oka break ivvu bro.', en: 'You give your phone a break. Give your mind one too.' },
    { c: 'general', line: 'Overthinking ki overtime ivvaku bro. Lite thesko.', en: "Don't pay overthinking any overtime." },
    { c: 'general', line: 'Manam plan chesthaam, life navvuthundi. Manam kooda navveddaam. Lite thesko.', en: 'We plan, life laughs. Might as well laugh along.' },
    { c: 'general', line: 'Andaru nee gurinche aalochisthunnaru anukuntunnava? Vaallu vaalla gurinche aalochisthunnaru.', en: "Think everyone's thinking about you? They're busy thinking about themselves." },
    /* love */
    { c: 'love', line: 'Reply raaleda? Phone ki kooda rest kaavali bro. Lite thesko.', en: 'No reply? Even the phone needs rest, bro.' },
    { c: 'love', line: 'Breakup ayinda? Ippudu nee time, nee dabbu, nee phone storage, anni neeve.', en: 'Breakup? Your time, money and phone storage are all yours again.' },
    { c: 'love', line: 'Prema kosam edavaku bro. Biryani eppudu ninnu vadileyadu.', en: "Don't cry over love. Biryani never leaves you." },
    { c: 'love', line: "'Seen' chesi reply ivvaleda? Nuvvu kooda drama ni seen chesi mundhuku vellu.", en: 'Left on seen? Leave the drama on seen and move on.' },
    { c: 'love', line: 'Crush ninnu pattinchukoleda? Amma chesina pappu ninnu eppudu pattinchukuntundi.', en: "Crush ignored you? Mom's pappu never will." },
    { c: 'love', line: 'Vaallu neeku saripovu ante, universe neeku upgrade plan chesthundi. Lite thesko.', en: "If they weren't right, the universe is planning your upgrade." },
    /* office */
    { c: 'office', line: 'Manager arichada? Athaniki kooda oka manager unnadu. Lite thesko.', en: 'Boss yelled? Your boss has a boss too.' },
    { c: 'office', line: 'Monday vasthundi, pothundi. Salary kooda alaage. Lite thesko.', en: 'Monday comes and goes. So does the salary.' },
    { c: 'office', line: 'Appraisal raaleda? Nee value Excel sheet lo ledu bro.', en: "No raise? Your worth isn't in an Excel sheet." },
    { c: 'office', line: 'Deadline ante line maatrame bro, dead kaadu. Lite thesko.', en: "A deadline is just a line, bro. Nobody's dying." },
    { c: 'office', line: 'Aa meeting oka email ayi undaalsindi. Andariki thelusu. Lite thesko.', en: "That meeting should've been an email. Everyone knows." },
    { c: 'office', line: 'Work-life balance leda? Ee Friday life vaipu ekkuva weight vey.', en: 'No work-life balance? This Friday, tilt it toward life.' },
    /* exams */
    { c: 'exams', line: 'Exam chedipoyinda? Supply undi, life undi. Lite thesko.', en: "Bombed the exam? There's a supplementary. And there's life." },
    { c: 'exams', line: 'Marks nee market value kaadu bro.', en: "Marks aren't your market value." },
    { c: 'exams', line: 'Syllabus eppudu poorthi avadu. Life laage. Lite thesko.', en: 'The syllabus never finishes. Neither does life. Relax.' },
    { c: 'exams', line: 'Backlog unda? Einstein ki kooda unnayani antaru. Verify cheyyaku, lite thesko.', en: "Got a backlog? They say Einstein had some too. Don't fact-check it, just chill." },
    { c: 'exams', line: 'Result repu vasthundi. Nuvvu eeroju nidrapo.', en: 'Results come tomorrow. You sleep today.' },
    /* money */
    { c: 'money', line: 'Month-end kada? Andariki ade scene. Lite thesko.', en: 'Month-end? Same scene for everyone.' },
    { c: 'money', line: 'Dabbu vasthundi pothundi. Friends tho chai ki eppudu saripothundi.', en: "Money comes and goes. It's always enough for chai with friends." },
    { c: 'money', line: 'EMI unda? Ante bank ninnu nammindi. Lite thesko.', en: 'Got an EMI? That means a bank believed in you.' },
    { c: 'money', line: 'Account balance choodaku bro, life balance choodu.', en: 'Stop checking account balance. Check life balance.' },
    { c: 'money', line: 'Savings leva? Experience undi. Adi kooda investment e.', en: "No savings? You've got experience. That's an investment too." },
    /* family */
    { c: 'family', line: 'Amma thittinda? Adi kooda preme bro. Velli annam thinu.', en: "Mom scolded you? That's love too. Go eat." },
    { c: 'family', line: "'Pelli eppudu?' ani adigara? Navvi 'lite theskondi uncle' anu.", en: "Asked 'when's the wedding?' Smile and say 'lite theskondi, uncle'." },
    { c: 'family', line: "Nanna 'naa time lo' ani modalupettaara? Vinu, navvu, lite thesko.", en: "Dad started with 'in my days'? Listen, smile, take it light." },
    { c: 'family', line: 'Pakkinti vaalla abbayi tho comparison? Athanni kooda evarithono compare chesthunnaru. Lite thesko.', en: "Compared to the neighbour's kid? He's being compared to someone too." },
    { c: 'family', line: 'Family group lo good morning messages? Adi premaki JPEG roopam bro. Lite thesko.', en: "Good-morning forwards in the family group? That's love in JPEG form." },
    /* hyderabad */
    { c: 'hyd', line: 'Traffic lo unnava? Hyderabad motham neethone undi bro. Lite thesko.', en: 'Stuck in traffic? All of Hyderabad is stuck with you.' },
    { c: 'hyd', line: 'Vaana padithe road nadi avuthundi. Adi Hyderabad. Lite thesko.', en: "Rain turns roads into rivers. That's just Hyderabad." },
    { c: 'hyd', line: 'Auto vaadu meter veyaleda? Nuvvu kooda life ki meter veyaku. Lite thesko.', en: "Auto guy didn't run the meter? Don't run a meter on life either." },
    { c: 'hyd', line: 'Aidu nimishaalu ante Hyderabad lo iravai. Andariki thelusu. Lite thesko.', en: 'Five minutes means twenty in Hyderabad. Everyone knows.' },
    /* cricket */
    { c: 'cricket', line: 'India odipoyinda? Repu inko match undi bro. Lite thesko.', en: "India lost? There's another match tomorrow." },
    { c: 'cricket', line: 'Nee team odithe nee salary thaggadu bro. Lite thesko.', en: "Your team losing doesn't cut your salary, bro." },
    { c: 'cricket', line: 'Last over lo odaara? Adi kooda entertainment e. Lite thesko.', en: "Lost in the last over? That's still entertainment." },
    /* friends */
    { c: 'friends', line: "Friend late ayyada? 'Bayaludheruthunna' annadu ante inka snanam cheyaledu. Lite thesko.", en: "Friend's late? 'Leaving now' means he hasn't showered yet." },
    { c: 'friends', line: 'Goa plan cancel ayinda? Adi plan kaadu bro, adi tradition.', en: "Goa plan cancelled? That's not a plan, that's a tradition." },
    { c: 'friends', line: 'Group lo nee message ki reply leda? Andaru chadivaaru, navvaaru, marchipoyaaru. Lite thesko.', en: 'No reply in the group? They all read it, laughed, forgot. Take it light.' }
  ];

  var LEVELS = [
    { max: 3,  name: 'Chinna tension',    en: 'Chai level. One cup, done.',            rx: 'Rx: 1 chai · 3 long breaths · 0 overthinking' },
    { max: 6,  name: 'Medium tension',    en: 'Biryani level. Handle with rice.',      rx: 'Rx: 1 biryani · 1 friend call · 20 min nidra' },
    { max: 8,  name: 'Pedda tension',     en: 'Full-meals level. Sit down first.',     rx: "Rx: phone down · 10 min walk · 'em kaadu' ani 3 saarlu anu" },
    { max: 10, name: 'Overthinking alert', en: 'Call-a-friend level. Seriously, call.', rx: 'Rx: friend ki call chey · ippude · nijanga' }
  ];

  /* ---------------- helpers ---------------- */
  var $ = function (id) { return document.getElementById(id); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }
  function detectCategory(text) {
    var best = 'general', bestHits = 0, k;
    for (k in KEYWORDS) {
      var m = text.match(new RegExp(KEYWORDS[k].source, 'gi'));
      if (m && m.length > bestHits) { bestHits = m.length; best = k; }
    }
    return best;
  }
  function tensionLevel(text) {
    var s = 3;
    s += Math.min(4, Math.floor(text.length / 40));
    s += Math.min(2, (text.match(/[!?]/g) || []).length);
    var letters = text.replace(/[^A-Za-z]/g, '');
    if (letters.length > 6 && letters.replace(/[^A-Z]/g, '').length / letters.length > .5) s += 1;
    if (/\b(chala|chaala|very|too much|urgent|asap|help|cheyyalenu|cheyalenu|please|plz|bhayam|kastam|kashtam)\b/i.test(text)) s += 1;
    return Math.max(1, Math.min(10, s));
  }
  function levelInfo(n) { for (var i = 0; i < LEVELS.length; i++) if (n <= LEVELS[i].max) return LEVELS[i]; return LEVELS[LEVELS.length - 1]; }

  var queues = {};
  function nextQuote(cat) {
    var pool = QUOTES.filter(function (q) { return q.c === cat; });
    if (pool.length < 3) pool = pool.concat(QUOTES.filter(function (q) { return q.c === 'general'; }));
    if (!queues[cat] || !queues[cat].length) {
      queues[cat] = pool.slice().sort(function () { return Math.random() - .5; });
    }
    return queues[cat].shift();
  }
  function shareText(q) { return q.line + '\n(' + q.en + ')\n\n😌 Lite thesko bro → ' + URL_; }
  function waLink(text) { return 'https://wa.me/?text=' + encodeURIComponent(text); }
  function isMobile() {
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') return navigator.userAgentData.mobile;
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }

  /* ---------------- canvas card ---------------- */
  var FONT = '"Anek Latin", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  var fontsReady = null;
  function ensureFonts() {
    if (fontsReady) return fontsReady;
    if (!document.fonts || !document.fonts.load) return (fontsReady = Promise.resolve());
    fontsReady = Promise.all([
      document.fonts.load('800 64px "Anek Latin"'), document.fonts.load('700 40px "Anek Latin"'), document.fonts.load('600 34px "Anek Latin"')
    ]).catch(function () {});
    return fontsReady;
  }
  function wrap(ctx, text, maxW) {
    var words = text.split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) {
      var t = cur ? cur + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  /* opts: { quote, tension, level, cat, label } */
  function renderCard(opts) {
    var canvas = $('cardCanvas'), ctx = canvas.getContext('2d');
    var W = 1080, H = 1080, PAD = 72, inner = W - PAD * 2;
    var cat = CATS[opts.cat] || CATS.general, bg = cat.bg, fg = cat.fg, ink = '#14110F';
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = 10; ctx.strokeStyle = ink; ctx.strokeRect(24, 24, W - 48, H - 48);

    /* header */
    ctx.fillStyle = fg; ctx.textBaseline = 'alphabetic';
    ctx.font = '800 40px ' + FONT; ctx.textAlign = 'left'; ctx.fillText('LITE THESKO BRO', PAD, 112);
    ctx.font = '600 28px ' + FONT; ctx.textAlign = 'right'; ctx.globalAlpha = .8; ctx.fillText(SITE, W - PAD, 112); ctx.globalAlpha = 1;
    ctx.textAlign = 'left';

    var y = 190;
    /* tension bubble */
    if (opts.tension) {
      var tText = opts.tension.length > 110 ? opts.tension.slice(0, 107) + '…' : opts.tension;
      ctx.font = '600 32px ' + FONT;
      var tLines = wrap(ctx, 'Nee tension: ' + tText, inner - 60).slice(0, 3);
      var bh = tLines.length * 44 + 40;
      ctx.fillStyle = '#FFFFFF'; roundRect(ctx, PAD, y, inner, bh, 22); ctx.fill();
      ctx.lineWidth = 5; ctx.strokeStyle = ink; ctx.stroke();
      ctx.fillStyle = ink;
      tLines.forEach(function (l, i) { ctx.fillText(l, PAD + 30, y + 52 + i * 44); });
      y += bh + 56;
    } else { y = 250; }

    /* quote: shrink to fit */
    var q = opts.quote, size = q.line.length <= 45 ? 80 : q.line.length <= 75 ? 68 : 58, qLines, enLines, need, avail = 860 - y;
    for (;;) {
      ctx.font = '800 ' + size + 'px ' + FONT; qLines = wrap(ctx, q.line, inner);
      ctx.font = '500 34px ' + FONT; enLines = wrap(ctx, q.en, inner);
      need = qLines.length * size * 1.15 + 36 + enLines.length * 46;
      if (need <= avail || size <= 40) break; size -= 4;
    }
    /* centre the block in the free space (slight upward bias reads better) */
    if (avail > need) y += Math.floor((avail - need) * 0.42);
    ctx.fillStyle = fg; ctx.font = '800 ' + size + 'px ' + FONT;
    qLines.forEach(function (l, i) { ctx.fillText(l, PAD, y + size + i * size * 1.15); });
    var ty = y + qLines.length * size * 1.15 + 36;
    ctx.font = '500 34px ' + FONT; ctx.globalAlpha = .8;
    enLines.forEach(function (l, i) { ctx.fillText(l, PAD, ty + 30 + i * 46); });
    ctx.globalAlpha = 1;

    /* footer: level meter or hashtag */
    var fy = H - 130;
    ctx.fillStyle = fg;
    if (opts.level) {
      var info = levelInfo(opts.level);
      ctx.font = '700 30px ' + FONT; ctx.fillText('Tension level ' + opts.level + '/10 · ' + info.name, PAD, fy);
      for (var i = 0; i < 10; i++) {
        var bx = PAD + i * 36, by = fy + 22;
        roundRect(ctx, bx, by, 28, 28, 6);
        ctx.fillStyle = i < opts.level ? (opts.level >= 9 ? '#FF3B30' : (bg === '#FF4D8D' ? '#14110F' : '#FF4D8D')) : 'rgba(255,255,255,.55)';
        ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = ink; ctx.stroke();
      }
      ctx.fillStyle = fg; ctx.font = '600 26px ' + FONT; ctx.globalAlpha = .85;
      ctx.fillText(info.rx, PAD, fy + 88); ctx.globalAlpha = 1;
    } else {
      ctx.font = '700 30px ' + FONT; ctx.fillText(opts.label || '#LiteTheskoBro', PAD, fy + 40);
    }
    ctx.font = '72px ' + FONT; ctx.textAlign = 'right'; ctx.fillText('😌', W - PAD, fy + 66); ctx.textAlign = 'left';
    return canvas;
  }
  function canvasBlob(canvas) {
    return new Promise(function (res) { canvas.toBlob(function (b) { res(b); }, 'image/png'); });
  }
  function downloadBlob(blob, name) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  function shareCard(opts, text) {
    return ensureFonts().then(function () { return canvasBlob(renderCard(opts)); }).then(function (blob) {
      var file;
      try { file = new File([blob], 'lite-thesko-bro.png', { type: 'image/png' }); } catch (e) {}
      /* native share sheet (WhatsApp, Instagram, status) only on phones; desktop goes straight to WhatsApp Web */
      if (isMobile() && file && navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        return navigator.share({ files: [file], text: text, title: 'Lite Thesko Bro' }).catch(function (err) {
          if (err && err.name === 'AbortError') return;
          window.open(waLink(text), '_blank', 'noopener');
        });
      }
      /* desktop / unsupported: WhatsApp web with text */
      window.open(waLink(text), '_blank', 'noopener');
      toast('WhatsApp open avuthondi. Card kaavaalante Download nokku.');
    });
  }
  function downloadCard(opts) {
    return ensureFonts().then(function () { return canvasBlob(renderCard(opts)); }).then(function (blob) {
      downloadBlob(blob, 'lite-thesko-bro.png'); toast('Card download ayindi. Share chey bro.');
    });
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(function () { toast('Copy ayindi.'); });
    var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Copy ayindi.'); } catch (e) {} ta.remove();
    return Promise.resolve();
  }
  function paintQuote(prefix, q) {
    $(prefix + 'Main').textContent = q.line; $(prefix + 'En').textContent = q.en;
  }

  /* ---------------- generator ---------------- */
  var form = $('tensionForm'), textarea = $('tension'), chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var chosen = 'auto', current = null, currentCat = 'general', currentLevel = 0, currentText = '';

  chips.forEach(function (ch) {
    ch.addEventListener('click', function () {
      chosen = ch.dataset.cat;
      chips.forEach(function (c) { c.setAttribute('aria-checked', String(c === ch)); });
      updateDetected();
    });
  });
  function updateDetected() {
    var el = $('detected'), t = textarea.value.trim();
    if (chosen !== 'auto') { el.textContent = ''; return; }
    el.textContent = t.length > 3 ? 'Detect ayindi: ' + CATS[detectCategory(t)].label : '';
  }
  textarea.addEventListener('input', updateDetected);
  textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event('submit', { cancelable: true })); }
  });

  function bump() {
    var n = parseInt(store.get('ltb-count') || '0', 10) + 1; store.set('ltb-count', String(n));
    $('counter').textContent = 'Nuvvu ippatidaaka lite theskunna tensions: ' + n + (n === 1 ? ' · Manchi modalu bro.' : n >= 10 ? ' · Nuvvu pro-level chill.' : '');
  }
  function showResult(fresh) {
    var text = textarea.value.trim();
    currentText = text;
    currentCat = chosen === 'auto' ? (text ? detectCategory(text) : 'general') : chosen;
    if (fresh) currentLevel = text ? tensionLevel(text) : 4;
    current = nextQuote(currentCat);
    var info = levelInfo(currentLevel), cat = CATS[currentCat];

    $('levelNum').textContent = currentLevel;
    $('levelName').textContent = info.name + ' · ' + info.en;
    $('rx').textContent = info.rx;
    var bars = $('bars'); bars.innerHTML = '';
    for (var i = 0; i < 10; i++) { var b = document.createElement('i'); if (i < currentLevel) b.className = 'on' + (currentLevel >= 9 ? ' hot' : ''); bars.appendChild(b); }
    var card = $('quoteCard'); card.style.setProperty('--card', cat.bg); card.style.setProperty('--fg', cat.fg);
    paintQuote('q', current);
    var res = $('result'); res.hidden = false;
    if (fresh) { bump(); res.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); showResult(true); });
  $('anotherBtn').addEventListener('click', function () { showResult(false); });
  function cardOpts() { return { quote: current, tension: currentText, level: currentLevel, cat: currentCat }; }
  $('shareBtn').addEventListener('click', function () { if (current) shareCard(cardOpts(), shareText(current)); });
  $('downloadBtn').addEventListener('click', function () { if (current) downloadCard(cardOpts()); });
  $('copyBtn').addEventListener('click', function () { if (current) copyText(shareText(current)); });

  /* ---------------- daily ---------------- */
  var now = new Date();
  var dayNum = Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000);
  var daily = QUOTES[dayNum % QUOTES.length];
  paintQuote('d', daily);
  var dcat = CATS[daily.c]; var dcard = $('dailyCard'); dcard.style.setProperty('--card', dcat.bg); dcard.style.setProperty('--fg', dcat.fg);
  try { $('dailyDate').textContent = 'Eeroju · ' + now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }); } catch (e) {}
  var dailyOpts = { quote: daily, cat: daily.c, label: '#LiteTheskoBro · Eeroju lite thesko' };
  $('dailyShare').addEventListener('click', function () { shareCard(dailyOpts, shareText(daily)); });
  $('dailyDownload').addEventListener('click', function () { downloadCard(dailyOpts); });

  /* ---------------- meme wall ---------------- */
  var grid = $('memeGrid');
  var picks = [1, 4, 10, 15, 21, 26, 31, 36, 40];
  picks.forEach(function (idx) {
    var q = QUOTES[idx]; if (!q) return;
    var cat = CATS[q.c];
    var el = document.createElement('article'); el.className = 'quote-card meme';
    el.style.setProperty('--card', cat.bg); el.style.setProperty('--fg', cat.fg);
    el.innerHTML = '<span class="s-tag"></span><p class="q-main"></p><p class="q-en"></p><div class="actions"><button type="button" class="btn">⬇️ Download</button><button type="button" class="btn">📲 Share</button></div>';
    el.querySelector('.s-tag').textContent = cat.label; el.querySelector('.q-main').textContent = q.line; el.querySelector('.q-en').textContent = q.en;
    var btns = el.querySelectorAll('button');
    var o = { quote: q, cat: q.c, label: '#LiteTheskoBro' };
    btns[0].addEventListener('click', function () { downloadCard(o); });
    btns[1].addEventListener('click', function () { shareCard(o, shareText(q)); });
    grid.appendChild(el);
  });

  /* warm the fonts so the first card renders in the right typeface */
  ensureFonts();

  /* expose a tiny read-only hook for tests */
  window.__ltb = { quotes: QUOTES.length, detect: detectCategory, level: tensionLevel };
})();
