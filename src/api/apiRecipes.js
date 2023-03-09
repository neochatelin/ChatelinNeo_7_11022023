import { recipes } from "../data/recipes.js";
import { TagModel } from "../utils/TagSelection.js";

class apiRecipes{
    #load(){
        this.file = recipes;
    }
    #capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(){
        this.#load();
    }
    getIngredients(){
        if(this.ingredients === undefined){
            this.ingredients = [];
            this.file.forEach((e)=>{
                
                (e.ingredients).forEach((e2)=>{
                    if (!this.ingredients.find((e)=> e === (this.#capitalizeFirstLetter(e2.ingredient)))) {
                        this.ingredients.push(this.#capitalizeFirstLetter(e2.ingredient));
                    }
                })
            })
        }
        return this.ingredients;
    }
    getAppliance(){
        if(this.appliance === undefined){
            this.appliance = [];
            this.file.forEach((e)=>{
                if (!this.appliance.find((f)=> f === (this.#capitalizeFirstLetter(e.appliance)))) {
                    this.appliance.push(this.#capitalizeFirstLetter(e.appliance));
                }
            })
        }
        return this.appliance;
    }
    getUstensils(){
        if(this.ustensils === undefined){
            this.ustensils = [];
            this.file.forEach((e)=>{
                (e.ustensils).forEach((e2)=>{
                    if (!this.ustensils.find((e)=> e === (this.#capitalizeFirstLetter(e2)))) {
                        this.ustensils.push(this.#capitalizeFirstLetter(e2));
                    }
                })
            })
        }
        return this.ustensils;
    }
    getAllRecipes(){
        return this.file;
    }
    researchRecipes(research){
        let array = [];
        if (research.length < 3) {
            array = this.getAllRecipes();
        }else{
            for (let index = 0; index < this.file.length; index++) {
                const recipe = this.file[index];
                let added = false;
                if(recipe.name.toLowerCase().match(`W*(${research.toLowerCase()})\W*`)){
                    array.push(recipe);
                    added = true;
                }if(!added){
                    for (let indexIngredients = 0; indexIngredients < recipe.ingredients.length; indexIngredients++) {
                        const ingredient = recipe.ingredients[indexIngredients].ingredient;
                        if(ingredient.toLowerCase().match(`W*(${research.toLowerCase()})\W*`)){
                            array.push(recipe);
                            added = true;
                        }
                    }
                }if(!added && recipe.description.toLowerCase().match(`W*(${research.toLowerCase()})\W*`)){
                    array.push(recipe);
                    added = true;
                }
            }
        }
        
        let tags = TagModel.getTag();
        for (let index = 0; index < Object.keys(tags).length; index++) {
            const   tagCategorie = Object.keys(tags)[index],
                    tagsList = tags[Object.keys(tags)[index]];
            let remove = true;
            switch (tagCategorie) {
                case "Ingredient":
                    if (tagsList.length == 0) {
                        break;
                    }
                    for (let index = 0; index < array.length; index++) {
                        const ingredients = array[index].ingredients;
                        for (let index = 0; index < ingredients.length; index++) {
                            const ingredient = ingredients[index].ingredient;
                            remove = true;
                            for (let index = 0; index < tagsList.length; index++) {
                                const tag = tagsList[index];
                                if(ingredient == tag){
                                    remove = false;
                                    break;
                                }
                            }
                            if (remove) {
                                break;
                            }
                        }
                        if (remove) {
                        }
                    }
                    
                    break;
                case "Appareils"://appliance
                    if (tagsList.length == 0) {
                        break;
                    }
                    for (let index = 0; index < array.length; index++) {
                        const recipe = array[index];
                        console.log(recipe.appliance);
                        for (let index = 0; index < tagsList.length; index++) {
                            const tag = tagsList[index];
                            remove = true;
                            if(recipe.appliance == tag){
                                remove = false
                            }
                        }
                        if (remove) {
                            console.log(recipe.name);
                        }
                    }
                    break;
                case "Ustensiles"://ustensils
                    if (tagsList.length == 0) {
                        break;
                    }
                    for (let index = 0; index < array.length; index++) {
                        const recipe = array[index];
                    }
                    break;
                default:
                    break;
            }
        }
        return array;
    }
    researchRecipes2(research){
        let array = [];
        if (research.length < 3) {
            array = this.getAllRecipes();
        }else{
            this.file.map((recipe)=>{
                let added = false;
                if(recipe.name.toLowerCase().match(`W*(${research.toLowerCase()})\W*`)){
                    array.push(recipe);
                    added = true;
                }if(!added){
                    recipe.ingredients.find(ingredient=>ingredient.ingredient.toLowerCase().match(`W*(${research.toLowerCase()})\W*`) != undefined ?(array.push(recipe), added = true) : '');
                }if(!added && recipe.description.toLowerCase().match(`W*(${research.toLowerCase()})\W*`)){
                    array.push(recipe);
                    added = true;
                }
            })
        }
        let tags = TagModel.getTag();
        Object.keys(tags).forEach((tagCategorie)=>{
            tags[tagCategorie].map(tag=>{
                
            })
        })
        return array;
    }
    
}export const apiRecipesModel = new apiRecipes();