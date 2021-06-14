// Parameters 
var 
axe = "X", // values can be "X" or "Y"
numberOfSquare = 15, // How many square on the axe
greyMinimum = 210, // Between 0 and 254
greyMaximum = 245, // Between 1 and 255
animMin = 2, // Animation durations (in seconds)
animMax = 8;


// The container in the HTML page
var $tc = $("#trianglesContainer"); 

function createTriangles(){
  let w = $tc.width(), h = $tc.height(), dx;
  let $svg = $('<svg width="'+w+'" height="'+h+'" xmlns="http://www.w3.org/2000/svg">');
  
  // Empty the container (usefull for the page resized calls)
  $tc[0].innerHTML = "";
  
  if(axe = "X")
    dx = w / numberOfSquare;
  else 
    dx = h / numberOfSquare;
  
  
  for(let i = 0; i < w / dx ; i++) {
    for(let j = 0; j < h/dx ; j++) {
      // Random Colors for animation
      let c1 = rdmColor(greyMinimum,greyMaximum);
      let c2 = rdmColor(greyMinimum,greyMaximum);
      
      // Path direction for each triangles in a square
      let d = [];
      // Middle of the current square, to make triangles from a square
      let middleX = (i*dx+dx/2), middleY = (j*dx+dx/2);
      
      // Creating the 4 paths directions
			d.push('M '+i*dx+' '+j*dx+' h '+dx+ ' L '+middleX+' '+middleY);
			d.push('M '+i*dx+' '+(j+1)*dx+' h '+dx+ ' L '+middleX+' '+middleY);
			d.push('M '+i*dx+' '+j*dx+' v '+dx+ ' L '+middleX+' '+middleY);
			d.push('M '+(i+1)*dx+' '+j*dx+' v '+dx+ ' L '+middleX+' '+middleY);
      
      d.forEach(function(val,i){
        // Animate tag
        let a = '<animate attributeName="fill" repeatCount="indefinite" dur="'+rdmInt(animMin,animMax)+'s" values="'+c1+';'+c2+';'+c1+'" />';
        // Adding the animated path to the SVG container
        $svg[0].innerHTML += ('<path d="'+val+'" fill="'+c1+'" stroke="'+c1+'">'+a+'</path>');
      });
      
      // Puttin the SVG container in the HTML page
      $tc.append($svg);
    }
  }
  // For Loops end
  
}



// Random int between min and max
function rdmInt(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

// Random RGB grey between min and max values (from 0 to 255)
function rdmColor(min, max) {
	let color = rdmInt(min,max);
	return 'rgb('+color+','+color+','+color+')';
}

// Create Triangle when the page is loaded
window.onload = createTriangles();

// Recreatee Triangles when the page is resized
$( window ).resize(createTriangles);
