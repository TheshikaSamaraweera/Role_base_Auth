const { Medicine } = require('../models/Medicine');
const { medicineValidate } = require('../models/Medicine');

//add medicine function to database
const addMedicine = async (req, res) => {
  //validate
  const { error } = medicineValidate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  //add medicine
  const medicine = new Medicine({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    category: req.body.category,
    image: req.body.image,
  });
  await medicine
    .save()
    .then((medicine) => {
      res
        .status(201)
        .send({ data: medicine, message: 'Medicine saved successfully' });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Internal Server error' });
    });
};

//get all medicine
const getAllMedicine = async (req, res) => {
  await Medicine.find()
    .then((medicines) => {
      res.status(200).send({ data: medicines });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Internal Server error' });
    });
};

module.exports = { addMedicine, getAllMedicine };
