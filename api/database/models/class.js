module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    instructor_id: DataTypes.INTEGER,
  }, {
    tableName: 'classes',
    pool: false,
    classMethods: {
      associate: (models) => {
        // associations are defined here
        models.Class.belongsTo(models.User, { as: 'Instructor', foreignKey: 'instructor_id' });
        models.Class.hasMany(models.Lesson, { foreignKey: 'class_id' });
        models.Class.belongsToMany(models.User, { as: 'Students', through: 'student_classes', foreignKey: 'class_id' });
      },
    },
  });
  Class.addScope('public', { attributes: ['id', 'title', 'description', 'instructor_id'] });
  return Class;
};
