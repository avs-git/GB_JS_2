function sendRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          reject();
        }
        const response = JSON.parse(xhr.responseText);

        resolve(response);
      }
    };
    xhr.send();
  });
}

function makeSimpleDom(tagName, innerHTML, className) {
  let tempElement = document.createElement(tagName);
  tempElement.className = className;
  tempElement.innerHTML = innerHTML;
  return tempElement;
}

class ItemsList {
  constructor() {
    this.items = [];
  }

  fetchItems() {
    return sendRequest('/goods')
      .then((items) => {
        return this.items = items;
      });
  }

  total() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }

  render() {
    return this.items.map((item) => new Item(item.id, item.title, item.price).render());
  }

}

class Item {
  constructor(id, title, price) {
    this.id = id;
    this.price = price;
    this.title = title;
    this.cartItem = new CartItem(this.id, this.title, this.price, cart);
  }

  render() {
    const $item = makeSimpleDom(
        'div',
        `<h3>${this.title}</h3><p>${this.price}</p>`,
        'item'
    );
    const $button = makeSimpleDom('button', 'добавить в корзину');
    $button.addEventListener('click', () => {
      cart.addToCart(this.cartItem);
    });
    $item.appendChild($button);
    return $item;
  }
}

const items = new ItemsList();
items.fetchItems().then(() => {
  items.render().forEach(item => {
    document.querySelector('.catalog').appendChild(item);
  });
});