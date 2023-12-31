document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('#cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#close-cart');
    const cartCountElement = document.querySelector('.cart-count');
    const buyButton = document.querySelector('.btn-buy');
    let cartItemCount = 0;

    cartIcon.addEventListener('click', () => {
        cart.classList.add("active");
    });

    closeCart.addEventListener('click', () => {
        cart.classList.remove("active");
    });

    const cartContent = document.querySelector('.cart-content');

    cartContent.addEventListener('click', (event) => {
        if (event.target.classList.contains('cart-remove')) {
            const cartBox = event.target.parentElement;
            cartBox.remove();
            updateTotal();
            cartItemCount--;
            updateCartCount();
        }
    });

    const quantityInputs = document.querySelectorAll(".cart-quantity");
    quantityInputs.forEach(input => {
        input.addEventListener("change", quantityChanged);
    });

    const addCartButtons = document.querySelectorAll('.add-cart');
    addCartButtons.forEach(button => {
        button.addEventListener("click", addCartClicked);
    });

    buyButton.addEventListener("click", () => {
        if (cartItemCount === 0) {
            Swal.fire({
                title: 'Carrinho Vazio',
                text: 'O carrinho está vazio. Adicione pelo menos um item antes de comprar.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Finalizar Compra',
                text: 'Tem certeza que deseja finalizar a compra?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Finalizar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Compra Finalizada!',
                        text: 'Seu pedido foi finalizado com sucesso.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    clearCart();
                    updateTotal();
                    cartItemCount = 0;
                    updateCartCount();
                }
            });
        }
    });

    function addCartClicked(event) {
        const button = event.target;
        const productBox = button.closest('.product-box');
        const title = productBox.querySelector(".product-title").innerText;
        const price = productBox.querySelector(".price").innerText;
        const productImg = productBox.querySelector(".product-img").src;

        const itemAlreadyInCart = Array.from(cartContent.children).some(item => {
            const cartTitle = item.querySelector('.cart-product-title').innerText;
            return cartTitle === title;
        });

        if (itemAlreadyInCart) {
            alert("Você já adicionou este item ao carrinho");
            return;
        }

        addProductToCart(title, price, productImg);
        updateTotal();
        cartItemCount++;
        updateCartCount();
    }

    function addProductToCart(title, price, productImg) {
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>`;
        cartContent.appendChild(cartBox);
    }

    function quantityChanged(event) {
        updateTotal();
    }

    function updateTotal() {
        let total = 0;
        const cartBoxes = document.querySelectorAll('.cart-box');
        cartBoxes.forEach(cartBox => {
            const priceElement = cartBox.querySelector('.cart-price');
            const quantityElement = cartBox.querySelector('.cart-quantity');
            const price = parseFloat(priceElement.innerText.replace("$", ""));
            const quantity = parseInt(quantityElement.value);
            total += price * quantity;
        });
        total = Math.round(total * 100) / 100;
        document.querySelector('.total-price').innerText = '$' + total;
    }

    function clearCart() {
        cartContent.innerHTML = '';  // Clear cart content
    }

    function updateCartCount() {
        cartCountElement.innerText = cartItemCount;
    }

    // Função para armazenar itens abandonados no carrinho no localStorage
    window.addEventListener('beforeunload', () => {
        const cartItems = document.querySelectorAll('.cart-box');
        const abandonedCart = [];

        cartItems.forEach(cartItem => {
            const title = cartItem.querySelector('.cart-product-title').innerText;
            const price = cartItem.querySelector('.cart-price').innerText;
            const quantity = cartItem.querySelector('.cart-quantity').value;
            const productImg = cartItem.querySelector('.cart-img').src;

            abandonedCart.push({
                title,
                price,
                quantity,
                productImg
            });
        });

        localStorage.setItem('abandonedCart', JSON.stringify(abandonedCart));
    });

    // Restaurar carrinho se houver itens abandonados
    const abandonedCartData = localStorage.getItem('abandonedCart');
    if (abandonedCartData) {
        const abandonedCart = JSON.parse(abandonedCartData);
        abandonedCart.forEach(item => {
            addProductToCart(item.title, item.price, item.productImg, item.quantity);
        });
        updateTotal();
        cartItemCount = abandonedCart.length;
        updateCartCount();
    }
});







