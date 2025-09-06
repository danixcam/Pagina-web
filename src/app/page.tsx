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

  // Verificar si ya hay una sesión activa al cargar la página
  useEffect(() => {
    const savedAuth = localStorage.getItem('agiru-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setCurrentUser(authData.username);
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
        { username: 'administracion', password: 'admin2024', role: 'administración' },
        { username: 'produccion', password: 'prod2024', role: 'producción' },
        { username: 'calidad', password: 'calidad2024', role: 'calidad' },
        { username: 'logistica', password: 'logistica2024', role: 'logística' },
        { username: 'ventas', password: 'ventas2024', role: 'ventas' },
        { username: 'rh', password: 'rh2024', role: 'recursos humanos' },
        { username: 'plantaciones', password: 'plantas2024', role: 'plantaciones' },
        { username: 'investigacion', password: 'invest2024', role: 'investigación y desarrollo' },
      ];

      const user = validUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user.username);
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
    localStorage.removeItem('agiru-auth');
  };

  // Función para redirigir a carpetas de OneDrive
  const redirectToOneDrive = (carpeta: string) => {
    // Enlaces reales de tus carpetas de OneDrive
    const enlaces: { [key: string]: string } = {
      // PRODUCCIÓN
      'produccion': 'https://1drv.ms/f/c/092e39edf7b9ea99/EifPVdRVggpBpQ7ukQAypO0BtgDmZK3r4mxvRDhSAmZtxg?e=I1dLF1',
      'produccion-seguimiento': 'https://1drv.ms/f/c/092e39edf7b9ea99/EgkbfC3K8CJBiPnjcBvMF7oBPlLgqHUduOjXJhL-LUD21Q?e=OL9fvS',
      'produccion-liofilizacion': 'https://1drv.ms/f/c/092e39edf7b9ea99/EkhjEr_ETa9LolnOombffFEBo2_WOJf-7R2_Lfv2h8jSww?e=dFdZlt',
      
      // PLANTACIONES
      'plantaciones-mosca': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eo5dH3hlyXxAjftfHgiR-_gBVLavMiEdJVaG1R4ApAWwBw?e=bBmChe',
      'plantaciones-plantacion': 'https://1drv.ms/f/c/092e39edf7b9ea99/ErDxar5vjF1HpgQLvya75cEB3h1KYY_Alc0nCzvSRpv60A?e=NAecic',
      'plantaciones-propiedad': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ep7Sh3wa9-ZNroCBnJXxVAYBOluaOnizaCe--NcXa_996A?e=ZO9ncN',
      'plantaciones-tractor': 'https://1drv.ms/f/c/092e39edf7b9ea99/EnvFLdoaImlFjV2t4TFvmmEBT1EsIkcglJyYcMTRJ7lNGQ?e=oDQRRO',
      
      // LOGÍSTICA
      'logistica-compra-de-frutas': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eov9O7GRB99GtxgrhmmYMmwBevbqupvo6KYhuJ3aQCQbLw?e=gn81XD',
      'logistica-compra-abastecimientos-insumos-planta': 'https://1drv.ms/f/c/092e39edf7b9ea99/EuSmBU0d3LlOmcKxD9lfCwYB83Qh4LoTAXxExYBSJikhBQ?e=M7kZuX',
      'logistica-exportacion': 'https://1drv.ms/f/c/092e39edf7b9ea99/EgPoeOsG9ipIiSApT4YmZIcBL4YR94YB7qvZq4yS3g3azw?e=e6JuTi',
      
      // CALIDAD
      'calidad-seguridad': 'https://1drv.ms/f/c/092e39edf7b9ea99/EtfcambinQ5Nj7Ngu0q1zRsBXAzULsdz_4OaMSNwFkR0Hg?e=FwJ02F',
      'calidad-certificaciones': 'https://1drv.ms/f/c/092e39edf7b9ea99/EmTjp_LUBK1FqVFtVqPkJCkBHeMpSJmu3CnOrErvnpzCHg?e=0ipxdn',
      'calidad-normas': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eoor7JGq5e9JhnIcVz0bPToB3QWiKaq1P_0mX_kIfe22Iw?e=3PCSuV',
      'calidad-procedimientos': 'https://1drv.ms/f/c/092e39edf7b9ea99/Enpui-vnJYRNgd15pWGBxLYBiePIVKLqPKNO4ayJx5qX2w?e=ZwhusX',
      
      // ADMINISTRACIÓN
      'admin-activos-infraestructura': 'https://1drv.ms/f/c/092e39edf7b9ea99/EtISskJw5ydFmF-TlRwSC7cBLetUs-SwtT9ezpEcn874Cg?e=pQgnMY',
      'admin-finanzas-contabilidad-legal': 'https://1drv.ms/f/c/092e39edf7b9ea99/EnSx1uxEUExGl-PYBDcJI1UBhB6-X2G3pVbJ4i93xENpUg?e=wTGZkh',
      'admin-firma-digital': 'https://1drv.ms/f/c/092e39edf7b9ea99/Evy8AokjeLlLoTAmtkPnwS0BjzkVcvZQpzWjEqAbVFqEJw?e=hcckay',
      
      // RECURSOS HUMANOS
      'rh': 'https://1drv.ms/f/c/092e39edf7b9ea99/Eoon1kfLSntOl1efunCC8RkB2FwBcldgWuXQkntXblAsNA?e=rPfrT3',
      'rh-capacitaciones': 'https://1drv.ms/f/c/092e39edf7b9ea99/EkuSiCEyNLZEtikdufdGPoEBIbSyJKl-er4spHQRYXCv0g?e=6TzY6g',
      
      // VENTAS
      'ventas-manual-marca': 'https://1drv.ms/f/c/092e39edf7b9ea99/En1h_WNaFwZJnEoDwg4g9SEBN6XjCsyuuCS6Dzt_4oXyBQ?e=bNwwso',
      'ventas-marketing': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ek4fD9crZvpFnTJMJ4Tjo_EBa878CQp-RvsOmBj-y20dxQ?e=zfpER1',
      'ventas-varios': 'https://1drv.ms/f/c/092e39edf7b9ea99/Et4qBCOTpvBMrvivH44tvhcBfQ8Havd0ZrEXKCWiY1ZL_g?e=vihgmP',
      
      // INVESTIGACIÓN Y DESARROLLO
      'investigacion-desarrollo': 'https://1drv.ms/f/c/092e39edf7b9ea99/ErlenIsFwlJBmK6tY7pRdR4BAyLjKnXYbTUZnVuErJhsbw?e=GYWAo1',
      
      // GENERAL
      'general-cartas': 'https://1drv.ms/f/c/092e39edf7b9ea99/Esc3i-f5juRFtPiNh8UePjIBIl18Kc9hBQukPWh8I-npNA?e=Pe1uOM',
      'general-reuniones': 'https://1drv.ms/f/c/092e39edf7b9ea99/ElsHPnCpwexGstaTIF6x2ZQBqVcY3sNRaoTQiOFphqPu3A?e=XvMBjb',
      'general-varios': 'https://1drv.ms/f/c/092e39edf7b9ea99/EkVoVD-gPGREsk_6s0D3su4BDhOeaHhxf0bgcaauXurXng?e=ecIJ9s',
    };
    
    const enlace = enlaces[carpeta] || '#';
    // Redirección real
    window.location.href = enlace;
  };

  // Si el usuario no está autenticado, mostrar formulario de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-800">
              AIRU
              <span className="text-green-500 text-3xl ml-1">
                <i className="fas fa-leaf"></i>
              </span>
            </h1>
            <p className="text-amber-600 mt-2">Sistema Interno - Acceso Restringido</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-amber-800 mb-1">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Verificando...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg text-sm text-amber-700">
            <p className="font-semibold">Sistema Interno AIRU</p>
            <p className="mt-2">Acceso exclusivo para personal autorizado</p>
          </div>
        </div>
      </div>
    );
  }

  // Contenido para usuarios autenticados
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="bg-gradient-to-r from-amber-800 to-orange-900 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-4xl font-bold text-white">
                AIRU
                <span className="text-green-500 text-3xl ml-1">
                  <i className="fas fa-leaf"></i>
                </span>
              </h1>
              <button
                onClick={handleLogout}
                className="ml-4 text-amber-200 hover:text-white text-sm flex items-center"
                title="Cerrar sesión"
              >
                <i className="fas fa-sign-out-alt mr-1"></i>
                Salir
              </button>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
              <button 
                className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'inicio' ? 'bg-amber-600 text-white' : 'text-amber-200 hover:bg-amber-700'}`}
                onClick={() => setActiveTab('inicio')}
              >
                Inicio
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'vision' ? 'bg-amber-600 text-white' : 'text-amber-200 hover:bg-amber-700'}`}
                onClick={() => setActiveTab('vision')}
              >
                Visión
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'mision' ? 'bg-amber-600 text-white' : 'text-amber-200 hover:bg-amber-700'}`}
                onClick={() => setActiveTab('mision')}
              >
                Misión
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'paneles' ? 'bg-amber-600 text-white' : 'text-amber-200 hover:bg-amber-700'}`}
                onClick={() => setActiveTab('paneles')}
              >
                Paneles
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-semibold bg-amber-600 text-white`}
              >
                Usuario: {currentUser}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Galería */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-4 h-full">
              <h2 className="text-xl font-bold text-amber-900 mb-4 text-center">Galería AIRU</h2>
              
              {/* Carrusel de imágenes */}
              <div className="mb-6 rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={() => redirectToOneDrive('produccion')}>
                <div className="h-48 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Producción AIRU</span>
                </div>
                <div className="p-3 bg-amber-100 text-amber-800 text-sm text-center">
                  Nuestro proceso de producción y liofilización
                </div>
              </div>
              
              {/* Miniaturas de imágenes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-24 bg-gradient-to-r from-green-500 to-green-700 rounded flex items-center justify-center cursor-pointer" onClick={() => redirectToOneDrive('plantaciones-plantacion')}>
                  <span className="text-white text-xs">Plantaciones</span>
                </div>
                <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-700 rounded flex items-center justify-center cursor-pointer" onClick={() => redirectToOneDrive('investigacion-desarrollo')}>
                  <span className="text-white text-xs">I+D</span>
                </div>
                <div className="h-24 bg-gradient-to-r from-purple-500 to-purple-700 rounded flex items-center justify-center cursor-pointer" onClick={() => redirectToOneDrive('admin-activos-infraestructura')}>
                  <span className="text-white text-xs">Infraestructura</span>
                </div>
                <div className="h-24 bg-gradient-to-r from-amber-600 to-orange-700 rounded flex items-center justify-center cursor-pointer" onClick={() => redirectToOneDrive('ventas-marketing')}>
                  <span className="text-white text-xs">Ventas</span>
                </div>
              </div>
              
              {/* Eventos destacados */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-3 text-center">Próximos Eventos</h3>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-start mb-3">
                    <div className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded mr-3">18 OCT</div>
                    <div className="text-sm text-amber-700">Inspección de plantaciones</div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded mr-3">20 OCT</div>
                    <div className="text-sm text-amber-700">Reunión de investigación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
{/* Áreas */}
<div className="w-full lg:w-2/3">
  <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">Nuestras Áreas</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* PRODUCCIÓN */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('produccion')}>
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-industry text-orange-600 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-orange-800">Producción</h3>
        <i className={`fas fa-chevron-${openMenu === 'produccion' ? 'up' : 'down'} ml-auto text-orange-600`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'produccion' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-orange-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('produccion')}>
            <div className="text-orange-700 flex items-center">
              <i className="fas fa-cogs mr-2"></i>Producción
            </div>
          </li>
          <li className="p-2 hover:bg-orange-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('produccion-seguimiento')}>
            <div className="text-orange-700 flex items-center">
              <i className="fas fa-chart-line mr-2"></i>Seguimiento
            </div>
          </li>
          <li className="p-2 hover:bg-orange-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('produccion-liofilizacion')}>
            <div className="text-orange-700 flex items-center">
              <i className="fas fa-snowflake mr-2"></i>Liofilización
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* PLANTACIONES */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('plantaciones')}>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-seedling text-green-600 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-green-800">Plantaciones</h3>
        <i className={`fas fa-chevron-${openMenu === 'plantaciones' ? 'up' : 'down'} ml-auto text-green-600`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'plantaciones' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-green-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('plantaciones-mosca')}>
            <div className="text-green-700 flex items-center">
              <i className="fas fa-bug mr-2"></i>Control de Mosca
            </div>
          </li>
          <li className="p-2 hover:bg-green-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('plantaciones-plantacion')}>
            <div className="text-green-700 flex items-center">
              <i className="fas fa-leaf mr-2"></i>Plantación
            </div>
          </li>
          <li className="p-2 hover:bg-green-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('plantaciones-propiedad')}>
            <div className="text-green-700 flex items-center">
              <i className="fas fa-landmark mr-2"></i>Propiedad
            </div>
          </li>
          <li className="p-2 hover:bg-green-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('plantaciones-tractor')}>
            <div className="text-green-700 flex items-center">
              <i className="fas fa-tractor mr-2"></i>Maquinaria
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* LOGÍSTICA */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('logistica')}>
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-truck-loading text-amber-600 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-amber-800">Logística</h3>
        <i className={`fas fa-chevron-${openMenu === 'logistica' ? 'up' : 'down'} ml-auto text-amber-600`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'logistica' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('logistica-compra-de-frutas')}>
            <div className="text-amber-700 flex items-center">
              <i className="fas fa-apple-alt mr-2"></i>Compra de Frutas
            </div>
          </li>
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('logistica-compra-abastecimientos-insumos-planta')}>
            <div className="text-amber-700 flex items-center">
              <i className="fas fa-boxes mr-2"></i>Insumos Planta
            </div>
          </li>
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('logistica-exportacion')}>
            <div className="text-amber-700 flex items-center">
              <i className="fas fa-globe-americas mr-2"></i>Exportación
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* CALIDAD */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-600">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('calidad')}>
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-award text-amber-600 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-amber-800">Calidad</h3>
        <i className={`fas fa-chevron-${openMenu === 'calidad' ? 'up' : 'down'} ml-auto text-amber-600`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'calidad' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('calidad-seguridad')}>
            <div className="text-amber-700 flex items-center">
              <i className="fas fa-shield-alt mr-2"></i>Calidad y Seguridad
            </div>
          </li>
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('calidad-certificaciones')}>
            <div className="text-amber-700 flex items-center">
              <i className="fas fa-certificate mr-2"></i>Certificaciones
            </div>
          </li>
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('calidad-normas')}>
            <div className="text-amber-700 flex items-center">
              <i className="fas fa-book mr-2"></i>Normas
            </div>
          </li>
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('calidad-procedimientos')}>
            <div className="text-amber-700 flex items-center">
              <i className="fas fa-clipboard-list mr-2"></i>Procedimientos
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* VENTAS */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-700">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('ventas')}>
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-chart-line text-amber-700 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-amber-900">Ventas</h3>
        <i className={`fas fa-chevron-${openMenu === 'ventas' ? 'up' : 'down'} ml-auto text-amber-700`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'ventas' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('ventas-manual-marca')}>
            <div className="text-amber-800 flex items-center">
              <i className="fas fa-book-open mr-2"></i>Manual de Marca
            </div>
          </li>
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('ventas-marketing')}>
            <div className="text-amber-800 flex items-center">
              <i className="fas fa-bullhorn mr-2"></i>Marketing
            </div>
          </li>
          <li className="p-2 hover:bg-amber-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('ventas-varios')}>
            <div className="text-amber-800 flex items-center">
              <i className="fas fa-archive mr-2"></i>Varios
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* RECURSOS HUMANOS */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-700">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('rh')}>
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-users text-orange-700 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-orange-900">Recursos Humanos</h3>
        <i className={`fas fa-chevron-${openMenu === 'rh' ? 'up' : 'down'} ml-auto text-orange-700`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'rh' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-orange-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('rh')}>
            <div className="text-orange-800 flex items-center">
              <i className="fas fa-user-tie mr-2"></i>RRHH Principal
            </div>
          </li>
          <li className="p-2 hover:bg-orange-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('rh-capacitaciones')}>
            <div className="text-orange-800 flex items-center">
              <i className="fas fa-graduation-cap mr-2"></i>Capacitaciones
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* ADMINISTRACIÓN */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('admin')}>
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-calculator text-orange-600 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-orange-800">Administración</h3>
        <i className={`fas fa-chevron-${openMenu === 'admin' ? 'up' : 'down'} ml-auto text-orange-600`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'admin' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-orange-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('admin-finanzas-contabilidad-legal')}>
            <div className="text-orange-700 flex items-center">
              <i className="fas fa-money-bill-wave mr-2"></i>Finanzas y Contabilidad
            </div>
          </li>
          <li className="p-2 hover:bg-orange-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('admin-activos-infraestructura')}>
            <div className="text-orange-700 flex items-center">
              <i className="fas fa-building mr-2"></i>Activos e Infraestructura
            </div>
          </li>
          <li className="p-2 hover:bg-orange-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('admin-firma-digital')}>
            <div className="text-orange-700 flex items-center">
              <i className="fas fa-signature mr-2"></i>Firma Digital
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* INVESTIGACIÓN Y DESARROLLO */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('investigacion')}>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-flask text-blue-600 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-blue-800">Investigación y Desarrollo</h3>
        <i className={`fas fa-chevron-${openMenu === 'investigacion' ? 'up' : 'down'} ml-auto text-blue-600`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'investigacion' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-blue-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('investigacion-desarrollo')}>
            <div className="text-blue-700 flex items-center">
              <i className="fas fa-microscope mr-2"></i>Investigación y Desarrollo
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* ÁREA GENERAL */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('general')}>
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-folder-open text-gray-600 text-xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">General</h3>
        <i className={`fas fa-chevron-${openMenu === 'general' ? 'up' : 'down'} ml-auto text-gray-600`}></i>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'general' ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('general-cartas')}>
            <div className="text-gray-700 flex items-center">
              <i className="fas fa-envelope mr-2"></i>Cartas
            </div>
          </li>
          <li className="p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('general-reuniones')}>
            <div className="text-gray-700 flex items-center">
              <i className="fas fa-calendar-alt mr-2"></i>Reuniones - Cartas
            </div>
          </li>
          <li className="p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={() => redirectToOneDrive('general-varios')}>
            <div className="text-gray-700 flex items-center">
              <i className="fas fa-archive mr-2"></i>Varios
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
            
            {/* Indicadores */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl shadow-lg p-8 mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Indicadores Clave AIRU</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                  <i className="fas fa-box text-2xl mb-2"></i>
                  <h4 className="font-semibold">Producción</h4>
                  <p className="text-xl font-bold">425 uds/día</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                  <i className="fas fa-seedling text-2xl mb-2"></i>
                  <h4 className="font-semibold">Plantaciones</h4>
                  <p className="text-xl font-bold">120 Ha</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                  <i className="fas fa-flask text-2xl mb-2"></i>
                  <h4 className="font-semibold">I+D</h4>
                  <p className="text-xl font-bold">15 proyectos</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                  <i className="fas fa-building text-2xl mb-2"></i>
                  <h4 className="font-semibold">Infraestructura</h4>
                  <p className="text-xl font-bold">8 plantas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-amber-100">AIRU</h3>
              <p className="text-sm">Innovación y calidad en cada producto</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">© 2024 AIRU. Todos los derechos reservados.</p>
              <p className="text-sm mt-1">Sistema interno corporativo</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}