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
    }else if(selectedTicket === "Safety Monitor Failures: Squeegee Detatch (Stuck By Obstacles)" || selectedTicket === "Safety Monitor Failures: Squeegee Detatch (Rear Manual Moves)"){
        repetitiveOption.style.display = 'none';
    }

    // Show/hide options based on the selected ticket
    if (selectedTicket === "False Cliff Detection") {
        repetitiveOption.style.display = 'none'; // Hide Is This Issue Repetitive?
        operatorResponseOption.style.display = 'none'; // Hide Did Operator Respond?
    } else if (selectedTicket.includes('Localization Lost')) {
        localizationLostOptions.style.display = 'block'; // Show localization lost options
    } else {
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
            operatorResponse = "";
        }

        if (selectedTicket.includes('Localization Lost')) {
            const selectedOptions = document.querySelectorAll('#localizationLostOptions input:checked');
            selectedOptions.forEach(option => {
                additionalObservations += `${option.value}\n`;
            });
            textToCopy = `
                While Neo was cleaning sector ${sectorInput || 'starting plan'} presented the following:
                ${selectedTicket}
                ${repetitiveResponse}
                ${operatorResponse}
                ${additionalObservations}
            `;
        } else if (selectedTicket === "False Cliff Detection") {
            textToCopy = `
                While Neo was cleaning sector ${sectorInput || 'starting plan'} presenting False cliff detection 
                RA tried giving manual moves but it's still there and neo can't able to plan path 
                RA cancel the CP
                3D-Diagnostics:-
            `;
        } else if(selectedTicket === "Safety Monitor Failures: Squeegee Detatch (Rear Manual Moves)"){
            repetitiveOption.style.display = 'none'; // Hide Is This Issue Repetitive
            operatorResponseOption.style.display = 'block';

            textToCopy=`While neo was in feedback , RA took the control and RA noticed their is Tight space, and Ra tried a rear manual move and neo started presented the following
            ${selectedTicket}
            ${operatorResponse}`
        } else if (selectedTicket === "Safety Monitor Failures: Squeegee Detatch (Stuck By Obstacles)") {
            textToCopy = `
                While neo was in feedback, RA took the control and RA noticed there is Tight space, and RA tried giving manual move and neo started presenting the following:

                ${selectedTicket}
                ${operatorResponse}
            `;
        } 
        else {
            textToCopy = `
                While Neo was cleaning sector ${sectorInput || 'starting plan'} presented the following:

                ${selectedTicket}
                ${repetitiveResponse}
                ${operatorResponse}
            `;
        }
    }

    navigator.clipboard.writeText(textToCopy.trim()).then(() => {
        alert(`Text copied to clipboard:\n\n${textToCopy.trim()}`);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});
