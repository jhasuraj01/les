let delete_Input = (event) => {
    event.remove();
    console.log(event);
}

let add_new_input = () => {
    add_input_btn.parentElement.insertAdjacentHTML('beforebegin', '<label for="equationInputBox" class="equation_in_label"><input type="text" class="equationInputBox equation_in"  placeholder="Your Equation"><button class="delete_input"><svg viewBox="0 0 348.333 348.334"><path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/></svg></button></label>');
    let new_in_label = add_input_btn.parentElement.previousSibling;
    new_in_label.children[0].focus();
    new_in_label.children[1].addEventListener('click', () => {
        delete_Input(new_in_label);
    });
}

add_input_btn.addEventListener('click', add_new_input);
add_new_input();

let set_layout = () => {
    output.style.height = `calc(100vh - ${document.getElementById('body-header').offsetHeight}px - 2em)`;
    outputContainer.style.height = `calc(100vh - ${document.getElementById('body-header').offsetHeight}px)`;
}
window.addEventListener('resize', set_layout);
set_layout();

let display_output_btn_fn = () => {
    output.classList.add('bringUP');
}

display_output_btn.addEventListener('click', display_output_btn_fn);

outputContainer.addEventListener('click', (event) => {
    if (event.target === outputContainer) {
        display_output_btn.checked = false;
        output.classList.remove('bringUP');
    }
})