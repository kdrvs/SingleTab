
const URLS = "urls";
const MODE = "mode";
const OVERRIDE = 'override';
const STORAGE = chrome.storage.local;


setListener();

async function setListener(){
    let mode = await get_mode();
    let override = await get_override();
    let host_keeped = await check_domain();
    if(mode){
        if(host_keeped){
            overload_target();
            window.addEventListener('scroll', function(){
                overload_target();
            });
            window.addEventListener('load', function(){
                overload_target();
            });
            window.addEventListener('click', function(){
                overload_target();
            });
            if(override){
                let script = document.createElement("script");
                script.src = chrome.runtime.getURL("override.js");
                (document.head || document.documentElement).appendChild(script);
            }
            
        }
    }
};

async function get_mode(){
    let value = await STORAGE.get(MODE);
    if(value.mode === undefined){
        return false;
    }
    return value.mode;
};

async function get_override(){
    let value = await STORAGE.get(OVERRIDE);
    if(value.override === undefined){
        return false;
    }
    return value.override;
}


async function check_domain(){
    let value = await STORAGE.get(URLS);
    domain = window.location.hostname;
    if(value.urls !== undefined){
        let index = value.urls.indexOf(domain);
        if(index >= 0){
            return true;
        }
    }
    return false;
};

function overload_target(){
    let outer_links = document.querySelectorAll("[target=_blank]");
    outer_links.forEach(link => {
        link.target = "_self";
    });
};