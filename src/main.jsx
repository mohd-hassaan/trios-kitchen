import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import './styles.css';

import hebaCard1 from './assets/V Card-1.png';
import hebaCard2 from './assets/V Card-2.png';
import zainabCard1 from './assets/ZAINAB KHANAM V Card-1.png';
import zainabCard2 from './assets/ZAINAB KHANAM V Card-2.png';

const MAP_URL = 'https://maps.app.goo.gl/HiMEpQVsH4ns6CfdA';
const INSTAGRAM_URL =
  'https://www.instagram.com/trioss.__.kitchen09?stkn=enhsNnFsdWI1dGUy';

const foods = [
  {
    emoji: '🍘',
    title: 'Appe',
    line: 'Soft, bite-size, garma-garam bites — ek khaoge, phir rukna mushkil!',
  },
  {
    emoji: '🌶️🥔',
    title: 'Dhaniya Aloo',
    line: 'Fresh dhaniya + chilli + potato — simple, chatpata aur full desi flavour!',
  },
  {
    emoji: '🍗',
    title: 'Roasted Chicken',
    line: 'Roasted, masaledaar aur smoky vibes — chicken lovers, ready ho?',
  },
  {
    emoji: '🥞',
    title: 'Meetha Bread Toast',
    line: 'Crispy, meetha aur perfect sweet ending.',
  },
  {
    emoji: '🥔🔥',
    title: 'Dried Masala Aloo',
    line: 'Masala + potato ka dry, punchy combo — desi craving sorted!',
  },
];

/* =========================================================
   V-CARD INFORMATION
   ========================================================= */

const creators = [
  {
    name: 'HEBA FATIMA',
    role: 'Artist',
    phone: '+91 7522814482',
    location: 'Kanpur',
    cards: [
      {
        image: hebaCard1,
        label: 'FRONT',
      },
      {
        image: hebaCard2,
        label: 'CONTACT',
      },
    ],
    instagram: 'https://www.instagram.com/hebacreates__',
    handle: '@hebacreates__',
  },

  {
    name: 'ZAINAB KHANAM',
    role: 'Graphic & Visual Designer',
    phone: '+91 6306727168',
    location: 'Kanpur, India',
    cards: [
      {
        image: zainabCard1,
        label: 'FRONT',
      },
      {
        image: zainabCard2,
        label: 'CONTACT',
      },
    ],
    email: 'zainukhan065@gmail.com',
    linkedin:
      'https://linkedin.com/in/zainab-khanam-b22aa329/',
    behance: 'https://behance.net/zainabkhan97',
  },
];


/* =========================================================
   V-CARD COMPONENT
   ========================================================= */

function ContactCard({ person, index }) {
  return (
    <motion.article
      className="vcard-card"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: index * 0.12,
        type: 'spring',
        stiffness: 90,
      }}
      whileHover={{ y: -8 }}
    >

      {/* BOTH SIDES OF THE V-CARD */}
      <div className="vcard-image-wrap">

        <div className="vcard-image-grid">

          {person.cards.map((card) => (
            <div
              className="vcard-side"
              key={card.image}
            >

              <img
                src={card.image}
                alt={`${person.name} visiting card ${card.label.toLowerCase()} side`}
                className="vcard-image"
                loading="lazy"
              />

              <span className="vcard-side-label">
                {card.label}
              </span>

            </div>
          ))}

        </div>

        <span className="vcard-badge">
          BOTH SIDES • DIGITAL CARD
        </span>

      </div>


      {/* CARD INFORMATION */}
      <div className="vcard-info">

        <div className="vcard-heading">

          <div>

            <small>CONNECT WITH</small>

            <h3>{person.name}</h3>

            <p>{person.role}</p>

          </div>

          <span className="vcard-icon">
            ↗
          </span>

        </div>


        {/* CONTACT DETAILS */}
        <div className="contact-list">

          {/* PHONE */}
          <a
            href={`tel:${person.phone.replace(/\D/g, '')}`}
            className="contact-row"
          >

            <span className="contact-symbol">
              ☎
            </span>

            <span>
              <small>PHONE</small>
              <strong>{person.phone}</strong>
            </span>

          </a>


          {/* LOCATION */}
          <div className="contact-row">

            <span className="contact-symbol">
              ⌖
            </span>

            <span>
              <small>LOCATION</small>
              <strong>{person.location}</strong>
            </span>

          </div>


          {/* INSTAGRAM */}
          {person.instagram && (
            <a
              href={person.instagram}
              target="_blank"
              rel="noreferrer"
              className="contact-row"
            >

              <span className="contact-symbol">
                ◎
              </span>

              <span>
                <small>INSTAGRAM</small>
                <strong>{person.handle}</strong>
              </span>

            </a>
          )}


          {/* EMAIL */}
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="contact-row"
            >

              <span className="contact-symbol">
                ✉
              </span>

              <span>
                <small>EMAIL</small>
                <strong>{person.email}</strong>
              </span>

            </a>
          )}

        </div>


        {/* ACTION BUTTONS */}
        <div className="vcard-actions">

          <a
            className="btn primary"
            href={`tel:${person.phone.replace(/\D/g, '')}`}
          >
            CALL NOW ↗
          </a>


          {person.instagram && (
            <a
              className="btn secondary"
              href={person.instagram}
              target="_blank"
              rel="noreferrer"
            >
              INSTAGRAM ↗
            </a>
          )}


          {person.linkedin && (
            <a
              className="btn secondary"
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN ↗
            </a>
          )}


          {person.behance && (
            <a
              className="btn secondary"
              href={person.behance}
              target="_blank"
              rel="noreferrer"
            >
              BEHANCE ↗
            </a>
          )}

        </div>

      </div>

    </motion.article>
  );
}


/* =========================================================
   MAIN APP
   ========================================================= */

function App() {

  const scrollToCards = () => {
    document
      .getElementById('v-cards')
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };


  return (
    <div className="app">


      {/* =====================================================
          TOP FOOD MARQUEE
      ===================================================== */}

      <div className="top-strip">

        <motion.div
          animate={{
            x: ['0%', '-35%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 16,
            ease: 'linear',
          }}
        >

          🍗 ROASTED CHICKEN
          &nbsp; • &nbsp;

          🌶️🥔 DHANIYA ALOO
          &nbsp; • &nbsp;

          🥞 APPE
          &nbsp; • &nbsp;

          🍞 MEETHA TOAST
          &nbsp; • &nbsp;

          🥔 MASALA ALOO
          &nbsp; • &nbsp;

          🍗 ROASTED CHICKEN

        </motion.div>

      </div>



      {/* =====================================================
          HERO
      ===================================================== */}

      <header className="hero">

        <motion.div
          className="blob blob-green"
          animate={{
            rotate: [-8, 2, -8],
            scale: [1, 1.04, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
          }}
        />

        <motion.div
          className="blob blob-yellow"
          animate={{
            rotate: [2, -5, 2],
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
        />


        <motion.div
          className="orbit orbit-one"
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: 'linear',
          }}
        />


        <motion.div
          className="orbit orbit-two"
          animate={{
            rotate: -360,
          }}
          transition={{
            repeat: Infinity,
            duration: 13,
            ease: 'linear',
          }}
        />


        {/* FLOATING FOOD */}

        <motion.div
          className="floating-food food-one"
          animate={{
            y: [0, -15, 0],
            rotate: [-8, 5, -8],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
          }}
        >
          🥔
        </motion.div>


        <motion.div
          className="floating-food food-two"
          animate={{
            y: [0, 14, 0],
            rotate: [8, -6, 8],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
        >
          🍗
        </motion.div>


        <motion.div
          className="floating-food food-three"
          animate={{
            y: [0, -10, 0],
            rotate: [5, -5, 5],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
        >
          🌶️
        </motion.div>



        {/* LOGO */}

        <motion.img
          initial={{
            y: -40,
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 10,
          }}
          className="logo"
          src="/assets/trios-logo.jpg"
          alt="Trio's Kitchen logo"
        />


        <motion.p
          className="tagline"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.45,
          }}
        >
          Teen Tigada, Zayka Bigada!
        </motion.p>



        {/* HERO KICKER */}

        <div className="hero-kicker">
          <span>
            ❤️ THANK YOU, KANPUR!
          </span>
        </div>



        {/* HERO TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.72,
            rotate: -3,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.15,
            type: 'spring',
            stiffness: 110,
          }}
        >

          <span>
            AAP AAYE,
          </span>

          <em>
            HUMEIN YAAD RAHEGA!
          </em>

        </motion.h1>



        {/* HERO DESCRIPTION */}

        <motion.div
          className="hero-copy"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.65,
          }}
        >

          Itni pyaari response ke liye
          <br />

          <strong>
            Thank you from Trio's Kitchen! 😋❤️
          </strong>

        </motion.div>



        {/* HERO BUTTONS */}

        <motion.div
          className="hero-actions"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
          }}
        >

          <motion.button
            className="btn primary pulse-btn"
            onClick={scrollToCards}
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            📇 VIEW V-CARDS
          </motion.button>


          <motion.a
            className="btn secondary"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            📸 INSTAGRAM
          </motion.a>

        </motion.div>



        {/* HERO PILL */}

        <motion.div
          className="event-pill"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(245,181,27,.35)',
              '0 0 0 12px rgba(245,181,27,0)',
              '0 0 0 0 rgba(245,181,27,0)',
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
          }}
        >
          EXHIBITION DONE • MEMORIES MADE • THANK YOU ❤️
        </motion.div>


        <motion.div
          className="scroll-cue"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
        >
          ↓ creators se miliye ↓
        </motion.div>

      </header>



      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main>


        {/* ===================================================
            FOOD SECTION
        =================================================== */}

        <section
          className="section food-section"
          id="food"
        >

          <div className="section-heading">

            <span>
              😋
            </span>

            <div>

              <small>
                HAMARE STALL KI YAAD
              </small>

              <h2>
                KHANE KA MOOD HAI?
              </h2>

            </div>

          </div>


          <p className="section-intro">

            Exhibition khatam ho gayi, lekin{' '}
            <b>
              Trio's Kitchen ka zayka
            </b>{' '}
            aur aapka pyaar yaad rahega! ❤️

          </p>



          <div className="food-grid">

            {foods.map((food, i) => (

              <motion.article
                key={food.title}
                className="food-card"
                initial={{
                  opacity: 0,
                  y: 35,
                  rotate: i % 2 ? 2 : -2,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  delay: i * 0.08,
                  type: 'spring',
                }}
                whileHover={{
                  y: -10,
                  rotate: i % 2 ? 1 : -1,
                  scale: 1.02,
                }}
              >

                <motion.div
                  className="food-emoji"
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5 + i * 0.2,
                  }}
                >
                  {food.emoji}
                </motion.div>

                <h3>
                  {food.title}
                </h3>

                <p>
                  {food.line}
                </p>

                <div className="card-squiggle">
                  〰〰
                </div>

              </motion.article>

            ))}

          </div>

        </section>



        {/* ===================================================
            THANK YOU BANNER
        =================================================== */}

        <section className="friend-banner">

          <div>

            <small>
              EK BAAR NAHI...
            </small>

            <h2>

              AAPMEIN SE KAI LOG
              <br />

              <span>
                DOBAARA BHI AAYE! ❤️
              </span>

            </h2>

            <p>
              Har visit, har bite aur har feedback ne humein khush kar diya.
            </p>

          </div>


          <motion.div
            className="big-plate"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
          >
            🍗
          </motion.div>

        </section>



        {/* ===================================================
            V-CARDS
        =================================================== */}

        <section
          className="vcard-section"
          id="v-cards"
        >

          <div className="section-heading vcard-section-heading">

            <span>
              📇
            </span>

            <div>

              <small>
                AAPKE LIYE DIGITAL CONTACT
              </small>

              <h2>
                V-CARDS
              </h2>

            </div>

          </div>


          <p className="section-intro vcard-intro">

            Stall visit ke waqt share kiye gaye cards ab yahin mil jayenge —
            <b>
              number, location aur contact details clearly visible
            </b>{' '}
            hain.

          </p>



          <div className="vcard-grid">

            {creators.map((person, index) => (

              <ContactCard
                key={person.name}
                person={person}
                index={index}
              />

            ))}

          </div>

        </section>



        {/* ===================================================
            CONNECTION SECTION
        =================================================== */}

        <section className="location-section">

          <motion.div
            className="map-card"
            whileInView={{
              opacity: [0, 1],
              y: [25, 0],
            }}
            viewport={{
              once: true,
            }}
          >

            <motion.div
              className="map-pin"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
              }}
            >
              📍
            </motion.div>


            <div>

              <small>
                TRIO'S KITCHEN
              </small>

              <h2>
                LET'S STAY CONNECTED
              </h2>

              <p>
                Follow us for food, updates & future pop-ups.
              </p>

            </div>


            <a
              className="btn secondary"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              FOLLOW ON INSTAGRAM ↗
            </a>

          </motion.div>

        </section>

      </main>



      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="new-footer">


        {/* FOOTER BRAND */}

        <div className="footer-brand">

          <img
            src="/assets/trios-logo.jpg"
            alt="Trio's Kitchen"
          />

          <div>

            <h2>
              Trio's Kitchen
            </h2>

            <p>
              Teen Tigada, Zayka Bigada!
            </p>

          </div>

        </div>



        {/* FOOTER V-CARDS */}

        <div className="footer-vcards">

          <div className="footer-vcard-title">

            <span>
              📇
            </span>

            <div>

              <small>
                KEEP THESE DETAILS HANDY
              </small>

              <h3>
                CONTACT • CONNECT • CREATE
              </h3>

            </div>

          </div>



          <div className="footer-vcard-grid">

            {creators.map((person) => (

              <div
                className="footer-mini-card"
                key={person.name}
              >

                <div className="footer-card-images">

                  {person.cards.map((card) => (
                    <img
                      key={card.image}
                      src={card.image}
                      alt={`${person.name} ${card.label.toLowerCase()} card`}
                      loading="lazy"
                    />
                  ))}

                </div>


                <div>

                  <strong>
                    {person.name}
                  </strong>

                  <span>
                    {person.role}
                  </span>


                  <a
                    href={`tel:${person.phone.replace(/\D/g, '')}`}
                  >
                    ☎ {person.phone}
                  </a>


                  <span>
                    📍 {person.location}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>



        {/* FOOTER BOTTOM */}

        <div className="footer-bottom">

          <div className="footer-copy">
            <span>
              Made with food, fun & lots of love. ❤️
            </span>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              @trioss.__.kitchen09 ↗
            </a>
          </div>


          <div className="developer-credit">

            <span>
              Developed by <strong>Mohd Hassan</strong>
            </span>

            <a
              href="https://mohd-hassan-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
              aria-label="Visit Mohd Hassan's portfolio"
            >
              <span>Visit Portfolio</span>
              <span className="arrow-icon">↗</span>
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}


createRoot(
  document.getElementById('root')
).render(
  <App />
);