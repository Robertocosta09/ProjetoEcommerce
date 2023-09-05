document.addEventListener('DOMContentLoaded', function () {
    let cartIcon = document.querySelector('#cart-icon');
    let cart = document.querySelector('.cart');
    let closeCart = document.querySelector('#close-cart');

    cartIcon.onclick = () => {
        cart.classList.add("active");
    };

    closeCart.onclick = () => {
        cart.classList.remove("active");
    };

    var removeCartButtons = document.querySelectorAll('.cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.querySelectorAll(".cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addcart = document.querySelectorAll('.add-cart');
    for (var i = 0; i < addcart.length; i++) {
        var button = addcart[i];
        button.addEventListener("click", addcartClicked);
    }

    document.querySelector('.btn-buy').addEventListener("click", buyButtonClicked);

    function buyButtonClicked() {
        alert("Seu pedido está pronto");
        var cartContent = document.querySelector('.cart-content');
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    }

    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove(); // Corrigido para remover o elemento pai correto
        updateTotal();
    }

    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
    }

    function addcartClicked(event) {
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.querySelector(".product-title").innerText;
        var price = shopProducts.querySelector(".price").innerText;
        var productImg = shopProducts.querySelector(".product-img").src;
        addProductToCart(title, price, productImg);
        updateTotal();
    }

    function addProductToCart(title, price, productImg) {
        var cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');
        var cartItems = document.querySelector('.cart-content');
        var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
        for (var i = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText === title) {
                alert("Você já adicionou este item ao carrinho");
                return;
            }
        }

        var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>`;
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
        cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
    }

    function updateTotal() {
        var cartContent = document.querySelector('.cart-content');
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var total = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.querySelector('.cart-price');
            var quantityElement = cartBox.querySelector('.cart-quantity');
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;
            total = total + (price * quantity);
        }
        total = Math.round(total * 100) / 100;

        document.querySelector('.total-price').innerText = '$' + total;
    }
    // Função para armazenar dados no localStorage
    function salvarDadosChaveValor(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    // Função para recuperar dados do localStorage
    function recuperarDadosChaveValor(chave) {
        const valor = localStorage.getItem(chave);
        return valor ? JSON.parse(valor) : null;
    }

    // Recupere os dados armazenados ou crie um novo objeto vazio
    const dadosArmazenados = recuperarDadosChaveValor("dadosUsuario") || {};

    // Use os dados armazenados (por exemplo, exiba o nome do usuário)
    if (dadosArmazenados.nome) {
        console.log("Nome do usuário armazenado:", dadosArmazenados.nome);
    } else {
        console.log("Nenhum nome de usuário encontrado.");
    }




    ;
});
