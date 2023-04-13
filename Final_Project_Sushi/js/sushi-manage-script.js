var categories = []
var addSushiButton
var title
const server = 'http://localhost:8080'

$(document).ready(async function () {
  addSushiButton = document.getElementById('add-sushi-button')
  addSushiButton.disabled = true

  await getCategories()
})

async function getCategories() {
  try {
    const response = await axios.get(server + '/sushi/categories')
    for (const item of response.data) {
      categories.push(item)
    }
  } catch (error) {
    console.log(error)
  }
}

var imageId = null
var el = document.getElementById('file')
el.addEventListener('change', function (e) {
  console.log(this)
  console.log(e.target)
  let files = e.target.files
  console.log(files)
  if (!files.length) return

  file = files[0]
  previewFile(files[0])
  formData = new FormData()
  formData.append('name', 'name')
  formData.append('description', 'name')
  formData.append('file', files[0], files[0].name)
  console.log(formData)
  axios({
    method: 'post',
    url: 'http://localhost:8080/images',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(function (response) {
      console.log(response)
      imageId = response.data.id
      addSushiButton.disabled = false
      console.log(imageId)
    })
    .catch(function (response) {
      console.log(response)
    })
})

function previewFile(file) {
  let reader
  if (file) {
    reader = new FileReader()
    reader.readAsDataURL(file)
  }
  reader.onload = function (e) {
    document.getElementById('img-preview').src = e.target.result
  }
}

function addSushi() {
  const category = document.getElementById('category').value
  const title = document.getElementById('title').value
  const subTitle = document.getElementById('subTitle').value
  const price = document.getElementById('price').value
  const description = document.getElementById('description').value
  console.log(category, title, subTitle, price, description, imageId)

  // Post
  const data = {
    category,
    title,
    subTitle,
    price,
    description,
    imageId,
  }

  axios({
    method: 'post',
    url: 'http://localhost:8080/sushi',
    data,
  })
    .then(function (response) {
      console.log(response)
      imageId = response.data.id
      console.log(imageId)
      $('#message-modal').modal('show')
    })
    .catch(function (response) {
      console.log(response)
    })
}
