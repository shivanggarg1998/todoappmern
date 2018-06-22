const express = require('express');
const router = express();
const notecontrol = require('./notescontrol')


router.get('/notes',notecontrol.create);
router.post('/note',notecontrol.add);
router.delete('/notes/:id',notecontrol.delete);
router.patch('/note/:id',notecontrol.update)

module.exports = router ;
