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

const onloadHandler = async () => {
    const response = await fetch('http://localhost:3000/pet')
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
    document.getElementById('name').addEventListener('input', (event) => {
        userData.name = event.target.value
    })
    
    document.getElementById('password').addEventListener('input', (event) => {
        userData.password = event.target.value
    })
    
    document.getElementById('submit_signup').addEventListener('click', async (event) => {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData)
        })
        userData = {}
        document.getElementById('name').value = ''
        document.getElementById('password').value = ''
    })

    let userDataLogin = {}
    document.getElementById('name2').addEventListener('input', (event) => {
        userDataLogin.name = event.target.value
    })
    
    document.getElementById('password2').addEventListener('input', (event) => {
        userDataLogin.password = event.target.value
    })
    
    document.getElementById('submit_login').addEventListener('click', async (event) => {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userDataLogin)
        })
        let token = await response.json()
        localStorage.setItem('token', JSON.stringify(token.token))
        userData = {}
        document.getElementById('name2').value = ''
        document.getElementById('password2').value = ''
    })
}

document.addEventListener("DOMContentLoaded", onloadHandler)