let cart = 0;
const boxes = document.querySelectorAll(".box");
const cartBadge = document.querySelector(".cart-badge");

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-icon");

const modal = document.createElement("div");
modal.classList.add("modal");

modal.innerHTML = `
<div class="modal-box">
    <span id="close">&times;</span>
    <img id="modal-img">
    <h3 id="modal-title"></h3>
</div>
`;

document.body.appendChild(modal);

const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const closeBtn = document.getElementById("close");



const relatedImages = {
    "clothes": ["box1_image.jpg", "box8_image.jpg"],
    "health & personal care": ["box2_image.jpg"],
    "furniture": ["box3_image.jpg", "box7_image.jpg"],
    "electronics": ["box4_image.jpg", "box7_image.jpg", "box8_image.jpg"],
    "beauty picks": ["box5_image.jpg"],
    "pet care": ["box6_image.jpg"],
    "new arrival": ["box7_image.jpg"],
    "fashion": ["box8_image.jpg", "box1_image.jpg"]
};



boxes.forEach(box => {
    box.addEventListener("click", () => {

        let title = box.querySelector("h2").innerText;
        let img = box.querySelector(".box-img").style.backgroundImage;
        let url = img.replace('url("', '').replace('")', '');


        cartBadge.innerText = cart;

        modal.style.display = "flex";
        modalImg.src = url;
        modalTitle.innerText = title;
    });
});



closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});



searchBtn.addEventListener("click", () => {

    let value = searchInput.value.toLowerCase().trim();

    let foundKey = Object.keys(relatedImages).find(key =>
        key.includes(value)
    );

    if (!foundKey) {
        alert("Product not found");
        return;
    }

    let images = relatedImages[foundKey];

    let newTab = window.open("", "_blank");

    newTab.document.write(`
        <html>
        <head>
            <title>${foundKey.toUpperCase()}</title>
           
        </head>

        <body>

            <h1>${foundKey.toUpperCase()}</h1>

            <img class="main-img" src="${images[0]}" />

            <h3>Related Products</h3>

            <div class="grid">
                ${images.map(img => `<img src="${img}">`).join("")}
            </div>

        </body>
        </html>
    `);
});






// ===============================
// USER INFO (ONLY ONCE)
// ===============================
if (!localStorage.getItem("userInfo")) {
    let name = prompt("Enter your Name:");
    let address = prompt("Enter your Address:");
    let phone = prompt("Enter your Phone Number:");

    localStorage.setItem("userInfo", JSON.stringify({
        name,
        address,
        phone
    }));
}

// ===============================
// WAIT UNTIL PAGE LOAD (IMPORTANT FIX)
// ===============================
window.addEventListener("DOMContentLoaded", () => {

    let cart = 0;
    const cartBadge = document.querySelector(".cart-badge");
    const buyButtons = document.querySelectorAll(".buy-btn");

    // show initial cart
    cartBadge.innerText = cart;

    // BUY NOW FUNCTION
    buyButtons.forEach(btn => {
        btn.addEventListener("click", function (event) {

            event.stopPropagation();

            cart++;
            cartBadge.innerText = cart;

            const oldText = this.innerText;
            this.innerText = "Added ✓";
            this.style.backgroundColor = "green";

            alert("Product Added to Cart!");

            setTimeout(() => {
                this.innerText = oldText;
                this.style.backgroundColor = "";
            }, 1000);
        });
    });

});


