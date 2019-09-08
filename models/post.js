module.exports = function (sequelize, DataTypes) {
  // Add code here to create a Post model
  const Post = sequelize.define("Post", {
    // This model needs a title, a body, and a category
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    },
  });

  // Don't forget to 'return' the post after defining
  return Post;
};
