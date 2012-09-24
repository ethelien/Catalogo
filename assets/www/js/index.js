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
 //var user_id = localStorage.getItem("user_id");
 //var pass = localStorage.getItem("pass");

 //FUNCIONES   
    $(document).ready(function() {
      //  $("body").css("display", "none");
        
        $("input").click(function() {
        	$("#zona").css("display", "none");
    	});
    	
    	$("input").blur(function() {
        	$("#zona").css("display", "inline");
    	});
         
        document.addEventListener("deviceready", function() {console.log("PhoneGap initialized.")}, false);    
    })
   
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
              	  	document.getElementById('img').innerHTML = "<img id='imagen1' src=./img/"+item.imagen+" height='280' width='280'>"
              	  	document.getElementById('text').innerHTML = "<h3>"+item.descripcion+"</h3>"
              	  	document.getElementById('precio').innerHTML = "<h4>"+item.precio+" €"+"</h4>"

              	  	//descri = item.descripcion;
              	  	//precio = item.precio;
                });
            },
            error: function(){
            }
        });
    }
    
    function continuar(){
	    event.preventDefault();
        linkLocation = "html/bandas.html?tipo=ALL";
        $("body").fadeOut('slow',redirectPage);     
	}	
	
	function zonaprivada(){

		if(user_id!=undefined && pass=='true'){
			event.preventDefault();
        	linkLocation = "html/menu.html?User_id="+user_id;
        	$("body").fadeOut('slow',redirectPage);
		}
		
		else{
			event.preventDefault();
        	linkLocation = "html/login.html";
        	$("body").fadeOut('slow',redirectPage); 
        }   
	}
	
	function zonaeventos(i){
		event.preventDefault();
        linkLocation = "html/evento.html?Evento="+i;
        $("body").fadeOut('slow',redirectPage);     
	}
	
    function redirectPage() {
		window.location = linkLocation;
	}	