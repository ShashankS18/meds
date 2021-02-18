const router = require('express').Router();
let Medicine = require('../models/medicine.model');

router.route('/').get((req, res) => {
  Medicine.find()
    .then(medicines => res.json(medicines))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const quantity = Number(req.body.quantity);
  const date = Date.parse(req.body.date);

  const newMedicine = new Medicine({
    username,
    description,
    quantity,
    date,
  });

  newMedicine.save()
  .then(() => res.json('Medicine added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Medicine.findById(req.params.id)
      .then(medicine => res.json(medicine))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Medicine.findByIdAndDelete(req.params.id)
      .then(() => res.json('Medicine deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Medicine.findById(req.params.id)
      .then(medicine => {
        medicine.username = req.body.username;
        medicine.description = req.body.description;
        medicine.quantity = Number(req.body.quantity);
        medicine.date = Date.parse(req.body.date);
  
        medicine.save()
          .then(() => res.json('Medicine updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;
