//creacion del jason web token

const jwt = require("jsonwebtoken")

const generarJWT = (uid, name) => {

    const payload = { uid, name };

    return new Promise((resolve, reject) => {

        //lo que va a coger, el secret mio, opciones

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (error, token) => {

            if (error) {
                console.log(error);
                reject(error);
            } else {
                //todo ha ido bien
                resolve(token);
            }
        })

    });
}

module.exports = {
    generarJWT
}