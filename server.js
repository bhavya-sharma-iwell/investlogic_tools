const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyparser.json()) 

app.use('/api/portfolioCorrelation', require('./routes/portfolioCorrelation'))
app.use('/api/invoiceGenerator', require('./routes/invoiceGenerator'))
app.use('/api/portfolioOverlap', require('./routes/portfolioOverlap'))

app.all('/*', (req, res) => {
  res.status(404).send('API cannot be  Found')
})

//running the server
app.listen(3000, () => { console.log(`Express server listening on port 3000`) })