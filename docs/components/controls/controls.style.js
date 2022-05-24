const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    grid-template-rows: minmax(0, 1fr);
    column-gap: 1rem;
}

:host div {
    display: flex;
    flex-direction: row;
    column-gap: 1px;
}

:host div[navigation] *, :host div[navigation] *::part(button), :host div[setting] * {
    border-radius: 0;
}

:host div[navigation] :first-child::part(button), :host div[setting] :first-child {
    border-radius: 2px 0 0 2px;
}

:host div[navigation] :last-child::part(button), :host div[setting] :last-child {
    border-radius: 0 2px 2px 0;
}
</style>`;

export const createControlsStyles = () => {
  return template.content.cloneNode(true);
};
