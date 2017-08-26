"use strict";

module.exports = function(sequelize, DataTypes) {

  var Template = sequelize.define("Template", {
    title: DataTypes.STRING,
    templateJson: DataTypes.JSON
  });

  return Template;
};
