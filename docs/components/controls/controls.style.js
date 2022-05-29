const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    grid-template-rows: minmax(0, 1fr);
    column-gap: 1.25rem;
}

:host div {
    display: flex;
    flex-direction: row;
    column-gap: 0.25rem;
}
</style>`;

export const createControlsStyles = () => {
    return template.content.cloneNode(true);
};
