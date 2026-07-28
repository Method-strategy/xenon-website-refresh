// Central content + config for the Xenon Ophthalmics site.

export const IMAGES = {
  heroProduct: "https://images.unsplash.com/photo-1702471897393-47ec1ba1192b",
  clinic: "https://images.pexels.com/photos/5965843/pexels-photo-5965843.jpeg",
  lab: "https://images.pexels.com/photos/5752264/pexels-photo-5752264.jpeg",
  microscope: "https://images.pexels.com/photos/13949979/pexels-photo-13949979.jpeg",
  doctor1: "https://images.pexels.com/photos/28516278/pexels-photo-28516278.jpeg",
  doctor2: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg",
  professional: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
  abstract: "https://images.unsplash.com/photo-1672750771479-5ea73e9439ce",
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
    blurb:
      "Where the visit begins. xoIris automates booking and patient communication, predicts no-shows, and fills cancellations by reaching nearby patients already due for care.",
  },
  {
    key: "xoexam",
    name: "xoExam",
    role: "Exam",
    to: "/xoexam-eye-exam",
    logo: "/logos/xoexam-dark.svg",
    blurb:
      "A wearable, medical-grade eye exam platform bringing 19 doctor-led vision tests into a single device. Run by the patient, a technician, or the doctor. Certified by the doctor in every case.",
  },
  {
    key: "xofit",
    name: "xoFit",
    role: "Fit",
    to: "/xofit-frame-fitting",
    logo: "/logos/xofit-dark.svg",
    blurb:
      "Digital centration and frame measurement in three form factors: a wall-mounted station, a handheld unit, and a virtual try-on patients use themselves. Measurements pass straight to finishing.",
  },
  {
    key: "xolab",
    name: "xoLab",
    role: "Finish",
    to: "/xolab-eyewear-finishing",
    logo: "/logos/xolab-dark.svg",
    blurb:
      "Frame tracing, blocking, and edging in a compact in-office footprint. Finished eyewear on site, as fast as same day, with the margin that would otherwise leave with the lab bill.",
  },
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
  { name: "David Metzler, OD, MBA", title: "Advisor", linkedin: "#" },
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

export const PROFESSIONS = [
  "Optometrist (OD)",
  "Ophthalmologist (MD)",
  "Optician",
  "Practice Owner / Manager",
  "Buying Group / Network",
  "NGO / Access Program",
  "Investor",
  "Other",
];
