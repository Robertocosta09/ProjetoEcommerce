document.addEventListener('DOMContentLoaded', function () {
    let cartIcon = document.querySelector('#cart-icon');
    let cart = document.querySelector('.cart');
    let closeCart = document.querySelector('#close-cart');

    let cartItemCount = 0; // Variável para rastrear o número de itens no carrinho

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
        if (cartItemCount === 0) {
            alert("O carrinho está vazio. Adicione pelo menos um item antes de comprar.");
        } else {
            alert("Seu pedido está pronto");
            var cartContent = document.querySelector('.cart-content');
            while (cartContent.hasChildNodes()) {
                cartContent.removeChild(cartContent.firstChild);
            }
            updateTotal();
        }
    }

    function removeCartItem(event) {
        const buttonClicked = event.target;
        const cartBox = buttonClicked.parentElement;
        cartBox.remove(); // Remova apenas o elemento do carrinho clicado
        updateTotal();
        cartItemCount--; // Decrementar o contador quando um item é removido
        updateCartCounter(); // Atualizar o contador na imagem do carrinho
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
        var { innerText: title } = shopProducts.querySelector(".product-title");
        var { innerText: price } = shopProducts.querySelector(".price");
        var productImg = shopProducts.querySelector(".product-img").src;

        // Verificar se o item já está no carrinho
        var cartItems = document.querySelectorAll('.cart-product-title');
        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].innerText === title) {
                alert("Você já adicionou este item ao carrinho");
                return;
            }
        }

        addProductToCart(title, price, productImg);
        updateTotal();
        cartItemCount++; // Incrementar o contador quando um item é adicionado
        updateCartCounter(); // Atualizar o contador na imagem do carrinho
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
        let botaoComprar = document.getElementsByClassName("btn-buy")[0]; // Selecione o primeiro botão com a classe "btn-buy"
        botaoComprar.addEventListener('click', () => {
            Swal.fire({
                title: 'Parabéns!',
                text: 'Sua compra foi finalizada com sucesso!',
                icon: 'success',
                confirmButtonText: 'Obrigado'
            });
        });

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

    function updateCartCounter() {
        // Atualizar o texto na imagem do carrinho com o número de itens
        cartIcon.innerText = `Carrinho (${cartItemCount})`;
    }

    // Inicializar o contador com base nos itens já no carrinho (se houver)
    const cartItems = document.querySelectorAll('.cart-box');
    cartItemCount = cartItems.length;
    updateCartCounter();

});



