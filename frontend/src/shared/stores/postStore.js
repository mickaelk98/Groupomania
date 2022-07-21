import { defineStore } from 'pinia';
import { getAllPost, createPost, deletePost, updatePost } from '../services/post.service';


export const usePosts = defineStore('posts', {
    state: () => ({
        posts: []
    }),
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
        async deletePost(postId, userToken) {
            await deletePost(postId, userToken);
            const index = this.posts.findIndex(t => t._id === postId);
            this.posts.splice(index, 1);
        },
        async updatePost(postId, userToken, data) {
            const postIndex = this.posts.findIndex(t => t._id === postId)
            const updatedPost = await updatePost(postId, userToken, data);
            this.posts[postIndex] = updatedPost;
        }
    }
})