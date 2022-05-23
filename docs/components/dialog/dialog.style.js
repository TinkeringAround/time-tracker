import {Input} from "../input/input.webcomponent.js";

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
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) min-content;
    row-gap: 1rem;
    
    height: 400px;
    max-height: 100%;
    width: 600px;
    max-width: 100%;
    padding: 1.5rem;
    
    background: rgb(var(--white));
    border-radius: 2px;
}

:host form {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, min-content) minmax(0, 1fr);
    grid-template-areas: "header header header"
                         "dropdown dropdown ."
                         "start pause end";

    padding: 1rem;
    gap: 1rem;
    
    background: rgb(var(--grey));
    border-radius: 10px;
    
    overflow: auto;
}

:host form h1 {
    grid-area: header;
    margin: 0;
    font-size: 2rem;
}

:host form ${Input.tag} {
    font-size: 1.25rem;
}

:host footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 1rem;
}
</style>`;

export const createDialogStyles = () => {
    return template.content.cloneNode(true)
};