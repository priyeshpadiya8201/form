//start for crud opretion

var addBtn = document.querySelector("#add_btn");
var model= document.querySelector(".model");
var closeBtn = document.querySelector(".close-icon")
addBtn.onclick = function()
{
    model.classList.add("active");
}
closeBtn.addEventListener("click", ()=>
{
    model.classList.remove("active");
})

//start global variable
var userData = [];
var U_name = document.querySelector("#nm");
var email = document.querySelector("#mail");
var phone = document.querySelector("#no");
var birth = document.querySelector("#b_date");
var time = document.querySelector("#atime");
var co_select =document.querySelector("#color");
var cod = document.querySelector("#case");
var master_card = document.querySelector("#master");
var visa_card = document.querySelector("#visa");
var pay_pal = document.querySelector("#pal");
var body_part1 = document.querySelector("#part1");
var body_part2 = document.querySelector("#part2");
var body_part3 = document.querySelector("#part3");
var age = document.getElementsByClassName("demo");
var register = document.querySelector("#submit");
var imgurl;
var form = document.querySelector("#register_form");
//end global variable

//start register submition

register.onclick = function(e)
{
    e.preventDefault();
    registrationData();
    local();
    closeBtn.click();
}

if(localStorage.getItem("userData") != null)
{
    userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData()
{
    userData.push({
        nm : U_name.value,
        mail : email.value,
        no : phone.value,
        b_date : birth.value,
        atime : time.value,
        color : co_select.value,
        part1 : body_part1.value,
        part2 : body_part2.value,
        part3 : body_part3.value,
        case : cod.value,
        master : master_card.value,
        visa : visa_card.value,
        pay_pal : pay_pal.value,
        demo : age.value,
        img : imgurl == undefined ? "./avtar.png": imgurl
        


    });
    var userString = JSON .stringify(userData);
    localStorage.setItem("userData",userString);
    swal("Good job!", "Appointment Book", "success");
}

//store data in localstorage
var tableData = document.querySelector("#table_data");
const local = ()=>
{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>
    {
        tableData.innerHTML += `
        <tr index='${index}'>
                    <td>${index+1}</td>
                    <td>${data.nm}</td>
                    <td>${data.mail}</td>
                    <td>${data.no}</td>
                    <td>${data.b_date}</td>
                    <td>${data.atime}</td>
                    <td>${data.color}</td>
                    <td>${data.part1}</td>
                    <td>${data.part2}</td>
                    <td>${data.case}</td>
                    <td>${data.master}</td>
                    <td>${data.pay_pal}</td>
                    <td>${data.demo}</td>
                    <td><img src="${data.img}" width="40" height="40"></td>
                    
                    <td><button class="edit_btn"><i class="fa fa-eye"></i></button>
                        <button class="del_btn" style=" background-color: #EE534F;"><i class="fa fa-trash"></i></button>
                    </td>           
                </tr>
        
        `;
    });
    // delete fild
    var i;
    var del = document.querySelectorAll(".del_btn");
    for(i = 0; i < del.length ; i++)
    {
        del[i].onclick = function()
        {
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id,1);
                    localStorage.setItem("userData",JSON.stringify(userData));
                    tr.remove();
                  swal("Record has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
          
        }
    }
    //start update record

    var editBtn = document.querySelectorAll(".edit_btn")
    for(i=0 ; i < editBtn.length ; i++)
    {
        editBtn[i].onclick = function()
        {
        var tr = this.parentElement.parentElement;
        var td = tr.getElementsByTagName("TD");
        var index = tr.getAttribute("index");
        // var imgtag = td[1].getElementsByTagName("IMG");
        // var profile_pic = imgtag[0].src;
        var name = td[1].innerHTML;
        var mail = td[2].innerHTML;
        
        }
    }
}
local();

//image upload

var profile_pic =document.querySelector("#profile");
var uploadimg = document.querySelector("#img");
uploadimg.onchange = function()
{
    if(uploadimg.files[0].size < 5000000)
    {
        var freder = new FileReader();
        freder.onload = function(e)
        {
             imgurl = e.target.result;
            profile_pic.src = imgurl;
            console.log(imgurl)
        }
        freder.readAsDataURL(uploadimg.files[0]);
    }
    else
    {
        alert("File size is long")
    }


}

