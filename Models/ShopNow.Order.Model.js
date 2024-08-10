import {Schema,model} from 'mongoose';

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items:[
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
              },
              quantity: {
                type: String,
                required: true,
                trim:true
              }
        }
    ],
    totalprice:{
        type: String,
        required: true,
        trim:true
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    }
},{
    timestamps:true
})

export const Order = model('Order',orderSchema);