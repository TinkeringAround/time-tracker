const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: minmax(0, 1fr);
    align-items: center;
    column-gap: 1rem;
    
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    
    border-radius: 10px;
    background: rgb(var(--white));
}

:host label {
    font-family: inherit;
    font-weight: bold;
    font-size: 1.25rem;
}

:host select {
    padding: 1rem;
    
    background: rgb(var(--grey));
    border: none;
    appearance: none;
    outline: none;
    border-radius: 10px;
   
    font-family: inherit;
    font-size: 1.25rem;
    text-align: center;
    
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    box-sizing: border-box;
}

:host select:hover {
    background: rgba(var(--light-blue));
}

:host(select::-ms-expand) {
    display: none;
}
</style>`;

export const createDropdownStyles = () => {
    return template.content.cloneNode(true)
};
