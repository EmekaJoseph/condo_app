import { DataTypes } from 'sequelize';
import DATABASE from '../config/database';
import generateUniqueStringsId from '../useFxn/generateUniqueStringsId';
const bcrypt = require('bcrypt');

const userTable = {
    options: {
        tableName: 'admins',
        timestamps: false,
    },
    columns: {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        // lastname: DataTypes.STRING,
        phone: DataTypes.STRING,
        code: DataTypes.STRING,
        status: DataTypes.STRING,
        email_verified_at: DataTypes.DATE,
        level: DataTypes.INTEGER,
        deceased_uploads: DataTypes.INTEGER,
        role: DataTypes.STRING,
        created_at: DataTypes.STRING,
        updated_at: DataTypes.STRING,
    }
}


const AdminModel = DATABASE.define('AdminModel', userTable.columns, userTable.options);

AdminModel.compareToken = async (password: string) => {
    return await bcrypt.compare(password, AdminModel.password)
}


AdminModel.addHook('beforeCreate', async (data: any) => {
    data.id = await generateUniqueStringsId(AdminModel);
    data.created_at = new Date();
    data.updated_at = new Date();
});

AdminModel.addHook('beforeUpdate', async (data: any) => {
    data.updated_at = new Date();
});


export default AdminModel;
