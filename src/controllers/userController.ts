import { Request, Response } from 'express';

// Gets all the users
export const getUsers = (_req: Request, res: Response) => {
    const dummyUser = {
        name: 'Rohith',
        age: 24
    }
    res.send([dummyUser, dummyUser, dummyUser]);
}


// Gets a user by the id
export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { email } = req.query;
    res.json({ id, email });
}

// Filter users
// Update user
// Delete user


