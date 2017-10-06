const builder = require('botbuilder')
const hackData = require('../../data/hackSpecificData')

module.exports = (session) => {
  // var members = []
  //   // Populate array of team members
  // hackData.teamMembers.forEach(t => {
  //   var focus = ''
  //   // Create string to represent each member's focus
  //   t.techFocus.forEach((f, i) => {
  //     if (i === t.techFocus.length - 1) {
  //       focus += `${f} `
  //       return
  //     }
  //     focus += `${f}, `
  //   })

  //   // Create card representing each member and add it to the arry
  //   members.push(builder.ReceiptItem.create(session, '', t.name)
  //     .subtitle(focus)
  //     .quantity(400)
  //     .image(builder.CardImage.create(session, t.photoLink)))
  // })
  var body = []
  body.push({
    type: 'TextBlock',
    text: `Microsoft @ ${hackData.hackName}`,
    size: 'extraLarge',
    weight: 'bolder',
    isSubtle: false
  })
  body.push({
    type: 'TextBlock',
    text: 'Meet the team!',
    size: 'large',
    separator: true
  })

  // Add team members to the body
  hackData.teamMembers.forEach(t => {
    var focus = ''
    // Create string to represent each member's focus
    t.techFocus.forEach((f, i) => {
      if (i === t.techFocus.length - 1) {
        focus += `${f} `
        return
      }
      focus += `${f}, `
    })

    // Create column set representing each member and add it to the body
    body.push({
      type: 'ColumnSet',
      separator: true,
      columns: [
        {
          type: 'Column',
          width: 1,
          items: [
            {
              type: 'TextBlock',
              text: t.name,
              size: 'medium'
            },
            {
              type: 'TextBlock',
              text: focus,
              wrap: true,
              spacing: 'none'
            }
          ]
        },
        {
          type: 'Column',
          width: 'auto',
          items: [
            {
              type: 'Image',
              url: t.photoLink,
              size: 'large',
              horizontalAlignment: 'right',
              spacing: 'none'
            }
          ]
        }
      ]
    })
  })

  const card = {
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.0',
    type: 'AdaptiveCard',
    body: [body]
  }

  var msg = new builder.Message(session)
    .addAttachment({contentType: 'application/vnd.microsoft.card.adaptive', content: card})

  return msg
}
