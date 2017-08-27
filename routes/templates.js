var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    models.Template.findAll({}).then(function (templates) {
        res.json(templates);
    });
});

router.post('/', function (req, res, next) {
    try {
        console.log(req.body)
        let newRecord = req.body;

        models.Template.upsert({
            id:newRecord.id,
            title:newRecord.title,
            templateJson: newRecord.templateJson
        }).then(function(test){
            res.json({
                message: "Template created"
            });
        }).catch(function(err){
            console.log(err)
            res.status(500).json({
                message: "Error creating template"
            });
        });

        /*if(newRecord.id !== null && newRecord.id !== undefined){



            models.Template.findById(newRecord.id).then(function(template){
                template.updateAttributes({
                    title:template.title,
                    templateJson:template.templateJson
                });
            }).catch(function(error){

            });

        } else {
            models.Template.create({
                title: newRecord.title,
                templateJson: JSON.stringify(newRecord.templateJson)
            }).then(function () {
                res.json({
                    message: "Template created"
                });
            }).catch(function () {
                res.json({
                    message: "Error creating template"
                });
            });
        }
*/

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error creating template"
        });
    }

});

router.get('/:templateId', function (req, res, next) {
    try {
        models.Template.findById(req.params.templateId).then(function (template) {
            res.json(template);
        }).catch(function () {
            res.json({
                message: "Error retrieving the template"
            });
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: "Error retrieving the template"
        });
    }
});

router.put('/:templateId', function (req, res, next) {
    models.Template.update(
        {templateJson: JSON.stringify(req.body)},
        {where: {id: req.params.templateId}}
    ).then(function () {
        res.send("Project with id =1 updated successfully!");
    }).catch(function (err) {
        console.log(err);
        res.send("Project update failed !");
    });
});

router.delete('/:templateId', function (req, res) {
    models.Template.destroy({
        where: {
            id: req.params.templateId
        }
    }).then(function () {
        res.send('respond with a resource save');
    });
});


module.exports = router;
