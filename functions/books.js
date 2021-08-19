const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
module.exports = {
    commands: ['books', 'book'],
    expectedArgs: 'Language',
    permissionError: 'Member only command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const { channel } = message
        axios.get('https://learntocodewith.me/posts/programming-books/', {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)' }
        }).then((response) => {
            //console.log(response.data);

            let $ = cheerio.load(response.data);
            let content = []
            $('h3').each((idx, el) => {
                let links = {
                    name: "",
                    link: ""
                }
                links.name = $(el).text()
                links.link = $(el).children('a').attr('href')
                content.push(links)
            })

            let result = content.map(({ name }) => name)
                //console.log(result)

            let args = arguments.toString()
            args = args.charAt(0).toUpperCase() + args.slice(1)
            const a = result.reduce(function(a, e, i) {
                if (e.includes(args)) {
                    a.push(i)
                }

                return a
            }, [])
            console.log(a)
            for (i = 0; i < a.length; i++) {
                message.channel.send(((content[a[i]]).name))
                message.channel.send(((content[a[i]]).link))

            }


        }).catch((error) => {
            console.log(error)
        })

    },


}