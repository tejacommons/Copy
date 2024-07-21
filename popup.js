document.getElementById('operatorButton').addEventListener('click', () => {
    const fruitDropdown = document.getElementById('fruitDropdown');
    const copyButton = document.getElementById('copyButton');
    
    // Hide the ticket questions if they are visible
    document.getElementById('ticketQuestions').style.display = 'none';
    
    // Toggle the display of the fruit dropdown and copy button
    if (fruitDropdown.style.display === 'none') {
        fruitDropdown.style.display = 'block';
        copyButton.style.display = 'block';
    } else {
        fruitDropdown.style.display = 'none';
        copyButton.style.display = 'none';
    }
});

document.getElementById('ticketsButton').addEventListener('click', () => {
    const ticketQuestions = document.getElementById('ticketQuestions');
    const copyButton = document.getElementById('copyButton');
    
    // Hide the fruit dropdown if it is visible
    document.getElementById('fruitDropdown').style.display = 'none';
    
    // Toggle the display of the ticket questions and copy button
    if (ticketQuestions.style.display === 'none') {
        ticketQuestions.style.display = 'block';
        copyButton.style.display = 'block';
    } else {
        ticketQuestions.style.display = 'none';
        copyButton.style.display = 'none';
    }
});

document.getElementById('ticketDropdown').addEventListener('change', () => {
    const selectedTicket = document.getElementById('ticketDropdown').value;
    const repetitiveOption = document.getElementById('repetitiveOption');
    const operatorResponseOption = document.getElementById('operatorResponseOption');
    const localizationLostOptions = document.getElementById('localizationLostOptions');

    // Reset visibility of options
    repetitiveOption.style.display = 'block';
    operatorResponseOption.style.display = 'block';
    localizationLostOptions.style.display = 'none'; // Hide localization lost options by default

    if (selectedTicket === "False Cliff Detection") {
        repetitiveOption.style.display = 'none'; // Hide Is This Issue Repetitive?
        operatorResponseOption.style.display = 'none'; // Hide Did Operator Respond?
    } else if (selectedTicket === "Safety Monitor Failures: Squeegee Detatch (Stuck By Obstacles)" || selectedTicket === "Safety Monitor Failures: Squeegee Detatch (Rear Manual Moves)") {
        repetitiveOption.style.display = 'none';
        document.getElementById('issueRepetitiveYes').checked = true;
        document.getElementById('operatorRespondNo').checked = true;

    }

    // Show/hide options based on the selected ticket
    if (selectedTicket === "False Cliff Detection") {
        repetitiveOption.style.display = 'none'; // Hide Is This Issue Repetitive?
        operatorResponseOption.style.display = 'none'; // Hide Did Operator Respond?
    } else if(selectedTicket === "Front Camera Noise"){
        repetitiveOption.style.display='none';
        document.getElementById('operatorRespondNo').checked = true;
    }else if (selectedTicket.includes('Localization Lost')) {
        localizationLostOptions.style.display = 'block'; // Show localization lost options
        document.getElementById('issueRepetitiveNoNeed').checked = true;
        document.getElementById('operatorRespondNoNeed').checked = true;
    }else if(selectedTicket ==='Map Update'){
        localizationLostOptions.style.display='block';
        document.getElementById('issueRepetitiveNoNeed').checked = true;
        document.getElementById('operatorRespondNoNeed').checked = true;
    } else if(selectedTicket == 'Safety Monitor Failures: 3D sensor system heartbeat failure' ){
        document.getElementById('issueRepetitiveYes').checked = true;
        document.getElementById('operatorRespondNo').checked = true;
    } else if(selectedTicket == 'Safety Monitor Failures: Vacuum Failure' ){
        document.getElementById('issueRepetitiveYes').checked = true;
        document.getElementById('operatorRespondNo').checked = true;
    }
    else {
        localizationLostOptions.style.display = 'none'; // Hide localization lost options
    }
});

document.getElementById('copyButton').addEventListener('click', () => {
    const fruitDropdown = document.getElementById('fruitDropdown');
    const ticketQuestions = document.getElementById('ticketQuestions');
    const issueRepetitiveYes = document.getElementById('issueRepetitiveYes');
    const issueRepetitiveNo = document.getElementById('issueRepetitiveNo');
    const issueRepetitiveNoNeed = document.getElementById('issueRepetitiveNoNeed');
    const operatorRespondYes = document.getElementById('operatorRespondYes');
    const operatorRespondNo = document.getElementById('operatorRespondNo');
    const operatorRespondNoNeed = document.getElementById('operatorRespondNoNeed');
    let textToCopy = '';

    if (fruitDropdown.style.display !== 'none') {
        const selectedOption = fruitDropdown.value;
        textToCopy = `/ RA called for ${selectedOption} and ended in no response`;
    } else if (ticketQuestions.style.display !== 'none') {
        const selectedTicket = document.getElementById('ticketDropdown').value;
        const sectorInput = document.getElementById('sectorInput').value;
        let repetitiveResponse = '';
        let operatorResponse = '';
        let additionalObservations = '';

        if (issueRepetitiveYes.checked) {
            repetitiveResponse = "RA try to reset it but it's repetitive";
        } else if (issueRepetitiveNo.checked) {
            repetitiveResponse = "RA reset it, neo continued cleaning";
        } else {
            repetitiveResponse = "";
        }

        if (operatorRespondYes.checked) {
            operatorResponse = "RA called operator and they will assist";
        } else if (operatorRespondNo.checked) {
            operatorResponse = "RA called operator and ended in no response";
        } else {
            operatorResponse = " ";
        }

        if (selectedTicket.includes('Localization Lost')) {
            const selectedOptions = document.querySelectorAll('#localizationLostOptions input:checked');
            selectedOptions.forEach(option => {
                additionalObservations += `${option.value}\n`;
            });
            textToCopy = `
                While Neo was cleaning sector ${sectorInput || 'starting plan'} presented'\n ${selectedTicket}\n${repetitiveResponse}\n${operatorResponse}\n${additionalObservations}`;
        } else if(selectedTicket === 'Map Update'){
            const selectedOptions = document.querySelectorAll('#localizationLostOptions input:checked');
            selectedOptions.forEach(option => {
                additionalObservations += `${option.value}\n`;
            });
            textToCopy=`
            While Neo was in sector ${sectorInput || 'starting'}'\n ${repetitiveResponse}\n${additionalObservations}\n${operatorResponse}`
        } else if (selectedTicket === "False Cliff Detection") {
            textToCopy = `
                While Neo was cleaning sector ${sectorInput || 'starting plan'} presenting\nFalse cliff detection\nRA tried giving manual moves but it's still there and neo can't able to plan path\nRA cancel the CP\n3D-Diagnostics:-`;
        } else if(selectedTicket === "Front Camera Noise"){
            textToCopy =`While Neo was cleaning sector ${sectorInput || 'starting plan'} presenting\n Front Camera Noise\nRA tried giving manual moves but it's still there and neo can't able to plan path\n${operatorResponse}\n3D-Diagnostics:-`
        }
        else if (selectedTicket === "Safety Monitor Failures: Squeegee Detatch (Rear Manual Moves)") {
            const trimmedTicket = selectedTicket.slice(0, -19);
            textToCopy = `
                While neo was in feedback, RA took the control,RA noticed there is Tight space\nRA tried giving Rear manual move and neo started presenting the following:\n${trimmedTicket}\n${repetitiveResponse}\n${operatorResponse}`;
        } else if (selectedTicket === "Safety Monitor Failures: Squeegee Detatch (Stuck By Obstacles)") {
            const trimmedTicket = selectedTicket.slice(0, -20);
            textToCopy = `
                While neo was in feedback, RA took the control\nRA noticed there is Tight space\nRA tried giving manual move and neo started presenting the following:\n${trimmedTicket}\n${repetitiveResponse}\n${operatorResponse}`;
        } else {
            textToCopy = `While Neo was cleaning sector ${sectorInput || 'starting plan'} presented the following:\n${selectedTicket}\n${repetitiveResponse}\n${operatorResponse}\nDiagnostics:- `;
        }
    }

    navigator.clipboard.writeText(textToCopy.trim()).then(() => {
        alert(`Text copied to clipboard:${textToCopy.trim()}`);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});
