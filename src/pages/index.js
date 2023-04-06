import { apiRecipesModel } from "../api/apiRecipes.js";
import { recipesCardFactorieModel } from "../factories/recipesCardFactorie.js";
import { TagModel } from "../utils/TagSelection.js";

let display = ()=>{
	document.querySelector(".recipesResearch").addEventListener("input", (e)=>{
		recipesCardFactorieModel.getDom(apiRecipesModel.researchRecipes2(e.target.value));
	});
	window.addEventListener("click", (e)=>{
		console.log( TagModel.getTag());
		if(e.target.tagName == "BUTTON"){
			recipesCardFactorieModel.getDom(apiRecipesModel.researchRecipes2(document.querySelector(".recipesResearch").value));
		}
	});
	recipesCardFactorieModel.getDom(apiRecipesModel.getAllRecipes());
};
display();