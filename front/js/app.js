function insertBooks(listElem, books){


    books.forEach( book => {

    	let title = document.createElement('h3');
        title.innerText = book.title;
        
        var clickButton = document.createElement('button');
        clickButton.innerText = 'info';
        clickButton.classList.add('more');
        clickButton.classList.add('btn');
        clickButton.classList.add('btn-success');
        
        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'delete';
        deleteButton.classList.add('delete');
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-danger');

        let li = document.createElement('li');
        li.dataset.id=book.id;

        li.appendChild(title);
        li.appendChild(clickButton); 
        li.appendChild(deleteButton);
        
        listElem.appendChild(li);
    });
}

function showDiv( book, id){

	var thisLi;
	var li = document.querySelectorAll('li');
	for (var i = 0; i < li.length; i++) {
		if (li[i].getAttribute("data-id") == id) {
			thisLi = li[i];
			thisLi.addEventListener('click', function(e) {
		    	e.stopPropagation();
		    })
		}
	}
	
	var author = document.createElement('h5');
    author.innerText = book.author;
    
    var isbn = document.createElement('h5');
    isbn.innerText = book.isbn;
    
    var publisher = document.createElement('h5');
    publisher.innerText = book.publisher;

    var type = document.createElement('h5');
    type.innerText = book.type;

    thisLi.appendChild(author);
    thisLi.appendChild(isbn);
    thisLi.appendChild(publisher);
    thisLi.appendChild(type);
}


document.addEventListener("DOMContentLoaded",function(){
	
	var ul = document.querySelector('ul.books');
	
	$.ajax({
		url: "http://localhost:8080/books/",
		type: "GET",
		dataType: "json"
	})
	.done( books => insertBooks(ul, books) );
	
	$(ul).on('click', function(e){
        if(e.target.classList == 'more btn btn-success') {	
            var parent = e.target.parentElement;
            var id = parent.getAttribute("data-id");
            $.ajax({
        		url: "http://localhost:8080/books/" + id,
        		type: "GET",
        		dataType: "json"
        	})
        	.done( book => showDiv(book, id) );
        } else if(e.target.classList == 'delete btn btn-danger') {	
            var parent = e.target.parentElement;
            var id = parent.getAttribute("data-id");
            $.ajax({
        		url: "http://localhost:8080/books/" + id,
        		type: "DELETE",
        	})
        	.done( function() { alert('DELETE completed'); } )
        	.fail (function() { alert('DELETE failed'); } );
        }
  
    })
    
    
    var submit = document.querySelector('.btn');
	$(submit).on('click', function(event) {
		if(event.target.tagName=="BUTTON"){
			event.preventDefault();
			var title = document.getElementById("title").value;
			var author = document.getElementById("author").value;
			var publisher = document.getElementById("publisher").value;
			var type = document.getElementById("type").value;
			var isbn = document.getElementById("isbn").value;
		}
		$.ajax({
    		url: "http://localhost:8080/books/",
    		data: JSON.stringify({
                "title" : title,
                "author" : author,
                "publisher" : publisher,
                "type" : type,
                "isbn" : isbn}),
    		contentType: "application/json",
    		type: "POST",
    		dataType: "json"
    	})
    	.done (function() { alert('POST completed'); } )
		.fail (function() { alert('POST failed'); } );
	});
	
});