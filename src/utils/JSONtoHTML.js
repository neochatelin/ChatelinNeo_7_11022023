export const JSONtoHTML = (e)=>{
    let elem = document.createElement(e.tagName || "div");
    Object.keys(e).map(k=> {
        switch(k) {
            case "tagName" :
                break;
            case "class":
                e.class.split(' ').map(c => elem.classList.add(c));
                break;
            case "style":
                break;
            case "textContent" :
                elem.textContent = e.textContent;
                break;
            case "innerHTML" :
                    elem.innerHTML = e.innerHTML;
                    break;
            case "children" :
                e.children.map(child => {
                    let childElement = JSONtoHTML(child);
                    elem.appendChild(childElement);
                });
                break;
            default :
                elem.setAttribute(k, e[k]);
        }
    })

    return elem;
}