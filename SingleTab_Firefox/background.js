const MODE = "mode";
const OVERRIDE = 'override';
const STORAGE = browser.storage.local;
const URLS = "urls";

browser.runtime.onMessage.addListener(updateIcon);
browser.runtime.onStartup.addListener(updateIcon);
browser.runtime.onInstalled.addListener(updateIcon);
browser.tabs.onActivated.addListener(updateBadge);
browser.tabs.onUpdated.addListener(updateBadge);
browser.runtime.onMessage.addListener(updateBadge);

async function updateIcon(){
    let Mode = await STORAGE.get(MODE);
    let Override = await STORAGE.get(OVERRIDE);

    if(Mode.mode){
        if(Override.override){
            browser.browserAction.setIcon({
                path: {
                    16: "icons/super_16.png",
                    32: "icons/super_32.png",
                    48: "icons/super_48.png",
                    128: "icons/super_128.png"
                }
            });
        } else {
            browser.browserAction.setIcon({
                path: {
                    16: "icons/active_16.png",
                    32: "icons/active_32.png",
                    48: "icons/active_48.png",
                    128: "icons/active_128.png"
                }
            });
        }
    } else {
        browser.browserAction.setIcon({
            path: {
                16: "icons/16.png",
                32: "icons/32.png",
                48: "icons/48.png",
                128: "icons/128.png"
            }
        });
    }
};

async function updateBadge(){
    browser.browserAction.setBadgeBackgroundColor({'color': [51,51,51,180]});
    browser.browserAction.setBadgeTextColor({'color': 'white'});
    let tab;
    await browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
        tab = tabs[0];
    });
    let Mode = await STORAGE.get(MODE);
    let host_keeped = await check_domain(new URL(tab.url).hostname);
    if(Mode.mode && host_keeped){
        browser.browserAction.setBadgeText({text: '✓'});
        
    } else {
        browser.browserAction.setBadgeText({text: ''});
    }

};

async function check_domain(url){
    let value = await STORAGE.get(URLS);
    console.log("url is " + url);
    if(value.urls !== undefined){
        let index = value.urls.indexOf(url);
        if(index >= 0){
            return true;
        }
    }
    return false;
};