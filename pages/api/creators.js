import { useSession, getSession } from 'next-auth/client';

export default (req, res) => {
    res.statusCode = 200;
    res.json(['Alex Albright', 'Artie Negron', 'Jordon West']);
};
