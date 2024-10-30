import { DataTypes } from 'sequelize';
import DATABASE from '../config/database';
import generateUniqueId from '../useFxn/generateUniqueId';
import GalleryModel from './GalleryModel';
import SurvivedByModel from './SurvivedByModel';

const Table = {
    options: {
        tableName: 'deceaseds',
        timestamps: false,
    },
    columns: {
        admin_id: DataTypes.STRING,
        deceased: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        death_date: DataTypes.DATE,
        age: DataTypes.INTEGER,
        display_photo: DataTypes.STRING,
        background_song: DataTypes.STRING,
        biography: DataTypes.TEXT,
        life_history: DataTypes.TEXT,
    }
}

const DeceasedModel = DATABASE.define('DeceasedModel', Table.columns, Table.options);

DeceasedModel.addHook('beforeCreate', async (data: any) => {
    data.id = await generateUniqueId(DeceasedModel);
    data.created_at = new Date();
    data.updated_at = new Date();
});


// Associations
DeceasedModel.hasMany(GalleryModel, { foreignKey: 'deceased_id', as: 'gallery' });
DeceasedModel.hasMany(SurvivedByModel, { foreignKey: 'deceased_id', as: 'survivedBys' });
SurvivedByModel.belongsTo(DeceasedModel, { foreignKey: 'deceased_id', as: 'deceased' });

export default DeceasedModel;
