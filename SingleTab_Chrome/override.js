const NewWindowOpen = window.open; 
window.open = function(url, target, windowFeatures){ 
    NewWindowOpen(url, '_self', windowFeatures);
};