class HvrSlider {
  constructor(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      if (el.querySelectorAll('img').length > 1) {
        const hvr = document.createElement('div');
        hvr.classList.add('hvr');

        const hvrImages = document.createElement('div');
        hvrImages.classList.add('hvr__images');
        hvr.appendChild(hvrImages);

        const hvrSectors = document.createElement('div');
        hvrSectors.classList.add('hvr__sectors');
        hvrImages.appendChild(hvrSectors);

        const hvrDots = document.createElement('div');
        hvrDots.classList.add('hvr__dots');
        hvr.appendChild(hvrDots);

        el.parentNode.insertBefore(hvr, el);
        hvrImages.prepend(el);

        const hvrImagesArray = hvr.querySelectorAll('img');
        hvrImagesArray.forEach(() => {
          hvrSectors.insertAdjacentHTML('afterbegin', '<div class="hvr__sector"></div>');
          hvrDots.insertAdjacentHTML('afterbegin', '<div class="hvr__dot"></div>');
        });
        hvrDots.firstChild.classList.add('hvr__dot--active');

        const setActiveEl = function (targetEl) {
          const index = [...hvrSectors.children].indexOf(targetEl);
          hvrImagesArray.forEach((img, idx) => {
            if (index === idx) {
              img.style.display = 'block';
            } else {
              img.style.display = 'none';
            }
          });
          hvr.querySelectorAll('.hvr__dot').forEach((dot, idx) => {
            if (index === idx) {
              dot.classList.add('hvr__dot--active');
            } else {
              dot.classList.remove('hvr__dot--active');
            }
          });
        };

        hvrSectors.addEventListener('mouseover', function (e) {
          if (e.target && e.target.matches('.hvr__sector')) {
            setActiveEl(e.target);
          }
        });

        hvrSectors.addEventListener('touchmove', function (e) {
          const position = e.changedTouches[0];
          const target = document.elementFromPoint(position.clientX, position.clientY);
          if (target && target.matches('.hvr__sector')) {
            setActiveEl(target);
          }
        });

        hvrSectors.addEventListener('mouseout', function () {
          // Установите первую картинку активной (переключите классы или стили в зависимости от вашей реализации)
          hvrImagesArray[0].style.display = 'block';

          // Установите первую точку активной
          hvrDots.children[0].classList.add('hvr__dot--active');

          // Удалите активные классы/стили с других картинок и точек (если они есть)
          for (let i = 1; i < hvrImagesArray.length; i++) {
            hvrImagesArray[i].style.display = 'none';
            hvrDots.children[i].classList.remove('hvr__dot--active');
          }
        });
      }
    });
  }
}