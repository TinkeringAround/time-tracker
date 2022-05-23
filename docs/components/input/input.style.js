const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    
    padding: 1rem;
    
    color: rgb(var(--black));
    background: rgb(var(--white));
    border-radius: 10px;
    box-sizing: border-box;
}

:host label {
    color: rgb(var(--black));
    font-size: 1.25rem;
    font-weight: bold;
}

:host input {
    width: 100%;
    padding: 1rem;
    
    color: rgb(var(--black));
    background: rgb(var(--grey));
    font-size: 1.25rem;
    font-family: "Arial", sans-serif;
    text-align: center;
     
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    outline: none;
    
    transition: all 0.1s ease-in-out;
}

:host input:hover {
    background: rgb(var(--light-blue));
}

:host input:focus-visible {
    border: none;
}

:host input::-webkit-datetime-edit {
    text-align: center;
}

:host input::-webkit-calendar-picker-indicator {
    display: none;
}


</style>`;

export const createInputStyles = () => {
    return template.content.cloneNode(true)
};
