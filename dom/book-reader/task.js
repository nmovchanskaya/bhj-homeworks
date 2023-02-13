let controls = document.querySelector(".book__controls");
let controlFontSize = document.querySelector(".book__control_font-size");
let controlColor = document.querySelector(".book__control_color");
let controlBackground = document.querySelector(".book__control_background");
let book = document.querySelector(".book");

class Book {
    constructor() {
        this.curSize = controlFontSize.querySelector(".font-size_active").dataset.size;
        this.curBg = controlBackground.querySelector(".color_active").dataset.bgColor;
        this.curColor = controlColor.querySelector(".color_active").dataset.textColor;
        this.fontSizeStyle = "";
        if (this.curSize !== undefined) {
            this.fontSizeStyle = " book_fs-" + this.curSize;
        }
    }

    changeStyleProperty(event) {
        let control = "";
        let property = "";

        //define which propery to change
        if (event.target.closest("div").classList.contains("book__control_background")) {
            control = controlBackground;
            this.curBg = event.target.dataset.bgColor;
            property = "color";
        }
        else if (event.target.closest("div").classList.contains("book__control_color")) {
            control = controlColor;
            this.curColor = event.target.dataset.textColor;
            property = "color";
        }
        else if (event.target.closest("div").classList.contains("book__control_font-size")) {
            control = controlFontSize;
            this.curSize = event.target.dataset.size;
            if (this.curSize !== undefined) {
                this.fontSizeStyle = " book_fs-" + this.curSize;
            }
            else {
                this.fontSizeStyle = "";
            }
            property = "font-size";
        }
    
        //deactivate current and activate new control
        control.querySelector("." + property + "_active").classList.remove(property + "_active");
        event.target.classList.add(property + "_active");
    
        //change style for book
        book.className = "book book_color-" + this.curColor + " book_bg-" + this.curBg + this.fontSizeStyle;
    }
}

let eBook = new Book();

controls.addEventListener("click", (e) => {
    if (!(e.target.classList.contains("font-size_active")) &&
        !(e.target.classList.contains("color_active"))
        ){
        eBook.changeStyleProperty(e);
    }
    e.preventDefault();
});
