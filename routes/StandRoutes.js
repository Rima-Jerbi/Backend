const express = require('express');
const { body, validationResult } = require('express-validator');
const StandController = require('../Controller/StandController');
const router = express.Router();

router.get('/all', StandController.getAllStands);
router.get('/:id', StandController.getStandById);
router.post(
  '/',
  [
    body('id').isInt().withMessage('ID must be an integer'),
    body('superficie').isNumeric().withMessage('Superficie must be a number'),
    body('prix').isNumeric().withMessage('Prix must be a number')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  StandController.createStand
);
router.put('/:id', StandController.updateStand);
router.delete('/:id', StandController.deleteStand);

module.exports = router;
