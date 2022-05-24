const template = document.createElement("template");
template.innerHTML = `
<style>
:host button {
    display: block;

    height: fit-content;
    min-height: 2.5rem;
    width: 100%;
    
    padding: 0.25rem 1rem;
    
    font-size: 1rem;
    border-radius: 2px;
    outline: none;
    border: none;
    
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

:host([variant="primary"]) button {
    color: rgb(var(--white));
    background: rgb(var(--blue));
}

:host([variant="primary"]) button:hover {
    background: rgba(var(--blue), 0.8);
}

:host([variant="secondary"]) button {
    color: rgb(var(--black));
    background: rgb(var(--grey));
}

:host([variant="secondary"]) button:hover {
    background: rgba(var(--light-blue), 0.8);
}
</style>`;

export const createButtonStyles = () => {
  return template.content.cloneNode(true);
};
