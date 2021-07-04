const { TOKEN, BTCKEY } = require('./config.json');

const { VK, CallbackService } = require('vk-io');
const { HearManager } = require('@vk-io/hear');
const getBtcValue = require('btc-value');

const vk = new VK({
  token: TOKEN,
});

getBtcValue.setApiKey(BTCKEY);

const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);

hearManager.hear('/btc', async (ctx) => {
  try {
    const btcResult = await getBtcValue();

    await ctx.send(`Курс биткоина в данный момент = ${btcResult}$`);
  } catch (err) {
    console.error(err);
  }
});

void (async () => {
  try {
    console.log('author: @akityjs');
    await vk.updates.startPolling();
    console.log(`[$] Bot started.`);
  } catch (err) {
    console.error(err);
  }
})();
