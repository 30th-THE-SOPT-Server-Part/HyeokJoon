import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieService } from "../services";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";

/**
 *  @route POST /movie
 *  @desc Create Movie
 *  @access Public
 */
const createMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    const movieCreateDto: MovieCreateDto = req.body;

    try {
        const data = await MovieService.createMovie(movieCreateDto);

        res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data)
        );
    } catch (error) {
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

/**
 *  @route PUT /movie/:movieId
 *  @desc Update Movie
 *  @access Public
 */
const updateMovie = async (req: Request, res: Response) => {
    const movieUpdateDto: MovieUpdateDto = req.body;
    const { movieId } = req.params;

    try {
        await MovieService.updateMovie(movieId, movieUpdateDto);

        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

/**
 *  @route GET /movie/:movieId
 *  @desc READ Movie
 *  @access Public
 */
const findMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const data = await MovieService.findMovie(movieId);

        if (!data) {
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data)
        );
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

/**
 *  @route DELETE /movie/:movieId
 *  @desc Delete Movie
 *  @access Public
 */
const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    try {
        await MovieService.deleteMovie(movieId);

        res.status(statusCode.NO_CONTENT).send();
    } catch (e) {
        console.log(e);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

/**
 * @route POST /movie/:movieId/comment
 * @desc Create Movie Comment
 * @access Public
 */
const createMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params;

    try {
        const data = await MovieService.createMovieComment(
            movieId,
            movieCommentCreateDto
        );
        if (!data)
            res.status(statusCode.NOT_FOUND).send(
                util.fail(statusCode.NOT_FOUND, message.NOT_FOUND)
            );

        res.status(statusCode.CREATED).send(
            util.success(
                statusCode.CREATED,
                message.CREATE_MOVIE_COMMENT_SUCCESS,
                data
            )
        );
    } catch (e) {
        console.log(e);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

/**
 * @route PUT /movie/:movieId/comments/:commentId
 * @desc Update Movie Comment
 * @access Public
 */
const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const commentUpdateDto: MovieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;

    try {
        const data = await MovieService.updateMovieComment(
            movieId,
            commentId,
            req.body.user.id,
            commentUpdateDto
        );

        if (!data)
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.NO_CONTENT).send();
    } catch (e) {
        console.log(e);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

export default {
    createMovie,
    updateMovie,
    findMovie,
    deleteMovie,
    createMovieComment,
    updateMovieComment,
};
