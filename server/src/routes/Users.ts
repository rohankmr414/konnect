import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import UserDao from '@daos/User/UserDao';
import { paramMissingError } from '@shared/constants';

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

import validateRequests from '@middlewares/validateRequest';
const validateRequest = new validateRequests();

import express from 'express';
let userRouter = express.Router();

/**
 * Get one user.
 *
 * @param req
 * @param res
 * @returns
 */
userRouter.get('/:id', async function (req: Request, res: Response) {
    const { id } = req.params;
    const user = await userDao.getOne(id);
    return res.status(OK).json({ user });
});

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
userRouter.post(
    '/',
    validateRequest.isUser,
    async function (req: Request, res: Response) {
        const user = req.body;

        await userDao.add(user);
        return res.status(CREATED).end();
    }
);

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
userRouter.put(
    '/:id',
    validateRequest.isUser,
    async function (req: Request, res: Response) {
        const { id } = req.params;
        const user = req.body;

        await userDao.update(id, user);
        return res.status(OK).end();
    }
);

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
userRouter.delete('/:id', async function (req: Request, res: Response) {
    const { id } = req.params;
    await userDao.delete(id);
    return res.status(OK).end();
});

export default userRouter;
