var express = require('express');
var router = express.Router();
const PostsController = require('../../controllers/posts')
const passport = require('passport')
//======================================POST=================
//@route POST api/posts/
//@desc  Create Post
//@Access Private
router.post('/', passport.authenticate('jwt', { session: false }),
    PostsController.postAddPosts);

//@route GET api/posts/
//@desc  Get Post
//@Access Public
router.get('/', PostsController.getPosts);
//@route GET api/posts/:postId
//@desc  Get Post
//@Access Public
router.get('/:postId', PostsController.getPostId);
//===========================LIKE POST====================

//Like vao post nao nen can id post
//@route POST api/posts/likes/:postId
//@desc  Like Post
//@Access Private
router.post('/like/:postId',
    passport.authenticate('jwt', { session: false }),
    PostsController.likePostId);
///
//UnLike vao post nao nen can id post
//@route POST api/posts/likes/:postId
//@desc  Like Post
//@Access Private
router.post('/unlike/:postId',
    passport.authenticate('jwt', { session: false }),
    PostsController.unlikePostId);
//===================COMMENT POST=====================
//Comment vao post nao nen can id post
//@route POST api/posts/comment/:postId
//@desc  Comment Post
//@Access Private
router.post('/comment/:postId',
    passport.authenticate('jwt', { session: false }),
    PostsController.postCommentPostId);

//Remove Comment vao post nao nen can id post va cai Id cua comment can remove
//@route DELETE api/posts/comment/:postId/:commentId
//@desc  Comment Post
//@Access Private
router.delete('/comment/:postId/:commentId',
    passport.authenticate('jwt', { session: false }),
    PostsController.deleteCommentId);



module.exports = router;