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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    bio: {
      type: DataTypes.STRING(160),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  // Don't forget to 'return' the post after defining
  return Post;
};
