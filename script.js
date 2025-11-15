// قراءة المنتجات المخزنة
let products = JSON.parse(localStorage.getItem("products") || "[]");

const container = document.getElementById("products");
if (container) renderStore();


// =================================================
//        🔥 إنشاء كروت المنتجات بشكل احترافي
// =================================================
function renderStore() {
    container.innerHTML = "";

    products.forEach((product, i) => {
        let firstImg = product.images[0];
        let secondImg = product.images[1] || product.images[0];

        container.innerHTML += `
            <div class="card product-card" data-index="${i}">
                <div class="img-box">
                    <img src="${firstImg}" class="img-main" />
                    <img src="${secondImg}" class="img-hover" />
                </div>

                <div class="card-info">
                    <p>${product.name}</p>
                    <p class="price">${product.price} DA</p>
                </div>

                <button class="shop-now">Shop now</button>
            </div>
        `;
    });

    activateHover();
}



// =================================================
//   🔥 نظام احترافي لاستعراض الصور عند الـ Hover
// =================================================
function activateHover() {
    document.querySelectorAll(".product-card").forEach(card => {
        let index = card.dataset.index;
        let imgs = products[index].images;

        let imgMain = card.querySelector(".img-main");
        let imgHover = card.querySelector(".img-hover");

        let current = 1;
        let interval;

        // عند وضع الماوس → تشغيل السلايد شو
        card.addEventListener("mouseenter", () => {
            if (imgs.length <= 1) return;

            interval = setInterval(() => {
                imgHover.src = imgs[current];
                imgHover.style.opacity = 1;
                imgMain.style.opacity = 0;

                current++;
                if (current >= imgs.length) current = 1;

            }, 600);
        });

        // عند الخروج بالماوس → رجوع طبيعي للصورة الأولى
        card.addEventListener("mouseleave", () => {
            clearInterval(interval);

            imgHover.style.opacity = 0;
            imgMain.style.opacity = 1;
        });
    });
}
