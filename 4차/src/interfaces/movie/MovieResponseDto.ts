import mongoose from "mongoose";
import { MovieCreateDto } from "./MovieCreateDto";

export interface MovieResponseDto extends MovieCreateDto {
    _id: mongoose.Schema.Types.ObjectId;
}
