const Like=require("../models/likeModel");
const Post=require("../models/postModel");


//like a post
exports.likePost=async (req,res)=>{
    try{
        const{post,user}=req.body;
        const like=new Like({
            post,user
        });
        const savedLike=await like.save();

        //update the post collection
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},
            {new:true})
            .populate("likes").exec()

            res.json({
                post:updatedPost,
            });

    }
    catch(error){
        return res.status(500).json({
            error:"Error while creating like",
        });
    }
}

exports.unlikePost=async (req,res)=>{
    try{
        const {post,like}=req.body;

        //find by id and delete like
        const deleteLike=await Like.findOneAndDelete({post:post,_id:like})

        //update the post collection
        const updatedPost=await Post.findByIdAndUpdate(post,
            {$pull:{likes:deleteLike._id}},
            {new:true});

        res.json({
            post:updatedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error:"Error while unliking post",
        });
    }
}
