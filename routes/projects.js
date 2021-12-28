const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Project');
const Project = mongoose.model("projects");


router.get('/', async (req, res, next) => {
    const projects = await Project.find({status:"active"});
    res.setHeader("Content-Type", "application/json");
    res.json(projects);
});

router.post('/', async (req, res, next) => {
    const {name, description, images, URL, githubURL, status} = req.body;
    const project = new Project({name, description, images, URL, githubURL, status});
    project.save((err, project) => {
        if(err) console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.json(project);
    })
    
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const project = await Project.updateOne({_id: id}, {status: "inactive"});
    res.setHeader("Content-Type", "application/json");
    res.json(project);
});

module.exports = router;