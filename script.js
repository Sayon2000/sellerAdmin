let myform = document.querySelector('form')
myform.addEventListener('submit' , handleSubmit)

window.addEventListener('load' , renderElements)



const axiosInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/6c582baa654b4b10b4cc711097438385/store',

  });


async function renderElements(e){
    const res = await axiosInstance.get()
    console.log(res)
    res.data.forEach(elem =>{
        const ul = document.getElementById(elem.category).querySelector('ul')
        const li = createLi(elem)
        ul.appendChild(li)
    })
}


async function handleSubmit(e){
    e.preventDefault();
    const price = e.target.price.value;
    const description = e.target.description.value;
    const category  = e.target.category.value;
    const data = {price , description , category}
    console.log(data)
    const ul = document.getElementById(category).querySelector('ul')

    let res = await axiosInstance.post('',data)
    if(res.statusText === "Created"){


    const li = createLi(res.data)
    ul.appendChild(li)
    e.target.price.value =''
    e.target.description.value =''
    }
}

function createLi(data){
    let li = document.createElement('li')
    li.textContent = `${data.price} - ${data.category} - ${data.description} `

    const delBtn = document.createElement('button')
    delBtn.id = data._id
    delBtn.className ='delete'
    delBtn.textContent = "Delete"

    li.appendChild(delBtn)
    return li
}

let products = document.getElementById('products')
products.addEventListener('click' , handleClick)

async function handleClick(e){
    if(e.target.classList.contains('delete')){
        let ul = e.target.parentNode.parentNode;
        let li = e.target.parentNode
        let id = e.target.id
        console.log(id)
        let res = await axiosInstance.delete(`/${id}`)
        console.log(res)
        if(res.status === 200){
            ul.removeChild(li)
        }

    }
}
