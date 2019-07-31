import express from 'express';
import axios from 'axios';
import parseFile from './osu/Parser';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/getBeatmap', async (req, res) => {
    const result = await axios.get(`https://osu.ppy.sh/osu/1900365`);

    if (result && result.data) {
        const beatmap = result.data;
        const osuFile = parseFile(beatmap);
        res.json(osuFile);
    } else {
        res.json({ error: 'ops '});
    }
});

export default router;
