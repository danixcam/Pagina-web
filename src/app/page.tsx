import React, { useState } from 'react';

// Definir tipos para los parámetros
type MenuType = 
  | 'plantacion' | 'planta' | 'logistica' | 'calidad' | 'admin' 
  | 'rh' | 'marketing' | 'investigacion' | 'ventas' | 'import-export'
  | 'respaldos' | 'gestion' | 'gerencia' | 'finanzas' | 'personales'
  | 'comercial' | 'tecnologia' | 'operaciones' | 'juridico' | 'sostenibilidad'
  | null;

type AreaType = 
  | 'plantacion' | 'planta' | 'logistica' | 'calidad' | 'admin' 
  | 'rh' | 'marketing' | 'investigacion' | 'ventas' | 'import-export'
  | 'respaldos' | 'gestion' | 'gerencia' | 'finanzas' | 'personales'
  | 'comercial' | 'tecnologia' | 'operaciones' | 'juridico' | 'sostenibilidad';

type SectionType = 'areas' | 'mision' | 'paneles';

const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const [activeSection, setActiveSection] = useState<SectionType>('areas');

  // Función para alternar menús desplegables con tipo definido
  const toggleSubmenu = (menu: MenuType) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Función para verificar permisos con tipo definido
  const hasAccess = (area: AreaType): boolean => {
    // En una implementación real, esto verificaría los permisos del usuario
    return true;
  };

  // Función para redirigir a OneDrive con tipo definido
  const redirectToOneDrive = (folder: string): void => {
    // En una implementación real, esto redirigiría a la carpeta correspondiente en OneDrive
    console.log(`Redirigiendo a: ${folder}`);
    alert(`Redirigiendo a: ${folder}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-6">
      {/* Header Mejorado */}
      <header className="bg-white rounded-3xl shadow-xl p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo Mejorado */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <i className="fas fa-leaf text-white text-2xl md:text-3xl"></i>
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-orange-900">Airú</h1>
              <p className="text-sm md:text-base text-orange-700">Jugos Naturales</p>
            </div>
          </div>
          
          {/* Navegación Superior */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <button 
              className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                activeSection === 'areas' 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
              onClick={() => setActiveSection('areas')}
            >
              Nuestras Áreas
            </button>
            <button 
              className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                activeSection === 'mision' 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
              onClick={() => setActiveSection('mision')}
            >
              Misión, Visión y Valores
            </button>
            <button 
              className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                activeSection === 'paneles' 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
              onClick={() => setActiveSection('paneles')}
            >
              Paneles
            </button>
          </div>
        </div>
      </header>

      {/* Sección de Misión, Visión y Valores */}
      {activeSection === 'mision' && (
        <div className="w-full xl:w-2/3 mx-auto mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-900 mb-6 md:mb-8 border-b-4 border-orange-400 pb-2 md:pb-3">
            Nuestros Valores
          </h2>
          
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
              En Airú, nos comprometemos a ofrecer productos frescos, saludables y de alta calidad, 
              cultivados con cuidado por agricultores locales. Nos destacamos por nuestra producción 
              orgánica, libre de agroquímicos y sin azúcares añadidos. Promovemos la sostenibilidad 
              ambiental y el respeto por la naturaleza en cada etapa de nuestra cadena productiva. 
              Descubre nuestro compromiso con la excelencia y el cuidado del achachairú.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <i className="fas fa-award text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-green-800">Calidad y Frescura</h3>
              </div>
              <p className="text-gray-700">
                Somos comprometidos con ofrecer productos frescos, cultivados de forma responsable y sin agroquímicos.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <i className="fas fa-leaf text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-blue-800">Sostenibilidad Ambiental</h3>
              </div>
              <p className="text-gray-700">
                Nos preocupamos por el medio ambiente y practicamos métodos de producción sostenibles que respetan la naturaleza.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sección de Paneles */}
      {activeSection === 'paneles' && (
        <div className="w-full xl:w-2/3 mx-auto mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-900 mb-6 md:mb-8 border-b-4 border-orange-400 pb-2 md:pb-3">
            Paneles
          </h2>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <i className="fas fa-tachometer-alt text-5xl text-orange-400 mb-4"></i>
            <h3 className="text-xl font-bold text-orange-800 mb-2">Paneles en Desarrollo</h3>
            <p className="text-gray-600">
              Esta sección estará disponible próximamente con métricas y análisis en tiempo real.
            </p>
          </div>
        </div>
      )}

      {/* Sección de Áreas */}
      {activeSection === 'areas' && (
        <div className="w-full xl:w-2/3 mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-900 mb-6 md:mb-8 border-b-4 border-orange-400 pb-2 md:pb-3">
            Nuestras Áreas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* PLANTACIÓN */}
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

            {/* ÁREAS ADICIONALES PARA COMPLETAR LAS 15 */}
            
            {/* COMERCIAL */}
            {hasAccess('comercial') && (
              <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-red-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('comercial')}>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                    <i className="fas fa-handshake text-red-600 text-xl md:text-2xl"></i>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-red-800">Comercial</h3>
                  <i className={`fas fa-chevron-${openMenu === 'comercial' ? 'up' : 'down'} ml-auto text-red-600 text-lg`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'comercial' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-red-200 hover:border-red-300 hover:shadow-lg" onClick={() => redirectToOneDrive('clientes')}>
                      <div className="text-red-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-users mr-3 md:mr-4 text-red-600 text-lg"></i>Clientes
                      </div>
                    </li>
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-red-200 hover:border-red-300 hover:shadow-lg" onClick={() => redirectToOneDrive('contratos-comerciales')}>
                      <div className="text-red-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-file-signature mr-3 md:mr-4 text-red-600 text-lg"></i>Contratos Comerciales
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TECNOLOGÍA */}
            {hasAccess('tecnologia') && (
              <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-indigo-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('tecnologia')}>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                    <i className="fas fa-laptop-code text-indigo-600 text-xl md:text-2xl"></i>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-indigo-800">Tecnología</h3>
                  <i className={`fas fa-chevron-${openMenu === 'tecnologia' ? 'up' : 'down'} ml-auto text-indigo-600 text-lg`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'tecnologia' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-indigo-200 hover:border-indigo-300 hover:shadow-lg" onClick={() => redirectToOneDrive('sistemas')}>
                      <div className="text-indigo-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-server mr-3 md:mr-4 text-indigo-600 text-lg"></i>Sistemas
                      </div>
                    </li>
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-indigo-200 hover:border-indigo-300 hover:shadow-lg" onClick={() => redirectToOneDrive('redes')}>
                      <div className="text-indigo-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-network-wired mr-3 md:mr-4 text-indigo-600 text-lg"></i>Redes
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* OPERACIONES */}
            {hasAccess('operaciones') && (
              <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-teal-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('operaciones')}>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                    <i className="fas fa-cogs text-teal-600 text-xl md:text-2xl"></i>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-teal-800">Operaciones</h3>
                  <i className={`fas fa-chevron-${openMenu === 'operaciones' ? 'up' : 'down'} ml-auto text-teal-600 text-lg`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'operaciones' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-teal-200 hover:border-teal-300 hover:shadow-lg" onClick={() => redirectToOneDrive('procesos')}>
                      <div className="text-teal-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-stream mr-3 md:mr-4 text-teal-600 text-lg"></i>Procesos
                      </div>
                    </li>
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-teal-200 hover:border-teal-300 hover:shadow-lg" onClick={() => redirectToOneDrive('optimizacion')}>
                      <div className="text-teal-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-chart-line mr-3 md:mr-4 text-teal-600 text-lg"></i>Optimización
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* JURÍDICO */}
            {hasAccess('juridico') && (
              <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-yellow-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('juridico')}>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                    <i className="fas fa-gavel text-yellow-600 text-xl md:text-2xl"></i>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-yellow-800">Jurídico</h3>
                  <i className={`fas fa-chevron-${openMenu === 'juridico' ? 'up' : 'down'} ml-auto text-yellow-600 text-lg`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'juridico' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-yellow-200 hover:border-yellow-300 hover:shadow-lg" onClick={() => redirectToOneDrive('contratos-legal')}>
                      <div className="text-yellow-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-file-contract mr-3 md:mr-4 text-yellow-600 text-lg"></i>Contratos Legal
                      </div>
                    </li>
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-yellow-200 hover:border-yellow-300 hover:shadow-lg" onClick={() => redirectToOneDrive('litigios')}>
                      <div className="text-yellow-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-balance-scale mr-3 md:mr-4 text-yellow-600 text-lg"></i>Litigios
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* SOSTENIBILIDAD */}
            {hasAccess('sostenibilidad') && (
              <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-l-4 border-emerald-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 md:mb-4 cursor-pointer" onClick={() => toggleSubmenu('sostenibilidad')}>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                    <i className="fas fa-recycle text-emerald-600 text-xl md:text-2xl"></i>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-emerald-800">Sostenibilidad</h3>
                  <i className={`fas fa-chevron-${openMenu === 'sostenibilidad' ? 'up' : 'down'} ml-auto text-emerald-600 text-lg`}></i>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openMenu === 'sostenibilidad' ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-emerald-200 hover:border-emerald-300 hover:shadow-lg" onClick={() => redirectToOneDrive('impacto-ambiental')}>
                      <div className="text-emerald-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-leaf mr-3 md:mr-4 text-emerald-600 text-lg"></i>Impacto Ambiental
                      </div>
                    </li>
                    <li className="p-3 md:p-4 hover:bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-emerald-200 hover:border-emerald-300 hover:shadow-lg" onClick={() => redirectToOneDrive('rsc')}>
                      <div className="text-emerald-700 flex items-center font-semibold text-sm md:text-base">
                        <i className="fas fa-hands-helping mr-3 md:mr-4 text-emerald-600 text-lg"></i>Responsabilidad Social
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;