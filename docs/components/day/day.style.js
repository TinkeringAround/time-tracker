const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(4, min-content);

    min-height: 150px;
    padding: 0.5rem;
    
    border-radius: 10px;
}

:host(:not([disabled])) {
    transition: all 0.15s ease-in-out;
    cursor: pointer;
}

:host(:not([disabled]):hover) {
    background: rgb(var(--light-blue));
}

:host h1 {
    margin: 0;
    padding-left: 1px;
}

:host span[day-of-week] {
    margin-left: 0.25rem;
    color: rgba(var(--black), 0.7);
}

:host span[work-time] {
    display: flex;
    justify-content: center;
    align-items: center;
    
    max-width: max-content;
    margin-top: 0.5rem;
    padding: 0.75rem 1rem;
    
    color: rgb(var(--black));
    background: rgb(var(--white));
    border-radius: 10px;
    
    box-sizing: border-box;
    transition: all 0.15s ease-in-out;
}

:host([work-place="Büro"]) span[work-time] {
    background: rgb(var(--light-blue));
}

:host([work-place="Mobile Arbeit"]) span[work-time] {
    background: rgb(var(--violet));
}

:host([work-place="Gleitzeit"]) span[work-time] {
    background: rgb(var(--yellow));
}

:host([work-place="Freier Tag"]) span[work-time] {
    background: rgb(var(--dark));
}

:host([work-place="Urlaub"]) span[work-time] {
    background: rgb(var(--green));
}

:host([work-place="Krank"]) span[work-time] {
    background: rgb(var(--pink));
}

:host span[work-time] svg {
    width: 1rem;
    height: 1rem;
    
    fill: rgb(var(--black));
}

:host([disabled]) {
    color: rgb(var(--dark));
    background: rgba(var(--grey), 0.5);
    
    cursor: default;
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