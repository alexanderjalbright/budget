export default (req, res) => {
    res.statusCode = 200;
    let body = req.body;
    if (req.method === 'POST') {
        res.json({ apiReturn: `Posted ${body} successfully` });
    }
};
