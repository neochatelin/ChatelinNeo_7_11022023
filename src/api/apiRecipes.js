import { recipes } from "../../data/recipes.js";
import { TagModel } from "../utils/TagSelection.js";

class apiRecipes{
	#capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	getIngredients(){
		this.ingredients = [];
		recipes.forEach((e)=>{    
			(e.ingredients).forEach((e2)=>{
				if (!this.ingredients.find((e)=> e === (this.#capitalizeFirstLetter(e2.ingredient)))) {
					this.ingredients.push(this.#capitalizeFirstLetter(e2.ingredient));
				}
			});
		});
        
		return this.ingredients;
	}
	getAppliance(){
		this.appliance = [];
		recipes.forEach((e)=>{
			if (!this.appliance.find((f)=> f === (this.#capitalizeFirstLetter(e.appliance)))) {
				this.appliance.push(this.#capitalizeFirstLetter(e.appliance));
			}
		});
		
		return this.appliance;
	}
	getUstensils(){
		this.ustensils = [];
		recipes.forEach((e)=>{
			(e.ustensils).forEach((e2)=>{
				if (!this.ustensils.find((e)=> e === (this.#capitalizeFirstLetter(e2)))) {
					this.ustensils.push(this.#capitalizeFirstLetter(e2));
				}
			});
		});
		
		return this.ustensils;
	}
	getAllRecipes(){
		return recipes;
	}
	researchRecipes(research){
		let array = [];
		if (research.length < 3) {
			array = recipes.slice();
		}else{
			recipes.map((recipe)=>{
				let added = false;
				if(recipe.name.toLowerCase().match(`W*(${research.toLowerCase()})W*`)){
					array.push(recipe);
					added = true;
				}if(!added){
					recipe.ingredients.find(ingredient=>ingredient.ingredient.toLowerCase().match(`W*(${research.toLowerCase()})W*`) != undefined ?(array.push(recipe), added = true) : "");
				}if(!added && recipe.description.toLowerCase().match(`W*(${research.toLowerCase()})W*`)){
					array.push(recipe);
					added = true;
				}
			});
		}

		let tags = TagModel.getTag();

		Object.keys(tags).forEach((tagCategorie)=>{
			let remove = true,
				deleteList = [],
				tagsList = tags[tagCategorie];
			
			switch (tagCategorie) {
			case "Ingredient":
				if (tagsList.length == 0) {
					break;
				}
				array.map((value, indexRecipe)=>{
					const ingredients = value.ingredients;
					tagsList.map((value)=>{
						const tag = value;
						remove = true;
						ingredients.map((value)=>{
							const ingredient = value.ingredient;
							if(ingredient == tag){
								remove = false;
							}
						});
						if (remove) {
							deleteList.push(indexRecipe);
						}
					});
				});
				if (deleteList.length > 0) {
					deleteList.map((value, index)=>{
						array.splice(value-index, 1);
					});
				}
				break;
			case "Appareils":
				if (tagsList.length == 0) {
					break;
				}
				array.map((recipe, indexRecipe)=>{
					remove = true;
					tagsList.map((tag)=>{
						if(recipe.appliance == tag){
							remove = false;
						}
					});
					if (remove) {
						deleteList.push(indexRecipe);
					}
				});
				if (deleteList.length > 0) {
					deleteList.map((value, index)=>{
						array.splice(value-index, 1);
					});
				}
				
				break;
			case "Ustensiles"://ustensils
				if (tagsList.length == 0) {
					break;
				}
				array.map((recipe, indexRecipe)=>{
					tagsList.map((tag)=>{
						remove = true;
						recipe.ustensils.map((ustensil)=>{
							if(ustensil.toLowerCase() == tag.toLowerCase()){
								remove = false;
							}
						});
						if(recipe.appliance == tag){
							remove = false;
						}
					});
					if (remove) {
						deleteList.push(indexRecipe);
					}
				});
				if (deleteList.length > 0) {
					deleteList.map((value, index)=>{
						array.splice(value-index, 1);
					});
				}

				break;
			default:
				break;
			}
		});
		return array;
	}
    
}export const apiRecipesModel = new apiRecipes();