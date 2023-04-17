import ProductDetails from '../models/ProductDetails.js';
//const mongoose = require('mongoose');
//const { default: router } = require('../routes/test');

export const getProductDetails = async (req,res) => {
    try{
        const productData = await ProductDetails.find();
        res.status(200).json(productData);

    }catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createProductDetails = async (req,res) => {
    const productData = req.body;

    const newProductData = new ProductDetails(productData);

    try{
       await newProductData.save();
       res.status(201).json(newProductData);
    }catch(error){
       res.status(409).json({message: error.message});
    }
}
// const createProductDetails = async (req,res) => {
//     const {category,productName,productPrice,description,isOff,offPercentage,productImage,isAvailable,productImageList} = req.body

//     let emptyFields = []

//     if(!category){
//         emptyFields.push('category')
//     }
//     if(!productName){
//         emptyFields.push('productName')
//     }
//     if(!productPrice){
//         emptyFields.push('productPrice')
//     }
//     if(!description){
//         emptyFields.push('description')
//     }
//     if(!isOff){
//         emptyFields.push('isOff')
//     }
//     if(!offPercentage){
//         emptyFields.push('offPercentage')
//     }
//     if(!productImage){
//         emptyFields.push('productImage')
//     }
//     if(!isAvailable){
//         emptyFields.push('isAvailable')
//     }
//     if(!productImageList){
//         emptyFields.push('productImageList')
//     }
//     if(emptyFields.length > 0) {
//         return res.status(400).json({error:'Please fill in all fields',emptyFields})
//     }

//     try {
       
//        const request = await Request.create({category,productName,productPrice,description,isOff,offPercentage,productImage,isAvailable,productImageList})
//        res.status(200).json(request)
//     } catch (error){
//         res.status(400).json({error:error.message});
//        //res.status(400).json({error : error.message})
//     }
// } 

// router.post('/productDetails/save',(req,res)=>{
//     let newProduct = new ProductDetails(req.body);

//     newProduct.save((err) => {
//         if(err){
//             return res.status(400).json({
//                 error:err,
                
//             });
//         }
//         return res.status(200).json({
//             success:"Products save successfully"
//         });
//     });
// });
//get All requests
// const getUserRequests = async (req,res) => {
//     const user_id = req.user._id;
//     const requests = await Request.find({user_id}).sort({createdAt: -1})

//     res.status(200).json(requests)
// }

//get All requests
// const getRequests = async (req,res) => {
//     const requests = await Request.find({}).sort({createdAt: -1})

//     res.status(200).json(requests)
// }



//get a single request
// const getRequest = async (req,res) => {
//     const {id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error:"No such request"})
//     }

//     const request = await Request.findById(id)

//     if(!request){
//         return res.status(404).json({error:"No such request"})
//     }
//     res.status(200).json(request)
// }

//delete a request
const deleteRequest = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such request"})
    }

    const request = await Request.findOneAndDelete({_id:id})

    if(!request){
        return res.status(404).json({error:"No such request"})
    }
    res.status(200).json(request)
}

//update a request
const updateRequest = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such request"})
    }

    const request = await Request.findAndUpdate({_id:id},{
        ...req.body
    })

    if(!request){
        return res.status(400).json({error:"No such request"})
    }
    res.status(200).json(request)
}

