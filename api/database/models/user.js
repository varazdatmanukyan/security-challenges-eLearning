
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM('I', 'S'),
  }, {
    pool: false,
    tableName: 'users',
    classMethods: {
      associate: (models) => {
        // associations are defined here
        models.User.hasMany(models.Class, { foreignKey: 'instructor_id' });
        models.User.belongsToMany(models.Class, { as: 'RegisteredClasses', through: 'student_classes', foreignKey: 'user_id' });
      },
    },
  });


  User.addScope('public', { attributes: ['firstname', 'lastname', 'username', 'email', 'role', 'id'] });

  // hook to hash password before inserting

  User.beforeCreate(user => (
    bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
    })
  ));

  return User;
};
