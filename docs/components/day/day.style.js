const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(4, min-content);

    min-height: 100px;
    padding: 0.5rem;
    
    border-radius: 2px;
}

:host(:not([disabled])) {
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

:host(:not([disabled]):hover) {
    background: rgb(var(--light-blue));
}

:host([disabled]) {
    color: rgb(var(--dark));
    background: rgba(var(--grey), 0.5);
    
    cursor: default;
}

:host h1 {
    margin: 0;
}

:host span[day-of-week] {
    margin-left: 0.25rem;
    color: rgba(var(--black), 0.7);
}

:host span[work-time] {
    max-width: max-content;
    margin-top: 0.5rem;
    padding: 0.5rem 0.75rem;
    
    color: rgb(var(--black));
    background: rgb(var(--grey));
    border-radius: 10px;
    
    box-sizing: border-box;
}

:host([work-place="Mobile Arbeit"]) {
    color: rgb(var(--white));
    background: rgb(var(--light-blue));
}

:host([work-place="Urlaub"]) {
    color: rgb(var(--white));
    background: rgb(var(--green));
}

:host([work-place="Krankheit"]) {
    color: rgb(var(--white));
    background: rgb(var(--pink));
}

:host([work-place="Krankheit"]) span[work-time], :host([work-place="Urlaub"]) span[work-time] {
    display: none;
}

:host([is-today]) {
    background: rgb(var(--blue));
    color: rgb(var(--white));
}

:host([is-today]) span[day-of-week] {
    color: rgb(var(--white));
}

:host([is-today]) span[work-time] { 
    color: rgb(var(--black));
    background: rgb(var(--white));
}
</style>`;

export const createDateButtonStyles = () => {
  return template.content.cloneNode(true);
};
