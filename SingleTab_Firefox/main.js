const URLS = "urls";
const MODE = "mode";
const STORAGE = browser.storage.local;

setListener();

async function setListener(){
    let mode = await get_mode();
    let host_keeped = await check_domain();
    if(mode){
        if(host_keeped){
            overload_target();
            window.addEventListener('scroll', function(){
                overload_target();
            });
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


async function check_domain(){
    let value = await STORAGE.get(URLS);
    domain = window.location.hostname;
    if(value.urls !== undefined){
        console.log("Extension: urls exist");
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
