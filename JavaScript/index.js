// CRUS SYSTEM

// CREATE

var bookMarkName = document.getElementById('bookmarkName');

var webSiteUrl = document.getElementById('bookmarkURL');

var alertMessage = document.getElementById('alert-msg');



var bookList = [];

if (localStorage.getItem('bookContainer') !== null) {
  bookList = JSON.parse(localStorage.getItem('bookContainer'));
  displayBooks();
}


function addBook() {
  if (validationBookName() && validationUrl()) {
    var book = {
      name: bookMarkName.value,
      url: webSiteUrl.value
    }
     bookList.push(book);
     localStorage.setItem('bookContainer', JSON.stringify(bookList));
     displayBooks()
  
     clearForm()
  } else {
    alertMessage.classList.remove('d-none');
  }

}



function displayBooks() {
  var collection = '';

  for ( i = 1; i < bookList.length ; i++) {
    collection +=  `<tr>
    <td class="align-middle">${i}</td>
    <td class="align-middle">${bookList[i].name}</td>
    <td> <a href="${bookList[i].url}" target="_blank" class="btn btn-danger btn-visit pe-2">
    <i class="fa-solid fa-eye "></i> Visit
  </a></td>
    <td><button onclick = "deleteBooks(${i})" class="btn btn-danger btn-delete pe-2"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr> `
  }
  document.getElementById('books-container').innerHTML = collection;


}


function clearForm() {
  bookMarkName.value = null;
  webSiteUrl.value = null;
 
  bookMarkName.classList.remove('is-valid', 'is-invalid');
  webSiteUrl.classList.remove('is-valid', 'is-invalid');
}

function deleteBooks(index) {
  bookList.splice(index, 1);
  localStorage.setItem('bookContainer', JSON.stringify(bookList));
  displayBooks();
}


//validation




function validationBookName(){
  var regexName = /^[a-zA-Z0-9 ]{3,30}$/;
  var name = bookMarkName.value;
  
  if (regexName.test(name)){
    bookMarkName.classList.add('is-valid');
    bookMarkName.classList.remove('is-invalid');
   

    return true
  } else {
    bookMarkName.classList.add('is-invalid');
    bookMarkName.classList.remove('is-valid');
    
    return false
  }
}


function validationUrl() {
  
  var regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  var url = webSiteUrl.value;
 

  if (regexUrl.test(url)){
    webSiteUrl.classList.add('is-valid');
    webSiteUrl.classList.remove('is-invalid');
   

    return true
  } else {
    webSiteUrl.classList.add('is-invalid');
    webSiteUrl.classList.remove('is-valid');
    
    return false
  }
 
}


function closeBtn() {
  alertMessage.classList.add('d-none');
}