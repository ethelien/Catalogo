/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//VARIABLES
 var linkLocation;
 var user_id = localStorage.getItem("user_id");
 var pass = localStorage.getItem("pass");

 //FUNCIONES   
    $(document).ready(function() {
        $("body").css("display", "none");
        
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
		$("body").fadeIn('slow');	
    }
    
    
    function addNewRow()
    {
      // obtenemos acceso a la tabla por su ID
      var TABLE = document.getElementById("bandas");
      // obtenemos acceso a la fila maestra por su ID
      var TROW = document.getElementById("fila");
      // tomamos la celda
      var content = TROW.getElementsByTagName("td");
      // creamos una nueva fila
      var newRow = TABLE.insertRow(-1);
      newRow.className = TROW.attributes['class'].value;
      
      if(par=='1'){
      	newRow.style.background = "#D0D0D0";
      	par--;
      }
      
      else
      	par++;
      	
      // creamos una nueva celda
      var newCell = newRow.insertCell(newRow.cells.length);
      var newCell2 = newRow.insertCell(newRow.cells.length);

      newCell.className = 'nombres';
      newCell2.className = 'logo';
     
      // y lo asignamos a la celda
      newCell.innerHTML = landmark;
      newCell2.innerHTML = "<img src="+cabecera+" height='64' width='64'>"
      	  
      newRow.idName=id;
      newRow.onclick=function(){Cargar_Banda(newRow.idName);}

    }
    
    
       
    function obtenerDatos() {
        
        $.ajax({
            url: 'http://158.42.77.115/evento_por_fecha.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type:'get',
            timeout: 5000,
            success: function(data/*, status*/){
                $.each(data, function(i,item){	              	  
              	  	var celda = document.getElementById(i);
              	  	celda.id=item.id;
               	    celda.src='http://test.bandness.com/uploads/images/posters/'+item.picture;
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