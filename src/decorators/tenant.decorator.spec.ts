import { describe, it, expect, vi } from 'vitest';
import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { CurrentTenant, TenantId } from './tenant.decorator';

// Helper to get the factory function from a param decorator
function getParamDecoratorFactory(decorator: Function) {
  class TestController {
    test(@decorator() value: unknown) {
      return value;
    }
  }

  const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestController, 'test');
  const key = Object.keys(metadata)[0];
  return metadata[key].factory;
}

describe('CurrentTenant Decorator', () => {
  it('should extract tenant from request', () => {
    const tenant = { id: 'tenant-123', name: 'Test Tenant' };
    const mockRequest = { tenant };

    const mockExecutionContext = {
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory(CurrentTenant);
    const result = factory(null, mockExecutionContext);

    expect(result).toEqual(tenant);
  });

  it('should return undefined when tenant is not set', () => {
    const mockRequest = {};

    const mockExecutionContext = {
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory(CurrentTenant);
    const result = factory(null, mockExecutionContext);

    expect(result).toBeUndefined();
  });

  it('should return tenant with additional properties', () => {
    const tenant = {
      id: 'tenant-456',
      name: 'Enterprise',
      plan: 'premium',
      settings: { maxUsers: 100 },
    };
    const mockRequest = { tenant };

    const mockExecutionContext = {
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory(CurrentTenant);
    const result = factory(null, mockExecutionContext);

    expect(result).toEqual(tenant);
    expect(result.plan).toBe('premium');
  });
});

describe('TenantId Decorator', () => {
  it('should extract tenant ID from request', () => {
    const tenant = { id: 'tenant-789', name: 'Test' };
    const mockRequest = { tenant };

    const mockExecutionContext = {
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory(TenantId);
    const result = factory(null, mockExecutionContext);

    expect(result).toBe('tenant-789');
  });

  it('should return undefined when tenant is not set', () => {
    const mockRequest = {};

    const mockExecutionContext = {
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory(TenantId);
    const result = factory(null, mockExecutionContext);

    expect(result).toBeUndefined();
  });

  it('should return undefined when tenant exists but has no id', () => {
    const mockRequest = { tenant: { name: 'No ID Tenant' } };

    const mockExecutionContext = {
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory(TenantId);
    const result = factory(null, mockExecutionContext);

    expect(result).toBeUndefined();
  });

  it('should handle null tenant gracefully', () => {
    const mockRequest = { tenant: null };

    const mockExecutionContext = {
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory(TenantId);
    const result = factory(null, mockExecutionContext);

    expect(result).toBeUndefined();
  });
});

