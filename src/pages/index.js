import { apiRecipesModel } from "../api/apiRecipes.js";
import { recipesCardFactorieModel } from "../factories/recipesCardFactorie.js";

let display = ()=>{
	document.querySelector(".recipesResearch").addEventListener("input", (e)=>{
		recipesCardFactorieModel.getDom(apiRecipesModel.researchRecipes(e.target.value));
	});
	window.addEventListener("click", (e)=>{
		if(e.target.tagName == "BUTTON"){
			recipesCardFactorieModel.getDom(apiRecipesModel.researchRecipes(document.querySelector(".recipesResearch").value));
		}
	});
	recipesCardFactorieModel.getDom(apiRecipesModel.getAllRecipes());
};
display();