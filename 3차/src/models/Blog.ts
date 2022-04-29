import mongoose from "mongoose";
import { BlogInfo } from "../interfaces/blog/BlogInfo";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

export default mongoose.model<BlogInfo & mongoose.Document>("Blog", BlogSchema);
