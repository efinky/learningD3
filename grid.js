
var rowCount = 10;
var colCount = 10;
var player1 = true;
var color1 = "000";
var color2 = "FFF"

function gridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 50;
	var height = 50;
	var stat = 0;
	var color = "#fff";
	var click = 0;
	
	// iterate for rows	
	for (var row = 0; row < rowCount; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < colCount; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				stat: stat,
				color: color,
				click: click
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}
var gridData = gridData();	
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid")
	.append("svg")
	.attr("width","510px")
	.attr("height","510px");
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	
/* var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", "#fff" )
	.style("stroke", "#222")
	.on('click', function(d) {
       d.click ++;
       if ((d.click)%2 == 0 ) { d3.select(this).style("fill","#fff"); }
	   if ((d.click)%2 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
    }); */
	
function update() {
	var rect = row.selectAll(".square")
		.data(function(d) { return d; })
		rect.enter().append("rect")
			.attr("class", "square")
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; })
			.attr("width", function(d) { return d.width; })
			.attr("height", function(d) { return d.height; })
			.style("fill", function(d) {return d.color; })
			.style("stroke", "#222")
			.style("opacity", 1e-6);
		rect.transition()
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; })
			.attr("width", function(d) { return d.width; })
			.attr("height", function(d) { return d.height; })
			.style("fill", function(d) {return d.color; })
			.style("opacity", 1);
		rect.exit().transition()
			.style("opacity", 1e-6)
			.remove();
}

function updateSquare(square) {
	console.log("test");
	var test = d3.selectAll(".square")
	.data(gridData)
	.enter()
	.append('black')
	.filter(function (s) { return s.x === square.x && s.y === square.y;})
	.transition()
	.style("fill", "#2C93E8" );
	console.log("test2");
}
function firstTurn() {
	gridData[2][2].color = "fe1";
	gridData[2][2].stat = 1;
	gridData[rowCount-3][colCount-3].color = "fe1";
	gridData[rowCount-3][colCount-3].stat = 1;
	update();
}
firstTurn();
setInterval(nextTurn, 1000);

function nextTurn() {
	x = Math.floor(Math.random() * rowCount);
	y = Math.floor(Math.random() * rowCount);
	if (true) {//(player1) {
		if (gridData[x][y].stat == 0)
		{
			gridData[x][y].color = color1;
			gridData[x][y].stat = 1;
		}
		else 
		{
			gridData[x][y].color = color1;
			gridData[x][y].stat = 0;
		}
		update();
	}
	
	plaery1=!player1;
}