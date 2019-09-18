$(document).ready(function () {
    /* global moment */
    // blogContainer holds all of our users
    var blogContainer = $(".blog-container");
    $(document).on("click", "button.edit", handleUserEdit);
    // userCategorySelect.on("change", handleCategoryChange);
    var users;

    // This function grabs users from the database and updates the view
    function getPeople() {
        $.get("/api/posts", function (data) {
            users = data;
            if (!users || !users.length) {
                displayEmpty();
            }
            else {
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
        console.log(usersToAdd);
    }

    // // This function constructs a user's HTML
    function createNewRow(user) {
        var newUserCard = $("<div>");
        newUserCard.addClass("card");
        var newUserCardHeading = $("<div>");
        newUserCardHeading.addClass("card-header");
        var newUserTitle = $("<h2>");
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
        messageH2.html("No users yet for this category, navigate <a href='/cms'>here</a> in order to create a new user.");
        blogContainer.append(messageH2);
    }

});