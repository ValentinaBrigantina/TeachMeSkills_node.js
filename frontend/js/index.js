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

// const port = process.env.PORT || 3000
const url = `http://167.172.33.131`

const onloadHandler = async () => {
    const response = await fetch(`${url}/pet`)
    const pets = await (response.ok ? response.json() : [])
    const slider = document.querySelector('.slides')

    const names = document.querySelectorAll('.caption > h3')
    
    pets.forEach(pet => {
        const slide = createSlide(pet.image, pet.name)
        slider.insertAdjacentHTML('beforeend', slide)
    })

    M.Sidenav.init(
        document.querySelector('.sidenav'), {

        }
    )

    M.Slider.init(
        document.querySelectorAll('.slider'), {
            interval: 20000
        }
    )

   
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

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
        document.querySelector('.signUp').classList.remove("active")
        document.querySelector('.collapsible-body1').style.display = ""
        
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
        document.querySelector('.signIn').classList.remove("active")
        document.querySelector('.collapsible-body2').style.display = ""
        createSlide()
    })

    addImage.addEventListener('click', async () => {
        if (!localStorage.token) {
            alert('Need to login')
        }
        else {
            addImage.style.display = 'none'
            const containerUpload = document.querySelector('.containerUpload')
            containerUpload.style.display = 'block'
        }
    })

    upload.addEventListener('click', async (e) => {
        if (!nameImage.value) {
            e.preventDefault()
            alert('Picture not added')
        }
    })

    signOut.addEventListener('click', async () => {
       localStorage.removeItem('token')
    })
}

document.addEventListener("DOMContentLoaded", onloadHandler)
