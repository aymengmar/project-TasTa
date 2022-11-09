var express = require('express');
var router = express.Router();


var db=require('../models');

//const multer = require('multer');
//const upload=multer({dest:'uploads/'});

router.post('/add',(req,res)=>{
  console.log("hiiii", req.files)
  var file = req.files.image;
  console.log("file", file)
  var img_name = file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/images/' + img_name, function(err) {

                {
                    db.Menus.create({
                        
                        name: req.body.name,
                        price: req.body.price,
                        description: req.body.description,
                        photo: img_name,
                        RestaurantId: req.body.RestaurantId,
                        ReactionId:req.body.ReactionId 
                    }).then(
                        (p) => {
                            res.send(p);
                        }
                    );
                }
            });
        }
})

router.get('/fetch', function(req, res, next) {
  db.Menus.findAll().then((resp)=>{
    res.send(resp)
  })
});
router.get('/aa', function(req, res, next) {

    res.json('ddddd')
  });
router.delete('/remove/:id',(req,res)=>{
db.Menus.destroy({where:{id:req.params.id}}).then(
  ()=>{
    res.send('removed')
  }
)
})
router.put('/update/:id',(req,res)=>{
  db.Menus.update(req.body,{where:{id:req.params.id}}).then(
    ()=>{
      res.send('updated')
    }
  )
  })
router.get('/detail/:id', function(req, res, next) {
  db.Menus.findOne({where:{id:req.params.id}}).then((resp)=>{
    res.send(resp)
  })
});

module.exports = router;
