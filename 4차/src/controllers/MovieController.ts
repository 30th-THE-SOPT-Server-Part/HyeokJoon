import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieService } from "../services";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";

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

export default {
    createMovie,
    updateMovie,
};
