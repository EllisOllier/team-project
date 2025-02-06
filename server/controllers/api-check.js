exports.getApiCheck = async (req, res) => {
    res.status(200).json({
        message: 'online',
    });
}