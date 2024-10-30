import { DataTypes } from 'sequelize';
import DATABASE from '../config/database';
import generateUniqueId from '../useFxn/generateUniqueId';

const Table = {
    options: {
        tableName: 'survived_bys',
        timestamps: false,
    },
    columns: {
        deceased_id: DataTypes.STRING,
        survived_by: DataTypes.STRING,
        relationship: DataTypes.STRING,
        age: DataTypes.INTEGER,
    }
}

const SurvivedByModel = DATABASE.define('SurvivedByModel', Table.columns, Table.options);

SurvivedByModel.addHook('beforeCreate', async (data: any) => {
    data.id = await generateUniqueId(SurvivedByModel);
    data.created_at = new Date();
    data.updated_at = new Date();
});


export default SurvivedByModel;
