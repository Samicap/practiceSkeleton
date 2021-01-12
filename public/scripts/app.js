const { user } = require("pg/lib/defaults");

$(() => { // get user items
  $.ajax({
    method: "GET",
    url: "/"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
      return user;
    }
  });;
});

// getAndRenderUsers();
// const getAndRenderUsers = function() {
//   $.ajax("/", { method: "GET" })
//   .then((response) => {
//     renderUsers(response);
//     });
// };

// const renderUsers = function (data) {
//   for (user of users) {
//     const userElement = thisUserIs(user);
//     $("users").appendTo(userElement);
//   }
// }

// const thisUserIs = function(data) {
//   const userElement = `
//   <div class=users>
//   <p>${data.user} </p>
//   </div>
//   `;
//   return $(userElement);
// }
