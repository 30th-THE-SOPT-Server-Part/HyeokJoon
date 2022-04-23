import { BlogCreateDto } from "../interfaces/blog/BlogCreateDto";
import { BlogResponseDto } from "../interfaces/blog/BlogResponseDto";
import { BlogUpdateDto } from "../interfaces/blog/BlogUpdateDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Blog from "../models/Blog";

const createBlog = async (
    blogCreateDto: BlogCreateDto
): Promise<PostBaseResponseDto> => {
    try {
        const blog = new Blog({
            title: blogCreateDto.title,
            text: blogCreateDto.text,
        });

        await blog.save();

        const data = {
            _id: blog.id,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateBlog = async (postId: string, blogUpdateDto: BlogUpdateDto) => {
    try {
        await Blog.findByIdAndUpdate(postId, blogUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const findBlog = async (postId: string): Promise<BlogResponseDto | null> => {
    try {
        const blog = await Blog.findById(postId);

        if (!blog) {
            return null;
        }

        return blog;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteBlog = async (postId: string) => {
    try {
        await Blog.findByIdAndDelete(postId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createBlog,
    updateBlog,
    findBlog,
    deleteBlog,
};
