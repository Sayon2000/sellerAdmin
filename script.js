let myform = document.querySelector('form')
myform.addEventListener('submit' , handleSubmit)

const axiosInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/ed024fbbfc744958a0eaf2f8a2415e99/store',

  });



async function handleSubmit(e){
    e.preventDefault();
    const price = e.target.price.value;
    const description = e.target.description.value;
    const category  = e.target.category.value;
    const data = {price , description , category}
    console.log(data)
    const ul = document.getElementById(category).querySelector('ul')

    let res = await axiosInstance.post('',data)
    console.log(res)
    const li = createLi(res.data)
    ul.appendChild(li)
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