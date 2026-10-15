// 1) Ürün verisi
const urunler = [
  { id: 1, ad: "Filtre Kahve",    aciklama: "Günün çekirdeğiyle demleme",       fiyat: 70,  kat: "kahve" },
  { id: 2, ad: "Latte",           aciklama: "Çift shot espresso, buharlı süt",   fiyat: 95,  kat: "kahve" },
  { id: 3, ad: "Türk Kahvesi",    aciklama: "Közde, lokumla servis edilir",      fiyat: 65,  kat: "kahve" },
  { id: 4, ad: "Ice Latte",       aciklama: "Buzlu süt ve espresso",             fiyat: 100, kat: "soguk" },
  { id: 5, ad: "Ev Yapımı Limonata", aciklama: "Nane ve taze limon",             fiyat: 80,  kat: "soguk" },
  { id: 6, ad: "San Sebastian Cheesecake", aciklama: "Her gün taze, dilim",      fiyat: 130, kat: "tatli" },
  { id: 7, ad: "Brownie",         aciklama: "Bitter çikolata, ceviz",            fiyat: 90,  kat: "tatli" }
];

// 2) Durum (sepet) — id -> adet
let sepet = {};
let aktifKategori = "hepsi";

// 3) Elemanları seç
const urunListesi = document.getElementById("urunler");
const sepetListe  = document.getElementById("sepetListe");
const toplamEl    = document.getElementById("toplam");
const bildirimEl  = document.getElementById("bildirim");

// 4) Menüyü çiz
function menuyuCiz() {
  urunListesi.innerHTML = "";
  const gosterilecek = urunler.filter(u => aktifKategori === "hepsi" || u.kat === aktifKategori);

  gosterilecek.forEach(u => {
    const li = document.createElement("li");
    li.className = "urun";
    li.innerHTML = `
      <div>
        <h3>${u.ad}</h3>
        <p>${u.aciklama}</p>
      </div>
      <span class="fiyat">${u.fiyat} ₺</span>
      <button class="ekle" data-id="${u.id}">Ekle</button>
    `;
    urunListesi.appendChild(li);
  });
}

// 5) Sepeti çiz
function sepetiCiz() {
  sepetListe.innerHTML = "";
  let toplam = 0;
  const idler = Object.keys(sepet);

  if (idler.length === 0) {
    sepetListe.innerHTML = '<li class="bos">Sepetin boş.</li>';
  }

  idler.forEach(id => {
    const urun = urunler.find(u => u.id === Number(id));
    const adet = sepet[id];
    toplam += urun.fiyat * adet;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${adet} × ${urun.ad}</span>
      <button data-sil="${id}" aria-label="${urun.ad} ürününü çıkar">✕</button>
    `;
    sepetListe.appendChild(li);
  });

  toplamEl.textContent = toplam + " ₺";
}

function bildir(mesaj) {
  bildirimEl.textContent = mesaj;
  bildirimEl.classList.add("goster");
  setTimeout(() => bildirimEl.classList.remove("goster"), 2500);
}

// 6) Olaylar
urunListesi.addEventListener("click", e => {
  const id = e.target.dataset.id;
  if (!id) return;
  sepet[id] = (sepet[id] || 0) + 1;
  sepetiCiz();
});

sepetListe.addEventListener("click", e => {
  const id = e.target.dataset.sil;
  if (!id) return;
  sepet[id]--;
  if (sepet[id] <= 0) delete sepet[id];
  sepetiCiz();
});

document.getElementById("filtre").addEventListener("click", e => {
  if (!e.target.dataset.kat) return;
  aktifKategori = e.target.dataset.kat;
  document.querySelectorAll("#filtre button").forEach(b => b.classList.remove("aktif"));
  e.target.classList.add("aktif");
  menuyuCiz();
});

document.getElementById("temizle").addEventListener("click", () => {
  sepet = {};
  sepetiCiz();
});

document.getElementById("siparisVer").addEventListener("click", () => {
  if (Object.keys(sepet).length === 0) {
    bildir("Önce sepete bir şey ekle.");
    return;
  }
  sepet = {};
  sepetiCiz();
  bildir("Siparişin alındı, hazırlıyoruz!");
});

// Mobil menü
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const acik = nav.classList.toggle("acik");
  menuBtn.setAttribute("aria-expanded", acik);
});
nav.addEventListener("click", () => nav.classList.remove("acik"));

// İletişim formu kontrolü
document.getElementById("mesajForm").addEventListener("submit", e => {
  e.preventDefault();
  const ad = document.getElementById("ad").value.trim();
  const mesaj = document.getElementById("mesaj").value.trim();
  const hata = document.getElementById("formHata");

  if (ad === "" || mesaj === "") {
    hata.textContent = "Adını ve mesajını yazman gerekiyor.";
    return;
  }
  hata.textContent = "";
  e.target.reset();
  bildir("Mesajın bize ulaştı, teşekkürler!");
});

// Başlangıç
menuyuCiz();
sepetiCiz();
