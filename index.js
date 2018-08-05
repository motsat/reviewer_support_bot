const Botkit = require('botkit');
//const settings = JSON.parse(process.env.ISSUE_BOT_SETTINGS) || require("./data/settings.json");
const gh = require("./module/github-requested_reviewers")('motsat/reviewer_support_bot');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token
}).startRTM(function(err){
    if (err) {
        throw new Error(err);
    }
});

// say hi
controller.hears('hi',['direct_message','direct_mention','mention'],function(bot,message) {
  gh.assign(3)
  bot.reply(message,'hi');
});
