import { Link } from 'react-router-dom';
import { AppRoutes } from './app/AppRoutes';

function App() {
  return (
    <div>
      {/* Nav temporal solo para probar el Router - se reemplaza por el Sidebar en el paso 9 */}
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Dashboard</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/roles">Roles</Link>
        <Link to="/usuarios">Usuarios</Link>
        <Link to="/pedidos">Pedidos</Link>
        <Link to="/entregas">Entregas</Link>
        <Link to="/movimiento-stock">Movimiento de Stock</Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;