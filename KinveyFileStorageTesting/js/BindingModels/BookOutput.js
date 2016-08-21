var BookOutput = (function(){
    function BookOutput(id,title,author,isbn,imgUrl){
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.imgUrl = imgUrl;
    }

    return BookOutput;
})();