let Showpopup = (message) => {

    let popupWindow = document.querySelector('#popupWindow');

    let popupWindowHeader = document.querySelector('.popupWindow-header');
    let popupWindowBody = document.querySelector('.popupWindow-body');
    let popupWindowFooter = document.querySelector('.popupWindow-footer');

    popupWindowHeader.innerHTML = "";
    popupWindowBody.innerHTML = "";
    popupWindowFooter.innerHTML = "";
    popupWindowHeader.insertAdjacentHTML('beforeend', `<h3>${message[0]}</h3>`);
    for (let i = 1; i < message.length - 1; i++) {
        popupWindowBody.insertAdjacentHTML('beforeend', `<p>${message[i]}</p>`);
    }
    popupWindowFooter.insertAdjacentHTML('beforeend', `<h4>${message[message.length - 1]}</h4>`);

    // When the user clicks anywhere outside of the popupWindow, close it
    window.onclick = (event) => {
        if (event.target == popupWindow) {
            popupWindowCloser();
        }
    }
    // delay for better user experience
    setTimeout(() => {
        showpopupWindowCheckbox.click();
    }, 100);
};
let popupWindowCloser = () => {
    document.getElementById('showpopupWindowCheckbox').click();
}

let isPopUpOpen = false
navigationObserver.handle(popupWindow, {
    toShow: {
        observableActions: [
            { element: showpopupWindowCheckbox, action: 'change' }
        ],
        callback: () => {
            if (isPopUpOpen === false) {
                isPopUpOpen = true
                showpopupWindowCheckbox.checked = isPopUpOpen
                return true
            }
        }
    },
    toHide: {
        observableActions: [
            { element: showpopupWindowCheckbox, action: 'change' }
        ],
        callback: () => {
            if (isPopUpOpen === true) {
                isPopUpOpen = false
                showpopupWindowCheckbox.checked = isPopUpOpen
                return true
            }
        }
    },
    currentState: 'inactive'
})