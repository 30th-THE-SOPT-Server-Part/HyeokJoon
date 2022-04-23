import mongoose from "mongoose";
import { BlogInfo } from "./BlogInfo";

export interface BlogResponseDto extends BlogInfo {
    _id: mongoose.Schema.Types.ObjectId;
}
