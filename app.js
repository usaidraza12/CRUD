
let head=document.querySelector("#head")
let timing=document.querySelector("#time")
let para=document.querySelector("#para")
let post=document.querySelector(".post-header")
let submit=document.querySelector("#submit")
let heading=document.querySelector("#heading")
let container=document.querySelector(".container")
const apiurl='https://66f91c852a683ce97310ee2f.mockapi.io/api/v1/posts';
let time=Date()

function fetchapi() {
  
    fetch(apiurl)
    .then(response => response.json())
    .then(data => fetching(data))
    .catch(error => console.log('error', error))

}
fetchapi()
function fetching(posts) {
    posts.forEach(post => {
        console.log(post)
        const postDiv = document.createElement('div');
        // const delebtn=document.createElement("button")
        // delebtn.innerHTML="delete"
        // container.appendChild(delebtn)
        postDiv.classList.add('post' );

        postDiv.innerHTML = `
         <div class="post-header">
    
        
  <img src="https://www.zubairshaikh.me/images/img/profile.jpg" alt="Avatar">
   <div>

        <h3 id="head">${post.name} (Developer)</h3>
         <small id="time">${time}</small>
       </div>
   
 <p id="para">This is the post body content.</p >
  <div class="actions">
  <button class="edit-btn" onclick="update(${post.id})">Edit</button>
        <button class="delete-btn" onclick="onhandle2(${post.id})">Delete</button>
    </div>
    `
                        

        container.appendChild(postDiv)
    });
}
function data(){
  let input =document.querySelector("#input").value;
  let email=document.querySelector("#email").value;
  let text=document.querySelector("#text").value;
let newpost={
    name: input,
    title: email,
    body: text,
    createdAt: new Date().toISOString()
}
    console.log(newpost)
    fetch(apiurl,{
        method:"post",
        headers:{
               'Content-Type': 'application/json'
        },
        body:JSON.stringify(newpost)
       
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))



}
function  onhandle2(id){
    fetch(`${apiurl}/${id}`, {
        
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            console.log(res);
          }
          return res.json();
        })
      .then((data)=>{
        console.log(`${data.name}`)
        fetchapi()
      })
        .catch(error => console.error('Error this is:', error));
        console.log(id)
}
function update(id){
  console.log(id)
  
  fetch(`${apiurl}/${id}`)
  .then((res)=>res.json())
  .then((post)=>{
  document.querySelector(".data").style.display="none";
    document.querySelector(".post-data").style.display="block";
   document.querySelector("#input2").value=post.name 
    document.querySelector("#email2").value=post.title 
    document.querySelector("#text2").value=post.body 
  
})
.catch((err)=>{console.log(err)})
console.log("close")
document.getElementById("form").addEventListener("submit",function(e){
  e.preventDefault()
  console.log(e)
  console.log("close2")

  let inputdata=document.querySelector("#input2").value
  let emaildata=document.querySelector("#email2").value
  let textdata=document.querySelector("#text2").value
    let newpostdata={
      name:inputdata,
      title:emaildata,
      body:textdata,
      createdAt:time
  }
  console.log("close3")

  console.log(newpostdata)
  fetch(`${apiurl}/${id}`,{
    method:"PUT",
    headers: {
      'Content-Type': 'application/json',
  },
    body:JSON.stringify(newpostdata)
    
   
  })
    .then((res)=>{res.json()})
    .then((data)=>{data})
    .catch((err)=>(console.log(err)))
          
  })
}

  
  



