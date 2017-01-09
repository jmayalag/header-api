'use strict'

const express = require('express')
const morgan = require('morgan')
const app = express()

app.set('port', process.env.PORT || 8080)
app.use(morgan('combined'))

app.get('/', (req, res) => {
    let userAgent = req.get('user-agent')
    let start = userAgent.indexOf('(') + 1
    let end = userAgent.indexOf(')')
    let software = userAgent.substring(start, end)
    
    let result = {
        ip: req.get('x-forwarded-for'),
        language: req.acceptsLanguages()[0] || null,
        software: software
    }
    res.send(result)
})

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})
