<?php
// Verificar si se han enviado los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores del formulario
    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];

    // Validar el usuario y la contraseña (ejemplo)
    if ($usuario == "admin" && $contrasena == "admin123") {
        // Redirigir al usuario a la página de inicio si los datos son correctos
        header("Location: pagina3.html");
        exit;
    } 
    if ($usuario == "kathy" && $contrasena == "123456") {
        // Redirigir al usuario a la página de inicio si los datos son correctos
        header("Location: pagina3.html");
        exit;
    } 
        else {
        // Mostrar un mensaje de error si los datos son incorrectos
        echo "Usuario o contraseña incorrectos";
    }
}



?>
