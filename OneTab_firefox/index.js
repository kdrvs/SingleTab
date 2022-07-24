

check_storage();

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('input_active')
    .addEventListener('click', change_active_mode);
});



async function change_active_mode(){
    let mode = await get_active();
    await set_active(!mode);
    
};

async function set_active(bool_value){
    await browser.storage.local.set({
        "active": bool_value
    });
};

async function get_active(){
    let value = await browser.storage.local.get('active');
    return value.active;
};

async function check_storage(){
    let mode = await get_active();
    if(mode != true || mode != false)
    {
        await set_active(true);
    }
};

async function get_log(){
    console.log(await get_active());
};



let btn = document.createElement('button');
btn.style.backgroundColor = "#FF0000";
btn.innerText = "BUTTON";
btn.onclick = function() { get_log(); };
document.body.appendChild(btn);

document.body.style.border = "5px solid blue";

