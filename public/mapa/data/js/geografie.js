
$(function() {
let mesta = [];
let parky = [];

fetch('../mapa/data/js/towns.json')
.then(response => {
   return response.json();
})
.then(json =>{
   mesta = json;
})
.catch(function(error){
   console.error('Chyba: \n', error);
});

fetch('../mapa/data/js/parks.json')
.then(response => {
   return response.json();
})
.then(json =>{
   parky = json;
})
.catch(function(error){
   console.error('Chyba: \n', error);
});

  let poi = [];
  fetch('http://localhost:8080/api/town')
  .then(response => { return response.json() })
  .then(json => { poi = json; })
  .catch(function (error) { console.error('Error: \n', error); });
  
  fetch('http://localhost:8080/api/park')
  .then(response => { return response.json() })
  .then(json => { poi = json; })
  .catch(function (error) { console.error('Error: \n', error); });




  let lastfill = $("svg").attr('fill');
  $("path").on('click', function() { 

    if (lastfill == 'rgb(4, 132, 4)') { 
      $(this).css({'fill': '#7c7c7c'}); 
      lastfill = "#cccccc"; 
      $('#towninfo').html("");
    } else {
      $("path").css('fill', $("svg").attr('fill')); 
      $("path, rect, ellipse").css('fill', $("g").attr('fill')); 
      $(this).css({'fill': 'green'}); 
      lastfill = "rgb(4, 132, 4)"; 
      $('#towninfo').html("");
    }
  });
  
  $("path").on('mouseover', function() { 
    lastfill = $(this).css('fill');
    if (lastfill == 'rgb(4, 132, 4)') { 
      $(this).css({'fill': 'rgb(2, 90, 2)'}); 
    } else {
      $(this).css({'fill': '#7c7c7c'}); 
    }
  });

  $("rect, ellipse").on('mouseover', function() { 
    lastfill = $(this).css('fill');
      $(this).css({'fill': 'rgb(2, 90, 2)'}); 
  });



  $("path, rect, ellipse").on('mouseout', function() { 
    $(this).css({'fill': lastfill});
  });

  $("rect, ellipse").on('click', function() { 
      let id = $(this).attr('id');
      let mesto = mesta.find(item => {return item.id == id});
      $('#towninfo').slideUp(700, function(){$('#towninfo').html(`<div class="container border mt-3 mb-3" ><h3>${mesto.city}</h3> Počet obyvatel: ${new Intl.NumberFormat('cs-CS').format(mesto.population)}<hr><p>${mesto.text}</p></div`)});
      $('#towninfo').slideToggle(600);
  });
});
