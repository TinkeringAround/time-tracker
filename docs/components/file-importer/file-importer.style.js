import {Button} from "../button/button.webcomponent.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    position: fixed;
    top: 0;
    left: 0;

    display: none;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    background: rgba(var(--black), 0.7);
}

:host([visible]) {
    display: flex;
}

:host div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    
    height: 150px;
    max-height: 100%;
    width: 300px;
    max-width: 100%;
    padding: 1.5rem;
    
    background: rgb(var(--white));
    border-radius: 2px;
}

:host div h1 {
    margin: 0;
    color: rgb(var(--black));
    font-size: 1.5rem;
}

:host div input[type="file"] {
    display: none;
}

:host ${Button.tag} {
    width: 200px;
}
</style>`;

export const createFileStyles = () => {
    return template.content.cloneNode(true)
};
