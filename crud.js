//start for crud opretion
var form = document.querySelector("#register_form");
var input = form.querySelectorAll("INPUT");
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
    var i;
    for(i=0;i<input.length;i++)
    {
        input[i].value = " ";
    }
})

//start global variable
var userData = [];
var profile_pic =document.querySelector("#profile");
var uploadimg = document.querySelector("#img");
var U_name = document.querySelector("#nm");
var email = document.querySelector("#mail");
var phone = document.querySelector("#no");
var birth = document.querySelector("#b_date");
var time = document.querySelector("#atime");
var co_select =document.querySelector("#color");
var body_part1 = document.querySelector("#part1");
var body_part2 = document.querySelector("#part2");
var body_part3 = document.querySelector("#part3");
var cod = document.querySelector("#method1");
var master_card = document.querySelector("#method2");
var visa_card = document.querySelector("#method3");
var pay_pal = document.querySelector("#method4");
var age = document.getElementsByClassName(".myRange");
var register = document.querySelector("#submit");
var updatebtn = document.querySelector("#btn");
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
        pal : pay_pal.value,
        demo : age.value,
        img : imgurl == undefined ? "./avtar.png": imgurl
        


    });
    var userString = JSON .stringify(userData);
    localStorage.setItem("userData",userString);
    swal("Appointment Book!","", "success");
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
                    <td>${data.demo}</td>
                    <td>${data.part1},${data.part2},<br>,${data.part3}</td>
                    <td>${data.case},${data.master},${data.visa},${data.pal}</td>
                    <td><img src="${data.img}" width="40" height="60"></td>
                    
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
                title: "Are you sure for delete Record?",
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
            // var index = tr.getAttribute("index");      
            var name = td[1].innerHTML;
            var mail = td[2].innerHTML;
            var no = td[3].innerHTML;
            var b_date= td[4].innerHTML
            var atime = td[5].innerHTML;
            var color = td[6].innerHTML;
            var part1 = td[7].innerHTML;
            var part2 = td[7].innerHTML;
            var part3 = td[7].innerHTML;
            var Case = td[8].innerHTML;
            var master = td[8].innerHTML;
            var visa = td[8].innerHTML;
            var pal = td[8].innerHTML;
            var demo = td[9].innerHTML;
            var imgtag = td[10].getElementsByTagName("IMG")
            var profilePic = imgtag[0].src;

            addBtn.click();
            register.disabled = true;
            btn.disabled = false;


            U_name.value = name;
            email.value= mail;
            phone.value=no;
            birth.value=b_date;
            time.value=atime;
            co_select.value=color;
            body_part1.value=part1;
            body_part2.value=part2;
            body_part3.value=part3;
            cod.value=Case;
            master_card.value=master;
            visa_card.value=visa;
            pay_pal.value=pal;
            age.value=demo;
            profile_pic.src=profilePic;

             updatebtn.onclick = function(e)
            {
            userData[index] = 
            {
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
                pal : pay_pal.value,
                demo : age.value,
                profilePic : uploadimg.value == "" ? profile_pic.src : imgurl
            }
            localStorage.setItem("userData",JSON.stringify(userData));
            }
        }
    
    }
    
}
local();


//image upload


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

