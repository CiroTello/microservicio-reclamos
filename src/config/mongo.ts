import logger from '@utils/logger';
import mongoose, { ConnectOptions } from 'mongoose';

class MongoDB {
  options: ConnectOptions = {
    autoIndex: false, // Don't build indexes
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };

  constructor(url = '') {
    this.connect(url);
  }

  private async connect(url: string) {
    try {
      await mongoose.connect(url, this.options);
      logger.info('🛢  Database connected successfully');
    } catch (err) {
      logger.error('❌ Database connection error:', err);
    }

    // Event listeners for connection
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
  }
}

export default MongoDB;
