/* =========================
   DATA (仮データ)
   画像は img/ に入れて、後で同名で上書きするだけで差し替えOK
========================= */
const DATA = [
  {
    rank: 1,
    cat: "family",
    titleJA: "トヨタ VOXY",
    titleEN: "Toyota Voxy",
    year: "2014",
    seats: "7 seats",
    engine: "2000cc",
    total: "GHS 100,000",
    monthly: "GHS 1,190",
    images: ["img/voxy1.jpg", "img/voxy1.jpg", "img/voxy1.jpg"],
    specJA: ["Year: 2014", "Seats: 7", "Engine: 2000cc", "※ 審査が必要な場合があります。"],
    specEN: ["Year: 2014", "Seats: 7", "Engine: 2000cc", "* Finance approval required (if applicable)."],
    planAJA: ["支払い完了後に所有", "シンプルで分かりやすい"],
    planAEN: ["Own after full payment", "Simple and easy to understand"],
    planBJA: ["所有ではなく“使用”も選べる", "月々の負担が軽い", "満了時：返却 / 更新 / 買い取り"],
    planBEN: ["Choose 'use' instead of ownership", "Lower monthly 부담", "End of term: return / renew / buyout"]
  },
  {
    rank: 2,
    cat: "family",
    titleJA: "トヨタ シエンタ",
    titleEN: "Toyota Sienta",
    year: "2017",
    seats: "7 seats",
    engine: "1500cc",
    total: "GHS 85,000",
    monthly: "GHS 990",
    images: ["img/sienta1.jpg", "img/sienta1.jpg"],
    specJA: ["Year: 2017", "Seats: 7", "Engine: 1500cc"],
    specEN: ["Year: 2017", "Seats: 7", "Engine: 1500cc"],
    planAJA: ["支払い完了後に所有", "シンプルで分かりやすい"],
    planAEN: ["Own after full payment", "Simple and easy to understand"],
    planBJA: ["月々の負担が軽い", "満了時：返却 / 更新 / 買い取り"],
    planBEN: ["Lower monthly burden", "End of term: return / renew / buyout"]
  },
  {
    rank: 3,
    cat: "compact",
    titleJA: "スズキ ワゴンR",
    titleEN: "Suzuki Wagon R",
    year: "2016",
    seats: "5 seats",
    engine: "660cc",
    total: "GHS 55,000",
    monthly: "GHS 650",
    images: ["img/wagonr1.jpg", "img/wagonr1.jpg"],
    specJA: ["Year: 2016", "Seats: 5", "Engine: 660cc"],
    specEN: ["Year: 2016", "Seats: 5", "Engine: 660cc"],
    planAJA: ["支払い完了後に所有", "シンプルで分かりやすい"],
    planAEN: ["Own after full payment", "Simple and easy to understand"],
    planBJA: ["月々の負担が軽い", "満了時：返却 / 更新 / 買い取り"],
    planBEN: ["Lower monthly burden", "End of term: return / renew / buyout"]
  }
];

/* =========================
   i18n
========================= */
let LANG = "ja";

const I18N = {
  ja: {
    heroSub: "教員向け カープログラム",
    tabAll: "すべて",
    tabCompact: "通勤・コンパクト",
    tabFamily: "ファミリー向け",
    msgTitle: "車は「買う」だけじゃありません。",
    msgSub: "まず車を見る。次にプランを見る。押し売りはしません。",
    mini1Title: "写真は実在",
    mini1Text: "実際の写真とスペックを掲載。",
    mini2Title: "手順はシンプル",
    mini2Text: "見て、納得したら WhatsApp で確認。",
    rankTitle: "今月のランキング",
    rankHint: "タップで写真（スワイプ）と詳細が開きます。",
    galleryHint: "写真は左右で切替（スワイプもOK）",
    monthlyLabel: "月々の目安",
    planA: "プランA（通常の分割払い）",
    planB: "プランB（スペシャル）",
    waBtn: "WhatsAppで相談する"
  },
  en: {
    heroSub: "Car program for teachers",
    tabAll: "All",
    tabCompact: "Commuter / Compact",
    tabFamily: "Family",
    msgTitle: "Cars are not only for buying.",
    msgSub: "First view the car. Then view the plan. No pushy sales.",
    mini1Title: "Real photos",
    mini1Text: "We show real photos and specs.",
    mini2Title: "Simple steps",
    mini2Text: "If you agree, confirm via WhatsApp.",
    rankTitle: "Monthly Ranking",
    rankHint: "Tap to open photos (swipe) and details.",
    galleryHint: "Swipe or tap arrows to change photos",
    monthlyLabel: "Estimated monthly",
    planA: "Plan A (Standard installment)",
    planB: "Plan B (Special)",
    waBtn: "Consult on WhatsApp"
  }
};

function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (I18N[LANG][key]) el.textContent = I18N[LANG][key];
  });
  document.getElementById("langLabel").textContent = (LANG === "ja") ? "JA" : "EN";
}

function tTitle(item){ return (LANG === "ja") ? item.titleJA : item.titleEN; }

/* =========================
   Render cards
========================= */
let FILTER = "all";

function renderCards(){
  const wrap = document.getElementById("cards");
  wrap.innerHTML = "";

  const list = DATA
    .filter(x => FILTER === "all" ? true : x.cat === FILTER)
    .sort((a,b)=>a.rank - b.rank);

  list.forEach(item=>{
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";

    const thumb = item.images?.[0] || "";
    card.innerHTML = `
      <div class="rankNum">${item.rank}</div>
      <img class="thumb" src="${thumb}" alt="thumb">
      <div class="cardMain">
        <div class="cardTitle">${tTitle(item)}</div>
        <div class="pills">
          <span class="pill">${item.year}</span>
          <span class="pill">${item.seats}</span>
          <span class="pill">${item.engine}</span>
          <span class="pill isNo">No.${item.rank}</span>
        </div>
      </div>
      <div class="chev">›</div>
    `;
    card.addEventListener("click", ()=>openModal(item));
    wrap.appendChild(card);
  });
}

/* =========================
   Modal
========================= */
const overlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const waBtn = document.getElementById("waBtn");
const waBtnModal = document.getElementById("waBtnModal");

let current = null;
let gIndex = 0;

function openModal(item){
  current = item;
  gIndex = 0;

  document.getElementById("mTitle").textContent = tTitle(item);

  // pills
  const pills = document.getElementById("mPills");
  pills.innerHTML = `
    <span class="pill">${item.year}</span>
    <span class="pill">${item.seats}</span>
    <span class="pill">${item.engine}</span>
  `;

  // spec
  const spec = (LANG === "ja") ? item.specJA : item.specEN;
  document.getElementById("mSpec").innerHTML = spec.map(x=>`<div>${x}</div>`).join("");

  // price
  document.getElementById("mTotal").textContent = `Total: ${item.total}`;
  document.getElementById("mMonthly").textContent = item.monthly;

  // plans
  const a = (LANG === "ja") ? item.planAJA : item.planAEN;
  const b = (LANG === "ja") ? item.planBJA : item.planBEN;
  document.getElementById("mPlanA").innerHTML = a.map(x=>`<li>${x}</li>`).join("");
  document.getElementById("mPlanB").innerHTML = b.map(x=>`<li>${x}</li>`).join("");

  setGalleryImage();

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden","false");
}

function closeModal(){
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden","true");
  current = null;
}

function setGalleryImage(){
  const img = document.getElementById("gImg");
  const src = current?.images?.[gIndex] || "";
  img.src = src;
}

document.getElementById("gPrev").addEventListener("click", ()=>{
  if (!current) return;
  gIndex = (gIndex - 1 + current.images.length) % current.images.length;
  setGalleryImage();
});

document.getElementById("gNext").addEventListener("click", ()=>{
  if (!current) return;
  gIndex = (gIndex + 1) % current.images.length;
  setGalleryImage();
});

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e)=>{
  if (e.target === overlay) closeModal();
});

/* swipe (mobile) */
let startX = 0;
document.getElementById("gImg").addEventListener("touchstart",(e)=>{
  startX = e.touches[0].clientX;
},{passive:true});
document.getElementById("gImg").addEventListener("touchend",(e)=>{
  const endX = e.changedTouches[0].clientX;
  const dx = endX - startX;
  if (Math.abs(dx) < 40) return;
  if (dx > 0) document.getElementById("gPrev").click();
  else document.getElementById("gNext").click();
},{passive:true});

/* =========================
   Tabs
========================= */
document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(b=>b.classList.remove("isActive"));
    btn.classList.add("isActive");
    FILTER = btn.getAttribute("data-filter");
    renderCards();
  });
});

/* =========================
   Language toggle
========================= */
document.getElementById("langToggle").addEventListener("click", ()=>{
  LANG = (LANG === "ja") ? "en" : "ja";
  applyI18n();
  renderCards();

  // モーダル開いてたら中身も更新
  if (current) openModal(current);
});

/* =========================
   WhatsApp action (あとで番号差し替え)
========================= */
const WHATSAPP_NUMBER = ""; // 例: "233XXXXXXXXX" (先頭の+は不要でもOK)
const WHATSAPP_TEXT_JA = "POINT & EXPORTの件で相談したいです。";
const WHATSAPP_TEXT_EN = "I'd like to ask about POINT & EXPORT.";

function openWhatsApp(){
  const text = (LANG === "ja") ? WHATSAPP_TEXT_JA : WHATSAPP_TEXT_EN;
  if (!WHATSAPP_NUMBER){
    alert("WhatsApp番号が未設定です。script.js の WHATSAPP_NUMBER を入れてください。");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

waBtn.addEventListener("click", openWhatsApp);
waBtnModal.addEventListener("click", openWhatsApp);

/* boot */
applyI18n();
renderCards();
