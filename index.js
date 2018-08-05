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
controller.hears('review', ['direct_message','direct_mention','mention'],function(bot,message) {
  var args = message.text.split(" ");
  // args[0] "review"
  // args[1] "bd" or <url>
  // args[2]  <url>
  url = ""
  if (args.length == 2) {
    url = args[1]
  } else if (args.length == 3) {
    url = args[2]
  }
  paths = url.split("/")
  prNumber = paths[paths.length - 1]
  prNumber = prNumber.slice(0, -1) // >をとる
  console.log(prNumber)
  gh.assign(3)
  bot.reply(message, "@mo10sat10slack please");
});
