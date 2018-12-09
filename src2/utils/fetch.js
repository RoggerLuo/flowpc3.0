import Fetch from 'dvax/fetch'
const fetch = Fetch({ 
    baseUrl: `http://1.1.1.1`,
    headers: {
        "Content-Type": "application/json",
    },
    bodyTransform(body){
        return JSON.stringify(body)
    }
})
export default fetch

