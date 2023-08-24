// Certifique-se de que o código seja executado após o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {

    // Selecione os elementos do DOM
    let cartIcon = document.querySelector('#cart-icon');
    let cart = document.querySelector('.cart');
    let closeCart = document.querySelector('#close-cart');

    // open cart
    cartIcon.onclick = () => {
        cart.classList.add("active");
    };
    //close cart
    closeCart.onclick = () => {
        cart.classList.remove("active");
    };

    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", ready);
    } else {
        ready();
    }

    function ready() {
        //remove itens from cart
        var removeCartButtons = document.getElementsByClassName('cart-remove')
        console.log(removeCartButtons)
        for (var i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i]
            button.addEventListener("click", removeCartItem)

        }
        //Quantity changes
        var quantityInputs = document.getElementsByClassName("cart-quantity");
        for (var i = 0; i < quantityInput.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener("change", quantityChanged);
        }
    }

    //Remove items from cart
    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.remove();
        updatetotal()
    }

    //Update Total
    function updatetotal() {
        var cartContent = document.getElementsByClassName('cart-content')[0]
        var cartBoxes = cartContent.getElementsByClassName('cart-box')
        var total = 0
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i]
            var priceElement = cartBox.getElementsByClassName('cart-price')[0]
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
            var price = parseFloat(priceElement.innerText.replace("$", ""))
            var quantity = quantityElement.value;
            total = total + (price * quantity);

            document.getElementsByClassName('total-price')[0].innerText = '$' + total;
        }
    }
}

