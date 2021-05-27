const { 
    TOKEN,
    BTCKEY
} = require("./config");

const { VK, CallbackService } = require('vk-io'); 
const { HearManager } = require('@vk-io/hear'); 
const btcValue = require('btc-value'); 

const vk = new VK({
	token: TOKEN
});

btcValue.setApiKey(BTCKEY);

const hearManager = new HearManager(); 
const callbackService = new CallbackService(); 

vk.updates.on('message_new', hearManager.middleware);

vk.updates.startPolling()
    .then(() => console.log('author: @akityjs'), console.log(`[$] Bot started.`));

hearManager.hear('/btc', async (ctx) => { 
    btcValue().then(value => {
        ctx.send('Курс биткоина в данный момент = ' + value + '$');
    })
});

vk.updates.start().catch(console.error);