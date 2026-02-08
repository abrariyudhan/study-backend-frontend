const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models');

const auth = async (req, res, next) => {
    try {
        // 1. Ambil token dari dari header
        const { authorization } = req.headers;

        // 2. Validasi adakah token
        if (!authorization) {
            throw { name: `Unauthorized`, message: `Authentication required` }
        }

        // 3. Pisahkan token dan bearer
        const rawToken = authorization.split(' ');
        const tokenType = rawToken[0];
        const tokenValue = rawToken[1];

        // 4. Validasi apakah token ada atau tidak
        if (tokenType !== 'Bearer' || !tokenValue) {
            throw { name: `Unauthorized`, message: `Invalid token` }
        }

        // 5. Validasi apakah token sesuai yang terdata
        const result = verifyToken(tokenValue);

        const user = await User.findByPk(result.id)
        if (!user) {
            throw { name: "Unauthorized", message: "Invalid token" }
        }

        req.user = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }

        next()
    } catch (error) {
        console.log(error, "<<<<<ERROR");
        next(error)
    }
}


const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
    }
    next()
}


module.exports = {auth, adminOnly}