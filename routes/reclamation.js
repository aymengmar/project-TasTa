var express = require('express');
var router = express.Router();

var db=require('../models');

var nodemailer = require('nodemailer');
router.get('/', function(req, res, next) {
   
    res.send('removed')
     // res.render("showEvent.twig", {data})
    
});


var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'chebbi.nada@esprit.tn',
    pass: 'E09914057'
  }
});


var mailOptions = {
  from: 'nadt22225@gmail.com',
  to: 'nadt22225@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


  router.get('/mail',(req,res)=>{
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })

router.post('/add',(req,res)=>{
    db.Reclamations.create(req.body).then(
      (r)=>{
        res.send(r)
      }
    ).catch((e)=>{res.send(e)})
  })

  router.get('/fetch', function(req, res, next) {
    db.Reclamations.findAll().then((resp)=>{
      res.send(resp)
    })
  });
  router.get('/fetch/:id', function(req, res, next) {
    db.Reclamations.findAll({where:{UtilisateurId:req.params.id}}).then((resp)=>{
      res.send(resp)
    })
  });

  router.get('/count', function(req, res, next) {
     db.Reclamations.findAndCountAll({where:{etat:"NonTraiter"}}).then(
      (count)=>{
        res.send(count)
      }
     )

  });

  router.get('/count/:id', function(req, res, next) {
    db.Reclamations.findAndCountAll({where:{UtilisateurId:req.params.id , etat:"NonTraiter"}}).then(
     (count)=>{
       res.send(count)
     }
    )

 });

  router.delete('/remove/:id',(req,res)=>{
    db.Reclamations.destroy({where:{id:req.params.id}}).then(
      ()=>{
        res.send('removed')
      }
    )
    })

    router.put('/update/:id',(req,res)=>{
        db.Reclamations.update(req.body,{where:{id:req.params.id}}).then(
          ()=>{
            res.send('updated')
          }
        )
        })

        router.put('/updateEtat/:id',(req,res)=>{
          req.body.etat =" Traiter";
          db.Reclamations.update(req.body,{where:{id:req.params.id}}).then(
            ()=>{
              res.send('updated')
            }
          )
          })

        router.get('/detail/:id', function(req, res, next) {
            db.Reclamations.findOne({where:{id:req.params.id}}).then((resp)=>{
              res.send(resp)
            })
          });

          
          module.exports = router;       