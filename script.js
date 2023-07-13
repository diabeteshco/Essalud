function openModal( modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

function toggleDownloadContainer() {
    var container = document.getElementById('downloadContainer');
    container.classList.toggle('show');
  }

    var registros = [];
  window.addEventListener("DOMContentLoaded",function(){
    var storedRegistros =localStorage.getItem ("registros");
    if (storedRegistros){
        registros =JSON.parse(storedRegistros);
      }
  });

  function submitForm(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores de los campos del formulario
    var establecimiento = document.getElementById("establecimiento").value;
    var historia = document.getElementById("historia").value;
    var tipoDocumento = document.getElementById("tipo-documento").value;
    var tipoDiabetes = document.getElementById("tipo-diabetes").value;
    var documento = document.getElementById("documento").value;
    var apellidoPaterno = document.getElementById("appaterno").value;
    var apellidoMaterno = document.getElementById("apmaterno").value;
    var nombres = document.getElementById("nombres").value;
    var edad = document.getElementById("edad").value;
    var sexo = document.getElementById("sexo").value;

    // Crear un objeto con los datos del formulario
    var formData = {
        establecimiento: establecimiento,
        historia: historia,
        tipoDocumento: tipoDocumento,
        tipoDiabetes: tipoDiabetes,
        documento: documento,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        nombres: nombres,
        edad: edad,
        sexo: sexo
    };

         // Agregar el registro al array de registros
         registros.push(formData);

           // Guardar los registros en el almacenamiento local
        localStorage.setItem("registros", JSON.stringify(registros));

         // Limpiar los campos del formulario
         document.getElementById("registro-form").reset();
        
     }

     function downloadFichas() {
         if (registros.length === 0) {
             alert("No hay registros para descargar.");
             return;
         }

         // Convertir los registros en un arreglo de filas para el archivo Excel
         var rows = [["Establecimiento de Salud", "Nro Historia Clinica", "Tipo de Documento", "Tipo de Diabetes", "Documento", "Apellido Paterno", "Apellido Materno", "Nombres", "Edad", "Sexo"]];

         registros.forEach(function (registro) {
             var row = [
                 registro.establecimiento,
                 registro.historia,
                 registro.tipoDocumento,
                 registro.tipoDiabetes,
                 registro.documento,
                 registro.apellidoPaterno,
                 registro.apellidoMaterno,
                 registro.nombres,
                 registro.edad,
                 registro.sexo
             ];
             rows.push(row);
         });

         // Crear un nuevo libro de Excel
         var workbook = XLSX.utils.book_new();

         // Crear una nueva hoja en el libro de Excel
         var worksheet = XLSX.utils.aoa_to_sheet(rows);

         // Agregar la hoja al libro de Excel
         XLSX.utils.book_append_sheet(workbook, worksheet, "Registro de Fichas");

         // Generar el archivo Excel
         var excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

         // Convertir el archivo Excel en un objeto Blob
         var blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

         // Crear un enlace de descarga y simular el clic para descargar el archivo
         var link = document.createElement("a");
         link.href = URL.createObjectURL(blob);
         link.download = "registro_fichas.xlsx";
         link.click();
     }


// Función para mostrar el reporte por Edad
function mostrarReporteEdad() {
    // Obtener los datos para el reporte por Edad
    var datosEdad = obtenerDatosEdad();

    // Mostrar el gráfico de barras con los datos de Edad
    mostrarGraficoBarras(datosEdad,"grafico-container");
}

// Función para mostrar el reporte por Sexo
function mostrarReporteSexo() {
    // Obtener los datos para el reporte por Sexo
    var datosSexo = obtenerDatosSexo();

    // Mostrar el gráfico de pastel con los datos de Sexo
    mostrarGraficoPastel(datosSexo, "grafico-container2");
}

// Función para mostrar el reporte por Tipo de Diabetes
function mostrarReporteTipoDiabetes() {
    // Obtener los datos para el reporte por Tipo de Diabetes
    var datosDiabetes = obtenerDatosTipoDiabetes();

    // Mostrar el segundo gráfico de barras con los datos de Tipo de Diabetes
    mostrarSegundoGraficoBarras(datosDiabetes, "grafico-container3");
}

// Función para obtener los datos para el reporte por Edad
function obtenerDatosEdad() {
    // Obtener las edades de los registros
    var edades = registros.map(function (registro) {
        return registro.edad;
    });

    // Realizar el conteo de las edades
    var conteoEdades = {};
    edades.forEach(function (edad) {
        if (conteoEdades[edad]) {
            conteoEdades[edad]++;
        } else {
            conteoEdades[edad] = 1;
        }
    });

    // Retornar los datos de Edad
    return conteoEdades;
}

// Función para obtener los datos para el reporte por Sexo
function obtenerDatosSexo() {
    // Obtener los sexos de los registros
    var sexos = registros.map(function (registro) {
        return registro.sexo;
    });

    // Realizar el conteo de los sexos
    var conteoSexos = {};
    sexos.forEach(function (sexo) {
        if (conteoSexos[sexo]) {
            conteoSexos[sexo]++;
        } else {
            conteoSexos[sexo] = 1;
        }
    });

    // Retornar los datos de Sexo
    return conteoSexos;
}

// Función para obtener los datos para el reporte por Tipo de Diabetes
function obtenerDatosTipoDiabetes() {
    // Aquí debes adaptar la lógica para obtener los datos de Tipo de Diabetes desde tus registros.
    var datosDiabetes = {
        'Tipo 1': 0,
        'Tipo 2': 0,
        'Gestacional': 0
      };
    
      registros.forEach(function (registro) {
        var tipoDiabetes = registro.tipoDiabetes;
        if (tipoDiabetes === 'Tipo 1') {
          datosDiabetes['Tipo 1']++;
        } else if (tipoDiabetes === 'Tipo 2') {
          datosDiabetes['Tipo 2']++;
        } else if (tipoDiabetes === 'Gestacional') {
          datosDiabetes['Gestacional']++;
        }
      });
    
      return datosDiabetes;
}

// Función para mostrar un gráfico de barras
function mostrarGraficoBarras(datos) {
  
    // Obtener el contexto del lienzo del gráfico
    var canvas = document.getElementById("grafico-container");
    var ctx = canvas.getContext("2d");

    // Crear los datos para el gráfico de barras
    var etiquetas = Object.keys(datos);
    var valores = Object.values(datos);

    // Crear el gráfico de barras utilizando Chart.js
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Cantidad",
                data: valores,
                backgroundColor: "rgba(75, 192, 192, 0.8)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para mostrar un gráfico de pastel
function mostrarGraficoPastel(datos) {
    // Aquí puedes utilizar una biblioteca de gráficos como Chart.js o Google Charts para mostrar el gráfico de pastel.
    // A continuación, se proporciona un ejemplo básico utilizando la biblioteca Chart.js:

    // Obtener el contexto del lienzo del gráfico
    var canvas = document.getElementById("grafico-container2");
    var ctx = canvas.getContext("2d");

    // Crear los datos para el gráfico de pastel
    var etiquetas = Object.keys(datos);
    var valores = Object.values(datos);

    // Crear el gráfico de pastel utilizando Chart.js
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: etiquetas,
            datasets: [{
                data: valores,
                backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Función para mostrar el segundo gráfico de barras
function mostrarSegundoGraficoBarras(datos) {
      // Obtener el contexto del lienzo del gráfico
  var canvas = document.getElementById("grafico-container3");
  var ctx = canvas.getContext("2d");

  // Crear los datos para el segundo gráfico de barras
  var etiquetas = Object.keys(datos);
  var valores = Object.values(datos);

  // Crear el segundo gráfico de barras utilizando Chart.js
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [
        {
          label: "Cantidad",
          data: valores,
          backgroundColor: "rgba(75, 192, 192, 0.8)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function mostrarReportes() {
    var reporteEdadContainer = document.getElementById("reportes-container");
    reporteEdadContainer.style.display = "block";
    
    var reporteSexoContainer = document.getElementById("reportes-container2");
    reporteSexoContainer.style.display = "block";
    
    var reporteDiabetesContainer = document.getElementById("reportes-container3");
    reporteDiabetesContainer.style.display = "block";
  }
  
 
  
  function ocultarReportes() {

    var reporteEdadContainer = document.getElementById("reportes-container");
    reporteEdadContainer.style.display = "none";
    
    var reporteSexoContainer = document.getElementById("reportes-container1");
    reporteSexoContainer.style.display = "none";
    
    var reporteDiabetesContainer = document.getElementById("reportes-container3");
    reporteDiabetesContainer.style.display = "none";
  }
  
  function toggleSubmenu() {
    var submenu = document.getElementById("normatividad");
    submenu.classList.toggle("show");
  }


  

