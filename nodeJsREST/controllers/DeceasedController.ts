import STATUS_CODES from '../config/statusCodes'
import { Request, Response } from 'express';
import CondolenceModel from '../models/CondolenceModel';
import moment from 'moment';
import DeceasedModel from '../models/DeceasedModel';
import { Op } from 'sequelize';

const DeceasedController = {
    async recents(req: Request, res: Response) {
        try {
            const query = await DeceasedModel.findAll({
                attributes: [
                    'id',
                    'deceased',
                    'display_photo',
                    'birth_date',
                    'death_date',
                    'created_at'
                ],
                order: [['created_at', 'DESC']],
                limit: 6,
            });

            return res.status(STATUS_CODES.OK).json(query);
        } catch (error) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching recent records.' });
        }
    },

    async details(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const query = await DeceasedModel.findByPk(id, {
                include: [{ association: 'gallery' }, { association: 'survivedBys' }]
            });

            if (!query) {
                return res.status(STATUS_CODES.NOT_FOUND).json({ error: 'Record not found' });
            }

            return res.status(STATUS_CODES.OK).json(query);
        } catch (error) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching details' });
        }
    },

    async search(req: Request, res: Response) {
        const { string } = req.params;

        try {
            const results = await DeceasedModel.findAll({
                attributes: ['id', 'deceased', 'display_photo', 'birth_date', 'death_date'],
                where: {
                    deceased: {
                        [Op.like]: `%${string}%`
                    }
                }
            });

            return res.status(200).json(results);
        } catch (error) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching details' });
        }
    }
};

export default DeceasedController;
