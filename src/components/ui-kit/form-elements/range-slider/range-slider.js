/* eslint-disable no-undef */
import 'ion-rangeslider/js/ion.rangeSlider.min';

import './range-slider.scss';

(() => {
  $('.js-range-slider').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 15800,
    from: 5000,
    to: 10000,
  });

  $('.js-range-slider').on('change', () => {
    const $valueFrom = $('.irs-from').text();
    const $valueTo = $('.irs-to').text();
    const $valuesRange = `${$valueFrom} ₽ - ${$valueTo} ₽`;

    $('.range-slider__caption-right').text($valuesRange);
  });
})();
