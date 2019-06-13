var app = new Vue({
    el: '#generator',
    data: {
        title: "",
        selected: "",
        memes: [
            {name: 'Buddy Christ', id: 1, path:'./images/Buddy-Christ.jpg', 
                url:'https://knowyourmeme.com/memes/buddy-christ'},
            {name: 'Bubbles Girl', id: 2, path:'./images/Chubby-Bubbles-Girl.jpg',
                url:'https://knowyourmeme.com/memes/chubby-bubbles-girl'},
            {name: 'One Does Not Simply', id: 3, path:'./images/One-Does-Not-Simply.jpg',
                url: 'https://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor'},
            {name: 'Disaster Girl', id: 4, path:'./images/Disaster-Girl.jpg',
            url:'https://knowyourmeme.com/memes/disaster-girl'},
            {name: 'Too Damn High', id: 5, path:'./images/Too-Damn-High.jpg',
            url:'https://knowyourmeme.com/memes/the-rent-is-too-damn-high-jimmy-mcmillan'},
            {name: 'Michael Jackson Popcorn', id: 6, path:'./images/Michael-Jackson-Popcorn.jpg',
            url:'https://knowyourmeme.com/memes/popcorn-gifs'},
            {name: 'So Hot Right Now', id: 7, path:'./images/Mugatu-So-Hot-Right-Now.jpg',
            url:'https://imgflip.com/meme/Mugatu-So-Hot-Right-Now'},
            {name: 'Think About It', id: 8, path:'./images/Roll-Safe-Think-About-It.jpg',
            url:'https://knowyourmeme.com/memes/roll-safe'},
            {name: 'Peter Parker', id: 9, path:'./images/Spiderman-Peter-Parker.jpg',
            url:'https://knowyourmeme.com/memes/spider-man/children'},
            {name: 'Surprised Pikachu', id: 10, path:'./images/pikachu.png',
            url:'https://knowyourmeme.com/memes/surprised-pikachu'},
            {name: "You Don't Say", id: 11, path:'./images/You-Dont-Say.jpg',
            url:'https://knowyourmeme.com/memes/you-dont-say--3'},
            {name: "Pointing Spiderman", id: 12, path:'./images/pointing-spiderman.jpg',
            url:'https://knowyourmeme.com/memes/spider-man-pointing-at-spider-man'}
        ],
        items: [],
        findTitle: "",
        findMeme: "",
        selectedMeme: "",
        showDialog: false,
        memeCaption: "",

    },
    created() {
        this.getMemes();
    },
    methods: {
        async getMemes() {
            try {
                let response = await axios.get("/api/items");
                this.items = response.data;
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
        selectMeme(item) {
            this.findTitle = "";
            this.findMeme = item;
        },
        setMeme(meme) {
            this.selectedMeme = {...meme};
            this.showDialog = true;
            this.memeCaption = "";
        },
        async saveMeme() {
            try {
                let response = await axios.post("/api/save", {
                    meme: this.selectedMeme.path,
                    caption: this.memeCaption,
                });
            }
            catch (error) {
                console.log(error);
            }
            this.showDialog = false;
        }
    },
    computed: {
        suggestions() {
            return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
        }
    },
})

