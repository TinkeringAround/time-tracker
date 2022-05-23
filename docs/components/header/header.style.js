const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, min-content) minmax(0, 1fr) repeat(4, min-content) repeat(2, min-content);
    grid-template-rows: minmax(0, 1fr);
    column-gap: 0.75rem;
    align-items: center;

    height: var(--header-size);
    padding: 0 2rem;

    font-size: 2.5rem;
    font-weight: bold;
    background: rgb(var(--grey));

    border-bottom: 1px solid rgba(var(--black), 0.5);
}

:host h1 {
    margin: 0;
    font-size: 2.5rem;
}

:host span {
    font-weight: normal;
}

:host div[legend] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 2rem;
}

:host div[legend] div[legend-element] {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 0.5rem;
}

:host div[legend] div[legend-element] span {
    font-size: 1rem;
}

:host div[legend] div[legend-element] div {
    height: 30px;
    width: 30px;
    
    border-radius: 2px;
}
</style>`;

export const createHeaderStyles = () => {
  return template.content.cloneNode(true);
};
