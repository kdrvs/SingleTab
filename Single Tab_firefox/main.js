const STORAGE_URLS = "urls";
const STORAGE_MODE = "active";

setListener();

async function setListener(){
    let mode = await get_active();
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

async function get_active(){
    let value = await browser.storage.local.get(STORAGE_MODE);
    if(value.active === undefined){
        return false;
    }
    return value.active;
};


async function check_domain(){
    let value = await browser.storage.local.get(STORAGE_URLS);
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
