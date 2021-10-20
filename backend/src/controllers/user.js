const bcrypt = require('bcrypt');
const userCtrl = {};
const db = require('../models');
const { Sequelize } = require('../models');
let now = new Date();

userCtrl.getUsers = async ( req, res ) => {
    const loggedIn = req.user;
    try {
        const users = await db.user.findAll({
            where: {
                status: true,  
                id: { [Sequelize.Op.ne]: loggedIn.id }, 
            },
            include: [
                {
                    model: db.role,
                    where: { id: Sequelize.col('roleId')}
                 
                }
            ]
        });  
        if( !users ) return res.status( 404 ).json({ message: 'No se encontraron usuarios'});
        res.json({users, loggedIn: loggedIn});
      
    } catch (error) {
        return  res.send({message: error.message});
    } 
}
userCtrl.getUser = async ( req, res ) => {
    const loggedIn = req.user;
    try {
        const user = await db.user.findOne({
            where: {
                id: loggedIn.id

            },
         
        });  
        console.log(loggedIn.id);
        if( !user ) return res.status( 404 ).json({ message: 'No se encontraron usuarios'});
        res.json({user, loggedIn: loggedIn});
        
    } catch (error) {
        return  res.send({message: error.message});
    } 
}


userCtrl.newUser = async ( req, res ) => {
    const loggedIn = req.user;
    const newUser = req.body;
    let newUsername = newUser.name.charAt(0)+ newUser.surname + newUser.lastSurname.charAt(0);
    try {

        const findUsername = await db.user.findOne({ where: { username: newUsername} });
        console.log(findUsername);
        if( findUsername ) return res.status( 400 ).json( { message: `El usuario ${ newUsername } ya existe`  });
        newUser.name = newUser.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        newUser.surname = newUser.surname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        newUser.lastSurname = newUser.lastSurname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        newUser.username = newUsername;
        newUser.roleId = 2;
        newUser.createdAt = now;
        newUser.status = true;
        newUser.creationUser = loggedIn.username;
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( newUser.password, salt );
        await db.user.create( newUser ).then(() => {
        return res.status( 200 ).json({ user: newUser, message: 'Registro exitoso', status: true}); 
        });  
        
    }catch (error) {
        return  res.send({message: error.message, status: false});
    }
 
} 

 

userCtrl.updateUser = async ( req, res ) => {
    try {
        const loggedIn = req.user;
        const { id } = req.params;
        let updateUser  = req.body; 
        updateUser.updatedAt = now;
        updateUser.updateUser = loggedIn.username;
        const foundUser = await db.user.findByPk( id );
        if( !foundUser ) return res.status( 400 ).json({ message: `El usuario no esta registrado` });
        await foundUser.update( updateUser ).then(() => {
         return res.status( 200 ).json({ message: 'Actualizacion exitosa', updateUser });
        });
       
    } catch (error) {
        return  res.send({message: error.message});
    } 
}  

userCtrl.deleteUser = async ( req, res ) => {
    const { id } = req.params;
    try {
        const user = await db.user.findByPk( id );
        if( !user ) return res.status( 400 ).json( { message: `El usuario no existe` });
        await user.update({ status: false }).then(() => {
        return res.status( 200 ).json({ user, message: 'Registro eliminado' });
         });
        
    }catch (error) {
        return  res.send({message: error.message});
    }
}  



module.exports = userCtrl;