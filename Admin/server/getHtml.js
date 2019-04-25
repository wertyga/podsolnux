export const getHtml = () => {
  return (`
  <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        
        <title>Foto-podsolnux/admin</title>
    
        <link rel="stylesheet" href="/css/admin.css">
        <script src="/admin.js" defer></script>
      </head>
      <body>
  
        <div id="app"></div>
        
    </body>
    </html>`
  )
}