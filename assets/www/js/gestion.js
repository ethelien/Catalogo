/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//VARIABLES
 var linkLocation;
 var id;
 var nombre;
 var descri;
 var precio;
 var imagen;
 var par=0;
 var div_siguiente=0;
 //Envio_Datos
 var $id;
 var $nombre;
 var $descripcion;
 var $imagen;
 
 
 
 $(document).ready(function() {
	 
	 $('button.adelante').click(function () {

		 div_siguiente++;
		 
		 if(div_siguiente<5){
			 $('#base').scrollTo('#item'+div_siguiente,1000);
		 	 return false;
		 }
		 
		 else div_siguiente=4;
		 
	 });
	 
	 $('button.atras').click(function () {

		 div_siguiente--;
		 if(div_siguiente>=0){
			 $('#base').scrollTo('#item'+div_siguiente,1000);
			 return false;
		 }
		 
		 else div_siguiente=0;
		 
	 });
	 
     document.addEventListener("deviceready", function() {console.log("PhoneGap initialized.")}, false);    

	 });
 

	 
 //FUNCIONES   
   /* $(document).ready(function() {
      //  $("body").css("display", "none");
        
        $("input").click(function() {
        	$("#zona").css("display", "none");
    	});
    	
    	$("input").blur(function() {
        	$("#zona").css("display", "inline");
    	});*/
         
    //})
   
    function onBodyLoad() {   	
		obtenerDatos();
		//$("body").fadeIn('slow');	
    }
    
    function addNewRow()
    {
      // obtenemos acceso a la tabla por su ID
      var TABLE = document.getElementById("listado");
      // obtenemos acceso a la fila maestra por su ID
      var TROW = document.getElementById("fila");
      // tomamos la celda
      var content = TROW.getElementsByTagName("td");
      // creamos una nueva fila
      var newRow = TABLE.insertRow(-1);
      newRow.className = TROW.attributes['class'].value;
      
      var newCell = newRow.insertCell(newRow.cells.length);
      var newCell2 = newRow.insertCell(newRow.cells.length);
      var newCell3 = newRow.insertCell(newRow.cells.length);
      var newCell4 = newRow.insertCell(newRow.cells.length);
      var newCell5 = newRow.insertCell(newRow.cells.length);
      var newCell6 = newRow.insertCell(newRow.cells.length);


      newCell.className = 'nombre';
      newCell2.className = 'descripcion';
      newCell3.className = 'precio';
      newCell4.className = 'imagen';
      newCell5.className = 'modificar';
      newCell6.className = 'borarr';

     
      // y lo asignamos a la celda
      newCell.innerHTML = "<input id=nombre"+id+" name='nombre' type='text'  value="+nombre+">";
      newCell2.innerHTML = "<textarea id=descripcion"+id+" name='descripcion' cols='40' type='text' value="+descri+"";
      newCell3.innerHTML = "<input id=precio"+id+" name='precio' type='text' value="+precio+">";
      newCell4.innerHTML = "<input id=imagen"+id+" name='imagen' type='text' value="+imagen+">";
      newCell5.innerHTML = "<input type='button' value='Modificar' onclick='Modificar("+id+")'/>";
      newCell6.innerHTML = "<input type='button' value='Borrar' onclick='Borrar("+id+")'/>";

      
      newRow.idName=id;
      //newRow.onclick=function(){Cargar_valores(newRow.idName);}
    }
    
    function addEmptyRow()
    {
      // obtenemos acceso a la tabla por su ID
      var TABLE = document.getElementById("listado");
      // obtenemos acceso a la fila maestra por su ID
      var TROW = document.getElementById("fila");
      // tomamos la celda
      var content = TROW.getElementsByTagName("td");
      // creamos una nueva fila
      var newRow = TABLE.insertRow(-1);
      newRow.className = TROW.attributes['class'].value;
      
      var newCell = newRow.insertCell(newRow.cells.length);
      var newCell2 = newRow.insertCell(newRow.cells.length);
      var newCell3 = newRow.insertCell(newRow.cells.length);
      var newCell4 = newRow.insertCell(newRow.cells.length);
      var newCell5 = newRow.insertCell(newRow.cells.length);
      var newCell6 = newRow.insertCell(newRow.cells.length);


      newCell.className = 'nombre';
      newCell2.className = 'descripcion';
      newCell3.className = 'precio';
      newCell4.className = 'imagen';
      newCell5.className = 'añadir';
      newCell6.className = 'borarr';

     
      // y lo asignamos a la celda
      newCell.innerHTML = "<input id='nombre' name='nombre' type='text'  value=''>";
      newCell2.innerHTML = "<textarea id='descripcion' name='descripcion' cols='40' type='text' value=''>";
      newCell3.innerHTML = "<input id='precio' name='precio' type='text' value=''>";
      newCell4.innerHTML = "<input id='imagen' name='imagen' type='text' value=''>";
      newCell5.innerHTML = "<input type='button' value='Añadir' onclick='Añadir()'/>";

      
      //newRow.idName=id;
      //newRow.onclick=function(){Cargar_valores(newRow.idName);}
    }
    
    
    function Modificar(id,nombre,descri,precio,imagen){
    	$id=id;
    	$nombre=document.getElementById('nombre'+id).value;
    	$descripcion=document.getElementById('descripcion'+id).value;
    	$precio=document.getElementById('precio'+id).value;
    	$imagen=document.getElementById('imagen'+id).value;
    	
    	modificarDatos();
    }
    
    function Borrar(id){
    	$id=id;
    	borrarDatos();
    }
    
    function Añadir(){
    	$nombre=document.getElementById('nombre').value;
    	$descripcion=document.getElementById('descripcion').value;
    	$precio=document.getElementById('precio').value;
    	$imagen=document.getElementById('imagen').value;

    	guardarDatos();
    }
    
    
    function guardarDatos() {
        
        $.ajax({
            url: 'http://localhost/catalogo/tablas.php?tipo=2&nombre='+$nombre+"&descripcion="+$descripcion+"&precio="+$precio+"&imagen="+$imagen,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                window.location.reload()            },
            error: function(){
            }
        });
    }
    
    function borrarDatos() {
        
        $.ajax({
            url: 'http://localhost/catalogo/tablas.php?tipo=1&id='+$id,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                window.location.reload()            },
            error: function(){
            }
        });
    }
    
    function modificarDatos() {
    	
        $.ajax({
            url: 'http://localhost/catalogo/tablas.php?tipo=3&id='+$id+"&nombre="+$nombre+"&descripcion="+$descripcion+"&precio="+$precio+"&imagen="+$imagen,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                window.location.reload()            },
            error: function(){
            }
        });
    }
       
    function obtenerDatos() {
        
        $.ajax({
            url: 'http://localhost/catalogo/tablas.php?tipo=0',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                $.each(data, function(i,item){	              	  
              	  	var celda = document.getElementById(i);
              	  	id = item.id;
              	  	nombre = item.nombre;
              	  	descri = '<a>'+item.descripcion;
              	  	precio = item.precio;
              	  	imagen = item.imagen;
              	  	addNewRow();
                });
          	  	addEmptyRow();
            },
            error: function(){
            }
        });
    }
    
    function Cargar_valores(id_elemento){
    	
        $.ajax({
            url: 'http://localhost/catalogo/atributos.php?busqueda='+id_elemento,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                $.each(data, function(i,item){	     
                	//document.getElementById('imagen2').className = "visible"
                	//document.getElementById('imagen1').className = "visible"
                	document.getElementById('imagen1').className = 'ocultar';
               	
                	setTimeout(function(){document.getElementById('img').innerHTML = "<img id='imagen1' class='novisible' src=./img/"+item.imagen+" height='280' width='280'>";},500);
              	  	document.getElementById('text').innerHTML = "<h3>"+item.descripcion+"</h3>";
              	  	document.getElementById('precio').innerHTML = "<h4>"+"Precio: "+item.precio+" €"+"</h4>";

     	  	
                	setTimeout(function(){document.getElementById('imagen1').className = 'visible'},600);
              	  	//descri = item.descripcion;
              	  	//precio = item.precio;
                });
            },
            error: function(){
            }
        });
    }
    
    
	function zonaeventos(i){
		event.preventDefault();
        linkLocation = "html/evento.html?Evento="+i;
        $("body").fadeOut('slow',redirectPage);     
	}
	
    function redirectPage() {
		window.location = linkLocation;
	}	