module.exports = function (sequelize, DataTypes) {
  // Add code here to create a Post model
  const Post = sequelize.define("User", {
    // This model needs a title, a body, and a category
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true,
      len: [1]
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    rating: {
      type: DataTypes.NUMBER,
      defaultValue: "Personal"
    },
  });

  // Don't forget to 'return' the post after defining
  return User;
};
