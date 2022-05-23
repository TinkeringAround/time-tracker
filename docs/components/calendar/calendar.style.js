const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: grid;
    padding: 1rem;

    overflow: auto;
}
</style>`;

export const createCalendarStyles = () => {
  return template.content.cloneNode(true);
};

export const getCalendarGridStyles = (mode) => {
  if (mode === "month") {
    return `
        :host {
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: repeat(6, 1fr);
            grid-gap: 5px;
        }
        `;
  } else {
    return `
        :host {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(3, 1fr);
            grid-gap: 1.5rem;
        }
        `;
  }
};
