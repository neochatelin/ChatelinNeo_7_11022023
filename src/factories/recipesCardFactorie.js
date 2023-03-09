import { apiRecipesModel } from "../api/apiRecipes.js";
import { JSONtoHTML } from "../utils/JSONtoHTML.js";
import { TagModel } from "../utils/TagSelection.js";

class recipesCardFactorie{
    #getCardDom(data){
        let card = {
            'tagName':'div',
            'class':'card',
            'children':[{
                    'tagName':'img',
                    'class':'card-img-top',
                    'alt':data.name+ " image"
                },{
                    'tagName':'div',
                    'class':'card-body',
                    'children':[{
                        'tagName':'div',
                        'class':'card-header-container',
                        'children':[{
                            'tagName':'p',
                            'class':'card-titre',
                            'textContent':data.name
                        },{
                            'tagName':'div',
                            'children':[{
                                'tagName':'i',
                                'class':'bi bi-clock'
                            },{
                                'tagName':'p',
                                'class':'card-time',
                                'textContent':`${data.time} min`
                            }]
                        }]
                    },{
                        'tagName':'div',
                        'class':'card-main-container',
                        'children':[{
                            'tagName':'p',
                            'class':'card-ingredients',
                            'children':this.#getIngredientsCardDom(data.ingredients)
                        },{
                            'tagName':'p',
                            'class':'card-description',
                            'textContent':data.description
                        }]
                    }]
                }
            ]
        }
        return JSONtoHTML(card);
    }
    #getIngredientsCardDom(data){
        let ingredients = []
        data.map(ingredient=>{
            let elem = {
                'tagName':'div',
                'innerHTML':`<p class="fw-bold">${ingredient.ingredient}</p>: ${ingredient.quantity} ${
                    (ingredient.unit)?
                        (ingredient.unit == 'grammes')?
                            'g'
                        :(ingredient.unit == 'cuillères à soupe')?
                            ingredient.unit.split(' ')[0]
                        :ingredient.unit
                    :''}`
            }
            ingredients.push(elem);
        })
        return ingredients;
    }
    getDom(recipes){
        let grid = document.querySelector('main');
        grid.innerHTML = '';
        if(recipes.length != 0){//ajouter les tag
            const tagList = TagModel.getTag();

            recipes.forEach((e)=>{
                grid.appendChild(this.#getCardDom(e));
            })
        }else{
            let p = document.createElement('p');
            p.textContent = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...';
            grid.appendChild(p)
        }
    }
}export const recipesCardFactorieModel = new recipesCardFactorie();