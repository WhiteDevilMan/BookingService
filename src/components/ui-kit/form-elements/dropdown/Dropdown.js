/* eslint-disable no-plusplus */
function setCounterValue(act, event) {
  const itemControls = event.target.closest('.js-dropdown__item-controls');
  const decrementButton = itemControls.querySelector('.js-dropdown__button-decrement');
  const counter = itemControls.querySelector('.js-dropdown__counter');
  let counterValue = Number(counter.value);

  if (act === 'increment') {
    counter.value = ++counterValue;
    decrementButton.classList.add('dark');
  }

  if (act === 'decrement') {
    if (counter.value !== '0') {
      counter.value = --counterValue;
      if (counter.value === '0') {
        decrementButton.classList.remove('dark');
      }
    }
  }
}

export default class Dropdown {
  constructor(elem) {
    if (elem === null) return;
    this.elem = elem;
    this.ddBlock = elem.querySelector('.js-dropdown__block');
    this.selectionText = elem.querySelector('.js-dropdown__selection-text');
    this.menu = elem.querySelector('.js-dropdown__menu');
    this.dropdownCounters = elem.querySelectorAll('.js-dropdown__counter');
    this.elem.onclick = this.onClick.bind(this);
    this.initListeners();
  }

  initListeners() {
    const blockTop = this.elem.querySelector('.js-dropdown__block_top');
    blockTop.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        this.showHide();
      }
    });
  }

  onClick(event) {
    const action = event.target.dataset.ddAction;
    if (action) {
      this.action = action;
      this[action](event);
    }
  }

  showHide() {
    this.menu.hidden = !this.menu.hidden;
    this.ddBlock.classList.toggle('menu-open');
  }

  increment(event) {
    setCounterValue(this.action, event);
  }

  decrement(event) {
    setCounterValue(this.action, event);
  }
}
