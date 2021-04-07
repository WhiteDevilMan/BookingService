import './dropdown-options.scss';
import { Dropdown } from '../Dropdown.js';

class DropdownOptions extends Dropdown {
  increment(event) {
    super.increment(event);
    this._selectionText.innerText = updateDropdownOptionsSelectionText(this);
  }

  decrement(event) {
    super.decrement(event);
    this._selectionText.innerText = updateDropdownOptionsSelectionText(this);
  }
}

let dropdownOptions = document.querySelector('#dropdown-options');
new DropdownOptions(dropdownOptions);

function updateDropdownOptionsSelectionText(thisObj) {

  const bedroomsCounter = thisObj._dropdownCounters[0].innerText;
  const bedsCounter = thisObj._dropdownCounters[1].innerText;
  const bathroomsCounter = thisObj._dropdownCounters[2].innerText;

  let bedrooms = 'спален';
  switch (bedroomsCounter) {
    case '1':
      bedrooms = 'спальня';
      break;
    case '2':
    case '3':
    case '4':
      bedrooms = 'спальни';
      break;
  }

  let beds = 'кроватей';
  switch (bedsCounter) {
    case '1':
      beds = 'кровать';
      break;
    case '2':
    case '3':
    case '4':
      beds = 'кровати';
      break;
  }

  let baths = 'ванн';
  switch (bathroomsCounter) {
    case '1':
      baths = 'ванна';
      break;
    case '2':
    case '3':
    case '4':
      baths = 'ванны';
      break;
  }

  if (bedroomsCounter > 0 && bedsCounter > 0 && bathroomsCounter > 0) {
    return `${bedroomsCounter} ${bedrooms}, ${bedsCounter} ${beds}, ${bathroomsCounter} ${baths}`;
  }
  if (bedroomsCounter > 0 && bedsCounter > 0) {
    return `${bedroomsCounter} ${bedrooms}, ${bedsCounter} ${beds}`;
  }
  if (bedroomsCounter > 0 && bathroomsCounter > 0) {
    return `${bedroomsCounter} ${bedrooms}, ${bathroomsCounter} ${baths}`;
  }
  if (bedsCounter > 0 && bathroomsCounter > 0) {
    return `${bedsCounter} ${beds}, ${bathroomsCounter} ${baths}`;
  }
  if (bedroomsCounter > 0) {
    return `${bedroomsCounter} ${bedrooms}`;
  }
  if (bedsCounter > 0) {
    return `${bedsCounter} ${beds}`;
  }
  if (bathroomsCounter > 0) {
    return `${bathroomsCounter} ${baths}`;
  }

  return 'Удобства';
}