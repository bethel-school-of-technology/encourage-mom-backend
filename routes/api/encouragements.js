
const express = require("express");
const router = express.Router();
const { validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Encouragement = require('../../models/Encouragement');

router.get('/', async (req, res) => {
    const encouragement = await Encouragement.find()
    .sort({date: -1});
    res.send(encouragement)
});

router.get('/:id', async (req, res) => {
    try {
      const encouragement = await Encouragement.findById(req.params.id);

      if (!encouragement) {
        return res.status(404).json({
          msg: 'Encouragement not found'
        });
      }

      res.json(encouragement);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  });


  router.post('/', async(req, res) => {
    const {error} = validationResult(req.body);
    if(error){
        console.log("Test1");
        return res.status(400).send(error.details[0].message)
    }

    try {
        encouragement = new Encouragement ({
            title: req.body.title,
            text: req.body.text,
            reference: req.body.reference,
            date: req.body.date
        })
        console.log('Test3')

        if(encouragement.title == req.body.title) {
            await encouragement.save()
            res.send(encouragement)
        }
        console.log('Test4')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/:id', async (req, res) => {
    const { error } = validationResult(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const encouragement = await Encouragement.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            text: req.body.text,
            reference: req.body.reference,
            date: req.body.date
        },
    );
    console.log("Test5");
    console.log(req.params.id);
    console.log(encouragement);
    if (!encouragement) return res.status(404).send("Invalid Credentials")
    encouragement.save()
    res.send(encouragement)
})

module.exports = router