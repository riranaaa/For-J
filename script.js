const pages = [

    {
        image: "images/jalal-kid.jpg",
        title: "قصه‌ی جلال کوچولو",
        text: `
        سلام...

        این جلال کوچولوئه.

        تو بهتر از هر کسی می‌شناسیش.

        یه بچه‌ی خیلی باهوش...

        زندگی هم خیلی زود یادش داد که همیشه همه چیز آسون نیست.

        ولی جلال کوچولو یه ویژگی داشت...

        هر وقت یه مشکلی جلوش سبز می‌شد،

        یه راه خلاقانه برای رد شدن ازش پیدا می‌کرد.
        `,
        button: "📖 ورق بزن"
    },


    {
        image: "images/jalal-kid.jpg",
        text: `
        جلال بزرگ‌تر شد...

        هر سال یه چیزی یاد گرفت.

        هر سال یه مشکلی رو پشت سر گذاشت.

        کم‌کم چیزایی که یه زمانی براش ترسناک بودن...

        شدن یه مسئله‌ی ساده.

        اون‌قدر که شد پشت و پناه خیلی از عزیزانش.
        `
    },


    {
        text: `
        حالا...

        آقا جلال نزدیک چهل سالشه.

        کار...

        خانواده...

        هزار تا دغدغه‌ی شخصی...

        بحران میانسالی...

        و اوضاع اسفناک کشور...

        همه‌شون با هم ریختن روی سرش.

        اون‌قدر زیاد...

        که یه اتفاق عجیب افتاد...

        انگار جلال کوچولو دوباره برگشته.

        الان خودش رو یه بچه می‌بینه که وسط یه عالمه مشکل گیر کرده...

        که جثه‌ی خودش کوچیک‌تر از مشکلاتشه.
        `
    },


    {
        question: true,

        text: `
        به نظرت...

        جلال واقعاً یادش رفته قبلاً از چه چیزایی رد شده؟
        `
    },


    {
        image: "videos/hug.mp4",

        text: `
        پس همین الان جلال کوچولو رو بغلش کن و اینجوری نازش کن.

        به نظرت می‌تونی ادامه بدی؟
        `,

        onlyYes:true
    },


    {
        text: `
        پس بسه ناراحتی کردن...

        پاشو...

        جمع کن خودتو...

        آسمون که به زمین نیومده.

        برگرد به بهترین روتین زندگیت،

        مطمئن باش بهترین روتین زندگیت هم بهت برمی‌گرده.

        مثل همیشه زندگی کن.

        تو مثل همیشه باش...

        مطمئنم مثل همیشه موفق می‌شی.
        `
    },


    {
        final:true,

        emoji:"💪🏻",

        text:`
        همین.

        پایان قصه نیست...

        فقط شروع دوباره‌ی همون جلالیه

        که همیشه بلد بوده از سخت‌ترین روزهای زندگیش عبور کنه.

        مطمئنم مثل همیشه موفق می‌شی.
        `
    }

];



let currentPage = 0;



const content = document.getElementById("page-content");
const pageNumber = document.getElementById("page-number");

const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");

const pageBox = document.getElementById("book-page");

const music = document.getElementById("background-music");

let musicStarted = false;



// شروع موزیک با اولین لمس

document.body.addEventListener("click",()=>{

    if(!musicStarted){

        music.play().catch(()=>{});

        musicStarted=true;

    }

},{once:false});





function renderPage(){


    pageBox.classList.remove("fade-in");

    pageBox.classList.add("fade-out");


    setTimeout(()=>{


        const page = pages[currentPage];


        content.innerHTML="";



        if(page.image){

            const img=document.createElement("img");

            img.src=page.image;

            img.className="story-image";

            content.appendChild(img);

        }



        if(page.final){

            const emoji=document.createElement("div");

            emoji.className="emoji-final";

            emoji.textContent=page.emoji;

            content.appendChild(emoji);

        }



        if(page.title){

            const title=document.createElement("h1");

            title.textContent=page.title;

            content.appendChild(title);

        }



        const text=document.createElement("p");

        text.innerHTML=page.text.replace(/\n/g,"<br>");

        content.appendChild(text);





        if(page.question){


            const buttons=document.createElement("div");

            buttons.className="answer-buttons";


            const yes=document.createElement("button");

            yes.className="nav-btn answer-btn";

            yes.textContent="آره";


            const no=document.createElement("button");

            no.className="nav-btn answer-btn";

            no.textContent="نه";



            yes.onclick=()=>{


                content.innerHTML="";


                const msg=document.createElement("p");

                msg.innerHTML=
                `
                با حافظه‌ی تو،

                <br>

                پذیرش «یادم رفته»

                <br>

                ممکن نیست.
                `;

                content.appendChild(msg);


                nextBtn.classList.add("hidden");

                backBtn.classList.remove("hidden");

            };



            no.onclick=()=>{

                nextPage();

            };



            buttons.appendChild(yes);

            buttons.appendChild(no);

            content.appendChild(buttons);


        }



        if(page.onlyYes){


            nextBtn.textContent="آره";


            const no=document.createElement("button");

            no.className="nav-btn";

            no.textContent="نه";

            no.disabled=true;


            content.appendChild(no);


        }



        pageNumber.textContent=
        `${convertNumber(currentPage+1)} از ${convertNumber(pages.length)}`;



        backBtn.classList.toggle(
            "hidden",
            currentPage===0
        );



        if(currentPage===pages.length-1){

            nextBtn.classList.add("hidden");

            createHearts();

        }

        else{

            nextBtn.classList.remove("hidden");

            nextBtn.textContent =
            page.button || "ادامه";

        }



        pageBox.classList.remove("fade-out");

        pageBox.classList.add("fade-in");



    },350);



}




function nextPage(){

    if(currentPage < pages.length-1){

        currentPage++;

        renderPage();

    }

}



function previousPage(){

    if(currentPage>0){

        currentPage--;

        renderPage();

    }

}




nextBtn.onclick=nextPage;

backBtn.onclick=previousPage;





function createHearts(){


    for(let i=0;i<12;i++){


        setTimeout(()=>{


            const heart=document.createElement("div");

            heart.className="heart";

            heart.textContent="❤️";


            heart.style.left=
            Math.random()*100+"vw";


            heart.style.animationDuration=
            (3+Math.random()*3)+"s";


            document.body.appendChild(heart);



            setTimeout(()=>{

                heart.remove();

            },6000);



        },i*300);


    }

}





function convertNumber(num){

    const fa=[
        "۰","۱","۲","۳","۴",
        "۵","۶","۷","۸","۹"
    ];


    return num
    .toString()
    .replace(/\d/g,d=>fa[d]);

}




renderPage();
