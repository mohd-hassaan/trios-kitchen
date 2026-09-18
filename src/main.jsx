import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const MAP_URL = 'https://maps.app.goo.gl/HiMEpQVsH4ns6CfdA';
const INSTAGRAM_URL = 'https://www.instagram.com/trioss.__.kitchen09?stkn=enhsNnFsdWI1dGUy';
const WHATSAPP = '918127882651';
const EVENT_TIME = new Date('2026-09-19T15:00:00+05:30').getTime();

const foods = [
  { emoji: '🍘', title: 'Appe', line: 'Soft, bite-size, garma-garam bites — ek khaoge, phir rukna mushkil!' },
  { emoji: '🌶️🥔', title: 'Dhaniya Aloo', line: 'Fresh dhaniya + chilli + potato — simple, chatpata aur full desi flavour!' },
  { emoji: '🍗', title: 'Roasted Chicken', line: 'Roasted, masaledaar aur smoky vibes — chicken lovers, ready ho?' },
  { emoji: '🥞', title: 'Meetha Bread Toast', line: 'Crispy, meetha aur perfect sweet ending.' },
  { emoji: '🥔🔥', title: 'Dried Masala Aloo', line: 'Masala + potato ka dry, punchy combo — desi craving sorted!' },
];

function makeCoupon(existing = new Set()) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for (let attempt = 0; attempt < 100; attempt++) {
    let code = 'TRIO-';
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    if (!existing.has(code)) return code;
  }
  return `TRIO-${Date.now().toString(36).slice(-5).toUpperCase()}`;
}

function normalizePhone(value) {
  return value.replace(/\D/g, '').replace(/^91/, '').slice(-10);
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [coming, setComing] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const countdown = useMemo(() => {
    const diff = Math.max(0, EVENT_TIME - now);
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
      live: diff === 0,
    };
  }, [now]);

  const openForm = () => {
    setError('');
    setShowForm(true);
  };

  const submit = (e) => {
    e.preventDefault();
    setError('');
    const cleanPhone = normalizePhone(phone);
    if (!name.trim()) return setError('Apna naam enter karo.');
    if (cleanPhone.length !== 10) return setError('Please enter a valid 10-digit Indian mobile number.');

    const previous = JSON.parse(localStorage.getItem('triosGuests') || '[]');
    const duplicate = previous.find((item) => item.phone === cleanPhone);
    if (duplicate) {
      setError(`Is number se coupon already generate ho chuka hai: ${duplicate.coupon}`);
      return;
    }

    const existingCodes = new Set(previous.map((item) => item.coupon));
    const newCoupon = makeCoupon(existingCodes);
    const record = {
      name: name.trim(),
      phone: cleanPhone,
      coming,
      coupon: newCoupon,
      discount: '10%',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('triosGuests', JSON.stringify([...previous, record]));
    setCoupon(newCoupon);
    setShowForm(false);
    setShowCoupon(true);

    const msg = [
      "Hello Trio's Kitchen 👋",
      '',
      'New Guest Registration 🎉',
      '',
      `Name: ${record.name}`,
      `Mobile: +91 ${record.phone}`,
      `Coming: ${coming ? 'Yes' : 'No'}`,
      `Coupon: ${newCoupon}`,
      'Discount: 10% OFF',
      '',
      'One person = one coupon code.',
      'Exhibition: Royal Castle, Jajmau',
      'Date: 19 September 2026',
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const copyCoupon = async () => {
    await navigator.clipboard?.writeText(coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="app">
      <div className="top-strip">
        <motion.div animate={{ x: ['0%', '-35%'] }} transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}>
          🍗 ROASTED CHICKEN &nbsp; • &nbsp; 🌶️🥔 DHANIYA ALOO &nbsp; • &nbsp; 🥞 APPE &nbsp; • &nbsp; 🍞 MEETHA TOAST &nbsp; • &nbsp; 🥔 MASALA ALOO &nbsp; • &nbsp; 🍗 ROASTED CHICKEN &nbsp; • &nbsp; 🌶️🥔 DHANIYA ALOO
        </motion.div>
      </div>

      <header className="hero">
        <motion.div className="blob blob-green" animate={{ rotate: [-8, 2, -8], scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 7 }} />
        <motion.div className="blob blob-yellow" animate={{ rotate: [2, -5, 2], y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
        <motion.div className="orbit orbit-one" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }} />
        <motion.div className="orbit orbit-two" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 13, ease: 'linear' }} />
        <motion.div className="floating-food food-one" animate={{ y: [0, -15, 0], rotate: [-8, 5, -8] }} transition={{ repeat: Infinity, duration: 3.5 }}>🥔</motion.div>
        <motion.div className="floating-food food-two" animate={{ y: [0, 14, 0], rotate: [8, -6, 8] }} transition={{ repeat: Infinity, duration: 4 }}>🍗</motion.div>
        <motion.div className="floating-food food-three" animate={{ y: [0, -10, 0], rotate: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 3 }}>🌶️</motion.div>

        <motion.img initial={{ y: -40, opacity: 0, scale: .7 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 10 }} className="logo" src="/assets/trios-logo.jpg" alt="Trio's Kitchen logo" />
        <motion.p className="tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>Teen Tigada, Zayka Bigada!</motion.p>

        <div className="hero-kicker"><span>🍽️ EXHIBITION SPECIAL</span></div>
        <motion.h1 initial={{ opacity: 0, scale: .72, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .15, type: 'spring', stiffness: 110 }}>
          <span>KUCH</span><em>KHAOGE?</em>
        </motion.h1>
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>
          Zyada socho mat,<br /><strong>aake kha lo..... 😋</strong>
        </motion.div>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8 }}>
          <motion.button className="btn primary pulse-btn" onClick={openForm} whileHover={{ scale: 1.06 }} whileTap={{ scale: .96 }}>🎁 GET 10% OFF</motion.button>
          <motion.a className="btn secondary" href={MAP_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.06 }} whileTap={{ scale: .96 }}>📍 LOCATION</motion.a>
        </motion.div>
        <motion.div className="event-pill" animate={{ boxShadow: ['0 0 0 0 rgba(245,181,27,.35)', '0 0 0 12px rgba(245,181,27,0)', '0 0 0 0 rgba(245,181,27,0)'] }} transition={{ repeat: Infinity, duration: 2.4 }}>
          SATURDAY • 19 SEPTEMBER • 3 PM – 10 PM
        </motion.div>
        <motion.div className="scroll-cue" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>↓ bhookh neeche hai ↓</motion.div>
      </header>

      <section className="countdown-wrap">
        <p>{countdown.live ? '🔥 WE ARE LIVE! Aao, stall pe milte hain!' : '⏳ Exhibition vibes loading...'}</p>
        <div className="countdown">
          {[['DAYS', countdown.d], ['HRS', countdown.h], ['MIN', countdown.m], ['SEC', countdown.s]].map(([label, val]) => (
            <motion.div className="time-box" key={label} animate={{ scale: label === 'SEC' ? [1, 1.08, 1] : 1 }} transition={{ repeat: Infinity, duration: 1 }}>
              <b>{String(val).padStart(2, '0')}</b><span>{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <main>
        <section className="section food-section" id="food">
          <div className="section-heading"><span>😋</span><div><small>STALL PE KYA MILEGA?</small><h2>KHANE KA MOOD HAI?</h2></div></div>
          <p className="section-intro">Prices yahan nahi — <b>taste ka trailer</b> milega. Exhibition mein aao aur asli swaad try karo! 😉</p>
          <div className="food-grid">
            {foods.map((food, i) => (
              <motion.article key={food.title} className="food-card" initial={{ opacity: 0, y: 35, rotate: i % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: i * .08, type: 'spring' }} whileHover={{ y: -10, rotate: i % 2 ? 1 : -1, scale: 1.02 }}>
                <motion.div className="food-emoji" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.5 + i * .2 }}>{food.emoji}</motion.div>
                <h3>{food.title}</h3><p>{food.line}</p><div className="card-squiggle">〰〰</div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="friend-banner">
          <div><small>AKELA KYUN?</small><h2>TEEN TIGADA,<br /><span>ZAYKA BIGADA!</span></h2><p>Friends ko bulao. Bhookh ko manao. 😎</p></div>
          <motion.div className="big-plate" animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 4 }}>🍗</motion.div>
        </section>

        <section className="discount-section" id="coupon">
          <motion.div className="brush" animate={{ rotate: [-2, 1, -2] }} transition={{ repeat: Infinity, duration: 4 }}>GUEST SPECIAL</motion.div>
          <h2>PEHLE REGISTER KARO...</h2>
          <motion.div className="off" animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2.8 }}>10% OFF</motion.div>
          <p>Naam + mobile number register karo aur apna <b>unique coupon code</b> pao.</p>
          <button className="btn primary big" onClick={openForm}>🎟️ MERA COUPON DO</button>
          <small>Ek mobile number se sirf ek registration/coupon.</small>
        </section>

        <section className="location-section">
          <motion.div className="map-card" whileInView={{ opacity: [0, 1], y: [25, 0] }} viewport={{ once: true }}>
            <motion.div className="map-pin" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>📍</motion.div>
            <div><small>KAHAN MILNA HAI?</small><h2>ROYAL CASTLE</h2><p>Jajmau, Kanpur</p><p>Saturday, 19 September • 3:00 PM – 10:00 PM</p></div>
            <a className="btn secondary" href={MAP_URL} target="_blank" rel="noreferrer">OPEN MAPS ↗</a>
          </motion.div>
        </section>

        <section className="instagram-section">
          <div className="insta-icon">◎</div><small>FOOD, FUN &amp; UPDATES</small><h2>INSTAGRAM PE BHI MILO! 📸</h2><p>@trioss.__.kitchen09</p><a className="btn primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">FOLLOW US ↗</a>
        </section>
      </main>

      <footer><img src="/assets/trios-logo.jpg" alt="Trio's Kitchen" /><p>Teen Tigada, Zayka Bigada!</p><span>Made for hungry people. ❤️</span>
        <small className="developer-credit">
          Developed by <strong>Mohd Hassan</strong>
        </small></footer>

      <AnimatePresence>
        {showForm && <div className="modal-backdrop" onClick={() => setShowForm(false)}><motion.div className="modal" initial={{ scale: .7, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: .7, opacity: 0, y: 40 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} onClick={e => e.stopPropagation()}>
          <button className="close" onClick={() => setShowForm(false)}>×</button><div className="modal-top">🎁</div><small>GUEST REGISTRATION</small><h2>10% OFF KE LIYE<br />NAAM + NUMBER BATAO!</h2>
          <form onSubmit={submit}>
            <label>Name<input value={name} onChange={e => setName(e.target.value)} placeholder="Aapka naam" autoFocus required /></label>
            <label>Mobile Number<input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" inputMode="numeric" maxLength="10" required /></label>
            <label className="check"><input type="checkbox" checked={coming} onChange={e => setComing(e.target.checked)} /> Haan, main aa raha/rahi hoon! 🎉</label>
            {error && <div className="form-error">⚠️ {error}</div>}
            <button className="btn primary big" type="submit">GENERATE MY COUPON</button>
          </form>
          <p className="tiny">Ek mobile number se sirf <b>one registration + one coupon</b>. Registration ke baad WhatsApp message ready ho jayega.</p>
        </motion.div></div>}

        {showCoupon && <div className="modal-backdrop" onClick={() => setShowCoupon(false)}><motion.div className="coupon-modal" initial={{ y: 80, opacity: 0, scale: .8 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 170 }} onClick={e => e.stopPropagation()}>
          <div className="confetti">🎉 ✨ 🎊 ✨ 🎉</div><button className="close" onClick={() => setShowCoupon(false)}>×</button><small>TRIO'S KITCHEN GUEST PASS</small><h2>CONGRATULATIONS!</h2>
          <div className="coupon-ticket"><span>YOUR GUEST DISCOUNT</span><strong>10% OFF</strong><code>{coupon}</code><button onClick={copyCoupon}>{copied ? 'COPIED ✓' : 'COPY COUPON'}</button><p>One person = one coupon • Show this code at Trio's Kitchen</p></div>
          <a className="btn secondary" href={MAP_URL} target="_blank" rel="noreferrer">📍 GET DIRECTIONS</a>
        </motion.div></div>}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
