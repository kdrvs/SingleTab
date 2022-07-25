import {setActive} from './background.js'; //delete this shit and storage data to background html;
import {setUrls} from './backgraund.js';

const INPUT_MODE_ID = "input_active";
const INPUT_NEWSITE_ID = "newsite";
const INPUT_NEWSITE_BTN_ID = "newsite_btn";
const URLS_ARRAY_ID = "urls_array";

const STORAGE_URLS = "urls";
const STORAGE_MODE = "active";



build_popUp();

document.addEventListener('DOMContentLoaded', function(){

    document.getElementById(INPUT_MODE_ID)
    .addEventListener('click', change_active_mode);

    document.getElementById(INPUT_NEWSITE_ID)
    .addEventListener('keypress', function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            set_url();
        }
    });

    document.getElementById(INPUT_NEWSITE_BTN_ID)
    .addEventListener('click', set_url);

});


async function set_url(){
    let url = document.getElementById(INPUT_NEWSITE_ID).value;
    if(url != ''){
        url = url.toLowerCase().replace(/\//g,'')
            .replace(/\s/g, '')
            .replace(/:/g, '')
            .replace(/https/g,'')
            .replace(/http/g,'')
            .replace(/,/g, '.');
            
        await set_url_to_storage(url);
        build_popUp();
    }
};

async function delete_url(id){
    await delete_url_from_storage(id);
    build_popUp();
};

async function set_url_to_storage(url){
    let array = await get_urls_array();
    if(array === undefined){
        array = [];
    }
    if(array.indexOf(url) == -1){
        array.push(url);
        await browser.storage.local.set({
            [STORAGE_URLS]: array
        });
        setUrls(array);
    }
};

async function delete_url_from_storage(value){
    let array = await get_urls_array();
    array.splice(array.indexOf(value), 1);
    await browser.storage.local.set({
        [STORAGE_URLS]: array
    });
    setUrls(array);
};

async function get_urls_array(){
    let value = await browser.storage.local.get(STORAGE_URLS);
    setUrls(value.urls);
    return value.urls;
};

async function change_active_mode(){
    let mode = await get_active();
    await set_active(!mode);
    build_popUp();  
};

async function set_active(bool_value){
    await browser.storage.local.set({
        [STORAGE_MODE]: bool_value
    });
    setActive(bool_value);
};

async function get_active(){
    let value = await browser.storage.local.get(STORAGE_MODE);
    if(value.active === undefined){
        await set_active(true);
        value = await browser.storage.local.get(STORAGE_MODE);
    }
    setActive(value.active);
    return value.active;
};

async function build_popUp(){
    let mode = await get_active();
    
    if(mode == true){
        change_mode_btn(INPUT_MODE_ID, '#4ea0ed', 'Включен');
    } else {
        change_mode_btn(INPUT_MODE_ID, '#adc5db', 'Выключен');
    }

    let urls = await get_urls_array();
    if(urls !== undefined){
        document.getElementById(INPUT_NEWSITE_ID).value = '';
        var content = document.getElementById(URLS_ARRAY_ID);
        content.innerHTML = '';
        urls.forEach(url => {
            append_value_to_list(content, url);
        });
    }
};

function append_value_to_list(dom, value){
    let div = document.createElement('div');

    let p = document.createElement('p');
    p.innerText = value;

    let btn = document.createElement('button');
    btn.type = 'button';
    btn.id = value;
    btn.addEventListener('click', function(){ delete_url(value)});

    div.appendChild(p);
    div.appendChild(btn);
    dom.appendChild(div);
};

function change_mode_btn(dom, color, text){
    let btn = document.getElementById(dom);
    btn.style.backgroundColor = color;
    btn.innerText = text;
};
