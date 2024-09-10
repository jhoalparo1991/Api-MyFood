import mongoose from 'mongoose'
import slugify from 'slugify'
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        require:false
    },
    is_active :{
        type:Boolean,
        default:true
    },
    visible_pv : {
        type:Boolean,
        default:true
    },
    slug:{
        type:String,
        required:false,
        unique:false
    }
},{
    timestamps: true,
    versionKey: false
})

categorySchema.pre('save', async function (next){
    if(this.name){
        let slug = slugify(`${this.name}-${this._id}`,{
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
        })

        this.slug = slug;
    }

    next();
});

export default mongoose.model('Category', categorySchema);