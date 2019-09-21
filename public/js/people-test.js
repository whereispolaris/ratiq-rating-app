$(document).ready(function() {
  /* global moment */
  // blogContainer holds all of our users
  var blogContainer = $(".carousel");
  $(document).on("click", "button.edit", handleUserEdit);
  // userCategorySelect.on("change", handleCategoryChange);
  var users;

  // This function grabs users from the database and updates the view
  function getPeople() {
    $.get("/api/posts", function(data) {
      users = data;
      if (!users || !users.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // Getting the initial list of users
  getPeople();
  // InitializeRows handles appending all of our constructed user HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var usersToAdd = [];
    for (var i = 0; i < users.length; i++) {
      console.log(users[i]);
      usersToAdd.push(createNewRow(users[i]));
    }
    blogContainer.append(usersToAdd);
    M.Carousel.init(blogContainer[0], {});
    console.log(usersToAdd);
  }

  // // This function constructs a user's HTML
  function createNewRow(user) {
    var newUserCard = $("<div>");
    newUserCard.addClass("card");
    newUserCard.addClass("carousel-item");
    var newUserCardHeading = $("<div>");
    newUserCardHeading.addClass("card-header");
    var newUserTitle = $("<h4>");
    var newUserDate = $("<small>");

    var newUserCardBody = $("<div>");
    newUserCardBody.addClass("card-body");
    var newUserBody = $("<p>");
    newUserTitle.text(user.name + " ");
    newUserBody.text(user.email);

    newUserTitle.append(newUserDate);
    newUserCardHeading.append(newUserTitle);
    newUserCardBody.append(newUserBody);
    newUserCard.append(newUserCardHeading);
    newUserCard.append(newUserCardBody);
    newUserCard.data("user", user);

    newUserCard
      .append(
        $(`<form class="submitRating" class="s12">
      <input id="userName" type="hidden" name="userName" value="${user.email}"/>
    <select name="rating" class="stars">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
    </select>
    <div class="row commentContainer" style="display:flex">
      <div class="input-field  s6">
        <input id="input_text" type="text" name="comment" data-length="10" />
        <label for="input_text">Comment</label>
      </div>
      <div class="submit">
      <button type="submit" class="btn submit">
        Submit
      </button>
    </div>

  </form>`)
      )
      .on("submit", e => {
        onSubmit(e.target);
        return false;
      });
    newUserCard.find(".stars").barrating("show", {
      theme: "css-stars",
      initialRating: "1",
      showValues: true,
      showSelectedRating: false,
      allowEmpty: false
    });
    return newUserCard;
  }

  function handleUserEdit() {
    var currentUser = $(this)
      .parent()
      .parent()
      .data("user");
    window.location.href = "/cms?user_id=" + currentUser.id;
  }

  // This function displays a message when there are no users
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No users yet for this category, navigate <a href='/cms'>here</a> in order to create a new user."
    );
    blogContainer.append(messageH2);
  }
});
