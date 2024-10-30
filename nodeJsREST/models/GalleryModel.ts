import { DataTypes } from 'sequelize';
import DATABASE from '../config/database';
import generateUniqueId from '../useFxn/generateUniqueId';
import DeceasedModel from './DeceasedModel';

const Table = {
    options: {
        tableName: 'galleries',
        timestamps: false,
    },
    columns: {
        deceased_id: DataTypes.STRING,
        gallery: DataTypes.STRING,
        gallery_name: DataTypes.STRING,
    }
}

const GalleryModel = DATABASE.define('GalleryModel', Table.columns, Table.options);

GalleryModel.addHook('beforeCreate', async (data: any) => {
    data.id = await generateUniqueId(GalleryModel);
    data.created_at = new Date();
    data.updated_at = new Date();
});

// GalleryModel.belongsTo(DeceasedModel, { foreignKey: 'deceased_id', as: 'deceased' });

export default GalleryModel;
