const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

// messageOne.textContent = 'LOL'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = searchElement.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error) return messageOne.textContent = 'Error: '+ data.error
        
            messageOne.textContent = 'Location: '+ data.location
            messageTwo.textContent ='Forecast:'+ JSON.stringify(data.forecast)
        })
    })
})