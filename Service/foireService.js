
const Foire = require("../model/foire");

module.exports = class FoireService{
    static async getAllFoire(){
        try {
            const allFoire = await Foire.find();
            return allFoire;
        } catch (error) {
            console.log(`Could not fetch Foires ${error}`)
        }
    }

    static async createFoire(data){
        try {

            const newFoire = {
                FoireName: data.FoireName,
                Localisation : data.Localisation ,
                Email: data.Email,
                Phone: data.Phone,
            }
           const response = await new Foire(newFoire).save();
           return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getFoirebyId(FoireId){
        try {
            const singleFoireResponse =  await Foire.findById({_id: FoireId}); 
            return singleFoireResponse;
        } catch (error) {
            console.log(`Foire not found. ${error}`)
        }
    }

    static async updateFoire(FoireName,DateDébut,DateFin,description,Affiche){
            try {
                const updateResponse =  await Foire.updateOne(
                    {FoireName,DateDébut,DateFin,description,Affiche}, 
                    {$set: {date: new Date.now()}});

                    return updateResponse;
            } catch (error) {
                console.log(`Could not update Foire ${error}` );

        }
    }

    static async deleteFoire(FoireId){
        try {
            const deletedResponse = await Foire.findOneAndDelete(FoireId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete Foire ${error}`);
        }

    }
    static async getStandsFoire(){
        try {
            const singleFoireResponse =  await Foire.findById({_id: "65c220ca9aeb263b734a054b"}).populate('stands').populate('evenements'); 
            return singleFoireResponse;
        } catch (error) {
            console.log(`Foire not found. ${error}`)
        }
    }
}
