function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

function submitForm(event) {
    event.preventDefault();
  
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
  
    // Aquí puedes realizar el procesamiento del formulario
    console.log("Nombre: " + nombre);
    console.log("Edad: " + edad);
  
    closeModal();
}

function submitSeguimientoForm(event) {
    event.preventDefault();
  
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
  
    // Aquí puedes realizar el procesamiento del formulario
    console.log("Nombre: " + nombre);
    console.log("Edad: " + edad);
  
    closeModal();
}


function downloadExcel() {
  // solicitud AJAX para obtener la ruta del archivo Excel
  // y luego descargar usando JavaScript
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'generar_excel.php', true);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    if (this.status === 200) {
      var blob = new Blob([this.response], { type: 'application/vnd.ms-excel' });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'registro_fichas.xlsx';
      link.click();
    }
  };

  xhr.send();
}