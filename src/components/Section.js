export default class Section {
  constructor({ data, renderer }, container) {
    this._items = data;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }
}
