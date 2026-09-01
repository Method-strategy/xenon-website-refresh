// Central content + config for the Xenon Ophthalmics site.

// All decorative background photos are served directly from Unsplash/Pexels
// at their original (multi-megabyte) full resolution when linked bare, even
// though every usage renders them small and at low opacity. Appending each
// provider's own resize/format params (auto=format on Unsplash serves
// WebP/AVIF automatically per the browser's Accept header; auto=compress on
// Pexels does the same) caps them at a sane width and cuts payload
// dramatically with no visible quality loss at the sizes these are shown.
export const IMAGES = {
  heroProduct: "https://images.unsplash.com/photo-1702471897393-47ec1ba1192b?auto=format&fit=crop&w=1600&q=70",
  clinic: "/photos/proof-community-eyecare.webp",
  lab: "https://images.pexels.com/photos/5752264/pexels-photo-5752264.jpeg?auto=compress&cs=tinysrgb&w=1600",
  microscope: "https://images.pexels.com/photos/13949979/pexels-photo-13949979.jpeg?auto=compress&cs=tinysrgb&w=1600",
  doctor1: "https://images.pexels.com/photos/28516278/pexels-photo-28516278.jpeg?auto=compress&cs=tinysrgb&w=1200",
  doctor2: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=1200",
  professional: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=70",
  abstract: "https://images.unsplash.com/photo-1672750771479-5ea73e9439ce?auto=format&fit=crop&w=1600&q=70",
};

export const NAV = [
  {
    label: "XO Vision Care System",
    children: [
      { label: "Overview", sub: "The system", to: "/xo-vision-care-system" },
      { label: "xoIris", sub: "Schedule", to: "/xoiris-scheduling" },
      { label: "xoExam", sub: "Exam", to: "/xoexam-eye-exam" },
      { label: "xoFit", sub: "Fit", to: "/xofit-frame-fitting" },
      { label: "xoLab", sub: "Finish", to: "/xolab-eyewear-finishing" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About", sub: "Our mission", to: "/about" },
      { label: "Team", sub: "The people", to: "/team" },
      { label: "Blog", sub: "Analysis & insight", to: "/blog" },
      { label: "News", sub: "Company news", to: "/news" },
    ],
  },
  { label: "Contact", to: "/contact" },
  { label: "User Login", to: "https://xoexam-uiux.netlify.app/", external: true },
];

export const PRODUCTS = [
  {
    key: "xoiris",
    name: "xoIris",
    role: "Schedule",
    to: "/xoiris-scheduling",
    logo: "/logos/xoiris-dark.svg",
    logoWidth: 104,
    logoHeight: 25,
    blurb:
      "The visit starts at booking. xoIris handles scheduling, reminders, and recall, predicts no-shows, and fills a cancellation by reaching patients nearby who are already due. The day starts full instead of catching up.",
  },
  {
    key: "xoexam",
    name: "xoExam",
    role: "Exam",
    to: "/xoexam-eye-exam",
    logo: "/logos/xoexam-dark.svg",
    logoWidth: 154,
    logoHeight: 24,
    blurb:
      "Refraction and functional testing in one wearable device, replacing a lane assembled from separate instruments. Objective and subjective refraction run in the same workflow. Run it with the patient, a technician, or the ECP. Every result is reviewed and confirmed before it moves.",
  },
  {
    key: "xofit",
    name: "xoFit",
    role: "Fit",
    to: "/xofit-frame-fitting",
    logo: "/logos/xofit-dark.svg",
    logoWidth: 102,
    logoHeight: 25,
    blurb:
      "The optician opens xoFit and the prescription is already loaded. Digital centration and frame measurement in three form factors: a wall-mounted station, a handheld unit, and a virtual try-on patients use themselves.",
  },
  {
    key: "xolab",
    name: "xoLab",
    role: "Finish",
    to: "/xolab-eyewear-finishing",
    logo: "/logos/xolab-dark.svg",
    logoWidth: 119,
    logoHeight: 24,
    blurb:
      "Frame tracing, blocking, and edging in a footprint sized for a practice. The lab specification is written the moment the sale closes. Finished eyewear on site, as fast as same day, with the margin that would otherwise leave with the lab bill.",
  },
];

// The "Six Outcomes" framework, from the Xenon Practice Optimization Selling
// System (sales methodology doc). This is the sales team's proven value
// language for what the XO Vision Care System delivers to a practice. Keys
// are referenced by product steps on the System overview page to link
// features directly to the outcome(s) they drive. Do not edit wording
// without checking against the source sales document first.
export const SIX_OUTCOMES = [
  { key: "time", title: "Time", body: "Hours back in the day. Less spent on handoffs and documentation, more spent on patients." },
  { key: "profitability", title: "Profitability", body: "More done with what you already own. Throughput rises without operating cost rising to match." },
  { key: "control", title: "Control", body: "Less dependence on perfect staffing, an open room, and everything going to plan." },
  { key: "patient-experience", title: "Patient Experience", body: "A visit that moves. Less waiting, fewer repeated questions, a clear path from exam to eyewear." },
  { key: "clinical-quality", title: "Clinical Quality", body: "The same standard every time. Consistent capture, consistent documentation, consistent handoff." },
  { key: "practice-growth", title: "Practice Growth", body: "Room to grow without building. Capacity expands ahead of overhead instead of behind it." },
];

export const TEAM_BOARD = [
  { name: "Zeshan A. Khan", title: "Founder & CEO", linkedin: "#", email: "#" },
  { name: "Dr. Robert Gilligan, OD", title: "Co-Founder, Medical Relations · Board of Directors", linkedin: "#", email: "#" },
  { name: "Steve Susanibar", title: "Co-Founder, Product Director", linkedin: "#", email: "#" },
  { name: "Dr. Bruce Stark, MD", title: "Advisor", linkedin: "#", email: "#" },
  { name: "David Singelyn", title: "Board of Directors", linkedin: "#" },
];

export const TEAM_ADVISORY = [
  { name: "Dr. Vivek Goyal, OD", title: "Assistant Medical Officer", linkedin: "#", email: "#" },
  { name: "Grayson Armstrong, MD, MPH", title: "Advisor", linkedin: "#" },
  { name: "Neeraj Bindal, OD", title: "Advisor", linkedin: "#" },
  { name: "Brian Jeffries", title: "Interim Chief Operating Officer", linkedin: "#", email: "#" },
  { name: "Gordon Epstein, OD", title: "Advisor", linkedin: "#" },
  { name: "Glenn S. Corbin, OD", title: "Advisor", linkedin: "#" },
  { name: "Nita Gala, OD", title: "Advisor", linkedin: "#" },
  { name: "David Meltzer, OD, MBA", title: "Advisor", linkedin: "#" },
  { name: "Kyle Hoedebecke, MD, MBA", title: "Advisor", linkedin: "#" },
  { name: "Gary Hopkins", title: "Marketing Strategist", linkedin: "#" },
  { name: "Mathew Gilligan, MBA", title: "Media Relations", linkedin: "#" },
];

// Editorial / analysis / insight — long-form pieces. Lives on /blog.
export const BLOG = [
  {
    slug: "space-race-orbit-of-access",
    title: "The New Space Race: Why eye care is the next frontier of access.",
    dek: "Opening the series. The delivery model, not the science, is what keeps care from reaching most of the world.",
    category: "Analysis",
    series: "The New Space Race",
    seriesLabel: "Part 1 of 5",
    date: "2026-07-02",
    readTime: "7 min",
  },
  {
    slug: "space-race-workforce-concentration",
    title: "Six countries, half the world's ophthalmologists.",
    dek: "A look at how the global eye care workforce concentrated, and what it means for everyone outside the cluster.",
    category: "Analysis",
    series: "The New Space Race",
    seriesLabel: "Part 2 of 5",
    date: "2026-07-08",
    readTime: "6 min",
  },
  {
    slug: "space-race-perishable-capacity",
    title: "Appointment time is perishable. So is opportunity.",
    dek: "No-shows, recall, and the economics of the empty slot in modern optometric practice.",
    category: "Analysis",
    series: "The New Space Race",
    seriesLabel: "Part 3 of 5",
    date: "2026-07-14",
    readTime: "6 min",
  },
  {
    slug: "space-race-lane-without-a-building",
    title: "The exam lane, without the building.",
    dek: "What changes about who can be served when a doctor-led exam no longer requires a fixed room.",
    category: "Analysis",
    series: "The New Space Race",
    seriesLabel: "Part 4 of 5",
    date: "2026-07-19",
    readTime: "8 min",
  },
  {
    slug: "space-race-margin-at-the-finish",
    title: "The last step is where the margin goes.",
    dek: "In-office finishing and the unit economics of keeping the job inside the building.",
    category: "Analysis",
    series: "The New Space Race",
    seriesLabel: "Part 5 of 5",
    date: "2026-07-24",
    readTime: "7 min",
  },
];

// Company news, press releases, program launches. Lives on /news.
export const NEWS = [
  {
    slug: "mandela-childrens-hospital",
    title: "Xenon and EyeCare4Kids introduce the XO System at Nelson Mandela Children's Hospital.",
    dek: "In July 2026, the XO Vision Care System reached children in South Africa the traditional model had not.",
    category: "Company news",
    date: "2026-07-15",
    readTime: "4 min",
  },
];

// Values must match the "Profession" dropdown property exactly as configured on the
// live HubSpot form (portal 245698072 / form cf605cae-ee6b-4a84-9783-ae35dd05bae2).
// Do not change without checking the HubSpot form definition first.
export const PROFESSIONS = [
  "Optometrist",
  "Ophthalmologist",
  "Eye Care Professional",
  "Academic Clinic",
  "Mass Retailer",
  "NGO",
  "Other",
];

// Values must match the "Company Size" dropdown property exactly as configured on the
// same HubSpot form. Do not change without checking the HubSpot form definition first.
export const COMPANY_SIZES = [
  "1-10 Employees",
  "11-25 Employees",
  "26-50 Employees",
  "50+ Employees",
];
