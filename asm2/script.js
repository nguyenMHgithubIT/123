
// giỏ hàng
    // Khởi tạo giỏ hàng
    let cart = [];

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(productName, productPrice) {
        // Tìm sản phẩm trong giỏ hàng
        const productIndex = cart.findIndex(item => item.name === productName);
        if (productIndex > -1) {
            // Nếu sản phẩm đã có, tăng số lượng
            cart[productIndex].quantity++;
        } else {
            // Nếu chưa có, thêm sản phẩm mới
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        updateCartCount();
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    function updateCartCount() {
        const cartButton = document.querySelector('.open-cart');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartButton.textContent = `shopping cart(${totalItems})`;
    }

    // Hiển thị giỏ hàng
    function showCart() {
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart-container';

        const cartContent = cart.map((item, index) => `
        <div class="cart-item">
            <p>${item.name}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: ${item.price.toLocaleString()}đ</p>
            <p>Total: ${(item.price * item.quantity).toLocaleString()}đ</p>
            <button onclick="removeFromCart(${index})">delete</button>
        </div>
    `).join('');

        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        cartContainer.innerHTML = `
            <h2>shopping cart</h2>
            ${cartContent || '<p>Cart is empty</p>'}
            <h3>Total amount: ${totalPrice.toLocaleString()}đ</h3>
            <button onclick="closeCart()">Close cart</button>
            <button onclick="checkout()">Pay</button> <!-- Nút thanh toán -->
        `;

        document.body.appendChild(cartContainer);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    function removeFromCart(index) {
        if (cart[index]) {
            cart.splice(index, 1); // Xóa sản phẩm khỏi mảng
            updateCartCount(); // Cập nhật lại số lượng
            closeCart(); // Đóng giỏ hàng
            showCart(); // Hiển thị lại giỏ hàng
        }
    }

    // Đóng giỏ hàng
    function closeCart() {
        const cartContainer = document.querySelector('.cart-container');
        if (cartContainer) cartContainer.remove();
    }

    // Gắn sự kiện cho các nút
    document.addEventListener('DOMContentLoaded', () => {
        const productButtons = document.querySelectorAll('.add-to-cart');
        productButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const product = button.parentElement;
                const name = product.querySelector('h3').textContent;
                const priceText = product.querySelector('p').textContent;
                const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
                addToCart(name, price);
            });
        });

        const cartButton = document.querySelector('.open-cart');
        cartButton.addEventListener('click', showCart);
    });


    // nút thanh toán
    function checkout() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            // Kiểm tra thông tin người dùng đăng nhập
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (!loggedInUser) {
                alert("You need to log in first!");
                window.location.href = 'login.html';
                return;
            }
    
            // Lưu giỏ hàng vào localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
    
            // Chuyển đến trang checkout
            window.location.href = 'checkout.html';
        }
    }
    



    



    // tìm kiếm
    const products = [
        // asus
        { name: "Laptop Asus Vivobook S 14 OLED S5406MA", price: "24,000,000đ", image: "asus1.jpg" },
        { name: "Laptop Asus Vivobook 15 OLED A1505VA", price: "17,000,000đ", image: "asus2.jpg" },
        { name: "Laptop Asus Zenbook 14 OLED UX3405MA", price: "26,000,000đ", image: "asus3.jpg" },
        { name: "Laptop Asus Vivobook 15 X1504ZA", price: "9,000,000đ", image: "asus4.jpg" },

        // acer
        { name: "Laptop Acer Predator Helios Neo PHN16 71 53M7", price: "25,000,000đ", image: "acer1.jpg" },
        { name: "Laptop Acer Aspire Lite 14 51M 36PN", price: "9,000,000đ", image: "acer2.jpg" },
        { name: "Laptop Acer Aspire 3 A315 59 5283 ", price: "12,000,000đ", image: "acer3.jpg" },
        { name: "Laptop Acer Gaming Nitro V ANV15 51 55CA", price: "24,000,000đ", image: "acer4.jpg" },

        // lenovo
        { name: "Laptop Lenovo Ideapad Slim 3 15IAH8 i5 12450H/16GB/512GB", price: "13,000,000đ", image: "lenovo1.jpg" },
        { name: "Laptop Lenovo Gaming LOQ 15IAX9 i5 12450HX/16GB/512GB ", price: "21,000,000đ", image: "lenovo2.jpg" },
        { name: "Laptop Lenovo Ideapad Slim 5 14IAH8 i5 12450H/16GB/1TB", price: "16,000,000đ", image: "lenovo3.jpg" },
        { name: "Laptop Lenovo V14 G4 i7 1355U/16GB/512GB (83A00012VN)", price: "16,900,000đ", image: "lenovo4.jpg" },

        // macbook
        { name: "Laptop Apple MacBook Air 13 inch M2 8GB/256GB", price: "23,900,000đ", image: "macbook1.jpg" },
        { name: "Laptop MacBook Air 13 inch M3 16GB/256GB", price: "29,900,000đ", image: "macbook2.jpg" },
        { name: "Laptop Apple MacBook Air 13 inch M2 16GB/256GB", price: "26,900,000đ", image: "macbook3.jpg" },
        { name: "Laptop Apple MacBook Pro 14 inch M3 16GB/512GB", price: "40,000,000đ", image: "macbook4.jpg" },

        // hp
        { name: "Laptop HP 15 fd0234TU i5 1334U/16GB/512GB/Win11 (9Q969PA)", price: "15,000,000đ", image: "hp1.jpg" },
        { name: "Laptop HP 240 G9 i5 1235U/16GB/512GB/Win11 (AG2J7AT)", price: "14,000,000đ", image: "hp2.jpg" },
        { name: "Laptop HP Pavilion X360 14 ek2024TU Core 5 120U/16GB/512GB ", price: "24,000,000đ", image: "hp3.jpg" },
        { name: "Laptop HP Pavilion 15 eg3091TU i7 1355U/16GB/512GB", price: "21,000,000đ", image: "hp4.jpg" },

        // dell
        { name: "Laptop Dell Inspiron 15 3530 i5 1334U/16GB/512GB", price: "17,000,000đ", image: "dell1.jpg" },
        { name: "Laptop Dell Inspiron 15 3530 i7 1355U/16GB/512GB", price: "21,000,000đ", image: "dell2.jpg" },
        { name: "Laptop Dell Inspiron 15 3530 i5 1334U/16GB/512GB ", price: "18,000,000đ", image: "dell3.jpg" },
        { name: "Laptop Dell Inspiron 15 3520 i5 1235U/8GB/512GB", price: "15,000,000đ", image: "dell4.jpg" },

        
        //  bàm phím
        { name: "Bàn Phím iPad Pro Logitech Combo Touch 11 inch M4", price: "6,000,000đ", image: "bamphim1.jpg" },
        { name: "Bàn Phím iPad ESR Rebound Magnetic 360 ", price: "3,000,000đ", image: "bamphim2.jpg" },
        { name: "Bàn Phím Cơ Có Dây Gaming Razer Huntsman  ", price: "1,000,000đ", image: "bamphim3.jpg" },
        { name: "Bàn Phím iPad Logitech Combo Touch Gen 10TH ", price: "4,000,000đ", image: "bamphim4.jpg" },

        //chuột
        { name: "Chuột Không dây Logitech M185 ", price: "300,000đ", image: "chuot1.jpg" },
        { name: "Chuột Có dây Gaming Logitech G102 Gen2  ", price: "100,000đ", image: "chuot2.jpg" },
        { name: "Chuột Không dây Zadez M325 Tuxedo ", price: "400,000đ", image: "chuot3.jpg" },
        { name: "Chuột Có dây Gaming Rapoo V11s ", price: "200,000đ", image: "chuot4.jpg" },

        // tai nghe
        { name: "Tai nghe Bluetooth TWS Shokz OPENFIT AIR T511 ", price: "3,000,000đ", image: "tai nghe1.jpg" },
        { name: "Tai nghe Bluetooth truyền âm thanh Havit Hakii Light ", price: "700,000đ", image: "tai nghe2.jpg" },
        { name: "Tai nghe Có dây Gaming  HyperX Cloud Stinger Core", price: "800,000đ", image: "tai nghe3.jpg" },
        { name: "Tai nghe Bluetooth Chụp Tai JBL Tune 670NC", price: "2,200,000đ", image: "tai nghe4.jpg" },

        //  mic
        { name: "Micro có dây Zenbos MZ-328", price: "800,000đ", image: "mic1.jpg" },
        { name: "Micro có dây  HyperX DuoCast", price: "2,500,000đ", image: "mic2.jpg" },
        { name: "Cặp micro không dây Paramax WM-1800", price: "5,000,000đ", image: "mic3.jpg" },
        { name: "Micro không dây Pasion Echo", price: "1,900,000đ", image: "mic4.jpg" }

    ];
    
    function searchProduct() {
        const input = document.getElementById("search-input").value.toLowerCase();
        const productList = document.querySelector('.product-list');
        productList.innerHTML = ""; // Xóa danh sách sản phẩm hiện tại
    
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(input));
    
        if (filteredProducts.length === 0) {
            productList.innerHTML = "<p>No products found!</p>";
            return;
        }
    
        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <button class="add-to-cart" onclick="addToCart('${product.name}', ${parseInt(product.price.replace(/[^0-9]/g, ''))})">Buy Now</button>
            `;
            productList.appendChild(productCard);
        });
    }

    
    
    // nút trang chủ
    
    function loadProducts() {
        const productList = document.querySelector('.products');
        productList.innerHTML = ""; // Xóa nội dung hiện tại
    
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <button class="add-to-cart" onclick="addToCart('${product.name}', ${parseInt(product.price.replace(/[^0-9]/g, ''))})">Buy Now</button>
            `;
            productList.appendChild(productCard);
        });
    }
    
    function goToHome() {
        loadProducts(); // Tải lại danh sách sản phẩm
        document.getElementById("search-input").value = ""; // Xóa nội dung tìm kiếm
    }
    
    function searchProduct() {
        const input = document.getElementById("search-input").value.toLowerCase();
        const productList = document.querySelector('.products');
        productList.innerHTML = ""; // Xóa danh sách sản phẩm hiện tại
    
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(input));
    
        if (filteredProducts.length === 0) {
            productList.innerHTML = "<p>No products found!</p>";
            return;
        }
    
        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <button class="add-to-cart" onclick="addToCart('${product.name}', ${parseInt(product.price.replace(/[^0-9]/g, ''))})">Buy Now</button>
            `;
            productList.appendChild(productCard);
        });
    }
    
    // Gọi hàm loadProducts khi trang được tải
    document.addEventListener('DOMContentLoaded', () => {
        loadProducts(); // Tải những sản phẩm ban đầu
    });




    // lướt xuống để xem sản phẩm
    function scrollToProducts() {
        const productsSection = document.querySelector('.product-list');
        productsSection.scrollIntoView({ behavior: 'smooth' }); // Cuộn mượt mà đến phần sản phẩm
    }




    // click sản phẩm trong menu 
    function filterProducts(category) {
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const productName = product.querySelector('h3').innerText.toLowerCase();
            if (productName.includes(category.toLowerCase())) { // Chuyển đổi cả category và productName thành chữ thường
                product.style.display = 'block'; // Hiển thị sản phẩm
            } else {
                product.style.display = 'none'; // Ẩn sản phẩm
            }
        });
    }

    
   

    function showProducts() {
        document.getElementById('product-submenu').style.display = 'block'; // Hiển thị menu
    }
    
    function hideProducts() {
        document.getElementById('product-submenu').style.display = 'none'; // Ẩn menu
    }
    

    // phần liên hệ của menu
 
// Mở modal khi bấm vào Contact
function openContact() {
    document.getElementById('contactModal').style.display = 'block'; // Hiển thị modal
}

// Đóng modal khi bấm vào nút đóng
function closeContact() {
    document.getElementById('contactModal').style.display = 'none'; // Ẩn modal
}

// Đảm bảo modal sẽ ẩn khi bấm ra ngoài modal (vào vùng nền mờ)
window.onclick = function(event) {
    if (event.target == document.getElementById('contactModal')) {
        closeContact();
    }
}



// profile
function openProfileModal() {
    // Lấy thông tin người dùng từ localStorage
    const username = localStorage.getItem("username");
    const phone = localStorage.getItem("phone");

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (username && phone) {
        // Cập nhật thông tin trong modal
        document.getElementById("profile-username").innerText = username;
        document.getElementById("profile-phone").innerText = phone;

        // Hiển thị modal
        document.getElementById("profileModal").style.display = "block";
    } else {
        alert("No user information found. Please login.");
    }
}

function closeProfile() {
    // Đóng modal
    document.getElementById("profileModal").style.display = "none";
}




    




    
    


    


    


    





   
    




