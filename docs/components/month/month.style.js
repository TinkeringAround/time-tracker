const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 10px;
    
    padding: 1.5rem;
    box-sizing: border-box;
    border-radius: 10px;
    
    background: rgb(var(--grey));
    
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

:host(:hover) {
    background: rgb(var(--light-blue));
}

:host h1 {
    display: flex;
    align-items: center;
    
    grid-column-start: 1;
    grid-column-end: 8;
    
    margin: 0;
    font-size: 2rem;
    color: rgb(var(--black));
}

:host div {
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 0.75rem;
    color: rgb(var(--black));
    background: rgb(var(--white));
    border-radius: 5px;
}

:host div[work-place="Mobile Arbeit"] {
    color: rgb(var(--white));
    background: rgb(var(--light-blue));
}

:host div[work-place="Urlaub"] {
    color: rgb(var(--white));
    background: rgb(var(--green));
}

:host div[work-place="Krankheit"] {
    color: rgb(var(--white));
    background: rgb(var(--pink));
}

:host div[is-today] {
    color: rgb(var(--white));
    background: rgb(var(--blue));
}
</style>`;

export const createMonthStyles = () => {
    return template.content.cloneNode(true)
};