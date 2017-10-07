const builder = require('botbuilder')
const createCard = require('../utilities/createCard')
const booth = require('../../data/hackSpecificData').boothLocation

// TODO: Check for channel to send better messages via sms (maybe use session.message.source?)
const lib = new builder.Library('teamInfo')
lib.dialog('/', [
  function (session, args, next) {
    // create card of team members and send it
    session.send(createCard(session))
    session.endDialog(`Come stop by the booth ${booth} and meet our team! We can help you out with your projects and bounce ideas around... or just hang out :)`)
  }
]).triggerAction({
  matches: 'teamInfo'
})

module.exports.createLibrary = function () {
  return lib.clone()
}
