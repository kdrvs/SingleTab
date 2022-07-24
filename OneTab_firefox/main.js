
let hosts = []; //todo

if(browser.storage.local.get('active').active === undefined)
{
    browser.storage.local.set({
        'active': true
    });
}




