
$(function() {
$(".change-devoured").on("click", function (event) {
  let id = $(this).data("id");
  let newDevoured = 1;
  const newDevouredState = {
      devoured: newDevoured
  }
  $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
  }).then(
      () => {
          location.reload();
      }
  )
});
$(".create-form").on("submit", event => {
  event.preventDefault();
  const newBurger = {
    name: $("#bg").val().trim(),
      devoured: 0
  }
  $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
  }).then(
      () => {
          location.reload();
      });
});
$(".delete-burger").on("click", function (event) {
  let id = $(this).data("id");
  // Send the DELETE request.
  $.ajax("/api/burgers/" + id, {
      type: "DELETE"
  }).then(
      () => {
          location.reload();
      }
  );
});
});
