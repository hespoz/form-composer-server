"use strict";

module.exports = function(sequelize, DataTypes) {

  var Template = sequelize.define("Template", {
    templateJson: DataTypes.JSON
  });

  return Template;
};
