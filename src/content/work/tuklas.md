---
caseNumber: "010"
title: "Tuklas: Camera Field Guide for Android and iOS"
shortTitle: "Tuklas"
summary: "Flutter field guide that turns a phone camera into a way to identify plants, animals and everyday objects, then keeps every scan in a local discovery journal."
metaDescription: "Flutter case study: a camera field guide with photo validation, a discovery journal, collections, narration and an honest demo mode when no backend is set."
category: "Mobile"
sector: "Nature and learning"
role: "Mobile developer, camera pipeline through interface and backend contract"
businessProblem: "Curiosity about a plant, an insect or a street food does not survive a search session. Identification tools often answer with a confident species name and no sense of how sure they are, and the answer disappears the moment the screen closes."
solution: "Tuklas photographs the subject, checks the photo before it leaves the phone, and asks an identification service through a server-side function that holds the provider keys. The result is a discovery card with names, classification, local context, facts and safety notes. Every scan is saved to a journal on the device, and unique subjects group into a collection."
ownership:
  - "Camera capture with tap-to-focus, flash, camera switch and gallery import"
  - "Photo validation before upload: file type, size, orientation, resizing and blur detection"
  - "Discovery card, journal and collection screens with search, filters and notes"
  - "Riverpod state layer and go_router navigation across the app"
  - "Supabase Edge Function contract that keeps provider keys off the device"
  - "Narration through the platform text-to-speech voices, English with Filipino where installed"
architecture:
  - decision: "Identification runs in a server-side Edge Function, never in the app"
    rationale: "A mobile bundle can be unpacked. Provider keys stay on the server, so a shipped build carries nothing worth extracting."
  - decision: "Photos are checked on the device before upload"
    rationale: "Type, size, orientation and blur checks reject a bad frame in under a second, instead of spending a network round trip and a paid request on a photo nothing could identify."
  - decision: "Uncertainty is a first-class result"
    rationale: "A guess dressed as a fact is worse than no answer. Low-confidence results show possible matches and retake advice rather than a single confident name."
  - decision: "Demo mode is labelled on every screen it touches"
    rationale: "A build with no backend configured cannot analyse a photo. It offers labelled sample discoveries instead, never presents the user's own photo as the subject, and never saves that photo with a sample."
  - decision: "Journal and photos stay on the device"
    rationale: "The first release has no account. Keeping personal records local means there is no server copy to protect, and sync can arrive later as an explicit choice."
technologies:
  - "Flutter"
  - "Dart"
  - "Riverpod"
  - "go_router"
  - "Supabase"
capabilities:
  - "Camera capture pipeline"
  - "On-device photo validation"
  - "Offline discovery journal"
  - "Text-to-speech narration"
  - "Light and dark theming"
screenshot: "../../assets/projects/tuklas.png"
screenshotAlt: "Three Tuklas phone screens: the Explore home, a discovery card for sampaguita and the onboarding screen."
liveUrl: null
repositoryUrl: null
repositoryVisibility: "private"
status: "In development"
featured: false
order: 3
lastVerified: 2026-10-16
---

The question is always the same shape. What is this plant, this bird, this insect on the
wall. Tuklas answers it with the camera already in hand, and then keeps the answer.

### The phone filters before the server pays

A blurred frame, a sideways photo or a file too large to send is caught on the device.
The checks run before upload, so a photo that nothing could identify never costs a
request.

### The keys never ship

Identification goes through a Supabase Edge Function that holds the provider
credentials. The app sends a photo and receives a result. Nothing in the installed
bundle is worth extracting.

### An unsure answer says so

Results carry their confidence. When the match is weak, the card shows possible matches
and advice on retaking the photo rather than one confident species name. A field guide
that guesses loses the trust it needs.

### Demo mode tells the truth about itself

Built without backend settings, the app runs on five labelled sample discoveries. The
label follows the sample onto every screen, the user's own photo is never presented as
the subject, and a saved sample never keeps that photo.

### Evidence in the build

A camera pipeline with real validation, a state and navigation layer that holds a
multi-screen app together, a backend boundary drawn so that secrets stay server-side,
and honest states for uncertainty and for a missing backend. The identification function
is written but not yet deployed, so live identification is not claimed here.
