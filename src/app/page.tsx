'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('inicio');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userRole, setUserRole] = useState('');

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

  const toggleSubmenu = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);
  };

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
      '2025-ad': 'https://1drv.ms/f/c/092e39edf7b9ea99/Elh1ozrRgctIrJ3WAZzYnpcBf3evTJ70w6puQyhyIjnQgQ?e=KgkKDx',
      
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
                        <span className="text-white text-lg">🍓</span>
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
                        <span className="text-white text-lg">🥬</span>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
              {/* PLANTACION */}
              {hasAccess('plantacion') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('plantacion')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-seedling text-green-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-green-800">Plantación</h3>
                    <i className={`fas fa-chevron-${openMenu === 'plantacion' ? 'up' : 'down'} ml-auto text-green-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'plantacion' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-green-200 hover:border-green-300 hover:shadow-lg" onClick={() => redirectToOneDrive('historico-antes-de-2025')}>
                        <div className="text-green-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-history mr-3 md:mr-4 text-green-600 text-lg"></i>Histórico antes de 2025
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-green-200 hover:border-green-300 hover:shadow-lg" onClick={() => redirectToOneDrive('propiedad')}>
                        <div className="text-green-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-landmark mr-3 md:mr-4 text-green-600 text-lg"></i>Propiedad
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* PLANTA */}
              {hasAccess('planta') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-orange-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('planta')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-industry text-orange-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-orange-800">Planta</h3>
                    <i className={`fas fa-chevron-${openMenu === 'planta' ? 'up' : 'down'} ml-auto text-orange-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'planta' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('almacen')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-warehouse mr-3 md:mr-4 text-orange-600 text-lg"></i>Almacén
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('mantenimiento-de-equipos')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-tools mr-3 md:mr-4 text-orange-600 text-lg"></i>Mantenimiento de Equipos
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('produccion')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-cogs mr-3 md:mr-4 text-orange-600 text-lg"></i>Producción
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* LOGÍSTICA */}
              {hasAccess('logistica') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-amber-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('logistica')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-truck-loading text-amber-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-800">Logística</h3>
                    <i className={`fas fa-chevron-${openMenu === 'logistica' ? 'up' : 'down'} ml-auto text-amber-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'logistica' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg" onClick={() => redirectToOneDrive('compra-abastecimiento-insumos-planta')}>
                        <div className="text-amber-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-boxes mr-3 md:mr-4 text-amber-600 text-lg"></i>Compra Abastecimiento Insumos Planta
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg" onClick={() => redirectToOneDrive('cotizaciones-activos-infraestructura')}>
                        <div className="text-amber-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-file-invoice-dollar mr-3 md:mr-4 text-amber-600 text-lg"></i>Cotizaciones Activos Infraestructura
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg" onClick={() => redirectToOneDrive('distribucio-transporte')}>
                        <div className="text-amber-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-truck mr-3 md:mr-4 text-amber-600 text-lg"></i>Distribución Transporte
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg" onClick={() => redirectToOneDrive('proveedores')}>
                        <div className="text-amber-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-handshake mr-3 md:mr-4 text-amber-600 text-lg"></i>Proveedores
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* CALIDAD */}
              {hasAccess('calidad') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-amber-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('calidad')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-award text-amber-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-800">Calidad</h3>
                    <i className={`fas fa-chevron-${openMenu === 'calidad' ? 'up' : 'down'} ml-auto text-amber-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'calidad' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg" onClick={() => redirectToOneDrive('calidad-seguridad')}>
                        <div className="text-amber-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-shield-alt mr-3 md:mr-4 text-amber-600 text-lg"></i>Calidad y Seguridad
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg" onClick={() => redirectToOneDrive('certificaciones')}>
                        <div className="text-amber-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-certificate mr-3 md:mr-4 text-amber-600 text-lg"></i>Certificaciones
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg" onClick={() => redirectToOneDrive('fichas-tecnicas')}>
                        <div className="text-amber-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-clipboard-list mr-3 md:mr-4 text-amber-600 text-lg"></i>Fichas Técnicas
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg" onClick={() => redirectToOneDrive('normas')}>
                        <div className="text-amber-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-book mr-3 md:mr-4 text-amber-600 text-lg"></i>Normas
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* ADMINISTRACIÓN */}
              {hasAccess('admin') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-orange-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('admin')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-calculator text-orange-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-orange-800">Administración</h3>
                    <i className={`fas fa-chevron-${openMenu === 'admin' ? 'up' : 'down'} ml-auto text-orange-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'admin' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('2024-ad')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-folder mr-3 md:mr-4 text-orange-600 text-lg"></i>2024 AD
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('2025-ad')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-folder-open mr-3 md:mr-4 text-orange-600 text-lg"></i>2025 AD
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* RECURSOS HUMANOS */}
              {hasAccess('rh') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-orange-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('rh')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-users text-orange-700 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-orange-900">Recursos Humanos</h3>
                    <i className={`fas fa-chevron-${openMenu === 'rh' ? 'up' : 'down'} ml-auto text-orange-700 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'rh' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('2024-rh')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-folder mr-3 md:mr-4 text-orange-700 text-lg"></i>2024 RH
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('afiliaciones')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-id-card mr-3 md:mr-4 text-orange-700 text-lg"></i>Afiliaciones
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('capacitaciones')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-graduation-cap mr-3 md:mr-4 text-orange-700 text-lg"></i>Capacitaciones
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('cns')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-file-medical mr-3 md:mr-4 text-orange-700 text-lg"></i>CNS
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('contratos')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-file-contract mr-3 md:mr-4 text-orange-700 text-lg"></i>Contratos
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('credenciales')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-id-badge mr-3 md:mr-4 text-orange-700 text-lg"></i>Credenciales
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('file-personal')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-folder mr-3 md:mr-4 text-orange-700 text-lg"></i>File Personal
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('pago-cargos-socailes')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-money-bill-wave mr-3 md:mr-4 text-orange-700 text-lg"></i>Pago Cargos Sociales
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('planillas-asistencia')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-clipboard-check mr-3 md:mr-4 text-orange-700 text-lg"></i>Planillas Asistencia
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('planilla-fiscal')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-file-invoice mr-3 md:mr-4 text-orange-700 text-lg"></i>Planilla Fiscal
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('planillas-generales')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-clipboard-list mr-3 md:mr-4 text-orange-700 text-lg"></i>Planillas Generales
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('trabajopolis')}>
                        <div className="text-orange-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-briefcase mr-3 md:mr-4 text-orange-700 text-lg"></i>Trabajopolis
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* MARKETING */}
              {hasAccess('marketing') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-amber-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('marketing')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-bullhorn text-amber-700 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-900">Marketing</h3>
                    <i className={`fas fa-chevron-${openMenu === 'marketing' ? 'up' : 'down'} ml-auto text-amber-700 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'marketing' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('catalogos')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-book mr-3 md:mr-4 text-amber-700 text-lg"></i>Catálogos
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('estudio-mercado-grenia')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-chart-bar mr-3 md:mr-4 text-amber-700 text-lg"></i>Estudio Mercado Gerencia
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('etiquetas')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-tag mr-3 md:mr-4 text-amber-700 text-lg"></i>Etiquetas
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('ferias')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-calendar-alt mr-3 md:mr-4 text-amber-700 text-lg"></i>Ferias
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('folletos-volantes-tripticos')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-newspaper mr-3 md:mr-4 text-amber-700 text-lg"></i>Folletos Volantes Trípticos
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('galeria-imagenes')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-images mr-3 md:mr-4 text-amber-700 text-lg"></i>Galería Imágenes
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('logo')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-palette mr-3 md:mr-4 text-amber-700 text-lg"></i>Logo
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('manual-marca')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-book-open mr-3 md:mr-4 text-amber-700 text-lg"></i>Manual Marca
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('plan-marketing')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-chart-line mr-3 md:mr-4 text-amber-700 text-lg"></i>Plan Marketing
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('precios-venta')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-tags mr-3 md:mr-4 text-amber-700 text-lg"></i>Precios Venta
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('redes-sociales')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-share-alt mr-3 md:mr-4 text-amber-700 text-lg"></i>Redes Sociales
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('videos')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-video mr-3 md:mr-4 text-amber-700 text-lg"></i>Videos
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* INVESTIGACIÓN Y DESARROLLO */}
              {hasAccess('investigacion') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('investigacion')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-flask text-blue-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-800">Investigación y Desarrollo</h3>
                    <i className={`fas fa-chevron-${openMenu === 'investigacion' ? 'up' : 'down'} ml-auto text-blue-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'investigacion' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg" onClick={() => redirectToOneDrive('cultivo')}>
                        <div className="text-blue-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-seedling mr-3 md:mr-4 text-blue-600 text-lg"></i>Cultivo
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg" onClick={() => redirectToOneDrive('estudios-beneficiosos')}>
                        <div className="text-blue-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-microscope mr-3 md:mr-4 text-blue-600 text-lg"></i>Estudios Beneficiosos
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg" onClick={() => redirectToOneDrive('literatura')}>
                        <div className="text-blue-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-book mr-3 md:mr-4 text-blue-600 text-lg"></i>Literatura
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg" onClick={() => redirectToOneDrive('manejo frutales')}>
                        <div className="text-blue-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-tree mr-3 md:mr-4 text-blue-600 text-lg"></i>Manejo Frutales
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg" onClick={() => redirectToOneDrive('nectares')}>
                        <div className="text-blue-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-wine-bottle mr-3 md:mr-4 text-blue-600 text-lg"></i>Néctares
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* VENTAS */}
              {hasAccess('ventas') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-amber-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('ventas')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-chart-line text-amber-700 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-900">Ventas</h3>
                    <i className={`fas fa-chevron-${openMenu === 'ventas' ? 'up' : 'down'} ml-auto text-amber-700 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'ventas' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('ANALISIS DE VENTAS')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-chart-bar mr-3 md:mr-4 text-amber-700 text-lg"></i>Análisis de Ventas
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('VENTA JUGOS CARNAVAL')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-glass-cheers mr-3 md:mr-4 text-amber-700 text-lg"></i>Venta Jugos Carnaval
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('VENTAS')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-shopping-cart mr-3 md:mr-4 text-amber-700 text-lg"></i>Ventas
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('VENTAS SUPERMERCADOS')}>
                        <div className="text-amber-800 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-store mr-3 md:mr-4 text-amber-700 text-lg"></i>Ventas Supermercados
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* IMPORT-EXPORT */}
              {hasAccess('import-export') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('import-export')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-globe-americas text-purple-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-purple-800">Import-Export</h3>
                    <i className={`fas fa-chevron-${openMenu === 'import-export' ? 'up' : 'down'} ml-auto text-purple-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'import-export' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg" onClick={() => redirectToOneDrive('documentacion-aduanas')}>
                        <div className="text-purple-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-file-contract mr-3 md:mr-4 text-purple-600 text-lg"></i>Documentación Aduanas
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg" onClick={() => redirectToOneDrive('exportacion')}>
                        <div className="text-purple-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-plane-departure mr-3 md:mr-4 text-purple-600 text-lg"></i>Exportación
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg" onClick={() => redirectToOneDrive('importacion')}>
                        <div className="text-purple-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-plane-arrival mr-3 md:mr-4 text-purple-600 text-lg"></i>Importación
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* RESPALDOS-PROCEDIMIENTOS */}
              {hasAccess('respaldos') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-gray-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('respaldos')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-hdd text-gray-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Respaldos-Procedimientos</h3>
                    <i className={`fas fa-chevron-${openMenu === 'respaldos' ? 'up' : 'down'} ml-auto text-gray-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'respaldos' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg" onClick={() => redirectToOneDrive('RESPALDOS')}>
                        <div className="text-gray-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-database mr-3 md:mr-4 text-gray-600 text-lg"></i>Respaldos
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* SISTEMA DE GESTION */}
              {hasAccess('gestion') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('gestion')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-clipboard-list text-purple-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-purple-800">Sistema de Gestión</h3>
                    <i className={`fas fa-chevron-${openMenu === 'gestion' ? 'up' : 'down'} ml-auto text-purple-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'gestion' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg" onClick={() => redirectToOneDrive('procedimientos')}>
                        <div className="text-purple-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-file-alt mr-3 md:mr-4 text-purple-600 text-lg"></i>Procedimientos
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* GERENCIA */}
              {hasAccess('gerencia') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-blue-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('gerencia')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-user-tie text-blue-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-800">Gerencia</h3>
                    <i className={`fas fa-chevron-${openMenu === 'gerencia' ? 'up' : 'down'} ml-auto text-blue-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'gerencia' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg" onClick={() => redirectToOneDrive('documentos')}>
                        <div className="text-blue-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-folder mr-3 md:mr-4 text-blue-600 text-lg"></i>Documentos
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* FINANZAS-CONTABILIDAD-LEGAL */}
              {hasAccess('finanzas') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-green-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('finanzas')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-money-bill-wave text-green-600 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-green-800">Finanzas-Contabilidad-Legal</h3>
                    <i className={`fas fa-chevron-${openMenu === 'finanzas' ? 'up' : 'down'} ml-auto text-green-600 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'finanzas' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-green-200 hover:border-green-300 hover:shadow-lg" onClick={() => redirectToOneDrive('años-pasados')}>
                        <div className="text-green-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-history mr-3 md:mr-4 text-green-600 text-lg"></i>Años Pasados
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-green-200 hover:border-green-300 hover:shadow-lg" onClick={() => redirectToOneDrive('2025-fi')}>
                        <div className="text-green-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-folder-open mr-3 md:mr-4 text-green-600 text-lg"></i>2025 FI
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* CARPETAS PERSONALES */}
              {hasAccess('personales') && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-orange-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('personales')}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                      <i className="fas fa-user-circle text-orange-500 text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-orange-800">Carpetas Personales</h3>
                    <i className={`fas fa-chevron-${openMenu === 'personales' ? 'up' : 'down'} ml-auto text-orange-500 text-lg`}></i>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'personales' ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="space-y-2 md:space-y-3">
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('nano')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-user mr-3 md:mr-4 text-orange-600 text-lg"></i>Nano
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('rodrigo')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-user mr-3 md:mr-4 text-orange-600 text-lg"></i>Rodrigo
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('santiago')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-user mr-3 md:mr-4 text-orange-600 text-lg"></i>Santiago
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('emili')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-user mr-3 md:mr-4 text-orange-600 text-lg"></i>Emili
                        </div>
                      </li>
                      <li className="p-3 md:p-4 hover:bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg" onClick={() => redirectToOneDrive('daniela')}>
                        <div className="text-orange-700 flex items-center font-semibold text-sm md:text-base">
                          <i className="fas fa-user mr-3 md:mr-4 text-orange-600 text-lg"></i>Daniela
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

            </div>
            
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