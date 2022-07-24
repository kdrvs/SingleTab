
bild_popUp();

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('input_active')
    .addEventListener('click', change_active_mode);
});


async function change_active_mode(){
    let mode = await get_active();
    await set_active(!mode);
    bild_popUp();    
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

async function bild_popUp(){
    let mode = await get_active();
    
    if(mode == 'true' || mode == true){
        change_mode_btn('input_active', '#4ea0ed', 'Включен');
    } else {
        change_mode_btn('input_active', '#adc5db', 'Выключен');
    }
};

function change_mode_btn(dom, color, text){
    let btn = document.getElementById(dom);
    btn.style.backgroundColor = color;
    btn.innerText = text;
};
