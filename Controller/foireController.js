const FoireService = require("../Service/foireService");

module.exports = class Foire {

   static async apiGetAllFoire(req, res, next){
       try {
         const foires = await FoireService.getAllFoire();
         if(!foires){
            res.status(404).json("There are no Foire published yet!")
         }
         res.json(foires);
         //console.log(req)
       } catch (error) {
          res.status(500).json({error: error})
       }

   }

   static async apiGetFoireById(req, res, next){
      try {
         let id = req.params.id || {};
         const foire = await FoireService.getFoirebyId(id);
         res.json(foire);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }



   static async apiCreateFoire(req, res, next){
      try {
         const comment = {}
         comment.FoireName        = req.body.FoireName;
         comment.Localisation         = req.body.Localisation;
         comment.Email           = req.body.Email;
         comment.Phone           = req.body.Phone;
   

         const updatedFoire = await FoireService.createFoire(comment);

         res.json(updatedFoire);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }
   static async apiUpdateFoire(req, res, next){
      try {
         const comment = {}
         comment.FoireName        = req.body.FoireName;
         comment.Localisation         = req.body.Localisation;
         comment.Email           = req.body.Email;
         comment.Phone           = req.body.Phone;
   

         const updatedFoire = await FoireService.updatedFoire(comment);

         if(updatedFoire.modifiedCount === 0){
            throw new Error("Unable to update Foire, error occord");
         }

         res.json(updatedFoire);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiDeleteFoire(req, res, next){
         try {
            const FoireId = req.params.id;
            const deleteResponse =  await FoireService.deleteFoire(FoireId)
            res.status(201).json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
   }
   static async apiGetFoireStandsById(req, res, next){
      try {
        
         const foire = await FoireService.getStandsFoire();
         //console.log("test")
         res.json(foire);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

  
}