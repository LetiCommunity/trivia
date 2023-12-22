import React, { Fragment } from "react";
import Footer from "./Footer";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <Fragment>
      <div className="content m-5 py-5">
        <h1>Términos y Condiciones</h1>
        <Card className="p-5">
          <small>Actualizado el 22-12-2023</small>
          <h2>Términos generales</h2>
          <p>
            Al acceder y realizar un pedido con Trivia usted confirma que está
            de acuerdo y sujeto a los términos de servicio contenidos en los
            Términos y condiciones que se describen a continuación. Estos
            términos se aplican a todo el sitio web y a cualquier correo
            electrónico u otro tipo de comunicación entre usted y Trivia.
          </p>
          <p>
            Bajo ninguna circunstancia el equipo de Trivia será responsable de
            ningún daño directo, indirecto, especial; incidental o consecuente,
            que incluye, entre otros, la pérdida de datos o ganancias que surjan
            del uso o la incapacidad de usar los materiales de este sitio,
            incluso si el equipo de Trivia o un representante autorizado han
            sido informados de la posibilidad de tales daños. Si su uso de
            materiales de este sitio resulta en la necesidad de servicio,
            reparación o corrección de equipos o datos, usted asume los costos
            de los mismos.
          </p>
          <p>
            Trivia no será responsable de ningún resultado que pueda ocurrir
            durante el curso del uso de nuestros recursos. Nos reservamos el
            derecho de cambiar los precios y revisar la política de uso de
            recursos en cualquier momento.
          </p>
          <h2>Licencia</h2>
          <p>
            Trivia le otorga una licencia revocable, no exclusiva,
            intransferible y limitada para descargar, instalar y usar la
            plataforma estrictamente de acuerdo con los términos de este
            Acuerdo.
          </p>
          <p>
            Estos Términos y condiciones son un contrato entre usted y Trivia
            (referidos en estos Términos y condiciones como "Trivia",
            "nosotros": o "nuestro"), el proveedor del sitio web de Trivia y los
            servicios accesibles desde el sitio web de Trivia (que se denominan
            colectivamente en estos Términos y condiciones como el 'Servicio de
            Trivia").
          </p>
          <p>
            Usted acepta estar sujeto a estos Términos y condiciones. Si no está
            de acuerdo con estos Términos y condiciones, no utilice el Servicio
            de Trivia. En estos Términos y condiciones; "usted" se refiere tanto
            a usted como individuo como a la entidad que representa. Si viola
            cualquiera de estos Términos y condiciones, nos reservamos el
            derecho de cancelar su cuenta o bloquear el acceso a su cuenta sin
            previo aviso.
          </p>
          <h2>Definiciones y términos clave</h2>
          <p>
            Para ayudar a explicar las cosas de la manera más clara posible en
            estos Términos y Condiciones; cada vez que se hace referencia a
            cualquiera de estos términos se definen estrictamente como:
          </p>
          <ul>
            <li>
              <p>
                Cookie: pequeña cantidad de datos generados por un sitio web y
                guardados por su navegador web. Se utiliza para identificar su
                navegador: proporcionar análisis, recordar información sobre
                usted, como su preferencia de idioma o información de inicio de
                sesión.
              </p>
            </li>
            <li>
              <p>
                Compañía: cuando estos términos mencionan "Compañía" y,
                "nosotros", "nos" o "nuestro", se refiere a Trivia, que es
                responsable de su información en virtud de estos Términos y
                Condiciones.
              </p>
            </li>
            <li>
              <p>
                Plataforma: sitio web de Internet; aplicación web o aplicación
                digital de cara al público de Trivia. País: donde se encuentra
                Trivia o los propietarios / fundadores de Trivia en este caso es
                Guinea Ecuatorial.
              </p>
            </li>
            <li>
              <p>
                País: donde se encuentra Trivia o los propietarios / fundadores
                de Trivia en este caso es Guinea Ecuatorial.
              </p>
            </li>
            <li>
              <p>
                Dispositivo: cualquier dispositivo conectado a Internet, como un
                teléfono, tablet, computadora o cualquier otro dispositivo que
                se pueda usar para visitar Trivia y usar los servicios de
                Trivia.
              </p>
            </li>
            <li>
              <p>
                Servicio: se refiere al servicio brindado por Trivia como se
                describe en los términos relativos (si están disponibles) y en
                esta plataforma.
              </p>
            </li>
            <li>
              <p>
                Terceros: se refiere a anunciantes. patrocinadores de concursos,
                socios promocionales y de marketing y otros que brindan nuestro
                contenido o cuyos productos o servicios que creemos que pueden
                interesarle.
              </p>
            </li>
            <li>
              <p>
                Sitio web: el sitio de Trivia al que se puede acceder a través
                de esta URL{" "}
                <Link
                  to={{ pathname: "/home" }}
                  className="text-info text_decoration_a"
                >
                  app.trivi4.com
                </Link>
                .
              </p>
            </li>
            <li>
              <p>
                Usted: una persona o entidad que está registrada con Trivia para
                utilizar los Servicios.
              </p>
            </li>
            <li>
              <p>
                Dispositivo: cualquier dispositivo conectado a Internet, como un
                teléfono, tablet, computadora o cualquier otro dispositivo que
                se pueda usar para visitar Trivia y usar los servicios de
                Trivia.
              </p>
            </li>
            <li>
              <p>
                Dispositivo: cualquier dispositivo conectado a Internet, como un
                teléfono, tablet, computadora o cualquier otro dispositivo que
                se pueda usar para visitar Trivia y usar los servicios de
                Trivia.
              </p>
            </li>
          </ul>
          <h2>Restricciones</h2>
          <p>Usted acepta no hacerlo y no permitirá a otros.</p>
          <ul>
            <li>
              <p>
                Licenciar, vender: alquilar; arrendar, asignar; distribuir:
                transmitir, alojar, subcontratar: divulgar o explotar
                comercialmente la plataforma o poner la plataforma a disposición
                de terceros.
              </p>
            </li>
            <li>
              <p>
                Modificar, realizar trabajos derivados, desensamblar, descifrar,
                realzar una compilación inversa o realizar ingeniería inversa de
                cualquier parte de la plataforma
              </p>
            </li>
            <li>
              <p>
                Eliminar: alterar u ocultar cualquier aviso de propiedad
                (incluido cualquier aviso de derechos de autor o marca
                registrada) de sus afiliados, socios, proveedores o
                licenciatanos de la plataforma.
              </p>
            </li>
          </ul>
          <h2>Política de Devolución y Reembolso</h2>
          <p>
            Gracias por usar los servicios de Trivia. Apreciamos el hecho de que
            le guste nuestros. También queremos asegurarnos de que tenga una
            experiencia gratificante mientras explora, evalúa y usa nuestros
            servicios.
          </p>
          <p>
            Al igual que con cualquier experiencia al usar servicios, existen
            términos y condiciones que se aplican a las transacciones en Trivia.
            Seremos tan breves como lo permitan nuestros abogados. Lo principal
            que debe recordar es que al publicar un paquete o viaje en Trivia,
            acepta los términos junto con la{" "}
            <Link
              to={{ pathname: "/terms" }}
              className="text-info text_decoration_a"
            >
              Politica de privacidad
            </Link>{" "}
            de Trivia.
          </p>
          <p>
            Si por alguna razón no está completamente satisfecho con algún bien
            o servicio que le brindamos no dude en contactarnos y discutiremos
            cualquiera de los problemas que esté atravesando con nuestro
            servicio.
          </p>
          <h2>Tus sugerencias</h2>
          <p>
            Cualquier, comentario, idea; mejora o sugerencia (colectivamente,
            "Sugerencias') que usted proporcione a Trivia con respecto a la
            plataforma seguirá siendo propiedad única y exclusiva de Trivia.
          </p>
          <p>
            Trivia tendrá la libertad de usar; copiar, modificar, publicar o
            redistribuir las Sugerencias para cualquier propósito y de cualquier
            manera sin ningún crédito o compensación para usted.
          </p>
          <h2>Tu consentimiento</h2>
          <p>
            Hemos actualizado nuestros Términos y condiciones para brindarle
            total transparencia sobre lo que se establece cuando visita nuestro
            sitio y cómo se utiliza. Al utilizar nuestra plataforma; registrar
            una cuenta o publicar un paquete o viaje, por la presente acepta
            nuestros Términos y condiciones.
          </p>
          <h2>Enlaces a otros Sitios Web </h2>
          <p>
            Estos Términos y Condiciones se aplican solo a los Servicios. Los
            Servicios pueden contener enlaces a otros sitios web que Trivia no
            opera ni controla. No somos responsables por el contenido; la
            precisión o las opiniones expresadas en dichos sitios web, y dichos
            sitios web no son investigados, monitoreados o verificados por
            nuestra precisión o integridad. Recuerde que cuando utiliza un
            enlace para ir de los Servicios a otro sitio web nuestros Términos y
            condiciones dejan de estar vigentes. Su navegación e interacción en
            cualquier otro sitio web incluidos aquellos que tienen un enlace en
            nuestra plataforma están sujetos a las propias reglas y políticas de
            ese sitio web. Dichos terceros pueden utilizar sus propias cookies u
            otros métodos para recopilar información sobre usted.
          </p>
          <h2>Cookies</h2>
          <p>
            Trivia utiliza 'cookies' para identificar las áreas de nuestro sitio
            web que ha visitado. Una cookie es una pequeña porción de datos que
            su navegador web almacena en su computadora o dispositivo móvil.
            Usamos cookies para mejorar el rendimiento y la funcionalidad de
            nuestra plataforma, pero no son esenciales para su uso. Sin embargo,
            sin estas cookies, es posible que ciertas funciones, no estén
            disponibles o se le solicitará que ingrese sus datos de inicio de
            sesión cada vez que visite la plataforma, ya que no podríamos
            recordar que había iniciado sesión anteriormente. La mayoría de los
            navegadores web se pueden configurar para desactivar el uso de
            cookies. Sin embargo, si desactiva las cookies, es posible que no
            pueda acceder a la funcionalidad de nuestro sitio web correctamente
            o en absoluto. Nunca colocamos información de identificación
            personal en cookles.
          </p>
          <h2>Cambios en nuestros Términos y Condiciones</h2>
          <p>
            Usted reconoce y acepta que Trivia puede dejar de brindarle (de
            forma permanente o temporal) el Servicio (o cualquier función dentro
            del Servicio) a usted o a los usuarios en general, a discreción
            exclusiva de Trivia; sin previo aviso. Puede dejar de utilizar el
            Servicio en cualquier momento. No es necesario que informe
            específicamente a Trivia cuando deje de usar el Servicio. Usted
            reconoce y acepta que si Trivia deshabilita el acceso a su cuenta,
            es posible que no pueda acceder al Servicio. Los detalles de su
            cuenta o cualquier archivo u otro material contenido en su cuenta
          </p>
          <p>
            Si decidimos cambiar nuestros Términos y condiciones; publicaremos
            esos cambios en esta página y / o actualizaremos la fecha de
            modificación de los Términos y condiciones a continuación.
          </p>
          <h2>Modificaciones a nuestra plataforma</h2>
          <p>
            Trivia se reserva el derecho de modificar, suspender o interrumpir,
            temporal o permanentemente, la plataforma o cualquier servicio al
            que se conecte con o sin previo aviso y sin responsabilidad ante
            usted.
          </p>
          <h2>Actualizaciones a nuestra plataforma</h2>
          <p>
            Trivia puede, de vez en cuando, proporcionar mejoras a las
            características y funcionalidad de la plataforma que pueden incluir
            parches, corrección de errores, actualizaciones, mejoras y otras
            modificaciones ("Actualizaciones").
          </p>
          <p>
            Las actualizaciones pueden modificar o eliminar ciertas
            características y / o funcionalidades de la plataforma. Usted acepta
            que Trivia no tiene la obligación de (I) proporcionar
            Actualizaciones; o (II) continuar proporcionándole o habilitando
            características y / o funcionalidades particulares de la plataforma.
          </p>
          <p>
            Además; acepta que todas las Actualizaciones (I) se considerarán una
            parte integral de la plataforma y (II) estarán sujetas a los
            términos y condiciones de este Acuerdo
          </p>
          <h2>Servicios de Terceros</h2>
          <p>
            Podemos mostrar, incluir o poner a disposición contenido de terceros
            (incluidos datos e información, aplicaciones y otros servicios) o
            proporcionar enlaces a sitios web o servicias de terceros
            ("Servicios de terceros").
          </p>
          <p>
            Usted reconoce y acepta que Trivia no será responsable de ningún
            Servicio de terceros; incluida su precisión, integridad;
            puntualidad, validez, cumplimiento de los derechos de autor,
            legalidad, decencia, calidad o cualquier otro aspecto de los mismos.
          </p>
          <p>
            Trivia no asume ni tendrá ninguna obligación o responsabilidad ante
            usted o cualquier otra persona o entidad por los Servicios de
            terceros.
          </p>
          <p>
            Los Servicios de terceros y los enlaces a las mismos se brindan
            únicamente para su conveniencia y usted accede a ellos y los usa
            completamente bajo su propio riesgo y sujeto a los términos y
            condiciones de dichos terceros.
          </p>
          <h2>Duración y Terminación</h2>
          <p>
            Este Acuerdo permanecerá en vigor hasta que usted o Trivia lo
            rescindan.
          </p>
          <p>
            Trivia puede, a su entera discreción, en cualquier momento y por
            cualquier motivo o sin él; suspender o rescindir este Acuerdo con o
            sin previo aviso
          </p>
          <p>
            Este Acuerdo terminará inmediatamente sin previo aviso de Trivia en
            caso de que no cumpla con alguna de las disposiciones de este
            Acuerdo. También puede rescindir este Acuerdo eliminando la
            plataforma y todas las copias del mismo de su computadora.
          </p>
          <p>
            Tras la rescisión de este Acuerdo deberá dejar de utilizar la
            plataforma y eliminar todas las copias de la plataforma de su
            computadora.
          </p>
          <p>
            La rescisión de este Acuerdo no limitará ninguno de los derechos o
            recursos de Trivia por ley o en equidad en caso de incumplimiento
            por su parte (durante la vigencia de este Acuerdo) de cualquiera de
            sus obligaciones en virtud del presente Acuerdo.
          </p>
        </Card>
        {/* <p>
          Duración y Terminación Este Acuerdo permanecerá en vigor hasta que
          usted o Trivia lo rescindan. Trivia puede, a su entera discreción, en
          cualquier momento y por cualquier motivo o sin él: suspender o
          rescindir este Acuerdo con o sin previo aviso Este Acuerdo terminará
          inmediatamente, sin previo aviso de presupuesto, en caso de que no
          cumpla con alguna de las disposiciones de este Acuerdo_ También puede
          rescindir este Acuerdo eliminando la plataforma y todas las copias del
          mismo de su computadora. Tras la rescisión de este Acuerdo, deberá
          dejar de utilizar la plataforma y eliminar todas las copias de la
          plataforma de su computadora La rescisión de este Acuerdo no limitará
          ninguno de los derechos o recursos de presupuesto por ley o en equidad
          en caso de incumplimiento por su parte (durante la vigencia de este
          Acuerdo) de cualquiera de sus obligaciones en virtud del presente
          Acuerdo. Aviso de infracción de Derechos de Autor Si usted es
          propietario de los derechos de autor o el agente de dicho propietano y
          cree que cualquier material de nuestra plataforma constituye una
          infracción de sus derechos de autor, comuníquese con nosotros y
          proporcione la siguiente información: (a) una firma fisca o
          electrónica del propietario de los derechos de autor o una persona
          autorizada para actuar en su nombre; (b) identificación del material
          que se alega infringe; (c) su información de contacto, incluida su
          dirección, número de teléfono y un correo electrónico; Cd) una
          declaración suya de que cree de buena fe que el uso del material no
          está autorizado por los propietarios de los derechos de autor; y (e)
          la declaración de que la información en la notificación es precisa y,
          bajo pena de perjurio, usted está autorizado a actuar en nombre del
          propietano. Indemnización Usted acepta indemnizar y eximir de
          responsabilidad a presupuesto y a sus empresas matrices. subsidiarias,
          afiliadas funcionarios empleados, agentes, socios y otorgantes de
          licencias (si corresponde) de cualquier reclamo o demanda, incluidos
          los honorarios razonables de abogados, debido a que surja de su: (a)
          uso de la plataforma (b) violación de este Acuerdo o cualquier ley o
          reglamento; o (c) violación de cualquier derecho de un tercero. Sin
          garantías La plataforma se le proporciona "TAL CUAL" y "SEGÚN
          DISPONIBILIDAD" y con todas las fallas y defectos sin garantía de
          ningún tipo. En la medida máxima permitida por la ley aplicable,
          presupuesto; en su propio nombre y en nombre de sus afiliados y sus
          respectivos licenciantes y proveedores de servicios; renuncia
          expresamente a todas las garantfasv ya sean expresas: implícitasv
          legales o de otro tipo] con con respecto a la plataformal incluidas
          todas las garantras implícitas de comerciabilidad idoneidad para un
          propóswto particular, titulo y no infracción, y garantías que puedan
          surgir del curso del trato; el curso del desempeño, el uso o la
          práctica comercial. Sin limitación a lo anterior, presupuesto no
          ofrece garantia ni compromiso, y no hace ninguna representación de
          ningún tipo de que la plataforma cumplirá con sus requisitos: logrará
          los resultados previstos, será compatible o funcionará con cualquier
          otro software, sitios web: sistemas o servicios: operen sin
          interrupciones, cumplan con los estándares de rendimiento o
          confiabilidad o que no tengan errares o que cualquier error o defecto
          puede o será corregido. Sin limitar lo anterior; ni presupuesto ni
          ningún proveedor de presupuesto hace ninguna representación o garantía
          de ningún tipo, expresa o implícita (i) en cuanto al funcionamiento o
          disponibilidad de la plataforma, o la informacidnv contenido y
          materiales o productos incluidos en el mismo; (ji) que la plataforma
          será ininterrumpida o libre de errores; (iii) en cuanto a la
          precisión, confiabilidad o vigencia de cualquier información o
          contenido proporcionado a través de la plataforma; o Civ) que la
          plataforma, sus servidores; el contenido o los correos electrónicos
          enviados desde o en nombre de presupuesto están libres de virus,
          scripts, troyanos, gusanosv malware, bambas de tiempo u otros
          componentes nocivos. Algunas jurisdicciones no permiten la exclusión o
          las limitaciones de las garantfas implícitas o las limitaciones de los
          derechos legales aplicables de un consumidor, por lo que algunas o
          todas las exclusiones y Imitaciones anteriores pueden no aplicarse en
          su caso Limitación de Responsabilidad Sin perjuicio de los daños en
          los que pueda incurri% la responsabilidad total de presupuesto y
          cualquiera de sus proveedores en virtud de cualquier disposición de
          este Acuerdo y su recurso exclusivo por todo lo anterior se limitará
          al monto realmente pagado por usted para la plataforma. En la máxima
          medida permitida por la ley aplicable, en ningún caso presupuesto o
          sus proveedores serán responsables de ningún daño especial,
          incidental, indirecto o consecuente de ningún tipo (incluidos, entre
          otros, daños por lucro cesante, por pérdida de datos u otra
          información; por interrupción del negocio: por lesiones personales,
          por la pérdida de privacidad que surja de alguna manera relacionada
          con el uso o la imposibilidad de usar la plataforma, software de
          terceros y I o - hardware de terceros utilizado con la plataforma; o
          de otro modo en relación con cualquier disposición de este Acuerdo),
          incluso si presupuesto o cualquier proveedor ha sido informado de la
          posibilidad de tales daños e inclusa si el recurso no cumple con su
          propósito esencial. Algunos estados / jurisdicciones no permiten la
          exclusión o limitación de daños incidentales o consecuentes, por lo
          que es posible que la limitación o exclusión anterior no se aplique en
          su caso. Divisibilidad Si alguna disposición de este Acuerdo se
          considera inaplicable o inválida, dicha disposición se cambiará e
          interpretará para lograr los objetivos de dicha disposición en la
          mayor medida posible según la ley aplicable y las disposiciones
          restantes continuarán en pleno vigor y efecto Este Acuerdo, junto con
          la Política de privacidad y cualquier otro aviso legal publicado por
          presupuesto en los Servicios; constituirá el acuerdo completo entre
          usted y presupuesto con respecto a los Servicios Si alguna disposición
          de este Acuerdo es considerada inválida por un tribunal de
          jurisdicción competente, la invalidez de dicha disposición no afectará
          la validez de las disposiciones restantes de este Acuerdo, que
          permanecerán en pleno vigor y efecto. Ninguna renuncia a cualquier
          término de este Acuerdo se considerará una renuncia adicional o
          continua de dicho término o cualquier otro término, y el hecho de que
          presupuesto no haga valer ningún derecho o disposición en virtud de
          este Acuerdo no constituirá una renuncia a dicho derecho. a provisión.
          USTED Y presupuesto ACEPTAN QUE CUALQUIER CAUSA DE ACCIÓN QUE SURJA O
          ESTÉ RELACIONADA CON LOS SERVICIOS DEBE COMENZAR DENTRO DE UN (1) AÑO
          DESPUÉS DE QUE LA CAUSA DE ACCIÓN SE ACUERDA. DE LO CONTRARIO, DICHA
          CAUSA DE ACCIÓN ESTÁ PERMANENTEMENTE PROHIBIDA Renuncia Salvo lo
          dispuesto en el presente el hecho de no ejercer un derecho o exigir el
          cumplimiento de una obligación en virtud de este Acuerdo no afectará
          la capacidad de una de las partes para ejercer dicho derecho o
          requerir dicho cumplimiento en cualquier momento posterior, ni
          constituirá la renuncia a una infracción_ cualquier incumplimiento
          posterior. Ninguna falla en el ejercicio; ni demora en el ejercicio;
          por parte de cualquiera de las partes de cualquier derecho o poder
          bajo este Acuerdo operará como una renuncia a ese derecho o poder. El
          ejercicio únco o parcial de cualquier derecho o poder en virtud de
          conflicto entre este Acuerdo y cualquier compra u otros términos
          aplicables regirán los términos de este Acuerdo Enmiendas a este
          Acuerdo presupuesto se reserva el derecho, a su entera discreción; de
          modificar o reemplazar este Acuerdo en cualquier momento. Si una
          revisión es importante, proporcionaremos un aviso de al menos 30 días
          antes de que entren en vigencia los nuevos términos. Lo que canst[tuye
          un cambio material se determinará a nuestro exclusivo criterio Si
          continúa accediendo a utilizando nuestra plataforma después de que las
          revisiones entren en vigencia, usted acepta estar sujeto a los
          términos revisados. Si no está de acuerdo con los nuevos términos, ya
          no está autorizado para usar presupuesto. Acuerdo completo El Acuerdo
          constituye el acuerdo completo entre usted y presupuesto con respecto
          a su uso de la plataforma y reemplaza todos los acuerdos escritos u
          orales anteriores y contemporáneos entre usted y presupuesto Es
          pasible que esté sujeto a términos y condiciones adicionales que se
          aplican cuando usa o compra otros servidos de presupuesto, que
          presupuesto le proporcionará en el momento de dicho uso o compra.
          Actualizaciones de nuestros Términos Podemos cambiar nuestro Servicio
          y nuestras politcas, y es posible que debamos realizar cambios en
          estos Términos para que reflejen con precisión nuestro Servicio y
          nuestras políticas A menos que la ley exija lo contrario. le
          notificaremos (por ejemplo, a través de nuestro Servicio) antes de
          realizar cambios en estos Términos y le daremos la oportunidad de
          revisarlos antes de que entren en vigencia. Luego, si continúa
          utilizando el Servicio; estará sujeto a los Términos actualizados. Si
          no desea aceptar estos o alguno de los Términos actualizados, puede
          eliminar su cuenta. Propiedad intelectual La plataforma y todo su
          contenido, características y funcionalidad (que incluyen: entre otros,
          toda la información, software, texto, pantallas: imágenes, video y
          audio, y el diseño, selección y disposición de los mismos), son
          propiedad de presupuesto, sus licenciantes u otros proveedores de
          dicho material y están protegidos por Guinea Ecuatorial y leyes
          internacionales de derechas de autor, marcas registradas, patentes;
          secretos comerciales y otras leyes de propiedad intelectual o derechos
          de propiedad. El material no puede ser copiado, modificado,
          reproducido. descargado o distribuido de ninguna manera; en su
          totalidad o en parte; sin el permiso previo expreso por escrito de
          presupuesto, a menos que y excepto que se indique expresamente en
          estos Términos y Condiciones. Se prohibe cualquier uso no autorizado
          del material Acuerdo de Arbitraje Esta sección se aplica a cualquier
          disputa, EXCEPTO QUE NO INCLUYE UNA DISPUTA RELACIONADA CON RECLAMOS
          POR RECURSOS INJUNTIVOS O EQUITATIVOS CON RESPECTO A LA EJECUCIÓN O
          VALIDEZ DE SUS DERECHOS DE PROPIEDAD INTELECTUAL O DE presupuesto El
          término "disputa" significa cualquier disputa, acción u otra
          controversia entre usted y presupuesto en relación con las Servicios o
          este acuerdo, ya sea en contrato, garantÍa, agravio: estatuto:
          regulación, ordenanza o cualquier otra base legal o equitativa.
          "Disputa" tendrá el significado más amplio pasible permitido por la
          ley Aviso de Disputa En el caso de una disputa, usted o presupuesto
          deben darle al otro un Aviso de Disputaa que es una declaración
          escrita que establece el nombre, la dirección y la información de
          contacto de la parte que la proporcionó, los hechos que dieron lugar a
          la disputa y la reparación solicitada Debe enviar cualquier Aviso de
          disputa por correo electrónico al presupuesto le enviará cualquier
          Aviso de disputa por correo a su dirección si la tenemos, o de otra
          manera a su dirección de correo electrónico. Usted y presupuesto
          intentarán resolver cualquier disputa mediante una negociación
          informal dentro de los sesenta (60) días a partir de la fecha en que
          se envíe la Notificación de disputa Después de sesenta (60) días,
          usted o presupuesto pueden comenzar el arbitraje Arbitraje Obligatorio
          Si usted y presupuesto no resuelven ninguna disputa mediante una
          negociación informal, cualquier otro esfuerzo para resolver la disputa
          se llevará a cabo exclusivamente mediante arbitraje vinculante como se
          describe en esta sección Está renunciando al derecho de litigar (o
          participar como parte o miembro de la clase) todas las disputas en la
          corte ante un juez o jurado. La disputa se resolverá mediante
          arbitraje vinculante de acuerdo con las reglas de arbitraje comercial
          de la Asociación Americana de Arbitraje. Cualquiera de las partes
          puede buscar medidas cautelares provisionales o preliminares de
          cualquier tribunal de jurisdicción competente, según sea necesario
          para proteger los derechos o la propiedad de las partes en espera de
          la finalización del arbitraje. Todos y cada uno de los costos,
          honorarios y gastos legale» contables y de otro tipo en los que
          Incurra la parte ganadora correrán a cargo de la parte no ganadora.
          Envíos y Privacidad En el caso de que envíe o publique ideas,
          sugerencias creativas, diseños, fotografías; información, anuncios,
          datos o propuestas, incluidas ideas para productos, servicios,
          funciones, tecnologias o promociones nuevos o mejorados, acepta
          expresamente que dichos envfos se realizarán automáticamente. será
          tratado como no confidencial y no propietario y se convertirá en
          propiedad exclusiva de presupuesto sin ningún tipo de compensación o
          crédito para usted. presupuesto y sus afiliados no tendrán
          obligaciones con respecto a dichos envíos o publicaciones y pueden
          usar las ideas contenidas en dichos envfos o publicaciones para
          cualquier propósito en cualquier medio a perpetuidad; incluyendo, pero
          no limitado a desarrollo. fabricación, y comercializar productos y
          servicios utilizando tales ideas Promociones presupuesto puede, de vez
          en cuando, incluir concursos, promociones, sorteos u otras actividades
          ("Promociones") que requieren que envie material o información sobre
          usted_ Tenga en cuenta que todas las promociones pueden regirse por
          reglas Independientes que pueden contener ciertos requisitos de
          elegibilidad, como restricciones de edad y ubicación geográfica. Usted
          es responsable de leer todas las reglas de Promociones para determinar
          si es elegible para participar o no. Si participa en alguna Promoción,
          acepta cumplir con todas las Reglas de promociones. Es pasible que se
          apliquen términos y condiciones adicionales a las compras de bienes o
          servicios a través de los Servicios; cuyos términos y condiciones
          forman parte de este Acuerdo mediante esta referencia. Errores
          Tipográficos En el caso de que un producto y / o servido se enumere a
          un precio incorrecto o con información incorrecta debido a un error
          tipográfico tendremos el derecho de rechazar o cancelar cualquier
          pedido realizado para el producto y / o servicio enumerado al precio
          incorrecto. Tendremos derecho a rechazar o cancelar cualquier pedido,
          ya sea que se haya confirmado o no y se haya cargado a su tarjeta de
          crédito_ Si su tarjeta de crédito ya ha sido cargada por la compra y
          su pedido es cancelado, emitiremos inmediatamente un crédito a su
          cuenta de tarjeta de crédito u otra cuenta de pago por el monto del
          cargo. Diverso Si por alguna razón un tribunal de jurisdicción
          competente determina que alguna disposición o parte de estos Términos
          y condiciones no se puede hacer cumplir el resto de estos Términos y
          condiciones continuará en plena vigor y efecto. Cualquier renuncia a
          cualquier disposición de estos Térmnos y condiciones será efectiva
          solo si está por escrito y firmada por un representante autorizado de
          presupuesto. presupuesto tendrá derecho a una medida cautelar u otra
          compensación equitativa (sin la obligación de depositar ninguna fianza
          o garantía) en caso de incumplimento anticipado por su parte.
          presupuesta opera y controla el Servicio presupuesto desde sus
          oficinas en Guinea Ecuatorial. El Servicio no está destinado a ser
          distribuido ni utilizado por ninguna persona o entidad en ninguna
          jurisdicción o país donde dicha distribución o uso sea contrario a la
          ley o regulación. En consecuencial las personas que eligen acceder al
          Servicio presupuesto desde otras ubicaciones lo hacen por iniciativa
          propia y son las únicas responsables del cumplimiento de las leyes
          locales en la medida en que las leyes locales sean aplicables Estos
          Términos y condiciones (que incluyen e incorporan la Politica de
          privacidad de presupuesto) contienen el entendimiento completo y
          reemplazan todos los entendimientos previos entre usted y presupuesto
          con respecto a su tema, y usted no puede cambiarlos ni modificarlos.
          Los titulos de las secciones que se utilzan en este Acuerdo son solo
          por conveniencia y no se les dará ninguna importancia legal. Descargo
          de Responsabilidad presupuesto no es responsable de ningún contenido;
          código o cualquier otra imprecisión. presupuesto no ofrece garantras
          En ningún caso presupuesto será responsable de ningún daño especia17
          directow indirecto, consecuente o incidental o de cualquier daño, ya
          sea en una acción contractuall negligencia u otro agravio, que surja
          de o en conexión con el uso del Servicio o el contenido del Servicio
          presupuesto se reserva el derecho de realizar adiciones, eliminaciones
          o modificaciones al contenido del Servido en cualquier momento sin
          previo aviso El Servicio presupuesto y su contenido se proporcionan
          "tal cual" y "'según esté disponible" sin ninguna garantía o
          representación de ningún tipo, ya sea expresa o implicita. presupuesto
          es un distribuidor y no un editor del contenido proporcionado por
          terceros, como tal, presupuesto no ejerce ningún control editorial
          sobre dicho contenido y no ofrece ninguna garantía o representación en
          cuanto a la precisióni confiabilidad o vigencia de cualquier
          informacióni contenido, servicio o mercancía proporcionada o accesible
          a través del Servicio presupuesto. Sin limitar lo anterior,
          presupuesto renuncia especificamente a todas las garantías y
          representaciones en cualquier contenido transmitido en conexión con el
          Servicio presupuesto o en sitios que pueden aparecer como enlaces en
          el Servicio presupuesto, o en los productos proporcionados como parte
          o en relación con el Servicia presupuesto, incluidas, entre otras, las
          garantfas de comerciabilidad idoneidad para un propósito particular o
          no infracción de derechos de terceros Ningún consejo oral o
          información escrita proporcionada por presupuesto o cualquiera de sus
          afiliados, empleadosv funcionarias; agentes o similares creará una
          garantía. La información sobre precios y disponibilidad está sujeta a
          cambios sin previo aviso. Sin limitar lo anterior, presupuesto no
          garantiza que el Servicio de presupuesto sea ininterrumpid0i Sin
          corrupción, oportuno o sin errores. Contáctenos No dude en
          contactarnos si tiene alguna pregunta. • A través de este enlace:
          presupuesto-626db web app
        </p> */}
      </div>
      <footer className="footer bg-dark text-white">
        <Footer />
      </footer>
    </Fragment>
  );
};

export default Terms;
