const link = document.getElementById("link");
const submitShortenBtn =document.getElementById("submit-shorten-form");
const shortenLinkData =document.getElementById("shorten-link-data");
const errorMassage=document.getElementById("error");

const shortenLinkArray = [] ;

function createLinkData () {
    shortenLinkData.innerHTML="";
    shortenLinkArray.forEach ( linkArray=>{
        // creating element
        let linkData =document.createElement("div");
        let lift =document.createElement("div");
        let right =document.createElement("div");
        let linkP = document.createElement("p");
        let shortenLinkP = document.createElement("p");
        let copyBtn =document.createElement("button");
        // adding class
        linkData.classList.add("link-data");
        linkP.classList.add("orginal-link");
        shortenLinkP.classList.add("shorten-link");
        lift.classList.add("lift");
        right.classList.add("right");
        copyBtn.classList.add("copy-link");
        copyBtn.classList.add("Btn");
        // give element value 
        linkP.textContent=linkArray.link;
        shortenLinkP.textContent=linkArray.shortenLink;
        copyBtn.textContent="copy";
        // set data for each Btn (shorten link)
        copyBtn.setAttribute("data-SLink",linkArray.shortenLink) 
        // appinding element 
        shortenLinkData.appendChild(linkData);
        linkData.appendChild(lift);
        linkData.appendChild(right);
        lift.appendChild(linkP);
        right.appendChild(shortenLinkP);
        right.appendChild(copyBtn);
        // adding event listener for coby button
        copyBtn.addEventListener("click",function(){
            // changing ather Btn 
            let AllBtn =document.querySelectorAll(".copy-link");
            AllBtn.forEach(btn=>{
                btn.textContent="copy";
                btn.style.backgroundColor="#7ed9ed";
            })
            // copy link
            navigator.clipboard.writeText(this.dataset.slink);
            // change Btn content 
            this.textContent="copied!";
            this.style.backgroundColor="#3f3f8b";
        })
        // removing last link
        link.value="";
    })
}

// gitting link shorten
async function getShortenLink (link) {
    const shortenURL = `https://www.shareaholic.com/v2/share/shorten_link?apikey=8943b7fd64cd8b1770ff5affa9a9437b&url=${link}`;
    try {
        const responce= await fetch(shortenURL);
        const shortenlink= await responce.json();
        const shortenOpject={
            link: link ,
            shortenLink:shortenlink.data
        }
        shortenLinkArray.push(shortenOpject);
        createLinkData();
    }catch (error){
        console.log(error)
    }
}

submitShortenBtn.addEventListener("click",function (event) {
    event.preventDefault();
    if (link.value){
        getShortenLink (link.value);
        errorMassage.textContent="";
    }
    else {
        errorMassage.textContent="please add a link";
    } 
});