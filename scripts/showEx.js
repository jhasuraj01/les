let Example = () => {
    let exampleArr = [
        ['x+2y+3z=3', '2x+4y+5z=5', '3x+5y+6z= -7'],
        ['2x+y=5', '4x+y=8'],
        ['2x - y + z = -1', 'x + 2y + 3z = -8', '3x + y - 4z = -1'],
        ['6x=6+9+3x'],
        ['3x+2y+6z=20', 'x+y+2z=3', '2x+2y-5z=6']
    ];
    setTimeout(() => {
        setExample(exampleArr[parseInt(Math.random() * 10) % exampleArr.length]);
    }, 200);
}
let setExample = (exampleEquation) => {
    // let exampleEquation = ['x+2y+3z=3', '2x+4y+5z=5', '3x+5y+6z=7'];
    alert(`Lets solve the Equations ${exampleEquation}`);
    alert('We will enter no. of variables present in equation');
    setTimeout(() => {
        noOfEqnInputBox.classList.add('redOutline');
        noOfEqnInputBox.focus();
    }, 700);
    setTimeout(() => {
        noOfEqnInputBox.value = exampleEquation.length;
        setInputBox();
    }, 1600);
    setTimeout(() => {
        noOfEqnInputBox.classList.remove('redOutline');
    }, 2500);
    setTimeout(() => {
        alert('now enter the equations');
        setTimeout(() => {
            let equationInputBoxes = document.querySelectorAll('#inputContainer .equationInputBox');
            for (let count = 0; count < noOfEqnInputBox.value; count++) {
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
        }, 1500 + noOfEqnInputBox.value * 1100);
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
        }, 3500 + noOfEqnInputBox.value * 1100);
    }, 2800);

}

giveExampleBtn.addEventListener('click', Example);