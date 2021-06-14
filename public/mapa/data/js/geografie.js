$(function() {

  let poi = [];
  fetch('http://localhost:8080/api/town')
  .then(response => { return response.json() })
  .then(json => { poi = json; })
  .catch(function (error) { console.error('Error: \n', error); });


  let lastfill = $("svg").attr('fill');
  $("path, rect, ellipse").on('click', function() { //on click on path
    if (lastfill == 'rgb(4, 132, 4)') { //if lastfill is yellow
      $(this).css({'fill': '#7c7c7c'}); //set the color to black
      lastfill = "#cccccc"; //set lastfill to grey
      $("#textsel").html("...");
      $('#towninfo').html("");
    } else {
      $("path").css('fill', $("svg").attr('fill')); //revert all path to grey
      $("rect, ellipse").css('fill', $("g").attr('fill')); //revert all rect to red
      $(this).css({'fill': 'green'}); //set current to yellow
      lastfill = "rgb(4, 132, 4)"; //set last fill to yellow
      $("#textsel").html("Kraj - " + $(this).attr('name')); //set h1 to name of path
      $('#towninfo').html("");
    }
  });
  $("path, rect, ellipse").on('mouseover', function() { //on mouse over on path
    lastfill = $(this).css('fill');
    if (lastfill == 'rgb(4, 132, 4)') { //if lastfill is yellow
      $(this).css({'fill': 'rgb(2, 90, 2)'}); //set path to black-ish yellow
    } else {
      $(this).css({'fill': '#7c7c7c'}); //set path to black
    }
  });
  $("path, rect, ellipse").on('mouseout', function() { //on mouse out on path set previous color
    $(this).css({'fill': lastfill});
  });

  $("rect, ellipse").on('click', function() { //on click on path
    if (lastfill == 'rgb(4, 132, 4)') {
      let id = $(this).attr('id');
      $("#textsel").html("Město - " + id);

      let mesto = mesta.find(item => {return item.id == id});
      $('#towninfo').slideUp(1000, function(){$('#towninfo').html(`<h4>Počet obyvatel: ${new Intl.NumberFormat('cs-CS').format(mesto.population)}</h4><hr><p>${mesto.info}</p>`)});
      $('#towninfo').slideToggle(600);
    } else {
      $(this).css({'fill': $("g").attr('fill')});
      lastfill = "rgb(212,0,0)";
    }
  });
});
