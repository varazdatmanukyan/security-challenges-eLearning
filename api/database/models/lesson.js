module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    number: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    class_id: DataTypes.INTEGER,
  }, {
    tableName: 'lessons',
    classMethods: {
      associate: (models) => {
        // associations are defined here
        models.Lesson.belongsTo(models.Class, { foreignKey: 'class_id' });
      },
    },
  });

  Lesson.addScope('public', { attributes: ['id', 'number', 'title', 'body'] });
  return Lesson;
};
