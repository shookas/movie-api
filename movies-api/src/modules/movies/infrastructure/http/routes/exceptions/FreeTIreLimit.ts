import HttpException from '../../../../../../shared/infrastructure/http/exceptions/http';

class FreeTireLimitException extends HttpException {
  constructor() {
    super(403, 'Free tire limit exceeded');
  }
}

export default FreeTireLimitException;
