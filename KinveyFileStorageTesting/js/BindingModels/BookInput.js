var BookInput = (function(){
    function BookInput(title,author,isbn, imgUrl){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.imgUrl = imgUrl;
    }

    return BookInput;
})();