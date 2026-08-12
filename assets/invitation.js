const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const arena = document.querySelector("#button-arena");
const inviteCard = document.querySelector("#invite-card");
const successCard = document.querySelector("#success-card");
const alternateCard = document.querySelector("#alternate-card");
const hint = document.querySelector("#hint");
const calendarButton = document.querySelector("#calendar-button");
const shareButton = document.querySelector("#share-button");
const alternateShare = document.querySelector("#alternate-share");

const dodges = [
  "Hmm… try that again 😇",
  "The button has other plans.",
  "Are you absolutely, positively sure?",
  "Okay okay — you can say ‘another time’ 💛",
];

let dodgeCount = 0;
let noIsAvailable = false;
let ignoreNextNoClick = false;

function moveNoButton() {
  if (noIsAvailable) return;

  dodgeCount += 1;
  const maxX = Math.max(0, arena.clientWidth - noButton.offsetWidth - 8);
  const maxY = Math.max(0, arena.clientHeight - noButton.offsetHeight - 8);
  const x = Math.max(4, Math.random() * maxX);
  const y = Math.max(4, Math.random() * maxY);

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  yesButton.style.setProperty("--yes-scale", Math.min(1 + dodgeCount * 0.1, 1.36));
  hint.textContent = dodges[Math.min(dodgeCount - 1, dodges.length - 1)];

  if (dodgeCount >= dodges.length) {
    noIsAvailable = true;
    noButton.textContent = "Another time?";
    noButton.setAttribute("aria-label", "No, suggest another time");
  }
}

function showCard(card) {
  inviteCard.hidden = true;
  card.hidden = false;
}

function celebrate() {
  const colors = ["#ee6b62", "#ffd970", "#1f7a65", "#f8c7c1", "#ffffff"];
  const container = document.querySelector("#confetti");

  for (let index = 0; index < 70; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.setProperty("--fall-time", `${2.4 + Math.random() * 2}s`);
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    container.append(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function whatsappReply(message) {
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function downloadCalendar() {
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//For Sainaa//Table Tennis Date//EN",
    "BEGIN:VEVENT",
    "UID:table-tennis-20260814@sainaa",
    "DTSTAMP:20260812T000000Z",
    "DTSTART;TZID=Australia/Sydney:20260814T190000",
    "DTEND;TZID=Australia/Sydney:20260814T203000",
    "SUMMARY:Table tennis date 🏓",
    "DESCRIPTION:You, me, and a very competitive little ping-pong ball.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const file = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "table-tennis-date.ics";
  link.click();
  URL.revokeObjectURL(url);
}

noButton.addEventListener("pointerdown", (event) => {
  if (!noIsAvailable) {
    event.preventDefault();
    moveNoButton();
    if (noIsAvailable) ignoreNextNoClick = true;
  }
});

noButton.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse" && !noIsAvailable) moveNoButton();
});

noButton.addEventListener("click", () => {
  if (ignoreNextNoClick) {
    ignoreNextNoClick = false;
    return;
  }
  if (noIsAvailable) showCard(alternateCard);
});

yesButton.addEventListener("click", () => {
  showCard(successCard);
  celebrate();
});

calendarButton.addEventListener("click", downloadCalendar);
shareButton.addEventListener("click", () => whatsappReply("YES! 🏓 Friday at 7pm is a date ❤️"));
alternateShare.addEventListener("click", () => whatsappReply("Table tennis sounds cute, but can we pick another time? 💛"));
