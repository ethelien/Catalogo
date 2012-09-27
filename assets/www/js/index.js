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
	 
	 $(window).resize(function () {
		resizePanel();
	 });
	 
     document.addEventListener("deviceready", function() {console.log("PhoneGap initialized.")}, false);    

	 });
 
 	function resizePanel() {
		 width = $(window).width();
		 height = $(window).height();
		 mask_width = width * $('.item').length;
		 $('#debug').html(width + ' ' + height + ' ' + mask_width);
		 $('#base, .item').css({width: width, height: height});
		 $('#mask').css({width: mask_width, height: height});
		 $('#base').scrollTo($('button.atras').attr('#item2'), 0);
	 } 

	 
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
      
      if(par=='1'){
      	newRow.style.background = "#33CCFF";
      	par--;
      }
      
      else
      	par++;
      	     
      newRow.innerHTML = nombre;      	  
      newRow.idName=id;
      
      newRow.onclick=function(){Cargar_valores(newRow.idName);}
    }
    
    
       
    function obtenerDatos() {
        
        $.ajax({
            url: 'http://localhost/catalogo/catalogo.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                $.each(data, function(i,item){	              	  
              	  	var celda = document.getElementById(i);
              	  	id = item.id;
              	  	nombre = '<h4>'+item.nombre+'</h4>';
              	  	
              	  	addNewRow();
                });
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