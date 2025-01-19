const cart = [];

function addToCart(itemName, itemPrice) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
        cart[itemIndex].totalPrice = cart[itemIndex].quantity * itemPrice;
    } else {
        cart.push({ name: itemName, quantity: 1, price: itemPrice, totalPrice: itemPrice });
    }
    updateCart();
}

function removeFromCart(itemName) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }
    updateCart();
}

function changeQuantity(itemName, change) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].totalPrice = cart[itemIndex].quantity * cart[itemIndex].price;
        }
    }
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.totalPrice;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            ${item.quantity}x ${item.name} - R$${item.totalPrice.toFixed(2).replace('.', ',')}
            <button onclick="changeQuantity('${item.name}', -1)">-</button>
            <button onclick="changeQuantity('${item.name}', 1)">+</button>
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        `;
        cartItemsDiv.appendChild(cartItem);
    });
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total: R$${total.toFixed(2).replace('.', ',')}`;
}

function toggleChangeField() {
    const paymentMethod = document.getElementById('payment-method').value;
    const changeField = document.getElementById('change-field');
    if (paymentMethod === 'dinheiro') {
        changeField.style.display = 'block';
    } else {
        changeField.style.display = 'none';
    }
}

function submitOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('number').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const cep = document.getElementById('cep').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const change = document.getElementById('change').value;

    if (!name || !address || !number || !neighborhood || !cep || !paymentMethod) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let orderSummary = `
*Nome:* ${name}\n
*Endereço:* ${address}, ${number}, ${neighborhood} - *CEP:* ${cep}\n
*Forma de pagamento:* ${paymentMethod}\n
`;

    if (paymentMethod === 'dinheiro' && change) {
        orderSummary += `Troco para: R$${change}\n`;
    }

    orderSummary += "\nItens do pedido:\n";
    let total = 0; // Inicialize o total

    // Adiciona os itens do carrinho ao resumo do pedido e calcula o total
    cart.forEach(item => {
        orderSummary += `${item.quantity}x ${item.name} - R$${item.totalPrice.toFixed(2).replace('.', ',')}\n`;
        total += item.totalPrice; // Adiciona o preço total de cada item
    });

    orderSummary += `\n*Total:* R$${total.toFixed(2).replace('.', ',')}\n`; // Adiciona o total do pedido

    const whatsappMessage = encodeURIComponent(orderSummary);
    const whatsappUrl = `https://wa.me/5511968559541?text=${whatsappMessage}`; // Substitua pelo número do WhatsApp
    window.open(whatsappUrl, '_blank');

    cart.length = 0;
    updateCart();
}