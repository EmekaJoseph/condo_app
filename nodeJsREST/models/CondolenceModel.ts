import { DataTypes } from 'sequelize';
import DATABASE from '../config/database';
import generateUniqueId from '../useFxn/generateUniqueId';


const Table = {
    options: {
        tableName: 'condolences',
        timestamps: false,
    },
    columns: {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     allowNull: false,
        // },
        deceased_id: DataTypes.STRING,
        condo_name: DataTypes.STRING,
        relationship: DataTypes.STRING,
        email: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        condolence: DataTypes.TEXT,
    }
}

const CondolenceModel = DATABASE.define('CondolenceModel', Table.columns, Table.options);

CondolenceModel.addHook('beforeCreate', async (data: any) => {
    data.id = await generateUniqueId(CondolenceModel);
    data.created_at = new Date();
    data.updated_at = new Date();
});

export default CondolenceModel;
