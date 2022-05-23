const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    
    background: rgb(var(--blue));
    border-radius: 2px;
    
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

:host(:hover) {
     background: rgba(var(--blue), 0.8);
}

:host svg {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    
    fill: rgb(var(--white));
    
    transition: all 0.1s ease-in-out;
}
</style>`;

export const createIconButtonStyles = () => {
    return template.content.cloneNode(true)
};
