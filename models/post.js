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
      // validate: {
      //   isAlpha: true
      // }
    }
  });

  // Don't forget to 'return' the post after defining
  return Post;
};



/*
module.exports = function (sequelize, DataTypes) {
  // Add code here to create a Post model
  const Post = sequelize.define("User", {
    // This model needs a title, a body, and a category
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    rating: {
      type: DataTypes.NUMBER,
      defaultValue: "5",
      allowNull: false
    },
  });

  // Don't forget to 'return' the post after defining
  return User;
};

*/
