import crypto from 'crypto';

const generateUniqueId = async (model: any) => {
    let uniqueId;
    const length = 18;

    do {
        // Generate a random string using crypto
        uniqueId = crypto.randomBytes(length).toString('hex').substring(0, length);
    } while (await model.findOne({ where: { id: uniqueId } })); // Check if ID already exists

    return uniqueId;
};

export default generateUniqueId
