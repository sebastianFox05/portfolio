// ===== FOXDEV bilingual interface (ES / EN) =====
// Basic client-side localization that preserves the existing HTML structure.
(() => {
    const LANGUAGE_KEY = "fox_language";
    const DEFAULT_LANGUAGE = "es";
    const SUPPORTED_LANGUAGES = ["es", "en"];
    const TRANSLATABLE_ATTRIBUTES = [
        "aria-label",
        "title",
        "placeholder",
        "content",
        "data-type",
        "data-message",
        "data-timeline",
        "data-package",
        "value"
    ];

    const translationEntries = [
        // Shared navigation, footer and controls
        ["Inicio", "Home"],
        ["Sobre mí", "About"],
        ["Proyectos", "Projects"],
        ["Servicios", "Services"],
        ["Colaboraciones", "Collabs"],
        ["Contacto", "Contact"],
        ["Portafolio", "Portfolio"],
        ["Navegar", "Navigate"],
        ["Enviar un mensaje", "Send a message"],
        ["Volver arriba", "Back to top"],
        ["Todos los derechos reservados.", "All rights reserved."],
        ["Desarrollador frontend enfocado en interfaces limpias, microinteracciones y experiencias web de alto rendimiento.", "Frontend developer focused on clean UI, micro-interactions, and performant web experiences."],
        ["Escríbenos en WhatsApp", "Message us on WhatsApp"],
        ["Chatear por WhatsApp", "Chat on WhatsApp"],
        ["Cambiar tema", "Change theme"],
        ["Cambiar idioma", "Change language"],
        ["Idioma", "Language"],
        ["Modo claro", "Light mode"],
        ["Modo oscuro", "Dark mode"],
        ["Abriendo proyectos…", "Opening projects…"],
        ["Abriendo currículum…", "Opening resume…"],
        ["Copiado al portapapeles", "Copied to clipboard"],
        ["Copiado", "Copied"],
        ["Desplazando a Contacto…", "Scrolling to Contact…"],

        // Metadata and page titles
        ["FOX DEVELOPER | Inicio", "FOX DEVELOPER | Home"],
        ["FOX DEVELOPER | Sobre mí", "FOX DEVELOPER | About"],
        ["FOX DEVELOPER | Proyectos", "FOX DEVELOPER | Projects"],
        ["FOX DEVELOPER | Servicios", "FOX DEVELOPER | Services"],
        ["FOX DEVELOPER | Colaboraciones", "FOX DEVELOPER | Collaboration"],
        ["FOX DEVELOPER | Contacto", "FOX DEVELOPER | Contact"],
        ["Portafolio de FOX Developer: frontend, UI, proyectos, servicios y contacto.", "FOX Developer portfolio: frontend, UI, projects, services, and contact."],
        ["Conoce el enfoque, las herramientas y el proceso de trabajo de FOX Developer.", "Learn about FOX Developer's approach, tools, and workflow."],
        ["Explora los proyectos frontend y casos visuales de FOX Developer.", "Explore FOX Developer's frontend projects and visual case studies."],
        ["Servicios frontend, UI, responsive e interacción de FOX Developer.", "Frontend, UI, responsive, and interaction services by FOX Developer."],
        ["Colabora con FOX Developer en interfaces y experiencias web.", "Collaborate with FOX Developer on interfaces and web experiences."],
        ["Contacta a FOX Developer para proyectos frontend y diseño UI.", "Contact FOX Developer for frontend and UI design projects."],
        ["Formulario de contacto de FOX Developer.", "FOX Developer contact form."],

        // Home
        ["DESARROLLADOR FRONTEND Y DISEÑADOR UI", "FRONTEND DEVELOPER & UI DESIGNER"],
        ["Soy dinámico y creativo", "I am Dynamic and Creative"],
        ["EL FUTURO DEL DESARROLLO ESTÁ AQUÍ", "THE FUTURE OF DEVELOPMENT IS HERE"],
        ["VER PROYECTOS", "VIEW PROJECTS"],
        ["DESCARGAR CV", "DOWNLOAD CV"],
        ["CONTRÁTAME", "HIRE ME"],
        ["¿QUIÉN SOY?", "WHO AM I?"],
        ["Soy Sebastian Fox, desarrollador frontend enfocado en interfaces visuales, microinteracciones y experiencias web que se sienten pulidas desde el primer clic.", "I am Sebastian Fox, a frontend developer focused on visual interfaces, micro-interactions, and web experiences that feel polished from the first click."],
        ["Trabajo con HTML, CSS, JavaScript y criterios de UI para convertir ideas, marcas y productos en sitios rápidos, responsive y fáciles de mantener.", "I work with HTML, CSS, JavaScript, and UI principles to turn ideas, brands, and products into fast, responsive, and maintainable websites."],
        ["Nombre:", "Name:"],
        ["Dirección:", "Address:"],
        ["Correo:", "Email:"],
        ["Correo", "Email"],
        ["Teléfono:", "Phone:"],
        ["MAPA DEL PORTAFOLIO", "PORTFOLIO MAP"],
        ["Qué cuenta cada página", "What each page tells"],
        ["Resume la identidad principal, muestra métricas, enfoque actual, perfil rápido y accesos directos a los puntos importantes del portafolio.", "Summarizes the main identity, showing metrics, current focus, a quick profile, and direct access to the portfolio's key areas."],
        ["Presenta el carrusel visual, filtros por tipo de proyecto y una lectura más clara de cómo se piensa cada caso desde UX, código y salida a producción.", "Presents the visual carousel, project-type filters, and a clearer view of how each case is approached from UX and code through production."],
        ["Explica lo que se puede contratar, incluye un estimador interactivo y divide los servicios en paquetes para aterrizar el alcance.", "Explains what can be hired, includes an interactive estimator, and divides services into packages to define scope."],
        ["Ordena las formas de colaborar, muestra demos interactivas y facilita enviar un mensaje con contexto suficiente para arrancar.", "Organizes collaboration options, shows interactive demos, and makes it easy to send a message with enough context to get started."],
        ["ENFOQUE ACTUAL", "CURRENT FOCUS"],
        ["Qué estoy construyendo ahora", "What I am building now"],
        ["Sistemas de portafolio", "Portfolio systems"],
        ["Estructuras multipágina con identidad visual, proyectos, servicios y contacto claro.", "Multi-page structures with visual identity, projects, services, and clear contact paths."],
        ["Identidad", "Identity"],
        ["Presencia visual", "Visual presence"],
        ["El inicio presenta la marca FOX Developer con una entrada fuerte, fondo fotográfico, logotipo, contraste oscuro y una jerarquía pensada para verse premium sin sentirse cargada.", "The home page presents the FOX Developer brand with a strong entrance, photographic background, logo, dark contrast, and a hierarchy designed to feel premium without feeling crowded."],
        ["Estructura", "Structure"],
        ["Rutas claras", "Clear paths"],
        ["La experiencia ahora está separada por páginas: Sobre mí, Proyectos, Servicios, Colaboraciones y Contacto. Cada ruta tiene información propia y conserva la misma identidad.", "The experience is now split into pages: About, Projects, Services, Collabs, and Contact. Each route has its own information while preserving the same identity."],
        ["Movimiento", "Motion"],
        ["Interacciones vivas", "Living interactions"],
        ["Botones con ondas, revelado al hacer scroll, cambio de tema, indicadores activos y respuesta visual para que la página no se sienta estática.", "Buttons with ripple effects, scroll reveal, theme switching, active indicators, and visual feedback so the page never feels static."],
        ["Contenido", "Content"],
        ["Conversión directa", "Direct conversion"],
        ["Los llamados a la acción conectan con proyectos, CV, formulario y WhatsApp para que un visitante pueda pasar de mirar el portafolio a iniciar una conversación.", "Calls to action connect to projects, the résumé, the form, and WhatsApp so a visitor can move from viewing the portfolio to starting a conversation."],
        ["CONTROL DE CALIDAD", "QUALITY CHECK"],
        ["Qué reviso antes de entregar", "What I check before delivery"],
        ["Que el mensaje principal sea claro, que cada sección tenga una razón y que los llamados a la acción no compitan entre sí.", "That the main message is clear, every section has a purpose, and calls to action do not compete with each other."],
        ["Que la interfaz respire en escritorio, tablet y móvil; sin textos cortados, tarjetas deformadas o navegación incómoda.", "That the interface has room to breathe on desktop, tablet, and mobile, without clipped text, distorted cards, or awkward navigation."],
        ["Que los recursos estén controlados, JavaScript sea ligero y la página cargue rápido sin depender de efectos innecesarios.", "That assets are controlled, JavaScript stays lightweight, and the page loads quickly without relying on unnecessary effects."],
        ["Que botones, enlaces, etiquetas, contraste y foco sean utilizables, especialmente en formularios, navegación y modales.", "That buttons, links, labels, contrast, and focus are usable, especially in forms, navigation, and modals."],
        ["tipos de entregables frontend", "types of frontend deliverables"],
        ["interfaces diseñadas y maquetadas", "interfaces designed and built"],
        ["porcentaje responsive-first", "responsive-first percentage"],
        ["Siguiente enfoque", "Next focus"],

        // About
        ["SOBRE FOXDEV", "ABOUT FOXDEV"],
        ["Desarrollo frontend con detalle visual y criterio de producto.", "Frontend development with visual detail and product judgment."],
        ["Construyo interfaces que combinan diseño, estructura y microinteracciones. Mi objetivo es que cada pantalla sea clara, rápida y memorable.", "I build interfaces that combine design, structure, and micro-interactions. My goal is for every screen to be clear, fast, and memorable."],
        ["Más sobre mi enfoque", "More about my approach"],
        ["NOTAS DE PERFIL", "PROFILE NOTES"],
        ["¿Qué tipo de proyectos disfruto?", "What kind of projects do I enjoy?"],
        ["Portafolios, marcas personales, páginas de servicios, dashboards conceptuales y sitios donde las microinteracciones hacen que la marca se sienta más viva.", "Portfolios, personal brands, service landing pages, conceptual dashboards, and sites where micro-interactions make the brand feel more alive."],
        ["¿Qué busco en una interfaz?", "What do I look for in an interface?"],
        ["Que sea fácil de recorrer, visualmente fuerte y útil desde el primer vistazo. La estética ayuda, pero la estructura sostiene todo.", "It should be easy to navigate, visually strong, and useful at first glance. Aesthetics help, but structure supports everything."],
        ["¿Cómo tomo decisiones visuales?", "How do I make visual decisions?"],
        ["Uso referencias, atmósfera, contraste, jerarquía y tipo de usuario. Cada color, espacio o animación tiene que apoyar una intención.", "I use references, mood, contrast, hierarchy, and user type. Every color, space, or animation must support an intention."],
        ["¿Qué entrego además del código?", "What do I deliver besides code?"],
        ["Una estructura entendible, recursos organizados, rutas claras, contenido distribuido por página y recomendaciones para seguir haciendo crecer el sitio.", "A clear structure, organized assets, clear routes, content distributed by page, and recommendations for continuing to grow the site."],
        ["VALORES DE TRABAJO", "WORK VALUES"],
        ["Criterios que guían mi trabajo", "Principles that guide my work"],
        ["Claridad primero", "Clarity first"],
        ["Antes de decorar una pantalla, defino qué debe entender el usuario, qué acción debe tomar y qué información necesita para decidir.", "Before decorating a screen, I define what the user must understand, what action they should take, and what information they need to decide."],
        ["Componentes con reglas", "Components with rules"],
        ["Tarjetas, botones, campos, paneles y estados se construyen con patrones repetibles para que el sitio sea fácil de ampliar.", "Cards, buttons, inputs, panels, and states are built with repeatable patterns so the site is easy to extend."],
        ["Movimiento con sentido", "Purposeful motion"],
        ["Las animaciones tienen que dar respuesta, revelar jerarquía o hacer más agradable una acción; si no ayudan, se reducen.", "Animations must provide feedback, reveal hierarchy, or make an action more pleasant; if they do not help, they are reduced."],
        ["Entrega honesta", "Honest delivery"],
        ["Prefiero dejar una base clara, explicable y estable antes que sumar efectos que se vean bien una vez y molesten después.", "I prefer to leave a clear, explainable, and stable foundation before adding effects that look good once and become annoying later."],
        ["Herramientas que uso", "Tools I use"],
        ["Selecciona una habilidad para ver el enfoque de trabajo.", "Select a skill to see the working approach."],
        ["HTML semántico", "Semantic HTML"],
        ["CSS modular", "Modular CSS"],
        ["Diseño responsive", "Responsive UI"],
        ["Sistemas de diseño", "Design systems"],
        ["Código mantenible", "Maintainable code"],
        ["Rendimiento", "Performance"],
        ["Accesibilidad", "Accessibility"],
        ["Cómo trabajo una entrega", "How I deliver a project"],
        ["Descubrimiento", "Discovery"],
        ["Entiendo objetivos, audiencia, referencias visuales y contenido antes de construir.", "I understand goals, audience, visual references, and content before building."],
        ["Brief claro, referencias, alcance y contenido base.", "Clear brief, references, scope, and base content."],
        ["Construcción", "Build"],
        ["Maqueto con componentes reutilizables, estilos consistentes y comportamiento no intrusivo.", "I build with reusable components, consistent styles, and non-intrusive behavior."],
        ["La estructura se separa en HTML semántico, CSS organizado por componentes y JavaScript para comportamiento, sin mezclar responsabilidades.", "The structure separates semantic HTML, component-organized CSS, and JavaScript behavior without mixing responsibilities."],
        ["Pulido", "Polish"],
        ["Reviso responsive, interacciones, estados de foco, textos y detalles visuales finales.", "I review responsiveness, interactions, focus states, copy, and final visual details."],
        ["Reviso hover, foco, responsive, textos, formularios, imágenes y pequeños estados para que el resultado se sienta terminado.", "I review hover, focus, responsiveness, copy, forms, images, and small states so the result feels finished."],
        ["Entrega", "Delivery"],
        ["Diseño consistente", "Consistent design"],
        ["Objetivo visible", "Visible goal"],
        ["Detalle final", "Final detail"],

        // Projects
        ["MI PORTAFOLIO", "MY PORTFOLIO"],
        ["HOLA, SOY SEBASTIAN FOX, DESARROLLADOR FRONTEND", "HELLO I AM SEBASTIAN FOX FRONTEND DEVELOPER"],
        ["VER PROYECTO", "VIEW PROJECT"],
        ["Contrátame", "Hire me"],
        ["Todos", "All"],
        ["Marca", "Brand"],
        ["Interfaz", "Interface"],
        ["Caso de marca", "Brand case"],
        ["Caso de landing", "Landing case"],
        ["Caso de dashboard", "Dashboard case"],
        ["Caso de sistema", "System case"],
        ["Landing creativa", "Creative Landing"],
        ["Concepto de dashboard", "Dashboard Concept"],
        ["Sistema de portafolio", "Portfolio System"],
        ["Identidad visual FOXDEV", "FOXDEV Visual ID"],
        ["Identidad FOXDEV", "FOXDEV identity"],
        ["Logo, isotipo y dirección visual para una presencia personal consistente.", "Logo, symbol, and visual direction for a consistent personal presence."],
        ["Página de conversión con hero inmersivo, revelado al hacer scroll y llamados claros.", "Conversion page with an immersive hero, scroll reveal, and clear calls to action."],
        ["Panel operativo con jerarquía visual, tarjetas y microinteracciones.", "Operational panel with visual hierarchy, cards, and micro-interactions."],
        ["Sistema multipágina con navegación, modal, tema claro/oscuro y contacto.", "Multi-page system with navigation, modal, light/dark theme, and contact."],
        ["ESTUDIOS DE CASO", "CASE STUDIES"],
        ["Explora el tipo de proyecto", "Explore the project type"],
        ["PROFUNDIDAD DEL PROYECTO", "PROJECT DEPTH"],
        ["Cómo leo cada caso", "How I read each case"],
        ["Problema", "Problem"],
        ["Identifico qué necesita comunicar el proyecto: vender un servicio, presentar una marca, ordenar contenido, mostrar experiencia o mejorar una interfaz existente.", "I identify what the project needs to communicate: sell a service, present a brand, organize content, showcase experience, or improve an existing interface."],
        ["Solución visual", "Visual solution"],
        ["Defino el hero, ritmo de secciones, uso de imágenes, contraste, tarjetas, botones y detalles de movimiento para que la página tenga dirección.", "I define the hero, section rhythm, image use, contrast, cards, buttons, and motion details so the page has direction."],
        ["Solución técnica", "Technical solution"],
        ["Divido componentes, mantengo estilos reutilizables, cuido rutas de recursos y dejo interacciones en JavaScript para que el HTML siga limpio.", "I divide components, keep styles reusable, protect asset paths, and leave interactions in JavaScript so the HTML stays clean."],
        ["Resultado", "Result"],
        ["Un sitio que se puede revisar, ampliar, publicar y presentar sin depender de explicaciones externas. La página debe hablar por sí sola.", "A site that can be reviewed, extended, published, and presented without relying on external explanations. The page should speak for itself."],
        ["VALOR DEL CASO", "CASE VALUE"],
        ["Qué valor demuestra el portafolio", "What value the portfolio demonstrates"],
        ["Capacidad visual", "Visual ability"],
        ["Las imágenes, fondos, tarjetas y jerarquía muestran criterio estético y una dirección de arte consistente para marcas digitales.", "Images, backgrounds, cards, and hierarchy show aesthetic judgment and a consistent art direction for digital brands."],
        ["Capacidad técnica", "Technical ability"],
        ["El carrusel, modal, filtros, tema claro/oscuro y formulario prueban interactividad real con JavaScript separado del contenido.", "The carousel, modal, filters, light/dark theme, and form demonstrate real interactivity with JavaScript separated from content."],
        ["Capacidad de orden", "Organizational ability"],
        ["La división multipágina ayuda a mostrar información sin saturar una sola landing y permite hacer crecer las secciones por separado.", "The multi-page structure helps present information without overcrowding a single landing page and allows sections to grow independently."],
        ["Capacidad de venta", "Sales ability"],
        ["Los casos conectan servicios, contacto y colaboraciones para que el portafolio no solo se vea bien, sino que también genere conversación.", "Cases connect services, contact, and collaborations so the portfolio not only looks good but also starts conversations."],
        ["Flujo claro", "Clear flow"],
        ["Cada proyecto se organiza para que el usuario entienda rápido dónde está y qué puede hacer.", "Each project is organized so users quickly understand where they are and what they can do."],
        ["Oferta enfocada", "Focused offer"],
        ["Secciones reducidas, mensaje principal fuerte, llamados visibles y suficiente información para que una marca pueda captar clientes.", "Focused sections, a strong main message, visible calls to action, and enough information for a brand to attract clients."],
        ["Interacción medida", "Measured interaction"],
        ["Animaciones suaves, respuesta visual y controles que no distraen del contenido principal.", "Smooth animations, visual feedback, and controls that do not distract from the main content."],
        ["Base limpia", "Clean foundation"],
        ["HTML semántico, CSS por componentes y JavaScript separado del marcado.", "Semantic HTML, component-based CSS, and JavaScript separated from markup."],
        ["Listo para publicar", "Ready to publish"],
        ["Rutas organizadas, recursos locales y una estructura fácil de mover a hosting.", "Organized routes, local assets, and a structure that is easy to move to hosting."],
        ["Portafolio modular", "Modular portfolio"],
        ["Páginas separadas, navegación activa, pie consistente, formularios, filtros, modal y controles que se pueden ampliar con más contenido.", "Separate pages, active navigation, consistent footer, forms, filters, modal, and controls that can be extended with more content."],
        ["UI operativa", "Operational UI"],
        ["Componentes de datos, paneles, métricas y estados interactivos pensados para leer información rápido y tomar decisiones.", "Data components, panels, metrics, and interactive states designed to read information quickly and make decisions."],
        ["Experiencia", "Experience"],
        ["Evidencia", "Evidence"],
        ["Cerrar", "Close"],

        // Services
        ["Sitios y productos web con estética, interacción y estructura.", "Websites and web products with aesthetics, interaction, and structure."],
        ["Elige una ruta", "Choose a path"],
        ["Inicial", "Starter"],
        ["Ideal para validar una marca, servicio u oferta puntual.", "Ideal for validating a brand, service, or focused offer."],
        ["Página enfocada en conversión, responsive, SEO base y microinteracciones.", "Conversion-focused page with responsive design, basic SEO, and micro-interactions."],
        ["Estudio", "Studio"],
        ["Para mostrar perfil, proyectos, servicios y colaboraciones.", "For showcasing a profile, projects, services, and collaborations."],
        ["Inicio, proyectos, contacto, animaciones y una estructura lista para crecer.", "Home, projects, contact, animations, and a structure ready to grow."],
        ["Crecimiento", "Growth"],
        ["Portafolio avanzado", "Advanced portfolio"],
        ["Interfaz de producto", "Product UI"],
        ["Para interfaces operativas, dashboards o herramientas internas.", "For operational interfaces, dashboards, or internal tools."],
        ["Dashboards, módulos, estados visuales y componentes reutilizables.", "Dashboards, modules, visual states, and reusable components."],
        ["Refactorización", "Refactor"],
        ["Mejoras de CSS, estructura, responsive, accesibilidad y pulido de una UI existente.", "CSS, structure, responsiveness, accessibility, and existing UI polish."],
        ["PAQUETES", "PACKAGES"],
        ["Configura tu idea", "Configure your idea"],
        ["ESTIMADOR DE PROYECTO", "PROJECT ESTIMATOR"],
        ["Elige el tipo de entrega, ajusta el alcance y obtén una lectura rápida del proyecto antes de escribirme.", "Choose the type of delivery, adjust the scope, and get a quick project overview before contacting me."],
        ["Páginas", "Pages"],
        ["Interactividad", "Interactivity"],
        ["2-3 semanas", "2-3 weeks"],
        ["El paquete inicial incluye una landing pulida, responsive, SEO base y formulario.", "Starter includes a polished landing page, responsive design, basic SEO, and a form."],
        ["Iniciar proyecto", "Start project"],
        ["ENTREGABLES", "DELIVERABLES"],
        ["Qué recibes al final", "What you receive at the end"],
        ["Arquitectura", "Architecture"],
        ["Mapa de páginas, estructura de secciones, rutas entre vistas y distribución del contenido para que el sitio crezca sin perder orden.", "Page map, section structure, routes between views, and content distribution so the site can grow without losing order."],
        ["Sistema visual", "Visual system"],
        ["Botones, tarjetas, formularios, navegación, paneles y estados visuales que se sienten coherentes en todo el sitio.", "Buttons, cards, forms, navigation, panels, and visual states that feel consistent throughout the site."],
        ["Interacción", "Interaction"],
        ["Revelado al hacer scroll, estados hover, filtros, sliders, modales, respuesta de formulario y detalles que hacen que la interfaz responda al usuario.", "Scroll reveal, hover states, filters, sliders, modals, form feedback, and details that make the interface respond to the user."],
        ["Responsive", "Responsive"],
        ["Adaptación para escritorio, tablet y móvil, cuidando que textos, tarjetas, botones e imágenes mantengan jerarquía y no se superpongan.", "Adaptation for desktop, tablet, and mobile, ensuring text, cards, buttons, and images preserve hierarchy without overlapping."],
        ["Entrega", "Delivery"],
        ["Recursos organizados, HTML limpio, CSS estructurado, JS separado y recomendaciones para publicar o continuar el proyecto.", "Organized assets, clean HTML, structured CSS, separate JavaScript, and recommendations for publishing or continuing the project."],
        ["Archivos", "Files"],
        ["Páginas HTML organizadas, CSS centralizado, JavaScript separado, recursos locales y rutas fáciles de mantener.", "Organized HTML pages, centralized CSS, separate JavaScript, local assets, and maintainable routes."],
        ["Estructura lista", "Ready structure"],
        ["Base escalable", "Scalable foundation"],
        ["Una estructura pensada para sumar nuevas páginas, proyectos, servicios, fotos, textos y colaboraciones sin rehacer todo.", "A structure designed to add new pages, projects, services, photos, copy, and collaborations without rebuilding everything."],
        ["QA", "QA"],
        ["Revisión final", "Final review"],
        ["Chequeo de enlaces, contraste, legibilidad, responsive, formularios, modales, scroll y comportamiento del tema claro/oscuro.", "Review of links, contrast, readability, responsiveness, forms, modals, scroll, and light/dark theme behavior."],
        ["FAQ DE SERVICIOS", "SERVICE FAQ"],
        ["Detalles antes de contratar", "Details before hiring"],
        ["¿Qué necesito enviarte?", "What do I need to send you?"],
        ["Nombre de la marca, objetivo, referencias visuales, textos disponibles, imágenes o logo y una idea del tipo de página que quieres.", "Brand name, objective, visual references, available copy, images or logo, and an idea of the type of page you want."],
        ["¿Qué pasa si no tengo todo el contenido?", "What if I do not have all the content?"],
        ["Puedo ayudarte a organizar una estructura inicial con textos guía para que luego reemplaces o ajustes la información final.", "I can help organize an initial structure with guide copy that you can later replace or adjust."],
        ["¿Se puede agregar más de una página?", "Can more than one page be added?"],
        ["Sí. El sistema está preparado para páginas independientes como Inicio, Sobre mí, Proyectos, Servicios, Colaboraciones y Contacto.", "Yes. The system is ready for independent pages such as Home, About, Projects, Services, Collabs, and Contact."],
        ["¿También puedo pedir solo mejoras?", "Can I request improvements only?"],
        ["Sí. Puedo trabajar sobre un sitio existente para corregir responsive, mejorar estilos, ordenar CSS, sumar animaciones o limpiar la estructura.", "Yes. I can work on an existing site to fix responsiveness, improve styles, organize CSS, add animations, or clean up the structure."],

        // Collaboration
        ["Espacios donde puedo sumarme a equipos, marcas y productos para convertir una idea visual en una experiencia web interactiva.", "Ways I can join teams, brands, and products to turn a visual idea into an interactive web experience."],
        ["FORMAS DE COLABORAR", "COLLAB MODES"],
        ["Formas de trabajar juntos", "Ways to work together"],
        ["Diseño a código", "Design to code"],
        ["Transformo referencias, wireframes o diseños sueltos en interfaces navegables que se pueden probar y presentar.", "I turn references, wireframes, or loose designs into navigable interfaces that can be tested and presented."],
        ["Construir desde cero", "Build from scratch"],
        ["Construimos una página o interfaz completa desde contenido, referencias y objetivos claros.", "We build a complete page or interface from content, references, and clear goals."],
        ["Reparación de UI", "UI repair"],
        ["Si ya existe un avance, puedo entrar a pulir UI, ordenar CSS, corregir responsive, revisar estados y preparar la demo final.", "If work already exists, I can polish the UI, organize CSS, fix responsiveness, review states, and prepare the final demo."],
        ["Prototipo", "Prototype"],
        ["Demo interactiva", "Interactive demo"],
        ["Creo prototipos web con botones, sliders, contadores, filtros o paneles vivos para explicar mejor una idea ante clientes.", "I create web prototypes with buttons, sliders, counters, filters, or live panels to explain an idea more clearly to clients."],
        ["Equipos", "Teams"],
        ["Equipos creativos", "Creative teams"],
        ["Puedo entrar como apoyo frontend para convertir propuestas visuales en pantallas navegables, responsive y listas para mostrar.", "I can join as frontend support to turn visual proposals into navigable, responsive screens ready to present."],
        ["Productos", "Products"],
        ["Productos digitales", "Digital products"],
        ["Puedo apoyar interfaces de dashboards, herramientas internas, prototipos de venta o experiencias donde el usuario interactúa con datos.", "I can support dashboard interfaces, internal tools, sales prototypes, or experiences where users interact with data."],
        ["Marcas", "Brands"],
        ["Marcas personales", "Personal brands"],
        ["Trabajo con emprendedores, abogados, hoteles, estudios o perfiles profesionales que necesitan una presencia digital con identidad.", "I work with entrepreneurs, lawyers, hotels, studios, and professionals who need a digital presence with identity."],
        ["AUDITORÍA", "AUDIT"],
        ["Corrección visual", "Visual correction"],
        ["Detecto inconsistencias de espaciado, color, jerarquía, alineación y responsive para dejar una interfaz más profesional.", "I detect inconsistencies in spacing, color, hierarchy, alignment, and responsiveness to create a more professional interface."],
        ["VALOR DE LA COLABORACIÓN", "COLLAB VALUE"],
        ["Dónde puedo aportar más", "Where I can contribute most"],
        ["Arquitectura visual", "Visual architecture"],
        ["Componentes responsive", "Responsive components"],
        ["Interacciones y estados", "Interactions and states"],
        ["Entrega ordenada", "Organized handoff"],
        ["Dejo archivos legibles, clases claras y notas de continuidad para que otro desarrollador pueda seguir sin perder tiempo.", "I leave readable files, clear classes, and continuity notes so another developer can continue without losing time."],
        ["Entrega compartida", "Shared delivery"],
        ["El objetivo es dejar una pieza que el equipo pueda revisar, presentar, publicar o seguir ampliando sin perder consistencia.", "The goal is to leave a piece the team can review, present, publish, or continue extending without losing consistency."],
        ["LISTA DE COLABORACIÓN", "COLLAB CHECKLIST"],
        ["Para colaborar mejor", "For better collaboration"],
        ["Alcance definido", "Defined scope"],
        ["Número de páginas, secciones, formularios, efectos, contenido y fecha objetivo. Cuanto más claro sea el alcance, más rápido se avanza.", "Number of pages, sections, forms, effects, content, and target date. The clearer the scope, the faster the work moves."],
        ["Referencias visuales", "Visual references"],
        ["Imágenes, sitios, colores, logos o moodboards ayudan a mantener el proyecto cerca de la dirección que tienes en mente.", "Images, sites, colors, logos, or moodboards help keep the project close to the direction you have in mind."],
        ["Retroalimentación puntual", "Focused feedback"],
        ["Los cambios funcionan mejor cuando se agrupan por prioridad: estructura, contenido, responsive, estilo visual e interacciones.", "Changes work best when grouped by priority: structure, content, responsiveness, visual style, and interactions."],
        ["Cierres rápidos", "Fast decisions"],
        ["ANALÍTICA EN VIVO", "LIVE ANALYTICS"],
        ["Este panel se actualiza en tiempo real según cómo interactúas con la página.", "This panel updates in real time based on how you interact with the page."],
        ["Consejo: desplázate y haz clic para ver cómo cambia la puntuación.", "Tip: scroll and click around to see the score change."],
        ["PUNTUACIÓN DE INTERACCIÓN", "INTERACTION SCORE"],
        ["Puntuación", "Score"],
        ["Clics", "Clicks"],
        ["Profundidad de scroll", "Scroll depth"],
        ["de la página", "of page"],
        ["Tiempo activo", "Time active"],
        ["activo", "active"],
        ["Tarjetas abiertas", "Cards opened"],
        ["modales", "modals"],
        ["abiertos", "opened"],
        ["Cambios de tema", "Theme toggles"],
        ["oscuro/claro", "dark/light"],
        ["cambios", "switches"],
        ["Este es un contador de demostración local (sin seguimiento ni cookies).", "This is a local demo counter (no tracking, no cookies)."],
        ["Orientado a UX", "UX-minded"],
        ["UI minimalista", "Minimal UI"],
        ["Interactivo", "Interactive"],
        ["COMPORTAMIENTO", "BEHAVIOR"],
        ["FLUJO DE USUARIO EN VIVO", "LIVE USER FLOW"],
        ["Este flujo se actualiza localmente según cómo navegas por la página (sin seguimiento ni cookies).", "This flow updates locally based on how you navigate the page (no tracking, no cookies)."],
        ["Restablecer", "Reset"],
        ["Pausar", "Pause"],
        ["Ruta actual", "Current route"],
        ["Consejo: desplázate a otra sección para ver cómo cambia la ruta.", "Tip: scroll to another section to see the route update."],
        ["Transiciones", "Transitions"],
        ["Mostrando las últimas 8 transiciones.", "Showing last 8 transitions."],
        ["Destacados", "Highlights"],
        ["en vivo", "live"],
        ["Más visitada", "Most visited"],
        ["Sección más profunda", "Deepest section"],
        ["Tiempo en la sección actual", "Time in current"],
        ["SISTEMA DE DISEÑO", "DESIGN SYSTEM"],
        ["LABORATORIO DE COMPONENTES", "COMPONENT SANDBOX"],
        ["Ajusta algunos tokens y observa cómo se actualiza al instante una tarjeta lista para producción.", "Adjust a few tokens and see a production-style card update instantly."],
        ["Mínimo", "Minimal"],
        ["Cristal", "Glass"],
        ["Controles", "Controls"],
        ["Radio", "Radius"],
        ["Relleno", "Padding"],
        ["Sombra", "Shadow"],
        ["Desenfoque", "Blur"],
        ["Consejo: pasa el cursor por la vista previa para ver los estados de foco y hover.", "Tip: hover the preview to see focus and hover states."],
        ["Vista previa", "Preview"],
        ["componente", "component"],
        ["Componente UI", "UI Component"],
        ["Minimalista, pero vivo", "Minimal, but alive"],
        ["Esta vista previa refleja tokens reales (radio/relleno/sombra/desenfoque). Diseño limpio con intención.", "This preview reflects real tokens (radius/padding/shadow/blur). Clean design with intent."],
        ["Activar microinteracción", "Trigger micro-interaction"],

        // Contact
        ["CONTACTO", "CONTACT"],
        ["Cuéntame qué quieres construir: portafolio, landing, interfaz de producto, rediseño o colaboración puntual. Te respondo con una ruta clara para avanzar.", "Tell me what you want to build: a portfolio, landing page, product interface, redesign, or focused collaboration. I will reply with a clear path forward."],
        ["Ubicación", "Location"],
        ["Enlaces sociales", "Social links"],
        ["FORMULARIO DE CONTACTO", "CONTACT FORM"],
        ["Tu nombre", "Your name"],
        ["Tu teléfono", "Your phone"],
        ["Tu correo", "Your email"],
        ["Temas rápidos", "Quick topics"],
        ["Mensaje", "Message"],
        ["ENVIAR MENSAJE", "SEND MESSAGE"],
        ["Paso 01", "Step 01"],
        ["Paso 02", "Step 02"],
        ["Paso 03", "Step 03"],
        ["Paso 04", "Step 04"],
        ["Cuenta la idea", "Share the idea"],
        ["Describe qué quieres construir, para quién es, qué problema resuelve y qué páginas o secciones tienes en mente.", "Describe what you want to build, who it is for, what problem it solves, and which pages or sections you have in mind."],
        ["Envía referencias", "Send references"],
        ["Comparte enlaces, imágenes, colores, logos, fotos o sitios que te gusten. Eso acelera la dirección visual del proyecto.", "Share links, images, colors, logos, photos, or sites you like. This speeds up the project's visual direction."],
        ["Define la prioridad", "Define the priority"],
        ["Puede ser lanzar rápido, pulir una marca, mejorar responsive, crear una demo o dejar una base lista para escalar.", "It may be launching quickly, polishing a brand, improving responsiveness, creating a demo, or leaving a foundation ready to scale."],
        ["Empezamos con claridad", "We start with clarity"],
        ["Con esa información puedo responder con una ruta: alcance, páginas, interacciones, tiempos aproximados y siguientes pasos.", "With that information I can reply with a path: scope, pages, interactions, estimated timing, and next steps."],
        ["Preguntas rápidas", "Quick questions"],
        ["¿Qué necesito para empezar?", "What do I need to get started?"],
        ["Una idea base, referencias visuales y el contenido principal. Si falta algo, lo organizamos.", "A basic idea, visual references, and the main content. If anything is missing, we will organize it."],
        ["¿También haces responsive?", "Do you also build responsive layouts?"],
        ["Sí. La experiencia se ajusta para escritorio, tablet y móvil desde la estructura del CSS.", "Yes. The experience adapts to desktop, tablet, and mobile from the CSS structure."],
        ["¿Puedes trabajar sobre código existente?", "Can you work on existing code?"],
        ["Sí. Puedo ordenar estilos, corregir el layout, mejorar interacciones y dejar una base más mantenible.", "Yes. I can organize styles, fix layout, improve interactions, and leave a more maintainable foundation."],
        ["¿Cuánto detalle debo enviar?", "How much detail should I send?"],
        ["Cuanto más contexto tengas, mejor: objetivo, fecha, referencias, páginas, tipo de usuario, marca y contenido disponible.", "The more context you have, the better: objective, date, references, pages, user type, brand, and available content."],
        ["¿Cómo respondes el mensaje?", "How do you respond to the message?"],
        ["Puedo responder con una propuesta de estructura, lista de entregables, preguntas importantes y una ruta para empezar sin rodeos.", "I can reply with a proposed structure, deliverables list, important questions, and a straightforward path to get started."],
        ["GUÍA PARA EL BRIEF", "BRIEF GUIDE"],
        ["Datos que ayudan a cotizar mejor", "Information that helps estimate better"],
        ["Objetivo", "Goal"],
        ["Cuenta si quieres vender, presentar una marca, mostrar proyectos, captar contactos, lanzar una demo o mejorar un sitio actual.", "Share whether you want to sell, present a brand, showcase projects, capture leads, launch a demo, or improve an existing site."],
        ["Alcance", "Scope"],
        ["Indica cuántas páginas necesitas, qué secciones son obligatorias y si quieres efectos, formularios, galerías o dashboards.", "Specify how many pages you need, which sections are required, and whether you want effects, forms, galleries, or dashboards."],
        ["Material", "Assets"],
        ["Logo, fotos, textos, colores, redes, enlaces y referencias visuales permiten acelerar la construcción y mantener la identidad.", "Logo, photos, copy, colors, social profiles, links, and visual references speed up the build and preserve identity."],
        ["Fecha", "Timing"],
        ["Una fecha objetivo ayuda a priorizar: versión esencial para publicar, versión completa o mejoras por fases.", "A target date helps prioritize: an essential version to publish, a complete version, or phased improvements."],
        ["Hola, quiero crear un portafolio multipágina con animaciones y contacto.", "Hi, I want to create a multi-page portfolio with animations and contact."],
        ["Hola, necesito una landing clara para presentar un servicio o marca.", "Hi, I need a clear landing page to present a service or brand."],
        ["Hola, quiero mejorar una interfaz existente con mejor responsive e interactividad.", "Hi, I want to improve an existing interface with better responsiveness and interactivity."],
        ["Hola, quiero colaborar en una interfaz o proyecto web con apoyo frontend.", "Hi, I want to collaborate on an interface or web project with frontend support."],
        ["Hola, necesito un dashboard o pantalla de producto con componentes interactivos.", "Hi, I need a dashboard or product screen with interactive components."],
        ["Hola, quiero revisar mi página actual y detectar mejoras visuales, responsive y de código.", "Hi, I want to review my current page and identify visual, responsive, and code improvements."],

        // Form and dynamic feedback
        ["Escribe tu nombre (mínimo 2 caracteres).", "Please enter your name (min 2 characters)."],
        ["Escribe un correo válido.", "Please enter a valid email address."],
        ["Escribe un mensaje (mínimo 10 caracteres).", "Please write a message (min 10 characters)."],
        ["Enviando…", "Sending…"],
        ["Mensaje enviado. Te responderé pronto.", "Message sent. I will reply soon."],
        ["No se pudo enviar. Inténtalo de nuevo o escríbeme por WhatsApp.", "Could not send. Try again or contact me on WhatsApp."],
        ["No se pudo conectar. Inténtalo de nuevo.", "Could not connect. Please try again."],
        ["Nuevo mensaje desde el sitio web de FOXDEV", "New message from FOXDEV website"],
        ["Formulario de contacto del sitio web", "Website Contact Form"]
        ,
        // Existing JavaScript-generated interface copy
        ["Identidad visual FOXDEV.", "FOXDEV visual identity."],
        ["Monograma / isotipo.", "Monogram / brand symbol."],
        ["Logo tipo firma.", "Signature-style logo."],
        ["Proyecto 01", "Project 01"],
        ["Proyecto 02", "Project 02"],
        ["Proyecto 03", "Project 03"],
        ["Proyecto 04", "Project 04"],
        ["Proyecto 05", "Project 05"],
        ["Proyecto 06", "Project 06"],
        ["Proyecto 07", "Project 07"],
        ["Proyecto 08", "Project 08"],
        ["Descripción del proyecto 01.", "Project 01 description."],
        ["Descripción del proyecto 02.", "Project 02 description."],
        ["Descripción del proyecto 03.", "Project 03 description."],
        ["Descripción del proyecto 04.", "Project 04 description."],
        ["Descripción del proyecto 05.", "Project 05 description."],
        ["Descripción del proyecto 06.", "Project 06 description."],
        ["Descripción del proyecto 07.", "Project 07 description."],
        ["Descripción del proyecto 08.", "Project 08 description."],
        ["Mostrando todos los proyectos", "Showing all projects"],
        ["Habilidad seleccionada.", "Skill selected."],
        ["Enfoque", "Focus"],
        ["Estructura clara, encabezados ordenados y contenido legible para usuarios y buscadores.", "Clear structure, ordered headings, and readable content for users and search engines."],
        ["Componentes visuales reutilizables, baja especificidad y responsive sin pelear con el layout.", "Reusable visual components, low specificity, and responsiveness without fighting the layout."],
        ["Interacciones no intrusivas: menús, modales, filtros, formularios y estados vivos.", "Non-intrusive interactions: menus, modals, filters, forms, and living states."],
        ["Pantallas que se adaptan a escritorio, tablet y móvil sin perder jerarquía visual.", "Screens that adapt to desktop, tablet, and mobile without losing visual hierarchy."],
        ["Detalles de hover, foco, ondas, revelado y respuesta para que la interfaz se sienta viva.", "Hover, focus, ripple, reveal, and feedback details that make the interface feel alive."],
        ["Contraste, foco visible, etiquetas, botones reales y navegación por teclado.", "Contrast, visible focus, labels, real buttons, and keyboard navigation."],
        ["Tokens, componentes base y reglas visuales para escalar sin desorden.", "Tokens, base components, and visual rules for scaling without disorder."],
        ["Recursos cuidados, JS ligero y estructura simple para cargar rápido.", "Optimized assets, lightweight JS, and a simple structure for fast loading."],
        ["Landing esencial", "Essential landing page"],
        ["1 semana", "1 week"],
        ["Producto interactivo", "Interactive product"],
        ["3-5 semanas", "3-5 weeks"],
        ["UI interactiva", "Interactive UI"],
        ["Pulido responsive", "Responsive polish"],
        ["Modales, filtros, estimadores, estados y detalles que hacen que la página se sienta viva.", "Modals, filters, estimators, states, and details that make the page feel alive."],
        ["Ajustes finos para que cada bloque conserve jerarquía en escritorio, tablet y móvil.", "Fine adjustments so every block preserves hierarchy on desktop, tablet, and mobile."],
        ["Auditoría frontend", "Frontend audit"],
        ["Reviso tu UI actual y detecto problemas de layout, responsive, accesibilidad y consistencia.", "I review your current UI and identify layout, responsiveness, accessibility, and consistency issues."],
        ["Reporte accionable", "Actionable report"],
        ["Prioridades visuales", "Visual priorities"],
        ["Plan de mejora", "Improvement plan"],
        ["Soporte de lanzamiento", "Launch support"],
        ["Te acompaño en el cierre para pulir detalles, probar flujos y dejar la página lista para publicar.", "I support the final stage to polish details, test flows, and leave the page ready to publish."],
        ["QA visual", "Visual QA"],
        ["Ajustes finales", "Final adjustments"],
        ["Lista de salida", "Launch checklist"],
        ["Tranquilo", "Calm"],
        ["Explorando", "Exploring"],
        ["Comprometido", "Engaged"],
        ["Enfocado", "Focused"],
        ["Usuario avanzado", "Power user"],
        ["inactivo", "idle"],
        ["Consejo: intenta abrir un modal de proyecto o cambiar el tema.", "Tip: try opening a project modal or toggle the theme."],
        ["Este panel se actualiza en tiempo real según cómo interactúas.", "This panel updates in real time based on how you interact."],
        ["Reanudar", "Resume"],
        ["Pausado.", "Paused."],
        ["Colaboración", "Collaboration"],
        ["Puntuación", "Score"],
        ["Flujo", "Flow"],
        ["Laboratorio", "Sandbox"],
        ["El flujo se actualiza mientras navegas.", "Flow is updating as you navigate."],
        ["Pausado. Reanuda para continuar actualizando.", "Paused. Resume to keep updating."],
        ["Flujo reanudado.", "Flow resumed."],
        ["Microinteracción activada.", "Interaction fired."],
        ["Dock Fox abierto", "Fox dock open"],
        ["Dock Fox cerrado", "Fox dock closed"],
        ["Modo enfoque activo", "Focus mode on"],
        ["Modo enfoque desactivado", "Focus mode off"],
        ["Correo copiado", "Email copied"],
        ["Escribe un mensaje corto.", "Please write a short message."],
        ["Falta la dirección de envío del formulario.", "Form endpoint is missing (action)."],
        ["Mensaje enviado correctamente. ¡Gracias!", "Message sent successfully. Thanks!"],
        ["No se pudo enviar. Inténtalo de nuevo.", "Could not send. Please try again."],
        ["Error de red. Revisa tu conexión e inténtalo de nuevo.", "Network error. Please check your connection and try again."]
        ,
        // Exact legacy copy variants kept by the original project
        ["FoxDev. Todos los derechos reservados.", "FoxDev. All rights reserved."],
        ["Botones con ripple, reveal al hacer scroll, cambio de tema, indicadores activos y feedback visual para que la pagina no se sienta estatica.", "Buttons with ripple effects, scroll reveal, theme switching, active indicators, and visual feedback so the page does not feel static."],
        ["DESARROLLADOR", "DEVELOPER"],
        ["Descargar CV", "Download Resume"],
        ["El home presenta la marca FOX Developer con una entrada fuerte, fondo fotografico, logotipo, contraste oscuro y una jerarquia pensada para verse premium sin sentirse cargada.", "The home page presents the FOX Developer brand with a strong entrance, photographic background, logo, dark contrast, and a hierarchy designed to feel premium without feeling crowded."],
        ["La experiencia ahora esta separada por paginas: About, Projects, Services, Collabs y Contact. Cada ruta tiene informacion propia y conserva la misma identidad.", "The experience is now split into pages: About, Projects, Services, Collabs, and Contact. Each route has its own information and preserves the same identity."],
        ["Los llamados a la accion conectan con proyectos, CV, formulario y WhatsApp para que un visitante pueda pasar de mirar el portfolio a iniciar una conversacion.", "Calls to action connect to projects, the résumé, the form, and WhatsApp so a visitor can move from viewing the portfolio to starting a conversation."],
        ["Que botones, enlaces, labels, contraste y foco sean utilizables, especialmente en formularios, navegacion y modales.", "That buttons, links, labels, contrast, and focus are usable, especially in forms, navigation, and modals."],
        ["Que los assets esten controlados, el JavaScript sea ligero y la pagina cargue rapido sin depender de efectos innecesarios.", "That assets are controlled, JavaScript stays lightweight, and the page loads quickly without relying on unnecessary effects."],
        ["Resume la identidad principal, muestra metricas, enfoque actual, perfil rapido y accesos directos a los puntos importantes del portfolio.", "Summarizes the main identity, showing metrics, current focus, a quick profile, and direct access to the portfolio's key areas."],
        ["Soy Sebastian Fox, frontend developer enfocado en interfaces visuales, micro-interactions y experiencias web que se sienten pulidas desde el primer click.", "I am Sebastian Fox, a frontend developer focused on visual interfaces, micro-interactions, and web experiences that feel polished from the first click."],
        ["Copiar", "copy"],
        ["Saltar", "Jump"],
        ["Escanear", "Scan"],
        ["DESPLAZAR", "SCROLL"],
        ["Resumen", "Brief"],
        ["¿Como tomo decisiones visuales?", "How do I make visual decisions?"],
        ["Componentes con regla", "Rule-based components"],
        ["Construyo interfaces que combinan diseño, estructura y micro-interactions. Mi objetivo es que cada pantalla sea clara, rápida y memorable.", "I build interfaces that combine design, structure, and micro-interactions. My goal is for every screen to be clear, fast, and memorable."],
        ["Frontend con detalle visual y criterio de producto.", "Frontend development with visual detail and product judgment."],
        ["Las animaciones tienen que dar feedback, revelar jerarquia o hacer mas agradable una accion; si no ayuda, se reduce.", "Animations must provide feedback, reveal hierarchy, or make an action more pleasant; if they do not help, they are reduced."],
        ["Las tarjetas, botones, inputs, paneles y estados se construyen con patrones repetibles para que el sitio sea facil de ampliar.", "Cards, buttons, inputs, panels, and states are built with repeatable patterns so the site is easy to extend."],
        ["Microinteracciones", "Micro-interactions"],
        ["Portfolios, marcas personales, landings de servicios, dashboards conceptuales y sitios donde las microinteracciones hacen que la marca se sienta mas viva.", "Portfolios, personal brands, service landing pages, conceptual dashboards, and sites where micro-interactions make the brand feel more alive."],
        ["Principio", "Principle"],
        ["¿Que busco en una interfaz?", "What do I look for in an interface?"],
        ["¿Que entrego ademas del codigo?", "What do I deliver besides code?"],
        ["¿Que tipo de proyectos disfruto?", "What kind of projects do I enjoy?"],
        ["Mezclar stack", "Shuffle stack"],
        ["STACK", "STACK"],
        ["Sistema", "System"],
        ["LÍNEA DE TIEMPO", "TIMELINE"],
        ["Trabajo con espacios, radios, bordes, sombras y tipografia como un sistema para que cada pagina parezca parte de la misma experiencia.", "I use spacing, radii, borders, shadows, and typography as a system so every page feels like part of the same experience."],
        ["Confianza", "Trust"],
        ["Una buena pantalla deja claro que ofrece, por que importa y cual es el siguiente paso sin obligar al usuario a adivinar.", "A good screen makes it clear what it offers, why it matters, and what the next step is without forcing the user to guess."],
        ["Una estructura entendible, assets organizados, rutas claras, contenido distribuido por pagina y recomendaciones para seguir creciendo el sitio.", "A clear structure, organized assets, clear routes, content distributed by page, and recommendations for continuing to grow the site."],
        ["Uso referencias, mood, contraste, jerarquia y tipo de usuario. Cada color, espacio o animacion tiene que apoyar una intencion.", "I use references, mood, contrast, hierarchy, and user type. Every color, space, or animation must support an intention."],
        ["Animaciones suaves, feedback visual y controles que no distraen del contenido principal.", "Smooth animations, visual feedback, and controls that do not distract from the main content."],
        ["Código", "Code"],
        ["Defino hero, ritmo de secciones, uso de imagenes, contraste, tarjetas, botones y detalles de movimiento para que la pagina tenga direccion.", "I define the hero, section rhythm, image use, contrast, cards, buttons, and motion details so the page has direction."],
        ["Divido componentes, mantengo estilos reutilizables, cuido rutas de assets y dejo interacciones en JavaScript para que el HTML siga limpio.", "I divide components, keep styles reusable, protect asset paths, and leave interactions in JavaScript so the HTML stays clean."],
        ["La division multipagina ayuda a mostrar informacion sin saturar una sola landing y permite crecer secciones por separado.", "The multi-page structure helps present information without overcrowding a single landing page and allows sections to grow independently."],
        ["Publicar", "Launch"],
        ["Los casos conectan servicios, contacto y colaboraciones para que el portfolio no solo se vea bien, tambien genere conversacion.", "Cases connect services, contact, and collaborations so the portfolio not only looks good but also starts conversations."],
        ["Pagina de conversion con hero inmersivo, scroll reveal y CTA claros.", "Conversion page with an immersive hero, scroll reveal, and clear calls to action."],
        ["Paginas separadas, nav activa, footer consistente, formularios, filtros, modal y controles que se pueden extender con mas contenido.", "Separate pages, active navigation, consistent footer, forms, filters, modal, and controls that can be extended with more content."],
        ["Que valor demuestra el portfolio", "What value the portfolio demonstrates"],
        ["Rutas organizadas, assets locales y estructura facil de mover a hosting.", "Organized routes, local assets, and a structure that is easy to move to hosting."],
        ["Secciones reducidas, mensaje principal fuerte, CTA visibles y suficiente informacion para que una marca pueda captar clientes.", "Focused sections, a strong main message, visible calls to action, and enough information for a brand to attract clients."],
        ["Uso del logo, isotipo y fotografia oscura para construir una presencia reconocible, elegante y coherente en todas las paginas.", "The logo, brand symbol, and dark photography create a recognizable, elegant, and coherent presence across all pages."],
        ["Adaptacion para desktop, tablet y movil, cuidando que textos, tarjetas, botones e imagenes mantengan jerarquia y no se monten.", "Adaptation for desktop, tablet, and mobile, ensuring text, cards, buttons, and images preserve hierarchy without overlapping."],
        ["Assets organizados, HTML limpio, CSS estructurado, JS separado y recomendaciones para publicar o continuar el proyecto.", "Organized assets, clean HTML, structured CSS, separate JavaScript, and recommendations for publishing or continuing the project."],
        ["Chequeo de enlaces, contraste, legibilidad, responsive, formularios, modales, scroll y comportamiento de tema claro/oscuro.", "Review of links, contrast, readability, responsiveness, forms, modals, scroll, and light/dark theme behavior."],
        ["Home, proyectos, contacto, animaciones y una estructura lista para crecer.", "Home, projects, contact, animations, and a structure ready to grow."],
        ["Incluido", "Included"],
        ["Marca personal", "Personal brand"],
        ["Mejoras de CSS, estructura, responsive, accesibilidad y pulido de UI existente.", "CSS, structure, responsiveness, accessibility, and existing UI polish."],
        ["Oferta clara", "Clear offer"],
        ["Orden visual", "Visual order"],
        ["Paginas HTML organizadas, CSS centralizado, JavaScript separado, assets locales y rutas faciles de mantener.", "Organized HTML pages, centralized CSS, separate JavaScript, local assets, and maintainable routes."],
        ["Profesional", "Pro"],
        ["¿Que necesito enviarte?", "What do I need to send you?"],
        ["¿Que pasa si no tengo todo el contenido?", "What if I do not have all the content?"],
        ["Scroll reveal, estados hover, filtros, sliders, modales, feedback de formulario y detalles que hacen que la interfaz responda al usuario.", "Scroll reveal, hover states, filters, sliders, modals, form feedback, and details that make the interface respond to the user."],
        ["¿Se puede agregar mas de una pagina?", "Can more than one page be added?"],
        ["Si. El sistema esta preparado para paginas independientes como Home, About, Projects, Services, Collabs y Contact.", "Yes. The system is ready for independent pages such as Home, About, Projects, Services, Collabs, and Contact."],
        ["Si. Puedo trabajar sobre un sitio existente para corregir responsive, mejorar estilos, ordenar CSS, sumar animaciones o limpiar estructura.", "Yes. I can work on an existing site to fix responsiveness, improve styles, organize CSS, add animations, or clean up the structure."],
        ["Starter incluye una landing pulida, responsive, SEO base y formulario.", "Starter includes a polished landing page, responsive design, basic SEO, and a form."],
        ["¿Tambien puedo pedir solo mejoras?", "Can I request improvements only?"],
        ["De idea a pantalla", "From idea to screen"],
        ["Detecto inconsistencias de spacing, color, jerarquia, alineacion y responsive para dejar una interfaz mas profesional.", "I detect inconsistencies in spacing, color, hierarchy, alignment, and responsiveness to create a more professional interface."],
        ["Feedback puntual", "Focused feedback"],
        ["Traspaso", "Handoff"],
        ["Numero de paginas, secciones, formularios, efectos, contenido y fecha objetivo. Mientras mas claro sea el alcance, mas rapido se avanza.", "Number of pages, sections, forms, effects, content, and target date. The clearer the scope, the faster the work moves."],
        ["Entregar", "Ship"],
        ["total", "total"],
        ["Empezamos con claridad", "We start with clarity"],
        ["¿Como respondes el mensaje?", "How do you respond to the message?"],
        ["Comparte links, imagenes, colores, logos, fotos o sitios que te gusten. Eso acelera la direccion visual del proyecto.", "Share links, images, colors, logos, photos, or sites you like. This speeds up the project's visual direction."],
        ["¿Cuanto detalle debo mandar?", "How much detail should I send?"],
        ["Cuenta si quieres vender, presentar marca, mostrar proyectos, captar contactos, lanzar una demo o mejorar un sitio actual.", "Share whether you want to sell, present a brand, showcase projects, capture leads, launch a demo, or improve an existing site."],
        ["Cuéntame que quieres construir: portfolio, landing, interfaz de producto, rediseño o colaboración puntual. Te respondo con una ruta clara para avanzar.", "Tell me what you want to build: a portfolio, landing page, product interface, redesign, or focused collaboration. I will reply with a clear path forward."],
        ["Define prioridad", "Define the priority"],
        ["Correo electrónico", "E-mail"],
        ["PREGUNTAS FRECUENTES", "FAQ"],
        ["Logo, fotos, textos, colores, redes, links y referencias visuales permiten acelerar la construccion y mantener la identidad.", "Logo, photos, copy, colors, social profiles, links, and visual references speed up the build and preserve identity."],
        ["Mientras mas contexto tengas, mejor: objetivo, fecha, referencias, paginas, tipo de usuario, marca y contenido disponible.", "The more context you have, the better: objective, date, references, pages, user type, brand, and available content."],
        ["¿Puedes trabajar sobre codigo existente?", "Can you work on existing code?"],
        ["¿Que necesito para empezar?", "What do I need to get started?"],
        ["Si. La experiencia se ajusta para desktop, tablet y movil desde la estructura del CSS.", "Yes. The experience adapts to desktop, tablet, and mobile from the CSS structure."],
        ["Si. Puedo ordenar estilos, corregir layout, mejorar interacciones y dejar una base mas mantenible.", "Yes. I can organize styles, fix layout, improve interactions, and leave a more maintainable foundation."],
        ["¿Tambien haces responsive?", "Do you also build responsive layouts?"],
        ["Te puedo contestar con una propuesta de estructura, lista de entregables, dudas importantes y una ruta para empezar sin vueltas.", "I can reply with a proposed structure, deliverables list, important questions, and a straightforward path to get started."],
        ["Soy Sebastian Fox, frontend developer enfocado en interfaces visuales, micro-interacciones y experiencias web que se sienten pulidas desde el primer click.", "I am Sebastian Fox, a frontend developer focused on visual interfaces, micro-interactions, and web experiences that feel polished from the first click."],
        ["Construyo interfaces que combinan diseño, estructura y micro-interacciones. Mi objetivo es que cada pantalla sea clara, rápida y memorable.", "I build interfaces that combine design, structure, and micro-interactions. My goal is for every screen to be clear, fast, and memorable."],
        ["Arrancamos claro", "We start with clarity"]
        ,
        // Exact SEO descriptions from each page
        ["Portafolio frontend de FOX Developer con diseño UI, microinteracciones y experiencias web.", "FOX Developer frontend portfolio with UI design, micro-interactions, and web experiences."],
        ["Desarrollador frontend y diseñador UI.", "Frontend developer and UI designer."],
        ["Sobre Sebastian Fox, desarrollador frontend y diseñador UI.", "About Sebastian Fox, frontend developer and UI designer."],
        ["Perfil, stack y forma de trabajo de FOX Developer.", "FOX Developer profile, stack, and workflow."],
        ["Proyectos de FOX Developer con carrusel visual y modal interactivo.", "FOX Developer projects with a visual carousel and interactive modal."],
        ["Portafolio frontend de FOX Developer.", "FOX Developer frontend portfolio."],
        ["Servicios frontend de FOX Developer: portafolios, landings, interfaces y refactorización visual.", "FOX Developer frontend services: portfolios, landing pages, interfaces, and visual refactoring."],
        ["Servicios frontend y estimador interactivo.", "Frontend services and interactive estimator."],
        ["Colaboración con FOX Developer mediante paneles interactivos, analítica en vivo y laboratorio de componentes.", "Collaboration with FOX Developer through interactive panels, live analytics, and a component sandbox."],
        ["Colaboraciones y experimentos interactivos de FOX Developer.", "FOX Developer collaborations and interactive experiments."]
    ];

    const translationLookup = new Map();
    let currentLanguage = DEFAULT_LANGUAGE;
    let languageObserver = null;

    function normalizeLookupKey(value) {
        return value
            .trim()
            .toLocaleLowerCase("es")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[¿?¡!]/g, "");
    }

    translationEntries.forEach(([spanish, english]) => {
        const translation = { es: spanish, en: english };
        translationLookup.set(normalizeLookupKey(spanish), translation);
        translationLookup.set(normalizeLookupKey(english), translation);
    });

    function getStoredLanguage() {
        const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
        return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
    }

    function translateValue(value, language = currentLanguage) {
        if (typeof value !== "string") return value;

        const leadingSpace = value.match(/^\s*/)?.[0] || "";
        const trailingSpace = value.match(/\s*$/)?.[0] || "";
        const normalizedValue = value.trim();
        const translation = translationLookup.get(normalizeLookupKey(normalizedValue));

        if (!translation) return value;
        return `${leadingSpace}${translation[language]}${trailingSpace}`;
    }

    function translateTextNode(textNode) {
        const translatedText = translateValue(textNode.nodeValue);
        if (translatedText !== textNode.nodeValue) {
            textNode.nodeValue = translatedText;
        }
    }

    function translateElement(element) {
        if (!(element instanceof Element)) return;

        TRANSLATABLE_ATTRIBUTES.forEach((attributeName) => {
            if (!element.hasAttribute(attributeName)) return;
            const currentValue = element.getAttribute(attributeName);
            const translatedValue = translateValue(currentValue);
            if (translatedValue !== currentValue) {
                element.setAttribute(attributeName, translatedValue);
            }
        });

        Array.from(element.childNodes).forEach((childNode) => {
            if (childNode.nodeType === Node.TEXT_NODE) {
                translateTextNode(childNode);
            } else if (childNode.nodeType === Node.ELEMENT_NODE) {
                translateElement(childNode);
            }
        });
    }

    function updateLanguageSwitch() {
        document.querySelectorAll(".LanguageSwitch-option").forEach((button) => {
            const isActive = button.dataset.language === currentLanguage;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    function applyLanguage(language) {
        if (!SUPPORTED_LANGUAGES.includes(language)) return;

        currentLanguage = language;
        document.documentElement.lang = language;
        document.body.dataset.language = language;
        translateElement(document.documentElement);
        updateLanguageSwitch();
        localStorage.setItem(LANGUAGE_KEY, language);

        window.dispatchEvent(new CustomEvent("foxlanguagechange", {
            detail: { language }
        }));
    }

    function languageClickHandler(event) {
        const selectedLanguage = event.currentTarget.dataset.language;
        applyLanguage(selectedLanguage);
    }

    function createLanguageSwitch() {
        const themeButton = document.getElementById("themeBtn");
        if (!themeButton || document.querySelector(".LanguageSwitch")) return;

        const languageSwitch = document.createElement("div");
        languageSwitch.className = "LanguageSwitch";
        languageSwitch.setAttribute("role", "group");
        languageSwitch.setAttribute("aria-label", "Cambiar idioma");
        languageSwitch.innerHTML = `
            <button class="LanguageSwitch-option" type="button" data-language="es" aria-pressed="false" title="Español">ES</button>
            <span class="LanguageSwitch-divider" aria-hidden="true"></span>
            <button class="LanguageSwitch-option" type="button" data-language="en" aria-pressed="false" title="English">EN</button>
        `;

        themeButton.parentElement.insertBefore(languageSwitch, themeButton);
        languageSwitch.querySelectorAll(".LanguageSwitch-option").forEach((button) => {
            button.addEventListener("click", languageClickHandler);
        });
    }

    function mutationHandler(mutations) {
        mutations.forEach((mutation) => {
            if (mutation.type === "characterData") {
                translateTextNode(mutation.target);
                return;
            }

            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    translateTextNode(node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    translateElement(node);
                }
            });
        });
    }

    function initializeLanguage() {
        currentLanguage = getStoredLanguage();
        createLanguageSwitch();
        applyLanguage(currentLanguage);

        languageObserver = new MutationObserver(mutationHandler);
        languageObserver.observe(document.body, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }

    window.FoxI18n = {
        getLanguage: () => currentLanguage,
        setLanguage: applyLanguage,
        t: (value) => translateValue(value)
    };

    initializeLanguage();
})();
