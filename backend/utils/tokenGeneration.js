import jwt from 'jsonwebtoken'

const tokenGeneration = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '15d' //15 days
    })
}

export default tokenGeneration