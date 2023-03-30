import { recipes } from "../data/recipes.js";
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
			array = recipes;
		}else{
			for (let index = 0; index < recipes.length; index++) {
				const recipe = recipes[index];
				let added = false;
				if(recipe.name.toLowerCase().match(`W*(${research.toLowerCase()})W*`)){
					array.push(recipe);
					added = true;
				}if(!added){
					for (let indexIngredients = 0; indexIngredients < recipe.ingredients.length; indexIngredients++) {
						const ingredient = recipe.ingredients[indexIngredients].ingredient;
						if(ingredient.toLowerCase().match(`W*(${research.toLowerCase()})W*`)){
							array.push(recipe);
							added = true;
						}
					}
				}if(!added && recipe.description.toLowerCase().match(`W*(${research.toLowerCase()})W*`)){
					array.push(recipe);
					added = true;
				}
			}
		}
        
		let tags = TagModel.getTag();
		console.log(recipes);

		for (let index = 0; index < Object.keys(tags).length; index++) {
			const   tagCategorie = Object.keys(tags)[index],
				tagsList = tags[Object.keys(tags)[index]];
			let remove = true;
			let deleteList = [];
			switch (tagCategorie) {
			case "Ingredient":
				if (tagsList.length == 0) {
					break;
				}
				for (let indexRecipe = 0; indexRecipe < array.length; indexRecipe++) {
					const ingredients = array[indexRecipe].ingredients;
					for (let index = 0; index < tagsList.length; index++) {
						const tag = tagsList[index];
						remove = true;
						for (let index = 0; index < ingredients.length; index++) {
							const ingredient = ingredients[index].ingredient;
							if(ingredient == tag){
								remove = false;
							}
						}
						if (remove) {
							deleteList.push(indexRecipe);
						}
					}
				}
				if (deleteList.length > 0) {
					for (let index = 0; index < deleteList.length; index++) {
						array.splice(deleteList[index]-index, 1);
					}
				}
                    
				break;
			case "Appareils"://appliance
				if (tagsList.length == 0) {
					break;
				}
				for (let indexRecipe = 0; indexRecipe < array.length; indexRecipe++) {
					const recipe = array[indexRecipe];
					remove = true;
					for (let index = 0; index < tagsList.length; index++) {
						const tag = tagsList[index];
						if(recipe.appliance == tag){
							remove = false;
						}
					}
					if (remove) {
						deleteList.push(indexRecipe);
					}
				}
				if (deleteList.length > 0) {
					for (let index = 0; index < deleteList.length; index++) {
						array.splice(deleteList[index]-index, 1);
					}
				}
				break;
			case "Ustensiles"://ustensils
				if (tagsList.length == 0) {
					break;
				}
				for (let indexRecipe = 0; indexRecipe < array.length; indexRecipe++) {
					const recipe = array[indexRecipe];
					for (let index = 0; index < tagsList.length; index++) {
						const tag = tagsList[index];
						remove = true;
						for (let index = 0; index < recipe.ustensils.length; index++) {
							const ustensil = (recipe.ustensils[index]).toLowerCase();
							if(ustensil == tag.toLowerCase()){
								remove = false;
							}
						}
						if(recipe.appliance == tag){
							remove = false;
						}
					}
					if (remove) {
						deleteList.push(indexRecipe);
					}
				}
				if (deleteList.length > 0) {
					for (let index = 0; index < deleteList.length; index++) {
						array.splice(deleteList[index]-index, 1);
					}
				}
				break;
			default:
				break;
			}
		}
		console.log(array);
		return array;
	}
	researchRecipes2(research){
		let array = [];
		if (research.length < 3) {
			array = this.getAllRecipes();
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
			tags[tagCategorie].map(tag=>{
                
			});
		});
		return array;
	}
    
}export const apiRecipesModel = new apiRecipes();