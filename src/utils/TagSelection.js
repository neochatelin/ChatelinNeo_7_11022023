import { apiRecipesModel } from "../api/apiRecipes.js";

class TagSelection{
    #addToTag(e, color, type){
        if (this.tagAdded[type].indexOf(e.target.textContent) != -1) {
            return;
        }
        this.tagAdded[type].push(e.target.textContent)
        let tagContener = document.querySelector("tag");
        let tag = document.createElement("div");
        let pTag = document.createElement("div");
        tag.style.backgroundColor = color;
        tag.setAttribute('type', type)
        pTag.textContent = e.target.textContent;
        let xButton = document.createElement("button");
        xButton.onclick = (ev)=>{
            for (let index = 0; index < this.tagAdded[type].length; index++) {
                const element = this.tagAdded[type][index];
                if (element === e.target.textContent) {
                    this.tagAdded[type].splice(index, 1);
                }
            }
            tag.remove()
        }
        tag.appendChild(pTag);
        tag.appendChild(xButton);
        tagContener.appendChild(tag);
    }
    #active(e){
        e.setAttribute('class', 'active');
        e.innerHTML = '';
        const elem = document.createElement('div');
        const input = document.createElement('input');
        input.placeholder = "Rechercher un " + e.attributes.name.value;
        elem.style.backgroundColor = e.attributes.color.value;
        const taglist = document.createElement('tagList');
        taglist.style.backgroundColor = e.attributes.color.value;
        taglist.setAttribute('class', "taglist " +e.attributes.name.value);
        let list;
        switch (e.attributes.name.value) {
            case "Ingredient":
                list = apiRecipesModel.getIngredients();
                break;
            case "Appareils":
                list = apiRecipesModel.getAppliance();
                break;
            case "Ustensiles":
                list = apiRecipesModel.getUstensils();
                break;
            default:
                break;
        }
        let i = 0;
        list.every( el =>{
            i++
            let elementList = document.createElement('button');
            elementList.onclick = (ev)=>{this.#addToTag(ev, e.attributes.color.value, e.attributes.name.value)};
            elementList.textContent = el;
            taglist.appendChild(elementList);
            if(i==30){return false};
            return true;
        })
        input.addEventListener('input', (ev)=>{
            taglist.remove();
            let i = 0;
            taglist.innerHTML = "";
            (list.filter((i)=> i.startsWith(ev.originalTarget.value.charAt(0).toUpperCase() + ev.originalTarget.value.slice(1)))).every(el=>{
                i++
                let elementList = document.createElement('button');
                elementList.onclick = (ev)=>{
                    this.#addToTag(ev, e.attributes.color.value)
                };
                elementList.textContent = el;
                taglist.appendChild(elementList);
                if(i==30){return false};
                return true;
            })
            e.appendChild(taglist);
        })
        elem.appendChild(input);
        e.appendChild(elem);
        input.focus();
        e.appendChild(taglist);
    }
    #disable(e){
        e.classList.remove('active');
        e.innerHTML = '';
        this.#getDom(e);
    }
    #getDom(e){
        const elem = document.createElement('div');
        elem.style.backgroundColor = e.attributes.color.value;
        elem.textContent = e.attributes.name.value;
        e.appendChild(elem);
        this.getTag();
    }
    constructor(){
        this.tagAdded = {};
        let tag_selector = document.querySelectorAll('tag_selector');
        window.addEventListener('click', (e)=>{
            if(e.target.tagName !== "TAG_SELECTOR"){
                tag_selector.forEach((e)=>{
                    if(e.classList.value == 'active'){
                        this.#disable(e);
                    }
                });
            }
        })
        tag_selector.forEach((e)=>{
            e.addEventListener('click', ()=>{
                if(e.classList.value != 'active'){
                    this.#active(e);
                }
            })
            this.tagAdded[e.attributes.name.value] = [];
            this.#getDom(e);
        })
    }
    getTag(){
        return this.tagAdded;
    }
};export const TagModel = new TagSelection();