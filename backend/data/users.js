import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'fdknnk',
        password: bcrypt.hashSync('1234567', 10),
        isAdmin: true
    },
    {
        name: 'Anna Chuprina',
        email: 'lbknl ',
        password: bcrypt.hashSync('1234567', 10),
    },
    {
        name: 'Kate Chuprina',
        email: 'lbknlfmvl ',
        password: bcrypt.hashSync('1234567', 10),
    },
]

export default users