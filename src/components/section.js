export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  prependItem(item) {
    this._items = [item, ...this._items];
    this._renderItem(item, true);
  }

  appendItem(item) {
    this._items.push(item);
    this._renderItem(item, false);
  }

  _renderItem(item, isPrepend) {
    if (isPrepend) {
      this._container.prepend(this._renderer(item));
    } else {
      this._container.append(this._renderer(item));
    }
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this._clear();

    this._items.forEach((item) => this._renderItem(item, false));
  }
}
