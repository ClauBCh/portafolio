<?php
// Verifica si el formulario fue enviado mediante POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Aquí iría el procesamiento del formulario
    $nombre = $_POST['name'];
    $email = $_POST['email'];
    $mensaje = $_POST['message'];

    // Puedes hacer algo con estos datos, como enviarlos por correo
    echo "Gracias, $nombre. Hemos recibido tu mensaje.";
} else {
    echo "Por favor, usa el formulario para enviar datos.";
}
?>

<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $token = $_POST['recaptcha_token'];
    $siteKey = '6LcmZ3QqAAAAADWPFON6nq1OI-ZxlcDRmOSK_vMi';
    $expectedAction = 'submit';
    $apiUrl = 'https://recaptchaenterprise.googleapis.com/v1/projects/YOUR_PROJECT_ID/assessments?key=YOUR_API_KEY';

    $data = [
        "event" => [
            "token" => $token,
            "siteKey" => $siteKey,
            "expectedAction" => $expectedAction
        ]
    ];

    $options = [
        "http" => [
            "header" => "Content-Type: application/json\r\n",
            "method" => "POST",
            "content" => json_encode($data)
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents($apiUrl, false, $context);
    $result = json_decode($response, true);

    if ($result['event']['expectedAction'] === $expectedAction && $result['event']['tokenProperties']['valid']) {
        echo "Verificación exitosa. Procesando el formulario...";
        // Procesa el formulario (envío de correo, guardar en base de datos, etc.)
    } else {
        echo "Error de verificación. Inténtalo nuevamente.";
    }
} else {
    echo "Método no permitido.";
}
?>
