class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  showPost(data) {
    let output = "";
    data.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
            </a>
            </div>
            </div>
            `;
          });
          this.post.innerHTML = output;
        }

        showAlert(message, className){
          this.clearAlert()
          let div = document.createElement('div')
    div.className = className
    div.append(document.createTextNode(message))
    const container = document.querySelector('.postsContainer')
    const posts = document.querySelector('#posts')
    container.insertBefore(div, posts)
    setTimeout(() => {
      this.clearAlert()
    }, 3000);
  }
  clearIdInput() {
    document.querySelector("#id").value = "";
  }
  clearField(){
    document.querySelector('#title').value = ''
    document.querySelector('#body').value = ''
  }
  
  clearAlert(){
    const alert = document.querySelector('.alert')
    if (alert) {
      alert.remove()
    }
  }
  fillForm(data){
    this.titleInput.value = data.title    
    this.bodyInput.value = data.body
    this.idInput.value = data.id
    this.showEditState('edit')
  }
  showEditState(type) {
    if (type === 'edit') {   
      this.postSubmit.textContent = 'Update It'
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';
      // Create cancel Button
      const cancelBtn = document.createElement('button')
      cancelBtn.className = 'btn btn-danger btn-block post-cancel'
      cancelBtn.textContent = 'Cancel'
      // Get Parent
      const container = document.querySelector('.card-form')
      const formEnd = document.querySelector('.form-end')
      container.insertBefore(cancelBtn, formEnd)
      
    }  else{
      this.postSubmit.textContent = 'Post It'
      this.postSubmit.className = 'post-submit btn btn-primary btn-block'
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove()
      }
      this.clearField()
      this.clearIdInput()
    }
  }
}

export const ui = new UI();
