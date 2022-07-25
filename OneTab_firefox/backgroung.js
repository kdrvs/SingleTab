
const MEMORY = { 
    'active': '',
    'urls':[]
};

export function memory(){
    return MEMORY;
}

export function setActive(bool_value){
    MEMORY.active = bool_value;
}

export function setUrls(urls){
    MEMORY.urls = urls;
}