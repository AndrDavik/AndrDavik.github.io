  const swiper = new Swiper('.feed__inner', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
      },
      slidesPerView: 3,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  const swiper2 = new Swiper('.carousel__inner', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    slidesPerView: 3,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });