import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/client';

export function DashboardPage() {
  const [resultado, setResultado] = useState('Probando conexión...');

  useEffect(() => {
    apiClient
      .get('/api/rol')
      .then((response) => {
        setResultado(`✅ Conexión OK. Roles recibidos: ${response.data.length}`);
      })
      .catch((error) => {
        setResultado(`❌ Error: ${error.mensaje ?? 'No se pudo conectar'}`);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{resultado}</p>
    </div>
  );
}