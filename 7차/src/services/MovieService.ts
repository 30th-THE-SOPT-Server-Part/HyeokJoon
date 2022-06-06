import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MoviesResponseDto } from "../interfaces/movie/MoviesResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import Movie from "../models/Movie";

const createMovie = async (
    movieCreateDto: MovieCreateDto
): Promise<PostBaseResponseDto> => {
    try {
        const movie = new Movie({
            title: movieCreateDto.title,
            director: movieCreateDto.director,
            startDate: movieCreateDto.startDate,
            thumbnail: movieCreateDto.thumbnail,
            story: movieCreateDto.story,
        });

        await movie.save();

        const data = {
            _id: movie.id,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateMovie = async (movieId: string, movieUpdateDto: MovieUpdateDto) => {
    try {
        // findByIdAndUpdate
        await Movie.findByIdAndUpdate(movieId, movieUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const findMovie = async (movieId: string): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId).populate(
            "comments.writer",
            "name"
        );

        if (!movie) {
            return null;
        }

        return movie;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteMovie = async (movieId: string): Promise<void> => {
    try {
        await Movie.findByIdAndDelete(movieId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createMovieComment = async (
    movieId: string,
    movieCommentCreateDto: MovieCommentCreateDto
): Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const newComments: MovieCommentInfo[] = [
            ...movie.comments,
            movieCommentCreateDto,
        ];

        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: movieId },
            { comments: newComments },
            { new: true }
        );
        if (!updatedMovie) return null;

        return updatedMovie;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateMovieComment = async (
    movieId: string,
    commentId: string,
    userId: string,
    commentUpdateDto: MovieCommentUpdateDto
): Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const data = await Movie.findOneAndUpdate(
            {
                _id: movieId,
                comments: { $elemMatch: { _id: commentId, writer: userId } },
            },
            {
                $set: {
                    "comments.$.writer": userId,
                    "comments.$.comment": commentUpdateDto.comment,
                },
            },
            { new: true }
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getMoviesBySearch = async (
    search: string,
    option: MovieOptionType,
    page: number
): Promise<MoviesResponseDto> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`); // 정규 표현식 생성 함수

    let movies: MovieInfo[] = [];
    const perPage: number = 2;

    try {
        const titleRegex = regex(search); // 정규 표현식 객체 생성

        if (option === "title") {
            movies = await Movie.find({ title: { $regex: titleRegex } })
                .sort({
                    createdAt: -1,
                }) // 최신순 정렬
                .skip(perPage * (page - 1)) // 앞에서부터 얼마나 건너뛸지
                .limit(perPage); // 개수 제한
        } else if (option === "director") {
            movies = await Movie.find({ director: { $regex: titleRegex } })
                .sort({
                    createdAt: -1,
                }) // 최신순 정렬
                .skip(perPage * (page - 1)) // 앞에서부터 얼마나 건너뛸지
                .limit(perPage); // 개수 제한
        } else {
            movies = await Movie.find({
                $or: [
                    { director: { $regex: titleRegex } },
                    { title: { $regex: titleRegex } },
                ],
            })
                .sort({
                    createdAt: -1,
                }) // 최신순 정렬
                .skip(perPage * (page - 1)) // 앞에서부터 얼마나 건너뛸지
                .limit(perPage); // 개수 제한
        }
        // $regex 를 통해서 정규 표현식과 일치하는 문자열 검색

        const total: number = await Movie.countDocuments({});
        const lastPage: number = Math.ceil(total / perPage);

        const data = {
            movies,
            lastPage,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createMovie,
    updateMovie,
    findMovie,
    deleteMovie,
    createMovieComment,
    updateMovieComment,
    getMoviesBySearch,
};
