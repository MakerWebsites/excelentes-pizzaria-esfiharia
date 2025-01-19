let cart = [];
let cartCount = 0;
let cartTotal = 0;

function addToCart(name, price, formattedPrice, quantity) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, formattedPrice, quantity });
    }

    cartCount += quantity;
    cartTotal += price * quantity;

    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("cart-total").innerText = cartTotal.toFixed(2).replace(".", ",");

    updateCartDetails();
}

function updateCartDetails() {
    let cartDetails = "";
    cart.forEach(item => {
        cartDetails += `${item.name} - ${item.quantity} vez(es) - ${item.formattedPrice} cada\n`;
    });

    const cartSummary = `Itens do Carrinho:\n${cartDetails}Total: R$ ${cartTotal.toFixed(2).replace(".", ",")}`;

    document.getElementById("order-form").onsubmit = function(event) {
        event.preventDefault();
        
        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;
        const numero = document.getElementById("numero").value;
        const bairro = document.getElementById("bairro").value;
        const cep = document.getElementById("cep").value;
        const paymentMethod = document.getElementById("payment-method").value;
        const troco = paymentMethod === "dinheiro" ? document.getElementById("troco").value : "";

        const message = `Nome: ${nome}\nEndereço: ${endereco}, ${numero}, ${bairro}, ${cep}\nForma de Pagamento: ${paymentMethod}\nTroco: ${troco}\n\n${cartSummary}`;

        const whatsappUrl = `https://wa.me/551234567890?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };
}

document.getElementById("toggle-menu").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
});

const paymentMethod = document.getElementById("payment-method");
paymentMethod.addEventListener("change", function() {
    if (this.value === "dinheiro") {
        document.getElementById("troco-div").style.display = "block";
    } else {
        document.getElementById("troco-div").style.display = "none";
    }
});
