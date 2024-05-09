const router = require('express').Router();

const { getAllMedicine } = require('../controllers/MedicineController');
const { addOrder } = require('../controllers/OrderController');
const { signUp } = require('../controllers/UserController');


router.route('/').post(signUp);

router.route('/get-all-medicine').get(getAllMedicine);

router.route('/place-order').post(addOrder);



module.exports = router;
