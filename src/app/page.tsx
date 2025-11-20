'use client';

import React, { useEffect, useState } from 'react';

// --------------------
// Types
// --------------------

type MenuType =
  | 'plantacion' | 'planta' | 'logistica' | 'calidad' | 'admin'
  | 'rh' | 'marketing' | 'investigacion' | 'ventas' | 'import-export'
  | 'respaldos' | 'gestion' | 'gerencia' | 'finanzas' | 'personales'
  | null;

type AreaType = Exclude<MenuType, null>;

type SectionType = 'areas' | 'mision' | 'paneles';

interface Subcarpeta {
  nombre: string;
  clave: string;
  icono: string;
}

interface AreaInfo {
  id: AreaType;
  nombre: string;
  icono: string;
  color: string; // color token name (green, orange, amber, etc.)
  subcarpetas: Subcarpeta[];
}

interface UserDef {
  username: string;
  password: string;
  role: string;
}

// --------------------
// Sample users (development only)
// --------------------

const SAMPLE_USERS: UserDef[] = [
  { username: 'Emily', password: 'admin2025', role: 'administracion' },
  { username: 'Rodrigo', password: 'prod2025', role: 'produccion' },
  { username: 'Fernando', password: 'nano2025', role: 'gerencia' },
  { username: 'Daniela', password: 'dan2025', role: 'gestion' },
  { username: 'invitado', password: 'invitado2025', role: 'invitado' },
];

// --------------------
// Permissions
// --------------------

const USER_PERMISSIONS: Record<string, AreaType[]> = {
  administracion: ['plantacion','planta','logistica','calidad','admin','rh','marketing','investigacion','ventas','import-export','respaldos','gestion','gerencia','finanzas','personales'],
  produccion: ['plantacion','planta','logistica','calidad','investigacion'],
  gerencia: ['plantacion','planta','logistica','calidad','admin','rh','marketing','investigacion','ventas','import-export','gerencia','finanzas'],
  gestion: ['plantacion','planta','logistica','calidad','admin','rh','marketing','investigacion','ventas'],
  invitado: ['plantacion','planta'],
};

// --------------------
// Areas data (15 areas) — puedes editar nombres / iconos / enlaces aquí
// --------------------

const AREAS_DATA: AreaInfo[] = [
  { id: 'plantacion', nombre: 'PLANTACIÓN', icono: 'fas fa-seedling', color: 'green', subcarpetas: [
    { nombre: 'Histórico antes de 2025', clave: 'historico-antes-de-2025', icono: 'fas fa-history' },
    { nombre: 'Propiedad', clave: 'propiedad', icono: 'fas fa-landmark' },
  ] },

  { id: 'planta', nombre: 'PLANTA', icono: 'fas fa-industry', color: 'orange', subcarpetas: [
    { nombre: 'Almacén', clave: 'almacen', icono: 'fas fa-warehouse' },
    { nombre: 'Mantenimiento de Equipos', clave: 'mantenimiento-de-equipos', icono: 'fas fa-tools' },
    { nombre: 'Producción', clave: 'produccion', icono: 'fas fa-cogs' },
  ] },

  { id: 'logistica', nombre: 'LOGÍSTICA', icono: 'fas fa-truck-loading', color: 'amber', subcarpetas: [
    { nombre: 'Compra / Abastecimiento', clave: 'compra-abastecimiento-insumos-planta', icono: 'fas fa-boxes' },
    { nombre: 'Cotizaciones', clave: 'cotizaciones-activos-infraestructura', icono: 'fas fa-file-invoice-dollar' },
    { nombre: 'Distribución / Transporte', clave: 'distribucio-transporte', icono: 'fas fa-truck' },
    { nombre: 'Proveedores', clave: 'proveedores', icono: 'fas fa-handshake' },
  ] },

  { id: 'calidad', nombre: 'CALIDAD', icono: 'fas fa-award', color: 'amber', subcarpetas: [
    { nombre: 'Calidad y Seguridad', clave: 'calidad-seguridad', icono: 'fas fa-shield-alt' },
    { nombre: 'Certificaciones', clave: 'certificaciones', icono: 'fas fa-certificate' },
    { nombre: 'Fichas Técnicas', clave: 'fichas-tecnicas', icono: 'fas fa-clipboard-list' },
    { nombre: 'Normas', clave: 'normas', icono: 'fas fa-book' },
  ] },

  { id: 'admin', nombre: 'ADMINISTRACIÓN', icono: 'fas fa-calculator', color: 'orange', subcarpetas: [
    { nombre: '2024 AD', clave: '2024-ad', icono: 'fas fa-folder' },
    { nombre: '2025 AD', clave: '2025-ad', icono: 'fas fa-folder-open' },
  ] },

  { id: 'rh', nombre: 'RECURSOS HUMANOS', icono: 'fas fa-users', color: 'orange', subcarpetas: [
    { nombre: '2024 RH', clave: '2024-rh', icono: 'fas fa-folder' },
    { nombre: 'Afiliaciones', clave: 'afiliaciones', icono: 'fas fa-id-card' },
    { nombre: 'Capacitaciones', clave: 'capacitaciones', icono: 'fas fa-graduation-cap' },
    { nombre: 'CNS', clave: 'cns', icono: 'fas fa-file-medical' },
    { nombre: 'Contratos', clave: 'contratos', icono: 'fas fa-file-contract' },
  ] },

  { id: 'marketing', nombre: 'MARKETING', icono: 'fas fa-bullhorn', color: 'amber', subcarpetas: [
    { nombre: 'Catálogos', clave: 'catalogos', icono: 'fas fa-book' },
    { nombre: 'Etiquetas', clave: 'etiquetas', icono: 'fas fa-tag' },
    { nombre: 'Galería Imágenes', clave: 'galeria-imagenes', icono: 'fas fa-images' },
    { nombre: 'Plan Marketing', clave: 'plan-marketing', icono: 'fas fa-chart-line' },
  ] },

  { id: 'investigacion', nombre: 'INVESTIGACIÓN Y DESARROLLO', icono: 'fas fa-flask', color: 'blue', subcarpetas: [
    { nombre: 'Cultivo', clave: 'cultivo', icono: 'fas fa-seedling' },
    { nombre: 'Estudios', clave: 'estudios-beneficiosos', icono: 'fas fa-microscope' },
    { nombre: 'Literatura', clave: 'literatura', icono: 'fas fa-book' },
  ] },

  { id: 'ventas', nombre: 'VENTAS', icono: 'fas fa-chart-line', color: 'amber', subcarpetas: [
    { nombre: 'Análisis de Ventas', clave: 'analisis-de-ventas', icono: 'fas fa-chart-bar' },
    { nombre: 'Ventas', clave: 'ventas', icono: 'fas fa-shopping-cart' },
    { nombre: 'Ventas Supermercados', clave: 'ventas-supermercados', icono: 'fas fa-store' },
  ] },

  { id: 'import-export', nombre: 'IMPORT - EXPORT', icono: 'fas fa-globe-americas', color: 'purple', subcarpetas: [
    { nombre: 'Documentación Aduanas', clave: 'documentacion-aduanas', icono: 'fas fa-file-contract' },
    { nombre: 'Exportación', clave: 'exportacion', icono: 'fas fa-plane-departure' },
    { nombre: 'Importación', clave: 'importacion', icono: 'fas fa-plane-arrival' },
  ] },

  { id: 'respaldos', nombre: 'RESPALDOS DE PROCEDIMIENTOS', icono: 'fas fa-hdd', color: 'gray', subcarpetas: [
    { nombre: 'Respaldos', clave: 'respaldos', icono: 'fas fa-database' },
  ] },

  { id: 'gestion', nombre: 'SISTEMA DE GESTIÓN', icono: 'fas fa-clipboard-list', color: 'purple', subcarpetas: [
    { nombre: 'Procedimientos', clave: 'procedimientos', icono: 'fas fa-file-alt' },
  ] },

  { id: 'gerencia', nombre: 'GERENCIA', icono: 'fas fa-user-tie', color: 'blue', subcarpetas: [
    { nombre: 'Documentos', clave: 'documentos', icono: 'fas fa-folder' },
  ] },

  { id: 'finanzas', nombre: 'FINANZAS - CONTABILIDAD - LEGAL', icono: 'fas fa-money-bill-wave', color: 'green', subcarpetas: [
    { nombre: 'Años Pasados', clave: 'años-pasados', icono: 'fas fa-history' },
    { nombre: '2025 FI', clave: '2025-fi', icono: 'fas fa-folder-open' },
  ] },

  { id: 'personales', nombre: 'CARPETAS PERSONALES', icono: 'fas fa-user-circle', color: 'orange', subcarpetas: [
    { nombre: 'Nano', clave: 'nano', icono: 'fas fa-user' },
    { nombre: 'Rodrigo', clave: 'rodrigo', icono: 'fas fa-user' },
    { nombre: 'Santiago', clave: 'santiago', icono: 'fas fa-user' },
    { nombre: 'Emili', clave: 'emili', icono: 'fas fa-user' },
    { nombre: 'Daniela', clave: 'daniela', icono: 'fas fa-user' },
  ] },
];

// --------------------
// OneDrive / Drive links map (centralizado)
// --------------------

const LINKS_MAP: Record<string, string> = {
  // ejemplo: 'almacen': 'https://1drv.ms/f/..'
  'historico-antes-de-2025': 'https://1drv.ms/f/c/092e39edf7b9ea99/ElIubDi-PlpAp3zW9TP55h8BBSRCpYkxuTshu8F7UruV9A?e=o8lsN1',
  'propiedad': 'https://1drv.ms/f/c/092e39edf7b9ea99/Ep7Sh3wa9-ZNroCBnJXxVAYBOluaOnizaCe--NcXa_996A?e=yuEsD0',
  'almacen': 'https://1drv.ms/f/c/092e39edf7b9ea99/EnlE7wF0eBhArVaqhXxnymEBbxzq_2y6X7GNf-kieXY3Tw?e=oBo1na',
  // ... puedes rellenar el resto o mantener el objeto como ejemplo
  'procedimientos': 'https://effortless-croissant-fdfd7d.netlify.app/',
  'nano': 'https://1drv.ms/f/c/092e39edf7b9ea99/EjVQpvntLZhOnDLC7r0ZjSkBcTBz8bKlgu2E-d90epzJRQ?e=yYQ8yb',
  'daniela': 'https://1drv.ms/f/c/092e39edf7b9ea99/EgwujdpFBVJCjOF8KQuYmqcB5G2gmrtVrk4bTHbwymP5cw?e=9yJJ00',
  // agrega aquí el resto de enlaces según necesites
};

// --------------------
// Utilities
// --------------------

const setAuthStorage = (username: string, role: string) => {
  localStorage.setItem('agiru-auth', JSON.stringify({ username, role, timestamp: Date.now() }));
};

const clearAuthStorage = () => {
  localStorage.removeItem('agiru-auth');
};

const readAuthStorage = () => {
  try {
    const raw = localStorage.getItem('agiru-auth');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

// --------------------
// Subcomponents
// --------------------

function Icon({ className }: { className?: string }) {
  // Placeholder for FontAwesome usage — tu proyecto debe incluir FA o usar heroicons
  return <i className={className}></i>;
}

function LoginForm({ onSuccess }: { onSuccess: (username: string, role: string) => void; }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const found = SAMPLE_USERS.find(u => u.username === username && u.password === password);
      if (found) {
        setAuthStorage(found.username, found.role);
        onSuccess(found.username, found.role);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-orange-300 transform hover:scale-101 transition-transform duration-200">
        <div className="text-center mb-6">
          <div className="h-24 w-24 mx-auto flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-3 shadow-2xl border-4 border-white">
            <img src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-orange-900 mt-4">Airú</h1>
          <p className="text-orange-700 font-semibold">Sistema Interno - Acceso Restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (<div className="bg-red-50 text-red-700 p-3 rounded-2xl text-sm border-2 border-red-200">{error}</div>)}

          <label className="block">
            <span className="text-sm font-bold text-orange-800">Usuario</span>
            <input value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full rounded-2xl border-2 border-orange-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ingrese su usuario" required />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-orange-800">Contraseña</span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-2xl border-2 border-orange-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ingrese su contraseña" required />
          </label>

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-2xl font-bold disabled:opacity-70">
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>

          <div className="text-xs text-center text-orange-600 mt-2">Acceso exclusivo para personal autorizado</div>
        </form>
      </div>
    </div>
  );
}

function Header({ currentUser, role, onLogout, activeSection, setActiveSection }: { currentUser: string; role: string; onLogout: () => void; activeSection: SectionType; setActiveSection: (s: SectionType) => void; }) {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-amber-600 shadow-2xl border-b-4 border-orange-400">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="h-16 w-16 mr-4 flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-2 shadow-2xl border-4 border-white">
              <img src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-orange-100 text-sm">Bienvenido</span>
              <span className="text-white font-bold text-lg truncate max-w-xs">{currentUser}</span>
              <span className="text-orange-200 text-xs">Rol: {role}</span>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setActiveSection('areas')} className={`px-4 py-2 rounded-2xl font-bold text-sm ${activeSection === 'areas' ? 'bg-white text-orange-600 shadow-2xl' : 'text-orange-100 hover:bg-white hover:text-orange-600'}`}>Áreas</button>
            <button onClick={() => setActiveSection('mision')} className={`px-4 py-2 rounded-2xl font-bold text-sm ${activeSection === 'mision' ? 'bg-white text-orange-600 shadow-2xl' : 'text-orange-100 hover:bg-white hover:text-orange-600'}`}>Misión</button>
            <button onClick={() => setActiveSection('paneles')} className={`px-4 py-2 rounded-2xl font-bold text-sm ${activeSection === 'paneles' ? 'bg-white text-orange-600 shadow-2xl' : 'text-orange-100 hover:bg-white hover:text-orange-600'}`}>Paneles</button>
            <button onClick={onLogout} className="px-4 py-2 rounded-2xl font-bold text-sm bg-white text-orange-600">Salir</button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function AreaCard({ area, openMenu, toggleSubmenu, onOpenLink }: { area: AreaInfo; openMenu: MenuType; toggleSubmenu: (m: MenuType) => void; onOpenLink: (clave: string) => void; }) {
  const isOpen = openMenu === area.id;
  return (
    <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 border-l-8 transition-all duration-200 hover:shadow-lg cursor-pointer" style={{ borderLeftColor: `var(--color-${area.color}-500)` }} onClick={() => toggleSubmenu(area.id)}>
      <div className="flex items-center">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mr-3" style={{ background: `linear-gradient(135deg, var(--color-${area.color}-100), var(--color-${area.color}-200))` }}>
          <i className={`${area.icono} text-xl md:text-2xl`} style={{ color: `var(--color-${area.color}-600)` }}></i>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold truncate" style={{ color: `var(--color-${area.color}-800)` }}>{area.nombre}</h3>
          <p className="text-xs text-gray-500 mt-1">{area.subcarpetas.length} {area.subcarpetas.length === 1 ? 'carpeta' : 'carpetas'}</p>
        </div>

        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-lg ml-2`} style={{ color: `var(--color-${area.color}-600)` }}></i>
      </div>

      <div className={`overflow-hidden transition-[max-height] duration-300 mt-3 ${isOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {area.subcarpetas.map((s, i) => (
            <div key={i} className="p-3 rounded-2xl border-2 hover:shadow-md" style={{ borderColor: `var(--color-${area.color}-200)`, backgroundColor: `var(--color-${area.color}-50)` }} onClick={(e) => { e.stopPropagation(); onOpenLink(s.clave); }}>
              <div className="flex items-center font-semibold text-sm truncate" style={{ color: `var(--color-${area.color}-700)` }}>
                <i className={`${s.icono} mr-3 text-lg`}></i>
                <span className="truncate">{s.nombre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --------------------
// Main component
// --------------------

export default function AiruHome() {
  const [activeSection, setActiveSection] = useState<SectionType>('areas');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [openMenu, setOpenMenu] = useState<MenuType>(null);

  useEffect(() => {
    const auth = readAuthStorage();
    if (auth && auth.username && auth.role) {
      setIsAuthenticated(true);
      setCurrentUser(auth.username);
      setUserRole(auth.role);
    }
  }, []);

  const handleLoginSuccess = (username: string, role: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
    setUserRole(role);
  };

  const handleLogout = () => {
    clearAuthStorage();
    setIsAuthenticated(false);
    setCurrentUser('');
    setUserRole('');
    setOpenMenu(null);
  };

  const toggleSubmenu = (menu: MenuType) => setOpenMenu(prev => prev === menu ? null : menu);

  const redirectToOneDrive = (clave: string) => {
    const url = LINKS_MAP[clave] || '#';
    if (clave === 'procedimientos') {
      // si quieres redirigir en la misma pestaña
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  const hasAccess = (areaId: AreaType) => {
    const perms = USER_PERMISSIONS[userRole] || [];
    return perms.includes(areaId);
  };

  if (!isAuthenticated) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header currentUser={currentUser} role={userRole} onLogout={handleLogout} activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="container mx-auto px-4 py-6">
        {/* Misión */}
        {activeSection === 'mision' && (
          <section className="w-full xl:w-2/3 mx-auto mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-900 mb-6 border-b-4 border-orange-400 pb-2">Nuestros Valores</h2>

            <div className="bg-white rounded-3xl shadow p-6 mb-6">
              <p className="text-lg text-gray-700 text-center">En Airú, nos comprometemos a ofrecer productos frescos, saludables y de alta calidad, cultivados con cuidado por agricultores locales. Nos destacamos por nuestra producción orgánica, libre de agroquímicos y sin azúcares añadidos. Promovemos la sostenibilidad ambiental y el respeto por la naturaleza en cada etapa de nuestra cadena productiva.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4"><i className="fas fa-award text-green-600"></i></div>
                  <h3 className="text-xl font-bold text-green-800">Calidad y Frescura</h3>
                </div>
                <p className="text-gray-700">Ofrecemos productos frescos, cultivados de forma responsable.</p>
              </div>

              <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4"><i className="fas fa-leaf text-blue-600"></i></div>
                  <h3 className="text-xl font-bold text-blue-800">Sostenibilidad Ambiental</h3>
                </div>
                <p className="text-gray-700">Practicamos métodos sostenibles que respetan la naturaleza.</p>
              </div>
            </div>
          </section>
        )}

        {/* Paneles */}
        {activeSection === 'paneles' && (
          <section className="w-full xl:w-2/3 mx-auto mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-900 mb-6 border-b-4 border-orange-400 pb-2">Paneles</h2>
            <div className="bg-white rounded-3xl shadow p-8 text-center">
              <i className="fas fa-tachometer-alt text-5xl text-orange-400 mb-4"></i>
              <h3 className="text-xl font-bold text-orange-800">Paneles en Desarrollo</h3>
              <p className="text-gray-600">Esta sección estará disponible próximamente con métricas y análisis en tiempo real.</p>
            </div>
          </section>
        )}

        {/* Áreas */}
        {activeSection === 'areas' && (
          <section className="flex flex-col xl:flex-row gap-6">
            <aside className="w-full xl:w-1/3">
              <div className="bg-white rounded-3xl shadow p-4 h-full border-4 border-orange-200">
                <h3 className="text-xl font-bold text-orange-900 mb-4 text-center border-b-2 border-orange-200 pb-2">Galería</h3>
                <div className="rounded-2xl overflow-hidden shadow mb-4 cursor-pointer" onClick={() => window.open('https://drive.google.com/drive/folders/1jS93cvrPySFzgKkhXBxvQeL19wK-h01D', '_blank')}>
                  <div className="relative h-44 bg-gradient-to-r from-orange-400 to-amber-500">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">Haz clic para ver más imágenes</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-2xl p-4">
                  <h4 className="text-lg font-bold mb-3 text-center">Indicadores Clave</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/20 p-3 rounded-2xl text-center"> <i className="fas fa-file-contract mb-2 block"></i> <div className="font-bold">Arancelaria</div> <div className="text-sm">0813.40.00.00</div></div>
                    <div className="bg-white/20 p-3 rounded-2xl text-center"> <i className="fas fa-industry mb-2 block"></i> <div className="font-bold">Chips/mes</div> <div className="text-sm">1,000</div></div>
                    <div className="bg-white/20 p-3 rounded-2xl text-center"> <i className="fas fa-weight mb-2 block"></i> <div className="font-bold">Pulpa/mes</div> <div className="text-sm">1,000 Kg</div></div>
                    <div className="bg-white/20 p-3 rounded-2xl text-center"> <i className="fas fa-building mb-2 block"></i> <div className="font-bold">Plantas</div> <div className="text-sm">1</div></div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="w-full xl:w-2/3">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-orange-900 mb-6 border-b-4 border-orange-400 pb-2">Nuestras Áreas</h2>

              <div className="max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {AREAS_DATA.map(area => (
                    hasAccess(area.id) && (
                      <AreaCard key={area.id} area={area} openMenu={openMenu} toggleSubmenu={toggleSubmenu} onOpenLink={redirectToOneDrive} />
                    )
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gradient-to-r from-orange-600 to-amber-700 text-orange-100 py-6 mt-8 border-t-4 border-orange-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-10 w-10 mr-3 flex items-center justify-center bg-white rounded-2xl p-2 shadow-lg"><img src="https://i.ibb.co/fY6pdCPW/Logo-Air.png" alt="Logo" className="w-full h-full object-contain" /></div>
              <p className="text-sm text-orange-200 font-semibold">Innovación y calidad en cada producto</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-orange-200 font-semibold">© 2025. Todos los derechos reservados.</p>
              <p className="text-sm mt-1 text-orange-200">Sistema interno corporativo</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        :root {
          --color-green-100: #dcfce7; --color-green-200: #bbf7d0; --color-green-500: #22c55e; --color-green-600: #16a34a; --color-green-700: #15803d; --color-green-800: #166534;
          --color-orange-100: #ffedd5; --color-orange-200: #fed7aa; --color-orange-500: #f97316; --color-orange-600: #ea580c; --color-orange-700: #c2410c; --color-orange-800: #9a3412;
          --color-amber-100: #fef3c7; --color-amber-200: #fde68a; --color-amber-500: #f59e0b; --color-amber-600: #d97706; --color-amber-700: #b45309; --color-amber-800: #92400e;
          --color-blue-100: #dbeafe; --color-blue-200: #bfdbfe; --color-blue-500: #3b82f6; --color-blue-600: #2563eb; --color-blue-700: #1d4ed8; --color-blue-800: #1e40af;
          --color-purple-100: #f3e8ff; --color-purple-200: #e9d5ff; --color-purple-500: #a855f7; --color-purple-600: #9333ea; --color-purple-700: #7c3aed; --color-purple-800: #6b21a8;
          --color-gray-100: #f3f4f6; --color-gray-200: #e5e7eb; --color-gray-500: #6b7280; --color-gray-600: #4b5563; --color-gray-700: #374151; --color-gray-800: #1f2937;
        }

        /* Scrollbar thin for webkit */
        .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 8px; }

        /* small responsive tweaks */
        @media (max-width: 640px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
        }
      `}</style>
    </div>
  );
}
