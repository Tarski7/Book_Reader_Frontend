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
        
        var editButton = document.createElement('button');
        editButton.innerText = 'edit';
        editButton.classList.add('edit');
        editButton.classList.add('btn');
        editButton.classList.add('btn-warning');  

        let li = document.createElement('li');
        li.dataset.id=book.id;

        li.appendChild(title);
        li.appendChild(clickButton); 
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        
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
    var authorLabel = document.createElement('h5');
    authorLabel.innerText = "Author:";
    
    var isbn = document.createElement('h5');
    isbn.innerText = book.isbn;
    var isbnLabel = document.createElement('h5');
    isbnLabel.innerText = "ISBN:";
    
    var publisher = document.createElement('h5');
    publisher.innerText = book.publisher;
    var publisherLabel = document.createElement('h5');
    publisherLabel.innerText = "Publisher:";

    var type = document.createElement('h5');
    type.innerText = book.type;
    var typeLabel = document.createElement('h5');
    typeLabel.innerText = "Type:";

    thisLi.appendChild(authorLabel);
    thisLi.appendChild(author);
    thisLi.appendChild(isbnLabel);
    thisLi.appendChild(isbn);
    thisLi.appendChild(publisherLabel);
    thisLi.appendChild(publisher);
    thisLi.appendChild(typeLabel);
    thisLi.appendChild(type);
	

    /*var authorLabel = document.createElement('p');
    authorLabel.innerText = "Author:";
    
    var isbnLabel = document.createElement('p');
    isbnLabel.innerText = "ISBN:";
    
    var publisherLabel = document.createElement('p');
    publisherLabel.innerText = "Publisher:";

    var typeLabel = document.createElement('p');
    typeLabel.innerText = "Type:";

    thisLi.appendChild(authorLabel);
    thisLi.appendChild(isbnLabel);
    thisLi.appendChild(publisherLabel);
    thisLi.appendChild(typeLabel);
    
    var author = document.createElement('p');
    author.innerText = book.author;
    
    var isbn = document.createElement('p');
    isbn.innerText = book.isbn;
    
    var publisher = document.createElement('p');
    publisher.innerText = book.publisher;
    
    var type = document.createElement('p');
    type.innerText = book.type;
    
    authorLabel.appendChild(author);
    isbnLabel.appendChild(author);
    publisherLabel.appendChild(author);
    typeLabel.appendChild(author);*/
}

function editDiv( book, id){

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
	
    var title2 = document.querySelector('h5');
    title2.innerText = book.title;
	
}


document.addEventListener("DOMContentLoaded",function(){
	
	var ul = document.querySelector('ul.books');
	//var tt = document.querySelector('div.tt');
	
	$.ajax({
		url: "http://localhost:8080/books2/",
		type: "GET",
		dataType: "json"
	})
	.done( books => insertBooks(ul, books) );
	//.done( books => insertBooks(tt, books) );
	
	$(ul).on('click', function(e){
	//$(tt).on('click', function(e){
        if(e.target.classList == 'more btn btn-success') {	
            var parent = e.target.parentElement;
            var id = parent.getAttribute("data-id");
            $.ajax({
        		url: "http://localhost:8080/books2/" + id,
        		type: "GET",
        		dataType: "json"
        	})
        	.done( book => showDiv(book, id) );
        } else if(e.target.classList == 'delete btn btn-danger') {	
            var parent = e.target.parentElement;
            var id = parent.getAttribute("data-id");
            $.ajax({
        		url: "http://localhost:8080/books2/" + id,
        		type: "DELETE",
        	})
        	.done( function() { alert('DELETE completed'); location.reload(); } )
        	.fail (function() { alert('DELETE failed'); } );
        } else if (e.target.classList == 'edit btn btn-warning') {
        	var parent = e.target.parentElement;
            var id = parent.getAttribute("data-id");
              
            var h3 = parent.querySelector('h3');
            h3.setAttribute('contenteditable', true);
            
            var saveButton = document.createElement('button');
            saveButton.innerText = 'save';
            saveButton.classList.add('save');
            saveButton.classList.add('btn');
            saveButton.classList.add('btn-info');
            
            parent.appendChild(saveButton);       
            
        	$(ul).on('click', function(eee){
            if (eee.target.classList == 'save btn btn-info') {
            	
            	var title = parent.querySelector('h3').innerText;
            	console.log(title);
            	
	            $.ajax({
	        		url: "http://localhost:8080/books2/" + id,
	        		data: JSON.stringify({
	                    "title" : title}),
	        		contentType: "application/json",
	        		type: "PUT",
	        		dataType: "json"
	        	})
	        	.done (function() { alert('PUT completed'); location.reload(); } );
            }
        	});
            
        } 
       
        
    });
    
    
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
    		url: "http://localhost:8080/books2/",
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
    	.done (function() { alert('POST completed'); location.reload(); } )
		.fail (function() { alert('POST failed'); } );
	});

});