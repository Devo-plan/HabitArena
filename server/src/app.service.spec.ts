import { AppService } from './app.service';

describe('AppService', () => {
  const service = new AppService();

  it('should return health status', () => {
    const result = service.getHealth();
    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('timestamp');
  });
});
