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
        { username: 'procedimientos', password: 'proc2024', role: 'procedimientos' },
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
      
      // PROCEDIMIENTOS
      'procedimientos': 'https://1drv.ms/f/c/092e39edf7b9ea99/EXAMPLE_LINK_HERE?e=EXAMPLE',
      
      // GENERAL
      'general-cartas': 'https://1drv.ms/f/c/092e39edf7b9ea99/Esc3i-f5juRFtPiNh8UePjIBIl18Kc9hBQukPWh8I-npNA?e=Pe1uOM',
      'general-reuniones': 'https://1drv.ms/f/c/092e39edf7b9ea99/ElsHPnCpwexGstaTIF6x2ZQBqVcY3sNRaoTQiOFphqPu3A?e=XvMBjb',
      'general-varios': 'https://1drv.ms/f/c/092e39edf7b9ea99/EkVoVD-gPGREsk_6s0D3su4BDhOeaHhxf0bgcaauXurXng?e=ecIJ9s',
    };
    
    const enlace = enlaces[carpeta] || '#';
    // Redirección real
    window.location.href = enlace;
  };

  // Imágenes para el carrusel
  const carouselImages = [
    'https://1drv.ms/i/c/092e39edf7b9ea99/EYYH5lx1sxpBlrvw7gv-97MBw50zCmh4YlNZQK5k09bLGQ?e=VvvQVE',
    'https://1drv.ms/i/c/092e39edf7b9ea99/ESEQkzPMb7RLpbth0CxaQnEBCF68IsUe-ZcE3VB_Xpbm3w?e=vMyeE6',
    'https://1drv.ms/i/c/092e39edf7b9ea99/EfDDZlEf0zRNjcC7rCXqPnwB27ef0VicFl2rdMDmrx8Q5g?e=LvIIUU',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  ];

  // Si el usuario no está autenticado, mostrar formulario de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-yellow-400">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://1drv.ms/i/c/092e39edf7b9ea99/ESEQkzPMb7RLpbth0CxaQnEBCF68IsUe-ZcE3VB_Xpbm3w?e=vMyeE6" 
                alt="AIRU Logo" 
                className="h-16 w-16 object-contain mr-3"
              />
              <h1 className="text-5xl font-bold text-yellow-600">
                AIRU
                <span className="text-green-500 text-4xl ml-1">
                  <i className="fas fa-leaf"></i>
                </span>
              </h1>
            </div>
            <p className="text-yellow-700 mt-2 font-semibold text-lg">Sistema Interno - Acceso Restringido</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-200">
                {loginError}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-yellow-700 mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-yellow-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-3 px-4 rounded-xl font-bold hover:from-yellow-600 hover:to-amber-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:opacity-70 shadow-lg transform hover:scale-105"
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

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl text-sm text-yellow-800 border-2 border-yellow-200">
            <p className="font-bold text-center">Sistema Interno AIRU</p>
            <p className="mt-2 text-center">Acceso exclusivo para personal autorizado</p>
          </div>
        </div>
      </div>
    );
  }

  // Contenido para usuarios autenticados
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-100">
      <header className="bg-gradient-to-r from-yellow-500 to-amber-600 shadow-2xl border-b-4 border-yellow-400">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex items-center">
                <img 
                  src="https://1drv.ms/i/c/092e39edf7b9ea99/ESEQkzPMb7RLpbth0CxaQnEBCF68IsUe-ZcE3VB_Xpbm3w?e=vMyeE6" 
                  alt="AIRU Logo" 
                  className="h-12 w-12 object-contain mr-3"
                />
                <h1 className="text-4xl font-bold text-white">
                  AIRU
                  <span className="text-green-400 text-3xl ml-1">
                    <i className="fas fa-leaf"></i>
                  </span>
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="ml-6 text-yellow-100 hover:text-white text-sm flex items-center bg-yellow-600 px-3 py-1 rounded-lg hover:bg-yellow-700 transition-colors"
                title="Cerrar sesión"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Salir
              </button>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
              <button 
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${activeTab === 'inicio' ? 'bg-yellow-400 text-amber-900 shadow-lg' : 'text-yellow-100 hover:bg-yellow-400 hover:text-amber-900'}`}
                onClick={() => setActiveTab('inicio')}
              >
                Inicio
              </button>
              <button 
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${activeTab === 'vision' ? 'bg-yellow-400 text-amber-900 shadow-lg' : 'text-yellow-100 hover:bg-yellow-400 hover:text-amber-900'}`}
                onClick={() => setActiveTab('vision')}
              >
                Visión
              </button>
              <button 
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${activeTab === 'mision' ? 'bg-yellow-400 text-amber-900 shadow-lg' : 'text-yellow-100 hover:bg-yellow-400 hover:text-amber-900'}`}
                onClick={() => setActiveTab('mision')}
              >
                Misión
              </button>
              <button 
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${activeTab === 'paneles' ? 'bg-yellow-400 text-amber-900 shadow-lg' : 'text-yellow-100 hover:bg-yellow-400 hover:text-amber-900'}`}
                onClick={() => setActiveTab('paneles')}
              >
                Paneles
              </button>
              <button 
                className={`px-4 py-2 rounded-xl font-bold bg-yellow-400 text-amber-900 shadow-lg`}
              >
                <i className="fas fa-user mr-2"></i>
                {currentUser}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Galería */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 h-full border-4 border-yellow-300">
              <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center border-b-2 border-yellow-200 pb-3">Galería AIRU</h2>
              
              {/* Carrusel de imágenes */}
              <div className="mb-6 rounded-xl overflow-hidden shadow-xl border-2 border-yellow-400">
                <div className="relative h-48 bg-gradient-to-r from-yellow-400 to-amber-500 overflow-hidden">
                  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full">
                    {carouselImages.map((img, index) => (
                      <div key={index} className="flex-shrink-0 w-full h-full snap-center">
                        <img 
                          src={img} 
                          alt={`Imagen ${index + 1} AIRU`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                    <span className="text-white text-sm font-semibold">AIRU - Innovación y Calidad</span>
                  </div>
                </div>
              </div>
              
              {/* Miniaturas de imágenes */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl overflow-hidden flex items-center justify-center shadow-lg border-2 border-yellow-300">
                  <span className="text-white font-bold text-sm text-center">Plantaciones</span>
                </div>
                <div className="h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl overflow-hidden flex items-center justify-center shadow-lg border-2 border-amber-300">
                  <span className="text-white font-bold text-sm text-center">I+D</span>
                </div>
                <div className="h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl overflow-hidden flex items-center justify-center shadow-lg border-2 border-orange-300">
                  <span className="text-white font-bold text-sm text-center">Infraestructura</span>
                </div>
                <div className="h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl overflow-hidden flex items-center justify-center shadow-lg border-2 border-red-300">
                  <span className="text-white font-bold text-sm text-center">Ventas</span>
                </div>
              </div>
              
              {/* Productos de la empresa */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-amber-800 mb-4 text-center border-b border-yellow-200 pb-2">Nuestros Productos</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 border-2 border-yellow-300 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                        <span className="text-white text-lg">🍓</span>
                      </div>
                      <h4 className="font-bold text-amber-900">Pulpa de Achachairú</h4>
                    </div>
                    <p className="text-sm text-amber-800">
                      Nuestra pulpa de achachairú se elabora bajo estrictos estándares de calidad.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 border-2 border-yellow-300 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                        <span className="text-white text-lg">🥬</span>
                      </div>
                      <h4 className="font-bold text-amber-900">Chips Liofilizados</h4>
                    </div>
                    <p className="text-sm text-amber-800">
                      Experimenta la magia del achachairú con nuestros chips liofilizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Áreas */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-4xl font-bold text-center text-amber-900 mb-8 border-b-4 border-yellow-400 pb-3">Nuestras Áreas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PRODUCCIÓN */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('produccion')}>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-industry text-orange-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-orange-800">Producción</h3>
                  <i className={`fas fa-chevron-${openMenu === 'produccion' ? 'up' : 'down'} ml-auto text-orange-600`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'produccion' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border border-orange-200" onClick={() => redirectToOneDrive('produccion')}>
                      <div className="text-orange-700 flex items-center font-semibold">
                        <i className="fas fa-cogs mr-3 text-orange-600"></i>Producción
                      </div>
                    </li>
                    <li className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border border-orange-200" onClick={() => redirectToOneDrive('produccion-seguimiento')}>
                      <div className="text-orange-700 flex items-center font-semibold">
                        <i className="fas fa-chart-line mr-3 text-orange-600"></i>Seguimiento
                      </div>
                    </li>
                    <li className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border border-orange-200" onClick={() => redirectToOneDrive('produccion-liofilizacion')}>
                      <div className="text-orange-700 flex items-center font-semibold">
                        <i className="fas fa-snowflake mr-3 text-orange-600"></i>Liofilización
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* PLANTACIONES */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('plantaciones')}>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-seedling text-green-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Plantaciones</h3>
                  <i className={`fas fa-chevron-${openMenu === 'plantaciones' ? 'up' : 'down'} ml-auto text-green-600`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'plantaciones' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-green-50 rounded-xl cursor-pointer transition-colors border border-green-200" onClick={() => redirectToOneDrive('plantaciones-mosca')}>
                      <div className="text-green-700 flex items-center font-semibold">
                        <i className="fas fa-bug mr-3 text-green-600"></i>Control de Mosca
                      </div>
                    </li>
                    <li className="p-3 hover:bg-green-50 rounded-xl cursor-pointer transition-colors border border-green-200" onClick={() => redirectToOneDrive('plantaciones-plantacion')}>
                      <div className="text-green-700 flex items-center font-semibold">
                        <i className="fas fa-leaf mr-3 text-green-600"></i>Plantación
                      </div>
                    </li>
                    <li className="p-3 hover:bg-green-50 rounded-xl cursor-pointer transition-colors border border-green-200" onClick={() => redirectToOneDrive('plantaciones-propiedad')}>
                      <div className="text-green-700 flex items-center font-semibold">
                        <i className="fas fa-landmark mr-3 text-green-600"></i>Propiedad
                      </div>
                    </li>
                    <li className="p-3 hover:bg-green-50 rounded-xl cursor-pointer transition-colors border border-green-200" onClick={() => redirectToOneDrive('plantaciones-tractor')}>
                      <div className="text-green-700 flex items-center font-semibold">
                        <i className="fas fa-tractor mr-3 text-green-600"></i>Maquinaria
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* PROCEDIMIENTOS - NUEVA ÁREA */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('procedimientos')}>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-clipboard-list text-purple-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-purple-800">Procedimientos</h3>
                  <i className={`fas fa-chevron-${openMenu === 'procedimientos' ? 'up' : 'down'} ml-auto text-purple-600`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'procedimientos' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-purple-50 rounded-xl cursor-pointer transition-colors border border-purple-200" onClick={() => redirectToOneDrive('procedimientos')}>
                      <div className="text-purple-700 flex items-center font-semibold">
                        <i className="fas fa-file-alt mr-3 text-purple-600"></i>Procedimientos Generales
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* LOGÍSTICA */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('logistica')}>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-truck-loading text-amber-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-amber-800">Logística</h3>
                  <i className={`fas fa-chevron-${openMenu === 'logistica' ? 'up' : 'down'} ml-auto text-amber-600`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'logistica' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('logistica-compra-de-frutas')}>
                      <div className="text-amber-700 flex items-center font-semibold">
                        <i className="fas fa-apple-alt mr-3 text-amber-600"></i>Compra de Frutas
                      </div>
                    </li>
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('logistica-compra-abastecimientos-insumos-planta')}>
                      <div className="text-amber-700 flex items-center font-semibold">
                        <i className="fas fa-boxes mr-3 text-amber-600"></i>Insumos Planta
                      </div>
                    </li>
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('logistica-exportacion')}>
                      <div className="text-amber-700 flex items-center font-semibold">
                        <i className="fas fa-globe-americas mr-3 text-amber-600"></i>Exportación
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CALIDAD */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-600 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('calidad')}>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-award text-amber-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-amber-800">Calidad</h3>
                  <i className={`fas fa-chevron-${openMenu === 'calidad' ? 'up' : 'down'} ml-auto text-amber-600`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'calidad' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('calidad-seguridad')}>
                      <div className="text-amber-700 flex items-center font-semibold">
                        <i className="fas fa-shield-alt mr-3 text-amber-600"></i>Calidad y Seguridad
                      </div>
                    </li>
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('calidad-certificaciones')}>
                      <div className="text-amber-700 flex items-center font-semibold">
                        <i className="fas fa-certificate mr-3 text-amber-600"></i>Certificaciones
                      </div>
                    </li>
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('calidad-normas')}>
                      <div className="text-amber-700 flex items-center font-semibold">
                        <i className="fas fa-book mr-3 text-amber-600"></i>Normas
                      </div>
                    </li>
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('calidad-procedimientos')}>
                      <div className="text-amber-700 flex items-center font-semibold">
                        <i className="fas fa-clipboard-list mr-3 text-amber-600"></i>Procedimientos
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* VENTAS */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-700 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('ventas')}>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-chart-line text-amber-700 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-amber-900">Ventas</h3>
                  <i className={`fas fa-chevron-${openMenu === 'ventas' ? 'up' : 'down'} ml-auto text-amber-700`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'ventas' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('ventas-manual-marca')}>
                      <div className="text-amber-800 flex items-center font-semibold">
                        <i className="fas fa-book-open mr-3 text-amber-700"></i>Manual de Marca
                      </div>
                    </li>
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('ventas-marketing')}>
                      <div className="text-amber-800 flex items-center font-semibold">
                        <i className="fas fa-bullhorn mr-3 text-amber-700"></i>Marketing
                      </div>
                    </li>
                    <li className="p-3 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors border border-amber-200" onClick={() => redirectToOneDrive('ventas-varios')}>
                      <div className="text-amber-800 flex items-center font-semibold">
                        <i className="fas fa-archive mr-3 text-amber-700"></i>Varios
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RECURSOS HUMANOS */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-700 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('rh')}>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-users text-orange-700 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Recursos Humanos</h3>
                  <i className={`fas fa-chevron-${openMenu === 'rh' ? 'up' : 'down'} ml-auto text-orange-700`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'rh' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border border-orange-200" onClick={() => redirectToOneDrive('rh')}>
                      <div className="text-orange-800 flex items-center font-semibold">
                        <i className="fas fa-user-tie mr-3 text-orange-700"></i>RRHH Principal
                      </div>
                    </li>
                    <li className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border border-orange-200" onClick={() => redirectToOneDrive('rh-capacitaciones')}>
                      <div className="text-orange-800 flex items-center font-semibold">
                        <i className="fas fa-graduation-cap mr-3 text-orange-700"></i>Capacitaciones
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ADMINISTRACIÓN */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-600 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('admin')}>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-calculator text-orange-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-orange-800">Administración</h3>
                  <i className={`fas fa-chevron-${openMenu === 'admin' ? 'up' : 'down'} ml-auto text-orange-600`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'admin' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border border-orange-200" onClick={() => redirectToOneDrive('admin-finanzas-contabilidad-legal')}>
                      <div className="text-orange-700 flex items-center font-semibold">
                        <i className="fas fa-money-bill-wave mr-3 text-orange-600"></i>Finanzas y Contabilidad
                      </div>
                    </li>
                    <li className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border border-orange-200" onClick={() => redirectToOneDrive('admin-activos-infraestructura')}>
                      <div className="text-orange-700 flex items-center font-semibold">
                        <i className="fas fa-building mr-3 text-orange-600"></i>Activos e Infraestructura
                      </div>
                    </li>
                    <li className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border border-orange-200" onClick={() => redirectToOneDrive('admin-firma-digital')}>
                      <div className="text-orange-700 flex items-center font-semibold">
                        <i className="fas fa-signature mr-3 text-orange-600"></i>Firma Digital
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* INVESTIGACIÓN Y DESARROLLO */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('investigacion')}>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-flask text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Investigación y Desarrollo</h3>
                  <i className={`fas fa-chevron-${openMenu === 'investigacion' ? 'up' : 'down'} ml-auto text-blue-600`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'investigacion' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors border border-blue-200" onClick={() => redirectToOneDrive('investigacion-desarrollo')}>
                      <div className="text-blue-700 flex items-center font-semibold">
                        <i className="fas fa-microscope mr-3 text-blue-600"></i>Investigación y Desarrollo
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ÁREA GENERAL */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gray-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('general')}>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <i className="fas fa-folder-open text-gray-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">General</h3>
                  <i className={`fas fa-chevron-${openMenu === 'general' ? 'up' : 'down'} ml-auto text-gray-600`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'general' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2">
                    <li className="p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors border border-gray-200" onClick={() => redirectToOneDrive('general-cartas')}>
                      <div className="text-gray-700 flex items-center font-semibold">
                        <i className="fas fa-envelope mr-3 text-gray-600"></i>Cartas
                      </div>
                    </li>
                    <li className="p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors border border-gray-200" onClick={() => redirectToOneDrive('general-reuniones')}>
                      <div className="text-gray-700 flex items-center font-semibold">
                        <i className="fas fa-calendar-alt mr-3 text-gray-600"></i>Reuniones - Cartas
                      </div>
                    </li>
                    <li className="p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors border border-gray-200" onClick={() => redirectToOneDrive('general-varios')}>
                      <div className="text-gray-700 flex items-center font-semibold">
                        <i className="fas fa-archive mr-3 text-gray-600"></i>Varios
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Indicadores */}
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-2xl shadow-2xl p-8 mt-12 border-4 border-yellow-300">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-900">Indicadores Clave AIRU</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl text-center border-2 border-yellow-300 shadow-lg">
                  <i className="fas fa-box text-3xl mb-3 text-amber-900"></i>
                  <h4 className="font-bold text-amber-900">Producción</h4>
                  <p className="text-2xl font-bold text-amber-900 mt-2">425 uds/día</p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl text-center border-2 border-yellow-300 shadow-lg">
                  <i className="fas fa-seedling text-3xl mb-3 text-amber-900"></i>
                  <h4 className="font-bold text-amber-900">Plantaciones</h4>
                  <p className="text-2xl font-bold text-amber-900 mt-2">120 Ha</p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl text-center border-2 border-yellow-300 shadow-lg">
                  <i className="fas fa-flask text-3xl mb-3 text-amber-900"></i>
                  <h4 className="font-bold text-amber-900">I+D</h4>
                  <p className="text-2xl font-bold text-amber-900 mt-2">15 proyectos</p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl text-center border-2 border-yellow-300 shadow-lg">
                  <i className="fas fa-building text-3xl mb-3 text-amber-900"></i>
                  <h4 className="font-bold text-amber-900">Infraestructura</h4>
                  <p className="text-2xl font-bold text-amber-900 mt-2">8 plantas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-yellow-600 to-amber-700 text-yellow-100 py-8 mt-12 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <img 
                  src="https://1drv.ms/i/c/092e39edf7b9ea99/ESEQkzPMb7RLpbth0CxaQnEBCF68IsUe-ZcE3VB_Xpbm3w?e=vMyeE6" 
                  alt="AIRU Logo" 
                  className="h-10 w-10 object-contain mr-3"
                />
                <h3 className="text-xl font-bold text-yellow-200">AIRU</h3>
              </div>
              <p className="text-sm text-yellow-200 mt-1">Innovación y calidad en cada producto</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-yellow-200">© 2025. Todos los derechos reservados.</p>
              <p className="text-sm mt-1 text-yellow-200">Sistema interno corporativo</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}