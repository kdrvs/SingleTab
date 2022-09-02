const MODE = "mode";
const OVERRIDE = 'override';
const STORAGE = browser.storage.local;

browser.runtime.onMessage.addListener(updateIcon);
browser.runtime.onStartup.addListener(updateIcon);
browser.runtime.onInstalled.addListener(updateIcon);

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