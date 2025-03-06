exports.getApiCheck = async (req, res) => {
    // Respond with 'online' when getApiCheck is called
    res.status(200).json({
        message: 'online',
    });
}