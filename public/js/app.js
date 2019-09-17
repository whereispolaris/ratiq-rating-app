$(function() {
  $(".stars").barrating("show", {
    theme: "css-stars",
    initialRating: "1",
    showValues: true,
    showSelectedRating: false,
    allowEmpty: false
  });

  const userId = "Sonmi";

  const ratingsRef = firebase.database().ref("/users/" + userId + "/ratings");
  ratingsRef.on("child_added", snapshot => {
    const { userName, rating, comment } = snapshot.val();
    $("#commentStream").prepend(
      `<div>From: ${userName}, Rating: ${rating}, Comment: ${comment}</div>`
    );
  });

  const totalRef = database.ref("/users/" + userId + "/total");
  totalRef.on("value", snapshot => {
    const data = snapshot.val();
    if (!data) {
      return;
    }
    const { count, sum } = data;
    $("#totals").text("Avg: " + sum / count + ", Count: " + count);
  });
});

function onSubmit() {
  const data = {};
  $("#submitRating")
    .serializeArray()
    .map(entry => (data[entry.name] = entry.value));

  database
    .ref("/users/" + data.userName)
    .child("ratings")
    .push(data).key;

  const totalRef = database.ref("/users/" + data.userName + "/total");
  totalRef.transaction(function(currentTotal) {
    if (!currentTotal) {
      return {
        count: 1,
        sum: parseInt(data.rating)
      };
    }
    return {
      count: currentTotal.count + 1,
      sum: currentTotal.sum + parseInt(data.rating)
    };
  });

  return false;
}
