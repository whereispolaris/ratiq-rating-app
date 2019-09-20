$(document).ready(function() {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    $(".applogo > span").each((i, e) =>
      $(e).css({
        transform:
          "translate(0%, " +
          0.25 * parseFloat($(e).data("speed")) * Math.pow(y, 0.55) +
          "%)",
        transition: "transform 1s ease"
      })
    );
  });
});
