/**
 * Clase con las principales constantes que se utilizan en el proyecto
 */
export class MailTemplate {
  static TEMPLATE = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Notificación Ápeiron</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />
      <style>
        html {
          color: #534d4d;
          display: table;
          font-family: Montserrat, sans-serif;
          font-size: 16px;
          height: 100%;
          width: 100%;
        }

        * {
          line-height: 1.75rem;
          margin: 0;
        }

        a,
        a:link,
        a:visited,
        a:hover,
        a:active,
        a:focus {
          color: #a11950;
          cursor: pointer;
          font-weight: bold;
          text-decoration: underline;
        }

        caption {
          display: none;
        }

        @media all and (max-width: 959px) and (min-width: 600px) {
          body {
            font-size: 1rem;
          }
        }

        @media all and (max-width: 599px) and (min-width: 300px) {
          body {
            font-size: 0.938rem;
          }
        }
      </style>
    </head>

    <body style="margin: 0; padding: 0">
      <table style="border-spacing: 0; margin: 0 auto; padding: 0; width: 100%; border-collapse: collapse">
        <caption></caption>
        <tbody>
          <tr>
            <td>
              <table style="background: #002663; color: #fff; width: 100%; font-size: 1.5rem; padding: 2rem; text-align: center">
                <caption></caption>
                <tbody>
                  <tr>
                    <th>Ápeiron <span> · </span> 2024</th>
                  </tr>
                </tbody>
              </table>
              <div style="background: #fff; padding-bottom: 2rem">
                <table style="border-spacing: 0; margin: 0 auto; padding: 0; max-width: 700px; border-collapse: collapse">
                  <caption></caption>
                  <tbody>
                    <tr>
                      <th></th>
                    </tr>
                  <tr>
                      <td style="font-size: 1.125em; padding: 2.5rem 1.25rem 1rem">
                      <!-- apeiron-mail-content -->
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 1rem 1.25rem">
                        <table style="border-spacing: 0; margin: 0 auto; padding: 0; width: 100%; border-collapse: collapse">
                          <caption></caption>
                          <tbody>
                            <tr>
                              <th></th>
                            </tr>
                            <tr style="border-left: 4px solid #b38e5d">
                              <td style="padding-left: 3rem">
                                <span>Saludos cordiales.</span>
                                <p>Atentamente</p>

                                <p style="color: #000; font-weight: bold">Ápeiron tecnology</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
`;
}
