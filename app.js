const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '452289519:AAHPs8rHJ9WkTgB1JpX_lzeLszTvFKSmv6A';
const bot = new TelegramBot(TOKEN, {polling: true});

const images = {
  asian: [
    'http://www.pornodiesel.me/contents/categories/4.jpg',
    'http://thelordofporn.com/wp-content/uploads/2014/03/top10asianpornstars-JaydenLee.jpg',
    'https://images.complex.com/complex/image/upload/c_limit,w_680/fl_lossy,pg_1,q_auto/nx9oy4s7qp5ixjkkbkk4.jpg'
  ],
  'europe': [
    'https://cdn.pornpics.com/pics/2015-10-31/199970_10big.jpg',
    'https://i.pinimg.com/originals/5a/ba/a0/5abaa07f217b6711c126f8fba6f14bfb.jpg',
    'http://candy.porn/upload/media/posts/2017-07/25/top-10-european-porn-stars_1501012108-b.jpg'
  ],
  usa: [
    'https://i.ytimg.com/vi/GWdADPlWfDs/maxresdefault.jpg',
    'https://bpositive.eu/images1/big/13598.jpg',
    'https://images.askmen.com/1080x540/news/entertainment/ex-pornstar-sasha-grey-pulled-into-russia-ukraine-war-1103323-TwoByOne.jpg'
  ]
};

const pictures = [...images.asian, ...images.europe, ...images.usa];

let notes = [];

bot.onText(/\/echo (.+)/, (msg, match) => {
  let fromId = msg.from.id;
  let resp = match[1];
  
  bot.sendMessage(fromId, resp);
});

bot.onText(/\/remember (.+) in (.+)/, (msg, match) => {
  let userId = msg.from.id;
  let text = match[1];
  let time = match[2];
  
  notes.push({
    'uid': userId,
    'time': time,
    'text': text
  });
  
  bot.sendMessage(userId, 'Ok, fuck you)');
});

bot.on('message', (msg) => {
  let chatId = msg.chat.id;  
  let random = Math.floor(Math.random() * pictures.length);
  
  bot.sendPhoto(chatId, pictures[random], {caption: 'You search that?'});
});

setInterval(() => {
  for (let i = 0; i < notes.length; i++) {
    let currentDate = `${new Date().getHours()}:${new Date().getMinutes()}`;
    if (notes[i].time == currentDate) {
      bot.sendMessage(notes[i].uid, `You must: ${notes[i].text} now.`);
      notes.splice(i, 1);
    }
  }
});