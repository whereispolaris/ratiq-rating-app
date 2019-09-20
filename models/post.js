var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  // Add code here to create a Post model
  const Post = sequelize.define("Post", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING(160),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
 // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
 Post.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password
Post.addHook("beforeCreate", function(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});
  // Don't forget to 'return' the post after defining
  return Post;
};
