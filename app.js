const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
    
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const email = req.body.email
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    
    const jsonData = JSON.stringify(data)
    
    const url = 'https://us21.api.mailchimp.com/3.0/lists/a2fb1d1bda'
    const options = {
        method: 'POST',
        auth: 'abhirup:0b4cc575d396b7ec41ac68a250a1c1a4-us21'
    }
    
    const request = https.request(url, options, (response) => {
        
        response.statusCode === 200 ?
        res.sendFile(__dirname + '/success.html') :
            res.sendFile(__dirname + '/failure.html') 
            
            
            // response.on('data', (data) => {
                //     console.log(JSON.parse(data))
                // })
            })
            
            request.write(jsonData)
            request.end()
            
})

app.post('/failure', (req, res) => {
    res.redirect('/')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})