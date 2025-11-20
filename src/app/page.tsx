'use client';

import { useState, useEffect } from 'react';

// Definir tipos para TypeScript
type MenuType = 
  | 'plantacion' | 'planta' | 'logistica' | 'calidad' | 'admin' 
  | 'rh' | 'marketing' | 'investigacion' | 'ventas' | 'import-export'
  | 'respaldos' | 'gestion' | 'gerencia' | 'finanzas' | 'personales'
  | null;

type AreaType = 
  | 'plantacion' | 'planta' | 'logistica' | 'calidad' | 'admin' 
  | 'rh' | 'marketing' | 'investigacion' | 'ventas' | 'import-export'
  | 'respaldos' | 'gestion' | 'gerencia' | 'finanzas' | 'personales';

type SectionType = 'areas' | 'mision' | 'paneles';

// Interfaz para las áreas
interface AreaInfo {
  id: AreaType;
  nombre: string;
  icono: string;
  color: string;
  subcarpetas: { nombre: string; clave: string; icono: string }[];
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>('areas');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [openMenu, setOpenMenu] = useState<MenuType>(null);

  // Verificar si ya hay una sesión activa al cargar la página
  useEffect(() => {
    const savedAuth = localStorage.getItem('agiru-auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setCurrentUser(authData.username);
        setUserRole(authData.role);
      } catch (error) {
        localStorage.removeItem('agiru-auth');
      }
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

  // Función para alternar menús desplegables
  const toggleSubmenu = (menu: MenuType) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Función para redirigir a carpetas de OneDrive
  const redirectToOneDrive = (carpeta: string) => {
    const enlaces: { [key: string]: string } = {
      // PLANTACIÓN
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
      'manejo-frutales': 'https://1drv.ms/f/c/092e39edf7b9ea99/Em_37q2tOnNJnY8Vjj3e_KoB_-pF42Bj5dt3AmYoXAwAvg?e=Jp8yIs',
      'nectares': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ep5eMY4WvBlAgn9grvut8iYB_VpbUD63nj0QFJkhTN_BgA?e=wIclfb',
      
      // VENTAS
      'analisis-de-ventas': 'https://1drv.ms/f/c/092e39edf7b9ea99/EqK3-ATbukdLljXYs5pemeIB104TBNN_H5tjPuaQ0TuxoQ?e=9fXxhE',
      'venta-jugos-carnaval': 'https://1drv.ms/f/c/092e39edf7b9ea99/Er-6WwxDo51Jgtkz3u_lH14BB61MOa8oWPdeOZ4EsXiXJw?e=bClnyy',
      'ventas': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ejq1nFzKBBFCnIWMN_72G5wBzF8mrx8AD6XegQkAqYUWgw?e=74iuvj',
      'ventas-supermercados': 'https://1drv.ms/f/c/092e39edf7b9ea99/ElvUiiOd_U1IrxLkOd0I7I4BH-i6U-SLBbQdqjw6k7o8zw?e=OxRRvY',
      
      // IMPORT-EXPORT
      'documentacion-aduanas': 'https://1drv.ms/f/c/092e39edf7b9ea99/EvjMS23XnJxAnDdLN4CroekBxdGR46PvOtYcs1jSPHKs-w?e=mNSwj0',
      'exportacion': 'https://1drv.ms/f/c/092e39edf7b9ea99/EreMjEM7BK5Ajx33EokX8qQBS-QjK8rf3kb_4MmOgtawsg?e=kR2Xbn',
      'importacion': 'https://1drv.ms/f/c/092e39edf7b9ea99/EuxGZzkjHfNEsv4zalXwf0sBIwie8TOKx1_X8UikJyDxzw?e=PkAcCG',
      
      // RESPALDOS-PROCEDIMIENTOS
      'respaldos': 'https://1drv.ms/f/c/092e39edf7b9ea99/EvroIT8r_xRIh29OL1wNRdEBk5NePzDywGdSq5UWDBZUrw?e=FtGpeq',

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
    if (carpeta === 'procedimientos') {
      window.location.href = enlace;
    } else {
      window.open(enlace, '_blank');
    }
  };

  // Control de accesos por rol de usuario - ACTUALIZADO
  const userPermissions = {
    administracion: ['plantacion', 'planta', 'logistica', 'calidad', 'admin', 'rh', 'marketing', 'investigacion', 'ventas', 'import-export', 'respaldos', 'gestion', 'gerencia', 'finanzas', 'personales'],
    produccion: ['plantacion', 'planta', 'logistica', 'calidad', 'investigacion', 'gestion'], // AÑADIDO: gestion
    gerencia: ['plantacion', 'planta', 'logistica', 'calidad', 'admin', 'rh', 'marketing', 'investigacion', 'ventas', 'import-export', 'gerencia', 'finanzas', 'gestion'], // AÑADIDO: gestion
    gestion: ['plantacion', 'planta', 'logistica', 'calidad', 'admin', 'rh', 'marketing', 'investigacion', 'ventas', 'import-export', 'respaldos', 'gestion', 'gerencia', 'finanzas'], // AÑADIDO: todas las áreas
    invitado: ['plantacion', 'planta', 'gestion'] // AÑADIDO: gestion
  };

  const hasAccess = (area: AreaType) => {
    const permissions = userPermissions[userRole as keyof typeof userPermissions];
    return permissions ? permissions.includes(area) : false;
  };

  // Datos de las áreas
  const areasData: AreaInfo[] = [
    {
      id: 'plantacion',
      nombre: 'PLANTACIÓN',
      icono: 'fas fa-seedling',
      color: 'emerald',
      subcarpetas: [
        { nombre: 'Histórico antes de 2025', clave: 'historico-antes-de-2025', icono: 'fas fa-history' },
        { nombre: 'Propiedad', clave: 'propiedad', icono: 'fas fa-landmark' }
      ]
    },
    {
      id: 'planta',
      nombre: 'PLANTA',
      icono: 'fas fa-industry',
      color: 'blue',
      subcarpetas: [
        { nombre: 'Almacén', clave: 'almacen', icono: 'fas fa-warehouse' },
        { nombre: 'Mantenimiento de Equipos', clave: 'mantenimiento-de-equipos', icono: 'fas fa-tools' },
        { nombre: 'Producción', clave: 'produccion', icono: 'fas fa-cogs' }
      ]
    },
    {
      id: 'logistica',
      nombre: 'LOGÍSTICA',
      icono: 'fas fa-truck-loading',
      color: 'indigo',
      subcarpetas: [
        { nombre: 'Compra Abastecimiento Insumos Planta', clave: 'compra-abastecimiento-insumos-planta', icono: 'fas fa-boxes' },
        { nombre: 'Cotizaciones Activos Infraestructura', clave: 'cotizaciones-activos-infraestructura', icono: 'fas fa-file-invoice-dollar' },
        { nombre: 'Distribución Transporte', clave: 'distribucio-transporte', icono: 'fas fa-truck' },
        { nombre: 'Proveedores', clave: 'proveedores', icono: 'fas fa-handshake' }
      ]
    },
    {
      id: 'calidad',
      nombre: 'CALIDAD',
      icono: 'fas fa-award',
      color: 'amber',
      subcarpetas: [
        { nombre: 'Calidad y Seguridad', clave: 'calidad-seguridad', icono: 'fas fa-shield-alt' },
        { nombre: 'Certificaciones', clave: 'certificaciones', icono: 'fas fa-certificate' },
        { nombre: 'Fichas Técnicas', clave: 'fichas-tecnicas', icono: 'fas fa-clipboard-list' },
        { nombre: 'Normas', clave: 'normas', icono: 'fas fa-book' }
      ]
    },
    {
      id: 'admin',
      nombre: 'ADMINISTRACIÓN',
      icono: 'fas fa-calculator',
      color: 'gray',
      subcarpetas: [
        { nombre: '2024 AD', clave: '2024-ad', icono: 'fas fa-folder' },
        { nombre: '2025 AD', clave: '2025-ad', icono: 'fas fa-folder-open' }
      ]
    },
    {
      id: 'rh',
      nombre: 'RECURSOS HUMANOS',
      icono: 'fas fa-users',
      color: 'pink',
      subcarpetas: [
        { nombre: '2024 RH', clave: '2024-rh', icono: 'fas fa-folder' },
        { nombre: 'Afiliaciones', clave: 'afiliaciones', icono: 'fas fa-id-card' },
        { nombre: 'Capacitaciones', clave: 'capacitaciones', icono: 'fas fa-graduation-cap' },
        { nombre: 'CNS', clave: 'cns', icono: 'fas fa-file-medical' },
        { nombre: 'Contratos', clave: 'contratos', icono: 'fas fa-file-contract' },
        { nombre: 'Credenciales', clave: 'credenciales', icono: 'fas fa-id-badge' },
        { nombre: 'File Personal', clave: 'file-personal', icono: 'fas fa-folder' },
        { nombre: 'Pago Cargos Sociales', clave: 'pago-cargos-socailes', icono: 'fas fa-money-bill-wave' },
        { nombre: 'Planillas Asistencia', clave: 'planillas-asistencia', icono: 'fas fa-clipboard-check' },
        { nombre: 'Planilla Fiscal', clave: 'planilla-fiscal', icono: 'fas fa-file-invoice' },
        { nombre: 'Planillas Generales', clave: 'planillas-generales', icono: 'fas fa-clipboard-list' },
        { nombre: 'Trabajopolis', clave: 'trabajopolis', icono: 'fas fa-briefcase' }
      ]
    },
    {
      id: 'marketing',
      nombre: 'MARKETING',
      icono: 'fas fa-bullhorn',
      color: 'purple',
      subcarpetas: [
        { nombre: 'Catálogos', clave: 'catalogos', icono: 'fas fa-book' },
        { nombre: 'Estudio Mercado Gerencia', clave: 'estudio-mercado-grenia', icono: 'fas fa-chart-bar' },
        { nombre: 'Etiquetas', clave: 'etiquetas', icono: 'fas fa-tag' },
        { nombre: 'Ferias', clave: 'ferias', icono: 'fas fa-calendar-alt' },
        { nombre: 'Folletos Volantes Trípticos', clave: 'folletos-volantes-tripticos', icono: 'fas fa-newspaper' },
        { nombre: 'Galería Imágenes', clave: 'galeria-imagenes', icono: 'fas fa-images' },
        { nombre: 'Logo', clave: 'logo', icono: 'fas fa-palette' },
        { nombre: 'Manual Marca', clave: 'manual-marca', icono: 'fas fa-book-open' },
        { nombre: 'Plan Marketing', clave: 'plan-marketing', icono: 'fas fa-chart-line' },
        { nombre: 'Precios Venta', clave: 'precios-venta', icono: 'fas fa-tags' },
        { nombre: 'Redes Sociales', clave: 'redes-sociales', icono: 'fas fa-share-alt' },
        { nombre: 'Videos', clave: 'videos', icono: 'fas fa-video' }
      ]
    },
    {
      id: 'investigacion',
      nombre: 'INVESTIGACIÓN Y DESARROLLO',
      icono: 'fas fa-flask',
      color: 'teal',
      subcarpetas: [
        { nombre: 'Cultivo', clave: 'cultivo', icono: 'fas fa-seedling' },
        { nombre: 'Estudios Beneficiosos', clave: 'estudios-beneficiosos', icono: 'fas fa-microscope' },
        { nombre: 'Literatura', clave: 'literatura', icono: 'fas fa-book' },
        { nombre: 'Manejo Frutales', clave: 'manejo-frutales', icono: 'fas fa-tree' },
        { nombre: 'Néctares', clave: 'nectares', icono: 'fas fa-wine-bottle' }
      ]
    },
    {
      id: 'ventas',
      nombre: 'VENTAS',
      icono: 'fas fa-chart-line',
      color: 'green',
      subcarpetas: [
        { nombre: 'Análisis de Ventas', clave: 'analisis-de-ventas', icono: 'fas fa-chart-bar' },
        { nombre: 'Venta Jugos Carnaval', clave: 'venta-jugos-carnaval', icono: 'fas fa-glass-cheers' },
        { nombre: 'Ventas', clave: 'ventas', icono: 'fas fa-shopping-cart' },
        { nombre: 'Ventas Supermercados', clave: 'ventas-supermercados', icono: 'fas fa-store' }
      ]
    },
    {
      id: 'import-export',
      nombre: 'IMPORT - EXPORT',
      icono: 'fas fa-globe-americas',
      color: 'red',
      subcarpetas: [
        { nombre: 'Documentación Aduanas', clave: 'documentacion-aduanas', icono: 'fas fa-file-contract' },
        { nombre: 'Exportación', clave: 'exportacion', icono: 'fas fa-plane-departure' },
        { nombre: 'Importación', clave: 'importacion', icono: 'fas fa-plane-arrival' }
      ]
    },
    {
      id: 'respaldos',
      nombre: 'RESPALDOS DE PROCEDIMIENTOS',
      icono: 'fas fa-hdd',
      color: 'gray',
      subcarpetas: [
        { nombre: 'Respaldos', clave: 'respaldos', icono: 'fas fa-database' }
      ]
    },
    {
      id: 'gestion',
      nombre: 'SISTEMA DE GESTIÓN',
      icono: 'fas fa-clipboard-list',
      color: 'indigo',
      subcarpetas: [
        { nombre: 'Procedimientos', clave: 'procedimientos', icono: 'fas fa-file-alt' }
      ]
    },
    {
      id: 'gerencia',
      nombre: 'GERENCIA',
      icono: 'fas fa-user-tie',
      color: 'blue',
      subcarpetas: [
        { nombre: 'Documentos', clave: 'documentos', icono: 'fas fa-folder' }
      ]
    },
    {
      id: 'finanzas',
      nombre: 'FINANZAS - CONTABILIDAD - LEGAL',
      icono: 'fas fa-money-bill-wave',
      color: 'emerald',
      subcarpetas: [
        { nombre: 'Años Pasados', clave: 'años-pasados', icono: 'fas fa-history' },
        { nombre: '2025 FI', clave: '2025-fi', icono: 'fas fa-folder-open' }
      ]
    },
    {
      id: 'personales',
      nombre: 'CARPETAS PERSONALES',
      icono: 'fas fa-user-circle',
      color: 'orange',
      subcarpetas: [
        { nombre: 'Nano', clave: 'nano', icono: 'fas fa-user' },
        { nombre: 'Rodrigo', clave: 'rodrigo', icono: 'fas fa-user' },
        { nombre: 'Santiago', clave: 'santiago', icono: 'fas fa-user' },
        { nombre: 'Emili', clave: 'emili', icono: 'fas fa-user' },
        { nombre: 'Daniela', clave: 'daniela', icono: 'fas fa-user' }
      ]
    }
  ];

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

  // Función auxiliar para obtener colores
  const getColor = (color: string, shade: number): string => {
    const colorMap: { [key: string]: { [key: number]: string } } = {
      emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
      },
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
      },
      indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
      },
      amber: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
      },
      pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
      },
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
      },
      teal: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
      },
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
      },
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
      },
      orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
      }
    };
    
    return colorMap[color]?.[shade] || '#6b7280';
  };

  // Si el usuario no está autenticado, mostrar SOLO el formulario de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="h-24 w-24 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-3 shadow-lg border-4 border-white">
                <img 
                  src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Airú</h1>
            <p className="text-gray-600 font-medium">Sistema Interno Corporativo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-200">
                <div className="flex items-center">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  {loginError}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                <i className="fas fa-user mr-2"></i>Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                <i className="fas fa-lock mr-2"></i>Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70"
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

          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-200">
            <p className="font-semibold text-center">Acceso exclusivo para personal autorizado</p>
            <p className="mt-1 text-center text-blue-600 text-xs">Sistema interno corporativo Airú</p>
          </div>
        </div>
      </div>
    );
  }

  // CONTENIDO PARA USUARIOS AUTENTICADOS
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Corporativo */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="h-14 w-14 md:h-16 md:w-16 mr-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-2 shadow-lg border-2 border-white">
                  <img 
                    src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Bienvenido</span>
                <span className="text-gray-900 font-bold text-lg">{currentUser}</span>
                <span className="text-gray-400 text-xs">Rol: {userRole}</span>
              </div>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-2">
              <button 
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base ${
                  activeSection === 'areas' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
                onClick={() => setActiveSection('areas')}
              >
                <i className="fas fa-folder mr-2"></i>Áreas
              </button>
              <button 
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base ${
                  activeSection === 'mision' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
                onClick={() => setActiveSection('mision')}
              >
                <i className="fas fa-bullseye mr-2"></i>Misión & Visión
              </button>
              <button 
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base ${
                  activeSection === 'paneles' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
                onClick={() => setActiveSection('paneles')}
              >
                <i className="fas fa-chart-bar mr-2"></i>Paneles
              </button>
              <button 
                className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 text-sm md:text-base"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Salir
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Sección de Misión, Visión y Valores */}
        {activeSection === 'mision' && (
          <div className="w-full xl:w-2/3 mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Nuestra Filosofía Corporativa
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                En <strong>Airú</strong>, nos dedicamos a ofrecer productos frescos, saludables y de alta calidad, 
                cultivados con esmero por agricultores locales. Nos enorgullece nuestra producción 
                orgánica, libre de agroquímicos y sin azúcares añadidos. Promovemos la sostenibilidad 
                ambiental y el respeto por la naturaleza en cada etapa de nuestra cadena productiva.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-emerald-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-award text-emerald-600 text-lg"></i>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800">Calidad y Frescura</h3>
                </div>
                <p className="text-gray-600">
                  Comprometidos con ofrecer productos frescos, cultivados de forma responsable y sin agroquímicos.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-leaf text-blue-600 text-lg"></i>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Sostenibilidad Ambiental</h3>
                </div>
                <p className="text-gray-600">
                  Practicamos métodos de producción sostenibles que respetan y protegen el medio ambiente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sección de Paneles */}
        {activeSection === 'paneles' && (
          <div className="w-full xl:w-2/3 mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Paneles de Control
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
              <i className="fas fa-tachometer-alt text-4xl text-blue-400 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Paneles en Desarrollo</h3>
              <p className="text-gray-600">
                Esta sección estará disponible próximamente con métricas y análisis en tiempo real.
              </p>
            </div>
          </div>
        )}

        {/* Sección de Áreas (Principal) - DISEÑO CORPORATIVO MEJORADO */}
        {activeSection === 'areas' && (
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Galería e Indicadores */}
            <div className="w-full xl:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6 h-full border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Galería Corporativa</h2>
                
                {/* Carrusel de imágenes */}
                <div className="mb-6 rounded-lg overflow-hidden shadow-md border border-gray-200 cursor-pointer" onClick={redirectToGoogleDrive}>
                  <div className="relative h-48 bg-gradient-to-r from-blue-500 to-cyan-600 overflow-hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory h-full">
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-white text-sm font-semibold">Ver galería completa</span>
                    </div>
                  </div>
                </div>
                
                {/* Indicadores */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 text-center">Indicadores Clave</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                      <i className="fas fa-file-contract text-xl mb-2 text-white"></i>
                      <h4 className="font-bold text-white text-sm mb-1">Arancelaria</h4>
                      <p className="text-sm font-bold text-white">0813.40.00.00</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                      <i className="fas fa-industry text-xl mb-2 text-white"></i>
                      <h4 className="font-bold text-white text-sm mb-1">Chips/mes</h4>
                      <p className="text-sm font-bold text-white">1,000</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                      <i className="fas fa-weight text-xl mb-2 text-white"></i>
                      <h4 className="font-bold text-white text-sm mb-1">Pulpa/mes</h4>
                      <p className="text-sm font-bold text-white">1,000 Kg</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                      <i className="fas fa-building text-xl mb-2 text-white"></i>
                      <h4 className="font-bold text-white text-sm mb-1">Plantas</h4>
                      <p className="text-sm font-bold text-white">1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Áreas - DISEÑO CORPORATIVO MEJORADO */}
            <div className="w-full xl:w-2/3">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Sistema de Gestión Documental</h2>
                <p className="text-gray-600 text-center">Acceda a las diferentes áreas corporativas y sus documentos</p>
              </div>
              
              <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {areasData.map((area) => (
                    hasAccess(area.id) && (
                      <div 
                        key={area.id}
                        className="bg-white rounded-xl shadow-sm p-5 border-l-4 hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-200"
                        style={{ 
                          borderLeftColor: getColor(area.color, 500),
                        }}
                        onClick={() => toggleSubmenu(area.id)}
                      >
                        {/* Header del área */}
                        <div className="flex items-center mb-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-sm"
                            style={{ 
                              background: `linear-gradient(135deg, ${getColor(area.color, 100)}, ${getColor(area.color, 200)})`
                            }}
                          >
                            <i 
                              className={`${area.icono} text-lg`}
                              style={{ color: getColor(area.color, 600) }}
                            ></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 
                              className="text-lg font-bold truncate"
                              style={{ color: getColor(area.color, 800) }}
                            >
                              {area.nombre}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {area.subcarpetas.length} {area.subcarpetas.length === 1 ? 'carpeta' : 'carpetas'}
                            </p>
                          </div>
                          <i 
                            className={`fas fa-chevron-${openMenu === area.id ? 'up' : 'down'} text-sm ml-2`}
                            style={{ color: getColor(area.color, 600) }}
                          ></i>
                        </div>

                        {/* Subcarpetas */}
                        <div className={`overflow-hidden transition-all duration-300 ${openMenu === area.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="space-y-3 pt-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar-thin">
                            {area.subcarpetas.map((subcarpeta, index) => (
                              <div 
                                key={index}
                                className="p-3 rounded-lg cursor-pointer transition-all duration-200 border hover:shadow-sm"
                                style={{ 
                                  borderColor: getColor(area.color, 200),
                                  backgroundColor: getColor(area.color, 50)
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  redirectToOneDrive(subcarpeta.clave);
                                }}
                              >
                                <div 
                                  className="flex items-center font-medium text-sm"
                                  style={{ color: getColor(area.color, 700) }}
                                >
                                  <i className={`${subcarpeta.icono} mr-3 text-base`}></i>
                                  <span className="truncate">{subcarpeta.nombre}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Corporativo */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 md:h-10 md:w-10 mr-3 flex items-center justify-center bg-white rounded-lg p-1">
                  <img 
                    src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">Airú - Sistema Corporativo</p>
                  <p className="text-xs text-gray-400">Innovación y calidad en cada producto</p>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300 font-medium">© 2025 Airú. Todos los derechos reservados.</p>
              <p className="text-xs mt-1 text-gray-400">Sistema interno corporativo</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Estilos CSS personalizados */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }
        
        .custom-scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }
        
        .custom-scrollbar-thin::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 8px;
        }
        
        .custom-scrollbar-thin::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 8px;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}