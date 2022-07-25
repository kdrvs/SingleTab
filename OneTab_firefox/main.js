

if(MEMORY.active){
    if(check_domain()){
        overload_target();
        window.addEventListener('scroll', function(){
            overload_target();
        });
    }
}

function overload_target(){
    let outer_links = document.querySelectorAll("[target=_blank]");
    outer_links.forEach(link => {
        link.target = "_self";
    });
};

function check_domain(){
    domain = window.location.hostname;
    if(MEMORY.urls !== undefined){
        let index = MEMORY.urls.indexOf(domain);
        if(index >= 0){
            return true;
        }else{
            return false
        }
    }else{
        return false;
    }
};

//run();


/*
async function run(){
    let mode = await get_active();
    let host_keeped = await check_domain();
    console.log("Extension: " + mode + " : " + host_keeped);
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
    console.log("Extension: " + value.active);//del
    if(value.active === undefined){
        return false;
    }
    return value.active;
};


async function check_domain(){
    let value = await browser.storage.local.get(STORAGE_URLS);
    domain = window.location.hostname;
    console.log("Extension: " + domain); //del
    if(value.urls !== undefined){
        console.log("Extension: urls exist");
        let index = value.urls.indexOf(domain);
        if(index >= 0){
            return true;
        }
    }else{
        return false;
    }
};
*/

