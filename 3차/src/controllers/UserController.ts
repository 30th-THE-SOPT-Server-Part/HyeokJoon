import express, { Request, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { UserService } from "../services";

/**
 * @route POST /user
 * @desc Create User
 * @access Public
 */
const createUser = async (req: Request, res: Response) => {
    const userCreateDto: UserCreateDto = req.body; // User Create Dto 로 req.body 받아옴

    try {
        const data = await UserService.createUser(userCreateDto);

        res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)
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
 * @route PUT /user/:userId
 * @desc Update User
 * @access Public
 */
const updateUser = async (req: Request, res: Response) => {
    const userUpdateDto: UserUpdateDto = req.body;
    const { userId } = req.params;

    try {
        await UserService.updateUser(userId, userUpdateDto);

        res.status(statusCode.NO_CONTENT).send();
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
 * @route GET /user/:userId
 * @desc Read User
 * @access Public
 */
const findUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const data = await UserService.findUserById(userId);

        if (!data) {
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        return res
            .status(statusCode.OK)
            .send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
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
 * @route DELETE /user/:userId
 * @desc Delete User
 * @access Public
 */
const deleteUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        await UserService.deleteUserById(userId);

        return res.status(statusCode.NO_CONTENT).send();
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

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUserById,
};
