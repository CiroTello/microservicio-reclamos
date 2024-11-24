import axios from 'axios';

// Configuración del interceptor
/*axios.interceptors.request.use((config) => {
    // Aquí logueamos las cabeceras antes de enviar la solicitud
    console.log('Cabeceras enviadas:', config.headers);
    return config;
  });*/

class OrderService {
  private static orderURL: string = process.env.MS_ORDER_URL || "";

  // Método para verificar si una orden existe
  public async checkOrderExists (orderId: string, token: string): Promise<boolean> {
    try {
        console.log('Token enviado:', token);

        const orderURLComplete = `${OrderService.orderURL}/orders/${orderId}`;
        console.log('Verificando orden:', orderURLComplete);
      const response = await axios.get(orderURLComplete, {
        headers: {
          Authorization: `${token}` 
        }
      });

      console.log('Respuesta:', response);

      if (response.status === 200) {
        console.log('Orden encontrada:', response.data);
        return true; // Orden existe
      }
      return false; // No encontrada

    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false; // Orden no existe
      }
      throw new Error(`No se pudo verificar la orden ${error.response.status}`);
    }
  }
}

export default new OrderService();
