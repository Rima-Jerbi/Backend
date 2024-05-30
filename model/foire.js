const mongoose = require('mongoose')

const foireSchema = mongoose.Schema(
    {
        FoireName: {
            type: String,
            required: [true, "Entrez le nom du foire"]
        },
        Localisation: {
            type: String ,
            required: [true, "Entrez la localisation du foire"]        
        },
        Email: {
            type: String,
            required: true,
        },
        Phone: {
            type: Number,
            required: true,
        },
        stands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stand' }],
        evenements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evenement' }]
    },
    

)


const Foire = mongoose.model('Foire', foireSchema);

module.exports = Foire;