const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    position: relative;
    
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;

    height: 3.25rem;
    width: fit-content;
    min-width: 100px;
    padding: 0 1rem;
    margin-left: 0.5rem;

    border-radius: 10px;
   
    box-sizing: border-box;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
}

:host([credits="positive"]) {
   background: rgb(var(--dark-green));
}

:host([credits="negative"]) {
   background: rgb(var(--red));
}

:host svg {
    height: 1rem;
    width: 1rem;
    
    fill: rgb(var(--white));
}

:host span {
    display: block;

    font-size: 0.85rem;
    font-weight: normal;
    color: rgb(var(--white));
    
    white-space: nowrap;
}

:host div[overlay] {
    position: absolute;
    top: 0;
    right: 0;

    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    row-gap: 1rem;
    
    width: max-content;
    min-width: 250px;
    max-width: 350px;
    min-height: min-content;
    max-height: calc(100vh - 6rem);
    padding: 1rem;
    
    background: rgb(var(--white));
    border: 1px solid rgb(var(--dark));
    border-radius: 5px;
    
    transition: all 0.15s ease-in-out;
    cursor: pointer;
}

:host div[overlay]:hover {
    background: rgb(var(--grey));
}

:host div[overlay] h1 {
    width: 100%;
    margin: 0;
    
    font-size: 1.25rem;
}

:host div[overlay] div[content] {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    
    overflow: auto;
}

:host div[overlay] div[content] div[year-element], :host div[overlay] div[total] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    column-gap: 0.5rem;
    width: 100%;
}

:host div[overlay] div[content] div[year-element] h2 {
    margin: 0;
    
    font-size: 1rem;
}

:host div[overlay] div[content] div[year-element] span {
  color: rgb(var(--black));
  font-size: 1rem;
}

:host div[overlay] hr {
    position: relative;
    left: -2.5%;
    
    height: 2px;
    width: 95%;
    margin: 0;
    
    border: none;
    border-radius: 2px;
}

:host div[overlay] div[total] h2 {
    margin: 0;
    
    font-size: 1.25rem;
}

:host div[overlay] div[total] span {
    font-size: 1.25rem;
}

:host([credits="positive"]) div[overlay] hr {
     background: rgb(var(--dark-green));
}

:host([credits="negative"]) div[overlay] hr {
     background: rgb(var(--red));
}

:host([credits="positive"]) div[overlay] div[total] h2, :host([credits="positive"]) div[overlay] div[total] span {
    color: rgb(var(--dark-green));
}

:host([credits="negative"]) div[overlay] div[total] h2, :host([credits="negative"]) div[overlay] div[total] span {
    color: rgb(var(--red));
}
</style>`;

export const createCreditsStyles = () => {
    return template.content.cloneNode(true);
};
