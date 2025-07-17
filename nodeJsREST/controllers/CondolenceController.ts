import STATUS_CODES from '../config/statusCodes';
import CondolenceModel from '../models/CondolenceModel';
import { Request, Response } from 'express';
import moment from 'moment';

const CondolenceController = {
    async getCondolences(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(STATUS_CODES.INVALID_CONTENT).send({
                message: 'Required id missing',
            });
        }

        try {
            const condos = await CondolenceModel.findAll({
                attributes: ['id', 'condolence', 'condo_name', 'relationship', 'created_at', 'deceased_id'],
                where: { deceased_id: id },
                order: [['created_at', 'DESC']],
            });

            // More efficient transformation
            const transformedCondos = condos.map((item: any) => ({
                id: item.id,
                condolence: item.condolence,
                deceased_id: item.deceased_id,
                condo_name: item.condo_name,
                relationship: item.relationship,
                created: moment(item.created_at).fromNow(),
            }));

            return res.status(STATUS_CODES.OK).json(transformedCondos);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
                error: "Internal Server Error",
                message: "Failed to retrieve condolences"
            });
        }
    },

    async postCondolence(req: Request, res: Response) {
        const { deceased_id, condolence, condo_name, relationship } = req.body;
        const requiredFields = ['deceased_id', 'condolence', 'condo_name', 'relationship'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(STATUS_CODES.INVALID_CONTENT).send({
                message: 'Required fields not complete',
                missingFields: missingFields
            });
        }

        try {
            const newCondolence = await CondolenceModel.create({
                deceased_id,
                condolence,
                condo_name,
                relationship
            });

            return res.status(STATUS_CODES.CREATED).json({
                message: 'Condolence created successfully',
                data: {
                    id: newCondolence.id,
                    created_at: newCondolence.created_at
                }
            });
        } catch (error) {
            console.error('Error posting condolence:', error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
                error: 'Internal server error',
                message: 'Failed to create condolence'
            });
        }
    }
};

export default CondolenceController;