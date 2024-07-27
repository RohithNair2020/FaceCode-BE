// Gets all the users
export const getUsers = (req, res) => {
    const dummyUser = {
        name: 'Rohith',
        age: 24
    }
    res.send([dummyUser, dummyUser, dummyUser]);
}


// Gets a user by the id
export const getUserById = (req, res) => {
    const { id } = req.params;
    const { email } = req.query;
    res.json({ id, email });
}


