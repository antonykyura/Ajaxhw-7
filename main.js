const API='https://test-users-api.herokuapp.com/'


let users=[];
const container=document.querySelector('.users');
const nameEl=document.querySelector('#name');
const ageEl=document.querySelector('#age');
const bntAdd=document.querySelector('#add');

bntAdd.addEventListener('click',()=>{
    const user={
        name: nameEl.value,
        age: ageEl.value
    };
    fetch(API + 'users',{
        method:'POST',
        body:JSON.stringify(user)
    }).then((res)=> {
        return res.json();
    }).then((id)=>{
        user.id=id;
        users.push(user);
        renderUsers();
    })
    .catch(err=>{
        console.log(err);
    })
})

// console.log('container',container);

function getUsers(){
    return fetch(API+'users').then(res=> {
        return res.json();
    }).catch(error=> {
        console.log('Can’t get users',error);
    });
}
async function deleteUser(userId){
    const res=await fetch(API+'users/'+ userId,{
        method:'DELETE'
    })
    return res.json();
}

function renderUsers() {
    users.forEach((user)=> {
        const div=document.createElement('div')
        div.className='user';
        div.innerHTML=`
        <h4>${user.name}</h4>
        <h5>${user.age}</h5>
        `
         
         const bnt=document.createElement('button')
         bnt.className='delete-user';
         bnt.textContent="delete";
         
         bnt.addEventListener('click',()=>{
            deleteUser(user.id);
            div.remove();
             })
        
         div.append(bnt);
         container.append(div);
         
})
}
   

getUsers().then(data=>{
    console.log(data)
    users = data.data;
    renderUsers();
    // console.log('users',users);
})
