const skeleton = document.getElementById("detailSkeleton");
const content = document.getElementById("detailContent");
const loader = document.getElementById("topLoader");
const img = document.getElementById("productImage");

// progress bar animation
setTimeout(() => loader.style.width = "35%", 100);
setTimeout(() => loader.style.width = "70%", 400);
setTimeout(() => loader.style.width = "100%", 700);

setTimeout(() => {
  loader.style.opacity = "0";
  skeleton.style.display = "none";

  content.classList.remove("hidden");
  content.classList.add("show");

  if (products[id]) {
    img.src = products[id].image;
    document.getElementById("productName").textContent = products[id].name;
    document.getElementById("productDesc").textContent = products[id].desc;

    img.onload = () => img.classList.add("loaded");
  }
}, 900);

// ================= DATA PRODUK =================
const products = {
  // ====== BUMBU ======
  "bumbu-ayam": {
    name: "Bumbu Ayam Ungkep",
    image: "img/ayam.png",
    desc: "Bumbu ayam ungkep siap pakai dengan cita rasa gurih dan rempah meresap hingga ke dalam daging."
  },
  "bumbu-rendang": {
    name: "Bumbu Rendang",
    image: "img/rendang.png",
    desc: "Bumbu rendang khas Minang dengan rempah lengkap, cocok untuk daging sapi maupun ayam."
  },
  "bumbu-rawon": {
    name: "Bumbu Rawon",
    image: "img/rawon.png",
    desc: "Bumbu rawon dengan kluwek pilihan menghasilkan kuah hitam pekat dan rasa autentik."
  },
  "bumbu-soto": {
    name: "Bumbu Soto",
    image: "img/soto.png",
    desc: "Bumbu soto serbaguna dengan aroma segar dan rasa gurih yang pas."
  },

  // ====== MAKANAN ======
  "makanan-dimsum-ayam": {
    name: "Dimsum Ayam",
    image: "img/dimsuma.png",
    desc: "Dimsum ayam lembut dengan isian padat dan rasa gurih, cocok untuk camilan atau lauk."
  },
  "makanan-pangsit": {
    name: "Pangsit Kuah",
    image: "img/pangsit.png",
    desc: "Pangsit kuah hangat dengan isi gurih dan kuah kaldu yang nikmat."
  },
  "makanan-dimsum-udang": {
    name: "Dimsum Udang",
    image: "img/dimsumu.png",
    desc: "Dimsum udang premium dengan tekstur kenyal dan rasa udang yang kuat."
  },

  // ====== KUE ======
  "kue-nastar-bulat": {
    name: "Nastar Bulat",
    image: "img/nastarb.png",
    desc: "Kue nastar klasik berbentuk bulat dengan isian selai nanas manis dan lembut."
  },
  "kue-nastar-gulung": {
    name: "Nastar Gulung",
    image: "img/nastarg.png",
    desc: "Nastar gulung dengan tampilan cantik dan rasa nanas segar."
  },
  "kue-nastar-daun": {
    name: "Nastar Daun",
    image: "img/nastard.png",
    desc: "Nastar bentuk daun dengan tekstur lembut dan aroma mentega yang khas."
  },

  // ====== PAKAIAN ======
  "pakaian-muslim": {
    name: "Baju Muslim",
    image: "img/bajumuslim.png",
    desc: "Baju muslim nyaman dipakai, bahan adem dan desain elegan."
  },
  "pakaian-pria": {
    name: "Baju Pria",
    image: "img/bajupria.png",
    desc: "Baju pria kasual yang cocok untuk aktivitas sehari-hari."
  },
  "pakaian-wanita": {
    name: "Baju Wanita",
    image: "img/bajuwanita.png",
    desc: "Baju wanita dengan desain modern dan bahan lembut."
  },
  "pakaian-daster": {
    name: "Daster",
    image: "img/daster.png",
    desc: "Daster nyaman untuk di rumah dengan bahan ringan dan adem."
  },

  // ====== RUMAH ======
  "rumah-sprei": {
    name: "Sprei",
    image: "img/sprei.png",
    desc: "Sprei lembut dengan motif menarik untuk kenyamanan tidur."
  },
  "rumah-selimut": {
    name: "Selimut",
    image: "img/selimut.png",
    desc: "Selimut hangat dan ringan, cocok digunakan setiap hari."
  },
  "rumah-bantal": {
    name: "Bantal & Guling",
    image: "img/bantalguling.png",
    desc: "Bantal dan guling empuk untuk kualitas tidur yang lebih baik."
  },
  "rumah-kasur": {
    name: "Kasur",
    image: "img/kasur.png",
    desc: "Kasur nyaman dengan daya tahan tinggi dan desain ergonomis."
  }
};

// ================= AMBIL ID DARI URL =================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// ================= TAMPILKAN PRODUK =================
if (products[id]) {
  document.getElementById("productImage").src = products[id].image;
  document.getElementById("productName").textContent = products[id].name;
  document.getElementById("productDesc").textContent = products[id].desc;
} else {
  document.getElementById("productName").textContent = "Produk tidak ditemukan";
  document.getElementById("productDesc").textContent =
    "Produk yang Anda cari tidak tersedia.";
}

// ================= LOCAL STORAGE FUNCTIONS =================
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ================= ADD TO CART =================
const addToCartBtn = document.getElementById("addToCart");
const addToWishlistBtn = document.getElementById("addToWishlist");

if (products[id]) {
  addToCartBtn?.addEventListener("click", () => {
    let cart = getStorage("cart");

    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id,
        name: products[id].name,
        image: products[id].image,
        qty: 1
      });
    }

    setStorage("cart", cart);
    alert("Produk ditambahkan ke keranjang 🛒");
  });

  addToWishlistBtn?.addEventListener("click", () => {
    let wishlist = getStorage("wishlist");

    const alreadyExist = wishlist.find(item => item.id === id);

    if (!alreadyExist) {
      wishlist.push({
        id,
        name: products[id].name,
        image: products[id].image
      });

      setStorage("wishlist", wishlist);
      alert("Produk ditambahkan ke wishlist ❤️");
    } else {
      alert("Produk sudah ada di wishlist");
    }
  });
}