let Example = () => {
    let exampleArr = [
        ['x+2y+3z=3', '2x+4y+5z=5', '3x+5y+6z= -7'], //x = -26, y = 13, z = 1
        ['x+y+z=9', '2x+5y+7z=52', '2x+y-z=0'], // x = 1, y = 3, z = 5
        ['x-y+z=0', '0x+y+z=1', '3x+2y-4z=3'], // x = 2/3, y = 5/6, z = 1/6
        ['x+y+z=3','2x-y+3z=4','3x+4z=7'], // infinite solutions
        ['2x+y=5', '4x+y=8'], // x = 3/2, y = 2
        ['2x - y + z = -1', 'x + 2y + 3z = -8', '3x + y - 4z = -1'], // x = -1, y = -2, z = -1
        ['6x=6+9+3x'], // x = 5
        ['3x+2y+6z=20', 'x+y+2z=3', '2x+2y-5z=6'] // x = 14, y = -11, z = 0
    ];
    setTimeout(() => {
        setExample(exampleArr[parseInt(Math.random() * 10) % exampleArr.length]);
    }, 200);
}
let setExample = (exampleEquation) => {
    // let exampleEquation = ['x+2y+3z=3', '2x+4y+5z=5', '3x+5y+6z=7'];
    alert(`Lets solve the Equations ${exampleEquation}`);
    setTimeout(() => {
         for (let i = 0; i < exampleEquation.length-1; i++) {
             add_input_bar();
         }
    }, 1600);
    setTimeout(() => {
        alert('now enter the equations');
        setTimeout(() => {
            let equationInputBoxes = document.querySelectorAll('#inputContainer .equationInputBox');
            for (let count = 0; count < exampleEquation.length; count++) {
                const elm = equationInputBoxes[count];
                setTimeout(() => {
                    elm.classList.add('redOutline');
                    elm.focus();
                }, 1100 * count + 300);
                setTimeout(() => {
                    elm.value = exampleEquation[count];
                }, 1100 * count + 800);
                setTimeout(() => {
                    elm.classList.remove('redOutline');
                }, 1100 * count + 1100);
            }
            coOperateWithUser();
        }, 500);
        setTimeout(() => {
            goToEvaluateBtn.focus();
            setTimeout(() => {
                goToEvaluateBtn.classList.add('redOutline');
            }, 500);
            setTimeout(() => {
                goToEvaluateBtn.click();
            }, 800);
            setTimeout(() => {
                goToEvaluateBtn.classList.remove('redOutline');
            }, 1000);
        }, 1500 + exampleEquation.length * 1100);
        setTimeout(() => {
            alert('now click on menu icon to see the log history');
            setTimeout(() => {
                menuSymbol.classList.add('redOutline');
                menuSymbol.focus();
            }, 500);
            setTimeout(() => {
                menuSymbol.click();
            }, 1500);
            setTimeout(() => {
                menuSymbol.classList.remove('redOutline');
            }, 2600);
            setTimeout(() => {
                alert('Thank You!!♥');
            }, 3000);
        }, 3500 + exampleEquation.length * 1100);
    }, 2800);

}

giveExampleBtn.addEventListener('click', Example);