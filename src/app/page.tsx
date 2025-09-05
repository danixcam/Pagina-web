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

  // Verificar si ya hay una sesión activa al cargar la página
  useEffect(() => {
    const savedAuth = localStorage.getItem('agiru-auth');
    if (savedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleSubmenu = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // Simular validación de credenciales (en un caso real, esto se conectaría a un backend)
    setTimeout(() => {
      // Credenciales de ejemplo (en producción esto vendría de una base de datos segura)
      const validUsers = [
        { username: 'admin', password: 'admin123', role: 'administrador' },
        { username: 'produccion', password: 'prod2023', role: 'produccion' },
        { username: 'ventas', password: 'ventas2023', role: 'ventas' },
        { username: 'logistica', password: 'logistica2023', role: 'logistica' },
      ];

      const user = validUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setIsAuthenticated(true);
        // Guardar autenticación en localStorage (en producción usaríamos métodos más seguros)
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
    localStorage.removeItem('agiru-auth');
  };

  // Si el usuario no está autenticado, mostrar formulario de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-800">
              AGIRU
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
            <p className="font-semibold">Credenciales de ejemplo:</p>
            <p>Usuario: admin | Contraseña: admin123</p>
            <p>Usuario: produccion | Contraseña: prod2023</p>
          </div>
        </div>
      </div>
    );
  }

  // Contenido original (solo visible para usuarios autenticados)
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header con botón de cerrar sesión */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-900 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-4xl font-bold text-white">
                AGIRU
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
            
            {/* Pestañas de navegación */}
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
                className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'contacto' ? 'bg-amber-600 text-white' : 'text-amber-200 hover:bg-amber-700'}`}
                onClick={() => setActiveTab('contacto')}
              >
                Contacto
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Resto del contenido de la página */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery Section - Left Side */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-4 h-full">
              <h2 className="text-xl font-bold text-amber-900 mb-4 text-center">Galería AGIRU</h2>
              
              {/* Carrusel de imágenes */}
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Imagen destacada</span>
                </div>
                <div className="p-3 bg-amber-100 text-amber-800 text-sm text-center">
                  Nuestras instalaciones de producción
                </div>
              </div>
              
              {/* Miniaturas de imágenes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-24 bg-gradient-to-r from-amber-300 to-orange-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Productos</span>
                </div>
                <div className="h-24 bg-gradient-to-r from-amber-500 to-orange-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Equipo</span>
                </div>
                <div className="h-24 bg-gradient-to-r from-amber-400 to-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Procesos</span>
                </div>
                <div className="h-24 bg-gradient-to-r from-amber-600 to-orange-700 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Logística</span>
                </div>
              </div>
              
              {/* Eventos destacados */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-3 text-center">Próximos Eventos</h3>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-start mb-3">
                    <div className="bg-amber-600 text-white text-xs font-bold py-1 px-2 rounded mr-3">15 OCT</div>
                    <div className="text-sm text-amber-700">Reunión general de equipo</div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-600 text-white text-xs font-bold py-1 px-2 rounded mr-3">22 OCT</div>
                    <div className="text-sm text-amber-700">Lanzamiento nueva línea de productos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Areas Section - Right Side */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">Nuestras Áreas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Producción */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('produccion')}>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-cogs text-orange-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-800">Producción</h3>
                </div>
                <div className={`submenu ${openMenu === 'produccion' ? 'block' : 'hidden'}`}>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-700 flex items-center"><i className="fas fa-vial mr-2"></i>Control de Calidad</div></li>
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-700 flex items-center"><i className="fas fa-chart-line mr-2"></i>Métricas de Producción</div></li>
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-700 flex items-center"><i className="fas fa-clock mr-2"></i>Programación</div></li>
                  </ul>
                </div>
              </div>
              
              {/* Logística */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('logistica')}>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-truck text-amber-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-800">Logística</h3>
                </div>
                <div className={`submenu ${openMenu === 'logistica' ? 'block' : 'hidden'}`}>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-700 flex items-center"><i className="fas fa-boxes mr-2"></i>Gestión de Inventario</div></li>
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-700 flex items-center"><i className="fas fa-shipping-fast mr-2"></i>Envíos y Distribución</div></li>
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-700 flex items-center"><i className="fas fa-route mr-2"></i>Planificación de Rutas</div></li>
                  </ul>
                </div>
              </div>
              
              {/* Calidad */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-600">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('calidad')}>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-award text-amber-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-800">Control de Calidad</h3>
                </div>
                <div className={`submenu ${openMenu === 'calidad' ? 'block' : 'hidden'}`}>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-700 flex items-center"><i className="fas fa-clipboard-check mr-2"></i>Protocolos</div></li>
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-700 flex items-center"><i className="fas fa-vial mr-2"></i>Pruebas</div></li>
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-700 flex items-center"><i className="fas fa-file-medical mr-2"></i>Certificaciones</div></li>
                  </ul>
                </div>
              </div>
              
              {/* Ventas */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-700">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('ventas')}>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-chart-bar text-amber-700 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900">Ventas</h3>
                </div>
                <div className={`submenu ${openMenu === 'ventas' ? 'block' : 'hidden'}`}>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-800 flex items-center"><i className="fas fa-file-invoice-dollar mr-2"></i>Reportes de Ventas</div></li>
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-800 flex items-center"><i className="fas fa-users mr-2"></i>Gestión de Clientes</div></li>
                    <li className="p-2 hover:bg-amber-50 rounded"><div className="text-amber-800 flex items-center"><i className="fas fa-percentage mr-2"></i>Promociones</div></li>
                  </ul>
                </div>
              </div>
              
              {/* Recursos Humanos */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-700">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('rh')}>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-users text-orange-700 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-900">Recursos Humanos</h3>
                </div>
                <div className={`submenu ${openMenu === 'rh' ? 'block' : 'hidden'}`}>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-800 flex items-center"><i className="fas fa-user-clock mr-2"></i>Control de Asistencia</div></li>
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-800 flex items-center"><i className="fas fa-user-graduate mr-2"></i>Capacitación</div></li>
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-800 flex items-center"><i className="fas fa-tasks mr-2"></i>Evaluaciones</div></li>
                  </ul>
                </div>
              </div>
              
              {/* Administración */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600">
                <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleSubmenu('admin')}>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-calculator text-orange-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-800">Administración</h3>
                </div>
                <div className={`submenu ${openMenu === 'admin' ? 'block' : 'hidden'}`}>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-700 flex items-center"><i className="fas fa-file-invoice-dollar mr-2"></i>Contabilidad</div></li>
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-700 flex items-center"><i className="fas fa-hand-holding-usd mr-2"></i>Presupuestos</div></li>
                    <li className="p-2 hover:bg-orange-50 rounded"><div className="text-orange-700 flex items-center"><i className="fas fa-file-contract mr-2"></i>Proveedores</div></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Quick Info Section */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl shadow-lg p-8 mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Indicadores Clave</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                  <i className="fas fa-box text-2xl mb-2"></i>
                  <h4 className="font-semibold">Inventario Actual</h4>
                  <p className="text-xl font-bold">1,245 unidades</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                  <i className="fas fa-cog text-2xl mb-2"></i>
                  <h4 className="font-semibold">Producción Diaria</h4>
                  <p className="text-xl font-bold">350 unidades</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                  <i className="fas fa-truck text-2xl mb-2"></i>
                  <h4 className="font-semibold">Pedidos Entregados</h4>
                  <p className="text-xl font-bold">128 pedidos</p>
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
              <h3 className="text-lg font-bold text-amber-100">AGIRU</h3>
              <p className="text-sm">Calidad e innovación en cada producto</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">© 2023 AGIRU. Todos los derechos reservados.</p>
              <p className="text-sm mt-1">Sitio corporativo interno</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}