exports.findMyIp = async (req, res, next) => {
    try {
        const response = {
            ip: req.ip
        }
        return res.status(200).send(response);
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: error });
    }
};