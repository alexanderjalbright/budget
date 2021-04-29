export default (req, res) => {
    if (req.method === 'POST') {
        console.log;
        let body = req.body;
        res.statusCode = 200;
        return res;
    }
};
