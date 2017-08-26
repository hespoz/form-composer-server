var express = require('express');
var models  = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  models.Template.findAll({}).then(function(templates) {
    console.log(templates);
    res.json(templates);
  });


});

router.post('/', function(req, res, next) {
   models.Template.create({
     templateJson: JSON.stringify(req.body)
   }).then(function() {
     res.send('respond with a resource save');
   });
});

router.put('/:templateId', function(req, res, next) {
   models.Template.update(
      { templateJson: JSON.stringify(req.body)},
      { where: { id : req.params.templateId }}
   ).then(function() {
       res.send("Project with id =1 updated successfully!");
   }).catch(function(err) {
       console.log(err);
       res.send("Project update failed !");
   });
});

router.delete('/:templateId', function (req, res) {
  models.Template.destroy({
    where: {
      id: req.params.templateId
    }
  }).then(function() {
   res.send('respond with a resource save');
  });
});


module.exports = router;
