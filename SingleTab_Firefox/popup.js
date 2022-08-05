
const INPUT_MODE_ID = "mode";
const INPUT_NEWSITE_ID = "newsite";
const INPUT_NEWSITE_BTN_ID = "newsite_btn";
const URLS_ARRAY_ID = "urls_array";
const CHECK = "check";

const URLS = "urls";
const MODE = "mode";
const OVERRIDE = 'override';
const STORAGE = browser.storage.local;


build_popUp();

document.addEventListener('DOMContentLoaded', function(){

    document.getElementById(INPUT_MODE_ID)
    .addEventListener('click', change_mode);

    document.getElementById(INPUT_NEWSITE_ID)
    .addEventListener('keypress', function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            set_url();
        }
    });

    document.getElementById(INPUT_NEWSITE_BTN_ID)
    .addEventListener('click', set_url);

    document.getElementById(CHECK)
    .addEventListener('click', change_override);

});


async function set_url(){
    let url = document.getElementById(INPUT_NEWSITE_ID).value;
    if(url != ''){
        url = url.toLowerCase().replace(/\/|\s|:|https|http/g,'');
        if(url !== undefined){
            await storage_set(url);
            build_popUp();
        }   
    }
};

async function delete_url(id){
    await storage_delete(id);
    build_popUp();
};

async function storage_set(url){
    let array = await storage_get();
    if(array === undefined){
        array = [];
    }
    if(array.indexOf(url) == -1){
        array.push(url);
        await STORAGE.set({
            [URLS]: array
        });
    }
};

async function storage_delete(value){
    let array = await storage_get();
    array.splice(array.indexOf(value), 1);
    await STORAGE.set({
        [URLS]: array
    });
};

async function storage_get(){
    let value = await STORAGE.get(URLS);
    return value.urls;
};

async function change_mode(){
    let mode = await get_mode();
    await set_mode(!mode);
    await build_popUp();  
};

async function set_mode(bool_value){
    await STORAGE.set({
        [MODE]: bool_value
    });
};

async function get_mode(){
    let value = await STORAGE.get(MODE);
    if(value.mode === undefined){
        await set_mode(true);
        value = await STORAGE.get(MODE);
    }
    return value.mode;
};

async function build_popUp(){
    let mode = await get_mode();
    let override = await override_mode();
    if(mode == true){
        change_mode_btn(INPUT_MODE_ID, 'enabled', browser.i18n.getMessage("extensionButtonStatusOn"));
    } else {
        change_mode_btn(INPUT_MODE_ID, 'disabled', browser.i18n.getMessage("extensionButtonStatusOff"));
    }

    let urls = await storage_get();
    if(urls !== undefined){
        document.getElementById(INPUT_NEWSITE_ID).value = '';
        var content = document.getElementById(URLS_ARRAY_ID);
        content.innerHTML = '';
        urls.forEach(url => {
            append_value_to_list(content, url);
        });
    }
    set_check_box(override);

    document.getElementById("warning").innerText = browser.i18n.getMessage("extensionWarning");
    document.getElementById("labelOfCheckbox").innerText = browser.i18n.getMessage("extensionLabelOfCheckbox");
    document.getElementById("description").innerText = browser.i18n.getMessage("extensionDescription");
};

function append_value_to_list(dom, value){
    let tr = document.createElement('tr');

    let td_content = document.createElement('td');
    td_content.className = 'item';
    td_content.innerText = value;

    let td_btn = document.createElement('td');
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.id = value;
    btn.className = 'on_item';
    btn.addEventListener('click', function(){ delete_url(value)});
    td_btn.appendChild(btn);

    tr.appendChild(td_content);
    tr.appendChild(td_btn);
    dom.appendChild(tr);
};

function change_mode_btn(dom, _class, text){
    let btn = document.getElementById(dom);
    btn.className = _class;
    btn.innerText = text;
};

async function override_mode(){
    let mode = await STORAGE.get(OVERRIDE);
    if(mode.override === undefined){
        await set_override(false);
        mode = await STORAGE.get(OVERRIDE);
    }
    return mode.override;
};

async function set_override(bool_value){
    await STORAGE.set({
        [OVERRIDE]: bool_value
    });
};

async function change_override(){
    let mode = await override_mode();
    await set_override(!mode);
    await build_popUp();
};

function set_check_box(bool_value){
    let dock = document.getElementById("check");
    dock.checked = bool_value;
};