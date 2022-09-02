const MODE = "mode";
const OVERRIDE = 'override';
const STORAGE = chrome.storage.local;

chrome.runtime.onMessage.addListener(updateIcon);
chrome.runtime.onStartup.addListener(updateIcon);
chrome.runtime.onInstalled.addListener(updateIcon);

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