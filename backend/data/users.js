import bcrypt from 'bcryptjs'
const users = [
    {
        firstName: 'Admin User',
        lastName: 'Admin User',
        email: 'fdknnk',
        password: bcrypt.hashSync('1234567', 10),
        isAdmin: true
    },
    {
        firstName: 'Anna',
        lastName: 'chuprin',
        email: 'lbknl ',
        password: bcrypt.hashSync('1234567', 10),
    },
    {
        firstName: 'Marie',
        lastName: 'chuprin',
        email: 'lbknlfmvl ',
        password: bcrypt.hashSync('1234567', 10),
    },
]

export default users