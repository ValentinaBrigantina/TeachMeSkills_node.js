const createSlide = (path, name) => {
    return `
        <li>
            <img src=${path}>
            <div class="caption center-align">
                <h3>${name}</h3>
            </div>
        </li>
    `
}
const url = 'http://localhost:3000'

const onloadHandler = async () => {
    const response = await fetch(`${url}/pet`)
    const pets = await (response.ok ? response.json() : [])
    const slider = document.querySelector('.slides')

    const names = document.querySelectorAll('.caption > h3')
    
    pets.forEach(pet => {
        const slide = createSlide(pet.image, pet.name)
        slider.insertAdjacentHTML('beforeend', slide)
    })

    M.Slider.init(
        document.querySelectorAll('.slider'), {
            interval: 20000
        }
    )

    let userData = {}
    name_user.addEventListener('input', (event) => {
        userData.name = event.target.value
    })
    
    password.addEventListener('input', (event) => {
        userData.password = event.target.value
    })
    
    submit_signup.addEventListener('click', async () => {
        const response = await fetch(`${url}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData)
        })
        userData = {}
        name_user.value = ''
        password.value = ''
    })

    let userDataLogin = {}
    name_user2.addEventListener('input', (event) => {
        userDataLogin.name = event.target.value
    })
    
    password2.addEventListener('input', (event) => {
        userDataLogin.password = event.target.value
    })
    
    submit_login.addEventListener('click', async () => {
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userDataLogin)
        })
        let token = await response.json()
        localStorage.setItem('token', JSON.stringify(token.token))
        userDataLogin = {}
        name_user2.value = ''
        password2.value = ''
    })
}

document.addEventListener("DOMContentLoaded", onloadHandler)