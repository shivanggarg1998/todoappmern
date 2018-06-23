const Note = require('../models/notes');

module.exports  = {

    create(req,res,next){
        Note.find(function(err,notes){
            res.json(notes);
        });
      },

add(req,res,next)
{
    let newNote = new Note({
        note : req.body.note,
        isDone : req.body.isDone
    });
    newNote.save((err,note)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            console.log(note);
            Note.find(function(err,notes){
                res.json(notes);
            });
        }
    });
    
},

delete(req,res,next){

    Note.remove({_id : req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            Note.find(function(err,notes){
                res.json(notes);
            });
        }
    });

    },




update(req,res,next)
{
    Note.findById({_id : req.params.id}, function (err, note) {
        if (err) return handleError(err);
        note.note = req.body.note;
        if(req.body.isDone)
        {
        note.isDone = true;
        }
        else{
            note.isDone = false;
        }
        note.save(function (err, updatednote) {
          if (err) return handleError(err);
          Note.find(function(err,notes){
            res.json(notes);
        });
        });
      });
}
}