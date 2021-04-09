import { useSession, getSession } from 'next-auth/client';

export default (req, res) => {
    res.statusCode = 200;

    res.json(shuffleArray(['Alex Albright', 'Artie Negron', 'Jordon West']));
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
}
