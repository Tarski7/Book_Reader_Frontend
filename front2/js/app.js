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
        
        var hideButton = document.createElement('button');
        hideButton.innerText = 'hide';
        hideButton.classList.add('hideB');
        hideButton.classList.add('btn');
        hideButton.classList.add('btn-info');

        let li = document.createElement('li');
        li.dataset.id=book.id;

        li.appendChild(title);
        li.appendChild(clickButton);
        li.appendChild(hideButton);
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        
        hideButton.style.display = 'none';
        
        listElem.appendChild(li);
    });
}

function showDiv( book, id){

	var thisLi;
	var li = document.querySelectorAll('li');
	for (var i = 0; i < li.length; i++) {
		if (li[i].getAttribute("data-id") == id) {
			thisLi = li[i];
			/*thisLi.addEventListener('click', function(e) {
		    	e.stopPropagation();
		    })*/
		}
	}
	
	var author = document.createElement('h5');
    author.innerText = book.author;
    author.classList.add('author');
    var authorLabel = document.createElement('h5');
    authorLabel.innerText = "Author:";
    
    var isbn = document.createElement('h5');
    isbn.innerText = book.isbn;
    isbn.classList.add('isbn');
    var isbnLabel = document.createElement('h5');
    isbnLabel.innerText = "ISBN:";
    
    var publisher = document.createElement('h5');
    publisher.innerText = book.publisher;
    publisher.classList.add('publisher');
    var publisherLabel = document.createElement('h5');
    publisherLabel.innerText = "Publisher:";

    var type = document.createElement('h5');
    type.innerText = book.type;
    type.classList.add('type');
    var typeLabel = document.createElement('h5');
    typeLabel.innerText = "Type:";

    hideButton = thisLi.querySelector('.hideB');
    hideButton.style.display = 'initial';
    
    thisLi.appendChild(authorLabel);
    thisLi.appendChild(author);
    thisLi.appendChild(isbnLabel);
    thisLi.appendChild(isbn);
    thisLi.appendChild(publisherLabel);
    thisLi.appendChild(publisher);
    thisLi.appendChild(typeLabel);
    thisLi.appendChild(type);
    
    var clickButton = thisLi.querySelector('.btn-success');
    clickButton.style.display = 'none';
    
    $(hideButton).on('click', function(eee){
    	
        if (eee.target.classList == 'hideB btn btn-info') {
        	authorLabel.style.display = 'none';
        	author.style.display = 'none';
        	isbnLabel.style.display = 'none'; 
        	isbn.style.display = 'none'; 
        	publisherLabel.style.display = 'none'; 
        	publisher.style.display = 'none'; 
        	typeLabel.style.display = 'none'; 
        	type.style.display = 'none'; 
        	hideButton.style.display = 'none';
        	clickButton.style.display = 'initial';
        }
        
    });
}


document.addEventListener("DOMContentLoaded",function(){
	
	var ul = document.querySelector('ul.books');
	
	$.ajax({
		url: "http://localhost:8080/books2/",
		type: "GET",
		dataType: "json"
	})
	.done( books => insertBooks(ul, books) );
	
	$(ul).on('click', function(e){
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
            h3.style = "background-color:grey";
            
            var h5author = parent.querySelector('.author');
            h5author.setAttribute('contenteditable', true);
            h5author.style = "background-color:grey";
            
            var h5isbn = parent.querySelector('.isbn');
            h5isbn.setAttribute('contenteditable', true);
            h5isbn.style = "background-color:grey";
            
            var h5publisher = parent.querySelector('.publisher');
            h5publisher.setAttribute('contenteditable', true);
            h5publisher.style = "background-color:grey";
            
            var h5type = parent.querySelector('.type');
            h5type.setAttribute('contenteditable', true);
            h5type.style = "background-color:grey";
            
            var saveButton = document.createElement('button');
            saveButton.innerText = 'save';
            saveButton.classList.add('save');
            saveButton.classList.add('btn');
            saveButton.classList.add('btn-info');
            
            parent.appendChild(saveButton);       
            
        	$(ul).on('click', function(eee){
            if (eee.target.classList == 'save btn btn-info') {
            	
            	var title = parent.querySelector('h3').innerText;
            	var author = parent.querySelector('.author').innerText;
            	var isbn = parent.querySelector('.isbn').innerText;
            	var publisher = parent.querySelector('.publisher').innerText;
            	var type = parent.querySelector('.type').innerText;
            	
	            $.ajax({
	        		url: "http://localhost:8080/books2/" + id,
	        		data: JSON.stringify({
	                    "title" : title,
	                    "author" : author,
	                    "publisher" : publisher,
	                    "type" : type,
	                    "isbn" : isbn}),
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