
 $(function(){

   function eventsBlock(events){
      events.forEach((event) =>{

   $("#udalosti tbody").append(`<tr>
   <td class="event-year">${event.year}</td>
   <td>
     <p class="event-name"><i class="fas fa-chevron-down"></i> <a href="${event.url}" target="_new">${event.event}</a></p>
     <p class="event-detail">${event.detail}</p>
   </td>            
   <td class="event-evaluation">${(event.evaluation == "true") ? '<i class="fas fa-plus-circle text-success"></i>' : '<i class="fas fa-minus-circle text-danger"></i>'}</td>
</tr>`);
});


$(".event-detail").hide();
$(".event-name i, .event-name a").on("mouseover", function(){
   $("#udalosti tr").removeClass("bg-secondary text-white");
   $(".event-detail").hide();
   $(this).parent().next().show(850);
});    

$("h2").on("click", function(){
   $(this).parents(".row").next().slideToggle(800);
});

   }
   




function heroesBlock(heroes){
   heroes.forEach((hero)=>{

   $("#postavy .list-group").append(`<li class="list-group-item list-group-item-action list-group-item-success">${hero.name}</li>`);
});
function fillPersonCard(person) {
   let hero = heroes.find(item => {return item.name === person});

   $(".card-header").html(`<i class="fas fa-star-of-life"></i> <b>${hero.birth}</b> - <i class="fas fa-cross"></i> <b>${hero.death}</b>`);
   $(".card-title").text(hero.name);
   $(".card-text").text(hero.biography);
   $(".card-footer").html(`Odkaz: <a href="${hero.online}">${hero.online}</a>`);

   $(".gallery").empty();

   for (let i = 0; i < hero.portraits.length; i++) {
      $(".gallery").append(`<div class="col-sm-4"><img src="../historie/img/${hero.portraits[i]}" alt="" class="img-fluid"></div>`);        
  }
}

$("#postavy li:first").addClass('active');
fillPersonCard(heroes[0].name);

$("#postavy li").on("click", function(){
   $("#postavy li").removeClass("active");
   $(this).addClass("active");        
   let person = $(this).text();
   $("#portret").slideUp(1000, function(){
       fillPersonCard(person);
   });
   $("#portret").slideDown(1000);
});
   
   }



function articlesBlock(articles){
articles.forEach((article)=>{
   $("#novinky").append(`    
   <div class="col-sm-6 mt-3 pb-3 border-bottom">
     <article>
       <figure>
         <img src="../historie/img/clanek/${article.gallery[0]}" alt="${article.title}" class="img-fluid">
       </figure>
       <h3>${article.title}</h3>
       <div class="article-text">
           <p>${article.text}</p>
           <p><a href="${article.source}" target="_new">Celý článek</a></p>
       </div>
       <div class="article-footer">Autor: ${article.author} 
       <button type="button" class="btn btn-success likes"><i class="fas fa-thumbs-up"></i> <span class="badge badge-light">${article.likes}</span></button>
       <button type="button" class="btn btn-danger dislikes"><i class="fas fa-thumbs-down"></i> <span class="badge badge-light">${article.dislikes}</span></button>
       </div>
     </article>
   </div>        
`);    
});

$(".article-text").hide();

$("#novinky h3").on("click", function(){
   $(this).next(".article-text").slideToggle(600);
});

$(".likes").on("click", function(){
   let likes = parseInt($(this).find("span").text());
   $(this).find("span").text(likes + 1);
});

$(".dislikes").on("click", function(){
   let dislikes = parseInt($(this).find("span").text());
   $(this).find("span").text(dislikes + 1);
});

   }




fetch('../historie/data/udalosti.json')
.then(response => {
   return response.json();
})

.then(json =>{
    eventsBlock(json);
})

.catch(function(error){
   console.error('Chyba: \n', error);
});




fetch('../historie/data/hrdinove.json')
.then(response => {
   return response.json();
})

.then(json =>{
    heroesBlock(json);
})

.catch(function(error){
   console.error('Chyba: \n', error);
});




fetch('../historie/data/clanky.json')
.then(response => {
   return response.json();
})

.then(json =>{
    articlesBlock(json);
})

.catch(function(error){
   console.error('Chyba: \n', error);
});


});
