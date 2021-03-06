let userId = Cookies.get("email");
if (userId) {
  userId = userId.replace(/@.*/, "");
  $(function() {
    $(".loggedInUser").text(userId);

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
      const getAvgScore = sum / count;
      const mainScore = getAvgScore.toFixed(3).slice(0, 3);
      const decimalScore = getAvgScore.toFixed(3).slice(3, 5);
      $("#integerPart").text(mainScore);
      $("#fractionalPart").text(decimalScore);
      // $("#totals").text("Avg: " + sum / count + ", Count: " + count);
    });
  });

  function onSubmit(form) {
    const data = {};
    $(form)
      .serializeArray()
      .map(entry => (data[entry.name] = entry.value));
    const ratedUserName = data.userName.replace(/@.*/, "");
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
}
