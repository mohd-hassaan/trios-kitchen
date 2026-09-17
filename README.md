# Trio's Kitchen — Exhibition Landing Page

A mobile-first React + Vite landing page inspired by the supplied Trio's Kitchen pamphlet.

## Included
- Animated hero and food cards using Framer Motion
- Hinglish copy and brand colours
- Exhibition countdown to 19 September 2026, 3 PM IST
- Guest registration: name + coming checkbox
- Unique 10% coupon generated in the browser
- Registration saved locally in `localStorage`
- WhatsApp pre-filled registration to 9026404879
- Royal Castle Google Maps button
- Instagram button
- Responsive mobile/desktop layout

## Run
```bash
npm install
npm run dev
```

## Important production note
The current version stores registrations in the visitor's browser via localStorage. For a shared, permanent guest database and true server-side coupon uniqueness, connect the submit handler to Supabase/Firebase or your own API. The UI is already structured for that integration.

For automatic WhatsApp delivery without the visitor pressing Send, use an approved WhatsApp Business/Cloud API flow. The included version opens WhatsApp with a pre-filled message.
