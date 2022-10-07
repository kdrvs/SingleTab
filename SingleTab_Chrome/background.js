const MODE = "mode";
const OVERRIDE = 'override';
const STORAGE = chrome.storage.local;
const URLS = "urls";

chrome.runtime.onMessage.addListener(updateIcon);
chrome.runtime.onStartup.addListener(updateIcon);
chrome.runtime.onInstalled.addListener(updateIcon);
chrome.tabs.onActivated.addListener(updateBadge);
chrome.tabs.onUpdated.addListener(updateBadge);
chrome.runtime.onMessage.addListener(updateBadge);

async function updateIcon(){
    let Mode = await STORAGE.get(MODE);
    let Override = await STORAGE.get(OVERRIDE);

    if(Mode.mode){
        if(Override.override){
            chrome.action.setIcon({
                path: {
                    16: "/icons/super_16.png",
                    32: "/icons/super_32.png",
                    48: "/icons/super_48.png",
                    128: "/icons/super_128.png"
                }
            });
        } else {
            chrome.action.setIcon({
                path: {
                    16: "/icons/active_16.png",
                    32: "/icons/active_32.png",
                    48: "/icons/active_48.png",
                    128: "/icons/active_128.png"
                }
            });
        }
    } else {
        chrome.action.setIcon({
            path: {
                16: "/icons/16.png",
                32: "/icons/32.png",
                48: "/icons/48.png",
                128: "/icons/128.png"
            }
        });
    }
};

async function updateBadge(){
    chrome.action.setBadgeBackgroundColor({'color': [110,110,110,255]});
    let tab;
    await chrome.tabs.query({active:true,currentWindow:true}).then(function(tabs){
        tab = tabs[0];
    });
    let Mode = await STORAGE.get(MODE);
    let host_keeped = await check_domain(tab.url == "" ? "" : new URL(tab.url).hostname);
    if(Mode.mode && host_keeped){
        chrome.action.setBadgeText({text: '✓'});
        
    } else {
        chrome.action.setBadgeText({text: ''});
    }

};

async function check_domain(url){
    let value = await STORAGE.get(URLS);
    if(value.urls !== undefined){
        let index = value.urls.indexOf(url);
        if(index >= 0){
            return true;
        }
    }
    return false;
};