const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    position: relative;

    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(4, min-content);
    grid-template-rows: minmax(0, 1fr);
    align-items: center;
    justify-content: flex-end;
}

:host div[legend] {
    position: absolute;
    top: 0;
    right: 0;

    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    flex-wrap: wrap;

    max-width: 150px;
    padding: 1rem;

    border: 1px solid rgb(var(--dark));
    border-radius: 5px;
    background: rgb(var(--white));

    transition: all 0.15s ease-in-out;
    cursor: pointer;
}

:host div[legend]:hover {
    background: rgb(var(--grey));
}

:host div[legend][visible] {
    display: flex;
}

:host div[legend] div[legend-element] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    column-gap: 0.5rem;
    width: 100%;
}

:host div[legend] div[legend-element] span {
    color: rgb(var(--black));
    font-size: 1rem;
    font-weight: normal;
}

:host div[legend] div[legend-element] div {
    height: 20px;
    width: 20px;
    
    border-radius: 2px;
}
</style>`;

export const createLegendStyles = () => {
  return template.content.cloneNode(true);
};
