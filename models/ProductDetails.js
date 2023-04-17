import mongoose from "mongoose";


const productDetailsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isOff: {
        type: Boolean,
        required: true,
    },
    offPercentage: {
        type: Number,
        
    },
    productImage: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    productImageList: [{
        type: String
    }]

},{timestamps: true})

//Create Model
const ProductDetails = mongoose.model("PRODUCTDETAILS",productDetailsSchema)

export default ProductDetails;
