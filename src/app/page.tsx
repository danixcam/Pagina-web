'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Verificar si ya hay una sesión activa al cargar la página
  useEffect(() => {
    const savedAuth = localStorage.getItem('agiru-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setCurrentUser(authData.username);
      setUserRole(authData.role);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // Simular validación de credenciales
    setTimeout(() => {
      const validUsers = [
        { username: 'Emily', password: 'admin2025', role: 'administracion' },
        { username: 'Rodrigo', password: 'prod2025', role: 'produccion' },
        { username: 'Fernando', password: 'nano2025', role: 'gerencia' },
        { username: 'Daniela', password: 'dan2025', role: 'gestion' },
        { username: 'invitado', password: 'invitado2025', role: 'invitado' },
      ];

      const user = validUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user.username);
        setUserRole(user.role);
        localStorage.setItem('agiru-auth', JSON.stringify({
          username: user.username,
          role: user.role,
          timestamp: new Date().getTime()
        }));
      } else {
        setLoginError('Usuario o contraseña incorrectos');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setCurrentUser('');
    setUserRole('');
    localStorage.removeItem('agiru-auth');
  };

  // Función para redirigir a carpetas de OneDrive
  const redirectToOneDrive = (carpeta: string) => {
    // Enlaces reales de tus carpetas de OneDrive
    const enlaces: { [key: string]: string } = {
      // PLANTACION
      'historico-antes-de-2025': 'https://1drv.ms/f/c/092e39edf7b9ea99/ElIubDi-PlpAp3zW9TP55h8BBSRCpYkxuTshu8F7UruV9A?e=o8lsN1',
      'propiedad': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ep7Sh3wa9-ZNroCBnJXxVAYBOluaOnizaCe--NcXa_996A?e=yuEsD0',
      
      // PLANTA
      'almacen': 'https://1drv.ms/f/c/092e39edf7b9ea99/EnlE7wF0eBhArVaqhXxnymEBbxzq_2y6X7GNf-kieXY3Tw?e=oBo1na',
      'mantenimiento-de-equipos': 'https://1drv.ms/f/c/092e39edf7b9ea99/EuMSSTakqQtOmh_GQWNuDHgBHP3N_GbbbPO7UcvnuWNVuA?e=MVDDw5',
      'produccion': 'https://1drv.ms/f/c/092e39edf7b9ea99/EglYlVkhQlJDtnk1VpJ_9h8BeIFIiYFyXgD9E9qZbC96BQ?e=eH3V8V',
      
      // LOGÍSTICA
      'compra-abastecimiento-insumos-planta': 'https://1drv.ms/f/c/092e39edf7b9ea99/EuSmBU0d3LlOmcKxD9lfCwYB83Qh4LoTAXxExYBSJikhBQ?e=7lMj8f',
      'cotizaciones-activos-infraestructura': 'https://1drv.ms/f/c/092e39edf7b9ea99/EtISskJw5ydFmF-TlRwSC7cBLetUs-SwtT9ezpEcn874Cg?e=Xqlbm9',
      'distribucio-transporte': 'https://1drv.ms/f/c/092e39edf7b9ea99/EnfmdmrT-xJOv9k314ozZLoBnnyZ3_I6qMlrAs6r1VBBgg?e=rjnwmx',
      'proveedores': 'https://1drv.ms/f/c/092e39edf7b9ea99/EhzWrMgD91ZGmkX-NoHsbv4BLZF79ZT6EobQYgfLMAnM1w?e=2I9C6e',

      // CALIDAD
      'calidad-seguridad': 'https://1drv.ms/f/c/092e39edf7b9ea99/EtK6Mnk8H6dNpe52C_0d6fMBTkVLyi9-oE7hHEwQPYEJKA?e=cvjXZ2',
      'certificaciones': 'https://1drv.ms/f/c/092e39edf7b9ea99/EmTjp_LUBK1FqVFtVqPkJCkBHeMpSJmu3CnOrErvnpzCHg?e=npvQbP',
      'fichas-tecnicas': 'https://1drv.ms/f/c/092e39edf7b9ea99/EuVUAXKJXqZHh3SPLlOuaZsB3-zXaj-QgBU-ztJGAMTJRw?e=YvrcTd',
      'normas': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eoor7JGq5e9JhnIcVz0bPToB3QWiKaq1P_0mX_kIfe22Iw?e=hQX5IH',
      
      // ADMINISTRACIÓN
      '2024-ad': 'https://1drv.ms/f/c/092e39edf7b9ea99/EmKkcM3A0s1JvF-4n0deKIgBFpCOimNTlM1g_4m-Ds6OQg?e=0PMVRA',
      '2025-ad': 'https://1drv.ms/f/c/092e39edf7b9ea99/Elh1ozrRgctIrJ3WAZzYnpcBf3evTJ70w6puQyhyIjnQg?e=KgkKDx',
      
      // RECURSOS HUMANOS
      '2024-rh': 'https://1drv.ms/f/c/092e39edf7b9ea99/EjkuxkYK1xZLhmZbUCmwgkwBnlvIEs0VRW91UTdaavx8KA?e=UTGcHW',
      'afiliaciones': 'https://1drv.ms/f/c/092e39edf7b9ea99/Epk-ygeYVZpPv7C_nsrTdbwBPF16Xec2g_4HIn8OHE3eyQ?e=Bv6YCR',
      'capacitaciones': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ek2Lzcd1zjtGtKUqi-luoDgBZGw10pM1r671q1wylO24xw?e=MepnE9',
      'cns': 'https://1drv.ms/f/c/092e39edf7b9ea99/EjJ3NIiYvrtPp7CMFpe7EXYBqjMuRK-FLD_PMlgI9hmGSw?e=MSWMGa',
      'contratos': 'https://1drv.ms/f/c/092e39edf7b9ea99/EjWHT85jGiNIk2YFWUYqgE4BikkgamwpUvHh3Y4PNiC36A?e=7jbb0l',
      'credenciales': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ev7ENG3JGElJof6MoF5j4GcBbbZ_8xxaRE_LU-LhZS2gqg?e=JZftif',
      'file-personal': 'https://1drv.ms/f/c/092e39edf7b9ea99/EmtTiRRPtzRGh0OBkg-yzwkB04wXhnYYqzcL8qsR52dHqQ?e=SHuyo5',
      'pago-cargos-socailes': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eq9lotGZLXlLhW55QSTJ89cByW71gN1mINDPA6pbzBOsIw?e=D9Lj5F',
      'planillas-asistencia': 'https://1drv.ms/f/c/092e39edf7b9ea99/EqA4Rm2W3pVIjnQ-rCJv1ykBim0JxDn-c0XCr70yR-96nw?e=hGBX2a',
      'planilla-fiscal': 'https://1drv.ms/f/c/092e39edf7b9ea99/EhocSMxWyAJErWO1AEqOtbYBoYP4_AXtbBMjj_THj6GOlA?e=XFKnYL',
      'planillas-generales': 'https://1drv.ms/f/c/092e39edf7b9ea99/EtN_Yc6p29NNjkolwFEYNvIBgnn3VzylJYe1FUuq_Wx2rw?e=l0wXxp',
      'trabajopolis': 'https://1drv.ms/f/c/092e39edf7b9ea99/EgLtgPKbMh1NlBodAatSlEsBQPTMHSsripaGCN6hm3FN-w?e=Z0VqkS',

      // MARKETING
      'catalogos': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ep0eTfc8NGFGsV6mDqqxLEEBhTXbrkkF1vAV8VB51uaetQ?e=df6lKb',
      'estudio-mercado-grenia': 'https://1drv.ms/f/c/092e39edf7b9ea99/EmPTCiUz_UxBo8OZ_mVTp80BN9B1NcPaku_JvvLAxtwkag?e=U9oIhC',
      'etiquetas': 'https://1drv.ms/f/c/092e39edf7b9ea99/EuhhX6B70A5Orktv0pkqiN4BfUQzhLS6VYvlgjHudwpznA?e=0TalJn',
      'ferias': 'https://1drv.ms/f/c/092e39edf7b9ea99/EqOgfxlr26ZGv2nF0S4lNsgB4nGsvvm7yTmMHt-w-kwMsg?e=ViVofg',
      'folletos-volantes-tripticos': 'https://1drv.ms/f/c/092e39edf7b9ea99/EpptkM2quq1NgObdcy66utEBGs_SkIJ63KsYewlHUCSoOg?e=wlyqDc',
      'galeria-imagenes': 'https://1drv.ms/f/c/092e39edf7b9ea99/EghuD9bg35pIuN_PGWZpKGYBuj3pQGKANIWwBFHlePv5Gg?e=vD2OcQ',
      'logo': 'https://1drv.ms/f/c/092e39edf7b9ea99/ElOAO9oVZLxJm-WtJKjilWYB0dsjV-F8a-3KD-iN02Wg9g?e=IeEvYt',
      'manual-marca': 'https://1drv.ms/f/c/092e39edf7b9ea99/En1h_WNaFwZJnEoDwg4g9SEBN6XjCsyuuCS6Dzt_4oXyBQ?e=ImP91D',
      'plan-marketing': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eo7be_3nfatCtvXjlZJsjf8BnvTqND4fmnQrhVVjPxBgLg?e=UcqmFm',
      'precios-venta': 'https://1drv.ms/f/c/092e39edf7b9ea99/EstnttROS4pIvxigqzxvBCoBqyXDfENyIHdkcP-HibbH0g?e=dJc3NV',
      'redes-sociales': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eg0OO-cC399OniEMXubb7DsB1d6XnBWnnZdduEwxidpYCg?e=t40FI9',
      'videos': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eub1tZDxnlBLprRn05e1icwBg5IScUiGMlUx1HnZqav2fw?e=K9XmY6',
      
      // INVESTIGACIÓN Y DESARROLLO
      'cultivo': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eqtt_21ReeZHgFzXYqTfNWcBEHqjmdJ-lJbRIfZOHNpamQ?e=jde0LB',
      'estudios-beneficiosos': 'https://1drv.ms/f/c/092e39edf7b9ea99/Et6eASKZLnNLr6T0cae23ogBMj4F6Y5YDMyGIwJYaCTHJA?e=nJRCJJ',
      'literatura': 'https://1drv.ms/f/c/092e39edf7b9ea99/EsyhkvmrDCpIlz8oZOTySscBFMCofizhddLs00HTZTiq4w?e=uSnqLx',
      'manejo frutales': 'https://1drv.ms/f/c/092e39edf7b9ea99/Em_37q2tOnNJnY8Vjj3e_KoB_-pF42Bj5dt3AmYoXAwAvg?e=Jp8yIs',
      'nectares': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ep5eMY4WvBlAgn9grvut8iYB_VpbUD63nj0QFJkhTN_BgA?e=wIclfb',
      
      // VENTAS
      'ANALISIS DE VENTAS': 'https://1drv.ms/f/c/092e39edf7b9ea99/EqK3-ATbukdLljXYs5pemeIB104TBNN_H5tjPuaQ0TuxoQ?e=9fXxhE',
      'VENTA JUGOS CARNAVAL': 'https://1drv.ms/f/c/092e39edf7b9ea99/Er-6WwxDo51Jgtkz3u_lH14BB61MOa8oWPdeOZ4EsXiXJw?e=bClnyy',
      'VENTAS': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ejq1nFzKBBFCnIWMN_72G5wBzF8mrx8AD6XegQkAqYUWgw?e=74iuvj',
      'VENTAS SUPERMERCADOS': 'https://1drv.ms/f/c/092e39edf7b9ea99/ElvUiiOd_U1IrxLkOd0I7I4BH-i6U-SLBbQdqjw6k7o8zw?e=OxRRvY',
      
      // IMPORT-EXPORT
      'documentacion-aduanas': 'https://1drv.ms/f/c/092e39edf7b9ea99/EvjMS23XnJxAnDdLN4CroekBxdGR46PvOtYcs1jSPHKs-w?e=mNSwj0',
      'exportacion': 'https://1drv.ms/f/c/092e39edf7b9ea99/EreMjEM7BK5Ajx33EokX8qQBS-QjK8rf3kb_4MmOgtawsg?e=kR2Xbn',
      'importacion': 'https://1drv.ms/f/c/092e39edf7b9ea99/EuxGZzkjHfNEsv4zalXwf0sBIwie8TOKx1_X8UikJyDxzw?e=PkAcCG',
      
      // RESPALDOS-PROCEDIMIENTOS
      'RESPALDOS': 'https://1drv.ms/f/c/092e39edf7b9ea99/EvroIT8r_xRIh29OL1wNRdEBk5NePzDywGdSq5UWDBZUrw?e=FtGpeq',

      // SISTEMA DE GESTION
      'procedimientos': 'https://effortless-croissant-fdfd7d.netlify.app/',
 
      // GERENCIA
      'documentos': 'https://1drv.ms/f/c/092e39edf7b9ea99/EgyOKupvikJJv_RVpIyOj8wBy3_98e-AjynybcC8mbQdkA?e=0wivgf',

      // FINANZAS-CONTABILIDAD-LEGAL
      'años-pasados': 'https://1drv.ms/f/c/092e39edf7b9ea99/Er8O15pDskVIvSPRtL3IZ04B1uImrcfpfJKjrwlTprwbeQ?e=SpG7GB',
      '2025-fi': 'https://1drv.ms/f/c/092e39edf7b9ea99/Er8O15pDskVIvSPRtL3IZ04B1uImrcfpfJKjrwlTprwbeQ?e=h0dSmR',
 
      // CARPETAS PERSONALES
      'nano': 'https://1drv.ms/f/c/092e39edf7b9ea99/EjVQpvntLZhOnDLC7r0ZjSkBcTBz8bKlgu2E-d90epzJRQ?e=yYQ8yb',
      'rodrigo': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eq_MWBeYI0xDslrd9AsfqZQBh2pNofJHYSVXNsLWOD0vCw?e=aCEP0s',
      'santiago': 'https://1drv.ms/f/c/092e39edf7b9ea99/EjdfmscNdIhGokkMFTRTLXUBOnQI4SE6RX9tlxzgvFW9VQ?e=LHwZeY',
      'emili': 'https://1drv.ms/f/c/092e39edf7b9ea99/EguLXjSL0_NJotfcTyeCXB8BQJBPReT-JQuQrZpUbBe7Pw?e=9vBydD',
      'daniela': 'https://1drv.ms/f/c/092e39edf7b9ea99/EgwujdpFBVJCjOF8KQuYmqcB5G2gmrtVrk4bTHbwymP5cw?e=9yJJ00',
    };
    
    const enlace = enlaces[carpeta] || '#';
    // Redirección real
    if (carpeta === 'procedimientos') {
      window.location.href = enlace;
    } else {
      window.open(enlace, '_blank');
    }
  };

  // Control de accesos por rol de usuario
  const userPermissions = {
    administracion: ['plantacion', 'planta', 'logistica', 'calidad', 'admin', 'rh', 'marketing', 'investigacion', 'ventas', 'import-export', 'respaldos', 'gestion', 'gerencia', 'finanzas', 'personales'],
    produccion: ['plantacion', 'planta', 'logistica', 'calidad', 'investigacion'],
    gerencia: ['plantacion', 'planta', 'logistica', 'calidad', 'admin', 'rh', 'marketing', 'investigacion', 'ventas', 'import-export', 'gerencia', 'finanzas'],
    gestion: ['plantacion', 'planta', 'logistica', 'calidad', 'admin', 'rh', 'marketing', 'investigacion', 'ventas'],
    invitado: ['plantacion', 'planta'] // Acceso limitado para invitados
  };

  const hasAccess = (area: string) => {
    return userPermissions[userRole as keyof typeof userPermissions]?.includes(area) || false;
  };

  // Imágenes para el carrusel
  const carouselImages = [
    'https://i.ibb.co/prWnw63p/MG-0034.jpg',
    'https://i.ibb.co/m5mw3sw3/MG-0028.jpg',
    'https://i.ibb.co/XfcVnR8g/MG-0019.jpg',
    'https://i.ibb.co/bjdtqpGP/MG-0006.jpg'
  ];

  // Función para redirigir a Google Drive
  const redirectToGoogleDrive = () => {
    window.open('https://drive.google.com/drive/folders/1jS93cvrPySFzgKkhXBxvQeL19wK-h01D', '_blank');
  };

  // Estructura de carpetas por área - Versión compacta
  const areasData = [
    {
      id: 'plantacion',
      nombre: 'Plantación',
      icono: 'fas fa-seedling',
      color: 'green',
      carpetas: [
        { nombre: 'Histórico antes de 2025', id: 'historico-antes-de-2025', icono: 'fas fa-history' },
        { nombre: 'Propiedad', id: 'propiedad', icono: 'fas fa-landmark' }
      ]
    },
    {
      id: 'planta',
      nombre: 'Planta',
      icono: 'fas fa-industry',
      color: 'orange',
      carpetas: [
        { nombre: 'Almacén', id: 'almacen', icono: 'fas fa-warehouse' },
        { nombre: 'Mantenimiento', id: 'mantenimiento-de-equipos', icono: 'fas fa-tools' },
        { nombre: 'Producción', id: 'produccion', icono: 'fas fa-cogs' }
      ]
    },
    {
      id: 'logistica',
      nombre: 'Logística',
      icono: 'fas fa-truck-loading',
      color: 'amber',
      carpetas: [
        { nombre: 'Compras e Insumos', id: 'compra-abastecimiento-insumos-planta', icono: 'fas fa-boxes' },
        { nombre: 'Cotizaciones', id: 'cotizaciones-activos-infraestructura', icono: 'fas fa-file-invoice-dollar' },
        { nombre: 'Distribución', id: 'distribucio-transporte', icono: 'fas fa-truck' },
        { nombre: 'Proveedores', id: 'proveedores', icono: 'fas fa-handshake' }
      ]
    },
    {
      id: 'calidad',
      nombre: 'Calidad',
      icono: 'fas fa-award',
      color: 'amber',
      carpetas: [
        { nombre: 'Calidad y Seguridad', id: 'calidad-seguridad', icono: 'fas fa-shield-alt' },
        { nombre: 'Certificaciones', id: 'certificaciones', icono: 'fas fa-certificate' },
        { nombre: 'Fichas Técnicas', id: 'fichas-tecnicas', icono: 'fas fa-clipboard-list' },
        { nombre: 'Normas', id: 'normas', icono: 'fas fa-book' }
      ]
    },
    {
      id: 'admin',
      nombre: 'Administración',
      icono: 'fas fa-calculator',
      color: 'orange',
      carpetas: [
        { nombre: '2024 AD', id: '2024-ad', icono: 'fas fa-folder' },
        { nombre: '2025 AD', id: '2025-ad', icono: 'fas fa-folder-open' }
      ]
    },
    {
      id: 'rh',
      nombre: 'Recursos Humanos',
      icono: 'fas fa-users',
      color: 'orange',
      carpetas: [
        { nombre: '2024 RH', id: '2024-rh', icono: 'fas fa-folder' },
        { nombre: 'Afiliaciones', id: 'afiliaciones', icono: 'fas fa-id-card' },
        { nombre: 'Capacitaciones', id: 'capacitaciones', icono: 'fas fa-graduation-cap' },
        { nombre: 'CNS', id: 'cns', icono: 'fas fa-file-medical' },
        { nombre: 'Contratos', id: 'contratos', icono: 'fas fa-file-contract' },
        { nombre: 'Credenciales', id: 'credenciales', icono: 'fas fa-id-badge' },
        { nombre: 'File Personal', id: 'file-personal', icono: 'fas fa-folder' },
        { nombre: 'Pagos Sociales', id: 'pago-cargos-socailes', icono: 'fas fa-money-bill-wave' },
        { nombre: 'Planillas', id: 'planillas-asistencia', icono: 'fas fa-clipboard-check' },
        { nombre: 'Planilla Fiscal', id: 'planilla-fiscal', icono: 'fas fa-file-invoice' },
        { nombre: 'Planillas Generales', id: 'planillas-generales', icono: 'fas fa-clipboard-list' },
        { nombre: 'Trabajopolis', id: 'trabajopolis', icono: 'fas fa-briefcase' }
      ]
    },
    {
      id: 'marketing',
      nombre: 'Marketing',
      icono: 'fas fa-bullhorn',
      color: 'amber',
      carpetas: [
        { nombre: 'Catálogos', id: 'catalogos', icono: 'fas fa-book' },
        { nombre: 'Estudio Mercado', id: 'estudio-mercado-grenia', icono: 'fas fa-chart-bar' },
        { nombre: 'Etiquetas', id: 'etiquetas', icono: 'fas fa-tag' },
        { nombre: 'Ferias', id: 'ferias', icono: 'fas fa-calendar-alt' },
        { nombre: 'Folletos', id: 'folletos-volantes-tripticos', icono: 'fas fa-newspaper' },
        { nombre: 'Galería', id: 'galeria-imagenes', icono: 'fas fa-images' },
        { nombre: 'Logo', id: 'logo', icono: 'fas fa-palette' },
        { nombre: 'Manual Marca', id: 'manual-marca', icono: 'fas fa-book-open' },
        { nombre: 'Plan Marketing', id: 'plan-marketing', icono: 'fas fa-chart-line' },
        { nombre: 'Precios', id: 'precios-venta', icono: 'fas fa-tags' },
        { nombre: 'Redes Sociales', id: 'redes-sociales', icono: 'fas fa-share-alt' },
        { nombre: 'Videos', id: 'videos', icono: 'fas fa-video' }
      ]
    },
    {
      id: 'investigacion',
      nombre: 'I+D',
      icono: 'fas fa-flask',
      color: 'blue',
      carpetas: [
        { nombre: 'Cultivo', id: 'cultivo', icono: 'fas fa-seedling' },
        { nombre: 'Estudios', id: 'estudios-beneficiosos', icono: 'fas fa-microscope' },
        { nombre: 'Literatura', id: 'literatura', icono: 'fas fa-book' },
        { nombre: 'Manejo Frutales', id: 'manejo frutales', icono: 'fas fa-tree' },
        { nombre: 'Néctares', id: 'nectares', icono: 'fas fa-wine-bottle' }
      ]
    },
    {
      id: 'ventas',
      nombre: 'Ventas',
      icono: 'fas fa-chart-line',
      color: 'amber',
      carpetas: [
        { nombre: 'Análisis', id: 'ANALISIS DE VENTAS', icono: 'fas fa-chart-bar' },
        { nombre: 'Venta Carnaval', id: 'VENTA JUGOS CARNAVAL', icono: 'fas fa-glass-cheers' },
        { nombre: 'Ventas', id: 'VENTAS', icono: 'fas fa-shopping-cart' },
        { nombre: 'Supermercados', id: 'VENTAS SUPERMERCADOS', icono: 'fas fa-store' }
      ]
    },
    {
      id: 'import-export',
      nombre: 'Import-Export',
      icono: 'fas fa-globe-americas',
      color: 'purple',
      carpetas: [
        { nombre: 'Aduanas', id: 'documentacion-aduanas', icono: 'fas fa-file-contract' },
        { nombre: 'Exportación', id: 'exportacion', icono: 'fas fa-plane-departure' },
        { nombre: 'Importación', id: 'importacion', icono: 'fas fa-plane-arrival' }
      ]
    },
    {
      id: 'respaldos',
      nombre: 'Respaldos',
      icono: 'fas fa-hdd',
      color: 'gray',
      carpetas: [
        { nombre: 'Respaldos', id: 'RESPALDOS', icono: 'fas fa-database' }
      ]
    },
    {
      id: 'gestion',
      nombre: 'Gestión',
      icono: 'fas fa-clipboard-list',
      color: 'purple',
      carpetas: [
        { nombre: 'Procedimientos', id: 'procedimientos', icono: 'fas fa-file-alt' }
      ]
    },
    {
      id: 'gerencia',
      nombre: 'Gerencia',
      icono: 'fas fa-user-tie',
      color: 'blue',
      carpetas: [
        { nombre: 'Documentos', id: 'documentos', icono: 'fas fa-folder' }
      ]
    },
    {
      id: 'finanzas',
      nombre: 'Finanzas',
      icono: 'fas fa-money-bill-wave',
      color: 'green',
      carpetas: [
        { nombre: 'Años Pasados', id: 'años-pasados', icono: 'fas fa-history' },
        { nombre: '2025 FI', id: '2025-fi', icono: 'fas fa-folder-open' }
      ]
    },
    {
      id: 'personales',
      nombre: 'Personales',
      icono: 'fas fa-user-circle',
      color: 'orange',
      carpetas: [
        { nombre: 'Nano', id: 'nano', icono: 'fas fa-user' },
        { nombre: 'Rodrigo', id: 'rodrigo', icono: 'fas fa-user' },
        { nombre: 'Santiago', id: 'santiago', icono: 'fas fa-user' },
        { nombre: 'Emili', id: 'emili', icono: 'fas fa-user' },
        { nombre: 'Daniela', id: 'daniela', icono: 'fas fa-user' }
      ]
    }
  ];

  // Filtrar áreas según permisos de usuario
  const filteredAreas = areasData.filter(area => hasAccess(area.id));

  // Si el usuario no está autenticado, mostrar formulario de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-orange-300 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="h-28 w-28 mb-4 flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-3 shadow-2xl border-4 border-white">
                <img 
                  src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
            <p className="text-orange-800 mt-2 font-bold text-xl bg-gradient-to-r from-orange-100 to-amber-100 py-2 px-4 rounded-full">Sistema Interno - Acceso Restringido</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm border-2 border-red-200 shadow-lg">
                <div className="flex items-center">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  {loginError}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-bold text-orange-800">
                <i className="fas fa-user mr-2"></i>Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-4 border-2 border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white shadow-lg"
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-orange-800">
                <i className="fas fa-lock mr-2"></i>Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border-2 border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white shadow-lg"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 px-4 rounded-2xl font-bold hover:from-orange-600 hover:to-amber-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 disabled:opacity-70 shadow-2xl transform hover:scale-105 hover:shadow-2xl"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-3"></i>
                  Verificando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <i className="fas fa-sign-in-alt mr-3"></i>
                  Iniciar Sesión
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl text-sm text-orange-800 border-2 border-orange-200 shadow-lg">
            <p className="font-bold text-center text-orange-900 text-lg">Sistema Interno</p>
            <p className="mt-2 text-center text-orange-700">Acceso exclusivo para personal autorizado</p>
          </div>
        </div>
      </div>
    );
  }

  // Contenido para usuarios autenticados
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Favicon */}
      <head>
        <link rel="icon" type="image/x-icon" href="https://i.ibb.co/fY6pdCPW/Logo-Air.png" />
      </head>
      
      <header className="bg-gradient-to-r from-orange-500 to-amber-600 shadow-2xl border-b-4 border-orange-400">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="h-16 w-16 md:h-20 md:w-20 mr-4 flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-2 shadow-2xl border-4 border-white">
                  <img 
                    src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-orange-100 text-sm">Bienvenido</span>
                <span className="text-white font-bold text-lg">{currentUser}</span>
                <span className="text-orange-200 text-xs">Rol: {userRole}</span>
              </div>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-2">
              <button 
                className={`px-4 py-2 md:px-5 md:py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg text-sm md:text-base ${
                  activeTab === 'inicio' 
                    ? 'bg-white text-orange-600 shadow-2xl transform scale-105' 
                    : 'text-orange-100 hover:bg-white hover:text-orange-600 hover:shadow-xl'
                }`}
                onClick={() => setActiveTab('inicio')}
              >
                <i className="fas fa-home mr-2"></i>Inicio
              </button>
              <button 
                className={`px-4 py-2 md:px-5 md:py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg text-sm md:text-base ${
                  activeTab === 'vision' 
                    ? 'bg-white text-orange-600 shadow-2xl transform scale-105' 
                    : 'text-orange-100 hover:bg-white hover:text-orange-600 hover:shadow-xl'
                }`}
                onClick={() => setActiveTab('vision')}
              >
                <i className="fas fa-eye mr-2"></i>Visión
              </button>
              <button 
                className={`px-4 py-2 md:px-5 md:py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg text-sm md:text-base ${
                  activeTab === 'mision' 
                    ? 'bg-white text-orange-600 shadow-2xl transform scale-105' 
                    : 'text-orange-100 hover:bg-white hover:text-orange-600 hover:shadow-xl'
                }`}
                onClick={() => setActiveTab('mision')}
              >
                <i className="fas fa-bullseye mr-2"></i>Misión
              </button>
              <button 
                className="px-4 py-2 md:px-5 md:py-3 rounded-2xl font-bold bg-white text-orange-600 shadow-2xl hover:shadow-xl transition-all duration-200 text-sm md:text-base"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Salir
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="flex flex-col xl:flex-row gap-6 md:gap-8">
          {/* Galería */}
          <div className="w-full xl:w-1/3">
            <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 h-full border-4 border-orange-200">
              <h2 className="text-xl md:text-2xl font-bold text-orange-900 mb-4 md:mb-6 text-center border-b-2 border-orange-200 pb-2 md:pb-3">Galería</h2>
              
              {/* Carrusel de imágenes */}
              <div className="mb-4 md:mb-6 rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-300 cursor-pointer" onClick={redirectToGoogleDrive}>
                <div className="relative h-40 md:h-48 bg-gradient-to-r from-orange-400 to-amber-500 overflow-hidden">
                  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full">
                    {carouselImages.map((img, index) => (
                      <div key={index} className="flex-shrink-0 w-full h-full snap-center">
                        <img 
                          src={img} 
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-white text-sm font-bold">Haz clic para ver más imágenes</span>
                  </div>
                </div>
              </div>
              
              {/* Miniaturas de imágenes */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                {carouselImages.map((img, index) => (
                  <div 
                    key={index} 
                    className="h-20 md:h-24 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border-2 border-orange-300 relative group hover:scale-105 transition-transform duration-200 cursor-pointer"
                    onClick={redirectToGoogleDrive}
                  >
                    <img 
                      src={img} 
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 flex items-center justify-center transition-all duration-200">
                      <span className="text-white font-bold text-xs md:text-sm text-center">Ver más</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Productos de la empresa */}
              <div className="mt-4 md:mt-6">
                <h3 className="text-lg font-bold text-orange-800 mb-3 md:mb-4 text-center border-b border-orange-200 pb-2">Nuestros Productos</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-3 md:p-4 border-2 border-orange-300 shadow-lg hover:shadow-xl transition-all duration-200">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                        <span className="text-white text-lg">🥭</span>
                      </div>
                      <h4 className="font-bold text-orange-900 text-sm md:text-base">Pulpa de Achachairú</h4>
                    </div>
                    <p className="text-xs md:text-sm text-orange-800">
                      Nuestra pulpa de achachairú se elabora bajo estrictos estándares de calidad.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-3 md:p-4 border-2 border-orange-300 shadow-lg hover:shadow-xl transition-all duration-200">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                        <span className="text-white text-lg">📦</span>
                      </div>
                      <h4 className="font-bold text-orange-900 text-sm md:text-base">Chips Liofilizados</h4>
                    </div>
                    <p className="text-xs md:text-sm text-orange-800">
                      Experimenta la magia del achachairú con nuestros chips liofilizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Áreas */}
          <div className="w-full xl:w-2/3">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-900 mb-6 md:mb-8 border-b-4 border-orange-400 pb-2 md:pb-3">Nuestras Áreas</h2>
            
            {/* Grid de áreas compacto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredAreas.map(area => (
                <div 
                  key={area.id} 
                  className="bg-white rounded-2xl shadow-lg p-4 md:p-5 border-l-4 border-orange-400 hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
                  onClick={() => setSearchTerm(area.nombre)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 md:w-16 md:h-16 bg-${area.color}-100 rounded-2xl flex items-center justify-center mb-3 shadow-lg`}>
                      <i className={`${area.icono} text-${area.color}-600 text-xl md:text-2xl`}></i>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base mb-2">{area.nombre}</h3>
                    <p className="text-xs text-gray-600 mb-3">{area.carpetas.length} carpetas</p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {area.carpetas.slice(0, 3).map((carpeta, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {carpeta.nombre.split(' ')[0]}
                        </span>
                      ))}
                      {area.carpetas.length > 3 && (
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                          +{area.carpetas.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vista detallada cuando se selecciona un área */}
            {searchTerm && (
              <div className="mt-8 bg-white rounded-3xl shadow-2xl p-6 border-4 border-orange-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-orange-900">
                    {filteredAreas.find(a => a.nombre === searchTerm)?.nombre}
                  </h3>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-orange-600 hover:text-orange-800 font-medium"
                  >
                    <i className="fas fa-times mr-2"></i>Cerrar
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAreas
                    .find(a => a.nombre === searchTerm)
                    ?.carpetas.map((carpeta, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 shadow-md border border-orange-200 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
                        onClick={() => redirectToOneDrive(carpeta.id)}
                      >
                        <div className="flex items-center">
                          <div className={`w-10 h-10 bg-${filteredAreas.find(a => a.nombre === searchTerm)?.color}-100 rounded-full flex items-center justify-center mr-3`}>
                            <i className={`${carpeta.icono} text-${filteredAreas.find(a => a.nombre === searchTerm)?.color}-600`}></i>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 text-sm">{carpeta.nombre}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500">Haz clic para abrir</span>
                              <i className="fas fa-external-link-alt text-orange-500 text-xs"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {/* Indicadores */}
            <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-3xl shadow-2xl p-6 md:p-8 mt-8 md:mt-12 border-4 border-orange-300">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-white drop-shadow-lg">Indicadores Clave</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white/20 backdrop-blur-lg p-4 md:p-6 rounded-2xl text-center border-2 border-white/30 shadow-2xl hover:scale-105 transition-transform duration-200">
                  <i className="fas fa-file-contract text-3xl md:text-4xl mb-3 md:mb-4 text-white drop-shadow-lg"></i>
                  <h4 className="font-bold text-white text-sm md:text-lg mb-1 md:mb-2 drop-shadow-lg">Arancelaria</h4>
                  <p className="text-lg md:text-2xl font-bold text-white mt-1 md:mt-2 drop-shadow-lg break-all">0813.40.00.00</p>
                </div>
                <div className="bg-white/20 backdrop-blur-lg p-4 md:p-6 rounded-2xl text-center border-2 border-white/30 shadow-2xl hover:scale-105 transition-transform duration-200">
                  <i className="fas fa-industry text-3xl md:text-4xl mb-3 md:mb-4 text-white drop-shadow-lg"></i>
                  <h4 className="font-bold text-white text-sm md:text-lg mb-1 md:mb-2 drop-shadow-lg">Chips al mes</h4>
                  <p className="text-lg md:text-2xl font-bold text-white mt-1 md:mt-2 drop-shadow-lg">1,000</p>
                </div>
                <div className="bg-white/20 backdrop-blur-lg p-4 md:p-6 rounded-2xl text-center border-2 border-white/30 shadow-2xl hover:scale-105 transition-transform duration-200">
                  <i className="fas fa-weight text-3xl md:text-4xl mb-3 md:mb-4 text-white drop-shadow-lg"></i>
                  <h4 className="font-bold text-white text-sm md:text-lg mb-1 md:mb-2 drop-shadow-lg">Pulpa al mes</h4>
                  <p className="text-lg md:text-2xl font-bold text-white mt-1 md:mt-2 drop-shadow-lg">1,000 Kg</p>
                </div>
                <div className="bg-white/20 backdrop-blur-lg p-4 md:p-6 rounded-2xl text-center border-2 border-white/30 shadow-2xl hover:scale-105 transition-transform duration-200">
                  <i className="fas fa-building text-3xl md:text-4xl mb-3 md:mb-4 text-white drop-shadow-lg"></i>
                  <h4 className="font-bold text-white text-sm md:text-lg mb-1 md:mb-2 drop-shadow-lg">Infraestructura</h4>
                  <p className="text-lg md:text-2xl font-bold text-white mt-1 md:mt-2 drop-shadow-lg">1 planta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 to-amber-700 text-orange-100 py-6 md:py-8 mt-8 md:mt-12 border-t-4 border-orange-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="h-10 w-10 md:h-12 md:w-12 mr-3 flex items-center justify-center bg-white rounded-2xl p-2 shadow-lg">
                  <img 
                    src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-orange-200 mt-2 font-semibold">Innovación y calidad en cada producto</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-orange-200 font-semibold">© 2025. Todos los derechos reservados.</p>
              <p className="text-sm mt-1 text-orange-200">Sistema interno corporativo</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}