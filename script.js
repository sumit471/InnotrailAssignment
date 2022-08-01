
var items = document.querySelectorAll('#container .box');

function generateRandomColor(){   // function to generate distinct colors
    let maxVal = 0xFFFFFF; 
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

for(let i=0;i<items.length;i++){
    items[i].style.backgroundColor = generateRandomColor();
}


    function handleDragStart(e) {
      this.style.opacity = '0.4';

      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }
  
    function handleDragEnd(e) {
      this.style.opacity = '1';
    }
  
    function handleDragOver(e) {
      e.preventDefault();
      return false;
    }


    function handleDrop(e) {

      e.stopPropagation();

      if(dragSrcEl !== this) 
      {
        dragSrcEl.innerHTML = this.innerHTML;
        var c = dragSrcEl.style.backgroundColor;
        dragSrcEl.style.backgroundColor= this.style.backgroundColor;
        dragSrcEl.style.transition="2s";
        this.style.backgroundColor= c;
        this.innerHTML = e.dataTransfer.getData('text/html');

        last = {
          source : dragSrcEl,
          dest : this
        }

        lastAction.push(last);
      }

  return false;
}
    
    items.forEach(function(item) {   // loop to add event listener to each box
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('drop', handleDrop);
    });  
    
const lastAction = []; // will store the last actions


function undoAction() // function to undo the last action
{
    if( lastAction.length!=0 )
    {
      var data = lastAction[lastAction.length-1].dest.innerHTML;
      lastAction[lastAction.length-1].dest.innerHTML=lastAction[lastAction.length-1].source.innerHTML;
      lastAction[lastAction.length-1].source.innerHTML=data;

      var bg = lastAction[lastAction.length-1].dest.style.backgroundColor;
      lastAction[lastAction.length-1].dest.style.backgroundColor = lastAction[lastAction.length-1].source.style.backgroundColor;
      lastAction[lastAction.length-1].source.style.backgroundColor=bg;

      lastAction.pop();
    }
}


var data = 1000;
var n=3;
function addRow()  //function to add new row
{
  var table = document.getElementById("container");
  var row = table.insertRow(n);
  var cells=[];

  for(var i=0;i<3;i++){
     cells[i] = row.insertCell(i);
  }
 

  cells.forEach(function(cell) {

  cell.innerHTML = '<div draggable="true" class="box"></div>';
  cell.childNodes[0].style.backgroundColor = generateRandomColor();
  cell.childNodes[0].innerHTML = data;
  data+=100;

  cell.childNodes[0].addEventListener('dragstart', handleDragStart);
  cell.childNodes[0].addEventListener('dragover', handleDragOver);     
  cell.childNodes[0].addEventListener('dragend', handleDragEnd);
  cell.childNodes[0].addEventListener('drop', handleDrop);

  })

  
  n++;
}
   