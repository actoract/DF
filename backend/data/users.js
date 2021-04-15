import bcrypt from 'bcryptjs'
const users = [
    {
        firstName: 'Admin User',
        lastName: 'Admin User',
        email: 'admin@yandex.ru',
        password: bcrypt.hashSync('1234567', 10),
        isAdmin: true
    },
    {
        firstName: 'Anna',
        lastName: 'chuprin',
        email: 'anna@yandex.ru ',
        password: bcrypt.hashSync('1234567', 10),
    },
    {
        firstName: 'Marie',
        lastName: 'chuprin',
        email: 'marie@yandex.ru',
        password: bcrypt.hashSync('1234567', 10),
    },
]

export default users