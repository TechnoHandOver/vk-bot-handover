const express = require('express');
const app = express();
const url = require('url');
const easyvk = require('easyvk');

const token = '0ad1117030ea6ab23acf42819b4251076963c066c276d6c1e7338a1fa2fd448a35e406b453e2e630ccd80';

app.get('/bot/respond', (req, res) => {
    const queryObject = url.parse(req.url,true).query;
    const executorId = queryObject['executor_id'];
    const authorId = queryObject['author_id'];

    easyvk({
        token,
    }).then(async (vk) => {
        vk.call('messages.send', {
            peer_id: authorId,
            message: `Ваш заказ взял этот пользователь: https://vk.com/id${executorId}`,
            random_id: easyvk.randomId()
        }).then(() => {
            res.send({ data: { success: true } })
        }).catch((error) => {
            console.log(error);
            res.send({ data: { success: false, error } });
        });
    }).catch((error) => {
        console.log(error);
        res.send({ data: { success: false, error } });
    });
});

app.listen(3000, () => {
    console.log('Bot has been started!');
});
