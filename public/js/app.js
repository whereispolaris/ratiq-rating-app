const userId = "Sonmi";

$(function() {
  $(".stars").barrating("show", {
    theme: "css-stars",
    initialRating: "1",
    showValues: true,
    showSelectedRating: false,
    allowEmpty: false
  });

  const ratingsRef = database.ref("/users/" + userId + "/ratings");
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
  const ratedUserName = data.userName;
  data.userName = userId; // this is used as a rater's id here, also the owner of the profile page.
  database
    .ref("/users/" + ratedUserName)
    .child("ratings")
    .push(data).key;

  const totalRef = database.ref("/users/" + ratedUserName + "/total");
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
