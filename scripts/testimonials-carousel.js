jQuery(function ($) {
  $("#clientTestimonials").owlCarousel({
    loop: true,
    center: true,
    items: 3,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    dots: true,
    nav: true,
    navText: ["‹", "›"],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1170: {
        items: 3,
      },
    },
  });
});
