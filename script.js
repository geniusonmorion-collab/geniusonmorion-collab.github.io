const cases = [
  {
    title: "Ювелирцентр",
    subtitle: "Мобильное приложение",
    year: "2026",
    video: "./assets/cases/uvelircentr-cover.mp4?v=hq-source",
    poster: "./assets/cases/uvelircentr-poster.jpg?v=hq-source",
    href: "./cases/uvelircentr/index.html?v=square-content-grid",
    accent: "#d4b26a",
    alt: "Видео-обложка кейса Ювелирцентр с мобильными экранами ювелирного приложения",
    tint: "a",
    category: "Product Design",
    caption: "Mobile app for a jewelry retail chain",
    description:
      "Mobile app for a jewelry retail chain: catalogue, product card, navigation, sale mechanics and a quick path to purchase.",
  },
  {
    title: "VK Музыка",
    subtitle: "Итоги года",
    year: "2026",
    image: "./assets/cases/original/vk-music-figma-350-7410.png",
    sourceCover: true,
    showMeta: true,
    alt: "Обложка VK Музыки с подарочной лошадкой",
    tint: "source",
    category: "Product Design",
    caption: "Personalized music experience",
    description:
      "A personalized music experience built around listening history, artist affinity and shareable year-in-review moments.",
  },
  {
    title: "Сбер Девайсы",
    subtitle: "Мобильное приложение",
    year: "2026",
    image: "./assets/cases/original/sber-devices-figma-350-7478.png",
    sourceCover: true,
    showMeta: true,
    href: "./cases/sber/index.html?v=sber-synced-start",
    accent: "#68dfbd",
    alt: "Обложка Сбер Девайсов с интерфейсом умного дома",
    tint: "source",
    category: "Product Design",
    caption: "Smart home interface concept",
    description:
      "Product interface concept for a smart device ecosystem, connecting home scenarios, device control and assistant-driven routines.",
  },
  {
    title: "KERN®",
    subtitle: "Promo site (Awwwards HM)",
    year: "2025",
    video: "./assets/cases/kern/kern-cover-0721-4.mp4",
    poster: "./assets/cases/kern/kern-cover-0721-4-poster.jpg",
    startAt: 3,
    href: "https://kern.taptop.site/",
    external: true,
    wide: true,
    alt: "Видеообложка промосайта KERN",
    tint: "b",
    category: "Web Design, 3D Design",
    caption: "Promo site · Awwwards HM",
    description:
      "Brand concept, 3D ski model, art direction, website design and production. Seven international awards, including Awwwards Honorable Mention.",
  },
  {
    title: "Долями",
    subtitle: "Мобильное приложение",
    year: "2026",
    image: "./assets/cases/original/dolyami-phone.png",
    device: true,
    sourceCover: true,
    showMeta: true,
    href: "./cases/dolyami/index.html?v=dolyami-hero-hq",
    accent: "#e51d26",
    alt: "Обложка кейса Долями с интерфейсом оплаты частями",
    tint: "source",
    category: "Product Design",
    caption: "Mobile payment flow for installments",
    description:
      "Checkout and installment-flow research: reframing payment by parts as budget control rather than a credit-like experience.",
  },
  {
    title: "The Act",
    subtitle: "Мобильное приложение",
    year: "2026",
    image: "./assets/cases/original/the-act.png",
    sourceCover: true,
    showMeta: true,
    alt: "Обложка проекта The Act с интерфейсом AI-ассистента",
    tint: "source",
    category: "Product Design",
    caption: "AI beauty assistant and commerce experience",
    description:
      "An AI-assisted beauty experience combining conversational guidance, product discovery and personalized recommendations.",
  },
];

const gallery = document.querySelector("#gallery");
const viewButtons = document.querySelectorAll(".view-switch__button");
const viewPanels = document.querySelectorAll(".view-panel");
const viewer = document.querySelector("#viewer");
const viewerStage = viewer.querySelector(".viewer__stage");
const viewerCount = viewer.querySelector(".viewer__count");
const viewerTitle = viewer.querySelector(".viewer__title");
const closeButton = viewer.querySelector(".viewer__close");
const previousButton = viewer.querySelector(".viewer__nav--prev");
const nextButton = viewer.querySelector(".viewer__nav--next");
const caseSheet = document.querySelector("#caseSheet");
let caseSheetSurface = caseSheet.querySelector(".case-sheet__surface");
let caseSheetFrame = caseSheet.querySelector(".case-sheet__frame");
const caseSheetClose = caseSheet.querySelector(".case-sheet__close");
const caseSheetNext = caseSheet.querySelector(".case-sheet__next");
const caseSheetNextButton = caseSheet.querySelector(".case-sheet__next-button");
const caseSheetNextTitle = caseSheet.querySelector(".case-sheet__next-title");
let caseSheetNextPreview = caseSheet.querySelector(".case-sheet__next-preview");
let caseSheetNextPreviewCard = caseSheet.querySelector(".case-sheet__next-preview-card");
let caseSheetNextPreviewFrame = caseSheet.querySelector(".case-sheet__next-preview-frame");
let caseSheetNextPreviewButton = caseSheet.querySelector(".case-sheet__next-preview-button");
const caseSheetBackLabel = caseSheet.querySelector(".case-sheet__all-projects span");
let activeIndex = 0;
let wheelLock = false;
let touchStartY = 0;
let caseSheetIndex = 0;
let caseSheetClearTimer = 0;
let caseSheetSwitchTimer = 0;
let caseSheetLoadToken = 0;
let caseSheetPendingSurface = null;
let caseSheetPendingFrame = null;
let caseSheetOverscroll = 0;
let caseSheetOverscrollVisual = 0;
let caseSheetOverscrollVelocity = 0;
let caseSheetOverscrollFrame = 0;
let caseSheetOverscrollEnabledAt = Number.POSITIVE_INFINITY;
let caseSheetOverscrollResetTimer = 0;
let caseSheetOverscrollCloseTimer = 0;
let caseSheetEndReturnTimer = 0;
let caseSheetWasEnding = false;
let caseSheetModalScale = 0.9625;
let caseSheetNextOverscroll = 0;
let caseSheetNextOverscrollVisual = 0;
let caseSheetNextOverscrollVelocity = 0;
let caseSheetNextOverscrollFrame = 0;
let caseSheetNextOverscrollResetTimer = 0;
let caseSheetHistory = [];
const caseSheetOverscrollDistance = 160;
const caseSheetNextOverscrollDistance = 80;
const caseSheetOverscrollStiffness = 1500;
const caseSheetOverscrollDamping = 200;
let caseSheetSettleTimer = 0;
let caseSheetMotionFrame = 0;
let caseSheetScrolled = false;
let caseSheetEndingState = false;
let caseSheetOriginBottom = false;
const caseSheetMotion = {
  y: { value: 0, from: 0, target: 0, start: 0, duration: 0 },
  s: { value: 0.9625, from: 0.9625, target: 0.9625, start: 0, duration: 0 },
  ps: { value: 0.86625, from: 0.86625, target: 0.86625, start: 0, duration: 0 },
};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const synchronizedPlaybackRequests = new WeakMap();

function pad(value) {
  return String(value).padStart(2, "0");
}

function layeredSberMedia(item, large = false) {
  return `
    <div class="sber-cover-media" role="img" aria-label="${item.alt}">
      <video class="sber-cover-media__background" src="${item.backgroundVideo}" poster="${item.backgroundPoster}" preload="auto" data-autoplay="true" muted loop playsinline aria-hidden="true"></video>
      <div class="sber-cover-media__stage" aria-hidden="true">
        <video class="sber-cover-media__interface" src="${item.video}" poster="${item.poster}" preload="auto" data-autoplay="true" muted loop playsinline></video>
      </div>
    </div>
  `;
}

function waitUntilPlayable(video) {
  if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    video.addEventListener("canplay", resolve, { once: true });
  });
}

function syncSberMediaGroup(group) {
  const videos = [...group.querySelectorAll("video[data-autoplay='true']")];
  if (!videos.length) return;

  const request = (synchronizedPlaybackRequests.get(group) || 0) + 1;
  synchronizedPlaybackRequests.set(group, request);
  videos.forEach((video) => video.pause());

  if (reducedMotion.matches || document.hidden) {
    if (reducedMotion.matches) {
      videos.forEach((video) => {
        video.currentTime = 0;
      });
    }
    return;
  }

  Promise.all(videos.map(waitUntilPlayable)).then(() => {
    if (synchronizedPlaybackRequests.get(group) !== request) return;
    if (reducedMotion.matches || document.hidden) return;

    videos.forEach((video) => {
      video.currentTime = 0;
    });

    requestAnimationFrame(() => {
      videos.forEach((video) => video.play().catch(() => {}));
    });
  });
}

function syncAutoplayVideos(root = document) {
  root.querySelectorAll("video[data-start-at]").forEach(configureVideoStart);
  root.querySelectorAll(".sber-cover-media").forEach(syncSberMediaGroup);

  root.querySelectorAll("video[data-autoplay='true']").forEach((video) => {
    if (video.closest(".sber-cover-media")) return;

    if (reducedMotion.matches || document.hidden) {
      video.pause();
      if (reducedMotion.matches) video.currentTime = 0;
      return;
    }

    video.play().catch(() => {});
  });
}

function configureVideoStart(video) {
  const startAt = Number(video.dataset.startAt);
  if (!Number.isFinite(startAt) || startAt <= 0) return;

  const seekToStart = () => {
    const latestSafeStart = Number.isFinite(video.duration)
      ? Math.max(0, video.duration - 0.1)
      : startAt;
    video.currentTime = Math.min(startAt, latestSafeStart);
  };

  if (video.dataset.startAtConfigured !== "true") {
    video.dataset.startAtConfigured = "true";
    video.loop = false;
    video.addEventListener("loadedmetadata", () => {
      if (video.currentTime < startAt) seekToStart();
    });
    video.addEventListener("ended", () => {
      seekToStart();
      if (!reducedMotion.matches && !document.hidden) {
        video.play().catch(() => {});
      }
    });
  }

  if (video.readyState >= HTMLMediaElement.HAVE_METADATA && video.currentTime < startAt) {
    seekToStart();
  }
}

function coverMarkup(item, large = false) {
  const media = item.backgroundVideo
    ? layeredSberMedia(item, large)
    : item.video
    ? `<video src="${item.video}" poster="${item.poster}" aria-label="${item.alt}" preload="${large ? "auto" : "metadata"}" autoplay data-autoplay="true" muted${item.startAt ? "" : " loop"} playsinline${item.startAt ? ` data-start-at="${item.startAt}"` : ""}></video>`
    : `<img src="${item.image}" alt="${item.alt}" loading="${large ? "eager" : "lazy"}" decoding="async" />`;

  return `
    <figure class="case-cover${large ? " case-cover--large" : ""}">
      ${media}
    </figure>
  `;
}

function caseMediaMarkup(item) {
  const media = item.backgroundVideo
    ? layeredSberMedia(item)
    : item.video
    ? `<video src="${item.video}" poster="${item.poster}" aria-label="${item.alt}" preload="auto" autoplay data-autoplay="true" muted${item.startAt ? "" : " loop"} playsinline${item.startAt ? ` data-start-at="${item.startAt}"` : ""}></video>`
    : `<img src="${item.image}" alt="${item.alt}" loading="eager" decoding="async" />`;

  return `
    <div class="gallery" tabindex="-1" aria-label="${item.alt}">
      <div class="gallery-track">
        <div class="slide${item.device ? " slide--device" : ""}${item.sourceCover ? " slide--source" : ""}">${media}</div>
      </div>
    </div>
  `;
}

function caseMetaMarkup(item, index) {
  if (index !== 0 && !item.wide && !item.showMeta) return "";

  return `
    <div class="case-meta" aria-hidden="true">
      <div class="top-bar grid-case">
        <span class="case-meta__title">${item.title}</span>
        <span class="case-meta__subtitle">${item.subtitle}</span>
        <span class="year">${item.year}</span>
      </div>
    </div>
  `;
}

function renderGallery() {
  gallery.innerHTML = cases
    .map(
      (item, index) => `
        <article class="case${item.disabled ? " case--disabled" : ""}${item.wide ? " case--wide" : ""}${index === 0 || item.wide || item.showMeta ? " case--with-meta" : ""}" data-index="${index}" data-tint="${item.tint}" ${item.disabled ? 'aria-disabled="true"' : `tabindex="0" role="button" aria-label="${item.external ? "Открыть сайт" : "Открыть кейс"} ${item.title}"`}>
          ${caseMediaMarkup(item)}
          ${caseMetaMarkup(item, index)}
          <div class="case-caption" aria-hidden="true">
            <p class="case-caption__label">${item.title}</p>
            <p class="case-caption__text">${item.caption}</p>
            <span class="case-caption__arrow" aria-hidden="true">↗</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderViewer() {
  const item = cases[activeIndex];
  viewerStage.innerHTML = coverMarkup(item, true);
  syncAutoplayVideos(viewerStage);
  viewerCount.textContent = `${pad(activeIndex + 1)} / ${pad(cases.length)}`;
  viewerTitle.textContent = item.title;
}

function openViewer(index) {
  activeIndex = index;
  renderViewer();
  viewer.classList.add("is-open", "viewer--case");
  viewer.setAttribute("aria-hidden", "false");
  document.documentElement.classList.add("is-locked");
  closeButton.focus({ preventScroll: true });
}

function closeViewer() {
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden", "true");
  document.documentElement.classList.remove("is-locked");
  const trigger = gallery.querySelector(`[data-index="${activeIndex}"]`);
  trigger?.focus({ preventScroll: true });
}

function syncCaseSheetScale() {
  const inset = window.innerWidth >= 1536 ? 128 : window.innerWidth >= 768 ? 48 : 32;
  caseSheetModalScale = 1 - inset / window.innerWidth;
  caseSheet.style.setProperty("--case-sheet-scale", String(caseSheetModalScale));
  applyCaseSheetMotionState(true);
  renderCaseSheetNextOverscroll();
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

// Кривая EASING оригинала ([.33,1,.68,1]), вычисляемая в JS: твины можно
// прерывать с текущей позиции — как это делает Framer Motion на alvinn.design
function cubicBezier(p1x, p1y, p2x, p2y) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const error = sampleX(t) - x;
      if (Math.abs(error) < 0.00001) return sampleY(t);
      const slope = sampleDX(t);
      if (Math.abs(slope) < 0.000001) break;
      t -= error / slope;
    }
    let low = 0;
    let high = 1;
    t = x;
    while (high - low > 0.00001) {
      if (sampleX(t) < x) low = t;
      else high = t;
      t = (low + high) / 2;
    }
    return sampleY(t);
  };
}

const caseSheetEasing = cubicBezier(0.33, 1, 0.68, 1);

function startCaseSheetTween(channel, target, duration) {
  const tween = caseSheetMotion[channel];
  if (tween.target === target) return;
  tween.from = tween.value;
  tween.target = target;
  tween.start = performance.now();
  tween.duration = duration;
  runCaseSheetMotion();
}

function setCaseSheetTween(channel, target) {
  const tween = caseSheetMotion[channel];
  tween.value = target;
  tween.target = target;
  tween.duration = 0;
}

function runCaseSheetMotion() {
  if (caseSheetMotionFrame) return;
  const step = (now) => {
    caseSheetMotionFrame = 0;
    let isMoving = false;
    for (const channel of Object.keys(caseSheetMotion)) {
      const tween = caseSheetMotion[channel];
      if (tween.value === tween.target) continue;
      const progress =
        tween.duration <= 0 ? 1 : Math.min(1, (now - tween.start) / tween.duration);
      tween.value =
        progress >= 1
          ? tween.target
          : tween.from + (tween.target - tween.from) * caseSheetEasing(progress);
      if (progress < 1) isMoving = true;
    }
    renderCaseSheetSurface();
    if (isMoving) caseSheetMotionFrame = window.requestAnimationFrame(step);
  };
  caseSheetMotionFrame = window.requestAnimationFrame(step);
}

// Стейт-машина оригинала alvinn (1:1): фулскрин при scrollTop > 0 —
// scale → 1, y → −100 за 500ms; возврат к верху — за 200ms; концовка
// (превью видно) — scale → модальный за 300ms, y не трогается;
// карточка превью — ×0.9 ↔ ×1 за 500ms. Все кривые — [.33,1,.68,1].
function applyCaseSheetMotionState(immediate = false) {
  if (!caseSheet.classList.contains("is-settled")) return;
  let targetScale;
  let targetY;
  let duration;
  if (caseSheetEndingState) {
    targetScale = caseSheetModalScale;
    targetY = -100;
    duration = 300;
  } else if (caseSheetScrolled) {
    targetScale = 1;
    targetY = -100;
    duration = 500;
  } else {
    targetScale = caseSheetModalScale;
    targetY = 0;
    duration = 200;
  }
  const previewScale = caseSheetModalScale * (caseSheetEndingState ? 1 : 0.9);
  if (immediate) {
    setCaseSheetTween("s", targetScale);
    setCaseSheetTween("y", targetY);
    setCaseSheetTween("ps", previewScale);
    renderCaseSheetSurface();
    return;
  }
  startCaseSheetTween("s", targetScale, duration);
  startCaseSheetTween("y", targetY, duration);
  startCaseSheetTween("ps", previewScale, 500);
}

function updateCaseSheetMotionState(previewIsVisible) {
  const maxScroll = Math.max(1, caseSheet.scrollHeight - caseSheet.clientHeight);
  const originBottom = caseSheet.scrollTop / maxScroll > 0.5;
  if (originBottom !== caseSheetOriginBottom) {
    caseSheetOriginBottom = originBottom;
    renderCaseSheetSurface();
  }
  const scrolled = caseSheet.scrollTop > 0;
  if (scrolled === caseSheetScrolled && previewIsVisible === caseSheetEndingState) return;
  caseSheetScrolled = scrolled;
  caseSheetEndingState = previewIsVisible;
  applyCaseSheetMotionState();
}

function settleCaseSheet() {
  if (!caseSheet.classList.contains("is-ready")) return;
  if (caseSheet.classList.contains("is-settled")) return;
  window.clearTimeout(caseSheetSettleTimer);
  // Твины стартуют с фактической позы (открывающий CSS-переход мог не доиграть)
  const matrix = getComputedStyle(caseSheetSurface).transform;
  if (matrix.startsWith("matrix(")) {
    const parts = matrix.slice(7, -1).split(",").map(Number);
    if (parts.length === 6 && Number.isFinite(parts[0]) && Number.isFinite(parts[5])) {
      setCaseSheetTween("s", parts[0]);
      setCaseSheetTween("y", parts[5]);
    }
  }
  caseSheet.classList.add("is-settled");
  applyCaseSheetMotionState();
}

function initCaseSheetMotionForCurrentPosition() {
  const previewRect = caseSheetNextPreview.getBoundingClientRect();
  caseSheetScrolled = caseSheet.scrollTop > 0;
  caseSheetEndingState =
    !caseSheetNextPreview.hidden &&
    previewRect.top < window.innerHeight &&
    previewRect.bottom > 0;
  const maxScroll = Math.max(1, caseSheet.scrollHeight - caseSheet.clientHeight);
  caseSheetOriginBottom = caseSheet.scrollTop / maxScroll > 0.5;
  applyCaseSheetMotionState(true);
}

function renderCaseSheetSurface() {
  // Единственное отличие от оригинала: подъём −100px гасится к концу страницы.
  // В оригинале он остаётся и на чёрном фоне невидим — у нас показал бы
  // белую полосу между карточкой и превью следующего кейса
  const scrollTop = caseSheet.scrollTop;
  const maxScroll = Math.max(0, caseSheet.scrollHeight - caseSheet.clientHeight);
  const yFadeEnd = Math.min(1400, Math.max(1, maxScroll - 420));
  const yFadeStart = Math.min(600, yFadeEnd * 0.5);
  const yFade =
    1 - clamp01((scrollTop - yFadeStart) / Math.max(1, yFadeEnd - yFadeStart));

  const pullProgress = clamp01(caseSheetOverscrollVisual / caseSheetOverscrollDistance);
  const nextProgress = clamp01(
    caseSheetNextOverscrollVisual / caseSheetNextOverscrollDistance,
  );

  const y = caseSheetMotion.y.value * yFade + pullProgress * 120 + nextProgress * -100;
  const scale = caseSheetMotion.s.value * (1 - nextProgress * 0.05);
  const opacity = (1 - pullProgress) * (1 - nextProgress * 0.9);

  caseSheet.style.setProperty("--case-sheet-y", `${y}px`);
  caseSheet.style.setProperty("--case-sheet-s", String(scale));
  caseSheet.style.setProperty(
    "--case-sheet-origin",
    caseSheetOriginBottom ? "center bottom" : "center top",
  );
  caseSheet.style.setProperty("--case-sheet-op", String(opacity));
  caseSheet.style.setProperty("--case-sheet-preview-s", String(caseSheetMotion.ps.value));
}

function syncCaseSheetViewportState() {
  // Скролл начался раньше, чем доиграло открытие — перехватываем управление
  // твинами немедленно, с текущей позы (как прерываемое интро оригинала)
  if (
    caseSheet.scrollTop > 0 &&
    caseSheet.classList.contains("is-ready") &&
    !caseSheet.classList.contains("is-settled")
  ) {
    settleCaseSheet();
  }
  renderCaseSheetSurface();

  const previewRect = caseSheetNextPreview.getBoundingClientRect();
  const previewIsVisible =
    caseSheet.classList.contains("is-open") &&
    !caseSheetNextPreview.hidden &&
    previewRect.top < window.innerHeight &&
    previewRect.bottom > 0;

  updateCaseSheetMotionState(previewIsVisible);

  if (caseSheetWasEnding && !previewIsVisible) {
    window.clearTimeout(caseSheetEndReturnTimer);
    caseSheet.classList.add("is-returning-from-end");
    caseSheetEndReturnTimer = window.setTimeout(() => {
      caseSheet.classList.remove("is-returning-from-end");
    }, 520);
  } else if (previewIsVisible) {
    window.clearTimeout(caseSheetEndReturnTimer);
    caseSheet.classList.remove("is-returning-from-end");
  }
  caseSheetWasEnding = previewIsVisible;

  caseSheet.classList.toggle("is-ending", previewIsVisible);
  caseSheetNextPreview.classList.toggle("is-showing", previewIsVisible);
}

function syncNextCase(index) {
  const availableCases = cases
    .map((item, itemIndex) => ({ item, itemIndex }))
    .filter(({ item }) => item.href && !item.external && !item.disabled);
  const currentPosition = availableCases.findIndex(({ itemIndex }) => itemIndex === index);
  const nextPosition = currentPosition >= 0 ? (currentPosition + 1) % availableCases.length : 0;
  const nextCase = availableCases[nextPosition];
  if (!nextCase) {
    caseSheetNext.hidden = true;
    caseSheetNextPreview.hidden = true;
    return;
  }

  caseSheetNext.hidden = false;
  caseSheetNextPreview.hidden = false;
  caseSheetNextButton.dataset.caseIndex = String(nextCase.itemIndex);
  caseSheetNextButton.setAttribute("aria-label", `Открыть следующий кейс: ${nextCase.item.title}`);
  caseSheetNextTitle.textContent = nextCase.item.title;
  caseSheetNext.style.setProperty("--case-sheet-next-accent", nextCase.item.accent || "#fff");
  caseSheetNextPreviewButton.dataset.caseIndex = String(nextCase.itemIndex);
  caseSheetNextPreviewButton.setAttribute(
    "aria-label",
    `Открыть следующий кейс: ${nextCase.item.title}`,
  );
  caseSheetNextPreviewFrame.title = `Следующий кейс: ${nextCase.item.title}`;
  if (caseSheetNextPreviewFrame.getAttribute("src") !== nextCase.item.href) {
    caseSheetNextPreviewFrame.src = nextCase.item.href;
  }
}

// Пересоздаёт блок превью целиком (контейнер + карточка + iframe + кнопка)
// и перевешивает ссылки/обработчики. Нужен после «промоушена», когда прежний
// контейнер превью стал новой поверхностью кейса
function createCaseSheetNextPreview() {
  const container = document.createElement("div");
  container.className = "case-sheet__next-preview";
  container.hidden = true;
  const card = document.createElement("div");
  card.className = "case-sheet__next-preview-card";
  const frame = document.createElement("iframe");
  frame.className = "case-sheet__next-preview-frame";
  frame.src = "about:blank";
  frame.title = "Следующий кейс";
  frame.loading = "eager";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  const button = document.createElement("button");
  button.className = "case-sheet__next-preview-button";
  button.type = "button";
  card.append(frame, button);
  container.append(card);
  button.addEventListener("click", openNextCaseSheet);
  button.addEventListener("pointerdown", pressCaseSheetPreviewTilt);
  button.addEventListener("pointerup", releaseCaseSheetPreviewTilt);
  button.addEventListener("pointercancel", releaseCaseSheetPreviewTilt);
  button.addEventListener("pointerleave", releaseCaseSheetPreviewTilt);
  caseSheetNextPreview = container;
  caseSheetNextPreviewCard = card;
  caseSheetNextPreviewFrame = frame;
  caseSheetNextPreviewButton = button;
  return container;
}

function removeCaseSheetPreviewPlaceholders() {
  caseSheet
    .querySelectorAll(".case-sheet__next-preview-placeholder")
    .forEach((element) => element.remove());
}

function ensureCaseSheetPreviewExists() {
  if (caseSheetNextPreview.isConnected) return;
  caseSheetSurface.after(createCaseSheetNextPreview());
}

function getEmbeddedFrameHeight(frame) {
  try {
    const documentElement = frame.contentDocument?.documentElement;
    const body = frame.contentDocument?.body;
    return Math.max(
      window.innerHeight,
      documentElement?.scrollHeight || 0,
      documentElement?.offsetHeight || 0,
      body?.scrollHeight || 0,
      body?.offsetHeight || 0,
    );
  } catch {
    return window.innerHeight;
  }
}

function syncCaseSheetBackLabel() {
  if (caseSheetHistory.length > 1) {
    const previousIndex = caseSheetHistory[caseSheetHistory.length - 2].index;
    caseSheetBackLabel.textContent = cases[previousIndex]?.title || "Все кейсы";
    return;
  }
  caseSheetBackLabel.textContent = "Все кейсы";
}

function clearCaseSheetHistorySurfaces() {
  caseSheetHistory.forEach(({ surface }) => {
    if (surface && surface !== caseSheetSurface) surface.remove();
  });
  caseSheetHistory = [];
}

function restorePreviousCaseSheet() {
  if (caseSheetHistory.length <= 1) {
    closeCaseSheet();
    return;
  }

  const currentSurface = caseSheetSurface;
  const previousEntry = caseSheetHistory[caseSheetHistory.length - 2];
  caseSheetHistory.pop();

  previousEntry.surface.hidden = false;
  previousEntry.surface.classList.remove("case-sheet__surface--leaving");
  previousEntry.surface.style.transition = "";
  previousEntry.surface.style.transform = "";
  previousEntry.surface.style.opacity = "";
  currentSurface.remove();

  caseSheetSurface = previousEntry.surface;
  caseSheetFrame = previousEntry.frame;
  caseSheetIndex = previousEntry.index;
  caseSheetPendingSurface = null;
  caseSheetPendingFrame = null;
  caseSheet.classList.remove("is-switching");
  caseSheet.scrollTop = previousEntry.scrollTop;
  syncNextCase(caseSheetIndex);
  syncCaseSheetBackLabel();
  resetCaseSheetOverscroll();
  resetCaseSheetNextOverscroll();
  initCaseSheetMotionForCurrentPosition();
  caseSheetOverscrollEnabledAt = performance.now() + 1000;
  window.requestAnimationFrame(syncCaseSheetViewportState);
}

function renderCaseSheetOverscroll() {
  const progress = clamp01(caseSheetOverscrollVisual / caseSheetOverscrollDistance);
  caseSheet.style.setProperty("--case-sheet-overscroll-progress", String(progress));
  caseSheet.classList.toggle("is-overscrolling", progress > 0.001 || caseSheetOverscroll > 0);
  renderCaseSheetSurface();
}

function completeCaseSheetOverscroll() {
  if (caseSheet.classList.contains("is-overscroll-complete")) return;
  window.clearTimeout(caseSheetOverscrollResetTimer);
  caseSheet.classList.add("is-overscroll-complete");
  const completeAction =
    caseSheetHistory.length > 1 ? restorePreviousCaseSheet : closeCaseSheet;
  caseSheetOverscrollCloseTimer = window.setTimeout(completeAction, 180);
}

function animateCaseSheetOverscroll() {
  if (caseSheetOverscrollFrame) return;

  let previousTime = performance.now();
  const updateSpring = (currentTime) => {
    const elapsed = Math.min(0.032, Math.max(0, (currentTime - previousTime) / 1000));
    previousTime = currentTime;

    const steps = Math.max(1, Math.ceil(elapsed / (1 / 240)));
    const step = elapsed / steps;
    for (let index = 0; index < steps; index += 1) {
      const acceleration =
        caseSheetOverscrollStiffness * (caseSheetOverscroll - caseSheetOverscrollVisual) -
        caseSheetOverscrollDamping * caseSheetOverscrollVelocity;
      caseSheetOverscrollVelocity += acceleration * step;
      caseSheetOverscrollVisual += caseSheetOverscrollVelocity * step;
    }

    if (caseSheetOverscrollVisual < 0) caseSheetOverscrollVisual = 0;
    if (caseSheetOverscrollVisual > caseSheetOverscrollDistance) {
      caseSheetOverscrollVisual = caseSheetOverscrollDistance;
    }
    renderCaseSheetOverscroll();

    if (
      caseSheetOverscroll >= caseSheetOverscrollDistance &&
      caseSheetOverscrollVisual >= caseSheetOverscrollDistance - 0.5
    ) {
      caseSheetOverscrollFrame = 0;
      completeCaseSheetOverscroll();
      return;
    }

    const isMoving =
      Math.abs(caseSheetOverscroll - caseSheetOverscrollVisual) > 0.05 ||
      Math.abs(caseSheetOverscrollVelocity) > 0.05;
    if (isMoving) {
      caseSheetOverscrollFrame = window.requestAnimationFrame(updateSpring);
      return;
    }

    caseSheetOverscrollVisual = caseSheetOverscroll;
    caseSheetOverscrollVelocity = 0;
    caseSheetOverscrollFrame = 0;
    renderCaseSheetOverscroll();
  };

  caseSheetOverscrollFrame = window.requestAnimationFrame(updateSpring);
}

function releaseCaseSheetOverscroll() {
  caseSheetOverscroll = 0;
  animateCaseSheetOverscroll();
}

function resetCaseSheetOverscroll() {
  window.clearTimeout(caseSheetOverscrollResetTimer);
  window.clearTimeout(caseSheetOverscrollCloseTimer);
  window.cancelAnimationFrame(caseSheetOverscrollFrame);
  caseSheetOverscrollFrame = 0;
  caseSheetOverscroll = 0;
  caseSheetOverscrollVisual = 0;
  caseSheetOverscrollVelocity = 0;
  caseSheet.classList.remove("is-overscrolling", "is-overscroll-complete");
  renderCaseSheetOverscroll();
}

function renderCaseSheetNextOverscroll() {
  const progress = clamp01(
    caseSheetNextOverscrollVisual / caseSheetNextOverscrollDistance,
  );
  caseSheet.style.setProperty("--case-sheet-next-overscroll-progress", String(progress));
  caseSheet.style.setProperty("--case-sheet-next-preview-y", `${progress * -100}px`);
  caseSheet.classList.toggle(
    "is-next-overscrolling",
    progress > 0.001 || caseSheetNextOverscroll > 0,
  );
  renderCaseSheetSurface();
}

function completeCaseSheetNextOverscroll() {
  if (caseSheet.classList.contains("is-next-overscroll-complete")) return;
  window.clearTimeout(caseSheetNextOverscrollResetTimer);
  caseSheet.classList.add("is-next-overscroll-complete");
  window.requestAnimationFrame(() => {
    openNextCaseSheet({ currentTarget: caseSheetNextPreviewButton });
  });
}

function animateCaseSheetNextOverscroll() {
  if (caseSheetNextOverscrollFrame) return;

  let previousTime = performance.now();
  const updateSpring = (currentTime) => {
    const elapsed = Math.min(0.032, Math.max(0, (currentTime - previousTime) / 1000));
    previousTime = currentTime;

    const steps = Math.max(1, Math.ceil(elapsed / (1 / 240)));
    const step = elapsed / steps;
    for (let index = 0; index < steps; index += 1) {
      const acceleration =
        caseSheetOverscrollStiffness *
          (caseSheetNextOverscroll - caseSheetNextOverscrollVisual) -
        caseSheetOverscrollDamping * caseSheetNextOverscrollVelocity;
      caseSheetNextOverscrollVelocity += acceleration * step;
      caseSheetNextOverscrollVisual += caseSheetNextOverscrollVelocity * step;
    }

    caseSheetNextOverscrollVisual = Math.min(
      caseSheetNextOverscrollDistance,
      Math.max(0, caseSheetNextOverscrollVisual),
    );
    renderCaseSheetNextOverscroll();

    if (
      caseSheetNextOverscroll >= caseSheetNextOverscrollDistance &&
      caseSheetNextOverscrollVisual >= caseSheetNextOverscrollDistance - 0.5
    ) {
      caseSheetNextOverscrollFrame = 0;
      completeCaseSheetNextOverscroll();
      return;
    }

    const isMoving =
      Math.abs(caseSheetNextOverscroll - caseSheetNextOverscrollVisual) > 0.05 ||
      Math.abs(caseSheetNextOverscrollVelocity) > 0.05;
    if (isMoving) {
      caseSheetNextOverscrollFrame = window.requestAnimationFrame(updateSpring);
      return;
    }

    caseSheetNextOverscrollVisual = caseSheetNextOverscroll;
    caseSheetNextOverscrollVelocity = 0;
    caseSheetNextOverscrollFrame = 0;
    renderCaseSheetNextOverscroll();
  };

  caseSheetNextOverscrollFrame = window.requestAnimationFrame(updateSpring);
}

function releaseCaseSheetNextOverscroll() {
  caseSheetNextOverscroll = 0;
  animateCaseSheetNextOverscroll();
}

function resetCaseSheetNextOverscroll() {
  window.clearTimeout(caseSheetNextOverscrollResetTimer);
  window.cancelAnimationFrame(caseSheetNextOverscrollFrame);
  caseSheetNextOverscrollFrame = 0;
  caseSheetNextOverscroll = 0;
  caseSheetNextOverscrollVisual = 0;
  caseSheetNextOverscrollVelocity = 0;
  caseSheet.classList.remove("is-next-overscrolling", "is-next-overscroll-complete");
  renderCaseSheetNextOverscroll();
}

function handleCaseSheetOverscroll(event) {
  if (!caseSheet.classList.contains("is-open")) return;
  if (performance.now() < caseSheetOverscrollEnabledAt) return;
  if (
    caseSheet.classList.contains("is-overscroll-complete") ||
    caseSheet.classList.contains("is-next-overscroll-complete") ||
    caseSheet.classList.contains("is-switching")
  ) {
    event.preventDefault();
    return;
  }

  const wheelDelta = Math.min(50, Math.max(-50, event.deltaY));
  const nextWheelDelta = Math.min(50, Math.max(-50, event.deltaY));
  const previousWheelDelta = wheelDelta;
  const atBottom =
    caseSheet.scrollTop + caseSheet.clientHeight >= caseSheet.scrollHeight - 0.5;
  const canAdvanceToNext =
    atBottom &&
    caseSheet.classList.contains("is-ending") &&
    !caseSheetNextPreview.hidden;

  if (canAdvanceToNext && (nextWheelDelta > 0 || caseSheetNextOverscroll > 0)) {
    event.preventDefault();
    caseSheetNextOverscroll = Math.max(
      0,
      Math.min(
        caseSheetNextOverscrollDistance,
        caseSheetNextOverscroll + nextWheelDelta,
      ),
    );
    animateCaseSheetNextOverscroll();

    window.clearTimeout(caseSheetNextOverscrollResetTimer);
    if (caseSheetNextOverscroll < caseSheetNextOverscrollDistance) {
      caseSheetNextOverscrollResetTimer = window.setTimeout(
        releaseCaseSheetNextOverscroll,
        140,
      );
    }
    return;
  }

  if (caseSheetNextOverscroll > 0) releaseCaseSheetNextOverscroll();

  if (caseSheet.scrollTop > 0.5) {
    if (caseSheetOverscroll > 0) releaseCaseSheetOverscroll();
    return;
  }

  if (previousWheelDelta >= 0 && caseSheetOverscroll <= 0) return;

  event.preventDefault();
  caseSheetOverscroll = Math.max(
    0,
    caseSheetOverscrollVisual - previousWheelDelta,
  );
  animateCaseSheetOverscroll();

  window.clearTimeout(caseSheetOverscrollResetTimer);
  if (caseSheetOverscroll < caseSheetOverscrollDistance) {
    caseSheetOverscrollResetTimer = window.setTimeout(releaseCaseSheetOverscroll, 140);
  }
}

function openCaseSheet(index) {
  const item = cases[index];
  if (!item?.href || item.disabled) return;

  window.clearTimeout(caseSheetClearTimer);
  window.clearTimeout(caseSheetSwitchTimer);
  caseSheetPendingSurface?.remove();
  caseSheetPendingSurface = null;
  caseSheetPendingFrame = null;
  removeCaseSheetPreviewPlaceholders();
  ensureCaseSheetPreviewExists();
  caseSheetSurface.classList.remove("case-sheet__surface--leaving");
  caseSheetSurface.style.transition = "";
  caseSheetSurface.style.transform = "";
  caseSheetSurface.style.opacity = "";
  caseSheet.classList.remove("is-switching");
  clearCaseSheetHistorySurfaces();
  const loadToken = ++caseSheetLoadToken;
  const openedAt = performance.now();
  caseSheetIndex = index;
  caseSheetHistory = [
    {
      index,
      surface: caseSheetSurface,
      frame: caseSheetFrame,
      scrollTop: 0,
    },
  ];
  syncCaseSheetBackLabel();
  caseSheetFrame.title = `Кейс ${item.title}`;
  syncCaseSheetScale();
  syncNextCase(index);
  resetCaseSheetOverscroll();
  resetCaseSheetNextOverscroll();
  caseSheetOverscrollEnabledAt = openedAt + 1000;
  window.clearTimeout(caseSheetEndReturnTimer);
  caseSheetWasEnding = false;
  caseSheet.scrollTop = 0;
  caseSheetFrame.style.height = `${window.innerHeight}px`;
  window.clearTimeout(caseSheetSettleTimer);
  window.cancelAnimationFrame(caseSheetMotionFrame);
  caseSheetMotionFrame = 0;
  caseSheetScrolled = false;
  caseSheetEndingState = false;
  caseSheetOriginBottom = false;
  setCaseSheetTween("y", 0);
  setCaseSheetTween("s", caseSheetModalScale);
  setCaseSheetTween("ps", caseSheetModalScale * 0.9);
  caseSheet.classList.remove(
    "is-ready",
    "is-settled",
    "is-closing",
    "is-fullscreen",
    "is-past-middle",
    "is-returning-from-end",
    "is-ending",
  );
  renderCaseSheetSurface();
  caseSheet.classList.add("is-open");
  caseSheet.setAttribute("aria-hidden", "false");
  document.documentElement.classList.add("is-locked");
  caseSheetClose.focus({ preventScroll: true });

  caseSheetFrame.onload = () => {
    if (loadToken !== caseSheetLoadToken || !caseSheet.classList.contains("is-open")) return;

    const revealDelay = Math.max(0, 180 - (performance.now() - openedAt));
    window.setTimeout(() => {
      if (loadToken !== caseSheetLoadToken || !caseSheet.classList.contains("is-open")) return;
      caseSheet.classList.add("is-ready");
      window.requestAnimationFrame(syncCaseSheetViewportState);
      // Открывающий CSS-переход отработал — дальше transform ведёт JS без переходов
      window.clearTimeout(caseSheetSettleTimer);
      caseSheetSettleTimer = window.setTimeout(() => {
        if (loadToken !== caseSheetLoadToken || !caseSheet.classList.contains("is-open")) return;
        settleCaseSheet();
      }, 750);
    }, revealDelay);
  };

  window.requestAnimationFrame(() => {
    if (loadToken === caseSheetLoadToken) caseSheetFrame.src = item.href;
  });
}

function closeCaseSheet() {
  caseSheetLoadToken += 1;
  window.clearTimeout(caseSheetSwitchTimer);
  caseSheetPendingSurface?.remove();
  caseSheetPendingSurface = null;
  caseSheetPendingFrame = null;
  removeCaseSheetPreviewPlaceholders();
  ensureCaseSheetPreviewExists();
  caseSheetSurface.classList.remove("case-sheet__surface--leaving");
  caseSheetSurface.style.transition = "";
  caseSheetSurface.style.transform = "";
  caseSheetSurface.style.opacity = "";
  window.clearTimeout(caseSheetEndReturnTimer);
  caseSheetWasEnding = false;
  window.cancelAnimationFrame(caseSheetMotionFrame);
  caseSheetMotionFrame = 0;
  resetCaseSheetOverscroll();
  resetCaseSheetNextOverscroll();
  clearCaseSheetHistorySurfaces();
  syncCaseSheetBackLabel();
  window.clearTimeout(caseSheetSettleTimer);
  // Exit оригинала: карточка ныряет на y+100 и гаснет за 300ms [.32,0,.67,0]
  caseSheet.classList.add("is-closing");
  caseSheet.classList.remove(
    "is-ready",
    "is-settled",
    "is-fullscreen",
    "is-past-middle",
    "is-returning-from-end",
    "is-ending",
    "is-switching",
    "is-open",
  );
  caseSheet.setAttribute("aria-hidden", "true");
  document.documentElement.classList.remove("is-locked");

  const trigger = gallery.querySelector(`[data-index="${caseSheetIndex}"]`);
  trigger?.focus({ preventScroll: true });
  caseSheetClearTimer = window.setTimeout(() => {
    caseSheetFrame.src = "about:blank";
  }, 720);
}

function openNextCaseSheet(event) {
  const trigger = event.currentTarget;
  const nextIndex = Number(trigger.dataset.caseIndex);
  const nextItem = cases[nextIndex];
  if (!Number.isInteger(nextIndex) || nextIndex === caseSheetIndex || !nextItem?.href) return;
  if (caseSheet.classList.contains("is-switching")) return;

  window.clearTimeout(caseSheetSwitchTimer);
  const switchToken = ++caseSheetLoadToken;
  const previousSurface = caseSheetSurface;
  const currentHistoryEntry = caseSheetHistory[caseSheetHistory.length - 1];
  if (currentHistoryEntry?.surface === previousSurface) {
    currentHistoryEntry.scrollTop = caseSheet.scrollTop;
  }
  const isPreviewTrigger = trigger === caseSheetNextPreviewButton;
  // Ключ к плавности: перенос iframe в другой узел DOM перезагружает его
  // содержимое (белая вспышка + дёрганое появление). Поэтому контейнер превью
  // САМ становится новой поверхностью — меняются только классы, iframe не трогаем
  const promotePreview =
    !caseSheetNextPreview.hidden &&
    caseSheetNextPreviewFrame.getAttribute("src") === nextItem.href;

  // Снять tilt до замеров, чтобы стартовая поза не была искажена нажатием
  caseSheetNextPreviewCard.classList.remove("is-tilting");
  caseSheetNextPreviewCard.removeAttribute("style");

  const cardRect = caseSheetNextPreviewCard.getBoundingClientRect();
  const triggerRect = isPreviewTrigger ? cardRect : trigger.getBoundingClientRect();
  const sheetTop =
    parseFloat(getComputedStyle(caseSheet).getPropertyValue("--case-sheet-top")) || 80;
  // Как в оригинале: из превью — морф с его позиции; иначе (кнопка «Далее»,
  // аналог прямого захода) — карточка въезжает из-за нижнего края экрана
  const entryScale = isPreviewTrigger ? cardRect.width / window.innerWidth : 0.9;
  const entryX = isPreviewTrigger
    ? 0.7 * (cardRect.left + cardRect.width / 2 - window.innerWidth / 2)
    : 0;
  const entryY = isPreviewTrigger ? cardRect.top - sheetTop : window.innerHeight;
  resetCaseSheetOverscroll();
  caseSheet.classList.add("is-switching");
  previousSurface.classList.add("case-sheet__surface--leaving");
  // Exit старой карточки — как в оригинале: с превью/дотяжки контент уезжает
  // вверх на четверть экрана (300ms), с кнопки — вниз на 100px (200ms)
  const leaveY = isPreviewTrigger ? -Math.round(window.innerHeight / 4) : 100;
  const leaveDuration = isPreviewTrigger ? 300 : 200;
  const leaveScale =
    caseSheet.style.getPropertyValue("--case-sheet-s") || String(caseSheetModalScale);
  previousSurface.style.transition = `opacity ${leaveDuration}ms cubic-bezier(0.32, 0, 0.67, 0), transform ${leaveDuration}ms cubic-bezier(0.32, 0, 0.67, 0)`;
  previousSurface.style.transform = `translateY(${leaveY}px) scale(${leaveScale})`;
  previousSurface.style.opacity = "0";

  let nextSurface;
  let nextFrame;
  if (promotePreview) {
    nextSurface = caseSheetNextPreview;
    nextFrame = caseSheetNextPreviewFrame;
    // У существующего элемента смена классов анимируется transition-ом —
    // стартовую позу нужно применить мгновенно (FLIP), анимация включится ниже
    nextSurface.style.transition = "none";
    // Распорка на место превью в потоке — иначе позиция скролла прыгнет,
    // когда контейнер станет position: fixed
    const placeholder = document.createElement("div");
    placeholder.className = "case-sheet__next-preview-placeholder";
    placeholder.style.height = `${nextSurface.getBoundingClientRect().height}px`;
    placeholder.setAttribute("aria-hidden", "true");
    nextSurface.before(placeholder);
    caseSheetNextPreviewButton.remove();
    caseSheetNextPreviewCard.className = "";
    nextFrame.className = "case-sheet__frame";
    nextFrame.title = `Кейс ${nextItem.title}`;
    nextFrame.removeAttribute("aria-hidden");
    nextFrame.removeAttribute("tabindex");
    nextFrame.style.height = `${getEmbeddedFrameHeight(nextFrame)}px`;
    const scrollCatcher = document.createElement("div");
    scrollCatcher.className = "case-sheet__scroll-catcher";
    scrollCatcher.setAttribute("aria-hidden", "true");
    nextSurface.append(scrollCatcher);
    nextSurface.className = `case-sheet__surface case-sheet__surface--entering${
      isPreviewTrigger ? " case-sheet__surface--from-preview" : ""
    }`;
    nextSurface.setAttribute("role", "dialog");
    nextSurface.setAttribute("aria-modal", "true");
    nextSurface.setAttribute("aria-label", `Кейс ${nextItem.title}`);
  } else {
    // Запасной путь: превью ещё не загрузилось — новый iframe, ждём load
    nextSurface = document.createElement("section");
    nextSurface.className = `case-sheet__surface case-sheet__surface--entering${
      isPreviewTrigger ? " case-sheet__surface--from-preview" : ""
    }`;
    nextSurface.setAttribute("role", "dialog");
    nextSurface.setAttribute("aria-modal", "true");
    nextSurface.setAttribute("aria-label", `Кейс ${nextItem.title}`);
    nextFrame = document.createElement("iframe");
    nextFrame.className = "case-sheet__frame";
    nextFrame.src = "about:blank";
    nextFrame.title = `Кейс ${nextItem.title}`;
    nextFrame.loading = "eager";
    nextFrame.style.height = `${window.innerHeight}px`;
    const scrollCatcher = document.createElement("div");
    scrollCatcher.className = "case-sheet__scroll-catcher";
    scrollCatcher.setAttribute("aria-hidden", "true");
    nextSurface.append(nextFrame, scrollCatcher);
    previousSurface.after(nextSurface);
  }
  nextSurface.style.setProperty("--case-sheet-entry-x", `${entryX}px`);
  nextSurface.style.setProperty("--case-sheet-entry-y", `${entryY}px`);
  nextSurface.style.setProperty("--case-sheet-entry-scale", String(entryScale));
  if (promotePreview) {
    // Зафиксировать стартовую позу без анимации, затем вернуть transition
    void nextSurface.offsetWidth;
    nextSurface.style.transition = "";
  }
  caseSheetPendingSurface = nextSurface;
  caseSheetPendingFrame = nextFrame;

  const startSwitchAnimation = () => {
    if (switchToken !== caseSheetLoadToken || !caseSheet.classList.contains("is-open")) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (switchToken === caseSheetLoadToken) {
          nextSurface.classList.add("case-sheet__surface--visible");
        }
      });
    });

    caseSheetSwitchTimer = window.setTimeout(() => {
      if (switchToken !== caseSheetLoadToken || !caseSheet.classList.contains("is-open")) return;

      caseSheet.scrollTop = 0;
      window.clearTimeout(caseSheetEndReturnTimer);
      caseSheetWasEnding = false;
      caseSheet.classList.remove(
        "is-fullscreen",
        "is-past-middle",
        "is-returning-from-end",
        "is-ending",
      );
      previousSurface.hidden = true;
      previousSurface.style.transition = "";
      previousSurface.style.transform = "";
      previousSurface.style.opacity = "";
      resetCaseSheetNextOverscroll();
      nextSurface.classList.remove(
        "case-sheet__surface--entering",
        "case-sheet__surface--visible",
        "case-sheet__surface--from-preview",
      );
      caseSheetSurface = nextSurface;
      caseSheetFrame = nextFrame;
      caseSheetIndex = nextIndex;
      caseSheetHistory.push({
        index: nextIndex,
        surface: nextSurface,
        frame: nextFrame,
        scrollTop: 0,
      });
      caseSheetPendingSurface = null;
      caseSheetPendingFrame = null;
      caseSheet.classList.remove("is-switching");
      removeCaseSheetPreviewPlaceholders();
      if (promotePreview) {
        nextSurface.after(createCaseSheetNextPreview());
      }
      syncNextCase(nextIndex);
      syncCaseSheetBackLabel();
      initCaseSheetMotionForCurrentPosition();
      caseSheetOverscrollEnabledAt = performance.now() + 1000;
      window.requestAnimationFrame(syncCaseSheetViewportState);
    }, 720);
  };

  if (promotePreview) {
    startSwitchAnimation();
  } else {
    nextFrame.onload = () => {
      if (nextFrame.getAttribute("src") !== nextItem.href) return;
      startSwitchAnimation();
    };
    nextFrame.src = nextItem.href;
  }
}

function showNext(direction) {
  activeIndex = (activeIndex + direction + cases.length) % cases.length;
  renderViewer();
}

function activateCase(index) {
  const item = cases[index];
  if (!item || item.disabled) return;

  if (item.external) {
    window.open(item.href, "_blank", "noopener");
    return;
  }

  if (item.href) {
    openCaseSheet(index);
    return;
  }

  openViewer(index);
}

renderGallery();
syncAutoplayVideos(gallery);
reducedMotion.addEventListener?.("change", () => syncAutoplayVideos());

document.addEventListener("visibilitychange", () => {
  syncAutoplayVideos();
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;

    viewButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    viewPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === view;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});

gallery.addEventListener("click", (event) => {
  const card = event.target.closest(".case");
  if (!card) return;
  activateCase(Number(card.dataset.index));
});

gallery.addEventListener("keydown", (event) => {
  const card = event.target.closest(".case");
  if (!card) return;
  const item = cases[Number(card.dataset.index)];
  if (item.disabled) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  activateCase(Number(card.dataset.index));
});

// Tilt превью при нажатии — как в оригинале: rotateY = 5·x, rotateX = −7·y
// от нормализованной точки касания (±0.5 от центра), scale 0.99
function pressCaseSheetPreviewTilt(event) {
  const rect = caseSheetNextPreviewCard.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const pointX = clamp01((event.clientX - rect.left) / rect.width) - 0.5;
  const pointY = clamp01((event.clientY - rect.top) / rect.height) - 0.5;
  caseSheetNextPreviewCard.classList.add("is-tilting");
  caseSheetNextPreviewCard.style.setProperty("--case-sheet-tilt-ry", `${5 * pointX}deg`);
  caseSheetNextPreviewCard.style.setProperty("--case-sheet-tilt-rx", `${-7 * pointY}deg`);
  caseSheetNextPreviewCard.style.setProperty("--case-sheet-tilt-scale", "0.99");
}

function releaseCaseSheetPreviewTilt() {
  if (!caseSheetNextPreviewCard.classList.contains("is-tilting")) return;
  caseSheetNextPreviewCard.style.setProperty("--case-sheet-tilt-rx", "0deg");
  caseSheetNextPreviewCard.style.setProperty("--case-sheet-tilt-ry", "0deg");
  caseSheetNextPreviewCard.style.setProperty("--case-sheet-tilt-scale", "1");
  window.setTimeout(() => {
    caseSheetNextPreviewCard.classList.remove("is-tilting");
  }, 220);
}

closeButton.addEventListener("click", closeViewer);
caseSheetClose.addEventListener("click", closeCaseSheet);
caseSheetNextButton.addEventListener("click", openNextCaseSheet);
caseSheetNextPreviewButton.addEventListener("click", openNextCaseSheet);
caseSheetNextPreviewButton.addEventListener("pointerdown", pressCaseSheetPreviewTilt);
caseSheetNextPreviewButton.addEventListener("pointerup", releaseCaseSheetPreviewTilt);
caseSheetNextPreviewButton.addEventListener("pointercancel", releaseCaseSheetPreviewTilt);
caseSheetNextPreviewButton.addEventListener("pointerleave", releaseCaseSheetPreviewTilt);
caseSheet.addEventListener("click", (event) => {
  if (event.target === caseSheet) closeCaseSheet();
});
window.addEventListener("message", (event) => {
  if (!caseSheet.classList.contains("is-open")) return;

  let targetFrame = null;
  if (event.source === caseSheetFrame.contentWindow) targetFrame = caseSheetFrame;
  if (caseSheetPendingFrame && event.source === caseSheetPendingFrame.contentWindow) {
    targetFrame = caseSheetPendingFrame;
  }
  if (!targetFrame) return;

  if (event.data?.type === "portfolio-case-size") {
    const frameHeight = Number(event.data.height);
    if (Number.isFinite(frameHeight) && frameHeight > 0) {
      targetFrame.style.height = `${Math.ceil(frameHeight)}px`;
      window.requestAnimationFrame(syncCaseSheetViewportState);
    }
    return;
  }

});
caseSheet.addEventListener(
  "scroll",
  syncCaseSheetViewportState,
  { passive: true },
);
caseSheet.addEventListener("wheel", handleCaseSheetOverscroll, { passive: false });
window.addEventListener("resize", () => {
  syncCaseSheetScale();
  syncCaseSheetViewportState();
});
previousButton.addEventListener("click", () => showNext(-1));
nextButton.addEventListener("click", () => showNext(1));

viewer.addEventListener("wheel", (event) => {
  if (!viewer.classList.contains("is-open") || wheelLock) return;
  const direction = event.deltaY > 0 || event.deltaX > 0 ? 1 : -1;
  showNext(direction);
  wheelLock = true;
  window.setTimeout(() => {
    wheelLock = false;
  }, 520);
});

viewer.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
});

viewer.addEventListener("touchend", (event) => {
  const delta = touchStartY - event.changedTouches[0].clientY;
  if (Math.abs(delta) < 36) return;
  showNext(delta > 0 ? 1 : -1);
});

window.addEventListener("keydown", (event) => {
  if (caseSheet.classList.contains("is-open")) {
    if (event.key === "Escape") closeCaseSheet();
    return;
  }
  if (!viewer.classList.contains("is-open")) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowRight" || event.key === "ArrowDown") showNext(1);
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") showNext(-1);
});
