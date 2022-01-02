import { http } from "./https";
import { ui } from "./ui";
// LOAD DB elemens
document.addEventListener('DOMContentLoaded', getPosts)

// Submit post Event
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Delete Post Event
document.querySelector('#posts').addEventListener('click', deletePost)

// Update Post Event
document.querySelector('#posts').addEventListener('click', updatePost)

// Cancel Post Edit Event
document.querySelector('.card-form').addEventListener('click', cancelEditPost)


// Fetching post from DB and displaying on UI
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(res => ui.showPost(res))
    .catch(err => console.log(err))
}

// Submit post Fxn
function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').value
  
  let data = {
    title,
    body
  }
if (title == '' || body == '') {
  ui.showAlert('Please fill in the fields', 'alert alert-warning')
} else {
    if (id === '') {
    http.post('http://localhost:3000/posts', data)
    .then(data => {
      // console.log(id)
      ui.showAlert('Post Added', 'alert alert-success')
      ui.clearField()
      getPosts()
    })
    .catch(err => console.log(err)) 
    } else {
    http.put(`http://localhost:3000/posts/${id}`, data)
    .then(data => {
      console.log(id)
      ui.showAlert('Post Updated', 'alert alert-success')
      ui.showEditState('add')
      getPosts()
    })
    .catch(err => console.log(err))
    }
  }
}

// Delete Post Fxn
function deletePost(e) {
if (e.target.parentElement.classList.contains('delete')) {
  if (confirm('Are you sure? ')) { 
      const id = e.target.parentElement.dataset.id
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post Deleted', 'alert alert-danger')
        getPosts()
      })
      .catch(err => console.log(err))
    }  
  }
  e.preventDefault()

} 

// Update post Fxn
function updatePost(e) {
  if (e.target.parentElement.classList.contains('edit')) {
   const id = e.target.parentElement.dataset.id 
   const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
   const body = e.target.parentElement.previousElementSibling.textContent
   const data = {title, body, id}
   ui.fillForm(data)
  }
  e.preventDefault()
}

function cancelEditPost(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.showEditState('add')
  }
  e.preventDefault()
}