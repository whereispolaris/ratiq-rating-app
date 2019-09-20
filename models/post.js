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
    }
  });

  // Don't forget to 'return' the post after defining
  return Post;
};
