const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');
const validatePostInput = require('../validation/post')
const validateCommentInput = require('../validation/comment')
const ObjectID = require('mongodb').ObjectID;

module.exports.postAddPosts = (req, res, next) => {
    const user = req.user;
    //Check validator cho text
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(404).json({ errors })
    }

    //Neu undifined thi se khong add vao trong doi tuong ,se bao loi neu required : true
    const newPost = new Post(
        {
            userId: user._id,
            name: req.body.name,
            avatar: req.body.avatar,
            text: req.body.text//cai nay required nen can phai check validator
        }
    );
    newPost.save()
        .then(post => {
            res.status(201).json({ msg: 'create post succes', post })
        })

}

module.exports.getPosts = (req, res, next) => {
    Post.find()
        //Sap xep thu tu post luon theo ngay
        .sort({ Date: -1 })
        .then(posts => {
            res.json({ msg: 'get All Posts', posts })
        })
        .catch(err => {
            res.status(404).json({ msg: 'Not Found Posts' })
        })
}
module.exports.getPostId = (req, res, next) => {
    Post.findOne({ _id: req.params.postId })
        .then(post => {
            if (post) {
                return res.json({ msg: 'get post with post ID', post })
            }
            return res.status(404).json({ msg: 'Not Found Post with Id : ' + req.params.postId })

        })
        .catch(err => {
            res.status(404).json({ msg: 'Not Found Post with Id ' + req.params.postId })
        })
}
module.exports.deletePostId = (req, res, next) => {
    const user = req.user;
    Post.find({ userId: user._id })
        .then(posts => {
            if (posts.length === 0) {
                return res.status(404).json('Post Empty')
            }
            //Neu co post thi tim dung voi key va nguoi dung roi xoa
            Post.findOneAndDelete({ _id: req.params.postId, userId: user._id })
                .then(result => {
                    return res.json({ msg: 'Delete Success ' })
                })
                .catch(err => {
                    return res.json({ msg: 'Delete Post Fail ' })

                })
        })
}

///Like Post Id
module.exports.likePostId = (req, res, next) => {
    const user = req.user;
    //Tim bai post ma nguoi dung  can like
    console.log(req.params.postId)
    Post.findOne({ _id: new ObjectID(req.params.postId) })
        .then(post => {
            //Neu co thi kiem tra nguoi dung nay da like chua
            //Kiem tra xem ben trong co ID cua nguoi dung chua
            if (post) {
                //lon hon 0 nghia la da ton tai nen khogn like nua
                if (post.likes.filter(liker => {
                    return liker.userId.toString() === user._id.toString()//vi la doi tuong ObjectID nen chuyen sang string de so sanh
                }).length > 0) {
                    return res.status(400).json({ alreadyLike: 'User already liked this post' })
                }
                //Neu khong nghia la chua like thi ta them nguoi dung vao (unshift de luu len dau nguoi like moi nhat)
                post.likes.unshift({ userId: user._id });
                post.save()
                    .then(post => {
                        return res.json({ liked: 'User  like this post success', post })

                    })
            }

        })
        .catch(err => {
            res.status(404).json({ postnotfound: 'Post not Found' })
        })
}
//UNLIKE COMTROLLER
module.exports.unlikePostId = (req, res, next) => {
    const user = req.user;
    //Tim bai post ma nguoi dung  can like
    Post.findOne({ _id: new ObjectID(req.params.postId) })
        .then(post => {
            //Neu co thi kiem tra nguoi dung nay da like chua
            //Kiem tra xem ben trong co ID cua nguoi dung chua
            if (post) {
                //Loc de loai bo user duoc unlike
                const unlikePost = post.likes.filter(liker => {
                    return liker.userId.toString() !== user._id.toString()//vi la doi tuong ObjectID nen chuyen sang string de so sanh
                })
                post.likes = unlikePost;
                post.save()
                    .then(result => {
                        return res.json({ msg: 'suceesss', post });
                    })

            }
        }
        )
        .catch(err => {
            res.status(404).json({ unlikfail: 'Unlike Fail' })
        })
}
//COMMENT CONTROLLER
module.exports.postCommentPostId = (req, res, next) => {
    const user = req.user;
    //Validation Comment == Validate text vi chi required text
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
        res.status(404).json({ commenterrors: errors })
    }
    Post.findById(req.params.postId)
        .then(post => {
            const newComment = {
                userId: user._id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
            }
            if (post) {
                post.comment.push(newComment);
                post.save()
                    .then(result => {
                        res.status(201).json({ createcomment: 'add comment success', post })
                    })

            }
        })
        .catch(err => {
            res.status(404).json({ postnotfound: 'Post not Found' })
        })



}
//DELETE COMMEENT CONTROLLER
module.exports.deleteCommentId = (req, res, next) => {
    const user = req.user;

    Post.findById(req.params.postId)
        .then(post => {
            //Neu tim thay post
            if (post) {
                //Tim xem comment co ton tai hay khong va co dung nguoi tao no hay khong
                //Neu khong ton tai thi thong bao khong ton tai
                if (post.comment.filter(comment => {
                    return comment._id.toString() === req.params.commentId.toString();
                }).length === 0) {
                    res.status(404).json({ commnetnotexists: "Comment not Exists" })

                }
                //Neu ton tai thi check xem nguoi do co dung la nguoi tao comment khong
                if (post.comment.filter(comment => {
                    return comment._id.toString() === req.params.commentId.toString() && comment.userId.toString() === user._id.toString();
                }).length === 0) {
                    res.json({ notpermissonremove: "Your Permission comment" })

                }
                //Neu dung thi xoa
                const newComment = post.comment.filter(comment => {
                    return comment._id.toString() !== req.params.commentId.toString();
                })
                post.comment=newComment;
                post.save()
                .then(result=>{
                    res.json({removecomment:'Remove comment success',post})
                })

            }
        })



        //Neu khong tim thay post
        .catch(err => {
            res.status(404).json({ postnotfound: 'Post not Found' })
        })
}