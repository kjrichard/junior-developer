const { response } = require('express')


const isAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { roleId, name } = req.user;
    
    if ( roleId !==  1 ) {
        return res.status(401).json({
            msg: `${ name } no es administrador - No puede hacer esto`
        });
    }

    next();
}


const hasRole = ( ...roles  ) => {
    return (req, res , next) => {
        
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.user.roleId ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}



module.exports = { isAdminRole, hasRole }