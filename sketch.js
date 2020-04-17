var data;
var graph;
var dropdown;
function preload(){
	data = loadJSON('kevinbacon.json');
}

function setup() {
	noCanvas();
	dropdown=createSelect();
	dropdown.changed(bfs);
	/*console.log(data);*/
	var movies=data.movies;
	graph=new Graph();
	for (var i = 0; i <movies.length; i++) {

		var movie=movies[i].title;
		var cast=movies[i].cast;
		var movieNode=new Node(movie);
		graph.addNode(movieNode);

		for (var j = 0; j <cast.length; j++) {

			var actor=cast[j];
			var actorNode=graph.getNode(actor);
			if(actorNode==undefined){
			  actorNode=new Node(actor);
			  dropdown.option(actor);
			}
			graph.addNode(actorNode);
			movieNode.addEdge(actorNode);

		}
	}

}

function bfs(){
	graph.reset();
	var start=graph.setStart(dropdown.value());
	// var start=graph.setEnd("Kevin Bacon");
	var end=graph.setEnd("Mark Ruffalo");
	console.log(graph);


	var queue=[];

	start.searched=true;
	queue.push(start);
	while(queue.length>0){
		var current=queue.shift();
		if(current == end){
			console.log("found "+current.value);
		}

		var edges=current.edges;
		for(var i=0;i<edges.length;i++){
			var neighbor=edges[i];
			if(!neighbor.searched){
				neighbor.searched=true;
				neighbor.parent=current;
				queue.push(neighbor)
			}
		}
	}

	var path=[];

	path.push(end);
	var next = end.parent;
	while(next!=null){
		path.push(next);
		next=next.parent;
	}
	console.log(path);
	var txt='';
	for(var i=path.length-1;i>=0;i--){
		txt+=path[i].value 
		if(i!=0) {
			txt+= '-->'
		};
	}
	createP(txt);
}