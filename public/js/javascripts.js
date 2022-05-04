function getweatherdata(){
    const address = document.getElementById("addressbox").value
    const box = document.getElementById("current-weather");
    
    box.innerHTML=`<p>Loading...</p>`
    fetch('/weather',{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            address:address
        }),
    }).then(response=>response.json()).then(data=>{
        console.log(data);
        if(data.error){
            box.innerHTML= `<p>${data.error}</p>`
        }else{

            box.innerHTML = `<p>${data.forecast}</p><p>${data.location}</p>`
        }
    })

}


// const weatherform = document.querySelector('form')
// const search = document.querySelector('input')
// weatherform.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const loation = search.value
//     console.log(loation);
// })