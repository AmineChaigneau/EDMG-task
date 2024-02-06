const isLocalhost = Boolean(
    window.location.hostname === 'localhost'
)

let protocol, url = true;

if(isLocalhost) {
    protocol = 'http'
    url = 'localhost:8000'
    console.log('Api = local/none')
} else {
    protocol = 'https'
    url = 'economic-game-task-api.herokuapp.com'
    console.log('Api = heroku')
}

export const proxy = `${protocol}://${url}`

