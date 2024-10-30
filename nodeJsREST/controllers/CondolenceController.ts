import STATUS_CODES from '../config/statusCodes'
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

            for (const item of condos) {
                item.created = moment(item.created_at).fromNow();
                delete item.created_at;
            }


            const transformedCondos = condos.map((item: any) => {
                return {
                    id: item.id,
                    condolence: item.condolence,
                    deceased_id: item.deceased_id,
                    condo_name: item.condo_name,
                    relationship: item.relationship,
                    created: moment(item.created_at).fromNow(),
                };
            });

            return res.status(STATUS_CODES.OK).json(transformedCondos);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ error: "Internal Server Error" }); // Handle errors
        }
    },

    async postCondolence(req: Request, res: Response) {
        const { deceased_id, condolence, condo_name, relationship } = req.body;
        const request = req.body;
        const requiredFields = ['deceased_id', 'condolence', 'condo_name', 'relationship'];

        const missingFields = requiredFields.filter(field => !request[field]);

        if (missingFields.length > 0) {
            return res.status(STATUS_CODES.INVALID_CONTENT).send({
                message: 'Required fields not complete',
                missingFields: missingFields
            });
        }

        try {
            const [condolenceRecord, created] = await CondolenceModel.findOrCreate({
                where: { deceased_id, condo_name, relationship },
                defaults: { condolence }
            });

            return res.status(created ? STATUS_CODES.CREATED : STATUS_CODES.OK).json('Created');
        } catch (error) {
            console.error('Error posting condolence:', error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' }); // Handle errors
        }
    }
};

export default CondolenceController;
