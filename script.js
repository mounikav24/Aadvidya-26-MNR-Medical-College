'use strict';

/*
 * AADVIDYA'26 website starter.
 * Before launch, replace the illustrative event data and connect official APIs.
 * Registration/feedback are front-end demos; no data is sent to a server.
 */

const FEST_CONFIG = {
  // Set the official local event start date/time when confirmed, e.g. '2026-12-01T09:00:00+05:30'.
  // Leave null until the organizers confirm the date; the countdown will show an announcement message.
  startDate: null,
  collegeName: 'MNR Medical College & Hospital',
  festName: 'AADVIDYA’26'
};

const EVENTS = [
  { id: 'd1-clinical', day: 1, period: 'Morning', start: '09:00', end: '10:30', timeLabel: '09:00 AM', category: 'Academic', title: 'Clinical Case Challenge', description: 'A collaborative case-based reasoning challenge.', location: 'Academic block · Venue to be confirmed' },
  { id: 'd1-quiz', day: 1, period: 'Morning', start: '10:45', end: '12:00', timeLabel: '10:45 AM', category: 'Academic', title: 'MedQuiz: Rapid Recall', description: 'A fast-paced medical knowledge quiz.', location: 'Main auditorium · Venue to be confirmed' },
  { id: 'd1-poster', day: 1, period: 'Afternoon', start: '13:00', end: '15:00', timeLabel: '01:00 PM', category: 'Academic', title: 'Research & Poster Forum', description: 'Share research questions, findings, and ideas.', location: 'Exhibition area · Venue to be confirmed' },
  { id: 'd1-arts', day: 1, period: 'Afternoon', start: '14:00', end: '16:00', timeLabel: '02:00 PM', category: 'Cultural', title: 'Creative Pulse Showcase', description: 'A stage for art, expression, and student creativity.', location: 'Cultural stage · Venue to be confirmed' },
  { id: 'd1-run', day: 1, period: 'Evening', start: '16:30', end: '17:30', timeLabel: '04:30 PM', category: 'Sports', title: 'Campus Wellness Run', description: 'Move together and celebrate everyday wellbeing.', location: 'Campus grounds · Route to be confirmed' },
  { id: 'd1-welcome', day: 1, period: 'Evening', start: '17:45', end: '18:30', timeLabel: '05:45 PM', category: 'Social', title: 'Welcome & Community Mixer', description: 'Meet participants, volunteers, and fellow students.', location: 'Main courtyard · Venue to be confirmed' },
  { id: 'd2-skill', day: 2, period: 'Morning', start: '09:00', end: '11:00', timeLabel: '09:00 AM', category: 'Academic', title: 'Clinical Skills Lab', description: 'A proposed hands-on learning and skills session.', location: 'Skills centre · Venue to be confirmed' },
  { id: 'd2-debate', day: 2, period: 'Morning', start: '11:15', end: '12:30', timeLabel: '11:15 AM', category: 'Academic', title: 'The Great Medical Debate', description: 'Explore contemporary questions in healthcare.', location: 'Seminar hall · Venue to be confirmed' },
  { id: 'd2-games', day: 2, period: 'Afternoon', start: '13:00', end: '15:30', timeLabel: '01:00 PM', category: 'Sports', title: 'Inter-College Sports Meet', description: 'Friendly competition, teamwork, and campus spirit.', location: 'Sports area · Details to be confirmed' },
  { id: 'd2-outreach', day: 2, period: 'Afternoon', start: '14:00', end: '16:00', timeLabel: '02:00 PM', category: 'Social', title: 'Community Care Initiative', description: 'A proposed service-focused community activity.', location: 'Location to be confirmed' },
  { id: 'd2-talent', day: 2, period: 'Evening', start: '17:00', end: '19:00', timeLabel: '05:00 PM', category: 'Cultural', title: 'Open Mic & Talent Night', description: 'Music, spoken word, and performances by students.', location: 'Cultural stage · Venue to be confirmed' },
  { id: 'd3-innovation', day: 3, period: 'Morning', start: '09:30', end: '11:30', timeLabel: '09:30 AM', category: 'Academic', title: 'Health Innovation Pitch', description: 'Present ideas to improve care, access, and outcomes.', location: 'Main auditorium · Venue to be confirmed' },
  { id: 'd3-challenge', day: 3, period: 'Afternoon', start: '12:00', end: '14:00', timeLabel: '12:00 PM', category: 'Academic', title: 'Inter-College Grand Challenge', description: 'A proposed team challenge bringing disciplines together.', location: 'Academic block · Venue to be confirmed' },
  { id: 'd3-finale', day: 3, period: 'Evening', start: '16:30', end: '18:30', timeLabel: '04:30 PM', category: 'Cultural', title: 'Celebration & Closing Night', description: 'Come together to recognise participation and achievements.', location: 'Main stage · Venue to be confirmed' },
  { id: 'd3-thanks', day: 3, period: 'Evening', start: '18:30', end: '19:00', timeLabel: '06:30 PM', category: 'Social', title: '25-Year Tribute & Farewell', description: 'A closing moment honouring the college community.', location: 'Main stage · Venue to be confirmed' }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let currentDay = 1;
let currentCategory = 'all';
let currentPeriod = 'all';
let latestRegistration = null;
let toastTimeout = null;

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.hidden = true; }, 3600);
}

function setupNavigation() {
  const toggle = $('#menuToggle');
  const nav = $('#primaryNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    nav.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen && window.innerWidth <= 800);
  });

  $$('.primary-nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('menu-open');
  }));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });

  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('.nav-link').forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(section => observer.observe(section));
  }
}

function setupCountdown() {
  const message = $('#countdownMessage');
  const values = $('#countdownValues');
  if (!FEST_CONFIG.startDate) {
    if (message) message.textContent = 'The fest date will be announced soon.';
    return;
  }
  const target = new Date(FEST_CONFIG.startDate).getTime();
  if (Number.isNaN(target)) {
    if (message) message.textContent = 'The fest date will be announced soon.';
    return;
  }
  let timer = null;
  const update = () => {
    const remaining = target - Date.now();
    if (remaining <= 0) {
      if (message) message.textContent = 'The AADVIDYA’26 celebration is here!';
      if (values) values.innerHTML = '<div><strong>00</strong><small>DAYS</small></div><i>:</i><div><strong>00</strong><small>HRS</small></div><i>:</i><div><strong>00</strong><small>MINS</small></div><i>:</i><div><strong>00</strong><small>SECS</small></div>';
      clearInterval(timer);
      return;
    }
    const parts = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining % 86400000) / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000),
      seconds: Math.floor((remaining % 60000) / 1000)
    };
    if (values) values.innerHTML = `<div><strong>${String(parts.days).padStart(2, '0')}</strong><small>DAYS</small></div><i>:</i><div><strong>${String(parts.hours).padStart(2, '0')}</strong><small>HRS</small></div><i>:</i><div><strong>${String(parts.minutes).padStart(2, '0')}</strong><small>MINS</small></div><i>:</i><div><strong>${String(parts.seconds).padStart(2, '0')}</strong><small>SECS</small></div>`;
    if (message) message.textContent = 'Time until the opening of AADVIDYA’26.';
  };
  update();
  timer = setInterval(update, 1000);
}

function categoryClass(category) {
  return `category-${category.toLowerCase()}`;
}

function renderEvents() {
  const list = $('#eventList');
  if (!list) return;
  const filtered = EVENTS.filter(event => event.day === currentDay &&
    (currentCategory === 'all' || event.category === currentCategory) &&
    (currentPeriod === 'all' || event.period === currentPeriod));

  if (!filtered.length) {
    list.innerHTML = '<div class="events-empty">No events match these filters. Try another category or time of day.</div>';
    return;
  }

  list.innerHTML = filtered.map((event, index) => `
    <article class="event-row" style="animation-delay:${Math.min(index * 45, 220)}ms">
      <div class="event-time"><strong>${event.timeLabel}</strong><small>${event.period}</small></div>
      <div class="event-details"><span class="event-category ${categoryClass(event.category)}">${event.category}</span><h3>${event.title}</h3><p>${event.description} · ${event.location}</p></div>
      <div class="event-action"><span class="event-day-tag">DAY 0${event.day}</span><button class="add-calendar-btn" type="button" data-event-id="${event.id}">＋ Calendar</button></div>
    </article>`).join('');

  $$('.add-calendar-btn', list).forEach(button => {
    button.addEventListener('click', () => {
      const event = EVENTS.find(item => item.id === button.dataset.eventId);
      if (event) downloadCalendar([event]);
    });
  });
}

function setupEventFilters() {
  $$('.day-tab').forEach(button => button.addEventListener('click', () => {
    currentDay = Number(button.dataset.day);
    $$('.day-tab').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    renderEvents();
  }));
  $$('.filter-chip').forEach(button => button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    $$('.filter-chip').forEach(chip => {
      const active = chip === button;
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
    renderEvents();
  }));
  $$('.period-btn').forEach(button => button.addEventListener('click', () => {
    currentPeriod = button.dataset.period;
    $$('.period-btn').forEach(period => {
      const active = period === button;
      period.classList.toggle('active', active);
      period.setAttribute('aria-pressed', String(active));
    });
    renderEvents();
  }));
  $('#downloadAllCalendar')?.addEventListener('click', () => downloadCalendar(EVENTS));
}

function escapeIcsText(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function eventDateForIcs(day, hhmm) {
  if (!FEST_CONFIG.startDate) return null;
  const base = new Date(FEST_CONFIG.startDate);
  if (Number.isNaN(base.getTime())) return null;
  const date = new Date(base);
  date.setDate(base.getDate() + day - 1);
  const [hours, minutes] = hhmm.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

function downloadCalendar(events) {
  if (!FEST_CONFIG.startDate) {
    showToast('Calendar downloads will be enabled after the official fest dates are confirmed.');
    return;
  }
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AADVIDYA26//Event Schedule//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  events.forEach((event, index) => {
    const start = eventDateForIcs(event.day, event.start);
    const end = eventDateForIcs(event.day, event.end);
    if (!start || !end) return;
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.id}-${index}@aadvidya26.local`);
    lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`);
    lines.push(`DTSTART:${start}`);
    lines.push(`DTEND:${end}`);
    lines.push(`SUMMARY:${escapeIcsText(event.title)}`);
    lines.push(`DESCRIPTION:${escapeIcsText(`${event.category}: ${event.description} This is an illustrative schedule; confirm official details.`)}`);
    lines.push(`LOCATION:${escapeIcsText(event.location)}`);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  downloadBlob(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }), 'aadvidya26-schedule.ics');
  showToast('Calendar file downloaded. Please verify the sample event details.');
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function setupRegistration() {
  const form = $('#registrationForm');
  const result = $('#registrationResult');
  const type = $('#registrationType');
  const teamFields = $('#teamFields');
  const teamName = $('#teamName');
  const formError = $('#formError');
  if (!form || !result) return;

  const updateType = () => {
    const team = type.value === 'team';
    teamFields.hidden = !team;
    teamName.required = team;
  };
  type.addEventListener('change', updateType);
  updateType();

  form.addEventListener('submit', event => {
    event.preventDefault();
    formError.hidden = true;
    if (!form.checkValidity()) {
      form.reportValidity();
      formError.textContent = 'Please complete all required fields with valid information.';
      formError.hidden = false;
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
    const id = `AAD26-${new Date().getFullYear()}-${suffix}`;
    latestRegistration = { ...data, registrationId: id, createdAt: new Date().toLocaleString(), demo: true };
    $('#registrationId').textContent = id;
    form.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });

  $('#downloadConfirmation')?.addEventListener('click', () => {
    if (!latestRegistration) return;
    const info = [
      'AADVIDYA’26 — LOCAL PREVIEW CONFIRMATION',
      'MNR Medical College & Hospital',
      '25 Years of Excellence | Where Medicine Meets Innovation',
      '',
      `Registration ID: ${latestRegistration.registrationId}`,
      `Registration type: ${latestRegistration.registrationType}`,
      `Name: ${latestRegistration.fullName}`,
      `Email: ${latestRegistration.email}`,
      `Phone: ${latestRegistration.phone}`,
      `College / institution: ${latestRegistration.institution}`,
      `Area of interest: ${latestRegistration.interest}`,
      ...(latestRegistration.registrationType === 'team' ? [`Team name: ${latestRegistration.teamName}`, `Team size: ${latestRegistration.teamSize}`] : []),
      `Generated locally: ${latestRegistration.createdAt}`,
      '',
      'IMPORTANT: This is a front-end demo confirmation only. It is not an official registration, has not been sent to the organizers, and does not confirm payment or event entry.',
      'Official fest dates, venue, fees, and payment instructions are to be confirmed.'
    ];
    downloadBlob(new Blob([info.join('\r\n')], { type: 'text/plain;charset=utf-8' }), `${latestRegistration.registrationId}-confirmation.txt`);
  });

  $('#registerAnother')?.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    result.hidden = true;
    formError.hidden = true;
    updateType();
    form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
}

function setupFeedback() {
  const form = $('#feedbackForm');
  const anonymous = $('#anonymousFeedback');
  const identity = $('#feedbackIdentity');
  const nameInput = $('[name="feedbackName"]');
  const error = $('#feedbackError');
  const success = $('#feedbackSuccess');
  if (!form || !anonymous) return;

  anonymous.addEventListener('change', () => {
    identity.hidden = anonymous.checked;
    if (nameInput) nameInput.value = '';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    error.hidden = true;
    success.hidden = true;
    if (!form.checkValidity()) {
      form.reportValidity();
      error.textContent = 'Please choose a rating before submitting.';
      error.hidden = false;
      return;
    }
    // Intentionally do not persist or transmit feedback in this starter.
    success.hidden = false;
    form.reset();
    identity.hidden = false;
    success.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });
}

function setupFooter() {
  const year = $('#currentYear');
  if (year) year.textContent = String(new Date().getFullYear());
  $('#privacyLink')?.addEventListener('click', event => {
    event.preventDefault();
    showToast('Add the college-approved privacy policy and terms before launch.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupCountdown();
  setupEventFilters();
  renderEvents();
  setupRegistration();
  setupFeedback();
  setupFooter();
});
