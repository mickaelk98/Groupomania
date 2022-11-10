import { defineStore } from 'pinia';
import { getAllPost, createPost, deletePost, updatePost, likePost, commentPost, deleteOneUserPost } from '../services/post.service';


export const usePosts = defineStore('posts', {
    state: () => ({
        posts: []
    }),
    getters: {
        ordererPosts(state) {
            const result = state.posts.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
            return result
        }
    },
    actions: {
        async getAllPosts() {
            const posts = await getAllPost();
            if (Array.isArray(posts)) {
                this.posts = posts;
            } else {
                this.posts = [posts]
            }
        },
        async createPost(userToken, data) {
            const newPost = await createPost(userToken, data);
            this.posts.push(newPost);
        },
        async deletePost(postId) {
            await deletePost(postId);
            const index = this.posts.findIndex(t => t._id === postId);
            this.posts.splice(index, 1);
        },
        async deleteOneUserPost(userId) {
            const posts = await deleteOneUserPost(userId);
            if (Array.isArray(posts)) {
                this.posts = posts;
            } else {
                this.posts = [posts]
            }
        },
        async updatePost(postId, userToken, data) {
            const postIndex = this.posts.findIndex(t => t._id === postId)
            const updatedPost = await updatePost(postId, userToken, data);
            this.posts[postIndex] = updatedPost;
        },
        async likePost(postId) {
            const postIndex = this.posts.findIndex(t => t._id === postId)
            const updatedPost = await likePost(postId);
            this.posts[postIndex] = updatedPost;
        },
        async commentPost(postId, data) {
            const postIndex = this.posts.findIndex(t => t._id === postId)
            const updatedPost = await commentPost(postId, data);
            this.posts[postIndex] = updatedPost;
        },
        getPostInfo(postId) {
            const postIndex = this.posts.findIndex(t => t._id === postId)
            return this.posts[postIndex]
        }
    }
})