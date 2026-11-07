/*
 * Little Fern Coffee (showcase site)
 * Copyright (c) 2026 Miloš Milinkov. All rights reserved.
 * Proprietary and confidential. Use, copying, modification or distribution
 * without written permission is prohibited. See the LICENSE file.
 */

// The hours table in index.html is the single source of opening hours.
const HOUR_ROWS = [...document.querySelectorAll(".hours tr[data-days]")];
const HOURS = {}; // weekday (0 = Sunday) -> [open, close], bar's local time
for (const row of HOUR_ROWS) {
  for (const day of row.dataset.days.split(",")) {
    HOURS[day] = [Number(row.dataset.open), Number(row.dataset.close)];
  }
}
const TIME_ZONE = "Europe/Belgrade";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pad = (h) => `${String(h).padStart(2, "0")}:00`;

function localNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  return { day: WEEKDAYS.indexOf(get("weekday")), hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

function updateStatus({ day, hour }) {
  const el = document.querySelector("[data-status]");
  const text = document.querySelector("[data-status-text]");
  if (!el || !text) return;
  const [open, close] = HOURS[day];
  if (hour >= open && hour < close) {
    el.classList.add("is-open");
    text.textContent = `Open now, until ${pad(close)}`;
  } else if (hour < open) {
    el.classList.add("is-closed");
    text.textContent = `Closed now, opens today at ${pad(open)}`;
  } else {
    el.classList.add("is-closed");
    text.textContent = `Closed now, opens tomorrow at ${pad(HOURS[(day + 1) % 7][0])}`;
  }
}

function markToday({ day }) {
  for (const row of HOUR_ROWS) {
    if (row.dataset.days.split(",").map(Number).includes(day)) row.classList.add("is-today");
  }
}

function initTabs() {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    }
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const keys = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      const next = tabs[(keys[e.key] + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });
}

const now = localNow();
updateStatus(now);
markToday(now);
initTabs();
const year = String(new Date().getFullYear());
for (const el of document.querySelectorAll("[data-year]")) el.textContent = year;
