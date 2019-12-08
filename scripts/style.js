showpopupWindowCheckbox.checked = false;

let fixInitialStyling = () => {
    giveExampleBtn.style.marginTop = `${20 + mainHeader.scrollHeight}px`;
    historyContainer.style.transform = `translateX(-${historyContainer.scrollWidth + 5}px)`;
    historyContainer.style.height = `calc(100% - ${mainHeader.scrollHeight + 20}px)`;
    historyContainer.style.top = `${mainHeader.scrollHeight}px`;
};
fixInitialStyling();

window.addEventListener('resize', fixInitialStyling);